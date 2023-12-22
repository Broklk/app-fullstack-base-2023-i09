
var M;

class Main implements EventListenerObject{

    public devices: Array<Devices>;

    constructor(){
        this.devices = new Array<Devices>();
    }

    // Función para agregar dispositivos
    private agregarDispositivo(): void{
        let iName = <HTMLInputElement>document.getElementById("iName");
        let iDescription = <HTMLInputElement>document.getElementById("iDescription");
        let iType = <HTMLInputElement>document.getElementById("iType");

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log("Llego respuesta: ", xmlRequest.readyState);
            } else {
                console.log("Salió mal la consulta");
            }
        }
        xmlRequest.open("POST", "http://localhost:8000/devices", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            name: iName.value,
            description: iDescription.value,
            state: false,
            type: iType.value,
        };
        xmlRequest.send(JSON.stringify(s));
        mostrarDispositivos();
    }

    // Función para encendido y apagado
    private ejecutarAccion(data): void{
        let id:number = parseInt(data.getAttribute("id_real"));
        let status:boolean = data.checked;

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log("Llego respuesta: ", xmlRequest.readyState);
            }
        }
        xmlRequest.open("PUT", "http://localhost:8000/devices:state", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            state: status,
        };
        xmlRequest.send(JSON.stringify(s));
    }

    // Función para eliminar dispositivos
    private eliminarDispositivo(data): void{
        let id:number = parseInt(data.getAttribute("id_real"));

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log("Llego respuesta: ", xmlRequest.readyState);
            }
        }
        xmlRequest.open("DELETE", "http://localhost:8000/devices", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
        };
        xmlRequest.send(JSON.stringify(s));
        mostrarDispositivos();
    }

    // Función para actualizar información de los dispositivos
    private actualizarDispositivo(data): void{
        let id:number = parseInt(data.getAttribute("id_real"));
        let iName = <HTMLInputElement>document.getElementById("iName_" + id);
        let iDescription = <HTMLInputElement>document.getElementById("iDescription_" + id);
        let iType = <HTMLInputElement>document.getElementById("iType_" + id);

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log("Llego respuesta: ", xmlRequest.readyState);
            }
        }
        xmlRequest.open("PUT", "http://localhost:8000/devices", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        let s = {
            id: id,
            name: iName.value,
            description: iDescription.value,
            type: iType.value,
        }
        xmlRequest.send(JSON.stringify(s));
        mostrarDispositivos();
    }

    handleEvent(object: Event): void {
        let elemento = <HTMLInputElement>object.target;
        let device_data = <HTMLInputElement>elemento;
        console.log(elemento.id);
        if (elemento.id === "btnAgregarDispositivo"){
            this.agregarDispositivo();
        }else if (elemento.id.startsWith("cb_")){
            console.log(device_data.checked);
            this.ejecutarAccion(device_data);
        }else if (elemento.id.startsWith("btnEliminarDispositivo_")){
            console.log(device_data.id);
            this.eliminarDispositivo(device_data);
        }else if (elemento.id.startsWith("btnActualizarDispositivo_")){
            console.log(device_data.id);
            this.actualizarDispositivo(device_data);
        }
    }
}

// Función para mostrar los dispositivos
function mostrarDispositivos(): void{
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log(xmlRequest.responseText);
                let datos:Array<Devices> = JSON.parse(xmlRequest.responseText);
                let list = document.getElementById("ulDevices");
                let check:string = "";
                let state:string = "";
                let level:number = 0;
                list.innerHTML = "";

                for(let d of datos){
                    console.log(d.name);
                    if (d.state == true){
                        check = "checked"
                        state = "active"
                        level = 80
                    } else {
                        check = ""
                        state = "inactive"
                        level = 0
                    }
                    let itemList:string =`<li class="collection-item avatar">
                                    <img src="./static/images/Tipo${d.type}.png" alt="" class="circle">
                                    <span class="title">${d.name}</span>
                                    <p>${d.description}
                                    </p>
                                    <a href="#!" class="secondary-content">
                                    <div class="switch">
                                    <label>
                                    Off
                                    <input type="checkbox" ${check} id="cb_${d.id}" id_real="${d.id}">
                                    <span class="lever"></span>
                                    On
                                    </label>
                                    </div>
                                    </a>`;
                    if (d.type == 1 || d.type == 2 || d.type == 4 || d.type == 7){
                        itemList += `
                                    <div>
                                    <form action="#">
                                    <label>
                                    <p class="center">Valor actual: <span id="valor"><output id="value_${d.id}"></output>%</span></p>
                                    </label>
                                    <p class="range-field">
                                    <input type="range" id="sl_${d.id}" value="${level}" min="0" max="100"/>
                                    </p>

                                    </form>
                                    </div>`
                    }

                    itemList += `<a class="waves-effect waves-light btn modal-trigger" href="#modalActualizar${d.id}">Editar</a>
                                    <a class="waves-effect waves-light btn modal-trigger red lighten-2" href="#modalEliminar${d.id}">Eliminar</a>
                                    </li>`;
                    list.innerHTML += itemList;
                }


                //MODALS de cada dispositivo (actualizar y borrar)
                let ActualizarBorrar = document.getElementById("modalsItems") as HTMLInputElement;
                ActualizarBorrar.innerHTML = "";
                for (let d of datos){
                    let modalList:string = `<div id="modalActualizar${d.id}" class="modal">
                                                <div class="modal-content">
                                                    <h3>Modificar Dispositivo</h3>
                                                    <label for="iName">Nombre</label>
                                                    <input type="text" id="iName_${d.id}" value="${d.name}" placeholder="Ej. TV"/>
                                                    <label for="iDescription">Descripción</label>
                                                    <input type="text" id="iDescription_${d.id}" value="${d.description}" placeholder="Ej. TV Habitación"/>
                                                    <label for="iType">Tipo</label>
                                                    <input type="text" id="iType_${d.id}" value="${d.type}" placeholder="Ej. 1"/>
                                                    <p class="grey-text text-small">Tipo 1: Lamparas, Luces</p>
                                                    <p class="grey-text text-small">Tipo 2: Aire Acondicionado, ventilador</p>
                                                    <p class="grey-text text-small">Tipo 3: TV, Smart TV</p>
                                                    <p class="grey-text text-small">Tipo 4: Cortinas, Ventanas</p>
                                                    <p class="grey-text text-small">Tipo 5: Lavadoras, secadoras</p>
                                                    <p class="grey-text text-small">Tipo 6: Cámaras de Seguridad</p>
                                                    <p class="grey-text text-small">Tipo 7: Calefacción</p>
                                                    <p class="grey-text text-small">Tipo 0: Otros Dispositivos</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button class="btn modal-close waves-effect waves-green" id="btnActualizarDispositivo_${d.id}" id_real="${d.id}">Actualizar</button>
                                                    <button class="btn modal-close waves-effect waves-green">Cancelar</button>
                                                </div>
                                            </div>

                                            <div id="modalEliminar${d.id}" class="modal">
                                                <div class="modal-content">
                                                    <h3 class="red-text text-lighten-2">Eliminar Dispositivo</h3>
                                                    <p>¿Seguro que quieres eliminar este dispositivo?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button class="btn modal-close waves-effect red lighten-2" id="btnEliminarDispositivo_${d.id}" id_real="${d.id}">Si, Eliminar</button>
                                                    <button class="btn modal-close waves-effect waves-green">Cancelar</button>
                                                </div>
                                            </div>`;

                    ActualizarBorrar.innerHTML += modalList;

                }

                // Reinicio de los modales
                let elemsModal = document.querySelectorAll('.modal');
                let instances = M.Modal.init(elemsModal, "");

                // Actualización de los checkboxes
                for (let d of datos){
                    let checkbox = document.getElementById("cb_"+d.id);
                    let main:Main = new Main();
                    checkbox.addEventListener("change", main);
                }

                // Actualización de los valores de los sliders
                for (let d of datos){
                    if (d.type == 1 || d.type == 2 || d.type == 4 || d.type == 7){
                        let value:HTMLInputElement = <HTMLInputElement>document.querySelector("#value_"+d.id);
                        let input:HTMLInputElement = <HTMLInputElement>document.querySelector("#sl_"+d.id);
                        value.textContent = input.value;
                        input.addEventListener("input", (event) => {
                            value.textContent = (event.target as HTMLInputElement).value;
                        })
                    }
                }

                // Asociación de eventListener para los botones de actualizar y borrar
                for (let d of datos){
                    let btnActualizar = document.getElementById("btnActualizarDispositivo_"+d.id);
                    let btnBorrar = document.getElementById("btnEliminarDispositivo_"+d.id);
                    let main:Main = new Main();
                    btnActualizar.addEventListener("click", main);
                    btnBorrar.addEventListener("click", main);
                }

            } else{
                console.log("No se encontraron datos");
            }
        }
        xmlRequest.open("GET", "http://localhost:8000/devices/", true);
        xmlRequest.send();
}


window.addEventListener("load", () => {

    // Inicialización de los modales
    let elemsModal = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elemsModal, "");

    // Cargar los dispositivos en la página
    mostrarDispositivos();

    let main: Main = new Main();

    // Asociación de eventListener para el boton Agregar Dispositivo
    let botonDispositivo = document.getElementById("btnAgregarDispositivo");
    botonDispositivo.addEventListener("click", main);
})