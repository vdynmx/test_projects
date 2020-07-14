//Communicating between classses, updating the ShoppingCart to re-render

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
  items = [];

  addProduct(product) {
    this.items.push(product); //adding the product into the shopping cart array
    this.totalOutput.innerHTML = `<h2>Total: \$${1}</h2>`; //using this to overrite the total set in the default render. . 

  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput.innerHTML = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    // ShoppingCart.addProduct we want to call the addProduct method here since a product was added to the cart to update. But I cannot just call a method from a differnt class on an instanciated object. This is where static method comes into play below
    App.addProductToCart(this.product); // Since App is an outlier layer and holds a static method and is not instantiated we can call it
  } //this product refers to the product stored in ProductItem

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

class Shop { //now the shop is initialized via app
  
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart(); // Now the ShoppingCart itself is a property of the Shop
    const cartEl = this.cart.render(); //results ofthe method from the shoppingcart object
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App { // Outerlater to shop, since every user will only have one shopping cart but changes to it. the out layer deals with update methods for example
  static cart; //static field, this is where the create cart lives from ShoppingCart so the same one gets used. Also shows that the cart is not ment to be instanciated

  static init() { //
    const shop = new Shop();
    shop.render(); //need to run render method before I assign the cart property. because the method creates it.
    this.cart = shop.cart; //Now because Shop is instanciated via App and we have cart as the property of shop via the Shop class we can assign this instanciated cart to a the current Apps property
  }

  static addProductToCart(product) { // We create this static method here to run the addProduct method from ShoppingCart on the Cart that was instanciated already. (sort of like an update command so we dont create anything new)
    this.cart.addProduct(product); // since this.cart was incanciated above and we now have access to it via a static init. we can run a static method on that cart property. that lives in ShoppingCart Class
   //the addProduct method in ShoppingClart expects a product value being passed, thus the static method needs to pass one aswell
  }// App Class and the addProductToCart method are sort of a proxy that funnels. 
}

App.init(); // ?? executes init method which is used to rerun the Shop Class which in turn updates the shoppingcart. Reason why its static is so the same one shopping cart gets updated and not have multiple shoppingcarts with different values . Since its not an instance there is no object itself. Just reruns the Class, sort of like a template refresh ?
// Since we dont instantiate App unlike Shop, this is were we can run the app for example




