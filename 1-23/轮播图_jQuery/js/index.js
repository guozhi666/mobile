/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页

 bug: 快速点击下一页时, 有问题
 */

$(function () {
    var $list = $('#list');
    var $container = $('#container');
    var $pointsDiv = $('#pointsDiv')
    var $span = $('#pointsDiv span')
    var $prev = $('#prev');
    var $next = $('#next');

    var imgWidth = 600;
    var allTime = 400;
    var everyTime = 20;

    var time1 = null;
    var isMove = false;
    var time2 = null

    var oldIndex = 0;
    //点击切换图片
    $prev.on('click', function () {
        nextPage(false);
        // console.log('false')
    });
    $next.on('click', function () {
        nextPage(true);
        // console.log('true')
    });

    //自动轮播
    auto();
    function auto(){
        time2 = setInterval(function () {
            nextPage(true);
        },1000);


    }

    //鼠标滑入滑出
    $container.on('mouseenter', function () {
        clearInterval(time2);
    }).on('mouseleave', function () {
        auto();
    });

    //鼠标点击小圆点切换图片
    $span.click(function () {
        console.log($(this).index());
        clickIndex= $(this).index();

        if(clickIndex != oldIndex){
            nextPage(clickIndex);
        }
    })


    function nextPage(next){
        //防止定时器累加
        if(isMove){
            return
        }
        if(typeof next == 'boolean'){
            var offset = next ? -imgWidth : imgWidth;
        }else{
            var offset = -(next - oldIndex)*imgWidth
        }
        //判断图片的移动方向
        // var offset = next ? -imgWidth : imgWidth;
        //获取初始位置
        var startOffset = $list.position().left;
        // 获取最终位置
        var endOffset = startOffset + offset;
        //获取每一步的距离
        var everyOffset = offset/(allTime/everyTime);

        isMove = true;
        time1 = setInterval(function () {
            startOffset += everyOffset;
            if(startOffset == endOffset){
                clearInterval(time1);
                //防止定时器累加
                isMove = false;

                if(startOffset == -($span.length+1)*imgWidth){
                    startOffset = -imgWidth;
                    // console.log('右临界值')
                }
                else if(startOffset == 0){
                    startOffset = -$span.length*imgWidth;
                    // console.log('左临界值')
                }

            }

            $list.css('left', startOffset);
        },everyTime);

        //小圆点联动
        upDateCircle(next);
        // $list.css('left', endOffset);
    }

    //定义小圆点滑动
    function upDateCircle(next){
        var newIndex = 0;
        if(typeof next =='boolean'){
            newIndex = next ? (oldIndex + 1) : (oldIndex - 1);
            if(newIndex > 4 ){
                newIndex = 0
            }else if(newIndex < 0){
                newIndex = 4;
            }
        }else{
            newIndex = next;
        }

        $span.eq(newIndex).addClass('on').siblings().removeClass('on');
        oldIndex = newIndex;
        // $span.eq(newIndex).addClass('current')
    }
});