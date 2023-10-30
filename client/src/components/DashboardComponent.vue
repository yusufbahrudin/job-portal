<template>
  <div>
    <div class="container-fluid p-6 m-6">
      <div class="row">
        <div class="card text-center mb-3" style="width: 18rem; margin: 0px 10px; box-shadow: 1px 1px 8px rgba(0,0,0,0.5)">
        <div class="card-body">
          <h1 class="card-title"><b>{{ jobs.length }}</b></h1>
          <p class="card-text">Jobs</p>
          <ButtonComponent @click="changeMenu('jobs')" class="btn text-light" style="background: #405742;" :btnValue="'Show Jobs Detail'"/>
        </div>
      </div>
      <div class="card text-center mb-3" style="width: 18rem; margin: 0px 10px; box-shadow: 1px 1px 8px rgba(0,0,0,0.5)">
        <div class="card-body">
          <h1 class="card-title"><b>{{ company.length }}</b></h1>
          <p class="card-text">Company</p>
          <ButtonComponent @click="changeMenu('company')" class="btn text-light" style="background: #405742;" :btnValue="'Show Company Detail'" />
        </div>
      </div>
      <div class="card text-center mb-3" style="width: 18rem; margin: 0px 10px; box-shadow: 1px 1px 8px rgba(0,0,0,0.5)">
        <div class="card-body">
          <h1 class="card-title"><b>{{ logs.length }}</b></h1>
          <p class="card-text">Logs</p>
          <ButtonComponent @click="changeMenu('logs')" class="btn text-light" style="background: #405742;" :btnValue="'Show Logs Detail'" />
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonComponent from "./ButtonComponent.vue"
  export default {
    name: "DashboardComponent",
    props: ["company", "jobs", "logs"],
    components: { ButtonComponent },
    methods: {
      changeMenu(menu) {
        this.$emit("changeMenu", menu)
      }
    }
  }
</script>

<style>

</style>