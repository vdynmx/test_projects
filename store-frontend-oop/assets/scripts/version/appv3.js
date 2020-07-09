// Adding Shop Class for calculation

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
// Create a shopping car class because everybodys shopping cart will be different and this is to templatize view and logic
class ShoppingCart {
  items = [];

  render(){
    const cartEl = document.createElement('section');
    //innerhtml to create the class instance body
    cartEl.innerHTML = `
     <h2>Total: \$${0}</h2>
     <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    return cartEl; // Whereever we create the shoppingcart we can append it to the DOM
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product);
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
    const addCartButton = prodEl.querySelector('button'); //Step1 getting access to the button. Creating a variable that stores the direct path to the button via prodEl that stores the initial Element and we select its content via querySelector.
    // QQ5 Does querySelector now go through all the content that is stored in the prodEl schema looking for button, or does when using QuerySelector we know that the html is only stored in innerHTML ?
    addCartButton.addEventListener('click', this.addToCart.bind(this)); // QQ6 this.addToCart shows undefined because this references the document window ?! if I run the bind method and use this. JS then beacuse we use this binds addToCart to the ProductItem instance ? 
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
    return prodList; // returning prodlist
    //renderHook.append(prodList); this was before renderHook was refactored into Shopclass
  }
}

class Shop { // This is the class where we use the shopping cart, in the shop. It combines productList and ShoppingCart.  
    render(){
    const renderHook = document.getElementById('app'); // as shop is now the main render mechanism, render hook  gets refactored into here so all elements get updated again
    const cart = new ShoppingCart(); //Instantiate the shoppingcart here
    const cartEl = cart.render(); // Returns cartEl, now at it is saved in a location we can choose where to place it with appending it below 
    const productList = new ProductList();
    const prodListEl = productList.render(); // we store this class method so it can be appended below

    renderHook.append(cartEl); // we append the shopping car render method into the app element
    renderHook.append(prodListEl); // we append the ProductList render method into the app element
    // neither of these elements are hierarchical to another thats why there are two appends
    }
}

const shop = new Shop();
shop.render();