<template>
  <transition name="modal" v-if="movie">
    <div class="modal-mask">
      <div class="modal-wrapper" @click.self="closeModal()">
        <div class="modal-container">
          <div slot="body" class="review-container">
            <div class="title-container">
              <img :src="movie.poster">
              <div class="title-section">
                <p class="title">{{movie.title}}</p>
                <p class="sub-title">{{movie.releaseDate}}</p>
              </div>
            </div>
            <div class="rating-container">
              <div class="stars-container">
                <Rating :movie="movie"></Rating>
              </div>
            </div>
            <div class="ques-row">
              <div class="ques-section">
                <div class="ques">Watch with</div>
                <div class="options">
                  <div class="option">
                    <input
                      v-model="watchWith"
                      name="watchWith"
                      id="friends"
                      type="radio"
                      value="friends"
                    >
                    <label for="friends">
                      <font-awesome-icon icon="user-friends" class="icon"></font-awesome-icon>
                      <p>friends</p>
                    </label>
                  </div>
                  <div class="option">
                    <input
                      v-model="watchWith"
                      name="watchWith"
                      id="family"
                      type="radio"
                      value="family"
                    >
                    <label for="family">
                      <font-awesome-icon icon="users" class="icon"></font-awesome-icon>
                      <p>family</p>
                    </label>
                  </div>
                </div>
              </div>
              <div class="ques-section">
                <div class="ques">Pace</div>
                <div class="options">
                  <div class="option">
                    <input v-model="pace" name="pace" id="slow" type="radio" value="slow">
                    <label for="slow">
                      <font-awesome-icon icon="bicycle" class="icon"></font-awesome-icon>
                      <p>slow</p>
                    </label>
                  </div>
                  <div class="option">
                    <input v-model="pace" name="pace" id="fast" type="radio" value="fast">
                    <label for="fast">
                      <font-awesome-icon icon="shipping-fast" class="icon"></font-awesome-icon>
                      <p>fast</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="ques-row">
              <div class="ques-section">
                <div class="ques">Story</div>
                <div class="options">
                  <div class="option">
                    <input v-model="story" name="story" id="simple" type="radio" value="simple">
                    <label for="simple">
                      <font-awesome-icon icon="forward" class="icon"></font-awesome-icon>
                      <p>simple</p>
                    </label>
                  </div>
                  <div class="option">
                    <input v-model="story" name="story" id="complex" type="radio" value="complex">
                    <label for="complex">
                      <font-awesome-icon icon="network-wired" class="icon"></font-awesome-icon>
                      <p>complex</p>
                    </label>
                  </div>
                </div>
              </div>
              <div class="ques-section">
                <div class="ques">Rewatch</div>
                <div class="options">
                  <div class="option">
                    <input v-model="rewatch" name="rewatch" id="yes" type="radio" value="yes">
                    <label for="yes">
                      <font-awesome-icon icon="thumbs-up" class="icon"></font-awesome-icon>
                      <p>yes</p>
                    </label>
                  </div>
                  <div class="option">
                    <input v-model="rewatch" name="rewatch" id="no" type="radio" value="no">
                    <label for="no">
                      <font-awesome-icon icon="thumbs-down" class="icon"></font-awesome-icon>
                      <p>no</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="buttons-section">
              <button v-if="isLoading" class="icon-container">
                <font-awesome-icon icon="circle-notch" spin />
              </button>
              <button v-else @click.prevent="submitReview">submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
