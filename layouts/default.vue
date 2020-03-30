<template>
  <div class="maincontainer">
    <span id="mio" @click="gotoLink('/')">mio9.sh</span>

    <div id="links">
      <!-- <span
        @click="showProjects=!showProjects"
        v-bind:class="{active:showProjects}"
        class="menu-item"
      >[Projects]</span> -->
      <!-- <span
        @click="showContact=!showContact"
        v-bind:class="{active:showContact}"
        class="menu-item"
      >[SNS]</span> -->
      <span @click="gotoLink('/about')">[About]</span>
      <span @click="gotoLink('/usage')">[Usage]</span>
      <span @click="openLink('https://www.youtube.com/channel/UCU5-HW3G5U2ztQloUsu6qgQ')">[YouTube]</span>
      <span @click="openLink('https://soundcloud.com/mio9')">[SoundCloud]</span>
      <span @click="gotoLink('/discord')">[Discord]</span>
      

      <span class="minor-msg">LU:200331 / (c) 2020 MiO9</span>
      
    </div>
    <div id="contact" v-if="showContact">
      <span @click="openLink('https://twitter.com/mio9_sh')">[Twitter]</span>
      <span @click="openLink('https://instagram.com/mio9.sh')">[IG]</span>
      <span @click="openLink('https://www.youtube.com/channel/UCU5-HW3G5U2ztQloUsu6qgQ')">[YouTube]</span>
      <span @click="gotoLink('/discord')">[Discord]</span>
      <span @click="openLink('https://www.twitch.tv/miosh9')">[Twitch]</span>
      </div>
    <div id="project" v-if="showProjects">
      >
    </div>
    <div>
      <span class="minor-msg" @click="refreshMIO">{{mioPhrase}}</span>
    </div>
    <hr>
    <nuxt/>
  </div>
</template>

<script>
import Phrases from "@/assets/Phrases";
export default {
  name: "App",
  data() {
    return {
      showProjects: false,
      showCode: false,
      showPlugins: false,
      showContact: false,
      mioPhrase: "M. I. O."
    };
  },
  computed: {
    refreshes() {
      return parseInt(sessionStorage.getItem("refreshes") || 0) || 0;
    }
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    gotoLink(link) {
      window.open(link, "_self");
    },

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    refreshMIO() {
      this.mioPhrase =
        Phrases.m[this.getRandomInt(Phrases.m.length)] +
        " " +
        Phrases.i[this.getRandomInt(Phrases.i.length)] +
        " " +
        Phrases.o[this.getRandomInt(Phrases.o.length)];
    }
  },
  mounted() {
    let refreshes = this.refreshes;
    sessionStorage.setItem("refreshes", ++refreshes);
    this.refreshMIO();
  }
};
</script>

<style>
.maincontainer {
  font-family: "Roboto Mono", monospace;
  /* font-size: 20px; */
  text-align: left;
  color: #fefefe;
  margin-left: 60px;
  margin-right: 60px;
}
body {
  background-color: #202020;
}
#mio {
  font-size: 60px;
  font-family: "Major Mono Display", monospace;
}
.minor-msg {
  font-size: 11px;
  color: darkgray;
}
.menu-item.active {
  color: aqua;
}
a{
  color: lightskyblue;
}
h1{
  font-size: 30px;
}
iframe{
  border-style: solid;
}
hr{
  border: 1.5px solid #cccccc;
}
code{
  background: #303030;
  padding: 10px;
}
</style>
