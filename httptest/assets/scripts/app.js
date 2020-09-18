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

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#availbale-posts button')

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


//------------------------------------------------------------
