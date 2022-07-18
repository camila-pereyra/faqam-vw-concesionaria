/*MODO CLARO/OSCURO DEL FORMULARIO*/

//VARIABLES
let botonModoClaro = document.getElementById("btnModoClaro");
let botonMocoOscuro=document.getElementById("btnModoOscuro");

//FUNCIONES
function respuestaBtnModoClaro(){
    let formulario=document.getElementById("formularioContacto");
    formulario.classList.remove("formModoOscuro");
    formulario.classList.add("formModoClaro");
}
function respuestaBtnModoOscuro(){
    let formulario=document.getElementById("formularioContacto");
    formulario.classList.remove("formModoClaro");
    formulario.classList.add("formModoOscuro");
}

//EVENTOS
botonModoClaro.addEventListener("click",respuestaBtnModoClaro);
botonMocoOscuro.addEventListener("click",respuestaBtnModoOscuro);

