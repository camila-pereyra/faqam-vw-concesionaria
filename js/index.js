const updateMsjBienvenida= () =>{
    let msjBienvenida= document.getElementById("msjBienvenida");
    console.log ((JSON.parse(sessionStorage.getItem("usuario"))).nombre);
    msjBienvenida.innerText="";
    msjBienvenida.innerText=`Bienvenido/a, ${(JSON.parse(sessionStorage.getItem("usuario"))).nombre}!`
}

if(sessionStorage.getItem("usuario")!=null){
    updateMsjBienvenida();
}