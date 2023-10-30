<template>
  <div class="container-fluid p-6 m-6">
    <div class="col-12 p-0">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold" style="color: #405742">Logs detail :</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th style="text-align: center">#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Update By</th>
                  <th>Edit Time</th>
                </tr>
              </thead>
              <tbody>

                <TableLogRowComponent v-for="(log, index) in logs" :log="log" :index="index" :key="log.id" />
 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableLogRowComponent from "./TableLogRowComponent.vue"

  export default {
    name: "LogComponent",
    props: ["logs"],
    components: {
      TableLogRowComponent
    },
  }
</script>

<style>

</style>