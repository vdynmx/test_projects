/* const products = [
    {
        title: 'Seedoi 100ml',
        imgUrl: 'https://i.imgur.com/HeYV02C.jpg',
        price: 7.99,
        description: 'Start kit'
    },
    {
        title: 'Seedoil 250ml',
        imgUrl: 'https://i.imgur.com/rqE7Ckq.jpg',
        price: 12.99,
        description: 'most popular item'
    }
];
*/ // so I moved the products array with objects in it into another object productList
const productList = {
    products: [
        {
            title: 'Seedoi 100ml',
            imgUrl: 'https://i.imgur.com/HeYV02C.jpg',
            price: 7.99,
            description: 'Start kit'
        },
        {
            title: 'Seedoil 250ml',
            imgUrl: 'https://i.imgur.com/rqE7Ckq.jpg',
            price: 12.99,
            description: 'most popular item'
        }], // the products array moved into the object 
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
