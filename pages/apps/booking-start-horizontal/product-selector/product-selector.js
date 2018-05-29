const selectors = {
  selector: '.product-selector',
  section: '.selected-section-container',
};

const getSelector = () => browser.element(selectors.selector);
const getSection = () => browser.element(selectors.section);

class ProductSelector {
  constructor(product) {
    this.productSelector = getSelector();
    this.section = getSection();
    this.product = product;
  }

  select() {
    this.productSelector.click(this.product);
  }
}

export default ProductSelector;
