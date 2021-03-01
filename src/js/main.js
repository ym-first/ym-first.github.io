"use strict";
function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread()
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance")
}
function _iterableToArray(e) {
    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
        return Array.from(e)
}
function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
        for (var n = 0, t = new Array(e.length); n < e.length; n++)
            t[n] = e[n];
        return t
    }
}
function getMoveDirection(e, n, t, a) {
    if (isPhone) {
        var i = t - e
          , o = a - n;
        if (Math.abs(i) < 2 && Math.abs(o) < 2)
            return DIRECTIONS.UNDIRECTED;
        var r, d, s = (r = i,
        d = o,
        180 * Math.atan2(d, r) / Math.PI);
        return -135 <= s && s <= -45 ? DIRECTIONS.UP : 45 < s && s < 135 ? DIRECTIONS.DOWN : 135 <= s && s <= 180 || -180 <= s && s < -135 ? DIRECTIONS.LEFT : -45 <= s && s <= 45 ? DIRECTIONS.RIGHT : DIRECTIONS.UNDIRECTED
    }
}
function loadIntro() {
    document[hiddenProperty] || loadIntro.loaded || (setTimeout(function() {
        $(".wrap").classList.add("in"),
        setTimeout(function() {
            $(".content-subtitle").innerHTML = "<span>".concat(_toConsumableArray(subtitle).join("</span><span>"), "</span>")
        }, 270)
    }, 0),
    loadIntro.loaded = !0)
}
function switchPage() {
    if (!switchPage.switched) {
        var e = {
            intro: $(".content-intro"),
            path: $(".shape-wrap path"),
            shape: $("svg.shape")
        };
        e.shape.style.transformOrigin = "50% 0%",
        anime({
            targets: e.intro,
            duration: 1100,
            easing: "easeInOutSine",
            translateY: "-200vh"
        }),
        anime({
            targets: e.shape,
            scaleY: [{
                value: [.8, 1.8],
                duration: 550,
                easing: "easeInQuad"
            }, {
                value: 1,
                duration: 550,
                easing: "easeOutQuad"
            }]
        }),
        anime({
            targets: e.path,
            duration: 1100,
            easing: "easeOutQuad",
            d: e.path.getAttribute("pathdata:id"),
            complete: function(e) {
                canvas && (cancelAnimationFrame(animationID),
                canvas.parentElement.removeChild(canvas),
                canvas = null)
            }
        }),
        switchPage.switched = !0
    }
}
function loadMain() {
    loadMain.loaded || (setTimeout(function() {
        $(".card-inner").classList.add("in")
    }, 400),
    loadMain.loaded = !0)
}
function loadAll() {
    loadAll.loaded || (switchPage(),
    loadMain(),
    loadAll.loaded = !0)
}
window.hiddenProperty = "hidden"in document ? "hidden" : "webkitHidden"in document ? "webkitHidden" : "mozHidden"in document ? "mozHidden" : null,
window.DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UNDIRECTED: "UNDIRECTED"
},
window.isPhone = /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent),
window.visibilityChangeEvent = hiddenProperty.replace(/hidden/i, "visibilitychange"),
window.addEventListener(visibilityChangeEvent, loadIntro),
window.addEventListener("DOMContentLoaded", loadIntro);
var enterEl = $(".enter");
enterEl.addEventListener("click", loadAll),
enterEl.addEventListener("touchenter", loadAll),
document.body.addEventListener("mousewheel", loadAll, {
    passive: !0
}),
$(".arrow").addEventListener("mouseenter", loadAll),
isPhone && (document.addEventListener("touchstart", function(e) {
    window.startx = e.touches[0].pageX,
    window.starty = e.touches[0].pageY
}, {
    passive: !0
}),
document.addEventListener("touchend", function(e) {
    var n, t;
    n = e.changedTouches[0].pageX,
    t = e.changedTouches[0].pageY,
    getMoveDirection(startx, starty, n, t) === DIRECTIONS.UP && loadAll()
}, {
    passive: !0
}));
