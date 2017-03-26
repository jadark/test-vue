var $api_URL = 'http://tiendaonline.movistar.com.pe/campanas/attach/productos-fijo/json.php';

var app = new Vue({
  el: '#app',
  data: {
    search: '',
    productos: []
  },
  created: function(){
    this.consultarApi();
  },
  methods:{
    consultarApi: function(){
      this.$http.get($api_URL)
          .then(function(response) {
            this.productos = response.body;
            console.log(response);
          });
    }
  }
})
