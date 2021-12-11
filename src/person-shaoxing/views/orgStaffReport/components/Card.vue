<template>
  <div class="compile">
    <div class="icon">
      <span>
        <img :src="require('../../../assets/img/' +src + '.png')" alt="">
      </span>
    </div>
    <div class="total">{{num}}</div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    src:String,
    num:Number,
    title:String,
    ob:Array
  },
  components: {},
  data() {
    return {

    };
  },
  watch: {},
  computed: {},
  created() {

  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.compile{
  width: 214px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: center;
  &:hover{
    border-color: @primary-3;
    background-color: @primary-1;
  }
  &.quality{
    border: none;
    width: 245px;
  }
  &.show{
    position: relative;
    &::before{
      content: "";
      left: 0;
      top: 50%;
      position: absolute;
      width: 1px;
      height: 80%;
      transform: translateY(-50%);
      background-color: #e8e8e8; 
    }
    &::after{
      content: "";
      right: 0;
      top: 50%;
      position: absolute;
      width: 1px;
      height: 80%;
      transform: translateY(-50%);
      background-color: #e8e8e8; 
    }
  }
  .icon{
    display: flex;
    justify-content: center;
    padding-top: 30px;
    span{
      display: inline-block;
      width: 34px;
      height: 34px;
    }
  }
  .total{
    font-size: 30px;
    font-weight: bold;
    margin-top: @padding-lg;
  }
  .title{
    padding: 24px 0 30px 0;
  }
}
</style>