export default {
  //设置cookie
  setCookie: (name, value, hours, path) => {
    name = escape(name);
    value = escape(value);
    let expires = new Date();
    expires.setTime(expires.getTime() + hours * 3600000);
    path = path == "" ? "" : ";path=" + path;
    let _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
  },
  // 获取cookie值
  getCookieValue: (name) => {
    name = escape(name);
    // 读cookie属性，这将返回文档的所有cookie
    let allcookies = document.cookie;
    //查找名为name的cookie的开始位置
    name += "=";
    let pos = allcookies.indexOf(name);
    // 如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1) {
      // 如果pos值为-1则说明搜索"version="失败
      let start = pos + name.length; // cookie值开始的位置
      let end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
      if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie
      let value = allcookies.substring(start, end); //提取cookie的值
      return (value); // 对它解码
    } else return ""; // 搜索失败，返回空字符串
  },
  //删除cookie
  deleteCookie: (name, path) => {
    var expires = new Date(0);
    name = escape(name);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
  }
};
