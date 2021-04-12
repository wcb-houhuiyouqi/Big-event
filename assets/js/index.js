$(function () {
    getUserInfo()
    $("#btnLogout").on("click", function () {
        console.log('ok');
        layer.confirm('确定退出登陆?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.class(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
      
    })
}

function renderAvatar(user) {
    // debugger
    const name = user.nickname || user.username;
    $("#welcome").html('欢迎' + name)
    if (user.user_pic) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}