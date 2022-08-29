
const btnLike = document.getElementById('like');
const btnUnlike = document.getElementById('unlike');
const btnAbs = document.getElementById('abstener');

setLocalStorage();


var like = 0;
var unlike = 0;
var abs = 0;

hideVote();
hideVoted();
hideResults ();

send.addEventListener('click', () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'ms-2 btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro de tu pregunta?',
    text: "¡No podrás retractarte!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, enviar!',
    cancelButtonText: '¡No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
          '¡Enviada!',
          'Tu pregunta ha sido enviada.',
          'success'
      )
      sendQuestion()
      hideForm();
      showVote();
      showResults();
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
          'Cancelado',
          'Formula una nueva pregunta :)',
          'error'
      )
    }
  })
})



btnLike.addEventListener ("click", ()=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'ms-2 btn btn-primary',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de tu voto?',
        text: "¡No podrás retractarte!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, votar!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Registrado!',
            'Tu voto ha sido enviado.',
            'success'
          )
          voteLike();
          hideVote ()
          showVoted()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Realiza tu voto :)',
            'error'
          )
        }
      })
})


btnUnlike.addEventListener ("click", ()=> {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'ms-2 btn btn-primary',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de tu voto?',
        text: "¡No podrás retractarte!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, votar!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Registrado!',
            'Tu voto ha sido enviado.',
            'success'
          )
          // shVotacion.style.display = 'none';
          // shDisabled.style.display = 'flex'
          // socket.emit('client:unLike')
          hideVote()
          showVoted()
          voteUnLike();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Realiza tu voto :)',
            'error'
          )
        }
      })
})

btnAbs.addEventListener ("click", ()=>{
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'ms-2 btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de reservar tu voto?',
      text: "¡No podrás retractarte!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, me abstengo!',
      cancelButtonText: '¡No, quiero votar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Voto abstenido!',
          'Has decidido no votar.',
          'success'
        )

        hideVote()
        showVoted()
        voteAbs();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Realiza tu voto :)',
          'error'
        )
      }
    })
})

document.getElementById('btnCloseVotation').addEventListener('click', () =>{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'ms-2 btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Estás seguro de cerrar la votación?',
    text: "¡No podrás retractarte!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, cerrar!',
    cancelButtonText: '¡Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
          '¡Votación Cerrada!',
          'La votación se ha cerrado',
          'success'
      )
      socket.emit('client:closeVotation')
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
          'Cancelado',
          'La votación sigue :)',
          'error'
      )
    }
  })
})

