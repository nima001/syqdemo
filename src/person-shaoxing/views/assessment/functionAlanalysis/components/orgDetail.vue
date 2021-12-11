<template>
  <div>
    <!-- 机构职责 -->
    <div class="details-tree" v-if="dutieslist || childrenlist">
      <h4 style="margin-bottom: 10px; font-weight: 700" v-if="(HasIn(dutieslist,'duties')&&dutieslist.duties.length)||(HasIn(dutieslist,'children')&&dutieslist.children.length)">{{ orgtitle }}</h4>
      <ul class="dutieslist tree-ul" v-if="dutieslist">
        <!-- 第一层 -->
        <li v-for="(i, inx) in (HasIn(dutieslist,'duties')?dutieslist.duties:[])" :key="JSON.stringify(i)" class="tree-ul-s">
          <!-- 第二层 -->
          <span class="tree-ul-li">{{ i.type === 0 ? "三定" : "变更" }}</span>
          <ul v-for="(a, anx) in i.result" :key="a.id" class="tree-ul-s">
            <!-- 第三层加图标 -->
            <span
              class="tree-ul-li"
              v-for="(t, tnx) in typearr"
              :key="t.key"
              v-show="a.type == t.value"
              >{{ t.text }}</span
            >
            <div class="ul-a-button" v-if="!a.children">
              <a-button @click="watchDetails(a)">查看详情</a-button>
            </div>
            <li class="tree-ul-a">
              <!-- 第四层 -->
              <span
                class="tree-li-span audiot_style"
                v-html="brightenKeyword(a.content)"
              ></span>
            </li>
            <div class="ul-a-button" v-if="a.children">
              <a-button @click="watchDetails(a)">查看详情</a-button>
            </div>
          </ul>
        </li>
        <li v-for="(ic, inc) in (HasIn(dutieslist,'children')?dutieslist.children:[])" :key="inc" class="tree-ul-s">
          <ul v-if="ic">
            <span  class="tree-ul-li" style="margin-bottom: 10px; font-weight: 700">{{ ic.orgname }}</span>
            <!-- 第一层 -->
            <li v-for="(i, inx) in (HasIn(ic,'duties')?ic.duties:[])" :key="JSON.stringify(i)" class="tree-ul-s">
              <!-- 第二层 -->
              <span class="tree-ul-li">{{ i.type === 0 ? "三定" : "变更" }}</span>
              <ul v-for="(a, anx) in i.result" :key="a.id" class="tree-ul-s">
                <!-- 第三层加图标 -->
                <span
                  class="tree-ul-li"
                  v-for="(t, tnx) in typearr"
                  :key="t.key"
                  v-show="a.type == t.value"
                  >{{ t.text }}</span
                >
                <div class="ul-a-button" v-if="!a.children">
                  <a-button @click="watchDetails(a)">查看详情</a-button>
                </div>
                <li class="tree-ul-a">
                  <!-- 第四层 -->
                  <span
                    class="tree-li-span audiot_style"
                    v-html="brightenKeyword(a.content)"
                  ></span>
                </li>
                <div class="ul-a-button" v-if="a.children">
                  <a-button @click="watchDetails(a)">查看详情</a-button>
                </div>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <ul v-for="(c, cnx) in childrenlist" :key="cnx" class="tree-ul">
        <!-- 第一层 -->
        <span style="font-weight: 700">{{ c.orgname }}</span>
        <li
          v-for="(s, snx) in (HasIn(c,'duties')?c.duties:[])"
          :key="JSON.stringify(s)"
          :class="['tree-ul', { border: c.children }]"
          style="margin: 10px 0 0 30px"
        >
          <!-- 第二层 -->
          <span class="tree-ul-li">{{ s.type === 0 ? "三定" : "变更" }}</span>
          <ul v-for="(a, anx) in s.result" :key="anx" class="tree-ul-s">
            <!-- 第三层加图标 -->
            <span
              class="tree-ul-li"
              v-for="(p, pnx) in typearr"
              :key="JSON.stringify(p)"
              v-show="a.type == p.value"
              >{{ p.text }}</span
            >
            <div class="ul-a-button" v-if="!a.children">
              <a-button @click="watchDetails(a)">查看详情</a-button>
            </div>
            <li class="tree-ul-a">
              <!-- 第四层 -->
              <span
                class="tree-li-span audiot_style"
                v-html="brightenKeyword(a.content)"
              ></span>
            </li>
            <div class="ul-a-button" v-if="a.children">
              <a-button @click="watchDetails(a)">查看详情</a-button>
            </div>
          </ul>
        </li>
        <li v-for="(sc, snx) in (HasIn(c,'children')?c.children:[])" :key="JSON.stringify(sc)" class="tree-ul-s noborder">
          <ul v-if="sc">
            <span  class="tree-ul-li" style="margin-bottom: 10px; font-weight: 700">{{ sc.orgname }}</span>
            <!-- 第一层 -->
            <li v-for="(i, inx) in (HasIn(sc,'duties')?sc.duties:[])" :key="JSON.stringify(i)" class="tree-ul-s">
              <!-- 第二层 -->
              <span class="tree-ul-li">{{ i.type === 0 ? "三定" : "变更" }}</span>
              <ul v-for="(a, anx) in i.result" :key="a.id" class="tree-ul-s">
                <!-- 第三层加图标 -->
                <span
                  class="tree-ul-li"
                  v-for="(t, tnx) in typearr"
                  :key="t.key"
                  v-show="a.type == t.value"
                  >{{ t.text }}</span
                >
                <div class="ul-a-button" v-if="!a.children">
                  <a-button @click="watchDetails(a)">查看详情</a-button>
                </div>
                <li class="tree-ul-a">
                  <!-- 第四层 -->
                  <span
                    class="tree-li-span audiot_style"
                    v-html="brightenKeyword(a.content)"
                  ></span>
                </li>
                <div class="ul-a-button" v-if="a.children">
                  <a-button @click="watchDetails(a)">查看详情</a-button>
                </div>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getorgfuncdesc } from "@/person-shaoxing/api/analysis";
import { Button } from "ant-design-vue";
import { hasIn } from 'lodash';
export default {
  name: "orgdetail",
  props: ["dutieslist", "childrenlist", "typearr", "orgtitle", "inputvalue"],
  components: {
    AButton: Button,
  },
  data() {
    return {};
  },
  methods: {
    HasIn(val,property) {
      return hasIn(val, property);
    },
    //判断搜索记录是否包含某个关键字
    brightenKeyword(content) {
      // inputvalue为搜索框中的value
      let inputvalue = this.inputvalue;
      let index = content.indexOf(inputvalue);
      if (content.length < 200) {
        const Reg = new RegExp(inputvalue, "g");
        let res = "";
        res = content.replace(Reg, `<span style="color: #d60002;">${inputvalue}</span>`);
        return res;
      } else if (index < 20) {
        let newtext = content.slice(index, index + 200);
        let newcontent = `......${newtext}......`;
        const Reg = new RegExp(inputvalue, "g");
        let res = "";
        res = newcontent.replace(
          Reg,
          `<span style="color: #d60002;">${inputvalue}</span>`
        );
        return res;
      } else {
        let newtext = content.slice(index - 15, index + 185);
        let newcontent = `......${newtext}......`;
        const Reg = new RegExp(inputvalue, "g");
        let res = "";
        res = newcontent.replace(
          Reg,
          `<span style="color: #d60002;">${inputvalue}</span>`
        );
        return res;
      }
    },
    watchDetails(item) {
      // this.visible = true;
      // getorgfuncdesc(item.id).then((res) => {
      //   this.detailsData = res.result;
      // });
      this.$emit("watchDetails", item);
    },
  },
};
</script>
<style lang="less" scoped>
.details-tree {
  .dutieslist {
    margin-left: 30px;
  }
  .ul-a-button {
    button.ant-btn {
      position: absolute;
      left: 85%;
    }
  }
  ul.tree-ul {
    position: relative;
    margin-bottom: 14px;
    li.tree-ul-s:last-child, li.tree-ul-s.noborder{
      border: 0;
      padding: 1px;
    }
    & li.tree-ul {
      border-left: 0;
    }
    .titlecolor {
      color: @primary-color;
    }
    .tree-ul-s {
      min-height: 32px;
      width: 95%;
      border-left: 1px dashed @primary-color;
      margin: 10px 0px 10px 30px;
      .tree-ul-a {
        margin-left: @layout-space-base;
        width: 85%;
        display: inline-flex;
        .audiot_style {
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .ul-a-button {
        float: right;
      }
    }
    // 竖线
    .tree-ul-li {
      position: relative;
      padding-left: 18px; // 缩进量
      .ul-a-button {
        float: right;
      }
    }
    .duty {
      width: 87%;
      margin-left: 60px;
      color: rgba(0, 0, 0, 0.5);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .quanliname {
      cursor: pointer;
      width: 92%;
      color: rgba(0, 0, 0, 0.5);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    // 竖线
    .tree-ul-li::before {
      content: "";
      height: 100%;
      width: 1px;
      position: absolute;
      left: -1px;
      top: -12px;
      border-width: 1px;
      border-left: 1px dashed @primary-color;
    }
    // 当前层最后一个节点的竖线高度固定
    .tree-ul-li:last-child::before {
      height: 38px; // 可以自己调节到合适数值
    }
    // 横线
    .tree-ul-li::after {
      content: "";
      // width: 24px;
      width: 16px;
      height: 20px;
      position: absolute;
      left: 0px;
      top: 10px;
      border-width: 1px;
      border-top: 1px dashed @primary-color;
    }
    //去掉最下面的虚线
    &:last-child {
      border-left: 1px dashed white;
    }
    .tree-ul-s {
      &:last-child {
        border-left: 1px dashed white;
      }
    }
    .details-li {
      height: 32px;
      width: 91.7%;
      display: flex;
      justify-content: space-between;
    }
    @media screen and(max-width:1440px) {
      .details-li {
        width: 92.6%;
      }
    }
  }
  .border {
    border-left: 1px dashed @primary-color !important;
  }
}
.under-mechanism .details-tree > ul.tree-ul:not(:last-child) {
  border-bottom: 1px dashed #e3e3e3;
}
</style>
