<template>
  <v-container>
      <!-- snackbar pop-up for restore-->
      <v-snackbar v-model="snackbar1" :timeout="3000" top>
         {{ text1 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar1=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>

      <!-- snackbar pop-up for delete-->
      <v-snackbar v-model="snackbar2" :timeout="3000" top>
         {{ text2 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar2=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>

      <div class="ml-3">
         <h1 class="subheading grey--text">My Archive</h1>
      </div>
      <div class="mt-5">
         <h3 class="grey--text ml-3">
            Web Projects
         </h3>
     
         <v-text-field
            class="mx-3 mb-3"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
         ></v-text-field>
  
         <div class="cards">
            <div v-for="project in filteredWeb" :key="project.id">
               <ArchivedWeb :project="project" 
                  @projectRestored="restoreWebProject"
                  @projectDeleted="deleteWebProject"
                />
            </div>
         </div>
      </div>

      <div class="mt-5">
         <h3 class="grey--text ml-3">
            Graphic Arts
         </h3>
         <v-text-field
            class="mx-3 mb-3"
            v-model="searchArt"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
         ></v-text-field> 
         <div class="cards">
            <div v-for="project in filteredArt" :key="project.id">
               <ArchivedArt :project="project"
                  @artProjectRestored="restoreArtProject"
                  @artProjectDeleted="deleteArtProject"
               />
            </div>
         </div>
      </div>
      
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import ArchivedWeb from '../components/ArchivedWeb'
import ArchivedArt from '../components/ArchivedArt'

export default {
   components: {
      ArchivedWeb,
      ArchivedArt
   },
   data(){
      return{
         archivedWeb: [],
         archivedArts: [],
         search: '',
         searchArt: '',
         snackbar1: '',
         text1: 'Project Restored',
         snackbar2: '',
         text2: 'Project Deleted',
      }
   },
   methods: {
      restoreWebProject(id){
         this.archivedWeb = this.archivedWeb.filter( project => {
            return project.id !== id
         })
         this.snackbar1 = true
      },
      deleteWebProject(id){
         this.archivedWeb = this.archivedWeb.filter( project => {
            return project.id !== id
         })
         this.snackbar2 = true
      },
      restoreArtProject(id){
         this.archivedArts = this.archivedArts.filter( project => {
            return project.id !== id
         })
         this.snackbar1 = true
      },
      deleteArtProject(id){
         this.archivedArts = this.archivedArts.filter( project => {
            return project.id !== id
         })
         this.snackbar2 = true
      }
   },
   created(){
      projectFirestore.collection('devProjects').orderBy('createdAt','desc')
      .onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            if (change.type == "added"){
               const res = ({ ...change.doc.data() })
               if(res.status == 1){
                  res.createdAt && this.archivedWeb.push({ ...change.doc.data(), id: change.doc.id})
               }
            }
         })
      })
      projectFirestore.collection('artProjects').orderBy('createdAt','desc')
      .onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            if (change.type == "added"){
               const res = ({ ...change.doc.data() })
               if(res.status == 1){
                  res.createdAt && this.archivedArts.push({ ...change.doc.data(), id: change.doc.id})
               }
            }
         })
      })
   },
   computed: {
      filteredWeb(){
         return this.archivedWeb.filter(project => {
            return project.title.toLowerCase().match(this.search.toLowerCase())
         })
      },
      filteredArt(){
         return this.archivedArts.filter(project => {
            return project.title.toLowerCase().match(this.searchArt.toLowerCase())
         })
      }
   }
}
</script>

<style>

</style>