var $api_URL = "http://sonychampions.dev2.phantasia.pe/api/Equipos/ListarChampions";

Vue.filter('showPrice', function(value) {
  if (!value) return ''
  var theString = value;
  //Convertirmos el valor a un entero y lo transformamos a String
  theString = parseInt(theString).toString();
  //Si es mayor a 4 caracteres, le agregamos una coma(",")
  if (theString.length >=4) {
    theString = theString.insert(1, ",");
  }
  return theString;
});

var tipoPlanes = "<option value=\"22\">Línea Nueva</option>";
    tipoPlanes+= "<option value=\"26\">Portabilidad</option>";
    tipoPlanes+= "<option value=\"28\">Renovación</option>";
    tipoPlanes+= "<option value=\"9\">Prepago</option>";

var planesLineaNueva = "<option selected=\"selected\" value=\"138\">Plan vuela 4G S/ 59</option>";
    planesLineaNueva+= "<option value=\"139\">Plan vuela 4G S/ 79</option>";
    planesLineaNueva+= "<option value=\"140\">Plan vuela 4G S/ 99</option>";
    planesLineaNueva+= "<option value=\"141\">Plan vuela 4G S/ 139</option>";
    planesLineaNueva+= "<option value=\"142\">Plan vuela 4G S/ 199</option>";

var planesPortabilidad = "<option selected=\"selected\" value=\"143\">Plan vuela 4G S/ 59</option>";
    planesPortabilidad+= "<option value=\"144\">Plan vuela 4G S/ 79</option>";
    planesPortabilidad+= "<option value=\"145\">Plan vuela 4G S/ 99</option>";
    planesPortabilidad+= "<option value=\"146\">Plan vuela 4G S/ 139</option>";
    planesPortabilidad+= "<option value=\"147\">Plan vuela 4G S/ 199</option>";

var planesRenovacion = "<option selected=\"selected\" value=\"148\">Plan vuela 4G S/ 59</option>";
    planesRenovacion+= "<option value=\"149\">Plan vuela 4G S/ 79</option>";
    planesRenovacion+= "<option value=\"150\">Plan vuela 4G S/ 99</option>";
    planesRenovacion+= "<option value=\"151\">Plan vuela 4G S/ 139</option>";
    planesRenovacion+= "<option value=\"152\">Plan vuela 4G S/ 199</option>";

var app = new Vue({
  el: '#app',
  data: {
    idTipoPlan: '',
    idPlan: '',
    equipos:[]
  },
  created: function(){
    this.consultarApi();
  },
  methods:{
    consultarApi: function(){
      this.$http.post($api_URL, this.equipos,{emulateJSON:true})
          .then(function(response) {
            this.equipos = response.body.Equipos
            console.log(response);
            // document.getElementById('loading').style.display = "none";
          });
    }
  },
  computed:{
    // filterSelect: function() {
    //   return alert(this.idTipoPlan);
    // },
  }
});

var selectTipoplan = document.getElementById('tipoplan');
var selectPrecioPlan = document.getElementById('precioplan');

selectTipoplan.innerHTML = tipoPlanes;

$(selectTipoplan).on('change', function(){
  var valueSelected = this.value;
  if (valueSelected == "22") {
    selectPrecioPlan.innerHTML = planesLineaNueva;
  }else if (valueSelected == "26") {
    selectPrecioPlan.innerHTML = planesPortabilidad;
  }else if (valueSelected == "28") {
    selectPrecioPlan.innerHTML = planesRenovacion;
  }else if (valueSelected == "9") {
    selectPrecioPlan.innerHTML = planesPrepago;
  }
  $(selectPrecioPlan).find("option:selected").trigger("change")
});

$(selectPrecioPlan).on('change', function(){
  var valuePrecioPlan = this.value;
  var valueTipoPlan = $(selectTipoplan).find("option:selected").val();
  app.idTipoPlan = valueTipoPlan;
  app.idPlan = valuePrecioPlan;
});

$(selectTipoplan).find("option:selected").trigger("change")
