

import ColorPopover from "@/person/views/statistics/chart/components/ColorPopover";
import ColorPicker from "@/person/views/statistics/chart/components/ColorPicker";
import BaseInput from "@/person/views/statistics/chart/components/BaseInput";
import TitleInput from "@/person/views/statistics/chart/components/TitleInput";
import LegendSetting from "@/person/views/statistics/chart/components/LegendSetting";
import EditColor from '@/person/views/statistics/chart/components/EditColor';
import Range from '@/person/views/statistics/chart/components/Range';

  const fonts = [
    { label:'宋体', value: 'SimSun' },
    { label:'黑体', value: 'SimHei' },
    { label:'微软雅黑', value: 'Microsoft YaHei' },
    { label:'微软正黑体', value: 'Microsoft JhengHei' },
    { label:'新宋体', value: 'NSimSun' },
    { label:'新细明体', value: 'PMingLiU' },
    { label:'细明体', value: 'MingLiU' },
    { label:'标楷体', value: 'DFKai-SB' },
    { label:'仿宋', value: 'FangSong' },
    { label:'楷体', value: 'KaiTi' },
    { label:'仿宋_GB2312', value: 'FangSong_GB2312' },
    { label:'楷体_GB2312', value: 'KaiTi_GB2312' }
  ];
  const position = [
    { label: "左", value: "left" },
    { label: "居中", value: "center" },
    { label: "右", value: "right" },
  ];
  const header = {
    color: {
      title: '字体色',
      type: 'object',
      defaultValue: '#000',
      extra: ColorPicker
    },
    background: {
      title: '背景色',
      type: 'object',
      defaultValue: '#fafafa',
      extra: ColorPicker
    }
  };
  const body = {
    color: {
      title: '字体色',
      type: 'object',
      defaultValue: '#000',
      extra: ColorPicker
    },
    background: {
      title: '背景色',
      type: 'object',
      defaultValue: '#fff',
      extra: ColorPicker
    }
  };
  const titleProp = {
    enable: {
      path: ".visible",
      title: "启用",
      type: "boolean",
      defaultValue: true,
    },
    value: {
      path: ".value",
      title: "内容",
      extra: TitleInput,
    },
    fontSize: {
      path: ".fontSize",
      title: "大小",
      type: "number",
    },
    color: {
      path: ".color",
      title: "颜色",
      type: "object",
      extra: ColorPicker,
    },
    fontWeight: {
      path: ".fontWeight",
      title: "加粗",
      type: "boolean",
      defaultValue: true,
    },
  };
  const axisProp = {
    enable: {
      path: ".visible",
      title: "启用",
      type: "boolean",
      defaultValue: true,
    },
    title: {
      title: "标题",
      type: "object",
      proxy: "enable",
      defaultValue: true,
      properties: {
        enable: {
          path: ".visible",
          type: "boolean",
        },
        content: {
          path: ".content",
          title: "内容",
          type: "string",
        },
      },
    },
  };
  const sortArray = [
	{ label: "升序", value: "ASC" },
	{ label: "降序", value: "DESC" },
	{ label: "还原", value: "RECOVER" },
  ];
  const markers = [
	{ label: "方形", value: "square" },
	{ label: "圆形", value: "circle" },
	{ label: "叉号", value: "cross" },
	{ label: "加号", value: "plus" },
	{ label: "三角形", value: "triangle" },
	{ label: "线", value: "line" },
	{ label: "菱形", value: "diamond" },
	{ label: "勾", value: "tick" },
	{ label: "六角形", value: "hexagon" },
	{ label: "倒三角形", value: "triangle-down" },
	{ label: "蝴蝶结", value: "bowtie" },
	{ label: "连字符", value: "hyphen" },
  ];
  export let properties = {
    //表格
    table: {
      title: '表格',
      type: 'object',
      properties: {
        lineHeight: {
          title: '行高',
          type: 'boolean',
          defaultValue: 32,
          min: 1,
          extra: BaseInput,
        },
        bordered: {
          title: '边框',
          type: 'boolean',
          proxy: 'enable',
        },
        sumPosition: {
          title: '合计',
          type: 'enum',
          defaultValue: 1,
          attrs: {
            tile: true,
            options: [
              {label: '顶部', value: 1},
              {label: '底部', value: 0}
            ]
          }
        }
      },

      
        // bordered: false,//是否需要表格边框
        // lineHeight: undefined,//行高
        // headBackgroundColor: undefined,//表头背景色
        // bodyBackgroundColor: undefined,//表体背景色
        // bodyColor: undefined,//表体字体颜色
        // headColor: undefined,//表头字体颜色
        // sumPosition: 1,//合计位置 1-顶部 0-底部
    },
    header: {
      title: '表头',
      type: 'object',
      properties: header
    },
    body: {
      title: '表体',
      type: 'object',
      properties: body
    },
    //画布
    canvas: {
      title: "画布",
      type: "object",
      properties: {
        width: {
          path: ".width",
          title: "宽度",
          min: 300,
          defaultValue: null,
          extra: BaseInput,
        },
        height: {
          path: ".height",
          title: "高度",
          min: 200,
          defaultValue: 400,
          extra: BaseInput,
        },
      },
    },
    //标题
    title: {
      title: "标题",
      type: "object",
      properties: {
        main: {
          title: "主标题",
          type: "object",
          proxy: "enable",
          defaultValue: true,
          properties: {
            ...titleProp,
          },
        },
        sub: {
          title: "副标题",
          type: "object",
          proxy: "enable",
          defaultValue: true,
          properties: {
            ...titleProp,
          },
        },
        fontFamily: {
          path: '.fontFamily',
          title: '字体',
          type: 'enum',
          defaultValue: 'FangSong',
          attrs: {
            options: fonts,
          },
        },
        position: {
          path: '.position',
          title: '位置',
          type: 'enum',
          defaultValue: 'center',
          attrs: {
            tile: true,
            options: position,
          }
        }
      },
    },
    //提示
    tooltip: {
      title: "提示",
      type: "object",
      proxy: "enable",
      defaultValue: true,
      properties: {
        enable: {
          path: ".visible",
          title: "启用",
          type: "boolean",
        },
        //单位
        unit: {
          path: ".format.unit",
          title: "单位",
          type: "string",
        },
          //保留小数位数
        toFixed: {
          path: ".format.toFixed",
          title: "小数",
          type: "number",
        },
      },
    },
    //图例
    legend: {
      title: "图例",
      type: "object",
      proxy: "enable",
      defaultValue: true,
      properties: {
        enable: {
          path: ".visible",
          title: "启用",
          type: "boolean",
        },
        position: {
          title: '位置',
          path: '.position',
          defaultValue: 'top-center',
          extra: LegendSetting,
        },
        flipPage: {
          path: ".flipPage",
          title: "翻页",
          defaultValue: true,
          type: "boolean",
        },
        symbol: {
          path: ".marker",
          title: "标志",
          type: "enum",
          defaultValue: 'square',
          attrs: {
            options: markers,
          },
        },
      },
    },
    //x轴
    xAxis: {
      title: "x轴",
      type: "object",
      proxy: "enable",
      defaultValue: true,
      properties: {
        ...axisProp,
        xGrid: {
          path: ".grid",
          title: "网格线",
          type: "boolean",
        },
      },
    },
    //y轴
    yAxis: {
      title: "y轴",
      type: "object",
      proxy: "enable",
      defaultValue: true,
      properties: {
        ...axisProp,
        percent: {
          path: '.percent',
          title: "转换为比例",
          type: "boolean",
          defaultValue: false,
        },
        yGrid: {
          path: ".grid",
          title: "网格线",
          type: "boolean",
          defaultValue: true,
        },
      },
    },
    //图形属性
    gemo: {
      title: "图形属性",
      type: "object",
      properties: {
        size: {
          path: ".size",
          title: "柱宽",
          type: "number",
        },
        color: {
          path: ".color",
          title: "色卡",
          type: "object",
          defaultValue: ["#4c84ff", "#72c2ff", "#82e1fc", "#1dbb8a", "#8fe94e", "#fbc800", "#ed9421", "#f25f93", "#ef8bcf", "#c562f1"],
          extra: ColorPopover,
          content: EditColor,
        },
        label: {
          title: "标签",
          type: "object",
          proxy: "enable",
          defaultValue: true,
          properties: {
            enable: {
              path: ".visible",
              type: "boolean",
            },
            color: {
              path: ".color",
              title: "颜色",
              defaultValue: '#000',
              extra: ColorPicker,
            },
          },
        },
        background: {
          path: ".background",
          title: "背景色",
          type: "boolean",
        },
        annotation: {
          path: ".annotation",
          title: "标注",
          type: "boolean",
        },
        exchange: {
          path: '.exchange',
          title: '翻转',
          type: 'boolean',
        },
        slider: {
          path: ".slider",
          title: "滑块",
          type: "boolean",
        },
      },
    },
    //数据操作
    sort: {
      title: "数据操作",
      type: "object",
      properties: {
        type: {
          path: ".type",
          title: "排序",
          type: "enum",
          attrs: {
            options: sortArray,
          },
        },
        mergeOther: {
          path: '.mergeOther',
          title: '合并',
          defaultValue: false,
          type: 'boolean',
        },
        range: {
          path: '.range',
          title: '截取',
          extra: Range
        }
      },
    },
  };