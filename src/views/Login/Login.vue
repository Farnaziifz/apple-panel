<template>
  <div class="login-page">
    <div class="card login-card">
      <div class="login-image">
        <img src="../../assets/images/backgrounds/login.png" alt="" />
      </div>
      <div class="login-form">
        <h4 class="login-title">ورود</h4>
        <p>به پنل مدیریت الماس کریمخان خوش آمدید</p>
        <form @submit.prevent="submitLogin" class="form-container">
          <fav-input v-model="userName" label="نام کاربری" />
          <fav-input v-model="password" label="رمز ورود" type="password" />
          <button type="submit" class="btn btn btn-primary">ورود</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",

  data() {
    return {
      userName: "",
      password: "",
      rememberMe: "",
      accessToken: "",
    };
  },

  methods: {
    async submitLogin() {
      const response = await this.$ApiServiceLayer.post("admin-login", {
        email: this.userName,
        password: this.password,
      });
      if (response.token) {
        this.accessToken = "Bearer " + response.token;
        this.$Store.commit("login/synsLoginTempToken", this.accessToken);
        this.$Store.commit("login/loginData", response);
        this.$router.push("/dashboard");
      } else if (response.status === 400) {
        this.$notify({
          group: "tc",
          type: "danger",
          text: response.data.error.message,
        });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  margin: 0 auto;

  .login-title {
    font-size: 1.5rem;
    text-align: center;
    margin: 3rem 0;
  }

  .login-card {
    width: 800px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: 0;
    border-radius: 6px;
    overflow: hidden;

    .login-image {
      width: 100%;
      height: 100%;
      background-color: #eff2f7;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-form {
      width: 100%;
      height: 100%;
      background-color: #10163a;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4,
      p {
        padding: 0 20px;
      }

      .form-container {
        padding: 20px;

        .form-control {
          margin-top: 10px !important;
        }
      }
    }
  }
  .register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 1.5rem;
    border-top: 1px solid rgba(#ffffff, 0.3);

    span,
    a {
      font-size: 0.8rem;
    }

    a {
      padding: 1rem 0.75rem;
      margin-right: 1rem;
    }
  }
}
</style>
