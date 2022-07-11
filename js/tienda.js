//CLASE AUTO
class Auto{
    constructor(nombre, modelo, precio, km, img){
        this.nombre=nombre;
        this.modelo=modelo;
        this.precio=precio;
        this.km=km;
        this.img=img;      
    }
}
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
    setCantidad(cantidad){
        this.cantidad=cantidad;
    }
    setPrecioTotal(precioTotal){
        this.precioTotal=precioTotal;
    }
}

//VARIABLES
const baseDeDatos=[]; 
const DOMProductos=document.getElementById("containerCards");
const carrito=[]
const DOMCarrito=document.getElementById("items");

//Creo los objetos del tipo Auto
const auto1=new Auto("BORA",2013,1700000,120000,"../image/autos/bora.jpg");
const auto2=new Auto("AMAROK",2022,7000000,0,"../image/autos/amarok.png");
const auto3=new Auto("GOL",2007,800000,1500000,"../image/autos/gol.jpg");
const auto4=new Auto("PASSAT",2018,2900000,90000,"../image/autos/passat.jpg");
const auto5=new Auto("POLO",2022,3000000,0,"../image/autos/polo.jpg");
const auto6=new Auto("TAOS",2022,3800000,0,"../image/autos/taos.jpg");
const auto7=new Auto("TIGUAN",2022,4800000,0,"../image/autos/tiguan.jpg");
const auto8=new Auto("UP",2018,2000000,60000,"../image/autos/up.jpeg");
const auto9=new Auto("VENTO",2017,2400000,100000,"../image/autos/vento.jpg");
const auto10=new Auto("VIRTUS",2020,2950000,30000,"../image/autos/virtus.jpg");
const auto11=new Auto("FOX",2007,1000000,180000,"../image/autos/fox.jpg");
const auto12=new Auto("GOLF",2022,4000000,0,"../image/autos/golf.jpg");
//Agrego al array base de datos los objetos Auto
baseDeDatos.push(auto1);
baseDeDatos.push(auto2);
baseDeDatos.push(auto3);
baseDeDatos.push(auto4);
baseDeDatos.push(auto5);
baseDeDatos.push(auto6);
baseDeDatos.push(auto7);
baseDeDatos.push(auto8);
baseDeDatos.push(auto9);
baseDeDatos.push(auto10);
baseDeDatos.push(auto11);
baseDeDatos.push(auto12);

//FUNCIONES
//Funcion que crea las card Auto de acuerdo al array baseDeDatos. 
function renderizarProductos() {
    baseDeDatos.forEach ((info) => {
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
        //BOTON AGREGAR"
        const miNodoBoton =document.createElement('a');
        miNodoBoton.classList.add("cardAuto-btn");
        miNodoBoton.setAttribute("href","");
        miNodoBoton.innerText="Agregar al carrito";
       //Insertamos los nodos
       miNodoEstructura.appendChild(miNodoImagen);
       miNodoEstructuraContent.appendChild(miNodoTitle);
       miNodoEstructuraContent.appendChild(miNodoPrecio);
       miNodoEstructuraContent.appendChild(miNodoModelo);
       miNodoEstructuraContent.appendChild(miNodoKM);
       miNodoEstructuraContent.appendChild(miNodoBoton);
       miNodoEstructura.appendChild(miNodoEstructuraContent);
       DOMProductos.appendChild(miNodoEstructura);
    })   
};

renderizarProductos();

//Funcion que busca en un array el itemNombre y en caso de encontrarlo
//lo retorna. Si no lo encuentra, retorna undefined
function buscarItem(itemNombre,arr){
    const itemBuscado=arr.find((el)=>el.nombre===itemNombre);   
    return itemBuscado;
}

//Funcion de respuesta al evento "click" en cualquiera de los botones "agregar al carrito"
function respuestaBtnAgregarCarrito(event){
    event.preventDefault(); //para que no se recargue la pagina al clickear en el vinculo
    const botonClickeado= event.target; //con este capturo cual es el boton que estan clickeando
    const cardElegida = botonClickeado.closest(".cardAuto");  //con este capturo cual es el elemento mas cercano con esa clase (es decir toda la card)
    //Voy a desglozar la tarjeta
    const itemNombre=cardElegida.querySelector(".cardAuto-tittle").innerText;
    const itemPrecio=cardElegida.querySelector(".cardAuto-precio").innerText;
    const itemPrecioInt=parseInt(itemPrecio.replace("$",""));
    const itemModelo=cardElegida.querySelector(".cardAuto-modelo").innerText;
    const itemKm=cardElegida.querySelector(".cardAuto-km").innerText;
    const itemImage=cardElegida.querySelector(".cardAuto-img").src;
    const itemBuscado=buscarItem(itemNombre,carrito);
    //si el item no esta en el carrito, lo agrego
    if(itemBuscado==undefined){
        const item=new ItemCarrito(itemNombre,itemModelo,itemKm,itemPrecioInt,1,itemPrecioInt,itemImage);
        carrito.push(item);
    }
    //si el item esta en el carrito, le modifico la cantidad y el precioTotal del ItemCarrito
    else{
        let cantidadNueva=itemBuscado.cantidad+1;
        itemBuscado.setCantidad(cantidadNueva);
        itemBuscado.setPrecioTotal(itemBuscado.precio*cantidadNueva);
    }
    renderizarCarrito();
}

//Funcion que crea los items del carrito de acuerdo  al array carrito. 
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
    let sumaTotal=document.getElementById("sumaCompra");
    sumaTotal.innerText="TOTAL: $"+calcularTotal();
    
}

//Funcion de respuesta al evento "click" en cualquiera de los botones "x" del carrito. Elimina del carrito el item deseado. 
function respuestaBtnEliminarItem(event){
    let botonClickeado=event.target;
    const itemElegido = botonClickeado.closest(".itemCarrito");
    let itemElegidoNombre=(itemElegido.querySelector(".itemCarritoNombre")).innerText;
    const elementoEliminar=carrito.find((el)=>el.nombre===itemElegidoNombre);
    console.log(elementoEliminar);
    let posicion=carrito.indexOf(elementoEliminar);
    carrito.splice(posicion,1);
    renderizarCarrito();
}

//Funcion de respuesta al evento "click" en el boton vaciar carrito. Elimina todos elementos del carrito.
function vaciarCarrito(){
    while(carrito.length!=0){
        carrito.pop();
    }
    renderizarCarrito();
}

//Funcion que calcula la suma total de todos elementos del carrito.
function calcularTotal(){
    let suma=0;
    carrito.forEach(element => {
        
        suma=suma+element.precioTotal;
    });
    return suma;
} 

//Funcion de respuesta al evento "click" en el boton confirmar compra. 
function confirmarCompra(){
    if(carrito.length!=0){
        alert("Su compra ha sido confirmada. Gracias!\nLe enviaremos un mail con mas detalles");
        vaciarCarrito();
    }else{
        alert("Aun no ha agregado nada al carrito!");
    }
}

//EVENTOS
//BOTONES AGREGAR AL CARRITO
const botonesAgregarCarrito=document.querySelectorAll(".cardAuto-btn")
botonesAgregarCarrito.forEach(btn => {
    btn.addEventListener("click",respuestaBtnAgregarCarrito);
});

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




