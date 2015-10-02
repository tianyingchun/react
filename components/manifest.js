var layoutGroup = {
  // `layout` group.
  "key": "layout",
  "cName": "布局相关",
  "enName": "layout",
  "children": [
    // the router path is */layout/flexlayout
    {
      "name": "flexlayout",
      "cName": "弹性布局素",
      "enName": "FlexLayout"
    }, {
      "name": "scrollarea",
      "cName": "滚动条",
      "enName": "ScrollArea"
    }
  ]
};

var elementGroup = {
  // `elements` group.
  "key": "elements",
  "cName": "HTML元素",
  "enName": "elements",
  "children": [
    // the router path is */layout/flexlayout
    {
      "name": "button",
      "cName": "按钮",
      "enName": "Button"
    }, {
      "name": "table",
      "cName": "表格",
      "enName": "Table"
    }
  ]
};

module.exports = {
  "name": "react",
  "version": "1.0.0",
  "groups": [layoutGroup, elementGroup]
};
