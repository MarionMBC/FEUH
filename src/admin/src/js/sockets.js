//Online
const socket = io();

socket.on('online', (online) => {
    document.getElementById('online').innerHTML = ` Online: ${online}`
})

function reqLocalS() {
    socket.emit('client:reqLocalS')
}

function resLocalS() {
    socket.on('server:resLocalS', (ls) => {
        localStorage.setItem('id', ls)
        console.log(ls)
    })
}

function setLocalStorage() {
    if (!localStorage.getItem('id')) {
        reqLocalS();
        resLocalS();
    }
}

function sendQuestion () {
    let question = document.getElementById('question').value;
    socket.emit('client:question', question);
}

socket.on ('server:question', (question) => {

    document.getElementById('resQuestion').innerHTML = question;
})

function voteLike() {
    socket.emit('client:like', localStorage.getItem('id'));
}

function voteUnLike() {
    socket.emit('client:unLike', localStorage.getItem('id'));
}

function voteAbs() {
    socket.emit('client:abs', localStorage.getItem('id'))
}



socket.on('error', (id) => {
    if (localStorage.getItem('id') === id) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Tu voto fue rechazado!',
            footer: 'Has intentado votar más de una vez.'
        })
    }
})

socket.on('server:like', (likes) => {
    document.getElementById('like-counter').innerHTML = likes;
})
socket.on('server:unLike', (unLikes) => {
    document.getElementById('unLike-counter').innerHTML = unLikes;
})
socket.on('server:abs', (abs) => {
    document.getElementById('abs-counter').innerHTML = abs;
})

socket.on ('server:votationClosed', () => {
    localStorage.removeItem('id');
    let timerInterval
    Swal.fire({
        title: '¡Votación cerrada!',
        html: 'Redirigiendo en <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            location.reload();
        }
    })
})

