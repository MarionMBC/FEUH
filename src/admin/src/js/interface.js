var form = document.getElementById('form');
var vote = document.getElementById('vote');
var voted = document.getElementById('voted')
var results = document.getElementById('results')

async function sendName() {
    const {value: name} = await Swal.fire({
        title: 'Ingresa tu nombre completo',
        input: 'text',
        inputLabel: 'Nombre Completo',
        inputPlaceholder: 'Ingresa tu nombre completo',
        inputAttributes: {
            maxlength: 50,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (name) {
        Swal.fire(`Nombre ingresado: ${name}`)
        console.log(name)
    }
}
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



