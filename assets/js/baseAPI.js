// 每次调用$.get或$.post或$.ajax的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: window.localStorage.getItem("token") || ''
        }
    }

    //全局统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})