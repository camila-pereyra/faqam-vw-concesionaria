/*Evento: modo claro/oscuro formulario */
let botonModoClaro = document.getElementById("btnModoClaro");
let botonMocoOscuro=document.getElementById("btnModoOscuro")

function respuestaBtnModoClaro(){
    let formulario=document.getElementById("formulario");
    formulario.classList.remove("formModoOscuro");
    formulario.classList.add("formModoClaro");
}
function respuestaBtnModoOscuro(){
    let formulario=document.getElementById("formulario");
    formulario.classList.remove("formModoClaro");
    formulario.classList.add("formModoOscuro");
}
botonModoClaro.addEventListener("click",respuestaBtnModoClaro);
botonMocoOscuro.addEventListener("click",respuestaBtnModoOscuro);
