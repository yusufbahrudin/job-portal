<template>
  <section class="container-fluid" id="new-product-section" style="padding: 10px 60px">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="display-2" style="color: #405742; font-weight: bold">{{ formStatus }} Jobs</h1>
        </div>
        <div class="row">
          <div class="col-6">
            <form id="product-form" @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="product-name">Title <span class="fw-bold" style="color: #405742">*</span></label>
                <input v-model="jobById.title" type="text" class="form-control" id="product-title" placeholder="Enter Jobs name"
                  autocomplete="off" required/>
              </div>
              <div class="mb-3">
                <label for="product-company">Company <span class="fw-bold" style="color: #405742">*</span></label>
                <select v-model="jobById.companyId" id="product-company" class="form-select" required>
                  <option v-for="x in company" :key="x.id" :value="x.id" >{{ x.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="product-desc">Description
                  <span class="fw-bold" style="color: #405742">*</span></label>
                <input v-model="jobById.description" type="text" class="form-control" id="product-desc" placeholder="Enter jobs description"
                  autocomplete="off" required />
              </div>
              <div class="mb-3">
                <label for="product-image">Image <span class="fw-bold" style="color: #405742">*</span></label>
                <input v-model="jobById.imgUrl" type="text" class="form-control" id="product-image" placeholder="Enter product image url"
                  autocomplete="off"
                  required />
              </div>
              <div class="mb-3">
                <label for="product-type">Job Type <span class="fw-bold" style="color: #405742">*</span></label>
                <select v-model="jobById.jobType" id="product-type" class="form-select" required>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="product-type">Status<span class="fw-bold" style="color: #405742">*</span></label>
                <select v-model="jobById.status" id="product-type" class="form-select" required>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div class="row mt-5 mb-3">
                
                <div class="col-12">
                  <button class="btn btn-lg text-light rounded-pill w-100 p-2" style="background: #405742;" type="submit" href="">
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div class="col-12">
                <button class="btn btn-lg btn-light rounded-pill w-100 p-2" href="">Cancel</button>
            </div>
          </div>
          <div class="col-6" style="display: flex; justify-content: center;">
            
            <div class="card" style="width: 25rem; height: auto; margin-bottom: 70px">
              <img class="card-img-top" :src="jobById.imgUrl" height="300" width="300" style="border: 1px solid #405742; border-radius 15px;" alt="Your Job image will show here.">
              <div class="card-body">
                <h5 class="card-title">{{ jobById.title }}</h5>
                <h5><b>{{ jobById.status }}</b></h5>
                <p class="card-text">{{ jobById.description }}</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
</template>

<script>
export default {
  name: "FormComponent",

  props: ["jobById", "company"],

  data() {
    return {
      formStatus: "new"
    }
  },

  methods: {
    submitForm() {
      if (this.jobById.id) {
        this.formStatus = "edit"
      }
      
      this.$emit("handleFormData", this.jobById, this.formStatus)
      this.jobById = {}
    }
  },

}
</script>

<style>

</style>