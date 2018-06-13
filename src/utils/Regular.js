const regular = {
  // 数字英文中文
  nec: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
  // 纯数字
  num: /^[0-9]*$/,
  // 数字加横杠
  nh: /^[\d-]*$/,
  // 电子邮箱
  email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
  // 手机
  tel: /^[1][0-9]{10}$/
};
export default regular;
