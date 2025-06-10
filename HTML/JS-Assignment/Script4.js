let movies = JSON.parse(localStorage.getItem('movies')) || [];

function saveMovies() {
  localStorage.setItem('movies', JSON.stringify(movies));
}

function renderMovies() {
  const tbody = document.querySelector("#movieTable tbody");
  tbody.innerHTML = "";
  movies.forEach((movie, index) => {
    const row = `<tr>
      <td>${movie.title}</td>
      <td>${movie.gender}</td>
      <td>${movie.year}</td>
      <td>
        <button onclick="editMovie(${index})">Edit</button>
        <button onclick="deleteMovie(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function editMovie(index) {
  const movie = movies[index];
  document.getElementById("title").value = movie.title;
  document.getElementById("gender").value = movie.gender;
  document.getElementById("year").value = movie.year;
  document.getElementById("editIndex").value = index;
}

function deleteMovie(index) {
  if (confirm("Are you sure you want to delete this movie?")) {
    movies.splice(index, 1);
    saveMovies();
    renderMovies();
  }
}

document.getElementById("movieForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const year = parseInt(document.getElementById("year").value);
  const index = document.getElementById("editIndex").value;

  if (title === "" || gender === "" || isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
    alert("Please enter valid data.");
    return;
  }

  const movie = { title, gender, year };

  if (index === "") {
    movies.push(movie);
  } else {
    movies[parseInt(index)] = movie;
    document.getElementById("editIndex").value = "";
  }

  saveMovies();
  renderMovies();
  this.reset();
});

renderMovies();
