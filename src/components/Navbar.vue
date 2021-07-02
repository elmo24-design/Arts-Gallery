<template>
  <nav>
    <!-- Top navigation bar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="user"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase nav-title">
        <span class="font-weight-bold">Arts</span>
        <span class="font-weight-light">Gallery</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Darkmode -->
      <v-switch v-model="$vuetify.theme.dark" inset class="mt-5"></v-switch>

      <div v-if="user">
         <v-btn depressed @click="signOut">
            <span class="pr-sm-1">Sign Out</span>
            <v-icon>exit_to_app</v-icon>
         </v-btn>
      </div>

      <div v-else>
         <router-link :to="{ name: 'Login'}">
            <v-btn depressed>
               <span class="pr-sm-1">Sign In</span>
               <v-icon>exit_to_app</v-icon>
            </v-btn>
         </router-link>
      </div>

    </v-app-bar>

    <!-- Sliding navbar container-->
    <v-navigation-drawer v-model="drawer" app class="primary" v-if="user">
      <v-row no-gutters class="mt-5">
        <v-col align="center">
          <v-avatar size="100">
            <v-img src="@/assets/avatar-1.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" align="center">
          <p class="white--text subheading mt-5">Welcome back, Elmo</p>
        </v-col>
      </v-row>

      <v-list class="mt-5">
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>
  </nav>
</template>

<script>
import {projectAuth} from '../firebase/config'

export default {
  components: { },
  data() {
    return {
      drawer: true,
      user: projectAuth.currentUser,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "WebDev Projects", route: "/devProjects" },
        { icon: "insert_photo", text: "Graphic Arts", route: "/artProjects" },
        { icon: "archive", text: "My Archive", route: "/archive" },
        { icon: "pending_actions", text: "Task Manager", route: "/task" },
        { icon: "event_note", text: "My Calendar", route: "/calendar" },
      ],
    };
  },
  methods:{
     signOut(){
        const signOut = async() => {
           try{
              await projectAuth.signOut()
           }catch(err){
              console.log(err.message)
           }
        }
        signOut()
     },
     updateRoute(){
        if(!this.user){
           this.$router.push({ name: 'Login'})
        }
     }
  },
  mounted(){
     projectAuth.onAuthStateChanged(_user => {
        this.user = _user
     })
  },
  watch:{
     user: 'updateRoute'
  }
};
</script>

<style scoped>
   a{
      text-decoration: none;
   }
   @media(max-width: 500px){
      .nav-title{
         display: none;
      }
   }
</style>