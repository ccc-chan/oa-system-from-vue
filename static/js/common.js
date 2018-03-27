
!function () {
    function a() {
        var _width;
        var clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 568) {
            _width = 568;
        } else if (clientWidth < 320) {
            _width = 320;
        } else {
            _width = clientWidth;
        }
       // var pageWid = (window.innerWidth > document.querySelector('body').offsetHeight) ? 1136 : 640;
        document.documentElement.style.fontSize = _width / 375 * 100 + "px";
    }
    var b = null;
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener("resize", function () {
            clearTimeout(b);
            b = setTimeout(a, 300)
        },!1);
        a()
    }, false);
}(window);
$(function(){
    /*$("body").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount) {
            $(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " );
        },
    });*/
});
