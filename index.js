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
        this.requestEvents()
    },
    mounted(){

    },
    methods: {
        // define una función para solicitar los eventos
        requestEvents() {
            fetch(this.jsonUrl)
                .then(response => response.json())
                .then(data => {
                    this.events = data.events
                    this.backupEvents = this.events
                })
                .catch((error) => console.log(error));
        }
    },
    computed:{
        // define una propiedad computada para filtrar

    }
    //inicializa la instancia de Vue
}).mount('#app')