$(function () {


    var form = layui.form;

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！";
            }
        }
    })


    function initUserInfo() {
        $.get("/my/userinfo", function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            //调用layui的快速赋值表单
            form.val("formUserInfo", res.data);
        })
    }

    initUserInfo();
    $("#btnReset").on("click", function (e) {
        //阻止默认重置事件
        e.preventDefault();
        initUserInfo();
    })

    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.post("/my/userinfo", form.val("formUserInfo"), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //调用index页面的方法，重新渲染头像和名称
            window.parent.getUserInfo();
        })
    })

})

