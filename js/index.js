function arrLengthFun(res) {
    let count = 0;
    res.forEach(item => {
        item.forEach(items => {
            if (items) count += 1
        })
    })
    return count
}

function initRes(num) {
    let res = new Array(num)
    for (let i = 0; i < num; i++) {
        res[i] = new Array(num)
        for (let j = 0; j < num; j++) {
            res[i][j] = ''
        }
    }
    return res
}

function renderDom(res) {
    const box = document.getElementById('box')
    box.innerHTML = ""
    for (let i = 0; i < res.length; i++) {
        const newDiv = document.createElement('div')
        newDiv.className = 'oneline'
        for (let j = 0; j < res[i].length; j++) {
            const minDiv = document.createElement('div')
            minDiv.appendChild(document.createTextNode(res[i][j]))

            if (i === res.length - 1) {
                if (j === res[i].length - 1) {
                    minDiv.className = 'minBox'
                } else {
                    minDiv.className = 'minBox right-line'
                }
            } else {
                if (j === res[i].length - 1) {
                    minDiv.className = 'minBox btm-line'
                } else {
                    minDiv.className = 'minBox btm-line right-line'
                }
            }

            newDiv.appendChild(minDiv)
        }
        box.appendChild(newDiv)
    }
}

function cube(num) {
    const doubleNum = Math.pow(num, 2);
    const NUM_1 = num - 1;
    // 初始化数组
    let res = initRes(num);

    let direction = 'down'; //  up,right,down,left
    let x = 0,
        y = 0;

    let arrLength = 0;

    do {
        switch (direction) {
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
            case 'down':
                if (y <= NUM_1) { //  是否下到尽头
                    if (x === 0 && y === 0) { //  初始化的话
                        res[y][x] = 1
                        y += 1;
                    } else if (res[y][x]) { //  往下一个值有值的话，就改变方向
                        direction = 'right'
                        x += 1
                        y -= 1
                    } else { //  往下一个没有值的话，➕1
                        res[y][x] = res[y - 1][x] + 1
                        y += 1;
                    }
                } else {
                    direction = 'right'
                    x += 1
                    y -= 1
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

function handleClick() {
    const ipt = document.getElementById('num')
    const val = parseInt(ipt.value)
    cube(val)
}
