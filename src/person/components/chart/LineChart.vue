<template>
  <div ref="content" class="line-chart" :style="{width: width?`${width}px`:'100%', height: height?`${height}px`:'400px'}">
    <h2 v-if="mainTitle.visible!==false||title" :style="{ ...style }" v-html="mainTitle.value||title"/>
    <h3 v-if="subTitle.visible!==false||subtitle" :style="{ margin: 0, ...subStyle }" v-html="subTitle.value||subtitle"/>
    <div ref="chart" class="chart"></div>
    <div ref="cover" :class="['chart-cover', {cover: isDrag}]">
      <div class="tag"/>
    </div>
    <div class="tag" v-if="allowDrag" @mousedown.stop.prevent="drag()"/>
  </div>
</template>
<script>
import * as G2 from "@antv/g2";
import BaseMixin from "./BaseMixin"
import {properties} from './settings';
import { maxBy, minBy, cloneDeep, get, orderBy, xor, reduce, map, has, keys, groupBy, assign, last, values } from 'lodash';
import { ContinuousLegend } from '@antv/g2/lib/dependents';
/**
 * rangeControl:范围控制
 */
export default {
  icon: 'chart-line',
  title: '折线图',
  name: "LineChart",
	properties: properties,
  mixins: [BaseMixin],
  compts: ['canvas', 'title', 'tooltip', 'legend', 'xAxis', 'yAxis', 'gemo', 'sort'],
  watch: {
    data: {
      handler(v) {
        return v;
      },
      deep: true
    },
    settings: {
      deep:true,
      handler(val,old) {
        if(val!=old) {
          this.draw(this.data)
        }
      }
    },
  },
  data() {
    return {
      dataSource: [],
      currentMoveX: 0,
      currentMoveY: 0,
      isDrag: false,
      plot: undefined,
    };
  },
  computed: {
    width() {
      if(this.settings.canvas) {
        let { width } = this.settings.canvas;
        if(width) {
          return width;
        }
      }
      return undefined;
    },
    height() {
      if(this.settings.canvas) {
        let { height } = this.settings.canvas;
        if(height) {
          return height;
        }
      }
      return undefined;
    },
		title(){
			let { title, context = {}} = this.settings;
			if(title&&typeof title=='string'){
				for(let key in context){
					title = title.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
				}
				return title;
			}
			return undefined;
		},
		subtitle() {
			let { subtitle, context = {}} = this.settings;
			if(subtitle&&typeof title=='string'){
				for(let key in context){
					subtitle = subtitle.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
				}
				return subtitle;
			}
			return undefined;
		},
		muitl(){
			if(this.data){
			  let { keyCols, valueCols, rows } = this.data;
			  return valueCols.length > 1 || keyCols.length > 1;
			}
		},
    position() {
      if(this.settings.title&&this.settings.title.position) {
        let { position } = this.settings.title;
        return { textAlign: position };
      }else{
        return { textAlign: 'center' }
      }
    },
    fontColor() {
      if(this.mainTitle) {
        let { color } = this.mainTitle;
        if(color) {
          return {color: color};
        }
      }
      return {}
    },
    subFontColor() {
      if(this.subTitle) {
        let { color } = this.subTitle;
        if(color) {
          return {color: color};
        }
      }
      return {}
    },
    fontSize() {
      if(this.mainTitle) {
        let { fontSize } = this.mainTitle;
        if(fontSize) {
          return {fontSize: fontSize+'px'};
        }
      }
      return {}
    },
    subFontSize() {
      if(this.subTitle) {
        let { fontSize } = this.subTitle;
        if(fontSize) {
          return {fontSize: fontSize+'px'};
        }
      }
      return {}
    },
    fontWeight() {
      if(this.mainTitle) {
        let { fontWeight } = this.mainTitle;
        if(fontWeight) {
          return { fontWeight: 'bold' };
        }
      }
      return {}
    },
    subFontWeight() {
      if(this.subTitle) {
        let { fontWeight } = this.subTitle;
        if(fontWeight) {
          return { fontWeight: 'bold' };
        }
      }
      return {}
    },
    fontFamily() {
      if(this.settings.title&&this.settings.title.fontFamily) {
        let { fontFamily } = this.settings.title;
        return { fontFamily: fontFamily };
      }else{
        return {}
      }
    },
    style() {
      let v = assign(this.fontColor, this.position, this.fontWeight, this.fontSize, this.fontFamily);
      return v;
    },
    subStyle() {
      let v = assign(this.subFontColor, this.position, this.subFontWeight, this.subFontSize, this.fontFamily);
      return v;
    },
    mainTitle() {
      if(this.settings.title&&this.settings.title.main) {
        let { main } = this.settings.title;
        if(!main) {
          return  {
            visible: true,
            value: undefined,
          }
        }
        if(!has(main,'visible')) {
          main.visible = true;
        }
        return main;
      }else{
        return {
          main: {
            visible: true,
            value: undefined,
          }
        }
      }
    },
    subTitle() {
      if(this.settings.title&&this.settings.title.sub) {
        let { sub } = this.settings.title;
        if(!sub) {
          return  {
            visible: true,
            value: undefined,
          }
        }
        if(!has(sub,'visible')) {
          sub.visible = true;
        }
        return sub;
      }else{
        return {
          sub: {
            visible: true,
            value: undefined,
          }
        }
      }
    },
    xAxis() {
      if(this.settings.xAxis) {
        let { xAxis } = this.settings;
        return xAxis;
      }else{
        return {
          visible: true,
          title: {
            visible: false,
            content: undefined
          }
        }
      }
    },
    yAxis() {
      if(this.settings.yAxis) {
        let { yAxis } = this.settings;
        return yAxis;
      }else{
        return {
          visible: true,
          title: {
            visible: false,
            content: undefined
          }
        }
      }
    },
    label() {
      if(this.settings.gemo) {
        let { label } = this.settings.gemo;
        return label;
      }else{
        return {
          visible: true
        }
      }
    },
    legend() {
      let { legend } = this.settings;
      if(!legend) {
        return  {
          visible: false,
        }
      }
      return legend;
    },
    tooltip() {
      let { tooltip } = this.settings;
      if(!tooltip) {
        return  {
          visible: true,
        }
      }
      return tooltip;
    },
    format() {
      if(this.tooltip) {
        let { format } = this.tooltip;
        if(format) {
          if(!format.unit) {
            format.unit = '';
          }
          if(!format.toFixed) {
            format.toFixed = 0;
          }
          return format;
        }
      }
      return {
        unit: '',
        toFixed: 0,
      };
    },
    color() {
      if(this.settings.gemo) {
        let { color } = this.settings.gemo;
        return color;
      }else{
        return undefined
      }
    },
    exchange() {
      if(this.settings.gemo) {
        let { exchange } = this.settings.gemo;
        return exchange;
      }else{
        return undefined
      }
    },
    slider() {
      if(this.settings.gemo) {
        let { slider } = this.settings.gemo;
        return slider;
      }else{
        return undefined
      }
    },
    colors() {
      if (this.color&&(this.color.length||typeof this.color==='string')) {
        if(typeof this.color==='string') {
          return this.color.split(',');
        }
        return this.color;
      } else {
        let colors = this.$store.getters.getConfig("chart.colors");
        if (colors) {
          try {
            colors = JSON.parse(colors);
            if (colors && colors.length) {
              return colors;
            }
          } catch (err) {}
        }
      }
      return ["#D15456", "#5488D1", "#EDBA55", "#D48265", "#91C7AE", "#749F83", "#BDA29A", "#6E7074", "#585470", "#706254"];
    },
  },
  mounted() {
    this.draw(this.data);
  },
  methods: {
    drag(e) {
      let that = this;
      let startX = event.x;
      let startY = event.y;
      let width = that.$refs.content.offsetWidth;
      let height = that.$refs.content.offsetHeight;
      that.isDrag = true;
      document.onmousemove = function (e) {
        let moveX = e.pageX - startX;
        let moveY = e.pageY - startY;
        if(that.currentMoveX!=event.x&&moveX!=0) {
          that.$refs.cover.style.width = Math.min(1400, Math.max(300, moveX*2+width))+'px';
          that.currentMoveX = event.x;
        }
        if(that.currentMoveY!=event.y&&moveY!=0) {
          that.$refs.cover.style.height = Math.min(1400, Math.max(200, moveY+height))+'px';
          that.currentMoveY = event.y;
        }
      };
      document.onmouseup = function () {
        if(that.$refs.cover.style.width&&that.$refs.cover.style.height) {
          that.$refs.content.style.width = that.$refs.cover.style.width;
          that.$refs.content.style.height = that.$refs.cover.style.height;
          let width = that.$refs.cover.style.width.split('px')[0];
          let height = that.$refs.cover.style.height.split('px')[0];
          that.$set(that.canvas, 'width', width);
          that.$set(that.canvas, 'height', height);
          that.draw(that.data);
        }
        that.isDrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    },
    createData(dataTable) {
      if (!dataTable) {
        return;
      }
      let { keyCols, valueCols, rows } = this.transform(dataTable);
      return this.getRows(rows,keyCols,valueCols);
    },
    getRows(rows,keyCols,valueCols) {
      return rows.map(item => {
        let key, type;
        if(keyCols.length > 1){
          let keys = keyCols.map(k => item[k.column]);
          type = keys.pop();
          key = keys.join("-")
        }else{
          key = item[keyCols[0].column]
        }
        return {
          key, type,
          value: item[valueCols[0].column] || 0
        };
      })
    },
    draw(dataTable) {
      this.dataSource = this.createData(dataTable);
      let data = this.dataSource;
      if (!data) {
        return;
      }
      if (this.plot) {
        this.plot.destroy();
      }
      const chart = new G2.Chart({
        container: this.$refs.chart,
        autoFit: true,
        forceFit: true,
        appendPadding: this.settings.padding || [30, 0, 0, 0],
      });

      const e = document.createEvent('Event')
      e.initEvent('resize', true, true)
      window.dispatchEvent(e);

      let max, min = undefined;
      if(this.settings.rangeControl) {
        if(this.data.rows.length) {
          let v = last(this.data.valueCols).column;
          let array = this.data.rows.filter((item)=>item[v]==undefined||item[v]==0);
          if(!array.length) {
            max = values(maxBy(this.data.rows, (o)=> { return o[v] }))[1];
            min = values(minBy(this.data.rows, (o)=> { return o[v]||0 }))[1];
            if(max===min) {
              min-=20;
              max+=20;
            }
          }
        }
      }

      chart.data(data);
      let xVisible = this.xAxis.visible;
      let yVisible = this.yAxis.visible;
      let xTitleVisible = get(this.xAxis.title, 'visible');
      let yTitleVisible = get(this.yAxis.title, 'visible');
      let xTitleContent = get(this.xAxis.title, 'content');
      let yTitleContent = get(this.yAxis.title, 'content');

      //配置X轴
			if(xVisible!==false) {
				chart.axis('key', {
          title: { 
            style: {
              fill: '#AAAAAA'
            }
          },
          label: {
            autoRotate: true,
          },
          type: "timeCat",
          formatter: (time) => {
            return dateFormat(time, 'yyyy-MM');
          },
          grid: this.xAxis.grid?true:null,
          animate: false
        });
        if(xTitleVisible) {
          chart.scale({
            key: {
              alias: xTitleContent||' '
            },
          });
        }else{
          chart.scale({
            key: {
              alias: ' '
            },
          });
        }
			}else{
				chart.axis('key', false);
			}
      //配置y轴
			if(yVisible!==false) {
				chart.axis('value', {
					title: { 
						style: {
							fill: '#AAAAAA'
						}
					},
					label: {
						autoRotate: true,
					},
					grid: this.yAxis.grid?true:null,
					animate: false
				});
        if(yTitleVisible) {
					chart.scale({
						value: {
							alias: yTitleContent||'记录数',
							nice: true,
              minLimit: min||0,
              maxLimit: max||undefined,
						},
					});
				}else{
					chart.scale({
						value: {
							alias: ' ',
							nice: true,
              minLimit: min||0,
              maxLimit: max||undefined,
						},
					});
				}
			}else{
				chart.axis('value', false);
			}

      //翻转
			if(this.exchange) {
        chart.coordinate().transpose();
			}else{
        chart.coordinate();
			}

      //图形
      let that = this;
      let geometry = chart.line().position("key*value").shape("smooth").tooltip('key*value*type',function (key,value,type) {
        return {
          title: key,
          name: type||key,
          value: value.toFixed(that.format.toFixed) + that.format.unit
        }
      });
      let point = chart.point().position("key*value").shape("breath-point").tooltip(false);
      this.drawPoint();
      if(this.muitl){
        //线
        geometry.color("type", this.colors);
        //线上的点
        point.color("type", this.colors);
      }else{
        //线
        geometry.color(this.colors[0]);
        //线上的点
        point.color(this.colors[0]);
      }

      //是否显示lebal
      if(this.label&&this.label.visible!=false) {
        geometry.label("value", {
          layout: [
            // 数据标签防遮挡
            { type: 'hide-overlap' },
            { type: 'limit-in-plot' },
          ],
          style: {
            fill: this.label.color,
          },
          content: (v)=> {
            return v.value.toFixed(that.format.toFixed)
          }
        });
      }else{
        geometry.label(false);//FIXME 值太多默认不显示
      }
      // 配置图例
      chart.legend(false);
			if(this.legend) {
				if(this.legend.visible) {
          let that = this;
					chart.legend({
						position: this.legend.position,
						flipPage: this.legend.flipPage,
            itemHeight: 15,
						marker: {
							symbol: this.legend.marker,
						},
					});
				}
			}
      //滑块
      if(this.slider) {
        chart.option('slider', {
          backgroundStyle: {
            fill: this.colors[0],
          }
        });
      }
      //提示
      chart.tooltip({
        showCrosshairs: false,//显示辅助线
        showTitle: this.muitl,
        showMarkers: false,
        shared: true,
      })
      if(this.tooltip) {
				if(!this.tooltip.visible) {
					chart.tooltip(false);
				}
			}
      chart.changeData(data);
      this.plot = chart;
    },
    drawPoint(val) {
      const registerShape = G2.registerShape('point', 'breath-point', {
        draw(cfg, container) {
          const point = { x: cfg.x, y: cfg.y };
          const group = container.addGroup();
          //中心点
          group.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 3,
              fill: cfg.color,
              opacity: 1,
            },
          });
          group.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 4.5,
              fill: cfg.color,
              opacity: 0.5,
            },
          });
          group.addShape('circle', {
            attrs: {
              x: point.x,
              y: point.y,
              r: 6.5,
              fill: cfg.color,
              opacity: 0.2,
            },
          });
          return group;
        },
      });
    },
  }
};
</script>
<style lang='less' scoped>
.line-chart {
  // width: 100%;
  // height: 400px;
  padding: @padding-sm;
  display: flex;
  flex-direction: column;
  position: relative;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  /deep/.chart {
    height: 100%;
    display: flex;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .chart-cover {
    display: none;
  }
  .cover {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: fade(#fff, 50%);
    border: 2px solid #e8e8e8;
  }
  .tag {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 0;
    bottom: 0;
    border-right: 5px solid #979797;
    border-bottom: 5px solid #979797;
    cursor: nw-resize;
  }
  h2 {
    margin: 0;
  }
  div {
    flex: 1;
  }
}
</style>