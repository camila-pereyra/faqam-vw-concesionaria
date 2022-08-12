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


