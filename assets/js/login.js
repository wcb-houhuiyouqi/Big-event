$(function () {
    //登陆注册按钮切换
    $('#link_reg').on("click", function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on("click", function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            const pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return console.log(res.message);
                }
                console.log('注册成果');

            }

        })
    })
})                          