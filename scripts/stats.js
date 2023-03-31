import { requestData, searchFuture, searchPast, drawTable1, calculateMaxPercentageAttendance, calculateMinPercentageAttendance, calculateMaxCapacity, searchData, drawTables } from "./functions.js";

const tbody1 = document.getElementById('allEvents');
const tbody2 = document.getElementById('futureEvents');
const tbody3 = document.getElementById('pastEvents');

const {currentDate, events} = await requestData();
//ejecuta las funciones para pintar las tablas de estadisticas
function loadStats(){
    
    drawTable1(calculateMaxPercentageAttendance(events), calculateMinPercentageAttendance(events), calculateMaxCapacity(events), tbody1)
    
    const future = searchData(searchFuture(events, currentDate));
    const past = searchData(searchPast(events, currentDate));
    
    drawTables(future["categories"], future["revenues"], future["percentages"], tbody2);
    drawTables(past["categories"], past["revenues"], past["percentages"], tbody3);
}

loadStats()
