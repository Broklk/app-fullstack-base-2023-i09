

class Main implements EventListenerObject{

    public usuarios: Array<Usuario>;

    constructor(){
        this.usuarios = new Array<Usuario>();
    }

    private buscarPersonas(): void{
        document.getElementById("textarea_1").innerHTML = "";
        for (let u of this.usuarios){
            console.log(u.mostrar(), this.usuarios.length);
            document.getElementById("textarea_1").innerHTML += u.mostrar() + "\n";
        }
    }

    private buscarDevices(): void{
        let xmlRequest = new XMLHttpRequest();
        let list = document.getElementById("textarea_2");
        xmlRequest.onreadystatechange = () => {
            if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
                console.log(xmlRequest.responseText);
                let datos:Array<Devices> = JSON.parse(xmlRequest.responseText);
                for(let d of datos){
                    console.log(d.name);
                    list.innerHTML += d.name + "\n";
                }
            } else{
                console.log("No se encontraron datos");
            }
        };
        xmlRequest.open("GET", "http://localhost:8000/devices/", true);
        xmlRequest.send();
    }

    private cargarUsuario(): void{
        let iNombre = <HTMLInputElement>document.getElementById("iNombre");
        let iPassword = <HTMLInputElement>document.getElementById("iPassword");
        let pInfo = document.getElementById("pInfo");

        if(iNombre.value.length > 3 && iPassword.value.length > 3){
            this.usuarios.push(new Usuario(iNombre.value, "user", iPassword.value));
            pInfo.className = "textCorrect";
            pInfo.innerHTML = "Usuario Cargado Correctamente";
        } else {
            pInfo.className = "textError";
            pInfo.innerHTML = "Usuario o Contraseña incorrectos";
        }
        iNombre.value = "";
        iPassword.value = "";
    }
    handleEvent(object: Event): void {
        let elemento = <HTMLInputElement>object.target;
        console.log(elemento.id);
        if (elemento.id === "btnGuardar"){
            this.cargarUsuario();
        } else if (elemento.id === "btnListar"){
            this.buscarPersonas();
            this.buscarDevices();
        }
    }
}


window.addEventListener("load", () => {

    let main: Main = new Main();
    let boton = document.getElementById("btnListar");

    boton.addEventListener("click", main);

    let botonGuardar = document.getElementById("btnGuardar");
    botonGuardar.addEventListener("click", main);

})