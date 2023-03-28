//crea una instancia de Vue
const { createApp } = Vue

const app = createApp({
    //define el estado de la aplicación
    data() {
        return {
            jsonUrl: './assets/amazing.json',
            backupEvents: [],
            events: [],
            text: '',
            categories: [],
            categoriesSelected: [],
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
                    this.backupEvents = this.events
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
}).mount('#app')