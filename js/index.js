// 开场动画
(function () {
    // 获取元素
    var bootMask = document.querySelector('#bootMask');
    var bootMaskUp = bootMask.querySelector('.boot-mask-up');
    var bootMaskDown = bootMask.querySelector('.boot-mask-down');
    var bootProgress = bootMask.querySelector('.boot-progress');

    // 页面用到的图片
    var imgArr = ['bg1.jpg','age.png','css.png','html.png','js.png','about1.png','ng.png','about3.png','robot.png','status.png','pencel1.png','pencel2.png','pencel2.png','skill_flag.png','me.png'];
    var loaded = 0;  // 表示已经加载的图片
    var len = imgArr.length;  // 总的图片数量

    imgArr.forEach(function (imgSrc) {
        var imgNode = document.createElement('img');
        imgNode.src = 'img/'+imgSrc;

        imgNode.addEventListener('load', function(){
            loaded ++; // 已下载数量+1
            var scale = loaded / len;   // 计算已下载的比例
            // 设置进度条宽度
            bootProgress.style.width = scale * 100 + '%';
        });
    });

    // 监听 进度条过渡执行完毕
    bootProgress.addEventListener('transitionend', function () {
        if (loaded === len) {
            // 执行开场
            bootMaskDown.style.height = '0';
            bootMaskUp.style.height = '0';
            // 进度条消失
            bootProgress.remove();
        }
    });

    // 上下窗帘过渡执行完毕
    bootMaskDown.addEventListener('transitionend', function(){
       bootMask.remove();
    });


    // 遍历图片数组
    // 创建img元素 document.createElement,  给每个创建的img元素 指定src
    // 监听每个img元素的 load 事件

    // 第一个创建的img元素不会添加到dom结构里
    // 第二 浏览器不会重复下载同一地址的多个图片
})();

// 头部导航区域
(function () {

    var header = document.querySelector('#header');
    var navItems = document.querySelectorAll('.nav-item'); // 获取所有的导航项目元素
    var arrow = document.querySelector('.arrow');
    var main = document.querySelector('#main');
    var contentItems = document.querySelectorAll('.content-item');
    var contentListNode = document.querySelector('.content-list');
    var menuItems = document.querySelectorAll('.menu-item'); // 获取侧边导航

    var contentHeight = window.innerHeight - header.offsetHeight;  // 计算主体内容高度
    var index = 0;  // 当前页面的索引
    var preIndex = 0;  // 标记上一次显示的 索引
    var timeId = null; // 定时器句柄（标记）

    // 定义数组 定义每一屏幕的出入场动画
    var animationList = [
        // 第一屏
        {
            inAnimation: function(){  // 入场动画
                var playList = document.querySelector('.play-list');
                var iconList = document.querySelector('.icon-list');

                playList.style.transform = 'translateY(0)';
                iconList.style.transform = 'translateY(0)';
            },
            outAnimation: function(){  // 退场动画
                var playList = document.querySelector('.play-list');
                var iconList = document.querySelector('.icon-list');

                playList.style.transform = 'translateY(-200px)';
                iconList.style.transform = 'translateY(200px)';
            }
        },
        // 第二屏
        {
            inAnimation: function(){  // 入场动画
                var plane1 = document.querySelector('.plane1');
                var plane2 = document.querySelector('.plane2');
                var plane3 = document.querySelector('.plane3');

                plane1.style.transform = 'translate(0, 0)';
                plane2.style.transform = 'translate(0, 0)';
                plane3.style.transform = 'translate(0, 0)';

            },
            outAnimation: function(){  // 退场动画
                var plane1 = document.querySelector('.plane1');
                var plane2 = document.querySelector('.plane2');
                var plane3 = document.querySelector('.plane3');

                plane1.style.transform = 'translate(-200px, -200px)';
                plane2.style.transform = 'translate(-200px, 200px)';
                plane3.style.transform = 'translate(200px, -200px)';
            }
        },
        // 第三屏
        {
            inAnimation: function(){  // 入场动画
                var pencel1 = document.querySelector('.pencel1');
                var pencel2 = document.querySelector('.pencel2');
                var pencel3 = document.querySelector('.pencel3');

                pencel1.style.transform = 'translate(0, 0)';
                pencel2.style.transform = 'translate(0, 0)';
                pencel3.style.transform = 'translate(0, 0)';

            },
            outAnimation: function(){  // 退场动画
                var pencel1 = document.querySelector('.pencel1');
                var pencel2 = document.querySelector('.pencel2');
                var pencel3 = document.querySelector('.pencel3');

                pencel1.style.transform = 'translate(0, -200px)';
                pencel2.style.transform = 'translate(0, 200px)';
                pencel3.style.transform = 'translate(200px, 200px)';
            }
        },
        // 第四屏
        {
            inAnimation: function(){  // 入场动画
                var aboutItem1 = document.querySelector('.about3-item:nth-child(1)');
                var aboutItem2 = document.querySelector('.about3-item:nth-child(2)');

                aboutItem1.style.transform = 'rotate(0deg)';
                aboutItem2.style.transform = 'rotate(0deg)';
            },
            outAnimation: function(){  // 退场动画
                var aboutItem1 = document.querySelector('.about3-item:nth-child(1)');
                var aboutItem2 = document.querySelector('.about3-item:nth-child(2)');

                aboutItem1.style.transform = 'rotate(45deg)';
                aboutItem2.style.transform = 'rotate(-45deg)';
            }
        },
        // 第五屏
        {
            inAnimation: function(){  // 入场动画
                var team1 = document.querySelector('.team1');
                var team2 = document.querySelector('.team2');

                team1.style.transform = 'translateX(0)';
                team2.style.transform = 'translateX(0)';
            },
            outAnimation: function(){  // 退场动画
                var team1 = document.querySelector('.team1');
                var team2 = document.querySelector('.team2');

                team1.style.transform = 'translateX(-200px)';
                team2.style.transform = 'translateX(200px)';
            }
        }
    ];

    // 设置主体和每个content-item的高度
    setPageHeight();

    // 设置每一屏都处于退场状态
    for (var i = 0; i < animationList.length; i ++) {
        animationList[i].outAnimation();
    }

    // 设置初始导航位置
    setCurrent(index);

    // 给每个导航项目绑定单击事件
    for (var i = 0; i < navItems.length; i ++) {
        navItems[i].index = i;  // 跟每个导航的dom元素 添加属性
        menuItems[i].index = i;  // 跟每个导航的dom元素 添加属性

        // 导航绑定事件
        navItems[i].addEventListener('click', function(){
            // 激活当前导航
            setCurrent(this.index);
        });

        // 侧边导航绑定事件
        menuItems[i].addEventListener('click', function () {
           //激活当前导航
           setCurrent(this.index);
        });
    }

    // 绑定滚轮事件
    // chrome / ie
    document.addEventListener('mousewheel', mouseScrollFn);
    // firfox
    document.addEventListener('DOMMouseScroll', mouseScrollFn);

    // 监听窗口大小发生改变 resize
    window.addEventListener('resize', function () {
        console.log('resize');
        // 重新计算主体的高度
        contentHeight = window.innerHeight - header.offsetHeight;
        // 重新设置 主体高度和每个content-item的高度
        setPageHeight();
        // 设置导航
        setCurrent(index);

    });

    /**
     * 滚轮事件触发的函数
     */
    function mouseScrollFn(event){
        if (timeId !== null) {
            clearTimeout(timeId); // 清除定时
        }

        // 开启个定时
        timeId = setTimeout(function(){
            var tag = '';  // 标志变量
            if (event.wheelDelta) {  // ie chrome
                if (event.wheelDelta > 0) {
                    tag = 'up';
                } else {
                    tag = 'down';
                }
            } else if (event.detail) { // firefox
                if (event.detail < 0) {
                    tag = 'up';
                } else {
                    tag = 'down';
                }
            }

            // 根据向上向下 做出相应的操作
            if (tag === 'up') {
                // 向上 上一页
                if (index > 0) {
                    index --;
                }
                // 设置页面 导航 三角
                setCurrent(index);
            } else if (tag === 'down') {
                // 向下 下一页
                if (index < contentItems.length - 1) {
                    index ++;
                }

                // 设置页面 导航 三角
                setCurrent(index);
            }
        }, 300);
    }

    /**
     * 设置主体和每个content-item的高度
     */
    function setPageHeight() {
        // 设置主体内容的高度
        main.style.height = contentHeight + 'px';

        // 给每个页面 content-item 设置高度
        contentItems.forEach(function (contentItem) {
            contentItem.style.height = contentHeight + 'px';
        });
    }

    /**
     * 激活导航和三角位置
     * @param index 当前需要被激活的导航的索引值
     */
    function setCurrent(index) {
        // 其他的导航失去激活
        navItems.forEach(function (navItem, index) {
            navItem.classList.remove('active');
            menuItems[index].classList.remove('active');
        });

        // 当前的导航激活
        navItems[index].classList.add('active');
        menuItems[index].classList.add('active');

        // 设置三角的位置
        arrow.style.left = navItems[index].offsetLeft + (navItems[index].offsetWidth - arrow.offsetWidth) / 2 + 'px';

        // 设置主体内容滚动的距离
        contentListNode.style.top = -contentHeight * index + 'px';

        // 上一个显示的离场动画
        animationList[preIndex].outAnimation();

        // 当前显示入场动画
        animationList[index].inAnimation();

        // 重新设置 preIndex
        preIndex = index;
    }


})();


// 第一屏轮播图
(function () {
    // 获取元素
    var iconItems = document.querySelectorAll('.icon-list .icon-item');  //所有的按钮
    var playItems = document.querySelectorAll('.play-list .play-item'); // 所有的大图
    var index = 0;  // 表示正处在激活状态的索引
    var isAnimated = false;  // 是否正在执行动画

    // 设置自动轮播
    setInterval(function () {
        var nextIndex = index < playItems.length - 1 ? index + 1 : 0;
        setPlay(nextIndex, true);
    }, 4000);

    // 给每个按钮绑定事件
    iconItems.forEach(function (iconItem, iconIndex) {
        iconItem.addEventListener('click', function () {
            setPlay(iconIndex);
        });
    });

    /**
     * 实现轮播图切换
     * @param iconIndex 即将要显示的轮播项目的索引
     * @param isAuto是否是自动播放 默认false
     */
    function setPlay(iconIndex, isAuto = false) {
        // 判断是否执行动画
        if (isAnimated) {
            return;
        }

        // 设置正在执行动画
        isAnimated = true;

        // 动画执行结束后
        setTimeout(function () {
            isAnimated = false;
        }, 3000);


        // 所有的按钮失活
        iconItems.forEach(function (iconItem) {
            iconItem.classList.remove('active');
        });

        // 当前按钮激活
        iconItems[iconIndex].classList.add('active');

        if (iconIndex > index || isAuto) {  //按钮索引大于当前索引，  右边显示，左边隐藏
            playItems[iconIndex].className = 'play-item right-show'; // 显示
            playItems[index].className = 'play-item left-hide';
        } else if (iconIndex < index) {  // 按钮所以小于当前索引，  左边显示， 右边隐藏
            playItems[iconIndex].className = 'play-item left-show'; // 显示
            playItems[index].className = 'play-item right-hide';
        }


        // 重置赋值 index 的值
        index = iconIndex;
    }
})();


// 第五屏气泡运动
(function () {
    // 获取元素
    var teamItems = document.querySelectorAll('.team3-item');
    var team3=document.querySelector('.team3');

    //创建canvas元素
    var canvas = createCanvas();

    /*team3.addEventListener('mouseenter',function () {
        this.appendChild(canvas);

    })*/



    // 绑定鼠标事件
    teamItems.forEach(function (teamItem) {
       teamItem.addEventListener('mouseenter', function () {
            this.appendChild(canvas);
       });
       teamItem.addEventListener('mouseleave', function(){
            this.appendChild(canvas);
       });
    });



    // 创建canvas
    function createCanvas() {
        // 创建元素
        var canvasNode = document.createElement('canvas');
        // 设置画布大小
        canvasNode.width = 236;
        canvasNode.height = 448;
        // 获取绘图上下文
        var ctx = canvasNode.getContext('2d');


        // 定义变量 存放绘制好的圆
        var circleArr = [];

        // 绘制气泡
        setInterval(function () {
            // 清除画布
            ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);

            // 遍历数组
            for (var i = 0; i < circleArr.length; i ++) {
                // 气泡位置变化
                circleArr[i].deg += .5;
                circleArr[i].y -= circleArr[i].deg;
                circleArr[i].x += Math.sin(circleArr[i].deg) * circleArr[i].scale;

                // 判断
                if (circleArr[i].y <  circleArr[i].r) {
                    circleArr.splice(i, 1);
                    continue;
                }

                // 绘制
                ctx.beginPath();
                ctx.arc(circleArr[i].x, circleArr[i].y, circleArr[i].r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba('+circleArr[i].red+', '+circleArr[i].green+', '+circleArr[i].blue+', '+circleArr[i].opacity+')';
                ctx.fill();
            }

        }, 100);

        // 生成气泡的 数据
        setInterval(function () {
            // 定义变量
            var circle = {};

            // 圆的初始设置
            circle.r = Math.floor(Math.random()* 9) + 2; // 圆的半径
            circle.x = circle.r + Math.floor(Math.random() * (canvasNode.width - 2 * circle.r));  // 计算圆心x坐标
            circle.y = canvasNode.height - circle.r;  // 计算圆心y坐标

            // 颜色的基本设置
            circle.red = Math.floor(Math.random() * 256);
            circle.green = Math.floor(Math.random() * 256);
            circle.blue = Math.floor(Math.random() * 256);
            circle.opacity = 1;

            // 其他设置
            circle.deg = 0;  // y值变化的增量
            circle.scale = Math.floor(Math.random()* 6) + 10;

            // 添加到数组
            circleArr.push(circle);
        }, 50);

        // 返回
        return canvasNode;
    }

})();


/*// 背景音乐
(function () {
    // 获取元素
    var musicNode = document.querySelector('.music');
    var audioNode = document.querySelector('#audio');

    // 绑定事件
    musicNode.addEventListener('click', function(){
       if (audioNode.paused) {
           audioNode.play();  // 播放
           musicNode.classList.add('played');
       } else {
           audioNode.pause(); // 暂停
           musicNode.classList.remove('played');
       }
    });
})();*/

/*技能描述的转换*/
(function () {
    /*vue*/
    var skillIcon1=document.querySelector('#skill_icon1');
    var skillInt1=document.querySelector('#skill_int1');
    var skillFlag1=document.querySelector('.flag1');
    skillIcon1.addEventListener('mouseover',function () {
        skillInt1.style.display='block';
        skillFlag1.style.transform='rotate(180deg)';
        skillFlag1.style.transition='transform .5s';
    });
    skillIcon1.addEventListener('mouseout',function () {
        skillInt1.style.display='none';
        skillFlag1.style.transform='rotate(360deg)';
        skillFlag1.style.transition='transform .5s';
    });

    /*HTML*/
    var skillIcon2=document.querySelector('#skill_icon2');
    var skillInt2=document.querySelector('#skill_int2');
    var skillFlag2=document.querySelector('.flag2');
    skillIcon2.addEventListener('mouseover',function () {
        skillInt2.style.display='block';
        skillFlag2.style.transform='rotate(180deg)';
        skillFlag2.style.transition='transform .5s';
    });
    skillIcon2.addEventListener('mouseout',function () {
        skillInt2.style.display='none';
        skillFlag2.style.transform='rotate(360deg)';
        skillFlag2.style.transition='transform .5s';
    });


    /*CSS*/
    var skillIcon3=document.querySelector('#skill_icon3');
    var skillInt3=document.querySelector('#skill_int3');
    var skillFlag3=document.querySelector('.flag3');
    skillIcon3.addEventListener('mouseover',function () {
        skillInt3.style.display='block';
        skillFlag3.style.transform='rotate(180deg)';
        skillFlag3.style.transition='transform .5s';
    });
    skillIcon3.addEventListener('mouseout',function () {
        skillInt3.style.display='none';
        skillFlag3.style.transform='rotate(360deg)';
        skillFlag3.style.transition='transform .5s';
    });


    /*JS*/
    var skillIcon4=document.querySelector('#skill_icon4');
    var skillInt4=document.querySelector('#skill_int4');
    var skillFlag4=document.querySelector('.flag4');
    skillIcon4.addEventListener('mouseover',function () {
        skillInt4.style.display='block';
        skillFlag4.style.transform='rotate(180deg)';
        skillFlag4.style.transition='transform .5s';
    });
    skillIcon4.addEventListener('mouseout',function () {
        skillInt4.style.display='none';
        skillFlag4.style.transform='rotate(360deg)';
        skillFlag4.style.transition='transform .5s';
    });

})();
