// constructor function old version of JS and new keyword
/* This is a class with a constructor
class Person {
    name = 'Max';

    constructor() {
        this.age = 30;
    }

    greet() {
        console.log(
            'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old'
        );
    }
}
*/

// how you setup a oldschool constructor function without class

function Person() { // function with a Capitalized name to signal its not called like a reuglar function, just convention nothing utilitarian
    // the new keyword below effectivley sets this = {}; the object to be created then it adds all the properties we declare below to it. then it effectivley runs a "return this;" at the bottom of the function. Same philosophy as in a class.
    this.age = 30;
    this.name = 'Max';
    this.greet = function() { //set an anonymous function
        console.log(
            'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old'
        );
    };

}

const person = new Person(); // reason why greet works on person is due to the new keyword. It prompts JS to create a new object
person.greet();