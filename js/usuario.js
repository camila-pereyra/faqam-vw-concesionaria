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
function borrarCamposFormRegister(){
    let inputNombre=document.getElementById("nombreResgister");
    let inputApellido=document.getElementById("apellidoRegister");
    let inputCorreo=document.getElementById("emailRegister");
    let inputContraseña=document.getElementById("contraseñaRegister");
    inputNombre.value="";
    inputApellido.value="";
    inputCorreo.value="";
    inputContraseña.value="";
}
//REGISTRAR USUARIO
function registarUsuario(e){
    e.preventDefault();
    let correo=document.getElementById("emailRegister").value;
    let nombre=document.getElementById("nombreResgister").value;
    let apellido=document.getElementById("apellidoRegister").value;
    let contraseña=document.getElementById("contraseñaRegister").value;
    if(buscarCorreo(correo, lstUsuarios)==-1){
        const usuarioNuevo=new Usuario(lstUsuarios.length+1,nombre,apellido,correo,contraseña);
        lstUsuarios.push(usuarioNuevo);
        localStorage.setItem("lstUsuario",JSON.stringify(lstUsuarios));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu cuenta ha sido creada',
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
function buscarCorreo(correoUsuario, listaUsuarios){
    let i=0;
    let posEncontrado;
    while(i<lstUsuarios.length){
        listaUsuarios[i].email==correoUsuario ? posEncontrado=i : posEncontrado=-1;
        posEncontrado!=-1 ? i=lstUsuarios.length : i++;
    }
    return posEncontrado;
}
function borrarCamposFormLogin(){
    let inputCorreo=document.getElementById("correo");
    let inputContraseña=document.getElementById("password");
    inputCorreo.value="";
    inputContraseña.value="";
}
//INICIAR SESION 
function iniciarSesion(e){
    e.preventDefault();
    let correo=document.getElementById("correo").value;
    let contraseña=document.getElementById("password").value;
    let posCorreo=buscarCorreo(correo, lstUsuarios);
    if(posCorreo==-1 || lstUsuarios[posCorreo].contraseña!=contraseña){
        Swal.fire({
            icon: 'error',
            title: 'Datos ingresados incorrectos',
            text: 'Correo o contraseña no coincidente'
        })
    }else{
            if (lstUsuarios[posCorreo].contraseña==contraseña){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Inicio de sesion exitoso',
                    showConfirmButton: false,
                    timer: 2000
                  })
                sessionStorage.setItem("usuario",correo);
                sessionStorage.setItem("contraseña",contraseña);
                borrarCamposFormLogin();
        }
    }
}

//EVENTOS
let formCrearUsuario=document.getElementById("formRegister");
formCrearUsuario.addEventListener("submit",registarUsuario);
let formIniciarSesion=document.getElementById("formLogin");
formIniciarSesion.addEventListener("submit",iniciarSesion);




