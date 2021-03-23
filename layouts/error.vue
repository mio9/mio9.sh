<template>
  <div>

    <h1 v-if="error.statusCode===404" class="error-code">404</h1>
    <p>Can't find your page tho...You sure this is what you looking for?</p>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>
