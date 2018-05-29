import { getElements } from '../../../../../tools/elements';

const selectors = {
  seat: {
    home: 'div.seat',

    filter: {
      adults: ':not(.infants):not(.disabled)',
      disabled: '.disabled',
      withExtraLegspace: '.extralegspace',
      infants: '.infants',
    },

    properties: {
      all: 'img',
      empty: 'img:not(.occupied):not(.selected)',
      occupied: 'img.occupied',
      selected: 'img.selected',
    },
  },
};

export class Seats {
  /**
   * @param parentSelector {string}
   * This selector helps choosing between 'airline.out' and 'airline.home'.
   *
   * @param skip=0 {number}
   * Number of initial seats to skip.
   */
  constructor(parentSelector, skip = 0) {
    this._parentSelector = parentSelector;
    this._skip = skip;
    this._properties = selectors.seat.properties.all;
  }

  /**
   * @param value {""|"adults"|"withExtraLegspace"|"disabled"|"infants"}
   */
  set filter(value) {
    this._filter = value;
  }

  /**
   * @param value {"all"|"occupied"|"selected"|"empty"}
   */
  set properties(value) {
    this._properties = value;
  }

  /**
   * @param skip {number}
   * Number of initial seats to skip.
   *
   * @param limit {number}
   * Limit the selection to a certain size.
   *
   * @returns {WebdriverIO.Element[]}
   * Returns a list of WebdriverIO.Element
   *
   * @private
   */
  _getSeats(skip, limit = 0) {
    let selector = `${this._parentSelector} ${selectors.seat.home}`;

    if (limit === 0) {
      // This selector offsets the selection by 'skip'.
      selector += `:not(:nth-child(-n+${skip + 1}))`;
    } else {
      // This selector offsets the selection by 'skip', and limits it to 'limit' items.
      selector += `:not(:nth-child(-n+${skip + 1})):nth-child(-n+${skip +
        limit +
        1})`;
    }

    if (this._filter) {
      selector += `${selectors.seat.filter[this._filter]}`;
    }

    return getElements(selector);
  }

  /**
   * @param value {string}
   * @returns {number}
   * @private
   */
  _parsePixelValueToFloat(value) {
    return parseFloat(value.value.replace('px', ''), 10);
  }

  /**
   * @param row {Array}
   * @returns {Array}
   * @private
   */
  _splitRowIntoSeatGroups(row) {
    let groups = [],
      group = [],
      previousTop = 0;

    for (let seat of row) {
      if (group.length > 0 && seat.top !== previousTop) {
        groups.push(group);
        group = [];
      }

      group.push(seat);
      previousTop = seat.top;
    }

    if (group.length > 0) {
      groups.push(group);
    }

    return groups;
  }

  /**
   * @param seat
   * @param left {number}
   * @param top {number}
   * @returns {{
   *     isVisibleWithinViewport: (function()),
   *     scrollTo: (function()),
   *     isSelected: (function()),
   *     select: (function()),
   *     left: number,
   *     top: number
   * }}
   * @private
   */
  _generateSeatItem(seat, left, top) {
    return {
      isVisibleWithinViewport: seat.isVisibleWithinViewport,
      scrollTo: seat.scroll,

      isSelected: () => {
        const result = browser.elementIdElement(
          seat.ELEMENT,
          selectors.seat.properties.selected
        );
        return result && result.state === 'success';
      },

      select: seat.click,

      left: left,
      top: top,
    };
  }

  /**
   * @param limit=20 {boolean|number}
   * @returns {{
   *     isVisibleWithinViewport: (function()),
   *     scrollTo: (function()),
   *     isSelected: (function()),
   *     select: (function()),
   *     left: number,
   *     top: number
   * }[][]}
   */
  getSeats(limit = 40) {
    let rows = [],
      row = [],
      lastKnownLeft = 0,
      counter = 0;

    for (const seat of this._getSeats(this._skip)) {
      const imgElement = browser.elementIdElement(
        seat.ELEMENT,
        selectors.seat.properties[this._properties]
      );

      const left = this._parsePixelValueToFloat(
          browser.elementIdCssProperty(seat.ELEMENT, 'left')
        ),
        top = this._parsePixelValueToFloat(
          browser.elementIdCssProperty(seat.ELEMENT, 'top')
        );

      if (imgElement.state === 'failure') {
        continue;
      }

      if (lastKnownLeft < left) {
        row.push(this._generateSeatItem(seat, left, top));
      } else if (lastKnownLeft >= left) {
        const seatGroups = this._splitRowIntoSeatGroups(row);

        if (seatGroups.length > 0) {
          rows.push(seatGroups);
        }

        row = [this._generateSeatItem(seat, left, top)];
      }

      lastKnownLeft = left;
      counter++;

      if (limit > 0 && limit === counter) {
        break;
      }
    }

    rows.push(this._splitRowIntoSeatGroups(row));
    return rows;
  }
}
