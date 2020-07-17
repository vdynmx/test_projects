// Arrow Functions and Evenetlistener work arounds | Private Properties
class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false); //passing false again so we can call render manually later
    this.orderProducts = () => { // arrow function work like bind, dosent care about where its being called but what relation it currently is called from
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', () => this.orderProducts()); // arrowfunction ignores the addEventlisterner DOM location but stay with what this. currently is. So it would work
    orderButton.addEventListener('click', this.orderProducts); //instead of the arrow function we setup the orderProducts method differently as an arrow function.
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = []; //# makes this a private property, it can only be changed inside the class

  constructor(renderHookId) {
    super(renderHookId, false); // because products is a private property its not accessible to the Component class, so it affects render and we have to manually call the render method
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [ // also need to use # when accessing to update the property inside the class
      new Product(
        'A Pillow',
        'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      )
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list')
    ]);
    if (this.products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
