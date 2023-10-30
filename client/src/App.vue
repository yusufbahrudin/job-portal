<template>
  <div>
    <LoginComponent
      v-if="page === 'login'"
      @signIn="signIn"
      @signUp="signUp"
      @googleLogin="googleLogin"
    />

    <div
      id="wrapper"
      style="background-image: linear-gradient(#405742, rgba(0, 0, 0, 0.836))"
      v-if="page === 'dashboard'"
    >
      <SidebarComponent @changeMenu="changeMenu" />

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <TopBarComponent />
          <DashboardComponent
            v-if="menu === 'dashboard'"
            @changeMenu="changeMenu"
            :company="company"
            :jobs="jobs"
            :logs="logs"
          />
          <FormComponent
            v-if="menu === 'form'"
            :jobById="jobById"
            :company="company"
            @handleFormData="handleFormData"
          />
          <JobComponent
            v-if="menu === 'jobs'"
            :jobs="jobs"
            @setStatus="setStatus"
            @getJobById="getJobById"
          />
          <LogComponent v-if="menu === 'logs'" :logs="logs" />
          <CompanyComponent v-if="menu === 'company'" :company="company" />
        </div>
      </div>
    </div>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn"
              style="background-color: #405742; color: white"
              @click="logout"
              data-dismiss="modal"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import LoginComponent from "./components/LoginComponent.vue";
import SidebarComponent from "./components/SidebarComponent.vue";
import TopBarComponent from "./components/TopBarComponent.vue";
import DashboardComponent from "./components/DashboardComponent.vue";
import JobComponent from "./components/JobComponent.vue";
import FormComponent from "./components/FormComponent.vue";
import LogComponent from "./components/LogComponent.vue";
import CompanyComponent from "./components/CompanyComponent.vue";

const url = "https://myproject2.monsterx.my.id";
export default {
  name: "App",
  components: {
    LoginComponent,
    SidebarComponent,
    TopBarComponent,
    DashboardComponent,
    JobComponent,
    FormComponent,
    LogComponent,
    CompanyComponent,
  },

  data() {
    return {
      page: "login",
      menu: "dashboard",
      jobs: [],
      jobById: {},
      company: [],
      logs: [],
    };
  },

  methods: {
    googleLogin() {
      Toastify({
        text: `Welcome ${localStorage.username} (${localStorage.role})`,
        duration: 2000,
      }).showToast();
      this.page = "dashboard";
      this.getJobs();
      this.getCompany();
      this.getLogs();
    },

    changeMenu(menu) {
      this.menu = menu;

      if (menu === "dashboard") {
        this.getJobs();
        this.getCompany();
        this.getLogs();
      } else if (menu === "jobs") {
        this.getJobs();
      } else if (menu === "company") {
        this.getCompany();
      } else if (menu === "logs") {
        this.getLogs();
      } else if (menu === "form") {
        this.jobById = {
          title: "",
          companyId: "",
          description: "",
          imgUrl: "",
          jobType: "",
          status: "",
        };
      }
    },

    async signIn(login) {
      try {
        const { data } = await axios.post(`${url}/login`, login);

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userid", data.id);

        this.getJobs();
        this.page = "dashboard";

        Toastify({
          text: `Welcome ${data.username} (${data.role})`,
          duration: 3000,
        }).showToast();
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          style: { background: "red" },
        }).showToast();
      }
    },

    async signUp(register) {
      try {
        const { data } = await axios.post(`${url}/register`, register);
        console.log("data: ", data);

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userid", data.id);

        Toastify({
          text: `Welcome ${data.username} (${data.role})`,
          duration: 3000,
        }).showToast();

        this.getJobs();
        this.page = "dashboard";
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          style: { background: "red" },
        }).showToast();
      }
    },

    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("userid");

      this.page = "login";
    },

    async getCompany() {
      try {
        const { data } = await axios(`${url}/companies`, {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        this.company = data;
      } catch (err) {
        console.log(err.response.data);
        this.page = "login";
        localStorage.removeItem("access_token");
        Toastify({
          text: err.response.data.message,
          duration: 3000,
        }).showToast();
      }
    },

    async getJobs() {
      ``;

      try {
        const { data } = await axios(`${url}/jobs`, {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        this.jobs = data;
      } catch (err) {
        console.log(err.response.data);
        this.page = "login";
        localStorage.removeItem("access_token");
        Toastify({
          text: err.response.data.message,
          duration: 3000,
        }).showToast();
      }
    },

    async getJobById(data) {
      const { id } = data;
      try {
        this.getCompany();

        const { data } = await axios(`http://localhost:3000/jobs/${id}`, {
          headers: { access_token: localStorage.getItem("access_token") },
        });

        this.jobById = data;
        this.menu = "form";
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
        }).showToast();
      }
    },

    async getLogs() {
      try {
        const { data } = await axios("http://localhost:3000/history", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        this.logs = data;
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
        }).showToast();
      }
    },

    async handleFormData(form, status) {
      console.log(form.status, "testtttttttttt");

      try {
        if (status === "edit") {
          const { data } = await axios({
            url: `http://localhost:3000/jobs/${form.id}`,
            method: "PUT",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: form,
          });

          Toastify({
            text: `Job ${form.title} updated`,
            duration: 3000,
          }).showToast();
        } else {
          const { data } = await axios({
            url: `http://localhost:3000/jobs`,
            method: "POST",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: form,
          });

          Toastify({
            text: `Job ${data.title} added`,
            duration: 3000,
          }).showToast();
        }

        this.menu = "jobs";
        this.getJobs();
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
        }).showToast();
      }
    },

    async setStatus(data) {
      const { id, status } = data;
      console.log(data, "jajaja");
      try {
        const { data } = await axios({
          url: `http://localhost:3000/jobs/${id}/${status}`,
          method: "PATCH",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.getJobs();
      } catch (err) {
        console.log(err.response.data);
        Toastify({
          text: err.response.data.message,
          duration: 3000,
          style: { background: "red" },
        }).showToast();
        this.getJobs();
      }
    },
  },

  created() {
    if (localStorage.getItem("access_token")) {
      this.page = "dashboard";
      this.getJobs();
      this.getCompany();
      this.getLogs();
    } else {
      this.page = "login";
    }
  },

  updated() {
    // console.log(this.company);
  },
};
</script>

<style></style>
