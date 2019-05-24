
/**
* 校验正则 chali
*/
const validator = {
    // 电话号码
    phone: /^1(3|4|5|7|8)\d{9}$/,
    //正整数正则
    posPattern: /^\d+$/,
    //负整数正则
    negPattern: /^-\d+$/,
    //整数正则
    intPattern: /^-?\d+$/,
    // 不为空
    required: /\S/,


}

/**
 * 校验提示语
 */
const errorMessage = {
    // 电话号码
    phone: "请输入正确的手机号码",
    //正整数正则
    posPattern: /^\d+$/,
    //负整数正则
    negPattern: /^-\d+$/,
    //整数正则
    intPattern: /^-?\d+$/,
    // 不为空
    required: "必填！不能为空！",


}
const ValidatorFn = function (rules, value) {
    let errorObj = {
        errorMessage: "",
        showErrorMessage: false,
    };

    //   是否有校验事件
    if (!rules) {
        return errorObj;
    }
    let keys = rules.trim().split(" ");
    //   是否有校验事件
    if (!keys.length) {
        return errorObj;
    }
    //存在校验规则
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        errorObj.showErrorMessage = !validator[key].test(value);
        if (errorObj.showErrorMessage) {
            errorObj.errorMessage = errorMessage[key];
            break;
        }
    }
    return errorObj;
}
function plugin(Vue, options) {
    Vue.prototype.$checkAll = function () {
        let $allNeedCheck = $("input[rules]");
        let errorObj = {
            errorMessage: "",
            showErrorMessage: false,
        };
        for (let i = 0; $allNeedCheck && i < $allNeedCheck.length; i++) {
            let $ruleDom = $($allNeedCheck[i]);
            // let $input = $ruleDom.find("input");
            let value = $ruleDom.val().trim();
            let rules = $ruleDom.attr("rules");
            errorObj = ValidatorFn(rules, value);
            if (errorObj.showErrorMessage) {
                $ruleDom.trigger("blur");
                break;
            }
        }
        return errorObj;
    };
    Vue.prototype.$ValidatorFn = ValidatorFn;
}
// 自动注册vue
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}
export default {
    install: plugin
}
