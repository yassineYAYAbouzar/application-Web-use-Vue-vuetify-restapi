<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <v-tabs>
        <v-tab><v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon></v-tab>
        <v-tab><router-link class="white--text" to="/">Home</router-link></v-tab>
        <v-tab><router-link class="white--text ml-0" to="/About">About</router-link></v-tab>
        <v-tab ><router-link class="white--text ml-1" to="/contactUs">Contact-Us</router-link></v-tab>
      </v-tabs>
      <v-btn
        text
      >
        <span @click="logOut()" class="mr-2">Log Out</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
      <v-navigation-drawer
      v-model="drawer"
      app
    >
    
      <v-sheet
        color="primary"
        class="pa-4 text-center"
        style="color:white"
      >
      
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
           <v-img src="../assets/avatar.jpg"></v-img>
        </v-avatar>

        <div>{{UserProfile.LastName}} {{UserProfile.FirtName}}</div>

      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon >
              <router-link to="/"
            >Dashboard</router-link>
        </v-list-item>
        <v-list-item >
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>
              <router-link to="/Profile"
            >Profile</router-link>
        </v-list-item>

        <template v-if="UserProfile.Role == 'admin'">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-school</v-icon>
          </v-list-item-icon>
              <router-link to="/className"
            >classese</router-link>
        </v-list-item>
        </template>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-alert-octagon</v-icon>
          </v-list-item-icon>
              <router-link to="/Spam"
            >Spam</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
  
</template>

<script>
export default {
  name: "appBar",
  data: () => ({
      drawer: false,
      UserProfile:{
          FirtName: '',
          LastName: '',
          Role: '',
      },
  }),
    mounted(){
        this.UserProfile =JSON.parse(sessionStorage.getItem("userAuth"))
    },
    methods:{
    logOut(){
      sessionStorage.removeItem("Role");
      sessionStorage.clear();
      this.$router.push("/login")
    },
    
  }
};
</script>
<style scoped>
.v-application a {
    color: #444;
    text-decoration: none;
    margin-left: -16px;
}
</style>
