<template>
  <div class="container-fluid p-6 m-6">
    <div class="col-12 p-0">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold" style="color: #405742">JOB Information</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th style="text-align: center">#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>

                <TableJobRowComponent v-for="(job, index) in jobs" :key="job.id" :job="job" :index="index" @setStatus="setStatus" @getJobById="getJobById"/>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableJobRowComponent from "./TableJobRowComponent.vue"

export default {
	name: "JobComponent",

	props: ["jobs"],

	components: {
		TableJobRowComponent
	},

	
	methods: {
		setStatus(status) {
			this.$emit("setStatus", status)
		},

    getJobById(id) {
      this.$emit("getJobById", { id: id, formStatus: "edit"})
    }
	}
}
</script>

<style></style>
