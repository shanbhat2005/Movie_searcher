 const movieInput = document.querySelector('input');
        const movieForm = document.querySelector('#form-movie');
        const resultDiv = document.querySelector('#result');

        // This is the main function to get movie data
        async function getMovieData(movieTitle) {
            const apiKey = 'b80ab837'; // Your API key
            const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
            
            // Show a loading message while we fetch the data
            resultDiv.innerHTML = `<p class="message">Loading...</p>`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                // Check if the API returned a successful response
                if (data.Response === "True") {
                    // If the movie is found, build the card HTML and display it
                    resultDiv.innerHTML = `
                        <div class="movie-card">
                            <img class="movie-poster-img" src="${data.Poster}" alt="Poster for ${data.Title}">
                            <div class="movie-details">
                                <h3 class="movie-title">${data.Title}</h3>
                                <p class="movie-year">${data.Year}</p>
                            </div>
                        </div>
                    `;
                } else {
                    // If the movie is not found, show the error message from the API
                    resultDiv.innerHTML = `<p class="message">${data.Error}</p>`;
                }

            } catch(error) {
                // If there's a network error, show a generic error message
                console.error('Error:', error);
                resultDiv.innerHTML = `<p class="message">Something went wrong. Please try again.</p>`;
            }
        }

        // Add the event listener to the form
        movieForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the page from reloading
            
            // Get the text from the input box, and remove extra spaces
            const movieTitle = movieInput.value.trim();

            // Only run the search if the user typed something
            if (movieTitle !== "") {
                getMovieData(movieTitle);
            }
        });