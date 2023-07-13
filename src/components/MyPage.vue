<template>
  <div>
    <input
      class="search-input"
      type="text"
      placeholder="검색어를 입력하세요"
      @input="searchGroup($event)"
    />

    <ul class="group-list">
      <li class="group-list-header">
        <div class="post-header" v-for="(a, i) in follower" :key="i">
          <div
            class="profile"
            :style="`background-image:url(${a.image})`"
          ></div>
          <span class="profile-name">{{ a.name }}</span>
        </div>
      </li>
      <li v-for="group in groupList" :key="group" class="group-item">
        <div class="profile" :style="`background-image:url(${group.image})`"></div>
        <span>{{ group.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import data from "/public/follower.json";

const groupList = data;

export default {
  data() {
    return {
      groupList,
    };
  },

  methods: {
    searchGroup(event) {
      const len = this.groupList.length;

      for (let i = 0; i < len; i++) {
        if (
          this.groupList[i].name.includes(event.target.value) === false &&
          this.groupList[i].image.includes(event.target.value) === false
        ) {
          document.querySelectorAll(".group-item")[i].style.display = "none";
        } else {
          document.querySelectorAll(".group-item")[i].style.display = "flex";
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.search-input {
  display: block;
  padding: 4px 8px;
  margin: 10px auto;
  width: 320px;
  font-size: 16px;
  outline: none;
}

.group-list {
  margin: 0 auto;
  width: 360px;
}

.group-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  list-style-type: none;
}

.group-list span {
  display: block;
  width: 50%;
  text-align: center;
}

.group-list-header {
  font-weight: 700;
  border-bottom: 1px solid #bdbdbd;
}
</style>