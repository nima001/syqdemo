<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in list" :key="index" @click="jump(item)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { log } from '@antv/g2plot/lib/utils';
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [
        { name: '新增组织' },
        { name: '组织撤销' },
        { name: '组织合并' },
        { name: '组织分设' },
        { name: '组织迁移' },
        { name: '设置机构管理员' },
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    jump(item){
      if(item.name == '设置机构管理员'){
        this.$router.push('/idm/setorgmanager');
      }
      if(item.name == '新增组织'){
        this.$router.push('/idm/account/addorg')
      }
      if(item.name == '组织合并'){
        this.$router.push('/idm/comborg')
      }
      if(item.name == '组织分设'){
        this.$router.push('/idm/separateorg')
      }
      if(item.name == '组织迁移'){
        this.$router.push('/idm/moveorg')
      }
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item{
    width: calc(~'25% - 18px');
    height: 60px;
    background-color: rgb(240,242,245);
    text-align: center;
    line-height: 60px;
    margin: @padding-xs @padding-lg @padding-xs 0;
    cursor: pointer;
    &:nth-child(4n){
      margin-right: 0;
    }
  }
}
</style>