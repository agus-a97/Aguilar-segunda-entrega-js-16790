//--Entidad
class Producto{
    constructor(nombre,precio,id,img){
        this.nombre=nombre;
        this.precio=precio;
        this.id=id;
    }
}
//--Constantes
//--Array

let productos=[];

//--Selectores
const btnGuardar=document.getElementById("boton");
btnGuardar.classList.add("btn","btn-success")
btnGuardar.addEventListener("click",guardarProductos);

const btnDark=document.getElementById("dark-mode");
btnDark.classList.add("btn","btn-secondary")
btnDark.addEventListener("click",cambiarTema);

const btnvaciarLista=document.getElementById("vaciarLista");
btnvaciarLista.addEventListener("click",vaciarLista);

//--Funciones

function vaciarLista(){
    localStorage.clear();
    mostrarProductos()

    location.reload();
}

function guardarProductos() {
    
    let nombre=document.getElementById("nombre").value;
    let precio=document.getElementById("precio").value;
    let id=document.getElementById("id").value;
    let prodNuevo= new Producto(nombre,precio,id);

    if(esValido(prodNuevo)&&prodExiste(prodNuevo)){
        guardar(prodNuevo);
        document.getElementById("formP").reset();
    }else{
        //si se pone el preventDefault deja que muestre este mensaje sin que recargue la pagina
        //si no se pone aparece un
        mostrarError("ERROR: producto existe o hay campos vacios");
    }
}
function prodExiste(prodNuevo){
    let salida=true;
    let prodLista=JSON.parse(localStorage.getItem("productos"));

    if(prodLista!=null&&prodLista.find(item=>item.id==prodNuevo.id)){
        salida=false;
    }
    return salida;
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
        section.textContent=`No hay productos cargados`;
        document.body.appendChild(section);
    }

}

function armarTarjeta(elemento){
    const tarjeta=document.createElement("div");
    tarjeta.classList.add("card","col-2","m-3");
    tarjeta.setAttribute("id",`${elemento.id}`);

    const nombreProd=document.createElement("h4");
    nombreProd.textContent=`${elemento.nombre}`;
    nombreProd.classList.add("titulo-4");
    tarjeta.appendChild(nombreProd);

    const prodPrecio=document.createElement("p");
    prodPrecio.textContent=`Precio: ${elemento.precio}`;
    prodPrecio.classList.add("precioProd");
    tarjeta.appendChild(prodPrecio);

    const btnComp=document.createElement("button");
    btnComp.classList.add("btn","btn-primary")
    btnComp.setAttribute("onclick",`comprar("Vendiste el producto")`)
    btnComp.textContent=`Vender`
    
    tarjeta.appendChild(btnComp);


    return tarjeta;

}
function cambiarTema(){
    document.body.classList.toggle("darkMode",);
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


//--Logica

mostrarProductos();