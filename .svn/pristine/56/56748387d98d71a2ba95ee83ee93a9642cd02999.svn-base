<template>
  <div>
    <ul>
      <li
        v-for="(item,index) in list"
        :style="{backgroundColor:`rgb(${item.r},${item.g},${item.b})`}"
        :key="index"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    let arr = this.makeColor();
    this.list = arr;
  },
  methods: {
    makeColor() {
      let arr = [];
      for (var i = 0; i < 360; i = i+30) {
        for (var i2 = 0; i2 < 10; i2++) {
          let pixel = this.HSVToRGB(i, i2 / 10, 0.8);
          arr.push(pixel);
          console.log(JSON.stringify(pixel));
        }
      }
      return arr;
    },
    HSVToRGB(h, s, v) {
      var i;
      var f, p, q, t;
      var r, g, b;
      if (s == 0) {
        v = Math.floor(v * 255);
        return {
          r: v,
          g: v,
          b: v
        };
      }
      h /= 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - s * f);
      t = v * (1 - s * (1 - f));
      switch (i) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        default:
          r = v;
          g = p;
          b = q;
          break;
      }
      return {
        r: r * 255,
        g: g * 255,
        b: b * 255
      };
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
li {
  height: 20px;
  width: 20px;
  float: left;
  margin: 2px;
}
</style>