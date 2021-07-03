<template>
   <v-container class="d-flex justify-center">
      <v-card class="login">
         <v-img src="../assets/mylogo.png" class="logo"></v-img>
         <v-card-title class="justify-center capitalize" >
            <span class="text-uppercase signInHeading">Sign in to Arts Gallery</span>
         </v-card-title>
         <v-card-text>
            <v-form ref="form">
               <v-text-field
                  v-model="email"
                  type="email"
                  label="E-mail"
                  :rules="emailRule"
                  v-on:keyup.enter="submit"
                  required
               ></v-text-field>
               <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="passwordRule"
                  v-on:keyup.enter="submit"
                  required
               ></v-text-field>
                 <div class="red--text mb-3" v-if="error">
                  {{ error }}
                  </div>
                  <v-btn v-if="!isPending"
                  class="mr-4 signinbtn"
                  style="height: 3rem"
                  color="primary"
                  @click="submit"
                  >
                  <v-icon class="mr-2">login</v-icon>
                  Sign in
                  </v-btn>
                  <v-btn v-if="isPending"
                  class="mr-4 signinbtn"
                   style="height: 3rem"
                  color="primary"
                  disabled
                  >
                  Loading...Please Wait...
                  </v-btn>
            </v-form>
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script>
import {projectAuth} from '../firebase/config'

export default {
   data(){
      return{
         user: projectAuth.currentUser,
         email: '',
         password: '',
         error: null,
         isPending: false,
         emailRule: [(v) => !!v || "E-mail is required", 
         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
         ],
         passwordRule: [(v) => !!v || "Password is required"],
      }
   },
   methods: {
      submit(){
         if(this.$refs.form.validate()){
            const login = async () => {
               this.isPending = true
               this.error = null
               try{
                  const res = await projectAuth.signInWithEmailAndPassword(this.email, this.password)

                  this.error = null
                  this.isPending = false
                  console.log('User logged in')
                  
                  return res
               }catch(err){
                  console.log(err)
                  this.error = 'Invalid User Credentials'
                  this.isPending = false
               }
            }
            
            login()
         }
      },
      updateRoute(){
         if(this.user){
            this.$router.push({ name: 'Home' })
         }
      }
   },
   mounted(){
      projectAuth.onAuthStateChanged(_user => {
         this.user = _user
      })
   },
   watch: {
      user : 'updateRoute'
   }
}
</script>

<style scoped>
   .login{
      width: 24rem;
      margin-top:6rem;
   }
   .signinbtn{
      width: 100%;
   }
   a{
      text-decoration: none;
   }
   .signInHeading.theme--dark{
      color: white;
   }
   .logo{
      width: 8rem;
      margin-left: 8rem;
      margin-top: -4rem;
   }
   @media(max-width: 400px){
      .logo{
         margin-left: 5.8rem;
      }
   }
</style>