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
    //登陆框
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            const pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    
    //注册框
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return console.log(res.message);
                }
                layer.msg('注册成功')
                $('#link_login').click()

            }
        })
    })

    //登陆跳转
    $("#form_login").submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })

})