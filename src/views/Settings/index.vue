<template>
  <section class="wrapper">
    <div class="hero">
      <!-- <div class="theme">
        <img :src="require(`@/assets/themes/${user.theme || '1.svg'}`)">
      </div> -->
      <div class="hero-body">
        <img :src="require(`@/assets/avatars/${user.avatar || '3.png'}`)" width="150">
        <p class="title">{{user.name}}</p>
        <p class="sub">User since <span>{{userSinceDays}}</span> days</p>
        
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="left">
          <font-awesome-icon icon="sliders-h" class="icon" /> Settings
        </div>
        <div class="right">Last login on <span>{{new Date(user.lastLogin).toLocaleString()}}</span></div>
      </div>
      <div class="container">
        
        <div class="block">
          <div class="title">Select Avatar</div>
          <div class="item-container">
            <template v-for="avatar in avatars">
              <div class="item avatar" :key="avatar.name" @click="selectedAvatar = avatar.name" :class="{'active': selectedAvatar === avatar.name}">
                <img :src="require(`@/assets/avatars/${avatar.url}`)" >
              </div>
            </template>
          </div>
        </div>

        <div class="block">
          <div class="section">     
            <!-- TODO: Add background image                    -->
            <button class="delete" v-if="!showConfirm" @click="showConfirm = true">Delete Account</button>
            <div class="confirm" v-else>
              <p>Are you sure you want to delete this account?</p>
              <button class="btn" @click="confirmDelete()"><font-awesome-icon v-show="isLoading" icon="circle-notch" class="icon" spin /> yes</button> 
              <button class="btn" @click="isLoading ? null : showConfirm = false">no</button>   
              <p v-show="!!errMsg" class="error">{{errMsg}} <a href="#" @click="login()">login</a></p>           
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons-contianer" v-if="isDirty">
      <font-awesome-icon icon="times" class="icon" @click="selectedTheme = null; selectedAvatar=null;" />
      <div>
        <p>Your settings have changed</p>
        <button @click="save">save</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
