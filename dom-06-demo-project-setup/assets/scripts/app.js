const addMovieModal = document.getElementById('add-modal'); // 추천하는 방법
// const addMovieModal = document.querySelector('#add-modal'); 또 다른 방법1
// const addMovieModal = document.body.children[1]; 또 다른 방법2

const startAddMovieBtn = document.querySelector('header button');
// const startAddMovieBtn = document.querySelector('header').lastElementChild; 또 다른 방법3

const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild; 또 다른 방법4

const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive'); // 또 다른 방법5(모달에 직접 방문)
const confirmlAddMovieBtn = cancelAddMovieBtn.nextElementSibling; // 또 다른 방법6(연속되는 다음 요소)

const userInputs = addMovieModal.querySelectorAll('input'); // 다중 요소에 접근하는 방법
// const userInputs = addMovieModal.getElementsByTagName('input'); 다중 요소에 접근하는 또 다른 방법

const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1); // (movieIndex) 인덱스에 해당하는 요소를 제거하고 다음 항목은 (1)칸 앞으로 이동
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]); 구 방식
    backdropClickHandler();
    updateUI();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletiongBtn = deleteMovieModal.querySelector('.btn--danger');
    
    confirmDeletiongBtn.replaceWith(confirmDeletiongBtn.cloneNode(true));
    confirmDeletiongBtn = deleteMovieModal.querySelector('.btn--danger');

    // confirmDeletiongBtn.removeEventListener('click', deleteMovie.bind(null, movieId));
    cancelDeletionBtn.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
    confirmDeletiongBtn.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');

    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 starts</p>
        </div>
    `;

    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) { // string.trim() : 문자열의 시작과 끝에 공백 제거
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};

startAddMovieBtn.addEventListener('click', showMovieModal); // ADD MOVIE 버튼
backdrop.addEventListener('click', backdropClickHandler); // 모달 외의 화면 부분
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmlAddMovieBtn.addEventListener('click', addMovieHandler);