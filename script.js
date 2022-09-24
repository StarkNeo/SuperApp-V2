//BOTONES QUE SE USAN FRECUENTEMENTE//

//botones de control de lista
const boton_Guardar = document.getElementById('guardar');
const boton_Mostrar = document.getElementById('mostrar');
const boton_Cerrar = document.getElementById('cerrar');
const boton_crear = document.getElementById('boton-crear');
const guardar_cambios = document.getElementById('guardar-cambios');
const borrar_lista = document.getElementById('borrar-local');

class Bolsa{
    constructor(nombre){
        this._nombre = nombre; 
        this._articulos = [];
    }
    get nombre(){
        return this._nombre;
    }

    bolsaTemplate(){
        
        let bolsaModelo = `
        <div class="bag">
        
        <div class="bag-header">
        <h3 class='nameDepto'>${this._nombre}</h3>    
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
    </div>        
                `
    this._articulos.push(bolsaModelo);    
    return bolsaModelo;
    }
    guardarArticulos(){
        
        this._articulos.push();

    }
    

}

//FUNCION PARA AGREGAR UN DEPARTAMENTO
/*
document.addEventListener('click', e =>{

    let deptoName;
    let arrayItems;
    if(e.target.className='add-item'){
        deptoName = e.path[2].childNodes[1].childNodes[1].textContent;
        arrayItems= e.path[2].childNodes[3];

    } ;

    console.log(deptoName);
    console.log(arrayItems);

})

*/
function agregarDepto(e) {
    let seccion = document.querySelector('.board');
    let nvoDepto= new Bolsa(prompt("Introduzca un nombre"));

    /*
    seccion.innerHTML += `
    <div class="bag">
    
    <div class="bag-header">
    <h3 class='nameDepto'>${nvoDepto.nombre}</h3>    
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
</div>        
            `;
    */

    seccion.innerHTML+=`
    ${nvoDepto.bolsaTemplate()}
    `

    boton_Guardar.style.display = 'unset';



}


//EVENTO PARA AGREGAR O ELIMINAR UN DEPARTAMENTO

document.addEventListener('click', e => {
    let boton = e.target;
    if (boton.value === '(+) Agregar Depto') {
        agregarDepto(boton);
    }
    else if (boton.value === '-') {
        eliminar(boton);
    }


})

//AGREGAR UN ITEM DENTRO DEL DEPARTAMENTO
document.addEventListener('click',e=>{
    console.log(e);
    let element = e.target.className;
    
    if (element === 'add') {
        let elementParentClass= e.target.parentNode;
        let elementGrand = elementParentClass.parentNode;
        let nvoItem= document.createElement('div');
        nvoItem.className='item';
        nvoItem.innerHTML=`
        <input type="checkbox" name="box" class="checkbox">
            <input type="text" name="text" placeholder="Enter item description Example: 'Almond Milk '" required class="item-description">
            <input type="number" name="price" placeholder="10.5" class="price" min="0" required onchange="sumaPres()">
            <button class="add">+</button>
            <button class="del">-</button>
        `
        
        elementGrand.appendChild(nvoItem);
    
    }
    else if(element === 'close-window'){
        minimizar(e)
    }

    else if(element === 'bag-min' || element === 'bag-header-min' || element === 'nameDepto'){
        maximizar(e);
    }
})



//FUNCION MINIMIZAR QUE ACTUA SOBRE EL BOTON CERRAR

const minimizar=(e)=>{
            e.path[2].className='bag-min';
       //CAMBIA LA CLASE DEL ENCABEZADO, Y OCULTA LAS ETIQUETAS DESCRIPCION Y PRECIO
        e.path[2].childNodes[1].className='bag-header-min';
       e.path[2].childNodes[1].childNodes[3].style.display='none';
       e.path[2].childNodes[1].childNodes[5].style.display='none';
       e.path[2].childNodes[3].className='items-min';
       //OCULTA EL FOOTER
       e.path[2].childNodes[5].className='bag-footer-min';
       //OCULTA LOS ITEMS DEL DEPTO
       e.path[2].childNodes[3].className='item-min';
        
}


const maximizar=(e)=>{
      console.log(e);
      let elementClass = e.target.className;
      
      if (elementClass === 'bag-min') {
        e.path[0].className='bag'; 
        e.path[0].childNodes[1].className='bag-header';
        e.path[0].childNodes[1].childNodes[3].style.display='flex';
        e.path[0].childNodes[1].childNodes[5].style.display='flex';
        e.path[0].childNodes[3].className='items';
        e.path[0].childNodes[5].className='bag-footer';        
      }
      else if(elementClass === 'nameDepto'){
        e.path[2].className='bag';
        e.path[2].childNodes[1].className = 'bag-header';
        e.path[2].childNodes[1].childNodes[3].style.display='flex';
        e.path[2].childNodes[1].childNodes[5].style.display='flex';
        e.path[2].childNodes[3].className='items';
        e.path[2].childNodes[5].className='bag-footer';
      }

      else if(elementClass === 'bag-header-min'){
        e.path[1].className='bag';
        e.path[1].childNodes[1].className='bag-header';
        e.path[1].childNodes[1].childNodes[3].style.display='flex';
        e.path[1].childNodes[1].childNodes[5].style.display='flex';
        e.path[1].childNodes[3].className='items';
        e.path[1].childNodes[5].className='bag-footer';

      }
    
    }


/*
const minimizar=(e)=>{

    if (elementClass==='bag-min') {
        e.target.className='bag';
        e.target.childNodes[3].childNodes[1].className='item-min';
        e.target.childNodes[1].className='bag-header';
        e.target.childNodes[5].className='bag-footer';
        e.target.childNodes[3].className='items';

    }
    
    else if(elementClass==='close-window'){
        e.path[2].className='bag-min';
       e.path[2].childNodes[1].className='bag-header-min';
       e.path[2].childNodes[3].className='items-min';
       e.path[2].childNodes[5].className='bag-footer-min';
       e.path[2].childNodes[3].childNodes[1].className='item-min';
        console.log(elementClass);
    }

}


//ACTUA SOBR EL BOTON CERRAR, MINIMIZA EL DEPARTAMENTO
document.addEventListener('click', e => {
    console.log(e);
    //first, obtain the elements'className
    let elementClass=e.target.className;
    
    
    
    
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








//FUNCION PARA SUMAR
const sumaPres = () => {
    let inputPrecios = document.getElementsByClassName('price');
    let sumaArreglo = 0;
    let totalPresupuesto = document.getElementById('total-pres');

    for (let index = 0; index < inputPrecios.length; index++) {
        console.log(inputPrecios[index].value);
        //sumaArreglo += parseFloat(inputPrecios[index].value);
        sumaArreglo+=inputPrecios[index].value;
    }
    //totalPresupuesto.value = sumaArreglo.toFixed(2);
    totalPresupuesto.value = sumaArreglo;
    diferencia();
    //return sumaArreglo.toFixed(2);
    return sumaArreglo;
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





//ACTUA SOBR EL BOTON CERRAR
document.addEventListener('click', e => {
    console.log(e);
    //first, obtain the elements'className
    let elementClass=e.target.className;
    /*
    conditional statement, if classname is equal to 'bag-min' 
    shift to 'bag' classname to apply different styles(MAX-WINDOW),
    else if classname is equal to 'close-window' look for the element's parent class name and
    shift to 'bag-min' to apply different styles (MIN-WINDOW)

    
    
    if (elementClass==='bag-min') {
        e.target.className='bag';
        e.target.childNodes[3].childNodes[1].className='item-min';
        e.target.childNodes[1].className='bag-header';
        e.target.childNodes[5].className='bag-footer';
        e.target.childNodes[3].className='items';

    }
    
    else if(elementClass==='close-window'){
        e.path[2].className='bag-min';
       e.path[2].childNodes[1].className='bag-header-min';
       e.path[2].childNodes[3].className='items-min';
       e.path[2].childNodes[5].className='bag-footer-min';
       e.path[2].childNodes[3].childNodes[1].className='item-min';
        console.log(elementClass);
    }

    
})


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