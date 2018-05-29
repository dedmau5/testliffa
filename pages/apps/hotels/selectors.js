let _selectors = {},
    infoPanel,
    infoFooter,
    imagePanel;

//imagePanel = "div.image-panel";
//infoPanel = "div.hotel-hit-text";
//infoFooter = `${infoPanel} > div.hotel-info__footer`;
imagePanel = ".tcne-hotelhit__imagepanel__gallery";
infoPanel = ".tcne-hotelhit__textpanel";
infoFooter = ".tcne-hotelhit__footerpanel__price__current";

_selectors.hotelHit = {
    imagePanel: imagePanel,
    infoPanel: infoPanel,
    infoFooter: infoFooter,
    //name: `${infoPanel} > div.hotel-hit-info > div.hotel-info__header > h3 > a`,
    //price: `${infoFooter} > div:nth-of-type(2) > p.price-info--current`,
    //concept: `${imagePanel} > div > div.hotel-concept-badge > img`,
    //chooseButton: `${infoFooter} > div:nth-of-type(3) > a.button`
    name: ".tcne-hotelhit__textpanel__hotel__link",
    price: `${infoFooter} > .wdio-hotel-price`,
    concept: ".tcne-hotelhit__imagepanel > img",
    chooseButton: ".wdio-hotel-select"
};


infoPanel = "div.hotel-info-panel";
infoFooter = `${infoPanel} > div.hotel-info-footer`;

_selectors.hotelInfo = {
    infoPanel: infoPanel,
    infoFooter: infoFooter,
    name: `${infoPanel} > div.hotel-info-panel__top > div.hotel-info-header > h3 > a`,
    price: `${infoFooter} > div:nth-of-type(2) > div.hotel-price > div:nth-of-type(2)`,
    chooseButton: `${infoFooter} > div:nth-of-type(3) > a.button`
};


infoPanel = "div.hit.independent";
infoFooter = `${infoPanel} > div.price-info`;

_selectors.newHotelInfo = {
    infoPanel: infoPanel,
    infoFooter: infoFooter,
    name: `${infoPanel} > div.hotel-info > h3 > a`,
    price: `${infoFooter} > div.hotel-price > p > a`,
    chooseButton: `${infoFooter} > div.trip-button > a`,
};

export const selectors = _selectors;