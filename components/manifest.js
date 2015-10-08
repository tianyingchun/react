var layouts = {
  // `layout` group.
  "key": "layout",
  "cName": "布局相关",
  "enName": "Layout",
  "children": [
    // the router path is */layout/flexlayout
    {
      "key": "flexlayout",
      "cName": "弹性布局素",
      "enName": "FlexLayout"
    }, {
      "key": "scrollarea",
      "cName": "滚动条",
      "enName": "ScrollArea"
    }, {
      "key": "scrollbar",
      "cName": "滚动条2",
      "enName": "Scrollbar"
    }, {
      "key": "iscroll",
      "cName": "滚动条(m)",
      "enName": "IScroll"
    }
  ]
};

var elements = {
  // `elements` group.
  "key": "elements",
  "cName": "HTML元素",
  "enName": "Elements",
  "children": [
    {
      "key": "button",
      "cName": "按钮",
      "enName": "Button"
    }, {
      "key": "table",
      "cName": "表格",
      "enName": "Table"
    }
  ]
};

var navs = {
  // `navs` group.
  "key": "navs",
  "cName": "导航相关",
  "enName": "Navs",
  "children": [
    {
      "key": "menu",
      "cName": "导航菜单",
      "enName": "Menu"
    }, {
      "key": "breadcrumb",
      "cName": "面包屑",
      "enName": "Breadcrumb"
    }
  ]
};

var commons = {
  // `commons` group.
  "key": "commons",
  "cName": "常用组件",
  "enName": "Common",
  "children": [
    {
      "key": "icon",
      "cName": "图标",
      "enName": "Icon"
    }
  ]
};
var forms = {
  // `forms` group.
  "key": "forms",
  "cName": "表单相关",
  "enName": "Forms",
  "children": [
    {
      "key": "select",
      "cName": "选择器",
      "enName": "select"
    }
  ]
};

var interactive = {
  // `interactive` group.
  "key": "interactive",
  "cName": "交互组件",
  "enName": "Interactive",
  "children": [
    {
      "key": "draggable",
      "cName": "拖动部件",
      "enName": "Draggable"
    },
    {
      "key": "message",
      "cName": "全局消息",
      "enName": "Message"
    },
    {
      "key": "tag",
      "cName": "标签",
      "enName": "Tag"
    },
    {
      "key": "dropdown",
      "cName": "下拉菜单",
      "enName": "Dropdown"
    },
    {
      "key": "popconfirm",
      "cName": "气泡确认框",
      "enName": "Popconfirm"
    },
    {
      "key": "alert",
      "cName": "警告框",
      "enName": "Alert"
    }
  ]
};
var others = {
  // `others` group.
  "key": "others",
  "cName": "其他组件",
  "enName": "Others",
  "children": []
};
module.exports = {
  "name": "react",
  "version": "1.0.0",
  "groups": [layouts, elements, navs, commons, forms, interactive, others]
};
