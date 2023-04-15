<template>
  <div class="maincontainer">
    <h1 id="mio" @click="gotoLink('/')">mio9.sh</h1>

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
      <span><NuxtLink to="/about" class="navbar-item">[About]</NuxtLink></span>
      <span><NuxtLink to="/usage" class="navbar-item">[Usage]</NuxtLink></span>
      <span
        ><a
          href="https://www.youtube.com/channel/UCU5-HW3G5U2ztQloUsu6qgQ"
          class="navbar-item"
          >[YouTube]</a
        ></span
      >
      <span
        ><a href="https://soundcloud.com/mio9" class="navbar-item"
          >[SoundCloud]</a
        ></span
      >
      <span
        ><NuxtLink to="/discord" class="navbar-item">[Discord]</NuxtLink></span
      >
      <span
        ><a
          class="navbar-item"
          v-bind:class="{ active: showProjects }"
          @click="showProjects = !showProjects"
          >[Projects]</a
        ></span
      >

      <span class="minor-msg">LU:210324 / (c) 2020 MiO9</span>
    </div>
    <!-- <div id="contact" v-if="showContact">
      <span @click="openLink('https://twitter.com/mio9_sh')">[Twitter]</span>
      <span @click="openLink('https://instagram.com/mio9.sh')">[IG]</span>
      <span
        @click="
          openLink('https://www.youtube.com/channel/UCU5-HW3G5U2ztQloUsu6qgQ')
        "
        >[YouTube]</span
      >
      <span @click="gotoLink('/discord')">[Discord]</span>
      <span @click="openLink('https://www.twitch.tv/mio9')">[Twitch]</span>
    </div> -->
    <div id="project" v-if="showProjects">
      > <span><a href="/board" class="navbar-item">[FreeBoard]</a></span>
    </div>
    <div>
      <span class="minor-msg" @click="refreshMIO">{{ mioPhrase }}</span>
    </div>
    <hr />
    <nuxt />
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
      mioPhrase: "M. I. O.",
    };
  },
  computed: {
    refreshes() {
      return parseInt(sessionStorage.getItem("refreshes") || 0) || 0;
    },
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
    },
  },
  mounted() {
    let refreshes = this.refreshes;
    sessionStorage.setItem("refreshes", ++refreshes);
    this.refreshMIO();
  },
};
</script>

<style>
@import url("~/assets/css/style.css");
</style>
