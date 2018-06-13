import Regular from './Regular';
// 表单验证
let formValidation = {
  // 数字英文中文
  // 验证采购商名称、联系人等文字数字英文
  nec: function () {
    let required = false;
    let message = '请输入正确的信息';
    let trigger = 'blur';
    if (arguments[0]) { message = arguments[0]; }
    if (arguments[1]) { required = arguments[1]; }
    if (arguments[2]) { trigger = arguments[2]; }
    return [
      {
        required,
        pattern: Regular.nec,
        message,
        trigger
      }
    ];
  },
  // 传真号
  fax: function () {
    let required = false;
    let message = '请输入正确的传真号';
    let trigger = 'blur';
    if (arguments[0]) { message = arguments[0]; }
    if (arguments[1]) { required = arguments[1]; }
    if (arguments[2]) { trigger = arguments[2]; }
    return [
      {
        required,
        pattern: Regular.nh,
        message,
        trigger
      }
    ];
  },
  // 电子邮箱
  email: function () {
    let required = false;
    let message = '请输入正确的电子邮箱';
    let trigger = 'blur';
    if (arguments[0]) { message = arguments[0]; }
    if (arguments[1]) { required = arguments[1]; }
    if (arguments[2]) { trigger = arguments[2]; }
    return [
      {
        required,
        pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        message,
        trigger
      }
    ];
  },
  // 银行账号
  bankAccount: function () {
    let required = false;
    let message = '请输入正确的银行账号';
    let trigger = 'blur';
    if (arguments[0]) { message = arguments[0]; }
    if (arguments[1]) { required = arguments[1]; }
    if (arguments[2]) { trigger = arguments[2]; }
    return [
      {
        required,
        pattern: /^\d{0,20}$/,
        message,
        trigger
      }
    ];
  },
  // 手机和固话选其一
  telAndMob: function (telephone, mobile, rule, value, callback) {
    let tel = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
      if (!telephone && !mobile) {
        callback(new Error('请输入手机'));
      } else if (!telephone && mobile) {
        callback();
      } else {
        if (reg.test(telephone)) {
          callback();
        } else {
          callback(new Error('手机格式输入有误'));
        }
      }
    };
    let mob = (rule, value, callback) => {
      let pat = /^[\d-]{0,20}$/;
      if (!telephone && !mobile) {
        callback(new Error('请输入固话'));
      } else if (telephone && !mobile) {
        callback();
      } else {
        if (pat.test(mobile)) {
          callback();
        } else {
          callback(new Error('固话格式输入有误'));
        }
      }
    };
    return { tel, mob };
  }
};
export default formValidation;
