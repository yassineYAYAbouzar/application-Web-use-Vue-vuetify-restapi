import Vue from "vue";
import Vuex from "vuex";
import auth from './auth';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    etudient:[],
    AllClasses:[]
  },
  actions: {
    //getEtudient
     loadeData({commit}){
      commit("fetchEtudient");
    },
     //getClasses
    loadeClasses({commit}){
      commit("fetchClasses");
    },
  },

  mutations: {
     //getClasses
    fetchClasses(state){
       axios
      .get('http://localhost/Sprint3_brief/backend/views/getallClasses.php')
      .then(data =>{
        state.AllClasses = data.data
      })
    },
    //delete Classes
    deletedClasses(state,AllClasses){
      axios
      .post('http://localhost/Sprint3_brief/backend/views/deleteClasse.php?id='+AllClasses)
          .then(state.AllClasses)
    },
    //delete Etudient
    deletedEtudient(state,etudient){
      axios
      .post('http://localhost/Sprint3_brief/backend/views/delete.php?ID='+etudient)
        .then(state.etudient)
    }
  },
  modules: {auth},
});
