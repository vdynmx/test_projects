/*
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

//Create http request object to send request
const xhr = new XMLHttpRequest(); //?? Why do I need to creat an object to sent http request ?

//to start configure request
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts'); //first step twords confirguing request. First argument to to set the type of action. Second argument is to URL

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
// Restructuring code for Post request with promises

const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

//gonna create a function that can both get and post methods
function sendHttpRequest(method, url) {
    const promise = new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();

    //to start configure request
    xhr.open(method, url); 
    
    xhr.responseType = 'json';
    
    xhr.onload = function() {
        resolve(xhr.response);
    };
    
    xhr.send();  
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
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listElement.append(postEl);
        }  
}
    

fetchPosts();
