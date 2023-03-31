const { createApp } =  Vue

const appP = createApp({
    //define el estado de la aplicación
    data() {
        return {
            jsonUrl: '../assets/amazing.json',
            events: [],
            backupEvents: [],
            text: '',
            categories: [],
            categoriesSelected: [],
            pastEvents: []
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
                    this.events = data.events
                    this.searchPast(this.events, data.currentDate)
                    this.backupEvents = this.pastEvents
                    this.categoryFilter(data.events)
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
        searchPast(myData, date){
            this.pastEvents = myData.filter( item => Date.parse(item.date) > Date.parse(date))
        }
    },
    computed:{
        superFilter(){
            // define una propiedad computada para filtrar por texto
            let firstFilter = this.events.filter( item => item.name.toLowerCase().includes(this.text.toLowerCase()))
            // define una propiedad computada para filtrar por checkbox
            if (!this.categoriesSelected.length) {
                this.backupEvents = firstFilter
            } else {
                this.backupEvents = firstFilter.filter( item => this.categoriesSelected.includes(item.category))
            }
        },
    }
    //inicializa la instancia de Vue
}).mount('#appP')

