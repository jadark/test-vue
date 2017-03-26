var $api_URL = 'http://tiendaonline.movistar.com.pe/campanas/attach/productos-fijo/json.php';

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

var app = new Vue({
  el: '#app',
  data: {
    search: '',
    equipos: []
  },
  created: function(){
    this.consultarApi();
  },
  methods:{
    consultarApi: function(){
      this.$http.get($api_URL)
          .then(function(response) {
            this.equipos = response.body
            console.log(response);
          });
    }
  }
})
