<template>
  <div class="chart-container">
    <div class="chart-content">
      <Title :name=title :subtitle=subtitle></Title>
      <div class ="ct-chart ct-golden-section bar-chart" :id=id></div> 
    </div>    
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
