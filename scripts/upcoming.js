const { createApp } =  Vue

const appF = createApp({
    //define el estado de la aplicación
    data() {
        return {
            jsonUrl: '../assets/amazing.json',
            events: [],
            backupEvents: [],
            text: '',
            categories: [],
            categoriesSelected: [],
            nextEvents: []
        }
    },
    created(){
        this.requestAllEvents()
    },
    mounted(){

    },
    methods: {
        // define una función para solicitar todos los eventos
        requestAllEvents() {
            try {
                fetch(this.jsonUrl)
                .then(response => response.json())
                .then(data => {
                    this.searchFuture(data.events, data.currentDate)
                    this.backupEvents = this.nextEvents
                    this.events = this.nextEvents
                    this.categoryFilter(this.events)
                    console.log(this.events);
                })
            } catch (error) {
                console.log(error)
            }
        },
        //define una propiedad para filtrar por categorias
        categoryFilter(array){
            array.forEach(item => {
                if(!this.categories.includes(item.category)){
                    this.categories.push(item.category)
                }
            });
        },
        //define una propiedad para obtener los eventos futuros
        searchFuture(myData, date){
            this.nextEvents = myData.filter( item => Date.parse(item.date) < Date.parse(date))
        }
    },
    computed:{
        superFilter(){
            // define una propiedad computada para filtrar por texto
            let firstFilter = this.events.filter( item => item.name.toLowerCase().includes(this.text.toLowerCase()))
            console.log(firstFilter);
            // define una propiedad computada para filtrar por checkbox
            if (!this.categoriesSelected.length) {
                this.backupEvents = firstFilter
            } else {
                this.backupEvents = firstFilter.filter( item => this.categoriesSelected.includes(item.category))
            }
        },
    }
    //inicializa la instancia de Vue
}).mount('#appF')

