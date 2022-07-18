class Usuario{
    constructor(id,nombre,apellido,email,contraseña){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.contraseña=contraseña;
    }
}

//Inicio el array vacio o bien con lo que hay en el Local Storage
const lstUsuarios= (JSON.parse(localStorage.getItem("lstUsuario")) || []);

//REGISTRAR USUARIO
function registarUsuario(e){
    e.preventDefault();
    let correo=document.getElementById("emailRegister").value;
    let nombre=document.getElementById("nombreResgister").value;
    let apellido=document.getElementById("apellidoRegister").value;
    let contraseña=document.getElementById("contraseñaRegister").value;
    let nodo=document.getElementById("formularioRegisterMsj");
    let nodoMsj=document.createElement("p");
    nodoMsj.classList.add("msjUsuario");
    nodo.innerHTML="";
    nodo.appendChild(nodoMsj);
    if(correo!="" && nombre!="" && apellido!="" && contraseña!=""){
        if(buscarCorreo(correo, lstUsuarios)==-1){
            const usuarioNuevo=new Usuario(lstUsuarios.length+1,nombre,apellido,correo,contraseña);
            lstUsuarios.push(usuarioNuevo);
            localStorage.setItem("lstUsuario",JSON.stringify(lstUsuarios));
            nodoMsj.innerText="Usuario generado con exito"
        }
        else{
            nodoMsj.innerText="El email ingresado ya tiene una cuenta asociada"
        }
    }else{
        nodoMsj.innerText="Debe completar todos los campos";
    }   
}
function buscarCorreo(correoUsuario, listaUsuarios){
    let posEncontrado=-1;
    

    if(listaUsuarios.length!=0){
        for(let i=0; i<listaUsuarios.length;i++){
            if(listaUsuarios[i].email==correoUsuario){
                posEncontrado=i;
            }
        }
   } 
    return posEncontrado;
}
//INICIAR SESION 
function iniciarSesion(e){
    e.preventDefault();
    let correo=document.getElementById("correo").value;
    let contraseña=document.getElementById("password").value;
    let nodo=document.getElementById("formularioLoginMsj");
    let nodoMsj=document.createElement("p");
    nodoMsj.classList.add("msjUsuario");
    nodo.innerHTML="";
    nodo.appendChild(nodoMsj);
    if(correo!="" && contraseña!=""){
        let posCorreo=buscarCorreo(correo, lstUsuarios);
        if(posCorreo==-1){
           nodoMsj.innerText="El email ingresado no posee una cuenta asociada"
        }else{
            if (lstUsuarios[posCorreo].contraseña==contraseña){
                nodoMsj.innerText="Inicio de sesion exitoso";
                sessionStorage.setItem("usuario",correo);
                sessionStorage.setItem("contraseña",contraseña);
            }else{
                nodoMsj.innerText="La contraseña ingresada no es valida";
            }
        }
    }else{
        nodoMsj.innerText="Debe completar todos los campos";
    }
    
}
//EVENTOS
let btnCrearUsuario=document.getElementById("btnCrearUsuario");
btnCrearUsuario.addEventListener("click",registarUsuario);
let btnIniciarSesion=document.getElementById("btnIniciarUsuario");
btnIniciarSesion.addEventListener("click",iniciarSesion);




