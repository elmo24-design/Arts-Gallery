<template>
  <div>
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
            <v-spacer></v-spacer>
            <v-btn depressed icon @click="handleRestore">
               <v-icon small>restore</v-icon>
            </v-btn>
            <v-btn depressed icon @click="handleDelete">
               <v-icon small>delete</v-icon>
            </v-btn>
         </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import {projectFirestore, projectStorage} from '../firebase/config'

export default {
   props: ['project'],
   data(){
      return{

      }
   },
   methods:{
      handleDelete(){
         confirm('Are you sure you want to delete this project permanently? ') &&
         projectFirestore.collection('artProjects').doc(this.project.id).delete()
         .then(() => {
            projectStorage.ref(this.project.filePath).delete()
         })
         .then(() => {
            this.$emit('artProjectDeleted', this.project.id)
         })
         .catch(err=> {
            console.log(err.message)
         })
      },
      handleRestore(){
         confirm('Are you sure you want to restore this project? ') &&
         projectFirestore.collection('artProjects')
         .doc(this.project.id)
         .update({
            status: 0
         })
         .then(() =>{
            this.$emit('artProjectRestored', this.project.id)
         })
         .catch((err)=> {
            console.log(err.message)
         })
      }
   }
}
</script>

<style>

</style>