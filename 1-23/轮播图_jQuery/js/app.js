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

    //获取信息
    var $container = $('#container');
    var $list = $('#list');
    var $span = $('#pointsDiv span');

    var $prev = $('#prev');
    var $next = $('#next');
    var imgWidth = 600;
    var allTime = 600;
    var everyTime = 1;
    var time1= null

    //1. 点击向右(左)的图标, 平滑切换到下(上)一页
    $prev.click(function () {
        nextImg(false);
    });
    $next.click(function () {
        nextImg(true);
    });


    //左右移动
    function nextImg(next){
        //获取每一步的距离
        var offset = next ? -imgWidth : imgWidth;
        //获取初始位置
        var startOffset = $list.position().left;
        //获取最终位置
        var endOffset = startOffset + offset ;
        //获取每一段时间走得距离
        var everyOffset = offset/(allTime/everyTime);

        time1 = setInterval(function(){
            startOffset += everyOffset;
        //
        //     //判断临界条件
            if(startOffset == endOffset){
                clearInterval(time1);

                //无限轮播
                //startOffset == -3600 , startOffset = -600
                //startOffset == 0 , startOffset = -3000;
                if(startOffset == -3600){
                    startOffset = -600;
                }else if(startOffset == 0){
                    startOffset = -3000;
                };

                // if(startOffset == -($span.length+1)*imgWidth){
                //     startOffset = -imgWidth;
                // }else if(startOffset == 0){
                //     startOffset = -$span.length*imgWidth;
                // };
            }
        //
            $list.css('left',startOffset);
        }, everyTime)

        // $list.css('left',endOffset);

    }

})