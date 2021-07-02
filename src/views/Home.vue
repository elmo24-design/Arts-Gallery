<template>
  <div class="home">
     <v-container>
         <h1 class="subheading grey--text ml-3">Dashboard</h1>
         <div>
            <v-row no-gutters wrap class="dashboard-cards">
               <!-- total web projects -->
               <v-col>
                  <router-link :to="{ name: 'DevProjects'}">
                     <v-card text class="text-center ma-3 d-card" color="indigo darken-2">
                        <v-responsive class="pt-4">
                           <div height="100px">
                              <v-icon style="font-size: 4rem; color:white;">mdi-folder</v-icon>
                           </div>
                        </v-responsive>
                        <v-card-text>
                           <h1>
                              <div class="subheading white--text">{{ devProjects.length }}</div>
                           </h1>
                        </v-card-text>
                        <v-card-text>
                           <div class="font-weight-bold white--text">Web Projects</div>
                        </v-card-text>
                     </v-card>
                  </router-link>
               </v-col>
               <!-- total graphic art projects -->
               <v-col>
                  <router-link :to="{ name: 'ArtProjects'}">
                     <v-card text class="text-center ma-3 d-card" color="deep-purple darken-2">
                        <v-responsive class="pt-4">
                        <div height="100px">
                              <v-icon style="font-size: 4rem; color:white;">insert_photo</v-icon>
                           </div>
                        </v-responsive>
                        <v-card-text>
                           <h1>
                              <div class="subheading white--text">{{ graphicArts.length }}</div>
                           </h1>
                        </v-card-text>
                        <v-card-text>
                           <div class="font-weight-bold white--text">Graphic Arts</div>
                        </v-card-text>
                     </v-card>
                  </router-link>
               </v-col>
               <!-- total tasks -->
               <v-col>
                  <router-link :to="{ name: 'Task'}">
                     <v-card text class="text-center ma-3 d-card" color="blue darken-2">
                        <v-responsive class="pt-4">
                        <div height="100px">
                              <v-icon style="font-size: 4rem; color:white;">pending_actions</v-icon>
                           </div>
                        </v-responsive>
                        <v-card-text>
                           <h1>
                              <div class="subheading white--text">{{ tasks.length }}</div>
                           </h1>
                        </v-card-text>
                        <v-card-text>
                           <div class="font-weight-bold white--text">Total Tasks</div>
                        </v-card-text>
                     </v-card>
                  </router-link>
               </v-col>
            </v-row>
         </div>
     </v-container>
  </div>
</template>

<script>
import {projectFirestore} from '../firebase/config'

export default {
  name: 'Home',
  data(){
     return{
        devProjects: [],
        graphicArts: [],
        tasks: []
     }
  },
  mounted(){
      projectFirestore.collection('devProjects').onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            const res = ({ ...change.doc.data() })
            if(res.status !== 1){
               this.devProjects.push({ ...change.doc.data(), id: change.doc.id })
            }
         })
      })
      projectFirestore.collection('artProjects').onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            const res = ({ ...change.doc.data() })
            if(res.status !== 1){
               this.graphicArts.push({ ...change.doc.data(), id: change.doc.id })
            }
         })
      })
      projectFirestore.collection('taskProjects').onSnapshot(res => {
         const changes = res.docChanges()
        
         changes.forEach(change => {
             const res = ({ ...change.doc.data() })
             if(res.status == 'Ongoing'){
                this.tasks.push({ ...change.doc.data(), id: change.doc.id })   
             }
         })
      })
  }
}
</script>

<style scoped>
   .dashboard-cards{
      display:grid;
      grid-template-columns: repeat(3,1fr);
   }
   .d-card{
      transition: 0.3s ease;
      cursor: pointer;
   }
   .d-card:hover{
      transform:scale(1.1);
      opacity: 0.9;
   }
   @media(max-width: 700px){
      .dashboard-cards{
         grid-template-columns: repeat(2,1fr);
      }
   }
   @media(max-width: 500px){
      .dashboard-cards{
         grid-template-columns: 1fr;
      }
   }
</style>
