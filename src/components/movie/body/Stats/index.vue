<template>
  <div class="chart-container">
    <div class="chart-content">
      <Title :name="'Distribution'" :subtitle="' of ratings'"></Title>
      <div class ="ct-chart ct-golden-section" id="distributionChart"></div> 
    </div>    
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
