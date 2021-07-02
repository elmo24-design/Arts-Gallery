<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed icon v-on="on">
         <v-icon small>create</v-icon>
      </v-btn>
    </template>

    <!-- Form goes here | The content of the pop up -->
    <v-card>
      <v-card-title>
        <h3>Edit Task</h3>
      </v-card-title>

      <v-card-text>
         <v-form class="px-3" ref="form">
          <v-text-field
            label="Task name"
            v-model="task.name"
            :rules="nameRules"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            label="Task description"
            v-model="task.description"
            :rules="descRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-row align="center">
            <v-col cols="12">
               <v-select
               v-model="task.status"
               :rules="statusRules"
               :items="items"
               :menu-props="{ bottom: true, offsetY: true }"
               label="Status"
               prepend-icon="pending_actions"
               ></v-select>
            </v-col>
          </v-row>

          <div v-if="!isPending">
             <v-btn
               class="success mx-0 mt-3"
               @click="submit"
               >Update</v-btn
             >
              <v-btn
               text
               class="mx-0 mt-3 ml-2"
               @click="closeModal"
               >Cancel</v-btn
             >
          </div>
          <div v-if="isPending">
             <v-btn
               class="mx-0 mt-3"
               disabled
             >Saving...</v-btn
          >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import{projectFirestore} from '../firebase/config'

export default {
  props: ['task'],
  data() {
    return {
      nameRules: [
         (v) => !!v || "Task Name is required",
         (v) => (v && v.length <= 20) || 'Task name must be less than 20 characters',
      ],
      descRules: [(v) => !!v || "Description is required"],
      statusRules: [(v) => !!v || "Status is required"],
      items: ['Ongoing', 'Completed'],
      dialog: false,
      isPending: false
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
         this.isPending = true
         projectFirestore.collection('taskProjects').doc(this.task.id)
         .update({
            name: this.task.name,
            description: this.task.description,
            status: this.task.status
         })
         .then(() => {
            this.dialog = false
            this.isPending = false
            this.$emit('taskUpdated')
         })
         .catch(err => {
            console.log(err.message)
         })
      }
    },
    closeModal(){
       this.dialog = false
    },
  },
};
</script>

<style>
</style>