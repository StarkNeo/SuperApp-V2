//BOTONES QUE SE USAN FRECUENTEMENTE//

//botones de control de lista
const boton_Guardar = document.getElementById('guardar');
const boton_Mostrar = document.getElementById('mostrar');
const boton_Cerrar = document.getElementById('cerrar');
const boton_crear = document.getElementById('boton-crear');
const guardar_cambios = document.getElementById('guardar-cambios');
const borrar_lista = document.getElementById('borrar-local');


let carrito = [];

if (localStorage.length != 0) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

if (localStorage.getItem('bags') != null) {
    bags = JSON.parse(localStorage.getItem('bags'));
}




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

const cargarPostits = () => {

    carrito.forEach(element => crearPost(element))
    sumarCarro();
}

//FUNCION PARA AGREGAR UN DEPARTAMENTO

function crearPost(elemento) {
    console.log(elemento);
    let seccion = document.querySelector('.board');

    let bag = document.createElement('div');
    bag.className = 'bag-min';

    //seccion header
    let bagHeader = document.createElement('div');
    bagHeader.className = 'bag-header-min';
    bagHeader.innerHTML = `
        <h3 class='nameDepto'>${elemento.nombre}</h3>    
        <label class="label" for="text" style="display:none">
                Descripcion
        </label>
        <label class="label" for="price" style="display:none">
                Importe
        </label>
        
    
    `
    //seccion items
    let bagItems = document.createElement('div');
    bagItems.className = 'items-min';
    let arrayArticulos = elemento.articulos;
    console.log(arrayArticulos);
    arrayArticulos.forEach(element => {
        let nvoItem = document.createElement('div');
        let precio = parseFloat(element.precio);
        console.log(precio);
        nvoItem.className = 'item-min';
        nvoItem.innerHTML = `
        <input type="checkbox" name="box" class="checkbox">
            <input type="text" name="text" placeholder="Enter item description Example: 'Almond Milk '" required class="item-description" value="${element.nombre}">
            <input type="number" name="price" placeholder="10.5" class="price" min="0" required onchange="sumaPres()" value="${precio}">
            <button class="add">+</button>
            <button class="del">-</button>
        
        `
        bagItems.appendChild(nvoItem);
    });


    //seccion footer
    let bagFooter = document.createElement('div');
    bagFooter.className = 'bag-footer-min';
    bagFooter.innerHTML = `
            <img class="close-window" src="./images/close.svg" alt="">
            <img class="delete-item" src="./images/icon-trash-normal.svg" alt="check">
            <img class="add-item" src="./images/check-solid.svg" alt="">
    `

    bag.appendChild(bagHeader);
    bag.appendChild(bagItems);
    bag.appendChild(bagFooter);

    seccion.appendChild(bag);


}



//FUNCION PARA CARGAR ELEMENTOS ALMACENADOS EN EL LOCALSTORAGE

const cargar = (carrito) => {
    console.log(bags);
    let seccion = document.querySelector('.board');
    carrito.forEach(element => console.log(element))
}

//FUNCION PARA AGREGAR UN DEPARTAMENTO

function agregarDepto() {
    let seccion = document.querySelector('.board');

    //console.log(carrito.indexOf(carrito.nombre === depto));
    let validar;
    let depto;

    //VALIDAR SI EL CARRITO ESTA VACIO OMITE EL CICLO WHILE   
    if (carrito.length === 0) {

        validar = false;
        depto = prompt("Introduzca un nombre para el departamento");
        console.log(typeof depto);
    }
    
    else validar = true;

    //SI EL CARRITO CONTIENE ELEMENTOS ENTRAR AL CICLO PARA VALIDAR QUE NO SE REPITAN LOS NOMBRES DEL DEPTO.
    while (validar === true) {
        depto = prompt("Introduzca un nombre para el departamento");
        console.log(depto);

        for (const key in carrito) {
            if (carrito[key].nombre === depto) {
                console.log(carrito[key].nombre);
                validar = true;
                alert('Ya existe un departamento con ese nombre')
                break
            }
            else {
                console.log(carrito[key].nombre);
                validar = false;
            }

        }

        console.log(validar);
    }


    let valor = parseFloat(0);
    let bag = document.createElement('div');
    bag.className = 'bag';
    bag.innerHTML = `
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
                <input type="number" name="price" placeholder="10.5" class="price" min="0" onchange="sumaPres()" value="${valor}" required >
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


}


const minimizar = (e) => {
    console.log(e);
    e.path[2].className = 'bag-min';
    //CAMBIA LA CLASE DEL ENCABEZADO, Y OCULTA LAS ETIQUETAS DESCRIPCION Y PRECIO
    e.path[2].children[0].className = 'bag-header-min';
    e.path[2].children[0].children[1].style.display = 'none';
    e.path[2].children[0].children[2].style.display = 'none';
    e.path[2].children[1].className = 'items-min';
    let items = e.path[2].children[1].children;
    console.log(items);
    for (let index = 0; index < items.length; index++) {

        items[index].className = 'item-min';
    }
    //OCULTA EL FOOTER
    e.path[2].children[2].className = 'bag-footer-min';
    //OCULTA LOS ITEMS DEL DEPTO
    //e.path[2].children[1].children[1].className = 'item-min';

}


/*
const maximizar = (e) => {
    console.log(e);
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
*/
const maximizar = (e) => {
    console.log(e);
    let elementClass = e.target.className;

    if (elementClass === 'bag-min') {
        e.path[0].className = 'bag';
        e.path[0].children[0].className = 'bag-header';
        e.path[0].children[0].children[1].style.display = 'flex';
        e.path[0].children[0].children[2].style.display = 'flex';
        e.path[0].children[1].className = 'items';
        let items = e.path[0].children[1].children;
        console.log(items);
        for (let index = 0; index < items.length; index++) {

            items[index].className = 'item';
        }
        e.path[0].children[2].className = 'bag-footer';
    }
    else if (elementClass === 'nameDepto') {
        e.path[2].className = 'bag';
        e.path[2].children[0].className = 'bag-header';
        e.path[2].children[0].children[1].style.display = 'flex';
        e.path[2].children[0].children[2].style.display = 'flex';
        e.path[2].children[1].className = 'items';
        let items = e.path[2].children[1].children;
        console.log(items);
        for (let index = 0; index < items.length; index++) {

            items[index].className = 'item';
        }

        e.path[2].children[2].className = 'bag-footer';
    }

    else if (elementClass === 'bag-header-min') {
        e.path[1].className = 'bag';
        e.path[1].children[0].className = 'bag-header';
        e.path[1].children[0].children[1].style.display = 'flex';
        e.path[1].children[0].children[2].style.display = 'flex';
        e.path[1].children[1].className = 'items';
        let items = e.path[1].children[1].children;
        console.log(items);
        for (let index = 0; index < items.length; index++) {

            items[index].className = 'item';
        }
        e.path[1].children[2].className = 'bag-footer';

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

    localStorage.setItem('carrito', JSON.stringify(carrito));
}




//FUNCION QUE TOMA LA INFORMACION DE LOS ITEMS PARA CREAR BOLSAS

const guardar = (e) => {
    console.log(carrito);
    let bolsaNombre = e.path[2].children[0].children[0].textContent;
    let valores = [];
    let bolsaItems = e.path[2].children[1].children;
    let validar; //VALIDA SI EL CARRITO SE ENCUENTRA VACIO
    let articulos = []; //ARREGLO DE ARTICULOS PARA ACTUALIZACION
    console.log(bolsaNombre);
    console.log(bolsaItems);
    //SI EL CARRITO ESTA VACIO variable VALIDAR = true y  EJECUTA LINEA 422
    if (carrito.length === 0) {
        validar = true;
    }
    //SI EL CARRITO NO ESTA VACIO, ENTONCES, VALIDA SI ELEMENTO YA EXISTE EN EL Y ACTUALIZALO
    else if (carrito.length > 0) {
        for (const key in carrito) {
            if (carrito[key].nombre === bolsaNombre) {
                console.log(carrito[key]);
                let index = carrito.indexOf(carrito[key]);
                for (let i = 0; i < bolsaItems.length; i++) {
                    let articulo = {
                        nombre: bolsaItems[i].children[1].value,
                        precio: bolsaItems[i].children[2].value
                    }

                    articulos.push(articulo);

                }
                console.log(articulos);
                console.log(index);
                carrito[index]={
                    nombre: bolsaNombre,
                    articulos: articulos
                }
                //carrito[key]="AQUI VA EL REEMPLAZO";
                console.log(carrito);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                validar = false; //SI YA EXISTE, NO EJECUTA PROCESO DE LA LINEA 422
                break;
            } else {
                validar = true;
            }
        }
    }
    //LINEA 422 TOMA LOS ARTICULOS EN LA BOLSA Y SU NOMBRE, Y PASALOS A LA FUNCION guardarBolsa 
    if (validar === true) {
        //let valores = [];

        //let bolsaItems = e.path[2].children[1].children;

        console.log(bolsaItems);

        for (let index = 0; index < bolsaItems.length; index++) {
            valores.push([bolsaItems[index].children[1].value, bolsaItems[index].children[2].value]);
        }
        console.log(valores);
        guardarBolsa(bolsaNombre, valores)
        e.stopPropagation;



    }

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
        sumaArreglo += parseFloat(inputPrecios[index].value);
    }
    console.log(sumaArreglo);
    totalPresupuesto.value = sumaArreglo.toFixed(2);

}


const sumaLista = () => {
    let total = document.getElementById('total-pres');
    let sumatoria = 0;
    carrito.forEach(element => {
        sumatoria += element.articulos[1].precio;
    })
    total.value = sumatoria;
}


//FUNCION PARA ELIMINAR UN DEPARTAMENTO
const eliminar = e => {

    console.log(e);
    let parent = e.path[2];
    let bagName = e.path[2].children[0].children[0].textContent;

    console.log(parent);
    let granParent = parent.parentNode;
    console.log(granParent);
    console.log(bagName);
    console.log(carrito.indexOf(bagName));
    granParent.removeChild(parent);

    /*
    
    let parentUl = parentLi.parentNode;
    parentUl.removeChild(parentLi);
    sumaPres();
    sumaReal();
    */
}


const borrarLista = () => {
    localStorage.removeItem('carrito');
    location.reload();
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
    else if (btnTarget.className === 'delete-item') {
        eliminar(e);
    }

    //AGREGAR UN ITEM DENTRO DEL DEPARTAMENTO
    else if (btnTarget.className === 'add') {
        agregarItem(btnTarget)
    }

    //MINIMIZAR BOLSA
    else if (btnTarget.className === 'close-window') {
        guardar(e);
        minimizar(e);
    }

    //MAXIMIZAR BOLSA
    else if (btnTarget.className === 'bag-min' || btnTarget.className === 'bag-header-min' || btnTarget.className === 'nameDepto') {
        maximizar(e);
    }

    //REVISA EL CARRITO

    else if (btnTarget.id === 'cart') {
        open('carrito.html');

    }





})



const sumarCarro=()=>{
    let arrayValores =[] 
    let sumaTotal=0;
    let totalPres =document.getElementById('total-pres');
    for(const key in carrito) {
        arrayValores.push(carrito[key].articulos)

    }

    console.log(arrayValores);

    for (const key in arrayValores) {
        arrayValores[key].forEach(element=>sumaTotal+=JSON.parse(element.precio));
    }
    
    console.log(sumaTotal);
    totalPres.value=sumaTotal;
    
    /*
    let sumaTotal = 0;
    carrito.forEach(element =>{
        console.log(element);
        console.log(element.articulos);
        console.log(element.articulos.precio);
    })*/
}




/*










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

window.onload=cargarPostits();