
import { requestData } from "./functions.js";

const {events} = await requestData();

//toma los datos de URLSearchParams por ID y pinta en el contenedor los datos del evento seleccionado
function start(){
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    
    const data = events.find(item => item._id == id);

    
    let div = document.querySelector('.container')
        div.innerHTML = `
        <div class="row gap-2 d-flex flex-wrap justify-content-around">
            <div class="col-xs-12 col-md-5 align-self-center">
                <img src="${data.image}" class="img-data rounded" alt="${data.name}">
            </div>
            <div class="col-xs-12 col-md-6">
                <table class="table table-striped datatable table-hover rounded">
                    <thead class="text-center">
                        <tr class="fs-5 text-primary">
                            <th scope="col" colspan="2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>${data.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Date</th>
                            <td>${data.date}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>${data.description}</td>
                        </tr>
                        <tr>
                            <th scope="row">Category</th>
                            <td>${data.category}</td>
                        </tr>
                        <tr>
                            <th scope="row">Place</th>
                            <td>${data.place}</td>
                        </tr>
                        <tr>
                            <th scope="row">Capacity</th>
                            <td>${data.capacity}</td>
                        </tr>
                        <tr>
                            <th scope="row">Assistance or Estimate</th>
                            <td>${data.assistance == undefined ? data.estimate : data.assistance}</td>
                        </tr>
                        <tr>
                            <th scope="row">Price</th>
                            <td>$${data.price}.-</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <th scope="col" colspan="2" class="text-center">
                        <a href="javascript:history.back()" class="btn nav-link" >go back</a></th>
                    </tfoot>
                </table>
            </div>
        </div>
        `
}

start()