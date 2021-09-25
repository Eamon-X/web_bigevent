$(function () {
    getUserInfo();

    $("#btnLogout").on("click", function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: window.localStorage.getItem("token") || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //调用renderAvater渲染用户头像
            renderAvater(res.data);
        },
        //无论成功或失败都会调用complete回调函数，  success，error
        complete: function (res) {
            //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        }
    })
}

function renderAvater(res) {
    var name = res.nickname || res.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

    if (res.user_pic === null) {
        $(".layui-nav-img").css("display", "none")
        // $(".text-avatar").html(res.username.substr(0, 1).toUpperCase());
        $(".text-avatar").html(name[0].toUpperCase());
    } else {
        $(".layui-nav-img").attr("src", res.user_pic);
        $(".text-avatar").css("display", "none")
    }
}