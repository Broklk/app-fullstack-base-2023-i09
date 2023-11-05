class Main implements EventListenerObject{

    public usuarios: Array<Usuario>;

    constructor(){
        this.usuarios = new Array<Usuario>();
    }

    private buscarPersonas(): void{

        let usuario1:Usuario = new Usuario("Matias", "Admin", "1234");
        let usuario2:Usuario = new Usuario("Brian", "Admin", "1234");

        this.usuarios.push(usuario1);
        this.usuarios.push(usuario2);

        for (let u of this.usuarios){
            console.log(u.mostrar(), this.usuarios.length);
            document.getElementById("textarea_1").innerHTML += u.mostrar() + "\n";
        }
    }
    handleEvent(object: Event): void {
        this.buscarPersonas();
    }
}


window.addEventListener("load", () => {

    let main: Main = new Main();
    let boton = document.getElementById("btnSaludar");

    boton.addEventListener("click", main);

})