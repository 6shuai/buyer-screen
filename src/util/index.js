//价格格式   
//整数部分大于4位 使用千位分割
export const priceFormat = (x, hide) => {
    //强制保留两位小数
    var f = parseFloat(x);
    if (isNaN(f)) return x;
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length < (rs + 1) + 2) {
        s += '0';
    }
    //每三位用一个逗号隔开
    var leftNum = s.split(".")[0];
    var rightNum = "." + s.split(".")[1];
    var result;
    //定义数组记录截取后的价格
    var resultArray = new Array();
    if (leftNum.length > 3) {
        var i = true;
        while (i) {
            resultArray.push(leftNum.slice(-3));
            leftNum = leftNum.slice(0, leftNum.length - 3);
            if (leftNum.length < 4) {
                i = false;
            }
        }
        //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
        var sortArray = new Array();
        for (var i = resultArray.length - 1; i >= 0; i--) {
            sortArray.push(resultArray[i]);
        }
        result = leftNum + "," + sortArray.join(",") + rightNum;
    } else {
        result = s;
    }
    return {
        int: hide ? hidePrice(result.split('.')[0]) : result.split('.')[0],
        decimals: hide ? '.??' : '.' + result.split('.')[1],
        full: Number(result.replace(',', ''))
    };
}

//隐藏猜价 价格
function hidePrice(str) {
    if (str.length > 1) {
        let wen = '?'
        let str1 = str.substr(0, parseInt(str.length / 2))
        return str1 + wen.repeat(str.length - parseInt(str.length / 2))
    } else {
        return str
    }
}

//把秒  转成 时分秒
export const translatesToHoursMinutesSeconds = (duration) => {
    let s = duration % 60,
        m = ((duration - s) / 60) % 60,
        h = ((duration - s) / 60 - m) / 60
    let time = h ? `${addPreZero(h)}:${addPreZero(m)}:${addPreZero(s)}` : `${addPreZero(m)}:${addPreZero(s)}`;
    return time;
}

function addPreZero(number) {
    number = number < 0 ? (number = 0) : number;
    return number < 10 ? "0" + number : number;
}

//时间戳 转成  时间格式
export const formatTime = (timestamp, type) => {
    if (!timestamp) return
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = addPreZero(date.getMonth() + 1) + '-';
    var D = addPreZero(date.getDate()) + ' ';
    var h = addPreZero(date.getHours()) + ':';
    var m = addPreZero(date.getMinutes());
    var s = ':' + addPreZero(date.getSeconds());
    if (!type) {
        return h + m;
    } else {
        return Y + M + D
    }
}


export const screenSize = () => {
    let windowWidth = window.innerWidth
    let handle = true
    if (windowWidth == 1920) {
        handle = false
    }
    return handle
}