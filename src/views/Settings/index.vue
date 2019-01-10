<template>
  <section class="wrapper">
    <div class="hero">
      <div class="theme">
        <img src="../../assets/toprated.jpg">
      </div>
      <div class="hero-body">
        <img src="../../assets/avatar.png" width="150">
        <p class="title">{{user.name}}</p>
        <div class="sub">
          <font-awesome-icon icon="cog" class="icon"></font-awesome-icon> Settings
        </div>
      </div>
    </div>
    <div class="content">
      <div class="bread-crumbs">
        <router-link class="item" to="/dashboard"> Dashboard </router-link>
        <font-awesome-icon icon="caret-right" class="icon item"></font-awesome-icon>
        <router-link class="item sub" to="/settings"> Settings </router-link>
      </div>
      <div class="container">
        <div class="block">
          <p class="title">Select Avatar</p>
          <div class="item-container">
            <template v-for="avatar in avatars">
              <div class="item avatar" :key="avatar.name" @click="selectedAvatar = avatar.name" :class="{'active': selectedAvatar === avatar.name}">
                <img :src="require(`@/assets/${avatar.url}`)" >
              </div>
            </template>
          </div>
        </div>

        <div class="block">
          <p class="title">Select Theme</p>
          <div class="item-container">
            <template v-for="theme in themes">
              <div class="item theme" :key="theme.name" @click="selectedTheme = theme.name" :class="{'active': selectedTheme === theme.name}">
                <img :src="require(`@/assets/${theme.url}`)" >
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons-contianer" v-if="isDirty">
      <font-awesome-icon icon="times" class="icon" @click="selectedTheme = null; selectedAvatar=null;"></font-awesome-icon>
      <div>
        <p>Your settings have changed</p>
        <button>save</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
