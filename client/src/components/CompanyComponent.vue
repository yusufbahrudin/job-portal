<template>
  <div class="container-fluid p-6 m-6">
    <div class="col-12 p-0">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold" style="color: #405742">
            Company Information
          </h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th style="text-align: center">#</th>
                  <th>Name</th>
                  <th>Logo</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <TableCompanyRowComponent
                  v-for="(data, index) in company"
                  :key="data.id"
                  :data="data"
                  :index="index"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCompanyRowComponent from "./TableCompanyRowComponent.vue";

export default {
  name: "CompanyComponent",
  props: ["company"],
  components: {
    TableCompanyRowComponent,
  },
};
</script>

<style></style>
