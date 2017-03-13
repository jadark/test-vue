var app = new Vue({
  el: '#app',
  data:{
    name: 'Javier',
    team: false,
    vue: {
      "exp":null,
      "years": 0,
      "description": ''
    },
    tareas:[
      {
        title: 'Tarea 001',
        pendiente: false
      },
      {
        title: 'Tarea 002',
        pendiente: true
      },
      {
        title: 'Tarea 003',
        pendiente: true
      }
    ],
    user:{
      firstnName: 'Javier',
      lastName: 'Castro',
      username: '@jadark',
      website: 'jcastro.net',
      description: 'Estepario'
    },
    selected: 'C',
    options: [
      { text: 'Seleccione alguno', value: '' },
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  },
  computed:{
    filterSelect: function() {
      return alert(this.selected);
    },
    tareasPendiente: function() {
      return this.tareas.filter(function(item) {
        return item.pendiente
      })
    },
    reverseName: function() {
      return this.name.split('').reverse().join('');
    },
    descriptorError: function() {
      var val = this.vue.description.trim();
      if (val == '') {
        return 'El campo es obligatorio'
      }
      if (val.length < 5) {
        return 'Ingresa más de 5 caracteres'
      }
      if (val.length > 20) {
        return 'Ingresa menos de 20 caracteres'
      }
    },
    descriptorClasses: function() {
      return[
        'materialize-textarea',
        {'invalid': this.descriptorError}
      ];
    },
    descriptorStyles: function() {
      if (this.descriptorError) {
        return{color:'#a94442'};
      }
      return{};
    }
  }
})
