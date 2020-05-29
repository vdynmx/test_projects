const addMovieBtn = document.getElementById('add-movie-btn');
const searchBTN = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => { //default argument and assigning empty string
    const movieList = document.getElementById('movie-list');

    
    if (movies.length === 0) {
        movieList.classList.remove('remove');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = ''; //clearing the list rough way

    const filteredMovies = !filter 
     ? movies 
     : movies.filter(movie => movie.info.title.includes(filter)); //turnary expression. If filter is (!)falsey (?)then (all)movies (:)otherwise filter.movies downto info and to key title which taken a function

    filteredMovies.forEach((movie) => { //now it searches for all movies
        const movieEl = document.createElement('li'); // creating a list instance
        let text = movie.info.title + ' - '; // in each list instance goes throug h all the movie arguments and gets the title.value of each argument passed in
        for (const key in movie.info) { // this loops through the sub object of info in movie based on value key
            if (key != 'title') {// key needs to be written as a string otherwise JS will look for variable not key. Condition because only 2 keys in object looking for the one thats not title
                text = text + `${key}: ${movie.info[key]}`; // after the movie title above append the userset value for key and the userset key value. Dynamic proptery key access login
            }
        }
        movieEl.textContent = text; // text that was created above now gets assigned to textContent in movieEl the listitem that will be sent tothe movie list
        movieList.append(movieEl); //movie list which was created above each now created movieEl element is passed into one by one. inside the loop so its done for every one
    });
}

function addMovieHandler () {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
        return;
    }

    const newMovie = {
        info: {
            title, //key name same as value name key shorthand is just once 
            [extraName]: extraValue
        },
        id: Math.random()
    };
    movies.push(newMovie); // I findthe destination I want to add the created object into and then use the push method with the value of what was just created in this function to push it through
    renderMovies();
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBTN.addEventListener('click', searchMovieHandler);