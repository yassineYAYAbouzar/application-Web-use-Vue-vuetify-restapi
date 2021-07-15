<template>
  <v-main>
        <app-bar />
     <v-container
        class="py-8 px-6"
        fluid
      >
      <h1 class="text-center" style="font-size:3em">Contact-Me</h1>
            <v-divider></v-divider>
            <br>
        <v-row>
          <v-col
            cols="5"
            class="mx-auto"
          >
         <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-textarea
          name="input-7-1"
          label="Default style"
          hint="Text Me"
        ></v-textarea>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>
         </v-form>
          </v-col>
          <v-col
            cols="5"
            class="mx-auto"
          >
          <div>
          <h2 class="text-center mt-3">Contact Info</h2>
                      <hr>
              <h5 style="line-height: 4em;" >
                <v-icon
                  large
                  color="blue-grey darken-2"
                >
                  mdi-call-split
                </v-icon>
                adress : 158/13 Jacksotts Balm street,
              
              8 (800) 923 4567</h5>
              <h5 class="mt-3"> 
              <v-icon
                large
                color="orange darken-2"
              >
                mdi-email
              </v-icon>
              Gmail: bitchain@example.com</h5>
              <h5 class="mt-3">
                <v-icon
                large
                color="purple darken-2"
              >
                mdi-phone
              </v-icon>
                Phone : +212602610742</h5>
                <p class="mt-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit blanditiis ipsam
                  in id eos, eaque ab nulla aliquid culpa aspernatur laudantium veniam necessitatibus
                  hic at esse facere molestias neque? Inventore?</p>
                  <div class="text-center">
                    <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                large
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
                  </div>
          </div>
          </v-col>
        </v-row>
      </v-container>
      <Footer-app />
  </v-main>
</template>

<script>
import appBar from '../components/appBar.vue';
import FooterApp from '../components/FooterApp.vue';

export default {
    components: { appBar,FooterApp},

  name: "contactUs",
  data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      socials: [
        {
          icon: 'mdi-facebook',
          color: 'indigo',
        },
        {
          icon: 'mdi-linkedin',
          color: 'cyan darken-1',
        },
        {
          icon: 'mdi-instagram',
          color: 'red lighten-3',
        },
      ],
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
};
</script>