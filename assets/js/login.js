$(function () {
    $("#goReg").on("click", function () {
        // .show 和 .hide
        $(".login").css("display", "none");
        $(".reg").css("display", "block");
    })

    $("#goLogin").on("click", function () {
        $(".reg").css("display", "none");
        $(".login").css("display", "block");
    })

    // 从layUI中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            var pwd = $(".reg [name=password]").val();
            // 然后进行一次等于的判断
            if (value != pwd) {
                // 如果判断失败，则return一个提示信息即可
                return "两次输入的密码不一致"
            }
        }
    });

    //监听注册表单
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        // alert("提交注册");
        // $.post("http://ajax.frontend.itheima.net/api/reguser", $("#form_reg").serialize(), function (res) {
        //     if (res.status !== 0) {
        //         alert(res.message);
        //     }
        // })
        $.post("/api/reguser", $("#form_reg").serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            //模拟点击去登陆
            $("#goLogin").click();
        })
    })

    //监听登录表单
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.post("/api/login", $("#form_login").serialize(), function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            //将登录成功得到的token字符串保存到localstorage中
            window.localStorage.setItem('token', res.token);
            location.href = "/index.html";
        })
    })
})