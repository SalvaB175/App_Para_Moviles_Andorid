let miLatitud
let miLongitud
let map

let iduser = "3484";
let apikey = "6d4684c61c5622e1053da29a6a193e02";
obtenerInformacionPlazas()
obtenerMiPosiscion()
function obtenerMiPosiscion() {
    navigator.geolocation.getCurrentPosition(miUbicacion)
}

function miUbicacion(position) {
    console.log(position)
    miLatitud = position.coords.latitude
    miLongitud = position.coords.longitude

    
}


function obtenerInformacionPlazas() {

    fetch(`https://babytracker.develotion.com/plazas.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apikey,
            'iduser': iduser
        }
    })
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (respuesta) {
            console.log(respuesta)
            plazas = respuesta.plazas
            setTimeout(function () { armarMapa() }, 3000)

        })
        .catch(function (error) {
            console.log(error)
        })
}



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
        // if 
        marker.bindPopup(`<b>${unaPlaza.idPlaza}</b><br>Mi casa`).openPopup();
    }
}




