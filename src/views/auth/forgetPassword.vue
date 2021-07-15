<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <v-col cols="5" class="mx-auto mt-15 form-custem">
        <h1 class="text-center">Forget Password</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: "forgetPassword",
    data: () => ({
      valid: true,
      form:{
        email: '',
      },
      nameRules: [
        v => !!v || '',
        v => (v && v.length <= 5) || 'Name must be less than 10 characters',
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
      ...mapActions({
        ForgetPass:'auth/ForgetPass'
      }),
      submit () {
        var data = new FormData();
        data.append("email", this.form.email);
        this.ForgetPass(data)
        alert("chek Your Email")
        this.$router.push("/login")
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
