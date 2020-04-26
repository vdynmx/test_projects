const addMovieModal = document.getElementById('add-modal');
console.log(addMovieModal);
const backDropOn = document.getElementById('backdrop');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelector('input');

const toggleBackdrop = () => {
    backDropOn.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const cancelMovieModal = () => {
    toggleMovieModal();
};

const addMovieHandler = () => {
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
};

const backdropClickHandler = () => {
    toggleMovieModal();
};


startAddMovieButton.addEventListener('click', toggleMovieModal);
cancelAddMovieButton.addEventListener('click', cancelMovieModal);
backDropOn.addEventListener('click',backdropClickHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);