//Create http request object to send request
const xhr = new XMLHttpRequest(); //?? Why do I need to creat an object to sent http request ?

//to start configure request
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts'); //first step twords confirguing request. First argument to to set the type of action. Second argument is to URL

xhr.onload = function() {
    console.log(xhr.response);
};

xhr.send();

//JSON method stringify converts JS value to JSON string. parse converts JSON string to JS value. Format / structure wise so it can be used