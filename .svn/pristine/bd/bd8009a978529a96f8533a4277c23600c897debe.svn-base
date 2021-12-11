<template>
    <div>
        <a-card  class="widget" :title="data.name" :bodyStyle="{ padding: 0 }" :bordered="false">
            <div slot="extra" class="extra">
                <a-dropdown>
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                    <a-icon type="more" class="icon" />
                </a>
                <a-menu slot="overlay" @click="onClick($event, data)">
                    <a-menu-item key="1" style="width: 100px; text-align: center">删除</a-menu-item>
                    <a-menu-item key="2" style="width: 100px; text-align: center" class="more" v-if="data.moreurl"><router-link :to="data.moreurl">更多</router-link></a-menu-item>
                </a-menu>
                </a-dropdown>
            </div>
            <component ref="child" :style="{ height: `${weightHeight}px` }" :is="data.componenturi" :rowcount="data.rowcount" class="component" />
            <div :class="['move-handle', {'ispress':ispress}]" v-if="this.data.componenturi==='DocCenter'||this.data.componenturi==='NewMsg'" @mousedown.prevent="dragHeight"></div>
        </a-card>
    </div>
</template>

<script>
import { Card, Icon, Dropdown, Menu } from "ant-design-vue";
import widgets from "../../../widgets";
import { move } from '@antv/g6/lib/util/math';
import { cloneDeep } from 'lodash';
export default {
    components:{
        ACard: Card,
        AIcon: Icon,
        ADropdown: Dropdown,
        AMenu: Menu,
        AMenuItem: Menu.Item,
        ACard: Card,
        ...widgets,
    },
    props:{
        //数据
        data:{
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            ispress: false,//按住move-handle时的样式
            weightHeight: undefined,
        }
    },
    mounted() {
        //初始化高度，解决首次改变高度无法触发过渡动画的问题
        if(this.data.componenturi==='DocCenter'||this.data.componenturi==='NewMsg') {
            this.weightHeight = (this.data.rowcount*28)+20;
        }
    },
    methods:{
        onClick(event, w) {
            this.$emit('onDel',event,w);
        },
        dragHeight() {
            let that = this;
            that.ispress  = true;
            let startY = event.y;
            let height = that.$refs.child.$el.clientHeight;
            //当前元素距离顶部偏移量
            let offsetTop = event.target.offsetParent.getBoundingClientRect().top;
            let actualHeight = startY - offsetTop;
            document.onmousemove = function () {
                let moveY = event.y - startY;
                if(moveY!==0) {
                    //至少显示一个（头部高度40,一行数据高28，上下边距20）
                    if(offsetTop+88<event.y) {
                    //实际高度+鼠标偏移量-handle高度的一半=相对父元素移动距离
                        document.querySelector('.ispress').style.top = Math.max(28,actualHeight+moveY-5)+'px';
                    }
                }
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                let moveY = event.y - startY;
                let weightheight = Math.max(28,height + moveY);
                let rowcount = parseInt(weightheight / 28);
                that.weightHeight = rowcount * 28 + 20;
                that.data.rowcount = rowcount;
                that.$emit('changeRowcount');
                that.ispress  = false;
                //恢复handle位置到底部
                document.querySelector('.ispress').style.top = '';
            };
        },
    }
}
</script>
<style lang="less" scoped>
.widget {
    margin-bottom: 10px;
    transition: height .3s;
    .extra {
      .more {
        color: @text-color-secondary;
      }
      .ant-dropdown-link {
        .icon {
          padding-left: 10px;
          font-size: 18px;
          color: @text-color-secondary;
        }
      }
    }
}
.resize-handle {
    position: absolute;
    width: 100%;
    height: @layout-space-base;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all .3s;
    z-index: 999;
    & span{
        position: absolute;
        cursor: pointer;
        transition: all .3s;
        height: 20px;
        overflow: hidden;
    }
    .add{
        bottom: 75%;
    }
    .reduce{
        top: -20%;
    }
    .addButton:hover{
        color: @primary-color;
        transform: scale(1.5);
        z-index: 0;
    }
    .reduceButton:hover{
        color: @primary-color;
        transform: scale(1.5);
        z-index: 0;
    }
}
.component {
    transition: height .3s;
}
.move-handle {
    position: absolute;
    width: 100%;
    height: 10px;
    z-index: 999;
}
.move-handle:hover {
    cursor: n-resize;
}
.ispress {
    background: @primary-3;
    transition: background-color .3s;
}
.resize-handle:hover{
    cursor: pointer;
    opacity: 1;
}
</style>