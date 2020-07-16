// Inheritance to share codes amongst classes
// consolidating render
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

class ElementAttribute { // Creating  a class to garantuee the Attribute structure
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component { // Class to create basic dom elements via templetization 
  constructor(renderHookId) { //this is were we expect a renderHookID value. What we are passing here is where the component should be linked to, or in this case what DOM element we want it nested under.
    this.hookId = renderHookId;
    this.render(); //Every Class intentiation that has Component extended and calls super will have .this (Object Class) method execuded.
  }

  render() {} //as the parent class and due to render being called inthe constructor, just easier to show that the render method code not being called from main but from individual child render methods

  createRootElement(tag, cssClasses, attributes) { // method to create the dom element
    const rootElement = document.createElement(tag); // creates the DOM element with the tag passed into it. stored in varibale for manipulation
    if (cssClasses) { //if truthy go below
      rootElement.className = cssClasses; // setting CSS classname to value passed
    }
    if (attributes && attributes.length > 0) { 
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value); // how can you know the structure of this when starting the templetization here. How do you know when passing through objects into atributes how they will be structured before they event exist?
      // setAttribute method is a built in JS method
      }
    }
    document.getElementById(this.hookId).append(rootElement); // We retrieve what DOM element is the parent by using the passed in this.hoodId and then we append the created DOM element
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

  constructor(renderHookId) { // Because we are passing 'app' from the ShoppingCart instanciation, we labled that as a renderhook as it refers to where it will be rendered (app)
     super(renderHookId);// because when we create a shoppingcart instance we need to access the parent class constructor we need to call super. due to us wanting to call parent constructor with local value we use super; renderHookId just getting passedthrough to super; we are passing 'app' through to the parent constructor for the DOM element creation
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
   // return cartEl; no longer needs to be returned because we use a class builder Component to render place the DOM element
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
    //return prodEl; no longer need to return, because the element will be hooked into the dom via the Component method createRootElement append method at bottom of method
  }
}

class ProductList extends Component {
  products = [
    /* new Product(
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
    ) */ //because the methods are being called before the data is created we need to delay loading in order and move the data creation array in its own method
  ];

  constructor(renderHookId) {
    super(renderHookId); // passing the tag through which in this case is 'app' ?
    //this.render(); Consolidation example. Could call render here but we would be calling it on every constructor Class so we just call it from the Component class (parent)
    this.fetchProducts(); // Now I can call for the data to be created
  }

  fetchProducts() { // Method to create the data
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
  }

  render() {
    const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
    for (const prod of this.products) {
      /*const productItem = */new ProductItem(prod, 'prod-list'); //passing second item to the productItem constructor. Now we have to modify the ProductITem class to accept second one. prod-list is the string for the renderHookId Compoenent class os it knows where to append the productItem. This is done here manually because its where we know it will go
      //dont need to store Product Item anywhere as we are no longer manipulating it
      /*const prodEl = */ // productItem.render(); consolidating render
      // render no longer returns the prodEl to append which would happen below.
      //prodList.append(prodEl); this is where we used to append render the item to the list
    }
    // return prodList; no longer need prodlist
  }
}

class Shop  { 
  constructor() { // instead of extending to Parent Component for render call, we create constructor below
    this.render(); //this will call the render method each time a Shop object is instanciated
  }
  render() {
    //const renderHook = document.getElementById('app');
    
    this.cart = new ShoppingCart('app'); // adding 'app' string as a hook on where to render the shopping cart. This is where all the render hook loops start.
    /*const cartEl = *///this.cart.render(); // no longer need // consolidating render method into constructor
    /*const productList = */new ProductList('app'); //passing along to constructor so we know where to append the List
    // No need to store ProductList anywhere cuz we are not manipulating it.
    //productList.render(); consolidating render in to the constructor

    //renderHook.append(cartEl);
    //renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    //shop.render(); consolidating render
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
