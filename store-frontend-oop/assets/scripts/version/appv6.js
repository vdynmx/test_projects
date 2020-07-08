// Inheritance to share codes amongst classes
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

class Component { // Class to create basic dom elements via templetization 
  constructor(renderHookId) { //?? Not sure why you need a contructor here.
    this.hookId = renderHookId;
    this.render();
  }

  render() {} //as the parent class and due to render being called inthe constructor, just easier to show that the render method code not being called from main but from individual child render methods

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) { //if truthy go below
      rootElement.className = cssClasses; // setting CSS classname to value passed
    }
    if (attributes && attributes.length > 0) { 
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value); // how can you know the structure of this when starting the templetization here. How do you know when passing through objects into atributes how they will be structured before they event exist?
      }
    }
    document.getElementById(this.hookId).append(rootElement); // tgus is where the appending to the DOM happens. ?? 
    return rootElement; //?? why am I returning rootElement ?
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) { // ?? what is renderHoodId from Shop doing here ? how did this get here ??
     super(renderHookId);//?? due to us wanting to call parent constructor with local value we use super; renderHookId just getting passedthrough to super
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    // now that we have access to Componenents we can templetize the createElement
    //const cartEl = document.createElement('section');
    const cartEl = this.createRootElement('section', 'cart'); //using this. we have access to Component class methods; Still need to assign it to a variable as it still needs custom addition
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    //cartEl.className = 'cart';  setting it above, now redundent
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl; // ? does not need to return anything because we no longer need it? why ?
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId); //Super to extend the second variable renderHookId, this will use the Component method
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    //since we extended we can templetize the create element part
    const prodEl = this.createRootElement('li', 'product-item');
    //prodEl.className = 'product-item';
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
      `; // this is custom logic and stays
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    //return prodEl; no longer need to return, because the element will be hooked into the dom via the Component method createRootElement
  }
}

class ProductList extends Component {
  products = [
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    const prodList = this.createElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, 'prod-list'); //passing second item to the productItem constructor. Now we have to modify the ProductITem class to accept second one
      /*const prodEl = */ productItem.render();
      //prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');
    
    this.cart = new ShoppingCart();
    /*const cartEl = */this.cart.render(); // no longer need
    const productList = new ProductList();
    const prodListEl = productList.render();

    //renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
