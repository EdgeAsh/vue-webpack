import store from './../store/App/index';
/**
 * @Title: 公共-工具类提供一些便捷地工具服务
 * @Author: Edge
 * @Date: 2018/06/11 22:00
 * @Version V2.0.2
 *
 * =====================================================================
 * @Description: 工具索引
 *     1、getArrName 在 key name 数组中 获取 name
 *     2、getArrTitle 在 key title 集合中 获取 title
 * =====================================================================
 */
let util = {
  url: {
    getParam (name) {
      var val = this.getParamMap()[name];
      return util.object.isNotNull(val) ? val : null;
    },
    getParamKeys () {
      return util.map.keys(this.getParamMap());
    },
    getParamVals () {
      return util.map.vals(this.getParamMap());
    },
    getParamMap () {
      return this.paramStringToMap((window.location.search || "").replace(/^\?/, ""));
    },
    paramStringToMap (str) {
      if (util.string.isBlank(str)) {
        return {};
      }
      var entrys = str.replace(/\+/g, ' ').split('&');
      var entry;
      var map = {};
      var k;
      var v;
      for (var i in entrys) {
        if (!entrys.hasOwnProperty(i)) continue;
        entry = entrys[i].split('=');
        k = decodeURIComponent(entry[0]);
        v = entry[1];
        v && (v = decodeURIComponent(v));
        map[k] = v;
      }
      return map;
    },
    mapToParamString (m) {
      if (util.map.isEmpty(m)) {
        return '';
      }
      var keys = util.map.keys(m);
      var url = '';
      for (var i = 0, len = keys.length, key, val; i < len; i++) {
        key = keys[i];
        val = m[key];
        if (i !== 0) {
          url += '&';
        }
        url += encodeURIComponent(key);
        if (typeof val !== 'undefined') {
          url += '=' + encodeURIComponent(val);
        }
      }
      return url;
    }
  },
  object: {
    isObject (obj) {
      return typeof obj === 'object';
    },
    isFunction (obj) {
      return typeof obj === 'function';
    },
    isArray (obj) {
      return this.isNotNull(obj) && obj.constructor === Array;
    },
    isNull (obj) {
      return typeof obj === "undefined" || obj === null;
    },
    isNotNull (obj) {
      return !this.isNull(obj);
    },
    getChildrenPath (obj, c, k) {
      if (this.isNull(obj)) {
        return null;
      }
      if (obj === c) {
        return k;
      }
      if (this.isObject(obj)) {
        var v;
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          v = this.getChildrenPath(obj[key], c, key);
          if (util.string.isNotBlank(v)) {
            return (util.string.isNotBlank(k) ? k + '.' : '') + v;
          }
        }
      }
      return null;
    }
  },
  string: {
    /**
     * 转义HTML为&的形式
     * @param str
     * @returns {string}
     */
    escapeHtml: function (str) {
      if (!str) {
        return null;
      }
      str = str + '';
      str = str.replace(/&/ig, "&amp;");
      str = str.replace(/</ig, "&lt;");
      str = str.replace(/>/ig, "&gt;");
      str = str.replace(/"/ig, "&quot;");
      str = str.replace(/ /ig, "&nbsp;");
      return str;
    },
    trim: function (str) {
      return util.object.isNull(str) ? '' : (str + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    isBlank: function (str) {
      return util.object.isNull(str) || this.trim(str).length === 0;
    },
    isNotBlank: function (str) {
      return !this.isBlank(str);
    },
    isEmpty: function (str) {
      return util.object.isNull(str) || ("" + str).length === 0;
    },
    isNotEmpty: function (str) {
      return !this.isEmpty(str);
    },
    equalsIgnoreCase: function (a, b) {
      if (util.object.isNull(a) || util.object.isNull(b)) {
        return false;
      }
      return ('' + a).toLowerCase() === ('' + b).toLowerCase();
    },
    buildTpl: function (tpl, data) {
      let re = /\{%=?((?!%}).|\r|\n)*%}/g;
      let code = "var r = [];";
      let cursor = 0;
      let match;

      function add (str, mode) {
        if (util.string.isEmpty(str)) {
          return add;
        }

        if (mode === 1) {
          code += str + '\r';
        } else if (mode === 2) {
          code += "r.push(" + str + ");";
        } else {
          code += "r.push('" + str.replace(/'/g, "\\'").replace(/\s*([\r\n])\s*/g, ' ') + "');";
        }
        return add;
      }

      while ((match = re.exec(tpl))) {
        add(tpl.slice(cursor, match.index))(match[0].replace(/(^\{%=|^\{%|%}$)/g, ""), /^(\t| )*\{%=/g.test(match[0]) ? 2 : 1);
        cursor = match.index + match[0].length;
      }
      add(tpl.substr(cursor));
      code += 'return r.join("");';

      var runFn = function (d) {
        var Fn = Function;
        return (new Fn(util.map.keys(d).join(","), code)).apply(null, util.map.vals(d));
      };
      if (util.object.isNotNull(data)) {
        return runFn(data);
      } else {
        return runFn;
      }
    }
  },
  list: {
    isEmpty: function (l) {
      return util.object.isNull(l) || l.length < 1;
    },
    isNotEmpty: function (l) {
      return !util.list.isEmpty(l);
    },
    stringToList: function (s) {
      return s && s.length > 0 ? (typeof s === 'string' ? s.split(',') : s) : [];
    },
    find: function (l, k, v, j) {
      var n = [];
      if (util.list.isNotEmpty(l)) {
        for (var i = 0, len = l.length, r; i < len; i++) {
          r = l[i];
          if (j ? r[k] === v : '' + r[k] === '' + v) n.push(r);
        }
      }
      return n;
    },
    indexOf: function (l, k, v, b, j) {
      var n = -1;
      if (util.list.isNotEmpty(l)) {
        for (var i = b || 0, len = l.length, r; i < len; i++) {
          r = l[i];
          if (j ? r[k] === v : '' + r[k] === '' + v) {
            n = i;
            break;
          }
        }
      }
      return n;
    }
  },
  map: {
    mapsExtVal: function (maps, key) {
      var list = [];
      for (var i = 0, len = maps.length; i < len; i++) {
        list.push(maps[i][key]);
      }
      return list;
    },
    listToMap: function (list, key) {
      if (util.object.isNull(list) || util.string.isEmpty(key)) {
        return null;
      }
      var map = {};
      var row;
      for (var i = 0, len = list.length; i < len; i++) {
        row = list[i];
        map[row[key]] = row;
      }
      return map;
    },
    isEqualForString: function (a, b) {
      return util.map.isEqual(a, b, null, true);
    },
    isEmpty: function (m) {
      return util.object.isNull(m) || this.keys(m).length < 1;
    },
    isNotEmpty: function (m) {
      return !this.isEmpty(m);
    },
    isEqual: function (a, b, isWeak, isString) {
      if (util.object.isNull(a) && util.object.isNull(b)) {
        return true;
      }
      if (util.object.isNull(a) || util.object.isNull(b)) {
        return false;
      }
      var aks = this.keys(a);
      var bks = this.keys(b);
      var aksl = aks.length;
      var bksl = bks.length;
      if (aksl !== bksl) {
        return false;
      }
      for (var i = 0; i < aksl; i++) {
        if (isWeak || isString ? '' + a[aks[i]] !== '' + b[aks[i]] : a[aks[i]] !== b[aks[i]]) {
          return false;
        }
      }
      return true;
    },
    keys: function (m) {
      var keys = [];
      for (var key in m) {
        if (m.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    },
    vals: function (m) {
      var l = [];
      var keys = util.map.keys(m);
      for (var i = 0, len = keys.length; i < len; i++) {
        l.push(m[keys[i]]);
      }
      return l;
    }
  },
  color: {
    RGBToHex: function (r, g, b) {
      var rgb = '';
      if (util.object.isNull(g) || util.object.isNull(b)) {
        if (!(/^rgba/).test(r.toLowerCase())) {
          r = r.replace(/[^\d,]/g, '').split(',');
          b = r[2];
          g = r[1];
          r = r[0];
          rgb = '#' + toHex(r) + toHex(g) + toHex(b);
        } else {
          rgb = '';
        }
      } else {
        rgb = '#' + toHex(r) + toHex(g) + toHex(b);
      }
      return rgb;

      function toHex (s) {
        return parseInt(s, 10).toString(16).replace(/^(.)$/, '0$1');
      }
    },
    HexToRGB: function (hex) {
      hex = hex.replace(/[^0-9a-fA-F]/g, '');
      if (hex.length === 3) {
        hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
      }
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return ['rgb(' + r + ', ' + g + ', ' + b + ')', {
        r: r,
        g: g,
        b: b
      }];
    }
  },
  json: {
    toString: function (j) {
      return j ? (typeof j === 'string' ? j : JSON.stringify(j)) : '';
    },
    parse: function (s) {
      return s ? (typeof s === 'string' ? JSON.parse(s) : s) : null;
    },
    cloneObject: function (obj) {
      if (util.object.isNull(obj)) {
        return null;
      }
      return JSON.parse(JSON.stringify(obj));
    }
  },
  fnQueue: {
    queue: {
      default: []
    },
    getQueue: function (queue) {
      var that = this;
      return typeof queue === 'string' ? (that.queue[queue] || (that.queue[queue] = [])) : queue || that.queue.default;
    },
    clear: function (queue) {
      var that = this;
      that.getQueue(queue).length = 0;
    },
    add: function (fn, queue, i) {
      var that = this;
      typeof fn === 'function' && that.getQueue(queue).push({
        fn: fn,
        i: i || 999999
      });
      that.getQueue(queue).sort(function (a, b) {
        return a.i - b.i;
      });
    },
    run: function (queue) {
      for (var q = this.getQueue(queue), i = 0, fn; i < q.length || (q.length = 0, false); i++) {
        fn = (q[i] || {}).fn;
        fn();
      }
    }
  },
  css: {
    classStyle: function (className, style, val) {
      var cssRules = document.all ? 'rules' : 'cssRules';
      var reg = className.constructor == RegExp;
      var t;
      var d;
      for (var i = 0, len = document.styleSheets.length; i < len; i++) {
        for (var k = 0, size = document.styleSheets[i][cssRules] ? document.styleSheets[i][cssRules].length : 0; k < size; k++) {
          d = document.styleSheets[i]['rules'][k];
          t = d.selectorText;
          if (reg ? className.test(t) : t === className) {
            return util.object.isNull(style) ? d : (util.object.isNull(val) ? d.style[style] : (d.style[style] = val));
          }
        }
      }
      return null;
    },
    addClass: function (styleEle, selector, rules, index) {
      if (styleEle.constructor !== HTMLStyleElement) {
        var style = document.createElement('style');
        style.type = 'text/css';
        (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
        index = rules;
        rules = selector;
        selector = styleEle;
        styleEle = style;
      }
      var sheet = styleEle.sheet || styleEle.styleSheet;
      index = util.object.isNull(index) ? (sheet.rules || sheet.cssRules).length : index;
      if (sheet.insertRule) {
        sheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        sheet.addRule(selector, rules, index);
      }
      return styleEle;
    }
  }
};
/**
 * @Title: 1、在 key name 集合中 获取 name
 * @Author: Edge
 * @Date: 2018/06/11 22:00
 * @Version V2.0.2
 *
 * @param arr [{key: "1", name: "待支付"}, {key: "2", name: "待开始"}, {key: "3", name: "待交付"}]
 * @param key 1
 * @return string name
 *
 * @Description:
 * // Mad Dragon 【 395548460@qq.com 】 2017/11/24 11:01  find IE不兼容，用下面方式替换
 */
util.getArrName = function (arr = [], key = "") {
  let name = '';
  if (key == undefined || key == null) {
    return '';
  }
  arr.map(function (e) {
    if (e.key == key) {
      name = e.name;
    }
  });
  return name;
};
/**
 * @Title: 2、在 key title 集合中 获取 title
 * @Author: Edge
 * @Date: 2018/06/11 22:00
 * @Version V2.0.2
 *
 * @param arr [{key: "1", title: "待支付"}, {key: "2", title: "待开始"}, {key: "3", title: "待交付"}]
 * @param key 1
 * @return string title
 *
 * @Description:
 * // Mad Dragon 【 395548460@qq.com 】 2017/11/24 11:01  find IE不兼容，用下面方式替换
 */
util.getArrTitle = function (arr = [], key = "") {
  let title = '';
  if (key == undefined || key == null) {
    return '';
  }
  arr.map(function (e) {
    if (e.key == key) {
      title = e.title;
    }
  });
  return title;
};
/**
 * @Title: 获取当前所在页面权限的id和Name
 * @Author: Edge
 * @Date: 2018/06/11 22:00
 * @Version V1.0.0
 */
util.getRouterIdAndName = function (name) {
  const list = store.state.access;
  let rountItem = list.filter(
    item => {
      return item['authName'] == name;
    }
  );
  const obj = {
    name: 'record-log',
    query: {
      id: rountItem[0] ? rountItem[0]['id'] : -1
    }
  };
  return obj;
};

export default util;
