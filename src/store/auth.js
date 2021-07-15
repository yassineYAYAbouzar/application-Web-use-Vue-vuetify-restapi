import axios from 'axios';

export default({
  namespaced:true,
  state: {
    response:null,
    userProfile:[],
  },

  actions: {
    async signIn (_, credentials){
      await axios.post('http://localhost/Sprint3_brief/backend/views/login.php', credentials)
      .then(response => {
        this.state.userProfile = response.data;
      })
    },   
    async singUp (_, credentials){
      let response = await axios.post('http://localhost/Sprint3_brief/backend/views/register.php', credentials)
      this.state.response = response.data
    },   
    async UpdateUserProfile (_, credentials){
      await axios.post('http://localhost/Sprint3_brief/backend/views/updateUesr.php', credentials)
    },   
    async resetPassword (_, credentials){
      let response = await axios.post('http://localhost/Sprint3_brief/backend/views/resetPassword.php', credentials)
      this.state.response = response.data
    },   
    async ForgetPass (_, credentials){
      let response = await axios.post('http://localhost/Sprint3_brief/backend/views/forgetPas.php', credentials)
      this.state.response = response.data;
    },   
  },
});
