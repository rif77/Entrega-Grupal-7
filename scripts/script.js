let botonBuscar = document.getElementById("btnGet1");
let IDaBuscar = document.getElementById("inputGet1Id");

let botonAgregar = document.getElementById("btnPost");
let nuevoNombre = document.getElementById("inputPostNombre");
let nuevoApellido = document.getElementById("inputPostApellido");

let botonModificar = document.getElementById("btnPut");
let IDaModificar = document.getElementById("inputPutId");
let ModificarNombre = document.getElementById("inputPutNombre");
let ModificarApellido = document.getElementById("inputPutApellido");
let modificar = document.getElementById("btnSendChanges");

let botonBorrar = document.getElementById("btnDelete");
let IDaEliminar = document.getElementById("inputDelete");



let URL = "https://6361a8e367d3b7a0a6cac31c.mockapi.io/users/";
let lista = [];
let resultados = document.getElementById("results");
let alerta = document.getElementById("alert-error");


function mostaralerta() {
    alerta.classList.remove("fade")
    setTimeout(function () {
        alerta.classList.add("fade");
    }, 3000);
}

botonBuscar.addEventListener('click', function (e) {
    if (IDaBuscar.value) {
        fetch(URL + IDaBuscar.value)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    mostaralerta();
                }
            })
            .then((data) => {
                if (data) {
                    resultados.innerHTML = `<li class="group-item ms-1">ID: ${data.id} </li> 
        <li class="group-item ms-1">NAME: ${data.name} </li>
        <li class="group-item ms-1">LASTNAME: ${data.lastname} </li>`;
                }
            });
    } else {
        fetch(URL)
            .then((response) => response.json())
            .then(function (data) {
                for (let objeto of data) {
                    resultados.innerHTML += `<li class="group-item ms-1">ID: ${objeto.id} </li> 
            <li class="group-item ms-1">NAME: ${objeto.name} </li>
            <li class="group-item ms-1">LASTNAME: ${objeto.lastname} </li>`;
                }
            });
    }
});

function generarID() {
    let ultimoID = ""
    ultimoID++;
    return ultimoID;
  }

botonAgregar.addEventListener("click", function (e) {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: generarID(),
        name: nuevoNombre.value,
        lastname: nuevoApellido.value,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(function () {
          fetch(URL)
            .then((response) => response.json())
            .then(function (data) {
              for (let objeto of data) {
                resultados.innerHTML += `<li class="group-item ms-1">ID: ${objeto.id} </li> 
        <li class="group-item ms-1">NAME: ${objeto.name} </li>
        <li class="group-item ms-1">LASTNAME: ${objeto.lastname} </li>`;
              }
            });
        }, 1000);
      });
  });

  nuevoNombre.addEventListener("input", function (e) {
    if (nuevoNombre.value.length > 0 && nuevoApellido.value.length > 0) {
        botonAgregar.disabled = false;
    } else {
        botonAgregar.disabled = true;
    }
  });
  nuevoApellido.addEventListener("input", function (e) {
    if (nuevoNombre.value.length > 0 && nuevoApellido.value.length > 0) {
        botonAgregar.disabled = false;
    } else {
        botonAgregar.disabled = true;
    }
});

modificar.addEventListener("click", function (e) {
    fetch(URL + IDaModificar.value, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: ModificarNombre.value,
        lastname: ModificarApellido.value,
      }),
    }).then((response) => {
      if (response.ok) {
        alerta.classList.add("fade");
        return response.json();
      } else {
        alerta.classList.remove("fade");
      }
    });
    fetch(URL)
      .then((response) => response.json())
      .then(function (datos) {
        setTimeout(function () {
          resultados.innerHTML = ``;
          fetch(URL)
            .then((response) => response.json())
            .then(function (data) {
              for (let objeto of data) {
                resultados.innerHTML += `<li class="group-item ms-1">ID: ${objeto.id} </li> 
        <li class="group-item ms-1">NAME: ${objeto.name} </li>
        <li class="group-item ms-1">LASTNAME: ${objeto.lastname} </li>`;
              }
            });
        }, 1000);
      });
  });

  IDaModificar.addEventListener("input", function (e) {
    if (IDaModificar.value.length > 0) {
      document.getElementById("btnPut").disabled = false;
    } else {
      document.getElementById("btnPut").disabled = true;
    }
  });


  
  botonBorrar.addEventListener("click", function (e) {
    fetch(URL + IDaEliminar.value, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        mostaralerta ();
      }
    });
    setTimeout(function () {
      fetch(URL)
        .then((response) => response.json())
        .then(function (datos) {
          setTimeout(function () {
            fetch(URL)
              .then((response) => response.json())
              .then(function (data) {
                for (let objeto of data) {
                  resultados.innerHTML += `<li class="group-item ms-1">ID: ${objeto.id} </li> 
        <li class="group-item ms-1">NAME: ${objeto.name} </li>
        <li class="group-item ms-1">LASTNAME: ${objeto.lastname} </li>`;
                }
              });
          }, 1000);
        });
    }, 1000);
  });

  IDaEliminar.addEventListener("input", function (e) {
    if (IDaEliminar.value.length > 0) {
        botonBorrar.disabled = false;
    } else {
        botonBorrar.disabled = true;
    }
  });