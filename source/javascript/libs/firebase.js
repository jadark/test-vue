var config = {
    apiKey: "AIzaSyCpSOEXuBwSjiCQfMseWutCpPrsoSAfg9g",
    authDomain: "vuefirebase-a271d.firebaseapp.com",
    databaseURL: "https://vuefirebase-a271d.firebaseio.com",
    storageBucket: "vuefirebase-a271d.appspot.com",
    messagingSenderId: "578533060392"
  };
firebase.initializeApp(config);
var db = firebase.database();


var app = new Vue({
  el: '#app',
  mounted: function() {
    db.ref('tareas/').on('value', function(snapshot) {
      console.log(snapshot.val());
      app.tareas = [];
      var object = snapshot.val();
      for (var propiedad in object) {
        app.tareas.unshift({
          '.key': propiedad,
          'titulo': object[propiedad].titulo,
          'completado': object[propiedad].completado
        })
      }
    });
  },
  data: {
    newtask: null,
    editandoTarea: null,
    tareas:[]
  },
  methods:{
    addTask:function(tarea) {
      console.info(tarea);
      // this.tareas.unshift({
      //   titulo: tarea,
      //   completado: false
      // })
      // this.newtask = null
      db.ref('tareas/').push({
        titulo: tarea,
        completado: false
      });
      this.newtask = null;
    },
    editTask: function(tarea) {
      console.log(tarea['.key']);
      db.ref('tareas/' + tarea['.key']).update({
        titulo: tarea.titulo
      });
    },
    updateStateTask: function(state, tarea) {
      db.ref('tareas/' + tarea['.key']).update({
        completado: state ? true : false
      });
    },
    deleteTask: function(tarea) {
      console.log(tarea);
      // this.tareas.splice(index, 1);
      db.ref('tareas/' + tarea['.key']).remove();
    }
  }
})
