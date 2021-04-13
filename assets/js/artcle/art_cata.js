let addIndex;
const form = layui.form

$(function () {
    var layer = layui.layer
    initArtCateList()
    $("#btnAddCate").on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
        console.log(addIndex);
    })
})

function initArtCateList() {
    $.ajax({
        type: "GET",
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            const htmlStr = template('tpl-table', res)
            // console.log(htmlStr);
            $("tbody").html(htmlStr)
        }
    })
}

$("body").on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
        type: "POST",
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('新增分类失败！')
            }
            initArtCateList()
            layer.msg('新增分类成功！')
            layer.close(addIndex)
        }
    })
})
let indexEdit = null;
$('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
    })
    const id = $(this).attr('data-id');
    $.ajax({
        type: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            form.val('form-edit', res.data)
        }
    })
})
$("body").on('submit', '#form-edit', function (e) {
    console.log(e);
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('跟新数据失败！')
            }
            initArtCateList()
            layer.msg('跟新数据成功！')
            layer.close(indexEdit)
        }
    })
})

$("tbody").on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
     layer.confirm('确认删除?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        console.log(index);
        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除分类失败！')
                }
                layer.msg('删除分类成功')
                layer.close(index);
                initArtCateList()
            }
        })
    })
})