
function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value;
}



let nombreVariable: string = "Valor";
console.log(nombreVariable + 5 + "ads");
let otraVariable: number;
otraVariable = 123;
console.log(otraVariable + 5);

let verdadero:boolean = true;
console.log(verdadero);

if (otraVariable > 124) {
    console.log("Verdadero");
} else {
    console.log("es Falso");
}

let lista: Array<string>;
lista = new Array<string>();

lista.push("nueva");
lista.push("Matías");
lista.push("Otra");

for (let i in lista){
    console.log(lista[i]);
}

console.log(lista.length);

function sumar(x: number, y: number): number {
    return x + y;
}

let resultado = sumar(5, 2);
console.log(resultado);

function restar(x: number, y: number): number {
    return x - y;
}

function ejecutar(numero1: number, numero2: number, func: any){
    console.log(func(numero1, numero2));
    alert(func(numero1, numero2));
}

function inicio(){
    ejecutar(5, 2, sumar);
    ejecutar(5, 2, restar);
}

window.addEventListener("load", inicio);

window.addEventListener("load", () => {
    SayHello();
    SayHello();
    SayHello();
    SayHello();
    console.log(sumar(2, 3));
})