const MENU = document.querySelector("#menu")
const RUTEO = document.querySelector("#ruteo")
const HOME = document.querySelector("#pantalla-home")
const LOGIN = document.querySelector("#pantalla-login")
const REGISTRO = document.querySelector("#pantalla-registro")
const EVENTOAGREGAR = document.querySelector("#pantalla-eventoAgregar")
const LISTADOEVENTOS = document.querySelector("#pantalla-eventoListado")
const MAPA = document.querySelector("#pantalla-mapa")
const INFORME = document.querySelector("#pantalla-Info")
// ACA VAN SUMANDO CONSTANTES DE ACUERDO A LA CANTIDAD DE PANTALLAS QUE VAN CREANDO
document.querySelector("#btnCargarC").addEventListener("click", cargarCiudades)
document.querySelector("#btnCargarListado").addEventListener("click", previaListado)

function cerrarMenu() {
    MENU.close()
}

inicio()
obtenerInformacion()


function inicio() {
    chequearSesion()
    RUTEO.addEventListener("ionRouteDidChange", navegar)
    document.querySelector("#btnHacerLogin").addEventListener("click", previaHacerLogin)
    document.querySelector("#btnHacerRegistro").addEventListener("click", previaHacerRegistro)
    document.querySelector("#btnLogout").addEventListener("click", cerrarSesion)
    document.querySelector("#btnAgregarElEvento").addEventListener("click", previaAgregarEvento)
    //   document.querySelector("#btnListadoEventos").addEventListener("click")
    document.querySelector("#btnMapa").addEventListener("click", obtenerInformacionPlazas)

}

function obtenerInformacionCategorias() {

    fetch(`https://babytracker.develotion.com/categorias.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token"),
            'iduser': localStorage.getItem("id")
        }
    })
        .then(function (response) {
            //  console.log(response)
            return response.json()
        })
        .then(function (respuesta) {
            //  console.log(respuesta)
            categorias = respuesta.categorias
            mostrarCategorias(respuesta.categorias)

        })
        .catch(function (error) {
            console.log(error)
        })
}

function mostrarCategorias(listaCategorias) {
    // console.log(listaCategorias)
    let miSelect = ""
    for (let unaCategoria of listaCategorias) {
        miSelect += `<ion-select-option value= "${unaCategoria.id}"> - ${unaCategoria.tipo} </ion-select-option>`
    }
    document.querySelector("#slcCategoria").innerHTML = miSelect
}

function listadoEventos() { }

function navegar(evt) {


    ocultarPantallas()
    if (evt.detail.to == "/") { HOME.style.display = "block" }
    if (evt.detail.to == "/login") { LOGIN.style.display = "block" }
    if (evt.detail.to == "/registro") { REGISTRO.style.display = "block" }
    if (evt.detail.to == "/eventoAgregar") { EVENTOAGREGAR.style.display = "block" }
    if (evt.detail.to == "/eventoListado") { LISTADOEVENTOS.style.display = "block" }
    if (evt.detail.to == "/mapa") { MAPA.style.display = "block" }
    if (evt.detail.to == "/eventoInforme") { INFORME.style.display = "block" }



    // ACA VAN SUMANDO IF DE ACUERDO A LA CANTIDAD DE PANTALLAS QUE TENGAN

}




function ocultarPantallas() {
    HOME.style.display = "none"
    LOGIN.style.display = "none"
    REGISTRO.style.display = "none"
    EVENTOAGREGAR.style.display = "none"
    LISTADOEVENTOS.style.display = "none"
    MAPA.style.display = "none"
    INFORME.style.display = "none"
    // ACA RECUERDEN DE OCULTAR CADA PANTALLA QUE CREAN
}

function previaHacerRegistro() {
    let usuarioN = document.querySelector("#txtRegistroUsuario").value
    let passwordU = document.querySelector("#txtRegistroContrasenia").value
    let departamentoU = document.querySelector("#slcRegistroDpto").value
    let ciudadU = document.querySelector("#slcRegistroCiudades").value

    let Usu = new Object()
    Usu.usuario = usuarioN
    Usu.password = passwordU
    Usu.idDepartamento = departamentoU
    Usu.idCiudad = ciudadU

    /// console.log(Usu)

    hacerRegistro(Usu)

}

function hacerRegistro(Usu) {

    fetch(`https://babytracker.develotion.com/usuarios.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Usu)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (informacion) {
            //     console.log(informacion)

            //OJO LA RESPUESTA EN SU OBLIGATORIO si es que viene así
            localStorage.setItem("id", informacion.id)
            localStorage.setItem("token", informacion.apiKey)
            localStorage.setItem("codigo", informacion.codigo)
            // if(informacion.codigo == 200){
            //   localStorage.setItem("usuario", usuario.usuario)
            //  localStorage.setItem("contrasenia",usuario.password)

            // }
            //  localStorage.setItem("usuario", usuario.usuario)
            ocultarPantallas()
            HOME.style.display = "block"
            mostrarMenuVIP()
        })
        .catch(function (error) {
            console.log(error)
        })

}


function ocultarBotones() {
    document.querySelector("#btnHome").style.display = "none"
    document.querySelector("#btnLogin").style.display = "none"
    document.querySelector("#btnRegistrar").style.display = "none"
    document.querySelector("#btnAgregarEvento").style.display = "none"
    document.querySelector("#btnListadoEventos").style.display = "none"
    document.querySelector("#btnMapa").style.display = "none"
    document.querySelector("#btnInforme").style.display = "none"


    document.querySelector("#btnLogout").style.display = "none"
}

function mostrarMenuAnonimo() {
    ocultarBotones()
    document.querySelector("#btnHome").style.display = "block"
    document.querySelector("#btnLogin").style.display = "block"
    document.querySelector("#btnRegistrar").style.display = "block"

}

function mostrarMenuVIP() {
    ocultarBotones()
    document.querySelector("#btnHome").style.display = "block"
    document.querySelector("#btnRegistrar").style.display = "block"
    document.querySelector("#btnAgregarEvento").style.display = "block"
    document.querySelector("#btnListadoEventos").style.display = "block"
    document.querySelector("#btnAgregarEvento").addEventListener("click", obtenerInformacionCategorias)
    document.querySelector("#btnMapa").style.display = "block"
    document.querySelector("#btnInforme").style.display = "block"
    document.querySelector("#btnInforme").addEventListener("click", previaCalcularInformacion)



    document.querySelector("#btnLogout").style.display = "block"


}

function chequearSesion() {
    ocultarBotones()
    if (localStorage.getItem("usuario") == null) {
        mostrarMenuAnonimo()
    } else {
        mostrarMenuVIP()
    }
}

function previaHacerLogin() {
    let nombreUsuario = document.querySelector("#txtLoginUsuario").value
    let contrasenia = document.querySelector("#txtLoginContrasenia").value

    let usuario = new Object()
    usuario.usuario = nombreUsuario
    usuario.password = contrasenia

    hacerLogin(usuario)
}


function hacerLogin(usuario) {
    fetch(`https://babytracker.develotion.com/login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (informacion) {
            // console.log(informacion)

            //OJO LA RESPUESTA EN SU OBLIGATORIO si es que viene así
            localStorage.setItem("id", informacion.id)
            localStorage.setItem("token", informacion.apiKey)
            localStorage.setItem("codigo", informacion.codigo)
            // if(informacion.codigo == 200){
            //   localStorage.setItem("usuario", usuario.usuario)
            //  localStorage.setItem("contrasenia",usuario.password)

            // }
            localStorage.setItem("usuario", usuario.usuario)
            ocultarPantallas()
            HOME.style.display = "block"
            mostrarMenuVIP()
        })
        .catch(function (error) {
            console.log(error)
        })


}


function cerrarSesion() {
    ocultarPantallas()
    HOME.style.display = "block"
    mostrarMenuAnonimo()
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    localStorage.removeItem("codigo")
}

function obtenerInformacion() {

    fetch("https://babytracker.develotion.com/departamentos.php")
        .then(function (response) {
            return response.json()
        })
        .then(function (informacion) {

            cargarSelect(informacion.departamentos)
        })
        .catch(function (error) {

        })

}

function cargarSelect(listaDepartamentos) {
    let miSelect = ""
    for (let unDepartamento of listaDepartamentos) {
        miSelect += `<ion-select-option value= "${unDepartamento.id}">${unDepartamento.id} - ${unDepartamento.nombre} </ion-select-option>`
    }
    document.querySelector("#slcRegistroDpto").innerHTML = miSelect
}

function obtenerInformacionCiudades() {

    let id = document.querySelector("#slcRegistroDpto").value
    let url = "https://babytracker.develotion.com/ciudades.php?idDepartamento=" + id
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (informacion) {
            //  console.log(informacion)
            cargarSelectCiudades(informacion.ciudades)
        })
        .catch(function (error) {

        })

}

function cargarCiudades() {
    obtenerInformacionCiudades()
    // obtener la información en base al departamento
    // mostrar la información en un select
}

function cargarSelectCiudades(listaCiudades) {
    let miSelect = ""
    for (let unaCiudad of listaCiudades) {
        miSelect += `<ion-select-option value= "${unaCiudad.id}">${unaCiudad.id} - ${unaCiudad.nombre} </ion-select-option>`
    }
    document.querySelector("#slcRegistroCiudades").innerHTML = miSelect
}
//document.querySelector("#btnAgregarElEvento").addEventListener("click", previaAgregarEvento)

function previaAgregarEvento() {

    let idC = document.querySelector("#slcCategoria").value
    let idU = localStorage.getItem("id")
    let detalle = document.querySelector("#txtDetalle").value
    let fecha = document.querySelector("#timeEvento").value

    let Evento = new Object()
    Evento.idCategoria = idC
    Evento.idUsuario = idU
    Evento.detalle = detalle
    Evento.fecha = fecha

    generarEvento(Evento)
    console.log(Evento)
}



function generarEvento(nuevoEvento) {
    console.log(nuevoEvento)
    fetch(`https://babytracker.develotion.com/eventos.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token"),
            'iduser': localStorage.getItem("id")
        },
        body: JSON.stringify(nuevoEvento)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data && data.codigo > 399) {
                throw data.error;
            } else {
                console.log(data)
                //   mostrarMensaje("SUCCESS", "Evento creado exitosamente", "Todo bien", 3000)
                //  ocultarPantalla()
                HOME.style.display = "block"
            }


        })
        .catch(function (error) {
            console.log(error)
        })


}

function agregarEvento(Evento) {

    console.log(Evento)
    fetch(`https://babytracker.develotion.com/eventos.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token"),
            'iduser': localStorage.getItem("id")
        },
        body: JSON.stringify(Evento)

    })

        .then(function (response) {
            return response.json()

        })
        .then(function (informacion) {
            console.log(informacion)
            document.getElementById('mensajeExito').style.display = 'block';
            //OJO LA RESPUESTA EN SU OBLIGATORIO si es que viene así
            //  localStorage.setItem("id", informacion.id)
            //  localStorage.setItem("token", informacion.apiKey)
            // localStorage.setItem("codigo", informacion.codigo)
            // if(informacion.codigo == 200){
            //   localStorage.setItem("usuario", usuario.usuario)
            //  localStorage.setItem("contrasenia",usuario.password)

            // }
            //  localStorage.setItem("usuario", usuario.usuario)
            ocultarPantallas()
            HOME.style.display = "block"
            mostrarMenuVIP()
        })
        .catch(function (error) {
            console.log(error)
        })
    // obtenerInformacionCategorias()
}

//Listado
//document.querySelector("#btnListadoEventos").addEventListener("click",previaListado)

function previaListado() {
    fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem("id")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("token"), // suponiendo que tengo eso en el localstorage
            "iduser": localStorage.getItem("id") // acá "apikey" y "iduser" salen de la documentación de la API
        },
    })
        .then(function (response) {
            return response.json()

        })

        .then(function (respuesta) {
            console.log(respuesta.eventos)
            // con el console.log anterior se ve como viene la respuesta y ahí se sabe cual es el  array
            // en este ejemplo lista
            hacerListado(respuesta.eventos);
        })
        .catch(function (error) {
            console.log(error)
        })

}
/*
function hacerListado(eventos) {

    let tipo = document.querySelector("#slcFechaListado").value;
    let verEventos = ``;
    console.log(tipo)
    if (tipo === "Hoy") {
        let hoy = new Date().toISOString().split('T')[0];  // Obtener solo la parte de la fecha en formato 'YYYY-MM-DD'

console.log(hoy)

        for (let unEvento of eventos) {
            if (unEvento.fecha == hoy) {
                console.log(unEvento.fecha)
                verEventos += `<ion-item>
                        <ion-label>
                            <h3>Id: ${unEvento.id}</h3>
                            <h3>Fecha: ${unEvento.fecha}</h3>
                            <p>Detalle: ${unEvento.detalle}</p>
                            <img src="https://babytracker.develotion.com/imgs/${unEvento.idCategoria - 30}.png" alt="Imagen del evento"></img>
                        </ion-label>
                        <ion-button onclick="eliminarEvento(${unEvento.id})">Eliminar</ion-button>
                    </ion-item>`;
            }
        }
  //  console.log(verEventos)
       
    }

    
    if (tipo === "Anteriores") {
        let hoy = new Date().toISOString().split('T')[0];  // Obtener solo la parte de la fecha en formato 'YYYY-MM-DD'

        for (let unEvento of eventos) {
            if (unEvento.fecha < hoy) {
                verEventos += `<ion-item>
                        <ion-label>
                            <h3>Id: ${unEvento.id}</h3>
                            <h3>Fecha: ${unEvento.fecha}</h3>
                            <p>Detalle: ${unEvento.detalle}</p>
                            <img src="https://babytracker.develotion.com/imgs/${unEvento.idCategoria - 30}.png" alt="Imagen del evento"></img>
                        </ion-label>
                        <ion-button onclick="eliminarEvento(${unEvento.id})">Eliminar</ion-button>
                    </ion-item>`;
            }
        }
console.log(verEventos) 
    }

    document.querySelector("#contenedorListado").innerHTML = verEventos;


}
*/

function hacerListado(eventos) {
    let tipo = document.querySelector("#slcFechaListado").value;
    let verEventos = ``;
    let hoy = new Date().toISOString().split('T')[0];  // Obtener solo la parte de la fecha en formato 'YYYY-MM-DD'
    
    console.log("Tipo seleccionado:", tipo);
    console.log("Fecha de hoy:", hoy);
//Falla del codigo enviado ACAAAA me habia faltado castear una fecha a date time y eliminar las horas,minutos y segundos
    if (tipo === "Hoy") {
        for (let unEvento of eventos) {
          //  console.log(unEvento.fecha)
          //  console.log(hoy)
        unEventoFecha = new Date (unEvento.fecha )
       unEventoFecha = unEventoFecha.toISOString().split('T')[0];
    //    console.log( unEventoFecha)
//

            if (unEventoFecha == hoy) {
                console.log("Evento de hoy encontrado:", unEvento.fecha);
                verEventos += `<ion-item>
                    <ion-label>
                        <h3>Id: ${unEvento.id}</h3>
                        <h3>Fecha: ${unEvento.fecha}</h3>
                        <p>Detalle: ${unEvento.detalle}</p>
                        <img src="https://babytracker.develotion.com/imgs/${unEvento.idCategoria - 30}.png" alt="Imagen del evento"></img>
                    </ion-label>
                    <ion-button onclick="eliminarEvento(${unEvento.id})">Eliminar</ion-button>
                </ion-item>`;
            }
        }
    }
    if (tipo === "Anteriores") {
        for (let unEvento of eventos) {
            if (unEvento.fecha < hoy) {
                console.log("Evento anterior encontrado:", unEvento.fecha);
                verEventos += `<ion-item>
                    <ion-label>
                        <h3>Id: ${unEvento.id}</h3>
                        <h3>Fecha: ${unEvento.fecha}</h3>
                        <p>Detalle: ${unEvento.detalle}</p>
                        <img src="https://babytracker.develotion.com/imgs/${unEvento.idCategoria - 30}.png" alt="Imagen del evento"></img>
                    </ion-label>
                    <ion-button onclick="eliminarEvento(${unEvento.id})">Eliminar</ion-button>
                </ion-item>`;
            }
        }
    }

    // Asignar el contenido generado al contenedor
  //  console.log("Eventos generados:", verEventos);
    document.querySelector("#contenedorListado").innerHTML = verEventos;


}




function eliminarEvento(idProducto) {
    fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${idProducto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "apikey": localStorage.getItem("token"),
            "iduser": localStorage.getItem("id")
        },
        body: { "idProducto": idProducto }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data && data.error) {
                throw data.error;
            } else {
                // acá pueden mostrar un mensaje de éxito y luego vuelven a llamar a la previa
                // para que se refresque
                previaListado()
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}


obtenerInformacionPlazas()
obtenerMiPosiscion()
//Obtengo mi posición 
function obtenerMiPosiscion() {
    navigator.geolocation.getCurrentPosition(miUbicacion)
}
//Muestro mi ubicación
function miUbicacion(position) {
    //   console.log(position)
    miLatitud = position.coords.latitude
    miLongitud = position.coords.longitude


}

//Peticion a la api para saber la ubicacion y info de las plazas
function obtenerInformacionPlazas() {

    fetch(`https://babytracker.develotion.com/plazas.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem("token"),
            'iduser': localStorage.getItem("id")
        }
    })
        .then(function (response) {
            //      console.log(response)
            return response.json()
        })
        .then(function (respuesta) {
            // console.log(respuesta)
            plazas = respuesta.plazas
            setTimeout(function () { armarMapa() }, 3000)

        })
        .catch(function (error) {
            console.log(error)
        })
}

//Se encarga de armar el mapa en pantalla
function armarMapa() {
    map = L.map('map').setView([miLatitud, miLongitud], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let circle = L.circle([miLatitud, miLongitud], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(map);

    for (let unaPlaza of plazas) {
        let marker = L.marker([unaPlaza.latitud, unaPlaza.longitud]).addTo(map);

        let popupContent = `<b>${unaPlaza.idPlaza}</b><br>`;

        if (unaPlaza.accesible === 1) {
            popupContent += "Plaza Accesible<br>";
        } else {
            popupContent += "Plaza No Accesible<br>";
        }

        if (unaPlaza.aceptaMascotas === 1) {
            popupContent += "Plaza Acepta Mascotas";
        } else {
            popupContent += "Plaza No Acepta Mascotas";
        }

        marker.bindPopup(popupContent).openPopup();
    }

}


function previaCalcularInformacion() {
    fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem("id")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apikey": localStorage.getItem("token"), // suponiendo que tengo eso en el localstorage
            "iduser": localStorage.getItem("id") // acá "apikey" y "iduser" salen de la documentación de la API
        },
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (respuesta) {
            //  console.log(respuesta.eventos)
            // con el console.log anterior se ve como viene la respuesta y ahí se sabe cual es el  array
            // en este ejemplo lista
            calcularInformacion(respuesta.eventos);
        })
        .catch(function (error) {
            console.log(error)
        })

}
/*
function calcularInformacion(eventos) {
    console.log(eventos)

    let contPañales = 0;
    let contBiberones = 0;
    let horaUltimoBiberon = "";
    let horaUltimoPañal = "";
    let ahora = new Date()
 
// Obtener fecha en formato YYYY-MM-DD
let fecha = ahora.toISOString().split('T')[0]; // "2024-08-12"

// Obtener hora en formato HH:MM:SS
let hora = ahora.toTimeString().split(' ')[0]; // "14:35:20"

// Combinar fecha y hora en una misma variable
let fechaYHora = `${fecha} ${hora}`; // "2024-08-12 14:35:20"






    for (let unEvento of eventos) {

        if (unEvento.idCategoria === 33) {
            contPañales++
        }
        if (unEvento.idCategoria === 35)
            contBiberones++
    }


    for (let unEvento of eventos) {

        if (unEvento.fecha > horaUltimoBiberon && unEvento.idCategoria === 35) { horaUltimoBiberon = unEvento.fecha }
        if (unEvento.fecha > horaUltimoPañal && unEvento.idCategoria === 33) { horaUltimoPañal = unEvento.fecha }


    }

    document.querySelector("#pCantBiberones").innerHTML = contBiberones
    document.querySelector("#pUltimoBiberon").innerHTML = horaUltimoBiberon

    document.querySelector("#pCantPaniales").innerHTML = contPañales
    document.querySelector("#pUltimoPanial").innerHTML = horaUltimoPañal

console.log(horaUltimoBiberon < fechaYHora)
}

*/



function calcularInformacion(eventos) {
    console.log(eventos);

    let contPañales = 0;
    let contBiberones = 0;
    let horaUltimoBiberon = ""; // Almacenará la última fecha del biberón
    let horaUltimoPañal = ""; // Almacenará la última fecha del pañal
    let ahora = new Date();

    // Obtener fecha y hora actuales
    let fechaYHora = ahora.toISOString(); // Obtiene la fecha y hora actuales en formato ISO

    for (let unEvento of eventos) {
        if (unEvento.idCategoria === 33) {
            contPañales++;
        }
        if (unEvento.idCategoria === 35) {
            contBiberones++;
        }
    }

    for (let unEvento of eventos) {
        if (unEvento.fecha > horaUltimoBiberon && unEvento.idCategoria === 35) {
            horaUltimoBiberon = unEvento.fecha; // Guarda la última fecha del biberón
        }
        if (unEvento.fecha > horaUltimoPañal && unEvento.idCategoria === 33) {
            horaUltimoPañal = unEvento.fecha; // Guarda la última fecha del pañal
        }
    }

    document.querySelector("#pCantBiberones").innerHTML = contBiberones;
    document.querySelector("#pUltimoBiberon").innerHTML = horaUltimoBiberon;

    document.querySelector("#pCantPaniales").innerHTML = contPañales;
    document.querySelector("#pUltimoPanial").innerHTML = horaUltimoPañal;

    // Calcular el tiempo transcurrido desde el último biberón
    if (horaUltimoBiberon) {
        let fechaUltimoBiberon = new Date(horaUltimoBiberon); // Convertir a objeto Date
        let tiempoTranscurrido = ahora - fechaUltimoBiberon; // Tiempo transcurrido en milisegundos

        // Convertir milisegundos a horas, minutos y segundos
        let segundos = Math.floor((tiempoTranscurrido / 1000) % 60);
        let minutos = Math.floor((tiempoTranscurrido / (1000 * 60)) % 60);
        let horas = Math.floor((tiempoTranscurrido / (1000 * 60 * 60)));

        document.querySelector("#pUltimoBiberonTomado").innerHTML= `Tiempo transcurrido desde el último biberón: ${horas} horas, ${minutos} minutos, ${segundos} segundos.`

        //console.log(`Tiempo transcurrido desde el último biberón: ${horas} horas, ${minutos} minutos, ${segundos} segundos.`);
    } else {
        document.querySelector("#pUltimoBiberonTomado").innerHTML= `Tiempo transcurrido desde el último biberón: no disponible`

    }

     // Calcular el tiempo transcurrido desde el último biberón
     if (horaUltimoPañal) {
        let fechaUltimoPanial = new Date(horaUltimoPañal); // Convertir a objeto Date
        let tiempoTranscurrido = ahora - fechaUltimoPanial; // Tiempo transcurrido en milisegundos

        // Convertir milisegundos a horas, minutos y segundos
        let segundos = Math.floor((tiempoTranscurrido / 1000) % 60);
        let minutos = Math.floor((tiempoTranscurrido / (1000 * 60)) % 60);
        let horas = Math.floor((tiempoTranscurrido / (1000 * 60 * 60)));

        document.querySelector("#pUltimoPanialCambiado").innerHTML= `Tiempo transcurrido desde el último Pañal: ${horas} horas, ${minutos} minutos, ${segundos} segundos.`

        //console.log(`Tiempo transcurrido desde el último biberón: ${horas} horas, ${minutos} minutos, ${segundos} segundos.`);
    } else {
        document.querySelector("#pUltimoPanialCambiado").innerHTML= `Tiempo transcurrido desde el último Pañal: no disponible`

    }
}






