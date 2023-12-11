
var M;

class Main implements EventListenerObject{

    public devices: Array<Devices>;

    constructor(){
        this.devices = new Array<Devices>();
    }



    private agregarDispositivo(): void{
        let iName = <HTMLInputElement>document.getElementById("iName");
        let iDescription = <HTMLInputElement>document.getElementById("iDescription");
        let iType = <HTMLInputElement>document.getElementById("iType");

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.open("POST", "http://localhost:8000/devices", true);
        xmlRequest.setRequestHeader("Content-Type", "application/json");
        xmlRequest.send(JSON.stringify({
            name: iName.value,
            description: iDescription.value,
            state: false,
            type: iType.value,
        }));
    }

    private eliminarDispositivo(): void{

    }

    handleEvent(object: Event): void {
        let elemento = <HTMLInputElement>object.target;
        console.log(elemento.id);
        if (elemento.id === "btEliminarDispositivo"){
            this.eliminarDispositivo();
        }else if (elemento.id === "btnAgregarDispositivo"){
            this.agregarDispositivo();
        }
    }
}

function mostrarDispositivos(): void{
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log(xmlRequest.responseText);
                let datos:Array<Devices> = JSON.parse(xmlRequest.responseText);
                let list = document.getElementById("ulDevices");
                let check = "";
                list.innerHTML = "";
                for(let d of datos){
                    console.log(d.name);
                    if (d.state == true){
                        check = "checked"
                    } else {
                        check = ""
                    }
                    list.innerHTML+=`<li class="collection-item avatar">
                                    <img src="images/yuna.jpg" alt="" class="circle">
                                    <span class="title">${d.name}</span>
                                    <p>${d.description}
                                    </p>
                                    <a href="#!" class="secondary-content">
                                    <div class="switch">
                                    <label>
                                    Off
                                    <input type="checkbox" ${check}>
                                    <span class="lever"></span>
                                    On
                                    </label>
                                    </div>
                                    </a>
                                    </li>`;
                }
            } else{
                console.log("No se encontraron datos");
            }
        }
        xmlRequest.open("GET", "http://localhost:8000/devices/", true);
        xmlRequest.send();
}


window.addEventListener("load", () => {

    var elemsModal = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsModal, "");

    mostrarDispositivos();

    let main: Main = new Main();
    let botonDispositivo = document.getElementById("btnAgregarDispositivo");
    botonDispositivo.addEventListener("click", main);

    let eliminarDispositivo = document.getElementById("btnEliminarDispositivo");
    eliminarDispositivo.addEventListener("click", main);

})