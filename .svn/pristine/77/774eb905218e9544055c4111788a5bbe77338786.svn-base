
<template>
  <div id="public-table">
    <div class="public-table-title">{{theadArr.title}}</div>
    <table>
      <thead>
        <tr>
          <span
            style="display: table-cell;background-color: #fafafa;"
            v-for="(item,index) in arr"
            :key="index"
          >
            <td style="width: 50%;display: inline-block;">{{theadArr.children[0].title}}</td>
            <td style="width: 50%;display: inline-block;">{{theadArr.children[1].title}}</td>
          </span>
        </tr>
      </thead>
      <tbody>
        <!-- 1行 -->
        <tr v-for="(item,index) in rowArr" :key="index">
          <span
            style="display: table-cell;"
            v-for="(itemInner,indexInner) in arr"
            :key="indexInner"
          >
            <td
              v-if="totalData[indexInner*10 + index]"
              style="width: 50%;display: inline-block;"
            >{{ totalData[indexInner*10 + index].text }}</td>
            <td
              v-if="totalData[indexInner*10 + index]"
              style="width: 50%;display: inline-block;"
            >{{ totalData[indexInner*10 + index].data[0].salary }}</td>
          </span>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script >
export default {
  data() {
    return {
      arr: [],
      rowArr: []
    };
  },
  created() {
    let num; //一列需要展示几行
    num = 10;
    let len = Math.floor(this.totalData.length / num);
    if (this.totalData.length % num > 0) len++;
    this.arr = new Array(len);

    this.rowArr = new Array(num);
  },
  props: ["totalData", "theadArr"]
};
</script>

<style>
.public-table-title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  border: 0.5px solid #e8e8e8;
  border-bottom: none;
  background-color: #fafafa;
}
#public-table table {
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
}

#public-table table td {
  border: 0.5px solid #e8e8e8;
  height: 30px;
  line-height: 30px;
}
</style>