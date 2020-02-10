
function throttle(handle, wait) {
    var lastTime = 0;
    return function () {
        var nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handle.apply(this, arguments)
            lastTime = nowTime
        }
    }
}

export default throttle