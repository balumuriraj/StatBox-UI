<template>
  <div class="attributes-container">
    <article class="attributes-item">
      <Title name="Watch" subtitle=" with"></Title>
      <div v-for="(attribute, index) in watchWithAttributes" :key="index" class="attribute-row">
        <div class="name">{{ attribute.name }}</div>
        <div class="progress-container">
          <Progress :value=attribute.value type="full"></progress>
        </div>
        <div class="name">{{ attribute.value }}%</div>
      </div>
    </article>
    <article class="attributes-item">
      <Title name="Pace/Theme/Rewatch"></Title>
      <div v-for="(attribute, index) in movieAttributes" :key="index" class="attribute-row">
        <div class="name">{{ attribute.name1 }}</div>
        <div class="progress-container">
          <Progress :value1=attribute.value1 :value2=attribute.value2 type="stacked"></progress>
        </div>
        <div class="name">{{ attribute.name2 }}</div>
      </div>
    </article>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
