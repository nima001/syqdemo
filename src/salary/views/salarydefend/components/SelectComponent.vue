<template>
  <div class="selectbox" @click="change">
    <div class="selected">
      <span class="relation">{{text}}</span>
      <span class="icon">
        <i class="ant-select-arrow-icon anticon anticon-down">
          <svg
            viewBox="64 64 896 896"
            data-icon="down"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class
          >
            <path
              d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
            />
          </svg>
        </i>
      </span>
    </div>
    <ul class="selectlist" v-if="active">
      <li class="select-item" bindop="and" @click.stop="select($event)">并且</li>
      <li class="select-item" bindop="or" @click.stop="select($event)">或者</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SelectComponent",
  data() {
    return {
      active: false,
      setRelation: ""
    };
  },
  props: {
    relationop: {
      type: String,
      require: true
    },
    keys: {
      type: String,
      require: true
    }
  },
  computed: {
    text() {
      let op = this.setRelation ? this.setRelation : this.relationop;
      return op == "or" ? "或者" : "并且";
    }
  },
  methods: {
    change() {
      this.active = !this.active;
    },
    select(e) {
      let preOP = this.text == "或者" ? "or" : "and";
      let op = e.target.getAttribute("bindop");
      this.active = !this.active;
      this.setRelation = op;
      if (preOP != op) {
        let typeOp = op == "or" ? "OROP" : "ANDOP";
        this.$store.commit({
          type: typeOp,
          position: this.keys,
          op
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.selectbox {
  width: 72px;
  height: 32px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  position: relative;
  .selected {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .relation {
      font-size: 14px;
    }
    .icon {
      margin-left: 5px;
    }
  }
  .selectlist {
    width: 72px;
    position: absolute;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    margin: 0px;
    background: #fff;
    left: 0px;
    top: 32px;
    z-index: 20;
    border-radius: 4px;
    li {
      height: 32px;
      line-height: 32px;
      padding-left: 8px;
      font-size: 14px;
      &:hover {
        background: #e6f7ff;
      }
    }
  }
}
</style>