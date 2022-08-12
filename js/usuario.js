//CLASE USUARIO
class Usuario{
    constructor(nombre,apellido,email,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.contraseña=contraseña;
    }
}

//VARIABLES
let btnInicarSesion=document.getElementById("btnIniciarSesion");
let btnCrearCuenta=document.getElementById("btnCrearCuenta");
let containerFormIniciarSesion=document.getElementById("containerformInicioSesion");
let containerFormResgitro=document.getElementById("containerformRegistro");
let formCrearUsuario=document.getElementById("formRegister");
let formIniciarSesion=document.getElementById("formLogin");
//Inicio el array vacio o bien con lo que hay en el Local Storage
const listaUsuarios=JSON.parse(localStorage.getItem("lstUsuarios")) || [];

//FUNCIONES
//funcion que utiliza una API para generar usuarios aleatorios y agregarlos a la lista de usuarios
const generarUsuariosAPI= async () => {
    try {
      const resp = await fetch("https://random-data-api.com/api/users/random_user?size=10");
      const usuarios=await resp.json()
      usuarios.forEach(usuario => {
        const user=new Usuario(usuario.first_name,usuario.last_name,usuario.email,usuario.password);
        listaUsuarios.push(user);
        });
        localStorage.setItem("lstUsuarios",JSON.stringify(listaUsuarios))
    } catch(err) {
      console.log("error: ", err);
    }
} 
//funcion que registra a un Usuario y valida que no tenga una cuenta con ese mail
function registarUsuario(e){
    e.preventDefault();
    let correo=document.getElementById("emailRegister").value;
    let nombre=document.getElementById("nombreRegister").value;
    let apellido=document.getElementById("apellidoRegister").value;
    let contraseña=document.getElementById("contraseñaRegister").value;
    if(buscarCorreo(correo, listaUsuarios)==-1){
        const usuarioNuevo=new Usuario(nombre,apellido,correo,contraseña);
        listaUsuarios.push(usuarioNuevo);
        localStorage.setItem("lstUsuarios",JSON.stringify(listaUsuarios));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu cuenta ha sido creada. Ahora inicia sesion!',
            showConfirmButton: false,
            timer: 2000
          })
          borrarCamposFormRegister();
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El mail ya tiene un usuario asociado!'
        })
    } 
}
function borrarCamposFormRegister(){
    let inputNombre=document.getElementById("nombreRegister");
    let inputApellido=document.getElementById("apellidoRegister");
    let inputCorreo=document.getElementById("emailRegister");
    let inputContraseña=document.getElementById("contraseñaRegister");
    inputNombre.value="";
    inputApellido.value="";
    inputCorreo.value="";
    inputContraseña.value="";
}
function buscarCorreo(correoUsuario, listaUsuarios){
    let i=0;
    let posEncontrado;
    while(i<listaUsuarios.length){
        listaUsuarios[i].email==correoUsuario ? posEncontrado=i : posEncontrado=-1;
        posEncontrado!=-1 ? i=listaUsuarios.length : i++;
    }
    return posEncontrado;
}
function borrarCamposFormLogin(){
    let inputCorreo=document.getElementById("correo");
    let inputContraseña=document.getElementById("password");
    inputCorreo.value="";
    inputContraseña.value="";
}
//funcion que valida los datos ingresados por el usuario y permite(o no) iniciar sesion
function iniciarSesion(e){
    e.preventDefault();
    let correo=document.getElementById("correo").value;
    let contraseña=document.getElementById("password").value;
    let posCorreo=buscarCorreo(correo, listaUsuarios);
    if(posCorreo==-1 || listaUsuarios[posCorreo].contraseña!=contraseña){
        Swal.fire({
            icon: 'error',
            title: 'Datos ingresados incorrectos',
            text: 'Correo o contraseña no coincidente'
        })
    }else{
            if (listaUsuarios[posCorreo].contraseña==contraseña){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Inicio de sesion exitoso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                sessionStorage.setItem("usuario",JSON.stringify(listaUsuarios[posCorreo]));
                actualizarDOMUser();
                borrarCamposFormLogin();
        }
    }
}
function aparecerFormInicioSesion(){
    containerFormResgitro.classList.add("displayNone");
    containerFormIniciarSesion.classList.remove("displayNone")

}
function aparecerFormCrearCuenta(){
    containerFormIniciarSesion.classList.add("displayNone");
    containerFormResgitro.classList.remove("displayNone")
}

//EVENTOS
btnInicarSesion.addEventListener("click",aparecerFormInicioSesion);
btnCrearCuenta.addEventListener("click",aparecerFormCrearCuenta);
formCrearUsuario.addEventListener("submit",registarUsuario);
formIniciarSesion.addEventListener("submit",iniciarSesion);

//si la lista de usuarios esta vacia (es decir, es la primera vez que ingreso a la página) se ejecuta la funcion generarUsuariosAPI. 
//Caso contrario, los carga del localStorage 
if(listaUsuarios.length===0){
    generarUsuariosAPI();
}










