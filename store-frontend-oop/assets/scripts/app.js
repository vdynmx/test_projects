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

class ElementAttribute { //here we are setting the schema of the attributes passed into the element
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}


class Component {
        constructor(renderHookId, shouldRender = true) {     // setting the constructor in order to append to the DOM
            this.hookId = renderHookId;
            if (shouldRender) {
            this.render(); //every class that extends to Component will have a render method that will be defined below
            }
        }

    render() {

    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag); //here we create the root element itself and assigning it a tag
        if (cssClasses) { // if the cssClass is passed its truethy and set 
            rootElement.className = cssClasses; // Css value is there and is set to the rootelement created
        }
        if (attributes && attributes.length > 0) { // setting conditions here for arrays, so it has to have a value and the value should be greater then 0 aka truthy
            for (const attr of attributes) { // loop for each element in the array
                rootElement.setAttribute(attr.name, attr.value); // now for each element (which we expect to be objects, thus .name and .value) in the array we setting the attribute value passed
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
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((preVal, curItem) => {
            return preVal + curItem.price;
        }, 0);
        return sum;
    }
    
    constructor(renderHookId) {
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log('Ordering');
            console.log(this.items);
        }
        this.render();
    }
    
    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    /* orderProducts = () => { // this arrow function solves the this problem by referencing the class, because this without an arrow function below would referene the button
        console.log('Ordering');
        console.log(this.item);
    } */ // issue here though is that orderProducts will already have been called, because of super. thus moving this function into the constructor

    render() {
        const cartEl = this.createRootElement('section', 'cart'); //storing the created new element in a variable so we can enhance them below
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button> Order ow!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        // v1 orderButton.addEventListener('click', () => this.orderProducts()); //arrowfunction will allow the click to call this method instead of global
        orderButton.addEventListener('click', this.orderProducts); 
        this.totalOutput = cartEl.querySelector('h2');
        //return cartEl; now that we are running it through objects we dont need to return anymore // we return cartEl because it was created when called render so only on return does it get appended to the DOM
    }
}
class ProductItem extends Component {
    constructor(product, renderHookId) //instead of passing argument of the product ino the constructor, now passing the whole product object instead of broken apart 
    {
        super(renderHookId, false);
        this.product = product; // this clones the passthroughs objects into the current one, aka cloning
        this.render();
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item'); //Each element gets a li, after extend we can use those methods
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
                `;//  this used inside refers to the object that has been passed through. As this is the logic it remains as this is the specific function to it.
                const addCartButton = prodEl.querySelector('button');
                addCartButton.addEventListener('click', this.addToCart.bind(this)); // what we are doing is binding the function to this class, otherwise its global as this refers to what calls it 
                //return prodEl; after extending no longer need to return as its already hooked into the dom due to base class in Component // this returns the object to the DOM that can be used
            }
            
}

class ProductList extends Component{
    products = []; // empty array, sample data parsed into consntructor
    constructor (renderHookId) {
        super(renderHookId);
        this.fetchProducts();
                     
    }

    fetchProducts(){ //creating this method to call the data
        this.products = [
        new Product('Seedoi 100ml','https://i.imgur.com/HeYV02C.jpg','Start kit', 7.99),
        new Product('Seedoil 250ml',
         'https://i.imgur.com/rqE7Ckq.jpg',
          'most popular item', 12.99)];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.products) {
            new ProductItem(prod, 'prod-list');
        }
    }

    render() {
            const prodList = this.createRootElement('ul',  'product-list', [new ElementAttribute('id','prod-list')]); // creating a the list container to insert the data into
            if (this.products && this.products.length > 0) {
                this.renderProducts();
            }
            //prodList.id = 'prod-list'; could be removed after extension because id being passed via Component class
            //prodList.className = 'product-list'; //removed after extension becuase className being passed via extended Component class // telling prodlist to use a particular css id. Setting the value
            //now that the outer elements / containers are established. now we work on the individual items
            //for (const prod of this.products) { // moved for loop into standalone renderProducts method //this will reference productList.products to rener each element inside
                /* const productItem = as we are no longer needing to call methods on Productitem (render) we dont need to store the instance in a variable*/
                //new ProductItem(prod, 'prod-list');
                //productItem.render(); do not want to manually call render should be part of class
                //prodList.append(prodEl); // appending elements to the list
            //} 
            //return prodList; no longer need to return because class was extended and the DOM connection is in Component class          
    };
}





class Shop extends Component{
    constructor() {
        super();
    }
    render() {
        //const renderHook = document.getElementById('app'); // now I can use renderHook to work with the div app, insert and change elements within it
        this.cart = new ShoppingCart('app');
        //this.cart.render(); always calling render manually should be part of class when created
        /*const productList = now the need to start a instance anywhere no longer needed*/ 
        new ProductList('app');
        //productList.render(); called manually shhould be part of class 

        //renderHook.append(prodListEl); // no longer need to append as this is taken care of by base class 
    }
}
class App {
    static cart; //static field, to clarify what this refers to in the class

    static init() {
        const shop = new Shop();
        //shop.render(); // run render before this.cart because the 
        this.cart = shop.cart;
        
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
