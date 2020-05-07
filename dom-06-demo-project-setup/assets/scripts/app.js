const addMovieModal = document.getElementById('add-modal');
console.log(addMovieModal);
const backDropOn = document.getElementById('backdrop');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal'); //Currently this Css is not showing

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'none';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const startdeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible'); // Here we add the css property of visible to it, which will show the css modal
    //deleteMovie(movieId);
    toggleBackdrop();
    const cancelDeletetionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletetionButton = deleteMovieModal.querySelector('.btn--danger');
    
    confirmDeletetionButton.replaceWith(confirmDeletetionButton.cloneNode(true)); //copying the delete button below so you can mod it later, this way you dont create hanging processes

    confirmDeletetionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletetionButton.removeEventListener('click', closeMovieDeletionModal);

    cancelDeletetionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletetionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId)); //actually have to delete the movie now so you call the deletemovie function and pass the movieid for deletion
    
};

const renderNewMovieElement = (id, title, imageUrl, rating) => { //here I am creating a element for display
    const newMovieElement = document.createElement('li'); // Here we are createing a li 
    newMovieElement.className = 'movie-element'; // this is the classname for css purposes, so the li is then pulling the style for movie-element
    newMovieElement.innerHTML = ` 
    <div class="movie-element__image>
     <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5 star</p>
    </div>
    `; // Creating the content of html with dynamic variables that is going to be parsed in
    newMovieElement.addEventListener('click', startdeleteMovieHandler.bind(null, id) );
    const listRoot = document.getElementById('movie-list'); // now we are selecting the movie-list section of the page which is a ul parent to the li
    listRoot.append(newMovieElement); // appending the newMovieElement li object we just created with properties into it.
};

const toggleBackdrop = () => {
    backDropOn.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) { // loop that goes through every Input (usrInput) of the object Userinputs
        usrInput.value = ''; // for every single Input we do the following. set value to 
    }
};

const cancelMovieModal = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};

const addMovieHandler = () => { // function structure first pulling in data from external fields from thml, then validating with if statement, then creating new object, parsing that data into object that pushing that new object into the parent array
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() == '' ||
        imageUrlValue.trim() == '' ||
        ratingValue.trim() == '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid rating between 1 and 5');
        return;
    }

    const newMovie = { // creating a new object with properties
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie); //accessing a parental array to push a value into it from the objects created in this function
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating); // Creating the Element uptop we now need to parese through the data here in order to render it with data.
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};


startAddMovieButton.addEventListener('click', showMovieModal);
cancelAddMovieButton.addEventListener('click', cancelMovieModal);
backDropOn.addEventListener('click',backdropClickHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);