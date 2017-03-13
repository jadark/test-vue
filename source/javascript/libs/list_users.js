var $api_URL = 'https://randomuser.me/api/?results=20';

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

var app = new Vue({
  el: '#app',
  data: {
    search: '',
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
            document.getElementById('loading').style.display = "none";
          });
    }
  },
  computed: {
    filteredItems() {
      return this.personas.filter(user => {
        var nameComplete = user.name.first +" "+ user.name.last
        return nameComplete.indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
})

//Si queremos mostrar el json en el HTML
// Vue.filter('json', value => { return JSON.stringify(value, null, 2) } )
