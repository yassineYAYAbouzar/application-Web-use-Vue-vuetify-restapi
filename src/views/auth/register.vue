<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="5" class="mx-auto mt-15 form-custem">
        <v-alert type="error" v-model="error">
          All Fieldset Is requiere !
        </v-alert>
        <h1 class="text-center">Register</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.fulname"
            :counter="5"
            :rules="nameRules"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.lastname"
            :counter="5"
            :rules="nameRules"
            label="Last Name"
            required
          ></v-text-field>
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
            @click.prevent="submit"
          >
            Validate
          </v-btn>
          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
          <router-link class="my-7 mr-6" style="float: right;" to="/login">login-Us?</router-link>
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
      valid: true,
      error:false,
      form:{
        fulname: '',
        lastname: '',
        password: '',
        email: '',
      },
      nameRules: [
        v => !!v || '',
        v => (v && v.length <= 8) || 'Name must be less than 10 characters',
      ],
      
      passwordRules: [
        v => !!v || '',
        v => (v && v.length <= 8) || 'Password must be less than 10 characters',
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

      submit () {
        var data = new FormData();
        data.append("fulname", this.form.fulname);
        data.append("lastname", this.form.lastname);
        data.append("email", this.form.email);
        data.append("password", this.form.password);
        axios.post('http://localhost/Sprint3_brief/backend/views/register.php', data)
        .then((response)=>{
          if (response.data =='success') {
          this.$router.push("/login");
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
