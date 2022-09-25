//BOTONES QUE SE USAN FRECUENTEMENTE//

//botones de control de lista
const boton_Guardar = document.getElementById('guardar');
const boton_Mostrar = document.getElementById('mostrar');
const boton_Cerrar = document.getElementById('cerrar');
const boton_crear = document.getElementById('boton-crear');
const guardar_cambios = document.getElementById('guardar-cambios');
const borrar_lista = document.getElementById('borrar-local');

let bags=[]; //CONTIENE LOS POSTITS CREADOS PARA CARGARLOS EN LA PAGINA
let carrito = [];

if (localStorage.length != 0) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

if (localStorage.getItem('bags') != null) {
    bags = JSON.parse(localStorage.getItem('bags'));
}

console.log(localStorage.getItem('bags'));

console.log(carrito);




class Bolsa {
    constructor(nombre) {
        this._nombre = nombre;
        this._articulos = [];
    }
    get nombre() {
        return this._nombre;
    }

    get bolsa() {
        let elemento = {
            nombre: this._nombre,
            articulos: this._articulos
        }
        return elemento;


    }
    guardarArticulos(descripcion, precio) {

        let articulo = {
            nombre: descripcion,
            precio: precio
        }

        this._articulos.push(articulo);

    }



}





//*************************FUNCIONES***********************//

//FUNCION PARA CARGAR ELEMENTOS ALMACENADOS EN EL LOCALSTORAGE

const cargar = (bags)=>{
    console.log(bags);
    //let seccion = document.querySelector('.board');
    //seccion.appendChild();
}

//FUNCION PARA AGREGAR UN DEPARTAMENTO

function agregarDepto() {
    let seccion = document.querySelector('.board');
    let depto = prompt("Introduzca un nombre");
    let bag=document.createElement('div');
    bag.className='bag';
    bag.innerHTML=`
    <div class="bag-header">
        <h3 class='nameDepto'>${depto}</h3>    
        <label class="label" for="text">
                Descripcion
            </label>
            <label class="label" for="price">
                Importe
            </label>
        </div>
        <div class="items">
            <div class="item">
                <input type="checkbox" name="box" class="checkbox">
                <input type="text" name="text" placeholder="Enter item description Example: 'Almond Milk '" required class="item-description">
                <input type="number" name="price" placeholder="10.5" class="price" min="0" required onchange="sumaPres()">
                <button class="add">+</button>
                <button class="del">-</button>
            </div>
        </div>
    
        <div class="bag-footer">
            <img class="close-window" src="./images/close.svg" alt="">
            <img class="delete-item" src="./images/icon-trash-normal.svg" alt="check">
            <img class="add-item" src="./images/check-solid.svg" alt="">
        </div>
    
    `
    seccion.appendChild(bag);
    
    boton_Guardar.style.display = 'unset';

}


//FUNCION PARA GUARDAR POSTITS EN EL STORAGE Y CARGARLOS EN PAGINA
const recBags =()=>{
    let postIts = document.getElementsByClassName('bag-min');
    for (let index = 0; index < postIts.length; index++) {
        console.log(postIts[index]);    
        bags.push(postIts[index]);  
    }
    
    localStorage.setItem('bags',JSON.stringify(bags));    
    


} 



//FUNCION MINIMIZAR QUE ACTUA SOBRE EL BOTON CERRAR

const minimizar = (e) => {
    e.path[2].className = 'bag-min';
    //CAMBIA LA CLASE DEL ENCABEZADO, Y OCULTA LAS ETIQUETAS DESCRIPCION Y PRECIO
    e.path[2].childNodes[1].className = 'bag-header-min';
    e.path[2].childNodes[1].childNodes[3].style.display = 'none';
    e.path[2].childNodes[1].childNodes[5].style.display = 'none';
    e.path[2].childNodes[3].className = 'items-min';
    //OCULTA EL FOOTER
    e.path[2].childNodes[5].className = 'bag-footer-min';
    //OCULTA LOS ITEMS DEL DEPTO
    e.path[2].childNodes[3].className = 'item-min';

}


const maximizar = (e) => {
    
    let elementClass = e.target.className;

    if (elementClass === 'bag-min') {
        e.path[0].className = 'bag';
        e.path[0].childNodes[1].className = 'bag-header';
        e.path[0].childNodes[1].childNodes[3].style.display = 'flex';
        e.path[0].childNodes[1].childNodes[5].style.display = 'flex';
        e.path[0].childNodes[3].className = 'items';
        e.path[0].childNodes[5].className = 'bag-footer';
    }
    else if (elementClass === 'nameDepto') {
        e.path[2].className = 'bag';
        e.path[2].childNodes[1].className = 'bag-header';
        e.path[2].childNodes[1].childNodes[3].style.display = 'flex';
        e.path[2].childNodes[1].childNodes[5].style.display = 'flex';
        e.path[2].childNodes[3].className = 'items';
        e.path[2].childNodes[5].className = 'bag-footer';
    }

    else if (elementClass === 'bag-header-min') {
        e.path[1].className = 'bag';
        e.path[1].childNodes[1].className = 'bag-header';
        e.path[1].childNodes[1].childNodes[3].style.display = 'flex';
        e.path[1].childNodes[1].childNodes[5].style.display = 'flex';
        e.path[1].childNodes[3].className = 'items';
        e.path[1].childNodes[5].className = 'bag-footer';

    }

}

//FUNCION QUE CREA UNA BOLSA CON ARTICULOS PARA SER GUARDADA EN EL LOCALSTORAGE

const guardarBolsa = (nombre, arreglo) => {
    console.log(carrito);
    let departamento = new Bolsa(nombre);
    console.log(arreglo);
    console.log(departamento);
    for (let index = 0; index < arreglo.length; index++) {
        console.log(arreglo[index][0]);
        console.log(arreglo[index][1]);
        departamento.guardarArticulos(arreglo[index][0], arreglo[index][1])

    }

    console.log(departamento.bolsa);    
    carrito.push(departamento.bolsa);
    //carrito.push(departamento.bolsa)

    localStorage.setItem('carrito',JSON.stringify(carrito));       
}




//FUNCION QUE TOMA LA INFORMACION DE LOS ITEMS PARA CREAR BOLSAS

const guardar = (e) => {
    let valores = [];

    console.log(e);
    let bolsaNombre = e.path[2].childNodes[1].childNodes[1].textContent;
    console.log(bolsaNombre);
    let bolsaItems = e.path[2].childNodes[3].children;
    console.log(bolsaItems);

    for (let index = 0; index < bolsaItems.length; index++) {
        valores.push([bolsaItems[index].childNodes[3].value, bolsaItems[index].childNodes[5].value]);
    }
    console.log(valores);
    guardarBolsa(bolsaNombre, valores)
    e.stopPropagation;
}

//AGREGAR ITEM EN LA BOLSA CORRESPONDIENTE
const agregarItem = (element) => {

    let elementParentClass = element.parentNode;
    let elementGrand = elementParentClass.parentNode;
    let nvoItem = document.createElement('div');
    nvoItem.className = 'item';
    nvoItem.innerHTML = `
        <input type="checkbox" name="box" class="checkbox">
            <input type="text" name="text" placeholder="Enter item description Example: 'Almond Milk '" required class="item-description">
            <input type="number" name="price" placeholder="10.5" class="price" min="0" required onchange="sumaPres()">
            <button class="add">+</button>
            <button class="del">-</button>
        `

    elementGrand.appendChild(nvoItem);
}

//FUNCION PARA SUMAR
const sumaPres = () => {
    let inputPrecios = document.getElementsByClassName('price');
    let sumaArreglo = 0;
    let totalPresupuesto = document.getElementById('total-pres');

    for (let index = 0; index < inputPrecios.length; index++) {
        console.log(inputPrecios[index].value);
        //sumaArreglo += parseFloat(inputPrecios[index].value);
        sumaArreglo+=parseFloat(inputPrecios[index].value);
    }
    totalPresupuesto.value = sumaArreglo.toFixed(2);
    return sumaArreglo;
}


const sumaLista = ()=>{
    let total = document.getElementById('total-pres');
    let sumatoria = 0;
    carrito.forEach(element =>{
        sumatoria+=element.articulos[1].precio;
    })
    total.value = sumatoria;
}

//EVENTOS
document.addEventListener('click', e => {
    let btnTarget = e.target
    //GUARDAR ARTICULOS EN LA BOLSA
    if (btnTarget.className === 'add-item') {
        guardar(e);
    }
    //AGREGAR UN DEPARTAMENTO
    else if (btnTarget.value === '(+) Agregar Depto') {
        agregarDepto();
    }

    //ELIMINAR UN DEPARTAMENTO
    else if (btnTarget.value === '-') {
        eliminar(btnTarget);
    }

    //AGREGAR UN ITEM DENTRO DEL DEPARTAMENTO
    else if (btnTarget.className === 'add') {
        agregarItem(btnTarget)
    }

    //MINIMIZAR BOLSA
    else if (btnTarget.className === 'close-window') {
        minimizar(e)
    }

    //MAXIMIZAR BOLSA
    else if (btnTarget.className === 'bag-min' || btnTarget.className === 'bag-header-min' || btnTarget.className === 'nameDepto') {
        maximizar(e);
    }

    //REVISA EL CARRITO

    else if(btnTarget.id === 'cart'){
        open('carrito.html');
        /*
        let lista = document.createElement('div');
        
        lista.id='revision';

        carrito.forEach(element=>{
            let campo = document.createElement('p');
            console.log(element);
            let nombre = element.nombre;
            let articulo = element.articulos[0].nombre;
            let precio = element.articulos[1].precio;
            campo.innerHTML = `
            
            ${nombre}
            ${articulo}
            ${precio}


            `
            lista.appendChild(campo);
        
        });
        document.body.appendChild(lista);
        */
    }

    
})








/*

//FUNCION PARA ELIMINAR UN DEPARTAMENTO
const eliminar = e => {
    let parentLi = e.parentNode;
    let parentUl = parentLi.parentNode;
    parentUl.removeChild(parentLi);
    sumaPres();
    sumaReal();

}









const sumaReal = () => {
    let inputReal = document.getElementsByClassName('real');
    let sumaReal = 0;
    let totalReal = document.getElementById('total-real');
    for (let index = 0; index < inputReal.length; index++) {
        sumaReal += parseFloat(inputReal[index].value);

    }
    totalReal.value = sumaReal.toFixed(2);
    diferencia();
    return sumaReal.toFixed(2);

}
//FUNCION PARA DETERMINAR DIFERENCIA
const diferencia = () => {
    let total_real = document.getElementById('total-real').value;
    let total_pres = document.getElementById('total-pres').value;
    let cajaDiferencia = document.getElementById('diferencia');
    cajaDiferencia.value = (total_pres - total_real).toFixed(2);
}






//*****FUNCIONES DE LA VERSION 1****/

/*

//GUARDAR LISTA EN EL LOCALSTORAGE

const guardar = () => {
    let items = document.getElementsByClassName('articulo');
    let nodos = []
    for (const item of items) {
        let producto = new Articulo();
        producto.nombre_articulo = item.childNodes[3].value;
        producto.precio_pres = item.childNodes[7].value;
        producto.precio_real = item.childNodes[11].value;
        nodos.push(producto);

    }

    localStorage.setItem('presupuesto', JSON.stringify(nodos));
    limpiar();
    //boton_crear.style.display = 'none';
    boton_Mostrar.style.display = 'unset';
    boton_Guardar.style.display = 'none';
    return nodos;

}



const limpiar = () => {
    let lista = document.getElementById('lista');
    lista.innerHTML = `
    <p>Lista almacenada con exito</p>
    `
    let total_real = document.getElementById('total-real').value = 0;
    let total_pres = document.getElementById('total-pres').value = 0;
    let cajaDiferencia = document.getElementById('diferencia').value = 0;

}



const guardarCambios = () => {
    let items = document.getElementsByClassName('articulo');
    let nodos = []
    for (const item of items) {
        let producto = new Articulo();
        producto.nombre_articulo = item.childNodes[3].value;
        producto.precio_pres = item.childNodes[7].value;
        producto.precio_real = item.childNodes[11].value;
        nodos.push(producto);

    }

    localStorage.setItem('presupuesto', JSON.stringify(nodos));
    limpiar();
    //boton_crear.style.display = 'none';
    boton_Mostrar.style.display = 'unset';
    //boton_Guardar.style.display = 'none';
    guardar_cambios.style.display = 'none';
    return nodos;

}





const obtenerLocal = () => {
    if (localStorage.length === 0) {
        alert('No existe lista en el almacen');
    }
    else {
        let seccion = document.getElementById('lista');
        seccion.innerHTML = " ";
        let almacen = JSON.parse(localStorage.getItem('presupuesto'));
        for (let x = 0; x < almacen.length; x++) {
            let elemento = document.createElement('div');
            elemento.classList = 'articulo';
            elemento.innerHTML = `
            <label>Nombre Producto</label>
            <input class='propiedad item' type='text' placeholder='Nombre del articulo' value="${almacen[x].nombre_articulo}">
            <label>Valor Presupuesto</label>
            <input class='propiedad precio' type='number' onchange="sumaPres()" placeholder='$ Valor Presupuestado' value="${almacen[x].precio_pres}">
            <label>Valor Real</label>
            <input class='propiedad real' type='number' onchange="sumaReal()" placeholder='$ Valor Real' value="${almacen[x].precio_real}">
            <input class='btneliminar' type='button' value='-'">

                        
                `;
            seccion.appendChild(elemento);
        }
        sumaPres();
        sumaReal();

        boton_Mostrar.style.display = 'none';
        //boton_crear.style.display = 'unset';
        //boton_Cerrar.style.display = 'unset';
        boton_Guardar.style.display = 'none';
        guardar_cambios.style.display = 'unset';
        borrar_lista.style.display = 'unset';


    }

}





//ACTUA SOBRE EL BOTON BORRAR LISTA
const borrarLista = () => {
    localStorage.clear();
    guardar_cambios.style.display = 'none';
    borrar_lista.style.display = 'none';
    limpiar();
    boton_Mostrar.style.display = 'flex';
}
*/