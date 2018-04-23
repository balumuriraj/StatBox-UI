<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key='index'>
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key='index'>
        <td v-for="(data, index) in row" :key='index'>
          {{ data }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>