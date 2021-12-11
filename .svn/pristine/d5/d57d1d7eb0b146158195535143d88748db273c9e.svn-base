<template>
  <div class="detail-info">
    <div class="header">
      <p>未按时退休人数</p>
      <lcd-font :length="4" :smooth="false" :realNumber="22" :realStyle="realStyle" />
    </div>
    <div class="content">
      <table class="body">
        <thead>
          <tr>
            <td width="12%" class="tag">人员姓名</td>
            <td width="15%">出生日期</td>
            <td width="10%">性别</td>
            <td width="12%">最高学历</td>
            <td width="26%">退休依据</td>
            <td width="15%">预计退休时间</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="item.id"
            :class="{ odd: index % 2 != 1 }"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.birthday }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.education }}</td>
            <td class="reason">{{ item.reason }}</td>
            <td>{{ item.retireTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer">
      <div class="pagintion">
        <a
          :class="{ disabled: page.pagenum <= 1 }"
          @click="loadData(page.pagenum - 1)"
          ><img src="../img/p-down.png"
        /></a>
        <span>{{ page.pagenum }}/{{ pageTotal }}</span>
        <a
          :class="{ disabled: page.pagenum >= pageTotal }"
          @click="loadData(page.pagenum + 1)"
          ><img src="../img/p-up.png"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
import { listOrgDistrItem } from "@person/api/org";
import { showError } from "@framework/utils/index";
import LcdFont from "../components/LcdFont";

export default {
  components: {
    LcdFont,
  },
  props: {
    orgid: String,
  },
  data() {
    return {
      list: [
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
        {
          name: "张三",
          birthday: "1970-09-08",
          sex: "男",
          education: "本科",
          reason: "一级主任科员/一级主任科员/一级主任科员/一级主任科员",
          retireTime: "2025-01",
        },
      ],
      page: {
        pagenum: 1,
        pagesize: 10,
        rows: [],
        total: 10,
      },
      realStyle: {
        color: "#7DC8A3",
        textStroke: "1 #ECA066",
      },
    };
  },
  computed: {
    pageTotal() {
      let { pagesize, total } = this.page;
      if (total > 0) {
        return Math.ceil(total / pagesize);
      }
      return 1;
    },
  },
  methods: {
    loadData(pagenum) {
      if (pagenum < 1 || pagenum > this.pageTotal || !this.loadPage) {
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.detail-info {
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
  & > .header {
    text-align: center;
    p {
      color: #fff;
      margin-bottom: 8px;
    }
  }
  & > .content {
    margin-top: 40px;
    flex: auto;
    min-height: 1px;
    .body {
      width: 100%;
      margin-top: 20px;
      table-layout: fixed;
      font-size: 16px;
      color: #fff;
      line-height: 30px;
      thead {
        background: linear-gradient(
          to right,
          rgba(65, 126, 220, 0.6),
          rgba(8, 126, 127, 0.06)
        );
        transform: translateY(-8px);
        .tag {
          border-left: 2px solid #2a89c4;
        }
      }
      td {
        padding: 5px 20px;
        text-align: left;
        &.reason {
          width: 40%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      & .odd {
        background-color: #111c31;
      }
    }
  }
  & > .footer {
    flex: none;
    padding: 20px;
    .pagintion {
      width: 140px;
      height: 40px;
      margin: auto;
      padding: 5px;
      line-height: 30px;
      background-color: #101b2c;
      border-radius: 4px;
      color: white;
      text-align: center;
      span {
        display: inline-block;
        width: 3em;
      }
      a {
        display: inline-block;
        padding: 0 10px;
        &.disabled {
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>