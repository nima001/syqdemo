<template>
  <div class="content">
    <div class="list">
      <div class="list_child">
        <div class="list_child_child">
          <div class="detail">
            <div class="type">已评估</div>
            <div class="total">{{ total[0]||0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="list_child">
        <div class="list_child_child">
          <div class="detail">
            <div class="type">未评估</div>
            <div class="total">{{ total[1]||0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="list_child">
        <div class="list_child_child">
          <div class="detail">
            <div class="type">一票否决</div>
            <div class="total">{{ total[2]||0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
        type: Array,
        default:()=>{
            return []
        }
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  .list {
    width: 120px;
    height: 150px;
    margin-right: 30px;
    overflow: hidden;
    transform: rotate(120deg);
    &:first-child {
        .list_child_child {
            background: linear-gradient(to bottom, #199E5F 0%, fade(#199E5F, 0.6) 100%, transparent);
        }
    }
    &:nth-child(2) {
        .list_child_child {
            background: linear-gradient(to bottom, #18ABDB 0%, fade(#18ABDB, 0.6) 100%, transparent);
        }
    }
    &:nth-child(3) {
        .list_child_child {
            background: linear-gradient(to bottom, #C83C15 0%, fade(#C83C15, 0.6) 100%, transparent);
        }
    }
    .list_child {
      width: 100%;
      height: 100%;
      overflow: hidden;
      transform: rotate(-60deg);
      .list_child_child {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transform: rotate(-60deg);
        position: relative;
        .detail {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .type,
          .total {
            white-space: nowrap;
            color: #fff;
            text-align: center;
          }
          .type {
            font-size: 16px;
          }
          .total {
            font-size: 25px;
            transform: scale(1.5, 2);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
