var shVotacion = document.getElementById('votacion');
var shDisabled = document.getElementById('disabled');

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

function hideDisabled () {
    shDisabled.style.display = 'none';
}

function showDisabled () {
    shDisabled.style.display = 'flex'
}

function showVotacion () {
    shVotacion.style.display = 'flex';
}

function hideVotacion () {
    shVotacion.style.display = 'none';
}

