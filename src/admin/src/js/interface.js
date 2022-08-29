var form = document.getElementById('form');
var vote = document.getElementById('vote');
var voted = document.getElementById('voted')
var results = document.getElementById('results')
function  showResults () {
    results.style.display = 'flex';
}
function  hideResults () {
    results.style.display = 'none';
}
function hideForm () {
    form.style.display = 'none';
}

function showVote () {
    vote.style.display = 'flex'
}

function hideVote () {
    vote.style.display = 'none'
}

function hideVoted () {
    voted.style.display = 'none';
}

function showVoted () {
    voted.style.display = 'flex';
}



