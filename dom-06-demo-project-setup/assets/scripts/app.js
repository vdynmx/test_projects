const addMovieModal = document.getElementById('add-modal');
console.log(addMovieModal);
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const backDropOn = document.getElementById('backdrop');

const toggleBackdrop = () => {
    backDropOn.classList.toggle('visible');
}

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};


startAddMovieButton.addEventListener('click', toggleMovieModal);
cancelAddMovieButton.addEventListener('click', toggleMovieModal);
backDropOn.addEventListener('click',backdropClickHandler);
