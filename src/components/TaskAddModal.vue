<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" dark class="mb-3" depressed>
         Add new
      </v-btn>
    </template>

    <!-- Form goes here | The content of the pop up -->
    <v-card>
      <v-card-title>
        <h3>Add new Task</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Task name"
            v-model="name"
            :rules="nameRules"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            label="Task description"
            v-model="description"
            :rules="descRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-row align="center">
            <v-col cols="12">
               <v-select
               v-model="status"
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
               >Add project</v-btn
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
import{projectFirestore, timestamp} from '../firebase/config'

export default {
  data() {
    return {
      name: "",
      description: "",
      status: "",
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
         projectFirestore.collection('taskProjects').add({
            name: this.name,
            description: this.description,
            status: this.status,
            createdAt: timestamp()
         })
         .then(()=>{
            this.$emit('taskAdded')
            this.isPending=false
            this.dialog = false
         })
         .catch((err) => {
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