<template>
  <div class="book-list">
    <ul>
      <li v-for="item in dataList" :key="item.id">
        <div>
            <div class="item" :ref="`book_${item.id}`">
              <iframe :src="item.html ? `javascript:void(function(){document.open();document.write('${item.html.replace(/\'/g, '\\\'')}');document.close();}())` : 'about:blank'"
                frameborder="0" scrolling="no"
                :style="{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  transform: `scale(${item.scale})`, 
                  transformOrigin: '0 0',
                  display: item.scale ? 'block' : 'none'
                }"
              ></iframe>
              <div class="mask" @click="openBook(item)">
                <template v-if="!item.html">
                  <img v-if="item.isbook" src="../../../../assets/img/icon-report-book.png"/>
                  <img v-else src="../../../../assets/img/icon-report-table.png"/>
                </template>
                <div class="toolbar">
                  <span class="left">
                    <slot v-if="$scopedSlots['title']" name="title" v-bind="item"/>
                    <template v-else>{{item.name}}</template>
                  </span>
                  <span class="right">
                    <a class="show-cover" @click.stop="showCover(item)">
                      <a-icon type="fullscreen"/>{{item.isbook ? '查看封面' : '查看表格'}}
                    </a>
                    <a @click.stop="exportBook(item)"><a-icon type="download"/>导出</a>
                  </span>
                </div>
              </div>
            </div>
        </div>
      </li>
    </ul>
    <!-- 查看封面 -->
    <a-modal v-if="book"
      :visible="true"
      :footer="null"
      :closable="false"
      :centered="true"
      :width="`${book.width}px`"
      :bodyStyle="{ height: `${book.height}px`, padding: '0'}"
    >
      <span class="cover-model-btns">
        <a @click="book=undefined"><a-icon type="close"/></a>
        <a @click="refreshCover(book)"><a-icon type="reload"/></a>
        <a @click="exportSheet(book)"><a-icon type="download"/></a>
      </span>
      <div class="iframe-scroll-wrapper">
        <iframe frameborder="0" scrolling="no" :height="coverIframeHeight" ref="iframe"
          :src="`javascript:void(function(){document.open();document.write('${book.html.replace(/\'/g, '\\\'')}');document.close();}())`" 
        ></iframe>
      </div>
    </a-modal>
    <!-- 导出提示 -->
    <a-modal title="提示" 
      :visible="exportModel.visible"
      @cancel="exportModel.visible = false"
      @ok="doExport"
    >
      <div>
        <p style="font-size:18px">当月报表需实时生成，确定导出该报表？</p>
        <p>
          设置截止时间：<a-month-picker v-model="exportModel.date" :allowClear="false"/>
        </p>
      </div>
    </a-modal>
    <TaskProgress v-if="exportModel.taskid" :taskid="exportModel.taskid" defaultInfo="正在导出" @finish="onProgressFinish"/>
  </div>
</template>
<script>
import { Modal, DatePicker, Icon } from "ant-design-vue";
import TaskProgress from "@/framework/components/TaskProgress";
import { showError } from "@/framework/utils/index";
import { exportBook, buildSheet } from "@/person/api/booklet";
import { download, convertHtmlToFileAsync } from "@/framework/api/file";

export default {
  components: {
    AModal: Modal,
    AMonthPicker: DatePicker.MonthPicker,
    AIcon: Icon,
    TaskProgress,
  },
  props: {
    list: {
      type: Array
    }
  },
  data(){
    return {
      book: undefined,
      coverIframeHeight: 0,
      exportModel: {
        visible: false,
        id: undefined,
        date: undefined,
        taskid: undefined,
      },
    }
  },
  computed: {
    dataList(){
      let list = (this.list || []).map(item => {
        let {content, pagesize, rotate, margins } = item.cover;
        return {
          id: item.id,
          name: item.name,
          isbook: !item.onepage,
          fileuri: item.fileuri,
          history: item.history,
          sheet: item.cover,
          html: content,
          publishdate: item.publishdate,
          pagesize, rotate, margins,
          ...this.getPageRect(pagesize, rotate),
          scale: 0//未知缩放比例，待页面显示后计算
        }
      });
      this.loadCover(list);
      return list;
    }
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.onResize);
  },
  methods: {
    onResize(e){
      //页面大小改变重新计算缩放比例
      this.dataList.forEach(item => {
        let elem = this.$refs[`book_${item.id}`][0];
        if(elem){
          item.scale = elem.offsetWidth/item.width;
        }
      })
      this.$forceUpdate();
    },
    openBook(item) {
      if(item.isbook){
        this.$router.push({ name: "BookCatalog", query: { bookid: item.id }});
      }else{
        this.showCover(item);
      }
    },
    showCover(item) {
      if (item.html) {
        this.book = item;
        this.coverIframeHeight = 0;
        this.$nextTick(() => {
          let iframe = this.$refs.iframe;
          if(iframe){
            iframe.onload = () => {
              this.coverIframeHeight = iframe.contentWindow.document.body.scrollHeight;
              iframe.onload = null;
            };
          }
        })
      } else {
        this.$message.info('数据未加载');
      }
    },
    doExport() {
      let { id, date } = this.exportModel;
      exportBook(id, date.format("YYYY-MM")).then(res => {
        this.exportModel.taskid = res.result;
        this.exportModel.visible = false;
      }).catch(error => {
        showError(error);
      });
    },
    onProgressFinish(uri) {
      this.exportModel.taskid = undefined;
      download(uri);
    },
    exportBook(item){
      if(item.isbook){
        if(item.fileuri){//有地址直接下载
          this.$confirm({
            title: '提示',
            content: h => '确定导出该册历史报表？',
            onOk: () => {
              download(item.fileuri);
            }
          });
        }else{//实时导出
          this.exportModel = { visible: true, id: item.id, date: moment() }
        }
      }else{
        this.$confirm({
          title: '提示',
          content: h => '确定导出该报表？',
          onOk: () => {
            if(item.html){
              this.exportSheet(item);
            }else{
              buildSheet(item.id, null, true).then(({ result }) => {
                item.html = result.content;
                this.exportSheet(item);
              }).catch(error => {
                showError(error);
              });
            }
          }
        });
      }
    },
    exportSheet(sheet){
      let { name, pagesize, rotate, margins, html, isbook} = sheet;
      if(isbook){
        name += '封面';
      }
      convertHtmlToFileAsync({
        title: name,
        pagesize,
        rotate, 
        margins,
        html
      }).then(() => {
        //success
      }).catch(error => {
        showError(error);
      })
    },
    refreshCover(book) {
      if(book.history){//sunwen 历史数据没必要刷新
        this.$message.success("刷新成功");
      }else{
        buildSheet(book.id, null, true).then(({ result }) => {
          book.html = result.content;
          this.$message.success("刷新成功");
        }).catch(error => {
          showError(error);
        });
      }
    },
    loadCover(list) {
      this.$nextTick(() => {
        list.forEach(item => {
          let elem = this.$refs[`book_${item.id}`][0];
          if(elem){
            item.scale = elem.offsetWidth / item.width;
          }
          if(!item.html && !item.history){
            buildSheet(item.id).then(({result}) => {
              item.html = result.content;
              this.$forceUpdate();
            });
          }
        });
        this.$forceUpdate();
      })
    },
    getPageRect(pagesize, rotate){
      //TODO 根据pagesize获取页面宽高
      let width = 794, height = 1123;
      return rotate ? {width: height, height: width} : {width, height};
    }
  }
}
</script>
<style lang="less" scoped>
.book-list > ul{
  overflow: hidden;
  margin: 0 -10px;
  li{
    float: left;
    height: 0;
    position: relative;
    & > div{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
  @media screen and(max-width: 1600px) {
    li {
      width: 33.3333%;
      padding-top: 33.3333% * (841/1189);
    }
  }
  @media screen and (min-width: 1600px) and(max-width: 1950px) {
    li {
      width: 25%;
      padding-top: 25% * (841/1189);
    }
  }
  @media screen and (min-width: 1950px) {
    li {
      width: 20%;
      padding-top: 20% * (841/1189);
    }
  }
  .item{
    height: 100%;
    box-shadow: 0px 0px 15px -4px #dad9d9;
    overflow: hidden;
    position: relative;
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        object-fit: none;
      }
      .toolbar{
        display: none;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: linear-gradient(to bottom, #fff, #cac9c9 40%, #797979);
        padding: 10px 20px;
        .left{
          flex: auto;
          color: white;
          line-height: 40px;
          font-size: 1.2em;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &::before{
            content: '';
            display: inline-block;
            width: 6px;
            height: 1em;
            margin-right: 10px;
            vertical-align: -0.12em;
            background-color: @accent-color;
          }
        }
        .right{
          flex: none;
          .anticon{
            margin-right: 4px;
          }
          a{
            color: white;
            line-height: 40px;
            margin-left: 10px;
          }
        }
      }
    }
    &:hover{
      box-shadow: 2px 2px 15px -4px #c7c7c7;
      .toolbar{
        display: flex;
      }
    }
  }
}
.iframe-scroll-wrapper{
  width: 100%;
  height: 100%;
  //不支持overlay使用 auto
  overflow-y: auto;
  overflow-y: overlay;
  iframe{
    width: 100%;
    display: block;
  }
}
.cover-model-btns {
  position: absolute;
  right: -50px;
  top: 0px;
  display: flex;
  flex-direction: column;
  a {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    background: #666;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    box-shadow: 0px 0px 15px -4px #666;
    cursor: pointer;
    .anticon {
      font-size: 22px;
      color: white;
      vertical-align: -0.28em;
    }
    &:hover{
      background: lighten(#666, 5%);
    }
  }
}
</style>