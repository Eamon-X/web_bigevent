$(function () {
    // 从layUI中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: function (value) {
            let pwd = $(".layui-form [name=oldPwd]").val();
            if (value === pwd) {
                return "新旧密码不能一致！"
            }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            let pwd = $(".layui-form [name=newPwd]").val();
            // 然后进行一次等于的判断
            if (value != pwd) {
                // 如果判断失败，则return一个提示信息即可
                return "两次输入的密码不一致"
            }
        }
    });

    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.post("/my/updatepwd", $(this).serialize(), function (res) {
            if (res.status !== 0) {
                //请求失败
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $("#btnReset").click();
        })

    })
})