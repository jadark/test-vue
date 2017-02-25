var $api_URL = 'https://randomuser.me/api/?results=10';

var app = new Vue({
  el: '#app',
  data: {
    personas: []
  },
  created: function(){
    this.consultarApi();
  },
  methods:{
    consultarApi: function(){
      this.$http.get($api_URL)
          .then(function(response) {
            this.personas = response.body.results
            console.log(response);
          });
    }
  }
})

//Si queremos mostrar el json en el HTML
Vue.filter('json', value => { return JSON.stringify(value, null, 2) } )
