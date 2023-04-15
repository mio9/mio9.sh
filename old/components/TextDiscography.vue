<template>
  <div>
    <ul>
      <li v-for="item in listing" :key="item.n">
        {{ item.a }} - {{ item.n }}{{ item.g }}
      </li>
    </ul>
  </div>
</template>
<script>
import Discography from "@/assets/Discography";
export default {
  computed: {
    listing() {
      return Discography.releases;
    },
  },
};
</script>