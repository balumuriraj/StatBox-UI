<template>
  <div class="tile is-vertical">
    <div class="tile is-parent">
      <article class="tile is-child notification is-white">
        <Title name="Watch" subtitle=" with"></Title>
        <table class="table is-fullwidth">
          <tbody>
            <tr v-for="(attribute, index) in watchWithAttributes" :key="index">
              <td class="name is-narrow">{{ attribute.name }}</td>
              <td class="value">
                <Progress :value=attribute.value type="full"></progress>
              </td>
              <td class="name is-narrow">{{ attribute.value }}%</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-white">
        <Title name="Pace/Theme/Plot"></Title>
        <table class="table is-fullwidth">
          <tbody>
            <tr v-for="(attribute, index) in movieAttributes" :key="index">
              <td class="name is-narrow">{{ attribute.name1 }}</td>
              <td class="value">
                <Progress :value1=attribute.value1 :value2=attribute.value2 type="stacked"></progress>
              </td>
              <td class="name is-narrow">{{ attribute.name2 }}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
