//realiza la peticion asincrona para poder trabajar con los datos del json
export async function requestData(){
    let data = await fetch("../assets/amazing.json")
                    .then(response => response.json())
                    .then(data => {
                        return data;
                    })
                    .catch((error) => console.log(error));
                    console.log(data)
    return data;

}


//dado un array pinta las cartas en un contenedor
export function createCards(array, container) {
    container.innerHTML = '';
    if (array.length == 0){
        container.innerHTML = `<p class="display-6 fw-bolder" style="padding: 2rem; height: 54vh">No matches found, try again!</p>`
        return;
    }
    let fragmento = document.createDocumentFragment();
    for (let item of array){
        let div = document.createElement('div');
        div.className='card m-3';
        div.style='width: 18rem; height: 25rem; gap: 0.5rem;';
        div.innerHTML=`        
            <img src="${item.image}" class="card-img-top p-1 card-img" alt="card-image">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
            </div>
            <div class="card-footer d-flex gap-3">
                <p class="card-text mt-2 pt-1">Price $${item.price}.-</p>
                <a href="../pages/details.html?id=${item._id}" class="btn btn-book pt-2">More Info</a>
            </div>
        `;
        fragmento.appendChild(div);
    }    
    container.appendChild(fragmento);
}


//dado un array filtra las categorias y pinta los checkboxes en un contenedor
export function createCheckbox(array, container){
    let categories = array.map(item => item.category);
    let categoriesCount = new Set(categories);
    let categoriesArray = Array.from(categoriesCount);
    let checkboxes = '';
    categoriesArray.forEach(item => {
        checkboxes += `
        <label class="text-light search">
        <input type="checkbox" name="${item.toLowerCase()}" value="${item.toLowerCase()}"
        id="${item.toLowerCase()}">${item}</label>`
    })
    container.innerHTML = checkboxes;
}


//filtra de un array el texto ingresado en un input
export function inputFilter(array, text){
    let arrayAux = array.filter(item => item.name.toLowerCase().
    includes(text.toLowerCase().trim()));
    return arrayAux;
}

//filtra los eventos de un array por categorias segun los checkboxes checked
export function categoryFilter(array){
    let checkboxesCaptured = document.querySelectorAll('input[type="checkbox"]');
    let checkboxesArray = Array.from(checkboxesCaptured);
    let checkboxesChecked = checkboxesArray.filter( item => item.checked);
    //console.log(checkboxesChecked);
    let checkboxesMaped = checkboxesChecked.map( item => item.value);
    //console.log(checkboxesMaped);

    if (checkboxesChecked.length > 0 ){
        let filteredCategories = array.filter( item => checkboxesMaped.includes(item.category.toLowerCase()));
        return filteredCategories;
    } 
    return array;
}


//filtra los datos de un array para obtener los eventos futuros
export function searchFuture(myData, date){
    let nextEventAux = [];
    nextEventAux = myData.filter( item => Date.parse(item.date) > Date.parse(date));
    return nextEventAux;
}

//filtra los datos de un array para obtener los eventos pasados
export function searchPast(myData, date){
    let pastEventAux = [];
    pastEventAux = myData.filter( item => Date.parse(item.date) < Date.parse(date));
    return pastEventAux;
}


//obtiene el nombre del evento con mayor porcentaje de asistencia y lo retorna
export function calculateMaxPercentageAttendance(array) {
    let attendance = 0;
    let itemMaxAttendance = '';

    for (let item of array) {
      let percentageAttendance = (item.assistance || item.estimate) / item.capacity * 100;
        if (percentageAttendance > attendance) {
        attendance = percentageAttendance;
        itemMaxAttendance = item.name;
        } 
    }
    console.log(itemMaxAttendance);
    return itemMaxAttendance;
}

//obtiene el nombre del evento con menor porcentaje de asistencia y lo retorna
export function calculateMinPercentageAttendance(array) {
    let attendance = Infinity;
    let itemMinAttendance = '';

    for (let item of array) {
      let percentageAttendance = (item.assistance || item.estimate) / item.capacity * 100;
        if (percentageAttendance < attendance) {
            //console.log(attendance);
        attendance = percentageAttendance;
        itemMinAttendance = item.name;
        } 
    }

    console.log(itemMinAttendance);
    return itemMinAttendance;
}

//obtiene el nombre del evento con mayor capacidad
export function calculateMaxCapacity(array) {
    let maxCapacity = 0;
    let itemMaxCapacity = '';

    for (let item of array) {
        if (item.capacity > maxCapacity) {
        maxCapacity = item.capacity;
        itemMaxCapacity = item.name;
        }
    }
console.log(itemMaxCapacity);
    return itemMaxCapacity;
}

//dibuja la tabla de Events Statistics
export function drawTable1(itemMaxAttendance, itemMinAttendance, itemMaxCapacity, container){
    const tr = document.createElement('tr');
        tr.className="myTable";
        tr.innerHTML = `
        <td>${itemMaxAttendance}</td>
        <td>${itemMinAttendance}</td>
        <td>${itemMaxCapacity}</td>
        `;
    container.appendChild(tr);
}


//obtiene las categorias, ganancias y porcentajes
export function searchData(array){
    const categories = [];
    const revenues = [];
    const percentages = [];
    
    array.forEach( item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
            revenues[item.category] = 0;
            percentages[item.category] = 0;
    }

    const attendance = item.assistance || item.estimate;
        revenues[item.category] += (item.price * attendance) ;
        percentages[item.category] += attendance;
    }) 

    categories.forEach(category => {
    const capacity = array.filter(item => item.category === category)
        .reduce((total, item) => total + item.capacity, 0);

        percentages[category] = (percentages[category] / capacity * 100).toFixed(2);
    })
    return {categories, revenues , percentages};
}

//dibuja la tabla de Events Statistics by category, tanto pasados como futuros eventos
export function drawTables(categories, revenues, percentages, container){
    for (let category of categories){
        const tr = document.createElement('tr');
        tr.className="myTable";
        tr.innerHTML= `
            <td class="style=width: 18rem;">${category}</td>
            <td>$ ${revenues[category].toFixed(2)}</td>
            <td>${percentages[category]} %</td>
        `;
        container.appendChild(tr);
    }
}