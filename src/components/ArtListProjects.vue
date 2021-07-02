<template>
   <div>
       <!-- snackbar pop-up -->
      <v-snackbar v-model="snackbar" :timeout="3000" top>
         {{ text }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <v-card text class="ma-3 card">
         <v-img class="grey-lighten-2 imgContainer">
            <img
            class="images"
            :src="project.coverUrl"
            :alt="project.cover"
            contain
            />
            <img />
         </v-img>

         <v-card-subtitle>
            <h4>{{ project.title }}</h4>
         </v-card-subtitle>

         <v-card-actions>
            <ArtShowModal :showProject="project"/>
            <v-spacer></v-spacer>

            <ArtEditModal :editProject="project" @projectUpdated="updateProject"/>
            <v-btn depressed icon @click="handleArchive">
               <v-icon small>delete</v-icon>
            </v-btn>
         </v-card-actions>
      </v-card>
   </div>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import ArtShowModal from '../components/ArtShowModal'
import ArtEditModal from '../components/ArtEditModal'

export default {
   props: ['project'],
   components: {
      ArtShowModal,
      ArtEditModal
   },
   data(){
      return{
         search: '',
         snackbar: false,
         text: 'Project Updated'
      }
   },
   methods: {
      handleArchive(){
         confirm('Are you sure you want to move this project to your archive? ') &&
         projectFirestore.collection('artProjects').doc(this.project.id)
         .update({
            status: 1
         })        
         .then(() => {
            this.$emit('archivedArtProject', this.project.id)
         })
         .catch(err => {
            console.log(err.message)
         })
      },
      updateProject(){
         this.snackbar= true
      }

   },
   computed: {
     
   }
}
</script>

<style>
  
</style>