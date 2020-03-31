<template>
 <div>
   <p>Oof! Look like you have popups blocked!</p>
   <p>anyways here's a nice invitation, welcome onboard :D</p>
   <client-only>
   <iframe src="https://discordapp.com/widget?id=439668987421261824&theme=dark" seamless></iframe>
   </client-only>
 </div>
 
    
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    
  },
  mounted(){
    window.open("https://discord.gg/UYX84Za","_blank")
  }
};
</script>
<style>

</style>