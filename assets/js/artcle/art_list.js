const layer= layui.layer
const form = layui.form

template.defaults.imports.dataFormat =function(data){
    const dt = new Date(data)
    const y = dt.getFullYear()
    const m = padZero(dt.getMonth()+1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
   return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}
function padZero(n) {
    return n > 9 ? n : '0' + n
  }
const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
}
initTable()



function initTable() {
    $.ajax({
        type: 'GET',
        url: '/my/article/list',
        data:q,
        success: function (res) {
            if(res.status!==0){
                return layer.msg('获取文章列表失败')
            }
            const htmlStr = template('tpl-table',res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
        }
    })
}
initCate()
function initCate(){
    $.ajax({
        type: 'GET',
        url:'/my/article/cates',
        success: function (res){
            if(res.status !== 0){
                return layer.msg('获取数据失败')
            }
           const htmlStr = template('tpl-cate', res)
           $('[name=cate_id').html(htmlStr)
           form.render()

        }
    })
}
$("#form-search").on('submit',function(e){
    e.preventDefault()
    const cate_id = $('[name=cate_id]').val()
    const state=$('[name=state]').val()
    q.cate_id=cate_id
    q.state=state
    initTable()
})
const laypage = layui.laypage
function renderPage(total){
    laypage.render({
        count: total,
        elem:'pagBox',
        // count:'total',
        limit:q.pagesize,
        curr:q.pagenum,
        layout:['count', 'skip','prev', 'page', 'next'],
        limits:[2,3,4,5],
        jump:function(obj,first){
            q.pagenum=obj.curr
            q.pagesize=obj.limit
            if(!first){
                initTable()
            }
        }
    })
}
$("tbody").on('click','.btn-delete',function(e){
    const len = $(".btn-delete").length
    console.log(len);

    const id = $(this).attr('data-id')
    layer.confirm('确认删除?',{icon:3,title:'提示'},function(index){
        $.ajax({
            type:'GET',
            url:'/my/article/delete/' + id,
            success: function (res) {
                if(res.status!==0){
                    return layer.msg('删除文章失败')
                }
                layer.msg('删除文章成功')
                console.log(res);
               if(len===1&&q.pagenum!==1){
                q.pagenum--
               }
                initTable()
            }

        })
        layer.close(index)

    })
})


