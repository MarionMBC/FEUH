
const btnLike = document.getElementById('like');
const btnUnlike = document.getElementById('unlike');
const btnAbs = document.getElementById('abstener');



//LocalStorage
/*if (!localStorage.getItem('id')) {
  socket.emit ('client:reqLocalS')
  socket.on ('server:resLocalS', (ls) => {
    localStorage.setItem('id', ls)
    console.log(ls)
  })
}*/


setLocalStorage();

/*var shVotacion = document.getElementById('votacion');
var shDisabled = document.getElementById('disabled');*/

var like = 0;
var unlike = 0;
var abs = 0;


//Ocultar la ventana de ya votó
// shDisabled.style.display = 'none';
hideDisabled();

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

          // socket.emit('client:like');
          voteLike();
          // shVotacion.style.display = 'none';
          // shDisabled.style.display = 'flex'
          hideVotacion ()
          showDisabled()
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
          hideVotacion()
          showDisabled()
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
        /*shVotacion.style.display = 'none';
        shDisabled.style.display = 'flex';
        socket.emit('client:abs')*/
        hideVotacion()
        showDisabled()
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






