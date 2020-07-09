// Breaking the Shoppingcart in to multiple classes 
class Product { // Class to just structure the Product Object itself
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

class ProductItem { // Class to deal with everytig around a single product item like values and rendering
  constructor(product) { //"product" this is the info that is being passed through from where ? From the loop in Productlist
    this.product = product; // Q2 are we setting the same schema here as in the Product class ? PE this.product holds the value of the product class instance object created. 
  }

  render() {
    const prodEl = document.createElement('li'); // Creating a DOM element 'li'
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
    return prodEl; //returning the data from prodEl which will render its content on the page when called the render method on an class instance of product item.
  }// as a value (object) is being returned. Something needs to be done with it when the method is called. 
}

class ProductList { //Class to show the product items in an organized fashion
  products = [ //these products object instances will be in an array which is a property called products in the created ProductList item object, which below we called productList 
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

  constructor() {} // products array above does not need to be initialized because its automatically created as a property due to being declared in the class

  render() {
    const renderHook = document.getElementById('app'); //renderhook will now access the existing html div with app
    const prodList = document.createElement('ul'); //prodlist creates ul element in the dom
    prodList.className = 'product-list';
    for (const prod of this.products) { // prod refers to each element in this.products. this.products refers to the ProductList class and the declared prodcuts array 
      const productItem = new ProductItem(prod); //now that we are in each prooduct element we are creating a variable productItem that holds a new class instance of productitem which passes in the value of (looping inside the products array, each time having the ability to manipulate each Product class instance)
      const prodEl = productItem.render(); //now that productItem has values assigned I can assign the class render method into a variable which in  turn returns the value of ProductItem class render prodEl is being saved now.
      prodList.append(prodEl); // Now accessing the unordered list item I append all the content in that productItem variable with values assigned and render it for each element run in the loop
    } // the prodEl that is being called via the ProductItem render method (li) is hovering somewehre, in order to place it correctly. it is being appended to the ProdList (ul)
    renderHook.append(prodList); //QQ4 not sure how the prodList is appended to the renderHook
  } // the prodList (ul) above is hovering somewhere and is then appended to the renderhook (app) which we have HTML for. giving all DOM elments desired structure. 
}

const productList = new ProductList(); // this creates a new instance of ProductList (since the values are hardcoded they are always the same)
productList.render(); //we call the render function from ProductList on the new classinstance object
