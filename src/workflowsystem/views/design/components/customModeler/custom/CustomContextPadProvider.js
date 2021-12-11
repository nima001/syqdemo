//自定义元素右边可见的图标
import { batchCreateCustom } from './CustomUtil'

export default function ContextPadProvider(config, injector, contextPad, modeling, elementFactory, connect, create) {
  this.modeling = modeling;
  this.elementFactory = elementFactory;
  this.connect = connect;
  this.create = create;
  config = config || {};

  if (config.autoPlace !== false) {
    this.autoPlace = injector.get("autoPlace", false);
  }

  contextPad.registerProvider(this);
}

ContextPadProvider.$inject = ["config.contextPad", "injector", "contextPad", "modeling", "elementFactory", "connect", "create"];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const { autoPlace, create, elementFactory, modeling, connect } = this;

  function appendAction(type, className, title, options) {
    function appendStart(event, element) {
      var shape = elementFactory.createShape({ type,... options});
      create.start(event, shape, {
        source: element
      });
    }

    var append = autoPlace
      ? function (event, element) {
        var shape = elementFactory.createShape(
          { type, ...options}
        );
        autoPlace.append(element, shape);
      }
      : appendStart;

    return {
      group: 'model',
      className,
      title,
      action: {
        dragstart: appendStart,
        click: append
      }
    };
  }

  function addGroupElement(group,className,title,operation){
    return { group, className, title, action: operation }
  }

  function startConnect(event, element) {
    connect.start(event, element);
  }

  function removeElement(e) {
    modeling.removeElements([element]);
  }

  function clickElement(e) {
    // store.commit("SETNODEINFO", element);
    // store.commit("TOGGLENODEVISIBLE", true);
  }

  var actions = {};

  const elements = [
    {
      type:'create.end-event',
      action: ['bpmn:EndEvent', 'bpmn-icon-end-event-none', '结束事件']
    },
    {
      type:'create.user-task',
      action: ['bpmn:UserTask', 'bpmn-icon-user-task', '用户任务']
    },
    {
      type:'create.servicetask',
      action: ['bpmn:ServiceTask', 'bpmn-icon-service-task', '服务任务']
    },
    {
      type:'create.exclusive-gateway',
      action: ['bpmn:ExclusiveGateway', 'bpmn-icon-gateway-xor', '互斥网关']
    },
    {
      type:'create.parallel-gateway',
      action: ['bpmn:ParallelGateway', 'bpmn-icon-gateway-parallel', '并行网关']
    },
  ];

  let elementType = element.type;

  //显示创建下一个节点类型的按钮
  if(['bpmn:StartEvent', 'bpmn:UserTask', 'bpmn:ServiceTask', 'bpmn:ExclusiveGateway', 'bpmn:ParallelGateway'].indexOf(elementType) > -1){
    actions = {
      ...actions,
      ...batchCreateCustom(elements, appendAction),//流程元素
      "connect": {group: "edit",className: "bpmn-icon-connection", title: "连线工具", action: { click: startConnect, dragstart: startConnect }}//连线工具
    };
  }
 
  const groupElement = [
    {
      type:'lane-insert-above',
      action: ['lane-insert-above','bpmn-icon-lane-insert-above', '添加泳道（上方）', { click: function (event, element) {modeling.addLane(element, "top");}}]
    },
    {
      type:'lane-insert-below',
      action: ['lane-insert-below','bpmn-icon-lane-insert-below', '添加泳道（下方）', { click: function (event, element) {modeling.addLane(element, "bottom");}}]
    }
  ];

  //添加泳道按钮
  if(['bpmn:Lane', 'bpmn:Participant'].indexOf(elementType) > -1){
    actions = {
      ...actions,
      ...batchCreateCustom(groupElement, addGroupElement),
    };
  }

  //添加删除按钮
  actions = {
    ...actions,
    "delete": { group: "edit", className: "bpmn-icon-trash", title: "移除", action: { click: removeElement } }
  };

  //添加属性按钮
  if(['bpmn:UserTask', 'bpmn:ServiceTask', 'bpmn:ExclusiveGateway', 'bpmn:CallActivity'].indexOf(elementType) > -1){
    actions = {
      ...actions,
      "edit": {group: "property",className: "bpmn-icon-business-rule",title: "属性",action: {click: clickElement}}
    };
  }

  return actions;
};
