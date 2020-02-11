import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import device from 'current-device'
import Uploader from './components/Uploader.vue'

/*
  удаление drag 'n drop зоны для мобильных устройств
*/

const myDevice = require("current-device").default;

if (myDevice.type != 'desktop'){
  document.getElementsByClassName('drop').style.display='none';
}


window.axios = require('axios');

//... configure axios...

Vue.prototype.$http = window.axios;

new Vue({
  el: '#app',
  render: h => h(Uploader)
})
