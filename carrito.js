

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

//FUNCION PARA CARGAR ELEMENTOS ALMACENADOS EN EL LOCALSTORAGE

const cargarPostits = ()=>{
    console.log(bags);
    carrito.forEach(element=>crearPost(element))
}

//FUNCION PARA AGREGAR UN DEPARTAMENTO

function crearPost(elemento) {
    console.log(elemento);
    let seccion = document.querySelector('.board');
    
    let bag=document.createElement('div');
    bag.className='bag-min';

    //seccion header
    let bagHeader = document.createElement('div');
    bagHeader.className='bag-header-min';
    bagHeader.innerHTML=`
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
    bagItems.className='items-min';
    let arrayArticulos = elemento.articulos;
    arrayArticulos.forEach(element => {
        let nvoItem = document.createElement('div');
        nvoItem.className='item-min';
        nvoItem.innerHTML=`
        <input type="checkbox" name="box" class="checkbox">
            <input type="text" name="text" placeholder="Enter item description Example: 'Almond Milk '" required class="item-description" value="${element.nombre}">
            <input type="number" name="price" placeholder="10.5" class="price" min="0" required onchange="sumaPres()" value="${element.precio}">
            <button class="add">+</button>
            <button class="del">-</button>
        
        `
        bagItems.appendChild(nvoItem);        
    });

    
    //seccion footer
    let bagFooter = document.createElement('div');
    bagFooter.className='bag-footer-min';
    bagFooter.innerHTML=`
            <img class="close-window" src="./images/close.svg" alt="">
            <img class="delete-item" src="./images/icon-trash-normal.svg" alt="check">
            <img class="add-item" src="./images/check-solid.svg" alt="">
    `
    
    bag.appendChild(bagHeader);
    bag.appendChild(bagItems);
    bag.appendChild(bagFooter);

    seccion.appendChild(bag);
    
    
}



//AGREGAR ITEM EN LA BOLSA CORRESPONDIENTE
const cargarItems = (elemento) => {
    
    
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
            
            items[index].className='item-min';
        }
    //OCULTA EL FOOTER
    e.path[2].children[2].className = 'bag-footer-min';
    //OCULTA LOS ITEMS DEL DEPTO
    e.path[2].children[1].children[1].className = 'item-min';

}


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
            
            items[index].className='item';
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
            
            items[index].className='item';
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
            
            items[index].className='item';
        }
        e.path[1].children[2].className = 'bag-footer';

    }

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

