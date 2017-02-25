var app = new Vue({
  el: '#app',
  data: {
    nombre: 'Ingrese una tarea',
    newtask: '',
    active: "2",
    tareas:[
      {nombre: "Comprar Yogurt"},
      {nombre: "Comer fruta y Yogurt a las 4px"},
      {nombre: "Aprender Vue.js"}
    ]
  },
  methods:{
    saveTask: function(tarea){
      if(tarea.trim()){
        this.tareas.push({nombre: tarea})
        this.newtask = '';
      }else{
        alert("Ingresa una tarea");
      }
    },
    deleteTask: function(tarea){
      if(confirm('¿Eliminar '+ tarea.nombre +'?')){
        //Remove no funciona en Vue.js 2.0
        //this.tareas.$remove(tarea)
        this.tareas.splice(tarea,1)
        console.log("Tarea eliminada");
      }
    }
  }
})

//Si queremos mostrar el json en el HTML
Vue.filter('json', value => { return JSON.stringify(value, null, 2) } )
