<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step != 0" @click="step=0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0" @click="step+=3">Follow</li>
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish">Posting</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <h4>안녕 {{ $store.state.name }}</h4>
  <button @click="$store.commit('이름변경')">이름버튼</button>
  <h4>안녕 {{ $store.state.age }}</h4>
  <button @click="$store.commit('나이추가')">나이버튼</button>

  <p>{{ $store.state.more }}</p>
  <button @click="$store.dispatch('getData')">더보기버튼</button> -->

  <Container @write="작성한글 = $event" :이미지="이미지" :게시물="게시물" :step="step" />

  <button class="more" v-if="step == 0" @click="more">더보기</button>


  <div class="footer"  v-if="step == 0">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import postdata from "./assets/postdata.js";
import axios from "axios";
import { mapMutations, mapState } from 'vuex';
export default {
  // eslint-disable-next-line
  name: "App",
  data() {
    return {
      step: 0,
      게시물: postdata,
      이미지: "",
      작성한글 : '',
      선택한필터 : '',
      
    }
  },
  mounted() {
    this.emitter.on("박스클릭함", (a) => {
      this.선택한필터 = a;
    })
  },
  // eslint-disable-next-line
  components: {
    Container: Container,
  },
  computed:{
    name(){
      return this.$store.state.name
    },
    ...mapState(['name','age','likes']),
    ...mapState({작명 : 'name',})
  },
  methods: {
    ...mapMutations(['setMore','좋아요']),

    // eslint-disable-next-line
    publish() {
      // eslint-disable-next-line
      var 내게시물 = {
        name: "John Doe",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.이미지,
        likes: 44,
        date: "Jul 17",
        liked: false,
        content: this.작성한글,
        filter: this.선택한필터
      };
      this.게시물.unshift(내게시물);
      this.step = 0;
    },
    more() {
      axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((결과) => {
          console.log(결과.data);
          this.게시물.push(결과.data);
        });
    },
    upload(e) {
      console.log('upload 실행됨')
      let 파일 = e.target.files;
      console.log(파일);
      let url = URL.createObjectURL(파일[0]);
      this.이미지 = url;
      console.log(url);
      this.step = this.step + 1;
    },
  },
};
</script>

<style>

body {
  margin: 0;
  
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: #646efc;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: #646efc;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
.more{
  width: 200px;
  margin: 100px 0px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 25%;
  border: 0;
  box-shadow: 3px 3px 3px rgb(167, 165, 165);
  transition-duration: 0.1s;
  cursor: pointer;
  background: rgb(255, 255, 255);
}
.more:active{
  background-color: #d3d3d3;
  box-shadow: none;
  margin-left: inherit;
  margin: 103px 0px;
  margin-left: 25.3%;
}
</style>
