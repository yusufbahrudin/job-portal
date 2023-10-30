<template>
  <div class="login">
    <div class="container">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-lg-5" style="background: #2d3d2e">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-light mb-4">Welcome Back!</h1>
                  <br />
                </div>
                <form class="user" v-on:submit.prevent="signIn">
                  <div class="form-group">
                    <input
                      v-model="login.email"
                      type="email"
                      class="form-control form-control-user"
                      placeholder="Enter Email Address..."
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="login.password"
                      type="password"
                      class="form-control form-control-user"
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <ButtonComponent
                    type="submit"
                    class="btn btn-light btn-user btn-block"
                    :btnValue="'Login'"
                  />
                  <hr />
                </form>
                <div style="display: flex; justify-content: center">
                  <GoogleLogin :callback="callback" />
                </div>
                <hr />
              </div>
            </div>

            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form class="user" @submit.prevent="signUp">
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id="exampleFirstName"
                        placeholder="Username"
                        v-model="register.username"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleLastName"
                        placeholder="email"
                        v-model="register.email"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        v-model="register.password"
                      />
                    </div>
                    <div class="col-sm-6">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Phone Number"
                        v-model="register.phoneNumber"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Description"
                      v-model="register.address"
                    />
                  </div>
                  <br />
                  <ButtonComponent
                    type="submit"
                    class="btn btn-user btn-block text-light"
                    style="background: #405742"
                    :btnValue="'Register'"
                  />
                  <hr />
                </form>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "LoginComponent",
  components: { ButtonComponent },

  data() {
    return {
      page: "",

      login: {
        email: "",
        password: "",
      },

      register: {
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
      },

      // login: {
      //   email: "yusufbahrudin@gmail.com",
      //   password: "hahahehe",
      // },

      // register: {
      // 	username: "hahaha",
      // 	email: "hahaha@wkwk.com",
      // 	phoneNumber: "12345678",
      // 	password: "hahahehe",
      // 	address: "ini alamat"
      // }
    };
  },

  methods: {
    async callback(res) {
      try {
        console.log(res, "<<<<<<<<<<<<<");
        const { data } = await axios({
          url: "https://api.cyborg1201.online/login/google",
          method: "POST",
          headers: { google_token: res.credential },
        });

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userid", data.id);

        this.$emit("googleLogin");
      } catch (err) {
        console.log(err);
        Toastify({
          text: "Login failed",
          duration: 2000,
          style: { background: "red" },
        }).showToast();
      }
    },

    signIn() {
      this.$emit("signIn", this.login, "this.page");
    },

    signUp() {
      this.$emit("signUp", this.register);
    },
  },

  created() {},
};
</script>

<style></style>
