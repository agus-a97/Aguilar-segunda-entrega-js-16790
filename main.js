//--Entidad
class Producto{
    constructor(id,nombre,precio){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
    }
}
//--Constantes
//--Array
// let productos=[{id:1,nombre:"Manzana",precio:150},
//                 {id:2,nombre:"Naranjas",precio:200},
//                 {id:3,nombre:"Cebollas",precio:350},
//                 {id:4,nombre:"Peras",precio:400},
//                 {id:5,nombre:"Limon",precio:50},]
let productos=[];

//--Selectores
const btnGuardar=document.getElementById("boton");
btnGuardar.classList.add("btn","btn-success")

const btnDark=document.getElementById("dark-mode");
btnDark.classList.add("btn","btn-secondary")

//--Funciones
function descargaDatos() {
    //descarga (si hay algo) lo que hay en localStorage
    const datos= JSON.parse(localStorage.getItem(`${this.nombre}`));
    //  si datos esta vacio quiere decir que es falso por lo que entra por el else
    // es lo mismo que poner productos!=NULL
    if (datos) {
        //lo guarda en el array de productos
         productos=datos;
    } else {
        //si localStorage esta vacio setea juegos como un array vacio
         productos=[{id:1,nombre:"Manzana",precio:150},
                {id:2,nombre:"Naranjas",precio:200},
                {id:3,nombre:"Cebollas",precio:350},
                {id:4,nombre:"Peras",precio:400},
                {id:5,nombre:"Limon",precio:50},]
        
        localStorage.setItem("productos",JSON.stringify(productos));
    }
}

function guardarProductos() {
    
    let nombre=document.getElementById("nombre").value;
    let precio=document.getElementById("precio").value;
    let codigo=document.getElementById("codigo").value;
    let prodNuevo= new Producto(nombre,precio,codigo);

    if(esValido(prodNuevo)&&prodExiste(prodNuevo)){
        guardar(prodNuevo);
        document.getElementById("formP").reset();
    }else{
        //si se pone el preventDefault deja que muestre este mensaje sin que recargue la pagina
        //si no se pone aparece un
        mostrarError("ERROR: producto existe o hay campos vacios");
    }
}
function guardar(prodNuevo){

    let prodLista=JSON.parse(localStorage.getItem("productos"))
    if(localStorage.getItem("productos")!=null){
        
        prodLista.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(prodLista))

    }else{

        localStorage.clear();
        productos.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(productos))
    }
}
function esValido(prodNuevo){
    let salida = true;
    const campos = Object.values(prodNuevo);
    campos.forEach(campo => {
        if (campo === "") {
            salida = false;
        }
    });
    return salida;
}

function prodExiste(prodNuevo){
    let salida=true;
    let prodLista=JSON.parse(localStorage.getItem("productos"));

    if(prodLista.find(item=>item.codigo==prodNuevo.codigo)){
        salida=false;
    }
    return salida;
}

function mostrarError(mensaje) {
    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "m-3");
    div.textContent = mensaje;

    const section = document.getElementById("sect1");
    section.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}
function mostrarProductos(){
    
    const section=document.createElement("section");
    section.classList.add("sect2","contariner","m-2");

    const nombreSection=document.createElement("h3");
    nombreSection.classList.add("titulo-3");
    nombreSection.textContent=`Tarjetas de los Productos Agregados`;

    const div=document.createElement("div");
    div.classList.add("row","justify-content-evenly");

    section.appendChild(nombreSection);
    section.appendChild(div);

    let prodLista=JSON.parse(localStorage.getItem("productos"))
    if (prodLista!=null) {
        prodLista.map(elemento=>{
            div.appendChild(armarTarjeta(elemento));

        })
        document.body.appendChild(section);
    }else{
        console.log("El array estaba nulo");
    }

}

function armarTarjeta(elemento){
    const tarjeta=document.createElement("div");
    tarjeta.classList.add("tarjeta","col-2","m-2");

    const nombreProd=document.createElement("h4");
    nombreProd.textContent=`${elemento.nombre}`;
    nombreProd.classList.add("titulo-4");
    tarjeta.appendChild(nombreProd);

    const prodPrecio=document.createElement("div");
    prodPrecio.textContent=`Precio: ${elemento.precio}`;
    prodPrecio.classList.add("precioProd");
    tarjeta.appendChild(prodPrecio);

    const codProd=document.createElement("div");
    codProd.textContent=`Codigo: ${elemento.codigo}`
    codProd.classList.add("codProd");
    tarjeta.appendChild(codProd);

    const btnComp=document.createElement("button");
    btnComp.classList.add("btn","btn-primary")
    btnComp.setAttribute("onclick",`comprar("Compraste el producto")`)
    btnComp.textContent=`Comprar`
    
    tarjeta.appendChild(btnComp);


    return tarjeta;

}
function cambiarTema(){
    document.body.classList.toggle("darkMode",);
    document.body.classList.toggle("fondo",);
}
function comprar(mensaje){
    // console.log("compraste producto");
    const div = document.createElement("div");
    div.classList.add("alert","alert-success","m-3");
    div.textContent=mensaje;

    const section=document.getElementsByClassName("sect2")[0];
    section.appendChild(div);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 4000);
}
//--Eventos
btnGuardar.addEventListener("click",guardarProductos);
btnDark.addEventListener("click",cambiarTema);

//--Logica
descargaDatos();
mostrarProductos();