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
const DOMCarrito=document.getElementById("items");
const productos=document.getElementById("containerCards");
const stock= JSON.parse(localStorage.getItem("lstProductos")) || [];


const iniciarStock = async () =>{
    let resp= await fetch("../stock.json");
    let arrProductos=await resp.json();
    localStorage.setItem("lstProductos",JSON.stringify(arrProductos));
    renderizarProductos(arrProductos);
} 

iniciarStock();

//DOM -Funcion que crea las card Auto de acuerdo al arregloProductos pasado por parametro (puede ser stock, o algun array ordenado o filtrado de productos) 
function renderizarProductos(arregloProductos) {
    productos.innerHTML="";
    arregloProductos.forEach ((info) => {
        // Estructura Gral
        const miNodoEstructura = document.createElement('div');
        miNodoEstructura.classList.add('cardAuto');
         // Estructura Content
         const miNodoEstructuraContent = document.createElement('div');
         miNodoEstructuraContent.classList.add('cardAuto-content');
         // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('cardAuto-img');
        miNodoImagen.setAttribute('src', info.img);
        // Titulo
        const miNodoTitle = document.createElement('h3');
        miNodoTitle.classList.add('cardAuto-tittle');
        miNodoTitle.innerText = info.nombre;
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('cardAuto-precio');
        miNodoPrecio.innerText = "$"+info.precio;
        // Anio
        const miNodoModelo = document.createElement('p');
        miNodoModelo.classList.add('cardAuto-modelo');
        miNodoModelo.innerText = info.modelo;
        // KM
        const miNodoKM = document.createElement('p');
        miNodoKM.classList.add('cardAuto-km');
        miNodoKM.innerText = info.km+"KM";
        //BOTON AGREGAR AL CARRITO
        const miNodoBoton =document.createElement('button');
        miNodoBoton.classList.add("btn","btn-outline-success","cardAuto-btn");
        miNodoBoton.innerText="Agregar al carrito";
       miNodoBoton.addEventListener("click",respuestaBtnAgregarCarrito);
       //Insertamos los nodos
       miNodoEstructura.appendChild(miNodoImagen);
       miNodoEstructuraContent.appendChild(miNodoTitle);
       miNodoEstructuraContent.appendChild(miNodoPrecio);
       miNodoEstructuraContent.appendChild(miNodoModelo);
       miNodoEstructuraContent.appendChild(miNodoKM);
       miNodoEstructuraContent.appendChild(miNodoBoton);
       miNodoEstructura.appendChild(miNodoEstructuraContent);
       productos.appendChild(miNodoEstructura);
    })   
};

renderizarCarrito();

//FUNCIONES
//DOM - Funcion que crea los items del carrito de acuerdo  al array carrito. 
function renderizarCarrito(){
    // Vaciamos todo el html
    DOMCarrito.innerHTML = "";
    carrito.forEach(info => {
        //Estructura general
        const miNodo=document.createElement("div");
        miNodo.classList.add("w-100","row", "justify-content-lg-between","align-items-center","my-2","mx-auto","itemCarrito");
        //Imagen
        const miNodoImagenCont=document.createElement("div");
        miNodoImagenCont.classList.add("d-none","d-lg-block","col-lg-4","col-img");
        const miNodoImagen=document.createElement("img");
        miNodoImagen.setAttribute("src",info.img);
        miNodoImagenCont.append(miNodoImagen);
       //Nombre
        const miNodoNombre=document.createElement("p");
        miNodoNombre.classList.add("col-2","col-lg-1","itemCarritoNombre");
        miNodoNombre.innerText=info.nombre;
       //Modelo
       const miNodoModelo=document.createElement("p");
       miNodoModelo.classList.add("d-none","d-lg-block","col-lg-1");
       miNodoModelo.innerText=info.modelo;
       //KM
       const miNodoKM=document.createElement("p");
       miNodoKM.classList.add("d-none","d-lg-block","col-lg-1");
       miNodoKM.innerText=info.km;
       //Precio
       const miNodoPrecio=document.createElement("p");
       miNodoPrecio.classList.add("col-3","col-lg-1");
       miNodoPrecio.innerText="$"+info.precio;
       // CANTIDAD
       const cant=document.createElement("p");
       cant.classList.add("col-3","col-lg-1");
       cant.innerText=info.cantidad;
       //PRECIO TOTAL
       const miNodoPrecioTotal=document.createElement("p");
       miNodoPrecioTotal.classList.add("col-2","col-lg-1");
       miNodoPrecioTotal.innerText="$"+info.precioTotal;
       //BOTON ELIMINAR
       const containerBtnEliminar=document.createElement("div");
       containerBtnEliminar.classList.add("col-2","col-lg-1");
       const btnEliminar=document.createElement("button");
       btnEliminar.classList.add("btn","btn-danger","btnEliminarItem");
       btnEliminar.innerText="X";
       btnEliminar.addEventListener("click",respuestaBtnEliminarItem);
       containerBtnEliminar.appendChild(btnEliminar);
       //INSERTAMOS LOS NODOS
       miNodo.appendChild(miNodoImagenCont);
       miNodo.appendChild(miNodoNombre);
       miNodo.appendChild(miNodoModelo);
       miNodo.appendChild(miNodoKM);
       miNodo.appendChild(miNodoPrecio);
       miNodo.appendChild(cant);
       miNodo.appendChild(miNodoPrecioTotal);
       miNodo.appendChild(containerBtnEliminar);
       DOMCarrito.appendChild(miNodo);
    });
    localStorage.setItem("carrito",JSON.stringify(carrito));  
    let sumaTotal=document.getElementById("sumaCompra");
    sumaTotal.innerText="TOTAL: $"+calcularTotal(carrito);
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
        vaciarCarrito();
        Swal.fire(
            'Has confirmado la compra',
            'Buena elección!',
            'success'
          )
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
//Funcion de respuesta al evento "click" a alguno de los botonces de ordenamiento o filtro. 
function ordenarPorModelo(){
    let productosOrdenados= [...stock];
    productosOrdenados.sort((obj1,obj2)=>{
        if(obj1.modelo>obj2.modelo){
            return 1;
        }else if(obj1.modelo<obj2.modelo){
            return -1;
        }else{
            return 0;
        }
    })
    renderizarProductos(productosOrdenados);
}
function ordenarPorModeloReverse(){
    let productosOrdenados=  [...stock];
    productosOrdenados.sort((obj1,obj2)=>{
        if(obj1.modelo<obj2.modelo){
            return 1;
        }else if(obj1.modelo>obj2.modelo){
            return -1;
        }else{
            return 0;
        }
    })
    renderizarProductos(productosOrdenados);
}
function ordenarPorPrecio(){
    let productosOrdenados= [...stock];
    productosOrdenados.sort((obj1,obj2)=>{
        if(obj1.precio>obj2.precio){
            return 1;
        }else if(obj1.precio<obj2.precio){
            return -1;
        }else{
            return 0;
        }
    })
    renderizarProductos(productosOrdenados);
}
function ordenarPorPrecioReverse(){
    let productosOrdenados= [...stock];
    productosOrdenados.sort((obj1,obj2)=>{
        if(obj1.precio<obj2.precio){
            return 1;
        }else if(obj1.precio>obj2.precio){
            return -1;
        }else{
            return 0;
        }
    })
    renderizarProductos(productosOrdenados);
}
function filtrarPorCeroKM(){
    let filtradosPorCeroKM=[];
    for(let i=0;i<stock.length;i++){
        stock[i].km==0 && filtradosPorCeroKM.push(stock[i]);
    }
    renderizarProductos(filtradosPorCeroKM);
}
function filtrarPorUsados(){
    let filtradosPorUsados=[];
    for(let i=0;i<stock.length;i++){
        stock[i].km!=0 && filtradosPorUsados.push(stock[i]);
    }
    renderizarProductos(filtradosPorUsados);
}

//EVENTOS
//BOTONES ELIMINAR ITEM
let botonesEliminarItem=document.querySelectorAll(".btnEliminarItem");
for(let boton of botonesEliminarItem){
    boton.addEventListener("click",respuestaBtnEliminarItem);
}

//BOTON VACIAR CARRITO
let btnVaciarCarrito=document.getElementById("btnVaciarCarrito");
btnVaciarCarrito.addEventListener("click",vaciarCarrito);

//BOTON CONFIRMAR COMPRA
let btnConfirmarCompra=document.getElementById("btnConfirmarCompra");
btnConfirmarCompra.addEventListener("click",confirmarCompra);

//BOTON ORDENAR POR PRECIO (menor a mayor)
let btnOrdenarPorPrecio=document.getElementById("btnOrdernarPorPrecio");
btnOrdenarPorPrecio.addEventListener("click",ordenarPorPrecio);

//BOTON ORDENAR POR PRECIO (mayor a menor)
let btnOrdenarPorPrecioReverse=document.getElementById("btnOrdernarPorPrecioReverse");
btnOrdenarPorPrecioReverse.addEventListener("click",ordenarPorPrecioReverse);

//BOTON ORDENAR POR MODELO (viejos a nuevos)
let btnOrdenarPorModelo=document.getElementById("btnOrdernarPorModelo");
btnOrdenarPorModelo.addEventListener("click",ordenarPorModelo);

//BOTON ORDENAR POR MODELO (nuevos a viejos)
let btnOrdenarPorModeloReverse=document.getElementById("btnOrdernarPorModeloReverse");
btnOrdenarPorModeloReverse.addEventListener("click",ordenarPorModeloReverse);

//BOTON FILTRAR POR 0KM
let btnFiltrarPorCeroKm=document.getElementById("btnFiltrarPorCeroKm");
btnFiltrarPorCeroKm.addEventListener("click",filtrarPorCeroKM);

//BOTON FILTRAR POR USADOS
let btnFiltrarPorUsados=document.getElementById("btnFiltrarPorUsados");
btnFiltrarPorUsados.addEventListener("click",filtrarPorUsados);

//BOTON NO ORDENAR (SIN FILTROS)
let btnSinOrdenar=document.getElementById("btnSinOrdenar");
btnSinOrdenar.addEventListener("click", ()=>renderizarProductos(stock));


