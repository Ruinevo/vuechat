<template>
  <div class='login'>
    <input class="login__input" @keyup.enter="signUp" placeholder="Введите Ваш ник" type="text" v-model="userName">
    <button class="login__button" @click="signUp">Войти</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: null
    }
  },
  methods: {
    signUp () {
      this.$store.commit('SET_USER', this.userName);
      this.$router.push('/chat');
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  align-self: center;
  border-radius: 10px;
  background: $messagesBackground;
  padding: 20px;

  .login__input {
    display: block;
    width: 100%;
    border: none;
    outline: none;
    padding: 10px;
  }

  .login__button {
    display: block;
    margin: 0 auto;
    padding: 10px 50px;
    margin-top: 50px;
    border-radius: 5px;
    color: #fff;
    background: $sendBackground;
  }
}
</style>
