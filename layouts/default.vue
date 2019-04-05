<template>
  <div class="maincontainer">
    <span id="mio" @click="gotoLink('/')">MIO9.sh</span>

    <div id="links">
      <span
        @click="showProjects=!showProjects"
        v-bind:class="{active:showProjects}"
        class="menu-item"
      >[Projects]</span>
      <span @click="openLink('https://twitter.com/mio9_sh')">[Twitter]</span>
      <span @click="openLink('https://instagram.com/mio9.sh')">[IG]</span>
      <span @click="openLink('https://www.youtube.com/channel/UCU5-HW3G5U2ztQloUsu6qgQ')">[YouTube]</span>
      <span @click="openLink('https://discord.gg/UYX84Za')">[Discord]</span>
      <span @click="openLink('https://www.twitch.tv/miosh9')">[Twitch]</span>
    </div>
    <div id="project" v-if="showProjects">
      >
      <span @click="gotoLink('/pixrail')">[PixRail]</span>
      <span
        @click="showBots=!showBots"
        v-bind:class="{active:showBots}"
        class="menu-item"
      >[Discord Bots]</span>

      <span
        @click="showPlugins=!showPlugins"
        v-bind:class="{active:showPlugins}"
        class="menu-item"
      >[Spigot Plugins]</span>
      <!-- Bots area -->
      <div id="bots" v-if="showBots">
        >> Bots:
        <span>[TC-Bot(Mightyyy)]</span>
      </div>
      <div id="bots" v-if="showPlugins">
        >> Plugins:
        <span @click="gotoLink('/metrocard')">[MetroCard]</span>
        <span>[PixRail]</span>
      </div>
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
      showBots: false,
      showPlugins: false,
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
code{
  color: yellow;
  background-color: blue;
}
h1{
  font-size: 30px;
}
iframe{
  border-style: solid;
}
</style>
