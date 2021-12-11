<template>
  <a-carousel
    arrows
    dots-class="slick-dots slick-thumb"
    :after-change="change"
  >
    <div slot="prevArrow" class="custom-slick-arrow" :style="pretBtn">
      <div class="preBtn"></div>
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" :style="nextBtn">
      <div class="nextBtn"></div>
    </div>
    <a slot="customPaging"></a>
    <slot name="content"></slot>
  </a-carousel>
</template>
<script>
import { Carousel } from "ant-design-vue";
export default {
  components: {
    ACarousel: Carousel,
  },
  props: {
    pretBtn: {
      type: Object,
      default: () => {
        return {};
      },
    },
    nextBtn: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    change(page) {
      this.$emit("input", page);
    },
  },
};
</script>
<style scoped>
.preBtn {
  width: 40px;
  height: 40px;
  background: url("../../../assets/img/screen/slick-arrow.png") center center no-repeat;
}
.publicWelfare >>> .preBtn {
  margin-top: -18px;
}
.capsuleSlide >>> .preBtn {
  transform: translateX(-25px);
}
.interface-info >>> .custom-slick-arrow {
  display: none!important;
}
.interface-info >>> .preBtn {
  display: none;
}
.nextBtn {
  width: 40px;
  height: 40px;
  background: url("../../../assets/img/screen/slick-arrow.png") center center no-repeat;
  transform: rotateY(180deg);
}
.publicWelfare >>> .nextBtn {
  margin-top: -18px;
}
.capsuleSlide >>> .nextBtn {
  transform: translateX(25px);
}
.interface-info >>> .nextBtn {
  display: none;
}
.ant-carousel {
  width: 100%;
  height: 100%;
}
.ant-carousel >>> .slick-slider {
  width: 100%;
  height: 100%;
}

.ant-carousel >>> .slick-list {
  width: 100%;
  height: 100%;
  padding-bottom: 36px;
}
.ant-carousel >>> .slick-list .slick-track {
  height: 100%;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  bottom: 0px;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.publicWelfare >>> .slick-dots {
  bottom: -20px;
}
.ant-carousel >>> .slick-thumb li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
}
.ant-carousel >>> .slick-thumb li a {
  width: 12px;
  height: 12px;
  display: block;
  background: #8fc7ff;
  border-radius: 50%;
  opacity: 0.4;
  cursor: pointer;
  background: url("../../../assets/img/screen/slick-dot.png") center center no-repeat;
}
.ant-carousel >>> .slick-thumb li.slick-active {
  width: 26px;
  height: 26px;
}
.ant-carousel >>> .slick-thumb li.slick-active a {
  width: 12px;
  height: 12px;
  opacity: 1;
  background: url("../../../assets/img/screen/slick-dot-active.png") center center no-repeat;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 40px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: -18px;
}
</style>
