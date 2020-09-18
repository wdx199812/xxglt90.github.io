function animateSlow(ele, obj, fn) {
    clearInterval(ele.timerId);
    ele.timerId = setInterval(function () {
        //声明一个变量是假设所有的属性都已经到达目标位置
        let flag = true;
        for (let key in obj) {
            if (key == "opacity") {
                let currentValue = getComputedStyle(ele, null)[key] * 100;
                let step = (obj[key] * 100 - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                currentValue += step;
                ele.style[key] = currentValue / 100;
                if (currentValue / 100 != obj[key]) {
                    flag = false;
                }

            } else if (key == "z-index" || key == "zIndex") {
                ele.style[key] = obj[key];
            } else {
                let currentValue = parseInt(getComputedStyle(ele, null)[key]);
                let step = (obj[key] - currentValue) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                currentValue += step;
                ele.style[key] = currentValue + "px";
                if (currentValue != obj[key]) {
                    flag = false;
                }

            }
        }
        if (flag == true) {
            clearInterval(ele.timerId);
            // 在动画结束后再执行一段函数回调函数
            // 需要先判断执行的函数是不是函数类型
            // 此处也是直接把函数名当成判断
            if (typeof fn == "function") {
                fn();
            }
        }
    }, 50)
}