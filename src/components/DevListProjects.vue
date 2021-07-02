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
            <DevShowModal :showProject="project"/>
            <v-spacer></v-spacer>

            <DevEditModal :editProject="project" @projectUpdated="updateProject"/>
            <v-btn depressed icon @click="handleArchive">
               <v-icon small>delete</v-icon>
            </v-btn>
         </v-card-actions>
      </v-card>
   </div>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import DevShowModal from '../components/DevShowModal'
import DevEditModal from '../components/DevEditModal'

export default {
   props: ['project'],
   components: {
      DevShowModal,
      DevEditModal
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
         projectFirestore.collection('devProjects').doc(this.project.id)
         .update({
            status: 1
         })        
         .then(() => {
            this.$emit('archivedDevProject', this.project.id)
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
   .card{
      transition: 0.5s ease;
   }
   .cards{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
   }
  .images{
     /* height:130px; */
     width: 100%;
     height: 135px;
     object-fit: cover;
  }

  @media (max-width: 950px){
     .cards{
        grid-template-columns: repeat(3, 1fr);
     }
  }
  @media (max-width: 700px){
     .cards{
        grid-template-columns: repeat(2, 1fr);
     }
  }
 @media (max-width: 500px){
     .cards{
        grid-template-columns: 1fr;
     }
     .images{
        height:auto;
     }
  }
</style>