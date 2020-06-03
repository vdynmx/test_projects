class Product {
    //title  = 'DEFAULT'; // assign default values and use equal sign
    //imgURL; // no default value will return undefind
    //description; // called fields in the class template creation, object in objects its called a property
    //price;

    constructor(title, image, desc, price){
        this.title = title;
        this.imgUrl = image;
        this.description = desc;
        this.price = price;
    } 
}

class ProductItem {
    constructor(product) //instead of passing argument of the product ino the constructor, now passing the whole product object instead of broken apart 
    {
        this.product = product; // this clones the passthroughs objects into the current one, aka cloning
    }

    addToCart() {
        console.log('adding to cart');
        console.log(this.product);
    }

    render () {
        const prodEl = document.createElement('li'); //Each element gets a li
                prodEl.classname = 'product-item';
                prodEl.innerHTML = `
                    <div>
                    <img src="${this.product.imgUrl}" alt="${this.product.title}"> 
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>\$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to cart</button>
                    </div>
                    </div>
                `;//  this used inside refers to the object that has been passed through
                const addCartButton = prodEl.querySelector('button');
                addCartButton.addEventListener('click', this.addToCart.bind(this));
                return prodEl;
            }
            
}

class ProductList {
    products = [
        new Product('Seedoi 100ml','https://i.imgur.com/HeYV02C.jpg','Start kit', 7.99),
        new Product('Seedoil 250ml',
         'https://i.imgur.com/rqE7Ckq.jpg',
          'most popular item', 12.99)
    ];
    constructor () {};
    render () {
            const prodList = document.createElement('ul'); // creating a the list container to insert the data into
            prodList.className = 'product-list'; // telling prodlist to use a particular css id. Setting the value
            //now that the outer elements / containers are established. now we work on the individual items
            for (const prod of this.products) { //this will reference productList.products to rener each element inside
                const productItem = new ProductItem(prod);
                const prodEl = productItem.render();
                prodList.append(prodEl); // appending elements to the list
            } 
            return prodList;          
    };
}

class ShoppingCart {
    items = [];
    render () {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button> Order ow!</button>
        `;
        cartEl.className = 'cart';
        return cartEl;
    }
}

class Shop {
    render () {
        const renderHook = document.getElementById('app'); // now I can use renderHook to work with the div app, insert and change elements within it
        const cart = new ShoppingCart();
        const cartEl = cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();

        renderHook.append(cart);
        renderHook.append(prodListEl); 
    }
}

const shop = new Shop();
shop.render();
