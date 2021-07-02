<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
       <v-card text class="ma-3 card d-flex flex-column justify-center align-center addCard" v-on="on">
          <v-btn icon color="primary" dark class="mb-3">
             <v-icon id="icon">add</v-icon> 
          </v-btn>
          <small class="grey--text font-weight-bold">
             Add new Project
          </small>
       </v-card>
    </template>

    <!-- Form goes here | The content of the pop up -->
    <v-card>
      <v-card-title>
        <h3>Add a new project</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            :rules="titleRules"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            label="Say something about this project"
            v-model="description"
            :rules="descRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>

           <!-- upload list image -->
           <v-file-input
            :rules="imgRules"
            v-model="file"
            accept="image/png, image/jpeg"
            label="Insert Thumbnail"
           ></v-file-input>
          
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
import{projectFirestore, projectStorage, timestamp} from '../firebase/config'

export default {
  data() {
    return {
      title: "",
      description: "",
      titleRules: [
         (v) => !!v || "Title is required",
         (v) => (v && v.length <= 20) || 'Title must be less than 20 characters',
      ],
      descRules: [(v) => !!v || "Description is required"],
      imgRules: [(v) => !!v || "Image is required"],
      loading: false,
      dialog: false,
      file: null,
      filePath:null,
      error: null,
      url: null,
      isPending: false,
      status: 0
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
         const uploadDocuments = async() => {
            this.isPending = true
            this.filePath = `covers/arts/${this.file.name}`
            const storageRef = projectStorage.ref(this.filePath)
            try{
               const res = await storageRef.put(this.file)
               this.url = await res.ref.getDownloadURL()
               
               projectFirestore.collection('artProjects').add({
                  title: this.title,
                  description: this.description,
                  coverUrl: this.url,
                  filePath: this.filePath,
                  status: this.status,
                  createdAt: timestamp()
               })
               .then(() => {
                   this.isPending = false
                   this.dialog =false
                   this.$emit('artProjectAdded')
               })
               .catch((err) => {
                  console.log(err.message)
               })   
            }catch(err){
               console.log(err.message)
               this.error= err.message
            }
         }
         uploadDocuments()
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