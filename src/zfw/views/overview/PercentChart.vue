<template>
  <div class="percent">
    <div class="percent_item" v-if="showApp">
      <div class="title">业务平台{{title}}占比</div>
      <div class="date">{{time}}</div>
      <div class="datatable">
        <span @click="detail(type[0], `业务平台${title}`)">数据表</span>
        <!-- <span>普通页面数据分析</span> -->
      </div>
      <!-- <RingChart :="$attrs.pageData[0]" :loading="loading" :coordinateName="axisName" :show-percent="false" style="height: 219px;margin-top: 24px;"></RingChart> -->
      <RingChart :data="pageData[0]" :loading="loading" :coordinateName="axisName" :show-percent="false" style="height: 219px;margin-top: 24px;"></RingChart>
    </div>
    <div class="percent_item" v-if="showDepartment">
      <div class="title">部门地方{{title}}占比</div>
      <div class="date">{{time}}</div>
      <div class="datatable">
        <span @click="detail(type[1], `部门地方${title}`)">数据表</span>
        <!-- <span>普通页面数据分析</span> -->
      </div>
      <RingChart :data="pageData[1]" :loading="loading" :coordinateName="axisName" :show-percent="false" style="height: 219px;margin-top: 24px;"></RingChart>
    </div>
    <div class="percent_item">
      <div class="title">{{title}}来源</div>
      <div class="date">{{time}}</div>
      <div class="datatable">
        <span @click="detail(type[2], `${title}来源`)">数据表</span>
        <!-- <span>普通页面数据分析</span> -->
      </div>
      <RingChart :data="pageData[2]" :loading="loading" :coordinateName="axisName" :show-percent="false" style="height: 219px;margin-top: 24px;"></RingChart>
    </div>
  </div>
</template>

<script>
import RingChart from '@/zfw/components/ringChart';

export default {
  props: {
    loading: {
      type: Boolean
    },
    title: {
      type: String
    },
    time: {
      type: String
    },
    axisName: {
      type: Array
    },
    pageData: {
      type: Array
    },
    userRoleType: {
      type: Number
    }
  },
  components: { RingChart },
  data() {
    return {
    };
  },
  watch: {
  },
  computed: {
    type() {
      if (this.title == '登录') {
        return ['app', 'department', 'resource'];
      } else {
        return ['appdata', 'departmentdata', 'resourcedata'];
      }
    },
    showApp: {
      get() {
        return this.userRoleType === 3 ? false : true;
      },
      set() {
        return this.userRoleType === 3 ? false : true;
      }
    },
    showDepartment: {
      get() {
        return (this.userRoleType === 3) || (this.userRoleType === 2) ? false : true;
      },
      set() {
        return (this.userRoleType === 3) || (this.userRoleType === 2) ? false : true;
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    detail(type, name) {
      this.$router.push({
        path: '/zfw/datatable',
        query: {
          target: type,
          name
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
.percent{
  display: flex;
  .percent_item{
    width: 33%;
    .title{
      color: black;
      font-size: 20px;
      font-weight: bold;
    }
    .date{
      color: #a2a2a2;
    }
    .datatable{
      span{
        color: @primary-color;
        cursor: pointer;
      }
    }
  }
}
</style>