<template>
  <v-container>
      <!-- snackbar pop-up for add-->
      <v-snackbar v-model="snackbar1" :timeout="3000" top>
         {{ text1 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar1=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <!-- snackbar pop-up for update-->
      <v-snackbar v-model="snackbar2" :timeout="3000" top>
         {{ text2 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar2=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
       <!-- snackbar pop-up for delete-->
      <v-snackbar v-model="snackbar3" :timeout="3000" top>
         {{ text3 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar3=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
     <div class="ml-3">
         <h1 class="subheading grey--text">Task Manager</h1>
     </div>
     <div class="ml-3 mt-5">
        <TaskAddModal @taskAdded="addTask" />
     </div>
     <div class="ml-3 mt-5">
        <TaskFilter @filterChange="current = $event" :current="current" />
     </div>
     <v-expansion-panels class="ml-3" v-for="task in filteredTasks" :key="task.id" color="primary">
        <v-expansion-panel :class="`task ${task.status}`">
          <v-expansion-panel-header>
             {{ task.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <div class="d-flex">
                  <v-card-text class="px-4 py-0 grey--text">
                     <div class="font-weight-bold">{{ task.description }}</div>
                     <div class="mt-3">{{ task.status }}</div>
                  </v-card-text>
                  <v-card-actions>
                     <TaskEditModal :task="task" @taskUpdated="snackbar2 = true"/>
                     <v-btn depressed icon @click="handleDelete(task.id)">
                        <v-icon small>delete</v-icon>
                     </v-btn>
                  </v-card-actions>
              </div>
            </v-card>
          </v-expansion-panel-content>
          <v-divider></v-divider>
        </v-expansion-panel>
      </v-expansion-panels>
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import TaskAddModal from '../components/TaskAddModal'
import TaskFilter from '../components/TaskFilter'
import TaskEditModal from '../components/TaskEditModal'

export default {
   components: {
      TaskAddModal,
      TaskFilter,
      TaskEditModal
   },
   data(){
      return{
         taskProjects: [],
         snackbar1: false,
         snackbar2: false,
         snackbar3: false,
         text1: 'New Task Added',
         text2: 'Task has been updated',
         text3: 'Task has been deleted',
         current: 'all'
      }
   },
   methods: {
      addTask(){
         this.snackbar1 = true
      },
      handleDelete(id){
         confirm('Are you sure you want to delete this task?') &&
         projectFirestore.collection('taskProjects')
         .doc(id)
         .delete()
         .then(() => {
            this.taskProjects = this.taskProjects.filter(project => {
               return project.id !== id
            })
            this.snackbar3 = true
         })
         .catch(err => {
            console.log(err.message)
         })
      }
   },
   created(){
      projectFirestore.collection('taskProjects').orderBy('createdAt','desc')
      .onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            if (change.type == "added"){
               this.taskProjects.push({ ...change.doc.data(), id: change.doc.id})
            }
         })
      })
   },
   computed: {
      filteredTasks(){
         if(this.current=="Ongoing"){
            return this.taskProjects.filter(project => {
               return project.status == 'Ongoing'
            })
         }
         if(this.current=="Completed"){
            return this.taskProjects.filter(project => {
               return project.status == 'Completed'
            })
         }      
         return this.taskProjects
      }
   }
}
</script>

<style>
.task.Ongoing{
   border-left: 3px solid tomato;
}
.task.Completed{
   border-left: 3px solid#3cd1c2;
}
</style>