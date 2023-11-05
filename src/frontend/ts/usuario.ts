class Usuario extends Persona {

    private rol: string;
    private password: string;


    constructor(nombre: string, rol: string, password: string){
        super();
        super.nombre = nombre;
        this.rol = rol;
        this.password = password;
    }


    mostrar(): string {
        return `${this.nombre} - ${this.rol}`;
    }
}

