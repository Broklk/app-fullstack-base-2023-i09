

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