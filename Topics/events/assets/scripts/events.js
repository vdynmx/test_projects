const button = document.querySelector('button');

// button.onclick = function() { // on click is a outdated way of handling events

// };


// ---------------
// event itself is an object and has unique properties and methods

const buttonClickHandler = event => {
  // event.target.disabled = true; //disabled the button this would be after second interaction ?
  console.log(event);
};

const anotherButtonClickHandler = () => {
  console.log('This was clicked!');
};

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

// button.addEventListener('click', buttonClickHandler);

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);

// buttons.forEach(btn => { // a button object is stored in another object and needs to be cycled through
 //  btn.addEventListener('mouseenter', buttonClickHandler);
// });

// window.addEventListener('scroll', event => { // scroll event on the window object to have a scroll on the window
//   console.log(event);
// });

/* DOM events 
 During Capturing the dom exectues outside to inside on the html tree. 
 Bubbling once interacted it goes from inside to outside.
 
 Event Propogation is when an event occurs and it is accesible on higher hiearchical elements(ancestors). it happend on a particular element however it can be listend to higher up
 */

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault(); // prevents the browser from default action, by submit, prevents from submitting, goto, prevents from going to...
  console.log(event);
});

const div = document.querySelector('div'); // to showcase capturing / bubbling

div.addEventListener('mouseenter', event => {
  console.log('CLICKED DIV');
  console.log(event);
});

// bubbling will show the Click Button event first then run the Clicked Div event because its goes inside to outside in the hierarchy 

button.addEventListener('click', function(event) { 
  event.stopPropagation(); // stop the propogation of events on ancestry elements. Clicked Div wont show on clicked Button event
  console.log('CLICKED BUTTON');
  console.log(event);
  console.log(this);
});

// Event Delegation

const listItems = document.querySelectorAll('li'); // capturing all the li in the dom
const list = document.querySelector('ul'); // work around multiple events you have one event listener on the who list

// add a eventlistener to each li and toogle the CSS
// issue with mutliple listeners / memory management

// listItems.forEach(listItem => { 
//   listItem.addEventListener('click', event => { 
//     event.target.classList.toggle('highlight');
//   });
// });

// Event delegation
list.addEventListener('click', function(event) /*event => */ {
  // console.log(event.currentTarget); // is the entire ul list since thats where the listener resides
  // event.target.classList.toggle('highlight'); // issue is that it selects the most narrow element not parent li
  event.target.closest('li').classList.toggle('highlight'); //closest traverses dom up to the next li
  // form.submit(); // can be triggered because event
  button.click(); // ?? runs on the event which means it would toggle ? click runs programmatically not via interaction
  console.log(this); // this points at the current target of the event 
});


//Drag & Drop
// 1. mark an element as draggable 2. listen to a dragstart Event 3. Accept Drop via dragenter and dragover events & preventDefault 4. optionale listen to dragleave event 5. listen to drop Event & Update Data 6. Listen to dragend event
