<template>
  <section class="chat">
    <header class="chat__title">
      <ul class="chat__indicators">
        <li class="chat__indicator chat__indicator--red"></li>
        <li class="chat__indicator chat__indicator--yellow"></li>
        <li class="chat__indicator chat__indicator--green"></li>
      </ul>
      <h2>Чат</h2>
    </header>

    <div class="chat__wrapper">
      <div class="chat__users users">
        <h3>В сети</h3>
        <ul class="users__list" v-if="users.length">
          <li class="users__item" v-for="user in users" :key="user">{{ user }}</li>
        </ul>
      </div>

      <div class="chat__messages messages">
        <ul class="messages__list" v-if="userMessages.length">
          <li class="messages__item" v-for="(item, index) in userMessages" :key="index">
            <span class="messages__name">{{ item.user }}:</span>
            <span class="messages__text">{{ item.message }}</span>
          </li>
        </ul>
        <div class="messages__controls controls">
          <input class="controls__input" type="text" v-model="message" @keyup.enter="send" />
          <button class="controls__button" @click="send">Отправить</button>
        </div>
      </div>

      <div class="chat__notifications notifications">
        <ul class="notifications__list">
          <li
            class="notifications__item"
            v-for="(message, index) in serviceMessages"
            :key="index"
          >{{ message.user }}: {{ message.text }}</li>
        </ul>
        <div class="notifications__controls controls">
          <button class="notifications__button" @click="leave">Выйти</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatRoom",
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapState(["userMessages", "serviceMessages", "users", "userName"])
  },
  methods: {
    send() {
      this.$socket.client.emit("send", this.message);
      this.message = "";
    },
    leave() {
      this.$socket.client.emit("leave", this.userName);
      this.$router.push("/");
    }
  },
  mounted() {
    this.$socket.client.emit("verify", this.userName);
  }
};
</script>

<style lang="scss" scoped>
.chat {
  background: $secondaryBackground;
  margin: 0 auto;
  align-self: center;
  border-radius: 10px;

  .chat__title {
    position: relative;
    text-align: center;
    padding: 7px;

    h2 {
      text-align: center;
      font-size: 18px;
    }

    .chat__indicators {
      position: absolute;
      left: 7px;
      top: 50%;
      transform: translateY(-50%);

      .chat__indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;

        &:not(:last-child) {
          margin-right: 5px;
        }

        &.chat__indicator--green {
          background: $green;
        }

        &.chat__indicator--red {
          background: $red;
        }

        &.chat__indicator--yellow {
          background: $yellow;
        }
      }
    }
  }
}

.chat__wrapper {
  display: flex;
  width: 700px;
  height: 500px;

  .users {
    width: 20%;
    background: $leftColumnBackground;
    padding: 10px;
    color: $userColor;
    .users__item {
      margin-top: 10px;
      font-size: 12px;
    }
  }

  .messages {
    position: relative;
    border: 1px solid $sendBackground;
    width: 60%;
    padding: 10px 0 0 10px;
    font-size: 14px;
    height: 100%;

    .messages__item {
      padding: 10px;

      &:nth-child(2n) {
        background: $messagesBackground;
      }
    }
  }
}

.controls {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: $messagesBackground;
  display: flex;

  .controls__input {
    width: 70%;
    margin-right: 5px;
  }

  .controls__button {
    width: 25%;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    background: $sendBackground;
  }
}

.notifications {
  border-top: 1px solid $sendBackground;
  border-bottom: 1px solid $sendBackground;
  font-size: 12px;
  padding: 10px;
  width: 25%;
  color: $green;
  height: 100%;
  position: relative;

  .notifications__controls {
    justify-content: center;

    .notifications__button {
      padding: 5px 20px;
      border-radius: 5px;
      color: #fff;
      background: $sendBackground;
    }
  }

  .notifications__item {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

.messages__list,
.notifications__list,
.users__list {
  height: calc(100% - 50px);
  overflow-y: auto;
}
</style>
