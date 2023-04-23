<template>
  <div>
    <div id="console">
      No bootable medium found!<br>
      Please insert a bootable medium and reboot.<br>
      <client-only placeholder="_">
        <div>
          <span v-show="underscore">_</span>&nbsp;
        </div>
        <!-- <img src="@/assets/logo.png" alt=""> -->
      </client-only>
      <div style="color:black">
        <p>Life could be much better if facebook didn't exist, if people could solve their own problem, if there is no
          online campfiring, and if people could stop looking at their phone while god damn eating.</p>
        <p>and things could be even better if YOU the outsider could kindly shut the fuck up on things that bother you
          nothing.</p>
        <p>You think you understand, no you don't. You think you have the experience, no you don't. Shut up, thanks. You will never know what comes next to snap you back in half, for what you think was "helpful"</p>
      </div>
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
        this.terminalLines.push("sh-" + this.sh_ver + "$ " + this.inputText);
        this.inputLine = [];
        this.terminalLines.push("Your magic didn't work...? tho help list will be out later on");
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
    // console.log("<<願榮光歸香港>>");
    console.log(Phrases.glory);
    //set timer for the underscore
    setInterval(() => {
      this.underscore = !this.underscore;
    }, 250);
  },
};
</script>
<style>
.warning {
  color: orange;
}

.love {
  color: plum;
}</style>
