<template>
  <div>
    <no-ssr placeholder="Loading console...">
      <div
        class="warning"
        v-if="!$device.isDesktop"
      >[CRITICAL!] This stuff does not work without a keyboard, plug one in before attempting here</div>
      <!-- <div style="color: lime;">-------[!!!]-------</div>
      <div style="color: lime;">(yeet!) New discussion site had opened! Check it out @ <a href="https://109.mio9.sh">[m/109]</a></div>
      <div style="color: lime;">-------------------</div> -->
      <div style="color: red;">🔥 🇭🇰 fight against the power! </div>
      <div style="color: red;">🔥 香港加油! </div>
      <span>$ bash init.sh --default</span>
      <div id="output" v-html="outText"></div>
      <div id="10-refresh" v-if="refreshes>=10">&gt; How it feels to press F5 10 times?</div>
      <div id="20-refresh" v-if="refreshes>=20">&gt; Serious..? 10 more refreshes?</div>
      <div
        id="40-refresh"
        v-if="refreshes>=40"
      >&gt; You did it 40 times already, you can just... click on the word to get a new combination...</div>
      <div v-for="line in terminalLines" :key="line">{{line}}</div>
      <div>$ {{inputText}}</div>
      <!-- <img src="@/assets/logo.png" alt=""> -->
    </no-ssr>
  </div>
</template>
<script>
import Phrases from "@/assets/Phrases";
export default {
  name: "MainTerm",
  data() {
    return {
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
        "Backspace"
      ]
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
    }
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
      } else if (this.inputText=="109"||this.inputText.toUpperCase()=="M109"||this.inputText.toUpperCase()=="M/109"){
        this.terminalLines.push("$ " + this.inputText);
        this.inputLine = [];
        window.open("https://109.mio9.sh", "_blank");
      }
    }
  },
  mounted() {
    window.addEventListener("keyup", e => {
      // console.log(e.key);
      this.addInput(e.key);
    });
  }
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
