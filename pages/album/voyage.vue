<template>
  <div>
    <div>That'd be here later, be patient and have a cup of coffee meanwhile</div>
    <div>{{coffee1}}</div>
    <div>{{coffee2}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coffee1: "",
      coffee2: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.coffee1="i'm making the coffee for you now, wait a sec..."
      setTimeout(()=>{
        this.coffee2="☕ have a good time!"
      },5000)
    }, 3 * 1000);
  }
};
</script>