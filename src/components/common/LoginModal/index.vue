<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="closeModal()">
        <div class="modal-container">
          <div slot="body" class="login-container">
            <div class="login-block">
              <div @click="closeModal()" class="icon-container">
                <font-awesome-icon icon="times" class="icon"></font-awesome-icon>
              </div>
              <p>Login</p>
              <div id="firebaseui-auth-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
