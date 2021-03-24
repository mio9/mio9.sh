<template>
  <div>
    <div id="console">
      🌸WELCOME TO MIO9'S FAMILY 🌸
      <client-only placeholder="Loading console...">
        <div class="warning" v-if="!$device.isDesktop">
          [HOLD UP!] Commmands won't work without a keyboard, plug one in before
          trying the commands
        </div>
        <div style="color: lime">-------[!!!]-------</div>
        <div style="color: lime">
          New album "Re:Light" has released! Check it out @
          <a href="https://songwhip.com/mio9/relight">[here]</a>
        </div>
        <div style="color: lime">-------------------</div>
        <div style="color: pink">
          It's coming down tho... it'S COMING DOWNN~ AAAAAAAAAAAAAAAAAAAA!!
        </div>

        <!-- <div>&lt;&lt;願榮光歸香港&gt;&gt; </div> -->
        <span>sh-{{sh_ver}}$ bash mio9.sh --caffine-level=9999</span>
        <div>[INFO] Oh no that's uLtRA ☆ hYPeR ☆ aaaaAaaAAAAaaaaAAaa</div>
        <div id="output" v-html="outText"></div>
        <div id="10-refresh" v-if="refreshes >= 10">
          &gt; How it feels to press F5 10 times?
        </div>
        <div id="20-refresh" v-if="refreshes >= 20">
          &gt; Serious..? 10 more refreshes?
        </div>
        <div id="40-refresh" v-if="refreshes >= 40">
          &gt; You did it 40 times already, you can just... click on the word to
          get a new combination...
        </div>
        <div id="80-refresh" v-if="refreshes >= 80">
          &gt; What dafuq? what's wrong with you? 80 times seriously?
        </div>
        <div v-for="line in terminalLines" :key="line">{{ line }}</div>
        <div>sh-{{sh_ver}}$ {{ inputText }} <span v-show="underscore">_</span></div>
        <!-- <img src="@/assets/logo.png" alt=""> -->
      </client-only>
    </div>
    <hr />
    <div class="album-container">
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/album=315346018/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
        ><a href="http://mio9.bandcamp.com/album/re-light"
          >Re:Light by MiO9, RegZ</a
        ></iframe
      >
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/track=843483581/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
        ><a href="http://mio9.bandcamp.com/track/voyage"
          >Voyage by MiO9, TACA Music</a
        ></iframe
      >
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/track=469524244/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
        ><a href="http://mio9.bandcamp.com/track/ultra-hyper-xd"
          >ULTRA * HYPER * XD by MIO9</a
        ></iframe
      >
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/track=2815041959/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
        ><a href="http://mio9.bandcamp.com/track/nameless-dimension"
          >Nameless Dimension by mio9, RegZ</a
        ></iframe
      >
      <iframe
        src="https://bandcamp.com/EmbeddedPlayer/track=4067402184/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/"
        seamless
        ><a href="http://mio9.bandcamp.com/track/flare"
          >Flare by MIO9</a
        ></iframe
      >
    </div>
    <iframe
      width="100%"
      height="450"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1231539586&color=%23303030&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
    ></iframe>
    <div
      style="
        font-size: 10px;
        color: #cccccc;
        line-break: anywhere;
        word-break: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
          Garuda, Verdana, Tahoma, sans-serif;
        font-weight: 100;
      "
    >
      <a
        href="https://soundcloud.com/mio9"
        title="MIO9"
        target="_blank"
        style="color: #cccccc; text-decoration: none"
        >MIO9</a
      >
      ·
      <a
        href="https://soundcloud.com/mio9/sets/latest-tracks"
        title="Latest tracks"
        target="_blank"
        style="color: #cccccc; text-decoration: none"
        >Latest tracks</a
      >
    </div>
  </div>
</template>
<script>
import Phrases from "@/assets/Phrases";
export default {
  name: "MainTerm",
  data() {
    return {
      sh_ver: "3.24",
      underscore: true,
      terminalLines: [],
      inputLine: [],

      // 27 Escape (clear)
      // 38 up
      // 40 down
      // 37 left
      // 39 right
      // 36 home
      // 35 end
      excludeInput: [
        "Shift",
        "Control",
        "Alt",
        "CapsLock",
        "Escape",
        "Enter",
        "Backspace",
      ],
    };
  },
  computed: {
    phrases() {
      return Phrases.phrases;
    },
    outText() {
      // return this.phrases[32]
      return this.phrases[this.getRandomInt(this.phrases.length)];
    },
    inputText() {
      let out = this.inputLine
        .join("")
        .replace(/(ArrowUp)/g, "↑")
        .replace(/(ArrowDown)/g, "↓")
        .replace(/(ArrowLeft)/g, "←")
        .replace(/(ArrowRight)/g, "→");

      return out;
    },
    refreshes() {
      if (process.browser) {
        return parseInt(window.sessionStorage.getItem("refreshes") || 0);
      }
    },
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    addInput(key) {
      if (!this.excludeInput.includes(key)) {
        this.inputLine.push(key);
        this.checkInput();
      }
      if (key == "Escape") {
        this.inputLine = [];
      } else if (key == "Enter") {
        this.terminalLines.push("$ " + this.inputText);
        this.inputLine = [];
        this.terminalLines.push("Your magic didn't work...?");
      } else if (key == "Backspace") {
        this.inputLine.pop();
      }
    },
    checkInput() {
      // console.log("checking");
      if (this.inputText == "→↓↑→→↓→→↑↑↓↓←→←→") {
        console.log("ちょっと ↑ にためて下さい。");
        this.terminalLines.push("$ " + this.inputText);
        this.terminalLines.push("ちょっと ↑ にためて下さい。");
        this.inputLine = [];
        window.open("https://www.youtube.com/watch?v=lwT4h6x3UM0", "_blank");
      } else if (
        this.inputText == "fd↓" ||
        this.inputText == "dive↓" ||
        this.inputText == "↓↓↓↓↓↓↓↓↓↓↓"
      ) {
        console.log("FREEDOM DIVE↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
        this.terminalLines.push("$ " + this.inputText);
        this.inputLine = [];
        window.open("https://www.youtube.com/watch?v=OI3C9qQlb1U", "_blank");
      } else if (
        this.inputText == "AMYYYY!!!" ||
        this.inputText == "amyyyy!!!"
      ) {
        this.terminalLines.push("$ " + this.inputText);
        this.inputLine = [];
        window.open("https://www.youtube.com/watch?v=nH_2rssTJtM", "_blank");
      } else if (
        this.inputText == "daidaidai" ||
        this.inputText.toUpperCase() == "DAISUKE"
      ) {
        this.terminalLines.push("$ " + this.inputText);
        this.terminalLines.push("DAISUKE!");
        console.log(Phrases.daisukeLyrics);
        this.inputLine = [];
        window.open(
          "https://www.youtube.com/watch?v=XUV863a1Lok&t=91",
          "_blank"
        );
      } else if (
        this.inputText.toUpperCase() == "I LOVE EMILIA" ||
        this.inputText.toUpperCase() == "FUCKOFF" ||
        this.inputText.toUpperCase() == "FUCK OFF"
      ) {
        console.log("now get outta here");
        window.open("https://mio9.sh/now-you-fuck-off", "_self");
      } else if (
        this.inputText == "109" ||
        this.inputText.toUpperCase() == "M109" ||
        this.inputText.toUpperCase() == "M/109"
      ) {
        this.terminalLines.push("$ " + this.inputText);
        this.inputLine = [];
        window.open("https://109.mio9.sh", "_blank");
      }
    },
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      // console.log(e.key);
      this.addInput(e.key);
    });
    console.log("<<願榮光歸香港>>");
    console.log(Phrases.glory);
    
    //set timer for the underscore
    setInterval(()=>{
      this.underscore=!this.underscore;
    },800)
  },
};
</script>
<style>
.warning {
  color: orange;
}
.love {
  color: plum;
}
</style>
