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
        }
    }
}
//EVENTOS
let formCrearUsuario=document.getElementById("formRegister");
formCrearUsuario.addEventListener("submit",registarUsuario);
let formIniciarSesion=document.getElementById("formLogin");
formIniciarSesion.addEventListener("submit",iniciarSesion);




