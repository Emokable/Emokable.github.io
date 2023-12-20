var OriginTitle = document.title;
var titleTime;

document.addEventListener('visibilitychange', function () {

    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/img/emokable.ico");
        document.title = '੭ ᐕ)੭*⁾⁾离开了吗';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/img/emokable.ico");
        document.title = '(ˊᗜˋ*) 欢迎回来';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});