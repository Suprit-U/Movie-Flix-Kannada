document.addEventListener("DOMContentLoaded", () =>
{
    const movieContainer = document.getElementById("movie-container");
    const movieInfo = document.getElementById("movie-info");
    const movieInfoContent = document.getElementById("movie-info-content");
    const recommendMoviesTab = document.getElementById("recommend-movies-tab");
    const allMoviesTab = document.getElementById("all-movies-tab");
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const sideMenu = document.getElementById("side-menu");
    const addMovieBtn = document.getElementById("add-movie-btn");
    const deleteMovieBtn = document.getElementById("delete-movie-btn");
    const addMovieModal = document.getElementById("add-movie-modal");
    const deleteMovieModal = document.getElementById("delete-movie-modal");
    const addMovieForm = document.getElementById("add-movie-form");
    const deleteMovieForm = document.getElementById("delete-movie-form");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const sortToggle = document.getElementById("sort-toggle");
    const sortContainer = document.getElementById("sort-container");
    const main = document.querySelector("main");
    const closeInfoBtn = document.querySelector(".close-btn");

    let currentSort = 'ASC';
    let currentTab = 'recommend';

    function fetchMovies(url)
    {
        fetch(url)
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data =>
            {
                renderMovies(data);
            })
            .catch(error =>
            {
                console.error("Error fetching movies:", error);
                movieContainer.innerHTML = `<p>Error loading movies. Please try again later.</p>`;
            });
    }

    function renderMovies(movies)
    {
        movieContainer.innerHTML = movies.map(movie =>
            `<div class="movie" data-id="${movie.movie_id}">
                <img src="${movie.thumbnail_url}" alt="${movie.title} poster" class="movie-poster">
                <h3>${movie.title}</h3>
                <p>(${movie.release_year})</p>
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
            </div>`
        ).join('');
        addMovieClickListeners();
    }

    function addMovieClickListeners()
    {
        document.querySelectorAll(".movie").forEach(movie =>
        {
            movie.addEventListener("click", () =>
            {
                const movieId = movie.getAttribute("data-id");
                fetchMovieInfo(movieId);
            });
        });
    }

    function fetchMovieInfo(id)
    {
        fetch(`http://localhost:3000/get_movie_info?id=${id}`)
            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data =>
            {
                displayMovieInfo(data);
            })
            .catch(error =>
            {
                console.error("Error fetching movie info:", error);
                movieInfoContent.innerHTML = `<p>Error loading movie information. Please try again later.</p>`;
            });
    }

    function displayMovieInfo(data)
    {
        movieInfoContent.innerHTML = `
            <h2>${data.title}</h2>
            <p><strong>Release Year:</strong> ${data.release_year}</p>
            <p><strong>Genre:</strong> ${data.genre}</p>
            <p><strong>Rating:</strong> ${data.rating}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Artists:</strong> ${data.artists}</p>
            <p><strong>Roles:</strong> ${data.roles}</p>
            <img src="${data.thumbnail_url}" alt="${data.title} poster" class="movie-poster">
        `;
        movieInfo.classList.add('open');
    }

    function showRecommendMovies()
    {
        currentTab = 'recommend';
        sortContainer.style.display = 'none';
        fetchMovies('http://localhost:3000/get_recommend_movies');
        toggleMenu();
    }

    function showAllMovies()
    {
        currentTab = 'all';
        sortContainer.style.display = 'flex';
        fetchMovies(`http://localhost:3000/get_all_movies?sort=${currentSort}`);
        toggleMenu();
    }

    function toggleMenu()
    {
        sideMenu.classList.toggle('open');
        main.classList.toggle('menu-open');
    }

    function showAddMovieModal()
    {
        addMovieModal.style.display = "block";
    }

    function showDeleteMovieModal()
    {
        deleteMovieModal.style.display = "block";
    }

    function hideModals()
    {
        addMovieModal.style.display = "none";
        deleteMovieModal.style.display = "none";
    }

    function searchMovies()
    {
        const query = searchInput.value.trim();
        if (query)
        {
            fetchMovies(`http://localhost:3000/search_movies?query=${encodeURIComponent(query)}`);
            toggleMenu();
        }
    }

    function sortMovies()
    {
        currentSort = currentSort === 'ASC' ? 'DESC' : 'ASC';
        sortToggle.textContent = `Sort: ${currentSort === 'ASC' ? 'Ascending' : 'Descending'}`;
        fetchMovies(`http://localhost:3000/get_all_movies?sort=${currentSort}`);
    }

    function addMovie()
    {
        const title = document.getElementById("title").value.trim();
        const releaseYear = document.getElementById("release-year").value.trim();
        const genre = document.getElementById("genre").value.trim();
        const rating = document.getElementById("rating").value.trim();
        const thumbnailUrl = document.getElementById("thumbnail-url").value.trim();

        if (title && releaseYear && genre && rating && thumbnailUrl)
        {
            fetch('http://localhost:3000/add_movie',
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                    {
                        title,
                        release_year: releaseYear,
                        genre,
                        rating,
                        thumbnail_url: thumbnailUrl
                    })
                })
                .then(response => response.json())
                .then(data =>
                {
                    if (data.error)
                    {
                        alert(data.error);
                    }
                    else
                    {
                        hideModals();
                        fetchMovies('http://localhost:3000/get_all_movies?sort=ASC');
                    }
                })
                .catch(error =>
                {
                    console.error("Error adding movie:", error);
                    alert("Error adding movie. Please try again later.");
                });
        }
        else
        {
            alert("Please fill in all fields.");
        }
    }

    function deleteMovie()
    {
        const title = document.getElementById("delete-title").value.trim();

        if (title)
        {
            fetch('http://localhost:3000/delete_movie',
                {
                    method: 'DELETE',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                    {
                        title
                    })
                })
                .then(response => response.json())
                .then(data =>
                {
                    if (data.error)
                    {
                        alert(data.error);
                    }
                    else
                    {
                        hideModals();
                        fetchMovies('http://localhost:3000/get_all_movies?sort=ASC');
                    }
                })
                .catch(error =>
                {
                    console.error("Error deleting movie:", error);
                    alert("Error deleting movie. Please try again later.");
                });
        }
        else
        {
            alert("Please enter the movie title.");
        }
    }

    recommendMoviesTab.addEventListener("click", showRecommendMovies);
    allMoviesTab.addEventListener("click", showAllMovies);
    menuToggle.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);
    addMovieBtn.addEventListener("click", showAddMovieModal);
    deleteMovieBtn.addEventListener("click", showDeleteMovieModal);
    addMovieForm.addEventListener("submit", event =>
    {
        event.preventDefault();
        addMovie();
    });
    deleteMovieForm.addEventListener("submit", event =>
    {
        event.preventDefault();
        deleteMovie();
    });
    searchBtn.addEventListener("click", searchMovies);
    sortToggle.addEventListener("click", sortMovies);
    closeInfoBtn.addEventListener("click", () =>
    {
        movieInfo.classList.remove('open');
    });
});