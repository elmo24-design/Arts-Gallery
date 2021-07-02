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
        <h3>Edit project</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Title"
            v-model="editProject.title"
            :rules="titleRules"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            label="Say something about this project"
            v-model="editProject.description"
            :rules="descRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          
          <div v-if="!isPending">
             <v-btn
               class="success mx-0 mt-3"
               @click="submit"
               >Update project</v-btn
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
  props: ['editProject'],
  data() {
    return {
      dialog: false,
      titleRules: [
         (v) => !!v || "Title is required",
         (v) => (v && v.length <= 20) || 'Title must be less than 20 characters',
      ],
      descRules: [(v) => !!v || "Description is required"],
      isPending: false,
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
         this.isPending = true
         projectFirestore.collection('artProjects').doc(this.editProject.id)
         .update({
            title: this.editProject.title,
            description: this.editProject.description
         })
         .then(() => {
            this.dialog = false
            this.isPending = false
            this.$emit('projectUpdated')
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