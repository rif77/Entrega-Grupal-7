let botonbuscar = document.getElementById("btnGet1");
let inputbuscar = document.getElementById("inputGet1Id");
let modal = document.getElementById("btnPut");
let dataModal = document.getElementById("dataModal");

function abrirModal(){
    modal.addEventListener('onclick',function(){
        console.log("hola")
        dataModal.toggle()
    }
    )
    }
