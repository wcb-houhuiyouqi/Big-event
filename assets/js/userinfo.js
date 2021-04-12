$(function (){
    const form = layui.form
    form.verify({
        nickname:function (value) {
            // console.log(value);
            if(value.length>6){
                return '昵称长度必须在1~6之间!'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('formUserInfo',res.data);
            }
        })
    }
    $("#btnReset").on('click',function(e){
        e.preventDefault();
        initUserInfo()
    });
    $(".layui-form").on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:'/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
               if(res.status!==0){
                return layer.msg(res.message)
               }
               layer.msg(res.message)
               window.parent.getUserInfo()
            }
        })
    })

})