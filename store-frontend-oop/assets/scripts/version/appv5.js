// Getters and Setters to set the shopping cart amount
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

class ShoppingCart {
  items = []; // starting with empty items array for each ShoppingCart object instance
// Adding Getter and Setter to modify Cart totals
// To set the ShoppingCart Price and display
  set cartItems(value) { // method name can be anything. I expect value to the an array of cart items
    this.items = value; //overriting the item array with a new one 
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`; //Setting we want to set the value and update it when it is run.
  }
  //get will return a value to use, so we are using getting to calculate the cart total item price
  get totalAmount() { // getter method name can be anything and we return a value with the get method.
    const sum = this.items.reduce( // allows us to combine all specific properties of an array into one value. Aka akk up the price property of every element in the items array.
      (prevValue, curItem) => { prevValue + curItem.price; },
      0
    );
    return sum;
  }

  addProduct(product) {
    //Addproduct is being modiefied due to the setter above ? why ?
    const updatedItems = [...this.items]; // So first what we do is updaate the updatedItems array to what we currently have with this.items. We update the array with a new copy
    // logic: before a new product is being passed in to the array, we confirm the existing array by copying it into a variable.
    updatedItems.push(product); // new product items being pushed to the end of the updatedItems array
    this.cartItems = updatedItems; // referring to the setter cartItems to a new value will trigger the setter above to add the updateItems array passed in via value
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
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
    return prodEl;
  }
}

class ProductList {
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

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
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
