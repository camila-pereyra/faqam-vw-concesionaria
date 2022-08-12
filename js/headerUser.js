//VARIABLES
let userMenu=document.getElementById("dropdownMenuUser");
let userIniciarSesionItem=document.createElement("li");
let userIniciarSesionEnlace=document.createElement("a");
let userCrearCuentaItem=document.createElement("li");
let userCrearCuentaEnlace=document.createElement("a");
let userCerrarSesionItem=document.createElement("li");
let userCerrarSesionEnlace=document.createElement("a");
let msjBienvenida= document.getElementById("msjBienvenida");

//DOM
userIniciarSesionEnlace.innerText="Iniciar sesion";
userIniciarSesionEnlace.classList.add("dropdown-item");
userIniciarSesionEnlace.setAttribute("href","../pages/usuario.html");
userIniciarSesionItem.appendChild(userIniciarSesionEnlace);
userCrearCuentaEnlace.innerText="Crear cuenta";
userCrearCuentaEnlace.classList.add("dropdown-item");
userCrearCuentaEnlace.setAttribute("href","../pages/usuario.html");
userCrearCuentaItem.appendChild(userCrearCuentaEnlace);
userCerrarSesionEnlace.innerText="Cerrar sesion";
userCerrarSesionEnlace.classList.add("dropdown-item");
userCerrarSesionEnlace.setAttribute("href","#");
userCerrarSesionItem.appendChild(userCerrarSesionEnlace);
userCerrarSesionEnlace.addEventListener("click",cerrarSesion);

//FUNCIONES
function cerrarSesion(){
    sessionStorage.clear();
    msjBienvenida.innerText="";
    userMenu.innerHTML="";
    userMenu.appendChild(userIniciarSesionItem);
    userMenu.appendChild(userCrearCuentaItem);
}
const updateMsjBienvenida= () =>{
    msjBienvenida.innerText="";
    msjBienvenida.innerText=`Hola, ${(JSON.parse(sessionStorage.getItem("usuario"))).nombre}!`
}
function actualizarDOMUser(){
    if(sessionStorage.getItem("usuario")!=null){
        updateMsjBienvenida();
        userMenu.innerHTML="";
        userMenu.appendChild(userCerrarSesionItem);
    }else{
        msjBienvenida.innerText="";
        userMenu.appendChild(userIniciarSesionItem);
        userMenu.appendChild(userCrearCuentaItem);
        
    }
}

actualizarDOMUser();
