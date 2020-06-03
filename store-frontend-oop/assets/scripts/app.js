class Product {
    title  = 'DEFAULT'; // assign default values and use equal sign
    imgURL; // no default value will return undefind
    description; // called fields in the class template creation, object in objects its called a property
    price;

    constructor(title, image, desc, price){
        this.title = title;
        this.imgUrl = image;
        this.description = desc;
        this.price = price;
    } 
}

const productList = {
    products: [
        new Product('Seedoi 100ml','https://i.imgur.com/HeYV02C.jpg','Start kit', 7.99),
        new Product('Seedoil 250ml', 'https://i.imgur.com/rqE7Ckq.jpg', 'most popular item', 12.99)
    ],
        render() {
            const renderHook = document.getElementById('app'); // now I can use renderHook to work with the div app, insert and change elements within it
            const prodList = document.createElement('ul'); // creating a the list container to insert the data into
            prodList.className = 'product-list'; // telling prodlist to use a particular css id. Setting the value
            //now that the outer elements / containers are established. now we work on the individual items
            for (const prod of this.products) { //this will reference productList.products to rener each element inside
                const prodEl = document.createElement('li'); //Each element gets a li
                prodEl.classname = 'product-item';
                prodEl.innerHTML = `
                    <div>
                    <img src="${prod.imgUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to cart</button>
                    </div>
                    </div>
                `;
                prodList.append(prodEl); // appending elements to the list
            } 
            renderHook.append(prodList); // adding the list here to render into main div

        }

};
productList.render();
