const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const searchResult = document.getElementById("searchResult")

searchBtn.addEventListener("click", function(){
    searchResult.innerHTML = ""
    fetch(`https://www.omdbapi.com/?apikey=e177e417&s=${searchInput.value}`)
        .then (response => response.json())
        .then ( data => { 
            if (data.Response === "False"){
                searchResult.innerHTML = `<h3>Sorry, No available movie</h3>`
            } else {
                data.Search.map( movie => renderHtml(movie))  
            }          
        })
})

function renderHtml(movie){
    fetch(`https://www.omdbapi.com/?apikey=e177e417&i=${movie.imdbID}`)
        .then (response => response.json())
        .then ( data => {
            const {imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot } = data    
             searchResult.innerHTML +=`
              <section class="movieItem">
                        <div class="moviePic">
                            <img src=${ Poster === 'N/A' ? "https://via.placeholder.com/300x500" : Poster}>
                        </div>
                        <div class="movieInfo">
                            <div class="movieTitleRating">
                                <h2>${Title}</h2><h2>${imdbRating}</h2>
                            </div>
                            <div class="movieRuntimeGenreWatchlist">
                                <h3> ${Runtime}</h3>
                                <h3> ${Genre}</h3>
                                <button id=${imdbID} class="watchlistBtn" onclick="handleWatchlist('${imdbID}', this)"> 
                                    Watchlist
                                </button>
                            </div> 
                                <p id="movieplot">${Plot}</p>            
                        </div>
                </section>
               ` 
        })
}

function handleWatchlist(movieID, el){  
        const movieItem = el.parentElement.parentElement.parentElement.outerHTML
        localStorage.setItem( movieID, JSON.stringify(movieItem))
        el.textContent = 'Added'
}
