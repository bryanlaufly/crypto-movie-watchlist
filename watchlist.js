const cards = document.getElementById("cards")

function renderCards(){
    for ( let i = 0; i < localStorage.length; i++){
            cards.innerHTML += JSON.parse(localStorage.getItem(localStorage.key(i)))
    }
    document.querySelectorAll(".watchlistBtn").forEach(btn => btn.textContent = "Remove")    
}

function handleWatchlist(movieID, el){
    el.parentElement.parentElement.parentElement.remove()
    localStorage.removeItem(movieID)
}

renderCards()