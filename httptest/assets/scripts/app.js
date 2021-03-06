/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

//Create http request object to send request
const xhr = new XMLHttpRequest(); //?? Why do I need to creat an object to sent http request ? ! Is is that so JS knows the body template to store the info being pulled into it?

//to start configure request
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts'); //first step twords confirguing request. First argument to to set the type of action. Second argument is to URL
//?? open is a method inside XMLHTTPRequest class?

xhr.responseType = 'json';

xhr.onload = function() {
    //const listOfPosts = JSON.parse(xhr.response); //Storing the converted JS values from the XHR JSON response in listofPosts
    const listOfPosts = xhr.response; //because we set response type to json above we dont have to parse it in
    // have to set looping function inside here, because we dont know howlong it took to store the response.
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl);
    }
};

xhr.send();

//JSON method stringify converts JS value to JSON string. parse converts JSON string to JS value. Format / structure wise so it can be used
*/
// ------------------------------------------------------------------------
// Restructuring code for Post request with promises and connecting UI to send formdata
/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button')

function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();


    xhr.open(method, url); 
    
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        resolve(xhr.response);
    };
    
    xhr.send(JSON.stringify(data));  
    });
    return promise;

}

async function fetchPosts() {
    const responseData = await sendHttpRequest(
        'GET', 
        'https://jsonplaceholder.typicode.com/posts'
        );
    
      const listOfPosts = responseData; 
        for (const post of listOfPosts) {
            console.log(post);
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listElement.append(postEl);
        }  
}
// creating an  async function, because it depends on the user when he submits that content to the backend
async function createPost (title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => { //I call the event object itself to change the behavior
    event.preventDefault(); //On the event object itself I want to change the default behavior of it sending the form right away, so I call the preventDefault method
    const enteredTitle = event.currentTarget.querySelector('#title').value; // Selecting the title field in the form and its property value
    const enteredContent = event.currentTarget.querySelector('#content').value;
    //now that the values that currently are populated in the html form have value and have been now stored in variables we pass them along tot he createPost function below.
    createPost(enteredTitle, enteredContent); 
});
*/

//------------------------------------------------------------
// DELETE method and Error Handling
/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button')
// How that we want to post a listener across the whole list so we can have an geeneral event that looks for the specific id we assign
const postList = document.querySelector('ul'); // whole li list is the ul 

function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.setRequestHeader('Content-Type', 'application/json')


    xhr.open(method, url); 
    
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 300) { // I'm checking the xhr status value for success, if no success I throw error.
            resolve(xhr.response);
        } else{
            reject(new Error('Something went wrong.'))
        }
        
    };
    
    xhr.onerror = function() { //onerror deals with clientside error, not serverside where we get back a 404 error for example. Like if the request cant send,timesout
        //console.log(xhr.response);
        //console.log(xhr.status);
        reject(new Error('Somethign went wrong'));
    }

    xhr.send(JSON.stringify(data));  
    });
    return promise;

}

async function fetchPosts() {
    // debugging error setup with try and catch 
    try {
        const responseData = await sendHttpRequest(
        'GET', 
        'https://jsonplaceholder.typicode.com/posts'
        );
    
      const listOfPosts = responseData; 
        for (const post of listOfPosts) {
            console.log(post);
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id; // Assinging an post ID to the li ID so the whole li can be identified. <li id='#'> 
            listElement.append(postEl);
        }  
    } catch (error) {
        alert(error.message);
    }
    
}

async function createPost (title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post)
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => { 
    event.preventDefault(); 
    const enteredTitle = event.currentTarget.querySelector('#title').value; 
    const enteredContent = event.currentTarget.querySelector('#content').value;
    
    createPost(enteredTitle, enteredContent); 
});

postList.addEventListener('click', event => {
    if (event.target.tagName ===  'BUTTON') { //targeting a specific item called button, since we only have one button this will work
        //console.log('click onn button'); //checking to see if the proper element is being targeted
        const postId = event.target.closest('li').id; // Now we are saving the li id of the post where the pressed the delete button on. Removing il because its parent and will remove all elements
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`)
    }


})
*/
//------------------------------------------------------------------------------------------
// Fetch API
/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button')
const postList = document.querySelector('ul'); 

function sendHttpRequest(method, url, data) {
    // method allows you to set th type of action which is configured in an object including with thow the body should be formatted
   // global available function in the browser. By default will send GET request. By default promise based
  //fetch dosent give parsed response like xmlhttprequest does, instead it provides a streamed response
  return fetch(url, { 
       method: method,
       body: JSON.stringify(data), // to set the way the data should be structured
       headers: {
           'Content-Type': 'application/json' //this tell the server my request has json data

       }
   }).then(response => { // the data returned through fetch is not formated, streamed unformatted resposne body.
       if (response.status >= 200 && response.status < 300) {
        return response.json(); // this allows us to call the json method on the response to format data to be useful.
       // response.text() to retun plain text
       // response.blob() give access to download file
       } else {
           return response.json().then(errData => { // sends a promise which is not available in the next line
           console.log(errData);
            throw new Error('Something went wrong -server-side');
       });
    }
    }).catch(error => {
        console.log(error);
        throw new Error('Soimethign went wrong!');
    }); // Error handling challenging in FetchAPI as data is streamed and cannot be read/validated
    

}

async function fetchPosts() {
    
    try {
        const responseData = await sendHttpRequest(
        'GET', 
        'https://jsonplaceholder.typicode.com/posts'
        );
    
      const listOfPosts = responseData; 
        for (const post of listOfPosts) {
            console.log(post);
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id; 
            listElement.append(postEl);
        }  
    } catch (error) {
        alert(error.message);
    }
    
}

async function createPost (title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    const fd = new FormData(form); //passing through the form data enterned in the html
    //fd.append('title', title);
    //fd.append('title', content);
    fd.append('title', userId);
    //fd.append('someFile', , 'photo.png');



    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd /*post);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => { 
    event.preventDefault(); 
    const enteredTitle = event.currentTarget.querySelector('#title').value; 
    const enteredContent = event.currentTarget.querySelector('#content').value;
    
    createPost(enteredTitle, enteredContent); 
});

postList.addEventListener('click', event => {
    if (event.target.tagName ===  'BUTTON') { 
        const postId = event.target.closest('li').id; 
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }


});
*/
//--------------------------------------------------------------------------------
// Axios library
// Axios always uses promises


const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button')
const postList = document.querySelector('ul'); 

function sendHttpRequest(method, url, data) {
    
  return fetch(url, { 
       method: method,
       body: JSON.stringify(data), 
       headers: {
           'Content-Type': 'application/json' 

       }
   }).then(response => { 
       if (response.status >= 200 && response.status < 300) {
        return response.json(); 
       } else {
           return response.json().then(errData => { 
           console.log(errData);
            throw new Error('Something went wrong -server-side');
       });
    }
    }).catch(error => {
        console.log(error);
        throw new Error('Soimethign went wrong!');
    }); 
    

}

async function fetchPosts() {
    
    try {
        const response = await axios.get( //globally available because we run the axios library
            'https://jsonplaceholder.typicode.com/posts' // get method only requires URL
        );
    
      const listOfPosts = response.data; //Axios provides data in a useful JSON format 
        for (const post of listOfPosts) {
            console.log(post);
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id; 
            listElement.append(postEl);
        }  
    } catch (error) {
        alert(error.message);
        console.log(error.response);
    }
    
}

async function createPost (title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    };

    const fd = new FormData(form); 
    fd.append('title', userId);
 
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
    console.log(response);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => { 
    event.preventDefault(); 
    const enteredTitle = event.currentTarget.querySelector('#title').value; 
    const enteredContent = event.currentTarget.querySelector('#content').value;
    
    createPost(enteredTitle, enteredContent); 
});

postList.addEventListener('click', event => {
    if (event.target.tagName ===  'BUTTON') { 
        const postId = event.target.closest('li').id; 
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }


});
