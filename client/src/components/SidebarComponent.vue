<template>
  <div>
    <ul class="navbar-nav sidebar sidebar-dark accordion nav" id="accordionSidebar">
      <div class="sidebar-brand d-flex align-items-center justify-content-center">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Ikeha</div>
      </div>

      <hr class="sidebar-divider my-0" />

      <li class="nav-item">
        <a class="nav-link"  @click="changeMenu('dashboard')">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a
        >
      </li>

      <hr class="sidebar-divider" />

      <hr class="sidebar-divider" />

      <div class="sidebar-heading">Addons</div>

      <li class="nav-item active">
        <a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-fw fa-folder"></i>
          <span>JOBS</span>
        </a>
        <div id="collapsePages" class="collapse show" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Jobs Information:</h6>
            <a class="collapse-item" @click="changeMenu('jobs')">Jobs Data</a>
            <a class="collapse-item" @click="changeMenu('form')">New Job</a>
          </div>
        </div>
      </li>

      <li class="nav-item">
        <a class="nav-link" @click="changeMenu('company')">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Company</span></a
        >
      </li>

      <li class="nav-item">
        <a class="nav-link" @click="changeMenu('logs')">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Logs</span></a
        >
      </li>

      <hr class="sidebar-divider d-none d-md-block" />
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",

  methods: {
    changeMenu(val) {
      this.$emit("changeMenu", val)
    },
  },
}
</script>

<style></style>
