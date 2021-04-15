var layer = layui.layer
var form = layui.form
initCate()
initEditor()

function initCate() {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('初始化文章分类失败')
            }
            const htmlStr = template('tpl-cate', res)
            $("[name=cate_id]").html(htmlStr)
            form.render()

        }

    })
}
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
$("#btnChooseImage").on('click', function () {
    $("#coverFile").click()
})
$("#coverFile").on('change', function (e) {
    console.log(e);
    const fires = e.target.files
    if (fires.length === 0) {
        return
    }
    const newImgURL = URL.createObjectURL(fires[0])
    console.log(newImgURL);
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})
let art_state = '已发布';
$("#btnSave2").on('click', function () {
    art_state = '草稿'
})
$("#form-pub").on('submit', function (e) {
    e.preventDefault();
    const fd = new FormData($(this)[0]);
    // console.log(fd);
    fd.append('state', art_state)
    $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function (blob) {
            fd.append('cover_img', blob)
            publishArticle(fd)
        })
})

function publishArticle(fd) {
    $.ajax({
        type: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: function (res) {
            if(res.status !== 0){

                return layer.msg('发布文章失败!')
            }
            layer.msg('发布文章成功')
            location.href = '/article/art_list.html'
        },
    })
}