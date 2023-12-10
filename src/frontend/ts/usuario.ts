class Usuario extends Persona {

    private rol: string;
    private password: string;


    constructor(nombre: string, rol: string, password?: string){
        super();
        this.nombre = nombre;
        this.rol = rol;
        this.password = password;
    }


    public mostrar(): string {
        return `${this.nombre} - ${this.rol}`;
    }
}

