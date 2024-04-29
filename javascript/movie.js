const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDcwMGFhODAwYmUzY2Y0NjYxY2JlZTlhY2NlNmVhNyIsInN1YiI6IjY1YzRlYjUwMGMyNzEwMDE3ZTc4MWJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lv94BkIGhcSO9dTjxRMsq1E8nhZpqyop96kfcfPCcD4',
  },
};

// 전역 변수로 영화 데이터를 저장
let movies = [];

// 페이지 리로드
document.getElementById('title').addEventListener('click', function () {
  location.reload();
});

// 영화 정보 불러오기
async function fetchMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR', options);
    const data = await response.json();
    movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.error('영화 데이터를 불러오는 데 실패했습니다.', error);
  }
}

// 불러온 데이터를 DOM 트리 요소에 추가하기
function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';
  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie-element';
    movieElement.innerHTML = `
    <h3>${movie.title}</h3>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p>${movie.overview}</p>
    <span>${movie.vote_average}</span>
    `;
    movieElement.addEventListener('click', () => alert(`영화 ID: ${movie.id}`));
    movieList.appendChild(movieElement);
  });
}

document.addEventListener('DOMContentLoaded', fetchMovies);

// 자동으로 검색에 커서 위치 시키기
document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
  document.getElementById('search-input').focus();
});

document.getElementById('search-btn').addEventListener('click', function (event) {
  event.preventDefault();
  const keyword = document.getElementById('search-input').value;
  searchMovies(keyword);
});

//.toLowerCase로 대소문자 구분없이 검색
function searchMovies(keyword) {
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(keyword.toLowerCase()));
  displayMovies(filteredMovies);
}
