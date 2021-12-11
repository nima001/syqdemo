<template>
  <BookPager @prev="onPrevPage" @next="onNextPage" @refresh="onRefresh">
    <div :style="{ width: `${width}px`, minHeight: `${height}px`, padding: `${margins[0]}px ${margins[1]}px ${margins[2]}px ${margins[3]}px` }">
      <a-spin :spinning="loading" :delay="200">
        <div class="catalog" :style="{minHeight: `${height - margins[0] - margins[2]}px`}">
          <a-empty v-if="catalogs && !catalogs.length" :image="simpleImage" />
          <template v-else-if="catalogs">
            <h1>目录</h1>
            <ul>
              <li v-for="item in catalogs" 
                :key="item.id" 
                @click="redirect(item)"
                :class="{disabled: !item.sheet}"
                :style="{marginLeft: `${item.deep}em`}"
              ><a-icon type="table"/>{{item.name}}</li>
            </ul>
          </template>
        </div>
      </a-spin>
    </div>
  </BookPager>
</template>
<script>
import { Icon, Spin, Empty } from "ant-design-vue";
import BookPager from "./components/BookPager";
import { listCatalog, detailbook } from "@/person/api/booklet";
import { showError } from "@/framework/utils/index";

export default {
  components: {
    AIcon: Icon,
    ASpin: Spin,
    AEmpty: Empty,
    BookPager
  },
  data() {
    return {
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      loading: false,
      bookid: undefined,
      width: 1123,
      height: 794,
      margins: [60, 60, 60, 60],
      catalogs: undefined,
    };
  },
  created() {
    this.bookid = this.$route.query.bookid;
    if(this.bookid){
      this.loadData(this.bookid).catch(error => {
        showError(error);
      });
    }
  },
  methods: {
    onPrevPage(){
      this.$router.push({name: "BookList"});
    },
    onNextPage(){
      if(this.catalogs && this.catalogs.length){
        this.redirect(this.catalogs[0])
      }
    },
    onRefresh(){
      if(this.bookid){
        this.loadData(this.bookid).then(() => {
          this.$message.info('刷新成功')
        }).catch(() => {
          this.$message.info('刷新失败')
        });
      }
    },
    redirect(catalog){
      this.$router.push({
        name: "BookSheet",
        query: { bookid: this.bookid, catalogid: catalog.id }
      });
    },
    loadData(bookid) {
      this.loading = true;
      return Promise.all([detailbook(bookid), listCatalog(bookid)]).then(([book, catalogs]) => {
        let cover = book.result.cover;
        if(cover){
          let { pagesize, rotate, margins } = cover;
          this.setPageRect(pagesize, rotate);
          this.margins = margins || [];
        }
        this.catalogs = this.toTree(catalogs.result);
      }).finally(() => {
        this.loading = false;
      });
    },
    setPageRect(pagesize, rotate){
      //TODO 根据pagesize获取页面宽高
      let width = 794, height = 1123;
      if(rotate){
        [this.width, this.height] = [ height, width ];
      }else{
        [this.width, this.height] = [ width, height ];
      }
    },
    toTree(list){
      let path = [];
      return (list || []).map(item => {
        for(let i = path.length - 1; i >= 0; i--){
          if(item.pid != path[i]){
            path.pop();
          }else{
            break;
          }
        }
        item.deep = path.length;
        path.push(item.id);
        return item;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.catalog{
  h1{
    text-align: center;
    font-size: 18pt;
  }
  ul{
    margin: 0;
  }
  li{
    font-size: 16pt;
    line-height: 2em;
    word-break: break-all;
    cursor: pointer;
    &:hover{
      color: @primary-color;
    }
    .anticon{
      margin-right: 0.5em;
      color: @primary-color;
    }
    &.disabled .anticon{
      color: @disabled-color;
    }
  }
}
</style>