/**
 * 自定义左边面板可见的图标
*/
import { batchCreateCustom } from './CustomUtil'

export default function PaletteProvider(palette, create, elementFactory, handTool, lassoTool, spaceTool, globalConnect, translate) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.handTool = handTool;
  this.lassoTool = lassoTool;
  this.spaceTool = spaceTool;
  this.globalConnect = globalConnect;
  this.translate = translate;
  palette.registerProvider(this);
}

PaletteProvider.$inject = ["palette", "create", "elementFactory", "handTool", "lassoTool", "spaceTool", "globalConnect", "translate"];

PaletteProvider.prototype.getPaletteEntries = function (element) {
  const {create, elementFactory, handTool, lassoTool, spaceTool, globalConnect} = this;

  //创建工具栏方法
  function createTool (group, className, title, operation) {
    return { group, className, title, action: operation }
  }

  //创建流程元素方法
  function createElement(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape({type ,...options});
      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }
      create.start(event, shape);
    }
    return {group, className, title, action: { dragstart: createListener, click: createListener }};
  }

  /**
   * 工具栏
   */
  const tools = [
    {
      type:'hand-tool',
      action: ['tools', 'bpmn-icon-hand-tool', '抓手工具', { click: function(event){handTool.activateHand(event);} }]
    },
    {
      type:'lasso-tool',
      action: ['tools', 'bpmn-icon-lasso-tool','套索工具', { click:function(event){ lassoTool.activateSelection(event); } }] 
    },
    {
      type:'space-tool',
      action: ['tools', 'bpmn-icon-space-tool', '添加/移除空间工具', { click:function(event){ spaceTool.activateSelection(event); } }]
    },
    {
      type:'global-connect-tool',
      action: ['tools', 'bpmn-icon-connection', '连线工具', { click:function(event){ globalConnect.toggle(event); } }]
    }
  ];

  /**
   * 流程元素
   */
  const elements = [
    {
      type:'create.start-event',
      action: ['bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none', '开始事件']
    },
    {
      type:'create.end-event',
      action: ['bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none', '结束事件']
    },
    {
      type:'create.user-task',
      action: ['bpmn:UserTask','activity', 'bpmn-icon-user-task', '用户任务']
    },
    {
      type:'create.servicetask',
      action: ['bpmn:ServiceTask', 'activity', 'bpmn-icon-service-task', '服务任务']
    },
    {
      type:'create.call-activity',
      action: ['bpmn:CallActivity', 'activity', 'bpmn-icon-call-activity', '调用活动']
    },
    {
      type:'create.exclusive-gateway',
      action: ['bpmn:ExclusiveGateway','gateway', 'bpmn-icon-gateway-xor', '互斥网关']
    },
    {
      type:'create.parallel-gateway',
      action: ['bpmn:ParallelGateway','gateway', 'bpmn-icon-gateway-parallel', '并行网关']
    },
    {
      type:'create.participant',
      action: ['bpmn:Participant','collaboration', 'bpmn-icon-participant', '泳池/泳道']
    }
  ]

  //返回左边的操作面板
  return {
    ...batchCreateCustom(tools, createTool),//工具栏
    "tool-separator": { group: "tools",  separator: true },//分割线
    ...batchCreateCustom(elements, createElement),//流程元素
  };
};
