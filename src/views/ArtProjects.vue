<template>
  <v-container>
      <!-- snackbar pop-up -->
      <v-snackbar v-model="snackbar1" :timeout="3000" top>
         {{ text1 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar1=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <!-- snackbar pop-up -->
      <v-snackbar v-model="snackbar2" :timeout="3000" top>
         {{ text2 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar2=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>

     <div class="ml-3">
        <h1 class="subheading grey--text">Graphic Arts</h1>
     </div>
     <div class="mt-5 ml-3">
       
     </div>
     <div class="mt-3">
        <v-text-field
         class="mx-3 mb-3"
         v-model="search"
         append-icon="mdi-magnify"
         label="Search"
         single-line
         hide-details
       ></v-text-field>
        <div class="cards">
            <ArtAddModal @artProjectAdded="snackbar1=true" />
            <div v-for="project in filteredDevProjects" :key="project.id">
               <ArtListProjects :project="project" @archivedArtProject="archiveProject"/> 
            </div>
        </div>
     </div>
  </v-container>
</template>

<script>
import ArtAddModal from '../components/ArtAddModal'
import ArtListProjects from '../components/ArtListProjects'
import {projectFirestore} from '../firebase/config'

export default {
   components: {
      ArtAddModal,
      ArtListProjects
   },
   data(){
      return{
         artProjects: [],
         snackbar1: false,
         snackbar2: false,
         text1: 'Project Added Successfully',
         text2: 'Project moved to archive',
         search: '',
      }
   },
   methods: {
      archiveProject(id){
         this.artProjects = this.artProjects.filter( project => {
            return project.id !== id
         })
         this.snackbar2=true
      }
   },
   created(){
      projectFirestore.collection('artProjects').orderBy('createdAt','desc').onSnapshot(snap => {
         let results = []
         snap.docs.forEach(doc => {
            if(doc.data().status !== 1){
               doc.data().createdAt && results.push({ ...doc.data(), id:doc.id })
            }
            this.artProjects = results
         })

      })
   },
   computed: {
      filteredDevProjects(){
         return this.artProjects.filter(project => {
            return project.title.toLowerCase().match(this.search.toLowerCase())
         })
      }
   }
}
</script>

<style>

</style>