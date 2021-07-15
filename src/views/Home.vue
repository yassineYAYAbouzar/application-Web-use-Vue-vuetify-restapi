<template>
  <v-app id="inspire">
    <app-bar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <h1 class="text-center" style="font-size: 3em">
           Étudiant Bord 
        </h1>
       
      <v-data-table 
        :headers="headers"
        :items="etudients"
        sort-by="calories"
        :search="search"
        class="elevation-1"
      >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <template  v-slot:activator="{ on, attrs }">
            <v-btn v-if="UserProfile.Role == 'admin'"
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add Etudient
            </v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Fulname"
                      label="Fulname"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.Email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ClassName"
                      label="ClassName"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template  v-slot:item.actions="{ item }" >
      <v-icon  v-if="UserProfile.Role == 'admin'"
        small
        class="mr-2"
        @click="editItem(item)" 
        color="blue"
      >
        mdi-pencil
      </v-icon>
      <v-icon  v-else
        small
        color="indigo"
        class="mr-2"
      >
        mdi-facebook
      </v-icon>
      <v-icon  v-if="UserProfile.Role == 'admin'"
        small
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon  v-else
        small
        class="mr-2"
        color="blue"
      >
        mdi-twitter
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
      </v-container>
    </v-main>
    <Footer-app />
  </v-app>
</template>

<script>
// import { mapState } from "vuex";
import axios from 'axios';
import Swal from 'sweetalert2';

import appBar from "../components/appBar.vue";
import FooterApp from "../components/FooterApp.vue";

export default {
  components: { appBar, FooterApp },
  name: "home",
  data: () => ({
      dialog: false,
      search: '',
      headers: [
      { text: "Fulname", value: "Fulname" },
      { text: "Email", value: "Email" },
      { text: "ClassName", value: "ClassName" },
      { text: "Actions", value: "actions"},
      ],
      etudients: [],
       UserProfile:{
          Role: '',
      },
      editedIndex: -1,
      editedItem: {
        Fulname: '',
        Email: "",
        ClassName: '',
      },
      defaultItem: {
        Fulname: '',
        Email: '',
        ClassName:'',
      },
    }),
    mounted(){
        this.UserProfile =JSON.parse(sessionStorage.getItem("userAuth"))
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Etudient' : 'Edit Etudient'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios
      .get('http://localhost/Sprint3_brief/backend/views/getallEtudien.php')
      .then(data =>{
        this.etudients  = data.data
        })
      },

      editItem (item) {
        this.editedIndex = this.etudients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, Cancel it!'
          }).then((result) => {
            this.$store.commit("deletedEtudient", item.ID);
            if (result.isConfirmed) {
                this.initialize();
              Swal.fire(
                'Deleted!',
                'Etudient has been deleted.',
                'success'
              )
            }
          })
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        var data = new FormData();
        if (this.editedIndex > -1) {
          Object.assign(this.etudients[this.editedIndex], this.editedItem)
          Swal.fire({
            type: 'succsess',
            title: 'Modifié !',
            text: 'Etudient Modifié Avec Succés!',
          })
        } else {
           data.append("Fulname",this.editedItem.Fulname);
           data.append("Email",this.editedItem.Email);
           data.append("ClassName",this.editedItem.ClassName);
        axios
        .post('http://localhost/Sprint3_brief/backend/views/addEtudient.php',data)
        .then(()=>
          {
            Swal.fire({
            type: 'succsess',
            title: 'Ajoute !',
            text: 'Etudient Ajoute Avec Succés!',
          })
          this.initialize()
          }
        )
        }
        this.close()
      },
    },
  
};
</script>