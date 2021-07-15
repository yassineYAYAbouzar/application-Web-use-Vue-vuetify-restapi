<template>
  <v-app id="inspire">
        <app-bar />
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
            <h1 class="text-center" style="font-size:3em">Classes Name</h1>
        <v-row>
          <v-col
            cols="11"
             color="primary"
            class="mx-lg-auto"
          >
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
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
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.ClassName"
                      label="className"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-icon large color="cyan">mdi-school</v-icon>
                  </v-col>
                  </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
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
    <template v-slot:item.actions="{ item }">
      
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
         color="blue"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
         color="red"
      >
        mdi-delete
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>
        <Footer-app />
  </v-app>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import Swal from 'sweetalert2';

import appBar from '../components/appBar.vue';
import FooterApp from '../components/FooterApp.vue';

  export default {
    components: { appBar,FooterApp},
    name:"className",
   data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { text: 'id', value: 'id' },
        { text: 'ClassName', value: 'ClassName' },
        { text: 'Sum Etudient', value: 'Count' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
      etudients: [],   
      editedIndex: -1,
      editedItem: {
        id:'',
        ClassName:'',
        Count:'',
      },
    }),

    computed: {
      ...mapState([
        'AllClasses'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'add Classe' : 'Edit Classe'
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
      //getAllClasses
      initialize () {
        this.$store.dispatch('loadeClasses')
        this.etudients= this.$store.state.AllClasses
      },
      //DeletClasse
      deleteItem (item) {
        this.initialize();
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
            this.$store.commit('deletedClasses',item.id)
            if (result.isConfirmed) {
                this.initialize();
              Swal.fire(
                'Deleted!',
                'Classe has been deleted.',
                'success'
              )
            }
          })
      },
      close () {
        this.dialog = false
      },
      editItem (item) {
        this.editedIndex = this.etudients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        
      },
      save () {
        var data = new FormData();
        if (this.editedIndex > -1) {
          data.append("id", this.editedItem.id);
          data.append("ClassName", this.editedItem.ClassName);
          axios
          .post('http://localhost/Sprint3_brief/backend/views/updateClass.php',data)
          .then(()=>
          {
            Swal.fire({
            type: 'succsess',
            title: 'Modifié !',
            text: 'Classe Modifié Avec Succés!',
          })
          this.initialize()
          }
        )
      }else{
          data.append("ClassName",this.editedItem.ClassName);
        axios
        .post('http://localhost/Sprint3_brief/backend/views/addClass.php',data)
        .then(()=>
          {
            Swal.fire({
            type: 'succsess',
            title: 'Ajoute !',
            text: 'Classe Ajoute Avec Succés!',
          })
          this.initialize()
          }
        )
      }
        this.close()
        this.initialize()
      },
    },
}
</script>