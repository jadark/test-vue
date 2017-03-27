var config = {
    apiKey: "AIzaSyCpSOEXuBwSjiCQfMseWutCpPrsoSAfg9g",
    authDomain: "vuefirebase-a271d.firebaseapp.com",
    databaseURL: "https://vuefirebase-a271d.firebaseio.com",
    storageBucket: "vuefirebase-a271d.appspot.com",
    messagingSenderId: "578533060392"
  };
firebase.initializeApp(config);
var db = firebase.database();
    auth = firebase.auth();
    proveedor = new firebase.auth.GoogleAuthProvider();

var app = new Vue({
  el: '#app',
  beforeCreate: function() {
    // RT DataBase
    db.ref('tareas/').on('value', function(snapshot) {
      app.tareas = [];
      var object = snapshot.val();
      for (var propiedad in object) {
        app.tareas.unshift({
          '.key': propiedad,
          'titulo': object[propiedad].titulo,
          'completado': object[propiedad].completado,
          'nombre': object[propiedad].nombre,
          'avatar': object[propiedad].avatar,
          'userid': object[propiedad].userid
        })
      }
    });
    // Autentificacion
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.info('Contectado:', user);
        app.autentificado = true;
        app.usuarioActivo = user;
        // app.usuarioActivo = {
        //   'userName': user.displayName,
        //   'email': user.email,
        // }
        // app.usuarioActivo = user.displayName;
      } else {
        console.warn('No conectado');
        app.autentificado = false;
        app.usuarioActivo = null;
      }
    });
  },
  data: {
    newtask: null,
    lala:{
      comopes: 'nadna Apellido'
    },
    editandoTarea: null,
    autentificado: false,
    usuarioActivo: {},
    tareas:[]
  },
  methods:{
    contectar: function() {
      firebase.auth().signInWithPopup(proveedor).catch(function(error) {
        console.error('Error haciendo Login', error);
      });

    },
    desconectar: function() {
      firebase.auth().signOut().catch(function(error) {
        console.error('Error haciendo logOut', error);
      });
    },
    addTask:function(tarea) {
      // this.tareas.unshift({
      //   titulo: tarea,
      //   completado: false
      // })
      // this.newtask = null
      db.ref('tareas/').push({
        titulo: tarea,
        completado: false,
        nombre: app.usuarioActivo.displayName,
        avatar: app.usuarioActivo.photoURL,
        userid: app.usuarioActivo.uid
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
