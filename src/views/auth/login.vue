<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="5" class="mx-auto mt-15 form-custem">
        <v-alert type="error" v-model="error">
          Email Or Password Incorrect !
        </v-alert>
        <h1 class="text-center">Login</h1>
        
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            label="Passwordt"
            hint="At least 8 characters"
            required
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="Submits"
          >
            Validate
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
          <v-btn class="my-7 mr-6" to="/register">register?</v-btn>
          <router-link class="my-7 mr-6" style="float: right;" to="/forgetPassword">forgetPassword?</router-link>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  name: "register",
    data: () => ({
       show1: false,
      valid: true,
      error:false,
      form:{
        email: '',
        password: '',
      },
      
      nameRules: [
        v => !!v || '',
        v => (v && v.length <= 5) || 'Name must be less than 10 characters',
      ],
      
      passwordRules: [
        v => !!v || '',
        v => (v && v.length >= 5) || 'Password must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
    
       Submits () {
        var data = new FormData();
        data.append("email", this.form.email);
        data.append("password", this.form.password);
         axios.post('http://localhost/Sprint3_brief/backend/views/login.php', data)
          .then(response => {
            console.log(response.data)
            sessionStorage.setItem("userAuth",JSON.stringify(response.data));
            if (response.data.Role) {
              this.$router.push("/")
            }else{
              this.error=true
            }
          })
      },
    },
};
</script>

<style>
.form-custem{
    background: #f7faff;
    padding: 31px;
    border-radius: 21px;
    box-shadow: 1px 10px 21px -7px;
}
</style>

      