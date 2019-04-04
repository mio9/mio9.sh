<template>
  <div>
    <no-ssr>
    <div
      class="warning"
      v-if="!$device.isDesktop"
    >[CRITICAL!] This stuff does not work without a keyboard, plug one in before attempting here</div>
    <div style="color: lime;">(fix) The IG box no longer brings you to void</div>
    <div
      class="love"
    >(!) Sorry for the downtime/being directed to our partner site instead in the previous week, I'm back here with you again :)</div>
    <span>$ bash surgery.sh --patient "grape"</span>
    <div id="output" v-html="outText"></div>
    <div id="10-refresh" v-if="refreshes>=10">&gt; How it feels to press F5 10 times?</div>
    <div id="20-refresh" v-if="refreshes>=20">&gt; Serious..? 10 more refreshes?</div>
    <div
      id="40-refresh"
      v-if="refreshes>=40"
    >&gt; You did it 40 times already, just F12 if you want to see all M.I.O. combinatons....</div>
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
      if (process.browser){
        return parseInt(window.sessionStorage.getItem("refreshes") || 0);
      }
      
    },
    // isMobile() {
    //   var check = false;
    //   (function(a) {
    //     if (
    //       /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
    //         a
    //       ) ||
    //       /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    //         a.substr(0, 4)
    //       )
    //     )
    //       check = true;
    //   })(navigator.userAgent || navigator.vendor || window.opera);
    //   return check;
    // }
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
        window.open("https://mio9.sh/#/now-you-fuck-off", "_self");
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
