<template>
  <div class="singer-nav">
    <div class="title">
      <span>全部歌手</span>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="area">
          <ul>
            <li
              v-for="(item, index) in areas"
              :key="index"
              :class="{ active: currentIndex1 == index }"
              @click="sArea(item, index)"
            >
              {{ item.type }}
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="singer">
          <ul>
            <li
              v-for="(item, index) in singers"
              :key="index"
              :class="{ active: currentIndex2 == index }"
              @click="sSinger(item, index)"
            >
              {{ item.type }}
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="alphabet">
          <ul>
            <li
              v-for="(item, index) in alphabet"
              :key="index"
              :class="{ active: currentIndex3 == index }"
              @click="sAlphabet(item, index)"
            >
              {{ item.type }}
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SingerNav",
  data() {
    return {
      singers: [
        {
          type: "全部",
          num: -1,
        },
        {
          type: "男歌手",
          num: 1,
        },
        {
          type: "女歌手",
          num: 2,
        },
        {
          type: "乐队",
          num: 3,
        },
      ],
      areas: [
        {
          type: "全部",
          num: "-1",
        },
        {
          type: "华语",
          num: "7",
        },
        {
          type: "欧美",
          num: "96",
        },
        {
          type: "日本",
          num: "8",
        },
        {
          type: "韩国",
          num: "16",
        },
        {
          type: "其他",
          num: "0",
        },
      ],
      alphabet: [
        {
          type: "A",
          str: "a",
        },
        {
          type: "B",
          str: "b",
        },
        {
          type: "C",
          str: "c",
        },
        {
          type: "D",
          str: "d",
        },
        {
          type: "E",
          str: "e",
        },
        {
          type: "F",
          str: "f",
        },
        {
          type: "G",
          str: "g",
        },
        {
          type: "H",
          str: "h",
        },
        {
          type: "I",
          str: "i",
        },
        {
          type: "J",
          str: "j",
        },
        {
          type: "K",
          str: "k",
        },
        {
          type: "L",
          str: "l",
        },
        {
          type: "M",
          str: "m",
        },
        {
          type: "N",
          str: "n",
        },
        {
          type: "O",
          str: "o",
        },
        {
          type: "P",
          str: "p",
        },
        {
          type: "Q",
          str: "q",
        },
        {
          type: "R",
          str: "r",
        },
        {
          type: "S",
          str: "s",
        },
        {
          type: "T",
          str: "t",
        },
        {
          type: "U",
          str:'u'
        },
        {
          type: "V",
          str: "v",
        },
        {
          type: "W",
          str: "w",
        },
        {
          type: "X",
          str: "x",
        },
        {
          type: "Y",
          str: "y",
        },
        {
          type: "Z",
          str: "z",
        },
      ],
      currentIndex1: 0,
      currentIndex2: 0,
      currentIndex3: null,
    };
  },
  methods: {
    sArea(item, index) {
      this.currentIndex1 = index;
      this.$emit('areaItem',item.num);
    },
    sSinger(item, index) {
      this.currentIndex2 = index;
      this.$emit('singerItem',item.num);
    },
    sAlphabet(item, index) {
      this.currentIndex3 = index;
      this.$emit('wordItem',item.str);
    },
  },
};
</script>

<style scoped>
.singer-nav {
  padding: 20px;
  height: 100%;
  background: var(--color-background);
  border-radius: 30px;
}
.title {
  padding-left: 10px;
  margin-bottom: 20px;
  border-left: 5px solid red;
  font-size: 19px;
  font-weight: bold;
}
.singer-nav ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}
.singer-nav ul li {
  height: 100%;
  padding: 8px 10px;
  margin: 0 5px;
  margin-bottom: 18px;
  text-align: center;
  font-size: 14px;
}
.active {
  font-weight: bold;
  border-radius: 25px;
  color: white;
  background: var(--color-high-text);
}
</style>