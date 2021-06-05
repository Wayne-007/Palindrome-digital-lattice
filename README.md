# Palindrome-digital-lattice
如您所见：回文数字宫格

**前言：觉得我写的好，麻烦您点赞点关注加收藏/推荐，其他问题欢迎底部留言，佛系回复！**

**目录**

[一、起因](#一、起因)

------

## 一、起因

在某个群里看到“回文数字宫格”的面试题：

![img](https://img-blog.csdnimg.cn/20210605203118696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDIyOTQ2,size_16,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

于是我在假期，研究出了这个“回文数字宫格”，暂时没空优化，但很浅显，各位读者多多包涵！

## 二、分析

我们看到这个表格的数字，第一感觉就像一圈蚊香：

![img](https://img-blog.csdnimg.cn/20210605203655693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDIyOTQ2,size_16,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

第二个思路就是“二维数组”，以num=3为例：

```javascript
let arr = [
    [1,8,7],
    [2,9,6],
    [3,4,5]
];
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

于是我马上就按照二维数组的思路，先确定每个二维数组的第一项以及一维数组的最后一项：

```javascript
let arr = [
    [1,'',''],
    [2,'',''],
    [3,4,5]
];
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

为啥没有贴上我写的代码呢？因为我发现这样子写，进入了死胡同，反正我是没相出后面怎么写，头发还薅掉了几根。但是！！它是二维数组的思路是没错的！

之后，我陷入了沉思，感觉这个“算法”对于我来说超纲了，可是它有30分啊！还是第一题！！

不甘心，再次观察例子中的表格，似乎有点发现：

1、数字的走向有四种：上⬆️，右➡️，下⬇️，左⬅️；

2、结合第1点观察出：数字下到尽头就右走，右到尽头就上爬，爬到尽头就左行，行到尽头又下掉；

3、综合1、2亮点，如果把表格看成x&y的坐标轴的话，思路似乎明朗了许多：

![img](https://img-blog.csdnimg.cn/20210605204859423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDIyOTQ2,size_16,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

那我就开始画表格，填表格吧！

## 三、开干

我直接贴js代码和注释吧，先说明，我写的初步代码还有很大的优化空间，因为我基础也忘了很多，所以...欢迎评论区留言！！！

```javascript
function arrLengthFun(res) {    //    主要是计算结果数组的长度
    let count = 0;
    res.forEach(item => {
        item.forEach(items => {
            if (items) count += 1
        })
    })
    return count
}

function initRes(num) {    //    初始化二维数组，类似于绘制一张待填写的表格
    let res = new Array(num)
    for (let i = 0; i < num; i++) {
        res[i] = new Array(num)
        for (let j = 0; j < num; j++) {
            res[i][j] = ''
        }
    }
    return res
}

function renderDom(res) {    //    暂时忽略

}

function cube(num) {    //    主要函数
    const doubleNum = Math.pow(num, 2);    //    整个“回文数字宫格”最大的数就是num的平方，所以先保存最大的数值，也是整个“回文数字宫格”里面成员的数量
    
    const NUM_1 = num - 1;    //    一维数组长度=二维数组长度=num（从0计算）
    
    let res = initRes(num);    //    保存初始化的数组（可优化）

    let direction = 'down';    //  回文数字的走向，有up,right,down,left，默认即开始是向下的；

    let x = 0,
        y = 0;    //    定位具体回文数在坐标轴（二维轴）里面的位置；

    let arrLength = 0;    //    初始化二维数组真正存在（已填）的数字量，即表格填了多少个数字

    do {
        switch (direction) {    //    首先得判断走向，其次是目标宫格是否超出表格范围，是否已经填了数字，超出或已填入，及时转向改道，如果已填的数字长度==表格位置，则完成cube功能
            //    下面的代码比较多，建议按走完第一圈的位置走向阅读，即down---right---up---left
            case 'up':
                if (y >= 0) {
                    if (res[y][x]) {
                        direction = 'left'
                        x -= 1
                        y += 1
                    } else {
                        res[y][x] = res[y + 1][x] + 1
                        y -= 1
                    }
                } else {
                    direction = 'left'
                    x -= 1
                    y += 1
                }
                break;
            case 'right':
                if (x <= NUM_1) {
                    if (res[y][x]) {
                        direction = 'up'
                        y -= 1
                        x -= 1
                    } else {
                        res[y][x] = res[y][x - 1] + 1
                        x += 1
                    }
                } else {
                    direction = 'up'
                    y -= 1
                    x -= 1
                }
                break;
            case 'down':    //    开始的时候是先向下走的，此时x===0,y===0
                if (y <= NUM_1) { //  是否下到尽头，否
                    if (x === 0 && y === 0) { //  初始化的话
                        res[y][x] = 1    //    第一个值一定是1
                        y += 1;    //    向下走一个
                    } else if (res[y][x]) { //  往下一走一步，有值的话
                        direction = 'right'    //    需要改变方便，往右走
                        x += 1    //    下一个目标位置
                        y -= 1    //    调整位置，更正为下一个目标位置
                    } else { //  往下一个没有值的话，➕1
                        res[y][x] = res[y - 1][x] + 1
                        y += 1;
                    }
                } else {    //    已经走到尽头
                    direction = 'right'    //下到尽头，则往右走
                    x += 1    //    x需要+1个位置
                    y -= 1    //    由于y在上面已经走出了尽头，所以需要-1退回到表格
                }
                break;
            case 'left':
                if (x >= 0) {
                    if (res[y][x]) {
                        direction = 'down'
                        y += 1
                        x += 1
                    } else {
                        res[y][x] = res[y][x + 1] + 1
                        x -= 1
                    }
                } else {
                    direction = 'down'
                    y += 1
                    x += 1
                }
                break
            default:
                break
        }
        arrLength = arrLengthFun(res)
    } while (arrLength < doubleNum)

    renderDom(res)
}

function handleClick() {    //    暂时忽略

}
```

![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

代码有点多，但读懂了一个位置就懂了其他未知的走向，所以我就写到一个位置down的走向，如果没看太懂，可以在浏览器中打断点调试查看，应该就很容易懂了。

## 四、效果展示

在上面的js中，我预留了两个方法，一个是handleClick，一个是renderDom。

handleClick：处理输入框内输入的数字；

renderDom：绘制表格图案；

来吧，展示：

![img](https://img-blog.csdnimg.cn/20210605212017724.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDIyOTQ2,size_16,color_FFFFFF,t_70)![点击并拖拽以移动](data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==)

## 五、后记

各位老板觉得我写的有点东西的话，给个点赞👍，收藏，关注再走呗！同时欢迎文章下方留言，看到就会回复！

相关代码已上传至[我的github](https://github.com/Wayne-007/Palindrome-digital-lattice.git)，求Star～

