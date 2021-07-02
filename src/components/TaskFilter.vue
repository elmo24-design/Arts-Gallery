<template>
  <div>
      <!-- Sorting buttons -->
      <v-row class="mb-3" no-gutters>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" v-on="on" @click="updateFilter('all')"
            :class="{active: current === 'all'}"
            >
              <span class="caption font-weight-bold">All</span>
            </v-btn>
          </template>
          <span>All tasks</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" v-on="on" @click="updateFilter('Ongoing')"
            :class="{active: current === 'Ongoing'}"
            >
              <span class="caption font-weight-bold">Ongoing</span>
            </v-btn>
          </template>
          <span>Sort ongoing tasks</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" v-on="on" @click="updateFilter('Completed')"
            :class="{active: current === 'Completed'}"
            >
              <span class="caption font-weight-bold">Completed</span>
            </v-btn>
          </template>
          <span>Sort completed tasks</span>
        </v-tooltip>
      
      </v-row>
  </div>
</template>

<script>
export default {
   props: ['current'],
   data(){
      return{

      }
   },
   methods:{
      updateFilter(by){
         this.$emit('filterChange', by)
      }
   }
}
</script>

<style scoped>
   .active{
      background-color:rgba(87, 87, 87, 0.7);
   }
   .active span{
      color: white;
   }
</style>