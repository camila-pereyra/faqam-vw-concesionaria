//CLASE AUTO
class Auto{
    //constructor
    constructor(id, marca, modelo, anio, precioLista, km, precioVenta, cdo, financiacion, cuotas){
        this.id=id;
        this.marca=marca;
        this.modelo=modelo;
        this.anio=anio;
        this.precioLista=precioLista;
        this.km=km;
        this.precioVenta=precioVenta;
        this.cdo=cdo;
        this.financiacion=financiacion;
        this.cuotas=cuotas;
    }
    //setter
    setPrecioVenta(precioDeVenta){
        this.precioVenta=precioDeVenta;
    }
    setCdo(cdo){
        this.cdo=cdo;
    }
    setFinanciacion(financiacion){
        this.financiacion=financiacion;
    }
    setCuotas(cuotas){
        this.cuotas=cuotas;
    }
    //mostrar
    verAutoDatosPrimarios(){
        alert("AUTO ID: "+this.id+"\nModelo: "+this.modelo+"\nAnio: "+this.anio+"\nPrecio Lista: $"+this.precioLista+"\nKM: "+this.km+"\n");
    }
    verAutoDatosCompletos(){
        alert("AUTO ID: "+this.id+"\nModelo: "+this.modelo+"\nAnio: "+this.anio+"\nPrecio Lista: $"+this.precioLista+"\nKM: "+this.km+"\nContado: "+this.cdo+"\nFinanciacion: "+this.financiacion+"\nCuotas: "+this.cuotas+"\n\nPRECIO FINAL s/financiacion: $"+this.precioVenta);
    }
}

//FUNCIONES 
//Funciones para mostrar (de manera completa o limitada) el array de Autos
function verAutosDatosPrimarios(arrAutos){
    for (const auto of arrAutos) {
        auto.verAutoDatosPrimarios();
    }
}
function verAutosDatosCompletos(arrAutos){
    for (const auto of arrAutos) {
        auto.verAutoDatosCompletos();
    } 
}

//Funcion que busca el/los auto/s dependiendo del filtro(modelo) ingresado por el usuario, los almacena en un array y los retorna.
function buscarAutosPorModelo(arrayAutos){
    let busqueda= prompt("Por favor ingrese el modelo de auto que quiere comprar: ").toUpperCase();
    let filtrados = arrayAutos.filter(elemento => elemento.modelo.includes(busqueda));
   return filtrados;
}

//Funcion que busca y retorna el auto dependiendo del id ingresado por el usuario
function buscarAutoPorID (arrayAutos) {
    const autoComprado=new Auto(); //constructor vacio, en caso de no elegir ningun Auto del array devolvera un objeto Auto con atributos undefined
    let idElegido=parseInt(prompt("Por favor ingrese el ID del auto que quiere comprar: "));
    for (const auto of arrayAutos) {
        if(auto.id===idElegido){
            autoComprado.id=auto.id;
            autoComprado.modelo=auto.modelo;
            autoComprado.anio=auto.anio;
            autoComprado.precioLista=auto.precioLista;
            autoComprado.km=auto.km;
            autoComprado.precioVenta=auto.precioVenta;
            autoComprado.cdo=auto.cdo;
            autoComprado.financiacion=auto.financiacion;
            autoComprado.cuotas=auto.cuotas;        }
    }
    return autoComprado;
}

//Funcion que devuelve 1 o 2 segun la opcion elegida por el usuario.
function elegirMedioDePago(){
    let medioPago=0;
    do{
        medioPago=parseInt(prompt("Por favor elija como lo va a abonar. (1-Contado | 2-Financiado (cuotas)"));
    }while(medioPago!=1 && medioPago!=2);
    return medioPago;
}

//Funcion que devuelve 12, 24 o 36 segun la opcion elegida por el usuario.
function elegirCantidadCuotas(){
    let cuotas=0;
    do{
        cuotas=parseInt(prompt("Por favor elija en cuantas cuotas lo va a abonar. (12 | 24 | 36)"));
    }while(cuotas!=12 && cuotas!=24 &&cuotas!=36);
    return cuotas;
}
//Funcion de orden superior segun las cuotas que recibe por parametro devuelve la funcion que calcula el precio de venta
function calcularPrecioDeVenta(cuotas){
    if(cuotas==12){
        return (a)=>a*1.15;
    }
    if(cuotas==24){
        return (a)=>a*1.20;
    }
    if(cuotas==36){
        return (a)=>a*1.25;
    }
}

//Funcion menu (bucle)
function menu(arrAutos, arrAutosComprados){
    let opcion=-1;
    do{
        opcion=parseInt(prompt("MENU\n1-Ver autos disponibles\n2-Buscar auto por modelo\n3-Agregar un auto al carrito de compras\n4-Ver carrito\n0-Salir\n\nElija una opcion: "));
        switch(opcion){
            case 0: alert("Usted ha salido! Hasta pronto!"); 
            break;
            case 1: verAutosDatosPrimarios(arrAutos);
            break;
            case 2: let autosPorModelo=buscarAutosPorModelo(arrAutos);
            if(autosPorModelo.length==0){
                alert("No se ha encontrado coincidencia alguna.");
            }else{
                verAutosDatosPrimarios(autosPorModelo);
            }
            break;
            case 3: 
            let autoComprado= buscarAutoPorID(arrAutos);
            if(autoComprado.id!=undefined){
                let pago=elegirMedioDePago();
                if(pago==1){
                    autoComprado.setCdo(true);
                    autoComprado.setPrecioVenta(autoComprado.precioLista*0.85);
                }else{
                    autoComprado.setFinanciacion(true);
                    let cuotas=parseInt(elegirCantidadCuotas());
                    autoComprado.setCuotas(cuotas);
                    let calculoPrecioVenta=calcularPrecioDeVenta(cuotas);
                    autoComprado.setPrecioVenta(calculoPrecioVenta(autoComprado.precioLista));
                }
                arrAutosComprados.push(autoComprado);
                alert(`Auto ${autoComprado.modelo} agregado al carrito con exito.`);
            }else{
                alert("No ha elegido el auto de manera correcta. Por favor, ingrese bien el ID del auto deseado.")
            }
            break;
            case 4: 
            if(arrAutosComprados.length ==0){
                alert("No ha comprado ningun auto aún.");
            }else{
                verAutosDatosCompletos(arrAutosComprados);
            }
            break;
            default: alert("No es una opcion valida.");
            break;   
        }  
    }while (opcion!=0);
}


/* ************************************************************************************************************************** */
//Creo los objetos del tipo Auto
const auto1=new Auto(1,"VW","TAOS",2010,1500000,60000,0,false,false,0);
const auto2=new Auto(2,"VW","BORA",2015,1800000,30000,0,false,false,0);
const auto3=new Auto(3,"VW","UP",2020,2000000,15000,0,false,false,0);
const auto4=new Auto(4,"VW","FOX",2013,800000,65000,0,false,false,0);
const auto5=new Auto(5,"VW","GOL",2018,950000,60000,0,false,false,0);
const auto6=new Auto(6,"VW","VENTO",2020,2300000,50000,0,false,false,0);
const auto7=new Auto(7,"VW","POLO",2010,1000000,100000,0,false,false,0);
const auto8=new Auto(8,"VW","TIGUAN",2021,970000,9000,0,false,false,0);
const auto9=new Auto(9,"VW","PASSAT",2008,1500000,98000,0,false,false,0);
const auto10=new Auto(10,"VW","VIRTUS",2012,1200000,75000,0,false,false,0);

//Creo un array de autos y agrego todos los objetos
const autos=[]; 
autos.push(auto1);
autos.push(auto2);
autos.push(auto3);
autos.push(auto4);
autos.push(auto5);
autos.push(auto6);
autos.push(auto7);
autos.push(auto8);
autos.push(auto9);
autos.push(auto10);

//Creo un array de autos comprados (vacio)
const autosComprados=[]; 

//Bucle
menu(autos, autosComprados);