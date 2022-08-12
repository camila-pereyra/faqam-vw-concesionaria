//CLASE ITEM CARRITO
class ItemCarrito{
    constructor(nombre, modelo,km, precio, cantidad, precioTotal, img){
        this.nombre=nombre;
        this.modelo=modelo;
        this.precio=precio;
        this.km=km;
        this.cantidad=cantidad;
        this.precioTotal=precioTotal;
        this.img=img;      
    }
}

//VARIABLES
const carrito=JSON.parse(localStorage.getItem("carrito"))|| [];
const DOMCarrito=document.getElementById("modal-container-items");

//FUNCIONES
//DOM - Funcion que crea los items del carrito de acuerdo  al array carrito. 
function renderizarCarrito(){
    DOMCarrito.innerHTML="";
    let containerContador=document.getElementById("contadorProductos");
    let contador=0;
    carrito.forEach(info=>{
        const containerItem=document.createElement("div");
        containerItem.classList.add("row","justify-content-between","align-items-center","w-100","m-0","p-2","itemCarrito", "carritoFont")
        containerItem.innerHTML=`
        <img src=${info.img} class="d-none d-lg-block col-lg-2">
        <p class="m-0 p-0 col-2 text-center fw-bold itemCarritoNombre">${info.nombre}</p>
        <p class="m-0 p-0 col-2 text-center">$${info.precio}</p>
        <p class="m-0 p-0 col-2 text-center">${info.cantidad}</p>
        <p class="m-0 p-0 col-2 text-center">$${info.precioTotal}</p>
        `
       //BOTON ELIMINAR
       const containerBtnEliminar=document.createElement("div");
       containerBtnEliminar.classList.add("m-0", "p-0","col-2","d-flex", "align-items-center", "justify-content-center");
       const btnEliminar=document.createElement("button");
       btnEliminar.classList.add("btn","btn-danger","itemCarritoBtnEliminar","d-flex", "align-items-center", "justify-content-center");
       btnEliminar.innerText="X";
       btnEliminar.addEventListener("click",respuestaBtnEliminarItem);
       containerBtnEliminar.appendChild(btnEliminar);
       containerItem.appendChild(containerBtnEliminar);
       DOMCarrito.appendChild(containerItem);
       contador++;
    })
    localStorage.setItem("carrito",JSON.stringify(carrito));  
    let sumaTotal=document.getElementById("sumaCompra");
    sumaTotal.innerText="TOTAL: $"+calcularTotal(carrito); 
    containerContador.innerText=contador;
}
//Funcion de respuesta al evento "click" en cualquiera de los botones "agregar al carrito"
function respuestaBtnAgregarCarrito(event){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1000
      })
    const botonClickeado= event.target; //con este capturo cual es el boton que estan clickeando
    const cardElegida = botonClickeado.closest(".cardAuto");  //con este capturo cual es el elemento mas cercano con esa clase (es decir toda la card)
    //Voy a desglozar la tarjeta
    const itemNombre=cardElegida.querySelector(".cardAuto-tittle").innerText;
    const itemPrecio=cardElegida.querySelector(".cardAuto-precio").innerText;
    const itemPrecioInt=parseInt(itemPrecio.replace("$",""));
    const itemModelo=cardElegida.querySelector(".cardAuto-modelo").innerText;
    const itemKm=cardElegida.querySelector(".cardAuto-km").innerText;
    const itemImage=cardElegida.querySelector(".cardAuto-img").src;
    const itemAgregar=carrito.find(el=>el.nombre==itemNombre);
    //si el item no esta en el carrito, lo agrego
    if(itemAgregar==undefined){
        let item=new ItemCarrito(itemNombre,itemModelo,itemKm,itemPrecioInt,1,itemPrecioInt,itemImage);
        carrito.push(item);
    }
    //si el item esta en el carrito, le modifico la cantidad y el precioTotal del ItemCarrito
    else{
        let cantidadNueva=itemAgregar.cantidad+1;
        itemAgregar.cantidad=(cantidadNueva);
        itemAgregar.precioTotal=(itemAgregar.precio*cantidadNueva);
    }
    renderizarCarrito();
}
//Funcion de respuesta al evento "click" en cualquiera de los botones "x" del carrito. Elimina del carrito el item deseado. 
function respuestaBtnEliminarItem(event){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success ms-3',
        cancelButton: 'btn btn-danger me-3'
    },
    buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "El producto del carrito se eliminará!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, quiero borrarlo!',
        cancelButtonText: 'No, mejor dejalo!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Borrado!',
            'El producto se elimino del carrito.',
            'success'
            )
            let botonClickeado=event.target;
            const itemElegido = botonClickeado.closest(".itemCarrito");
            let itemElegidoNombre=(itemElegido.querySelector(".itemCarritoNombre")).innerText;
            const elementoEliminar=carrito.find((el)=>el.nombre===itemElegidoNombre);
            let posicion=carrito.indexOf(elementoEliminar);
            carrito.splice(posicion,1);
            renderizarCarrito();
        } else if (
          /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) 
        {
        swalWithBootstrapButtons.fire(
        'Cancelado',
        'El producto sigue estando en tu carrito :)',
        'error'
        )
        }
    })
}
//Funcion de respuesta al evento "click" en el boton vaciar carrito. Elimina todos elementos del carrito.
function vaciarCarrito(){
    if(carrito.length!=0){
        while(carrito.length!=0){
            carrito.pop();
        }
        renderizarCarrito(); 
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: false,
            text: 'Aun el carrito está vacio!',
            timer: 1500
          })    
    }
}
//Funcion que calcula la suma total de todos elementos del carrito.
function calcularTotal(lstCarrito){
    let suma=0;
    lstCarrito.forEach(element => {
        let {precioTotal} = element;
        suma+=precioTotal;
    });
    return suma;
} 
//Funcion de respuesta al evento "click" en el boton confirmar compra. 
function confirmarCompra(){
    if(carrito.length!=0){
        if(sessionStorage.getItem("usuario")!=undefined){
            vaciarCarrito();
            Swal.fire(
            'Has confirmado la compra',
            'Te enviaremos un mail con mas info!',
            'success'
            )}
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: 'Debes iniciar sesion primero!',
                timer: 1500
            })     
            setTimeout("redireccionar()", 2500);
        }
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showConfirmButton: false,
            text: 'Aun el carrito está vacio!',
            timer: 1500
        })     
    }
}
//Funcion que redirecciona a la pagina usuario.html en caso de que quiera confirmar la compra y que el user no haya iniciado sesion. 
function redireccionar(){
    window.location.href = "../pages/usuario.html";
  }
   

//EVENTOS
//BOTONES ELIMINAR ITEM
let botonesEliminarItem=document.querySelectorAll(".itemCarritoBtnEliminar");
for(let boton of botonesEliminarItem){
    boton.addEventListener("click",respuestaBtnEliminarItem);
}
//BOTON VACIAR CARRITO
let btnVaciarCarrito=document.getElementById("btnVaciarCarrito");
btnVaciarCarrito.addEventListener("click",vaciarCarrito);
//BOTON CONFIRMAR COMPRA
let btnConfirmarCompra=document.getElementById("btnConfirmarCompra");
btnConfirmarCompra.addEventListener("click",confirmarCompra);


renderizarCarrito();


