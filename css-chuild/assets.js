var $jscomp = {
    scope: {}, findInternal: function (e, t, i) {
        e instanceof String && (e = String(e));
        for (var n = e.length, a = 0; a < n; a++) {
            var o = e[a];
            if (t.call(i, o, a, e)) return {i: a, v: o}
        }
        return {i: -1, v: void 0}
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, t, i) {
    if (i.get || i.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[t] = i.value)
}, $jscomp.getGlobal = function (e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function (e, t, i, n) {
    if (t) {
        for (i = $jscomp.global, e = e.split("."), n = 0; n < e.length - 1; n++) {
            var a = e[n];
            a in i || (i[a] = {}), i = i[a]
        }
        (t = t(n = i[e = e[e.length - 1]])) != n && null != t && $jscomp.defineProperty(i, e, {
            configurable: !0,
            writable: !0,
            value: t
        })
    }
}, $jscomp.polyfill("Array.prototype.find", (function (e) {
    return e || function (e, t) {
        return $jscomp.findInternal(this, e, t).v
    }
}), "es6-impl", "es3"), function (e, t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(t || i)
}((function (e) {
    var t = function (t, i, n) {
        var a = {
            invalid: [], getCaret: function () {
                try {
                    var e, i = 0, n = t.get(0), o = document.selection, s = n.selectionStart;
                    return o && -1 === navigator.appVersion.indexOf("MSIE 10") ? ((e = o.createRange()).moveStart("character", -a.val().length), i = e.text.length) : (s || "0" === s) && (i = s), i
                } catch (e) {
                }
            }, setCaret: function (e) {
                try {
                    if (t.is(":focus")) {
                        var i, n = t.get(0);
                        n.setSelectionRange ? n.setSelectionRange(e, e) : ((i = n.createTextRange()).collapse(!0), i.moveEnd("character", e), i.moveStart("character", e), i.select())
                    }
                } catch (e) {
                }
            }, events: function () {
                t.on("keydown.mask", (function (e) {
                    t.data("mask-keycode", e.keyCode || e.which), t.data("mask-previus-value", t.val()), t.data("mask-previus-caret-pos", a.getCaret()), a.maskDigitPosMapOld = a.maskDigitPosMap
                })).on(e.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", a.behaviour).on("paste.mask drop.mask", (function () {
                    setTimeout((function () {
                        t.keydown().keyup()
                    }), 100)
                })).on("change.mask", (function () {
                    t.data("changed", !0)
                })).on("blur.mask", (function () {
                    r === a.val() || t.data("changed") || t.trigger("change"), t.data("changed", !1)
                })).on("blur.mask", (function () {
                    r = a.val()
                })).on("focus.mask", (function (t) {
                    !0 === n.selectOnFocus && e(t.target).select()
                })).on("focusout.mask", (function () {
                    n.clearIfNotMatch && !o.test(a.val()) && a.val("")
                }))
            }, getRegexMask: function () {
                for (var e, t, n, a, o = [], r = 0; r < i.length; r++) (e = s.translation[i.charAt(r)]) ? (t = e.pattern.toString().replace(/.{1}$|^.{1}/g, ""), n = e.optional, (e = e.recursive) ? (o.push(i.charAt(r)), a = {
                    digit: i.charAt(r),
                    pattern: t
                }) : o.push(n || e ? t + "?" : t)) : o.push(i.charAt(r).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                return o = o.join(""), a && (o = o.replace(new RegExp("(" + a.digit + "(.*" + a.digit + ")?)"), "($1)?").replace(new RegExp(a.digit, "g"), a.pattern)), new RegExp(o)
            }, destroyEvents: function () {
                t.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))
            }, val: function (e) {
                var i = t.is("input") ? "val" : "text";
                return 0 < arguments.length ? (t[i]() !== e && t[i](e), i = t) : i = t[i](), i
            }, calculateCaretPosition: function () {
                var e = t.data("mask-previus-value") || "", i = a.getMasked(), n = a.getCaret();
                if (e !== i) {
                    var o, s = t.data("mask-previus-caret-pos") || 0, r = (i = i.length, e.length), l = e = 0, d = 0,
                        c = 0;
                    for (o = n; o < i && a.maskDigitPosMap[o]; o++) l++;
                    for (o = n - 1; 0 <= o && a.maskDigitPosMap[o]; o--) e++;
                    for (o = n - 1; 0 <= o; o--) a.maskDigitPosMap[o] && d++;
                    for (o = s - 1; 0 <= o; o--) a.maskDigitPosMapOld[o] && c++;
                    n > r ? n = 10 * i : s >= n && s !== r ? a.maskDigitPosMapOld[n] || (s = n, n = n - (c - d) - e, a.maskDigitPosMap[n] && (n = s)) : n > s && (n = n + (d - c) + l)
                }
                return n
            }, behaviour: function (i) {
                i = i || window.event, a.invalid = [];
                var n = t.data("mask-keycode");
                if (-1 === e.inArray(n, s.byPassKeys)) {
                    n = a.getMasked();
                    var o = a.getCaret();
                    return setTimeout((function () {
                        a.setCaret(a.calculateCaretPosition())
                    }), e.jMaskGlobals.keyStrokeCompensation), a.val(n), a.setCaret(o), a.callbacks(i)
                }
            }, getMasked: function (e, t) {
                var o, r, l, d = [], c = void 0 === t ? a.val() : t + "", p = 0, u = i.length, h = 0, f = c.length,
                    m = 1, v = "push", g = -1, b = 0, y = [];
                for (n.reverse ? (v = "unshift", m = -1, o = 0, p = u - 1, h = f - 1, r = function () {
                    return -1 < p && -1 < h
                }) : (o = u - 1, r = function () {
                    return p < u && h < f
                }); r();) {
                    var w = i.charAt(p), x = c.charAt(h), S = s.translation[w];
                    S ? (x.match(S.pattern) ? (d[v](x), S.recursive && (-1 === g ? g = p : p === o && p !== g && (p = g - m), o === g && (p -= m)), p += m) : x === l ? (b--, l = void 0) : S.optional ? (p += m, h -= m) : S.fallback ? (d[v](S.fallback), p += m, h -= m) : a.invalid.push({
                        p: h,
                        v: x,
                        e: S.pattern
                    }), h += m) : (e || d[v](w), x === w ? (y.push(h), h += m) : (l = w, y.push(h + b), b++), p += m)
                }
                return c = i.charAt(o), u !== f + 1 || s.translation[c] || d.push(c), d = d.join(""), a.mapMaskdigitPositions(d, y, f), d
            }, mapMaskdigitPositions: function (e, t, i) {
                for (e = n.reverse ? e.length - i : 0, a.maskDigitPosMap = {}, i = 0; i < t.length; i++) a.maskDigitPosMap[t[i] + e] = 1
            }, callbacks: function (e) {
                var o = a.val(), s = o !== r, l = [o, e, t, n], d = function (e, t, i) {
                    "function" == typeof n[e] && t && n[e].apply(this, i)
                };
                d("onChange", !0 === s, l), d("onKeyPress", !0 === s, l), d("onComplete", o.length === i.length, l), d("onInvalid", 0 < a.invalid.length, [o, e, t, a.invalid, n])
            }
        };
        t = e(t);
        var o, s = this, r = a.val();
        i = "function" == typeof i ? i(a.val(), void 0, t, n) : i, s.mask = i, s.options = n, s.remove = function () {
            var e = a.getCaret();
            return s.options.placeholder && t.removeAttr("placeholder"), t.data("mask-maxlength") && t.removeAttr("maxlength"), a.destroyEvents(), a.val(s.getCleanVal()), a.setCaret(e), t
        }, s.getCleanVal = function () {
            return a.getMasked(!0)
        }, s.getMaskedVal = function (e) {
            return a.getMasked(!1, e)
        }, s.init = function (r) {
            if (r = r || !1, n = n || {}, s.clearIfNotMatch = e.jMaskGlobals.clearIfNotMatch, s.byPassKeys = e.jMaskGlobals.byPassKeys, s.translation = e.extend({}, e.jMaskGlobals.translation, n.translation), s = e.extend(!0, {}, s, n), o = a.getRegexMask(), r) a.events(), a.val(a.getMasked()); else {
                n.placeholder && t.attr("placeholder", n.placeholder), t.data("mask") && t.attr("autocomplete", "off"), r = 0;
                for (var l = !0; r < i.length; r++) {
                    var d = s.translation[i.charAt(r)];
                    if (d && d.recursive) {
                        l = !1;
                        break
                    }
                }
                l && t.attr("maxlength", i.length).data("mask-maxlength", !0), a.destroyEvents(), a.events(), r = a.getCaret(), a.val(a.getMasked()), a.setCaret(r)
            }
        }, s.init(!t.is("input"))
    };
    e.maskWatchers = {};
    var i = function () {
        var i = e(this), a = {}, o = i.attr("data-mask");
        if (i.attr("data-mask-reverse") && (a.reverse = !0), i.attr("data-mask-clearifnotmatch") && (a.clearIfNotMatch = !0), "true" === i.attr("data-mask-selectonfocus") && (a.selectOnFocus = !0), n(i, o, a)) return i.data("mask", new t(this, o, a))
    }, n = function (t, i, n) {
        n = n || {};
        var a = e(t).data("mask"), o = JSON.stringify;
        t = e(t).val() || e(t).text();
        try {
            return "function" == typeof i && (i = i(t)), "object" != typeof a || o(a.options) !== o(n) || a.mask !== i
        } catch (e) {
        }
    }, a = function (e) {
        var t, i = document.createElement("div");
        return (t = (e = "on" + e) in i) || (i.setAttribute(e, "return;"), t = "function" == typeof i[e]), t
    };
    e.fn.mask = function (i, a) {
        a = a || {};
        var o = this.selector, s = (r = e.jMaskGlobals).watchInterval, r = a.watchInputs || r.watchInputs,
            l = function () {
                if (n(this, i, a)) return e(this).data("mask", new t(this, i, a))
            };
        return e(this).each(l), o && "" !== o && r && (clearInterval(e.maskWatchers[o]), e.maskWatchers[o] = setInterval((function () {
            e(document).find(o).each(l)
        }), s)), this
    }, e.fn.masked = function (e) {
        return this.data("mask").getMaskedVal(e)
    }, e.fn.unmask = function () {
        return clearInterval(e.maskWatchers[this.selector]), delete e.maskWatchers[this.selector], this.each((function () {
            var t = e(this).data("mask");
            t && t.remove().removeData("mask")
        }))
    }, e.fn.cleanVal = function () {
        return this.data("mask").getCleanVal()
    }, e.applyDataMask = function (t) {
        ((t = t || e.jMaskGlobals.maskElements) instanceof e ? t : e(t)).filter(e.jMaskGlobals.dataMaskAttr).each(i)
    }, a = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        keyStrokeCompensation: 10,
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && a("input"),
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            0: {pattern: /\d/},
            9: {pattern: /\d/, optional: !0},
            "#": {pattern: /\d/, recursive: !0},
            A: {pattern: /[a-zA-Z0-9]/},
            S: {pattern: /[a-zA-Z]/}
        }
    }, e.jMaskGlobals = e.jMaskGlobals || {}, (a = e.jMaskGlobals = e.extend(!0, {}, a, e.jMaskGlobals)).dataMask && e.applyDataMask(), setInterval((function () {
        e.jMaskGlobals.watchDataMask && e.applyDataMask()
    }), a.watchInterval)
}), window.jQuery, window.Zepto), function (e, t, i, n) {
    "use strict";

    function a(e, t) {
        var n, a, o, s = [], r = 0;
        e && e.isDefaultPrevented() || (e.preventDefault(), t = t || {}, e && e.data && (t = h(e.data.options, t)), n = t.$target || i(e.currentTarget).trigger("blur"), (o = i.fancybox.getInstance()) && o.$trigger && o.$trigger.is(n) || (t.selector ? s = i(t.selector) : (a = n.attr("data-fancybox") || "") ? s = (s = e.data ? e.data.items : []).length ? s.filter('[data-fancybox="' + a + '"]') : i('[data-fancybox="' + a + '"]') : s = [n], (r = i(s).index(n)) < 0 && (r = 0), (o = i.fancybox.open(s, t, r)).$trigger = n))
    }

    if (e.console = e.console || {
            info: function (e) {
            }
        }, i) {
        if (i.fn.fancybox) return void console.info("fancyBox already initialized");
        var o = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {preload: !1},
                ajax: {settings: {data: {fancybox: !0}}},
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {scrolling: "auto"}
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {autoStart: !1},
                touch: {vertical: !0, momentum: !0},
                hash: null,
                media: {},
                slideShow: {autoStart: !1, speed: 3e3},
                thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"},
                wheel: "auto",
                onInit: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop,
                onActivate: i.noop,
                onDeactivate: i.noop,
                clickContent: function (e, t) {
                    return "image" === e.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1, idleTime: !1, clickContent: function (e, t) {
                        return "image" === e.type && "toggleControls"
                    }, clickSlide: function (e, t) {
                        return "image" === e.type ? "toggleControls" : "close"
                    }, dblclickContent: function (e, t) {
                        return "image" === e.type && "zoom"
                    }, dblclickSlide: function (e, t) {
                        return "image" === e.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            }, s = i(e), r = i(t), l = 0,
            d = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
                return e.setTimeout(t, 1e3 / 60)
            },
            c = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function (t) {
                e.clearTimeout(t)
            }, p = function () {
                var e, i = t.createElement("fakeelement"), n = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
                for (e in n) if (void 0 !== i.style[e]) return n[e];
                return "transitionend"
            }(), u = function (e) {
                return e && e.length && e[0].offsetHeight
            }, h = function (e, t) {
                var n = i.extend(!0, {}, e, t);
                return i.each(t, (function (e, t) {
                    i.isArray(t) && (n[e] = t)
                })), n
            }, f = function (e) {
                var n, a;
                return !(!e || e.ownerDocument !== t) && (i(".fancybox-container").css("pointer-events", "none"), n = {
                    x: e.getBoundingClientRect().left + e.offsetWidth / 2,
                    y: e.getBoundingClientRect().top + e.offsetHeight / 2
                }, a = t.elementFromPoint(n.x, n.y) === e, i(".fancybox-container").css("pointer-events", ""), a)
            }, m = function (e, t, n) {
                var a = this;
                a.opts = h({index: n}, i.fancybox.defaults), i.isPlainObject(t) && (a.opts = h(a.opts, t)), i.fancybox.isMobile && (a.opts = h(a.opts, a.opts.mobile)), a.id = a.opts.id || ++l, a.currIndex = parseInt(a.opts.index, 10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = !0, a.group = [], a.slides = {}, a.addContent(e), a.group.length && a.init()
            };
        i.extend(m.prototype, {
            init: function () {
                var n, a, o = this, s = o.group[o.currIndex].opts;
                s.closeExisting && i.fancybox.close(!0), i("body").addClass("fancybox-active"), !i.fancybox.getInstance() && !1 !== s.hideScrollbar && !i.fancybox.isMobile && t.body.scrollHeight > e.innerHeight && (i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (e.innerWidth - t.documentElement.clientWidth) + "px;}</style>"), i("body").addClass("compensate-for-scrollbar")), a = "", i.each(s.buttons, (function (e, t) {
                    a += s.btnTpl[t] || ""
                })), n = i(o.translate(o, s.baseTpl.replace("{{buttons}}", a).replace("{{arrows}}", s.btnTpl.arrowLeft + s.btnTpl.arrowRight))).attr("id", "fancybox-container-" + o.id).addClass(s.baseClass).data("FancyBox", o).appendTo(s.parentEl), o.$refs = {container: n}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach((function (e) {
                    o.$refs[e] = n.find(".fancybox-" + e)
                })), o.trigger("onInit"), o.activate(), o.jumpTo(o.currIndex)
            }, translate: function (e, t) {
                var i = e.opts.i18n[e.opts.lang] || e.opts.i18n.en;
                return t.replace(/\{\{(\w+)\}\}/g, (function (e, t) {
                    return void 0 === i[t] ? e : i[t]
                }))
            }, addContent: function (e) {
                var t, n = this, a = i.makeArray(e);
                i.each(a, (function (e, t) {
                    var a, o, s, r, l, d = {}, c = {};
                    i.isPlainObject(t) ? (d = t, c = t.opts || t) : "object" === i.type(t) && i(t).length ? (c = (a = i(t)).data() || {}, (c = i.extend(!0, {}, c, c.options)).$orig = a, d.src = n.opts.src || c.src || a.attr("href"), d.type || d.src || (d.type = "inline", d.src = t)) : d = {
                        type: "html",
                        src: t + ""
                    }, d.opts = i.extend(!0, {}, n.opts, c), i.isArray(c.buttons) && (d.opts.buttons = c.buttons), i.fancybox.isMobile && d.opts.mobile && (d.opts = h(d.opts, d.opts.mobile)), o = d.type || d.opts.type, r = d.src || "", !o && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (o = "video", d.opts.video.format || (d.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? o = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (o = "iframe", d = i.extend(!0, d, {
                        contentType: "pdf",
                        opts: {iframe: {preload: !1}}
                    })) : "#" === r.charAt(0) && (o = "inline")), o ? d.type = o : n.trigger("objectNeedsType", d), d.contentType || (d.contentType = i.inArray(d.type, ["html", "inline", "ajax"]) > -1 ? "html" : d.type), d.index = n.group.length, "auto" == d.opts.smallBtn && (d.opts.smallBtn = i.inArray(d.type, ["html", "inline", "ajax"]) > -1), "auto" === d.opts.toolbar && (d.opts.toolbar = !d.opts.smallBtn), d.$thumb = d.opts.$thumb || null, d.opts.$trigger && d.index === n.opts.index && (d.$thumb = d.opts.$trigger.find("img:first"), d.$thumb.length && (d.opts.$orig = d.opts.$trigger)), d.$thumb && d.$thumb.length || !d.opts.$orig || (d.$thumb = d.opts.$orig.find("img:first")), d.$thumb && !d.$thumb.length && (d.$thumb = null), d.thumb = d.opts.thumb || (d.$thumb ? d.$thumb[0].src : null), "function" === i.type(d.opts.caption) && (d.opts.caption = d.opts.caption.apply(t, [n, d])), "function" === i.type(n.opts.caption) && (d.opts.caption = n.opts.caption.apply(t, [n, d])), d.opts.caption instanceof i || (d.opts.caption = void 0 === d.opts.caption ? "" : d.opts.caption + ""), "ajax" === d.type && ((l = r.split(/\s+/, 2)).length > 1 && (d.src = l.shift(), d.opts.filter = l.shift())), d.opts.modal && (d.opts = i.extend(!0, d.opts, {
                        trapFocus: !0,
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), n.group.push(d)
                })), Object.keys(n.slides).length && (n.updateControls(), (t = n.Thumbs) && t.isActive && (t.create(), t.focus()))
            }, addEvents: function () {
                var t = this;
                t.removeEvents(), t.$refs.container.on("click.fb-close", "[data-fancybox-close]", (function (e) {
                    e.stopPropagation(), e.preventDefault(), t.close(e)
                })).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", (function (e) {
                    e.stopPropagation(), e.preventDefault(), t.previous()
                })).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", (function (e) {
                    e.stopPropagation(), e.preventDefault(), t.next()
                })).on("click.fb", "[data-fancybox-zoom]", (function (e) {
                    t[t.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                })), s.on("orientationchange.fb resize.fb", (function (e) {
                    e && e.originalEvent && "resize" === e.originalEvent.type ? (t.requestId && c(t.requestId), t.requestId = d((function () {
                        t.update(e)
                    }))) : (t.current && "iframe" === t.current.type && t.$refs.stage.hide(), setTimeout((function () {
                        t.$refs.stage.show(), t.update(e)
                    }), i.fancybox.isMobile ? 600 : 250))
                })), r.on("keydown.fb", (function (e) {
                    var n = (i.fancybox ? i.fancybox.getInstance() : null).current, a = e.keyCode || e.which;
                    if (9 != a) return !n.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || i(e.target).is("input,textarea,video,audio") ? void 0 : 8 === a || 27 === a ? (e.preventDefault(), void t.close(e)) : 37 === a || 38 === a ? (e.preventDefault(), void t.previous()) : 39 === a || 40 === a ? (e.preventDefault(), void t.next()) : void t.trigger("afterKeydown", e, a);
                    n.opts.trapFocus && t.focus(e)
                })), t.group[t.currIndex].opts.idleTime && (t.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", (function (e) {
                    t.idleSecondsCounter = 0, t.isIdle && t.showControls(), t.isIdle = !1
                })), t.idleInterval = e.setInterval((function () {
                    ++t.idleSecondsCounter >= t.group[t.currIndex].opts.idleTime && !t.isDragging && (t.isIdle = !0, t.idleSecondsCounter = 0, t.hideControls())
                }), 1e3))
            }, removeEvents: function () {
                var t = this;
                s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), t.idleInterval && (e.clearInterval(t.idleInterval), t.idleInterval = null)
            }, previous: function (e) {
                return this.jumpTo(this.currPos - 1, e)
            }, next: function (e) {
                return this.jumpTo(this.currPos + 1, e)
            }, jumpTo: function (e, t) {
                var n, a, o, s, r, l, d, c, p, h = this, f = h.group.length;
                if (!(h.isDragging || h.isClosing || h.isAnimating && h.firstRun)) {
                    if (e = parseInt(e, 10), !(o = h.current ? h.current.opts.loop : h.opts.loop) && (e < 0 || e >= f)) return !1;
                    if (n = h.firstRun = !Object.keys(h.slides).length, r = h.current, h.prevIndex = h.currIndex, h.prevPos = h.currPos, s = h.createSlide(e), f > 1 && ((o || s.index < f - 1) && h.createSlide(e + 1), (o || s.index > 0) && h.createSlide(e - 1)), h.current = s, h.currIndex = s.index, h.currPos = s.pos, h.trigger("beforeShow", n), h.updateControls(), s.forcedDuration = void 0, i.isNumeric(t) ? s.forcedDuration = t : t = s.opts[n ? "animationDuration" : "transitionDuration"], t = parseInt(t, 10), a = h.isMoved(s), s.$slide.addClass("fancybox-slide--current"), n) return s.opts.animationEffect && t && h.$refs.container.css("transition-duration", t + "ms"), h.$refs.container.addClass("fancybox-is-open").trigger("focus"), h.loadSlide(s), void h.preload("image");
                    l = i.fancybox.getTranslate(r.$slide), d = i.fancybox.getTranslate(h.$refs.stage), i.each(h.slides, (function (e, t) {
                        i.fancybox.stop(t.$slide, !0)
                    })), r.pos !== s.pos && (r.isComplete = !1), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), a ? (p = l.left - (r.pos * l.width + r.pos * r.opts.gutter), i.each(h.slides, (function (e, n) {
                        n.$slide.removeClass("fancybox-animated").removeClass((function (e, t) {
                            return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                        }));
                        var a = n.pos * l.width + n.pos * n.opts.gutter;
                        i.fancybox.setTranslate(n.$slide, {
                            top: 0,
                            left: a - d.left + p
                        }), n.pos !== s.pos && n.$slide.addClass("fancybox-slide--" + (n.pos > s.pos ? "next" : "previous")), u(n.$slide), i.fancybox.animate(n.$slide, {
                            top: 0,
                            left: (n.pos - s.pos) * l.width + (n.pos - s.pos) * n.opts.gutter
                        }, t, (function () {
                            n.$slide.css({
                                transform: "",
                                opacity: ""
                            }).removeClass("fancybox-slide--next fancybox-slide--previous"), n.pos === h.currPos && h.complete()
                        }))
                    }))) : t && s.opts.transitionEffect && (c = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")), i.fancybox.animate(r.$slide, c, t, (function () {
                        r.$slide.removeClass(c).removeClass("fancybox-slide--next fancybox-slide--previous")
                    }), !1)), s.isLoaded ? h.revealContent(s) : h.loadSlide(s), h.preload("image")
                }
            }, createSlide: function (e) {
                var t, n, a = this;
                return n = (n = e % a.group.length) < 0 ? a.group.length + n : n, !a.slides[e] && a.group[n] && (t = i('<div class="fancybox-slide"></div>').appendTo(a.$refs.stage), a.slides[e] = i.extend(!0, {}, a.group[n], {
                    pos: e,
                    $slide: t,
                    isLoaded: !1
                }), a.updateSlide(a.slides[e])), a.slides[e]
            }, scaleToActual: function (e, t, n) {
                var a, o, s, r, l, d = this, c = d.current, p = c.$content, u = i.fancybox.getTranslate(c.$slide).width,
                    h = i.fancybox.getTranslate(c.$slide).height, f = c.width, m = c.height;
                d.isAnimating || d.isMoved() || !p || "image" != c.type || !c.isLoaded || c.hasError || (d.isAnimating = !0, i.fancybox.stop(p), e = void 0 === e ? .5 * u : e, t = void 0 === t ? .5 * h : t, (a = i.fancybox.getTranslate(p)).top -= i.fancybox.getTranslate(c.$slide).top, a.left -= i.fancybox.getTranslate(c.$slide).left, r = f / a.width, l = m / a.height, o = .5 * u - .5 * f, s = .5 * h - .5 * m, f > u && ((o = a.left * r - (e * r - e)) > 0 && (o = 0), o < u - f && (o = u - f)), m > h && ((s = a.top * l - (t * l - t)) > 0 && (s = 0), s < h - m && (s = h - m)), d.updateCursor(f, m), i.fancybox.animate(p, {
                    top: s,
                    left: o,
                    scaleX: r,
                    scaleY: l
                }, n || 366, (function () {
                    d.isAnimating = !1
                })), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
            }, scaleToFit: function (e) {
                var t, n = this, a = n.current, o = a.$content;
                n.isAnimating || n.isMoved() || !o || "image" != a.type || !a.isLoaded || a.hasError || (n.isAnimating = !0, i.fancybox.stop(o), t = n.getFitPos(a), n.updateCursor(t.width, t.height), i.fancybox.animate(o, {
                    top: t.top,
                    left: t.left,
                    scaleX: t.width / o.width(),
                    scaleY: t.height / o.height()
                }, e || 366, (function () {
                    n.isAnimating = !1
                })))
            }, getFitPos: function (e) {
                var t, n, a, o, s = e.$content, r = e.$slide, l = e.width || e.opts.width,
                    d = e.height || e.opts.height, c = {};
                return !!(e.isLoaded && s && s.length) && (t = i.fancybox.getTranslate(this.$refs.stage).width, n = i.fancybox.getTranslate(this.$refs.stage).height, t -= parseFloat(r.css("paddingLeft")) + parseFloat(r.css("paddingRight")) + parseFloat(s.css("marginLeft")) + parseFloat(s.css("marginRight")), n -= parseFloat(r.css("paddingTop")) + parseFloat(r.css("paddingBottom")) + parseFloat(s.css("marginTop")) + parseFloat(s.css("marginBottom")), l && d || (l = t, d = n), (l *= a = Math.min(1, t / l, n / d)) > t - .5 && (l = t), (d *= a) > n - .5 && (d = n), "image" === e.type ? (c.top = Math.floor(.5 * (n - d)) + parseFloat(r.css("paddingTop")), c.left = Math.floor(.5 * (t - l)) + parseFloat(r.css("paddingLeft"))) : "video" === e.contentType && (d > l / (o = e.opts.width && e.opts.height ? l / d : e.opts.ratio || 16 / 9) ? d = l / o : l > d * o && (l = d * o)), c.width = l, c.height = d, c)
            }, update: function (e) {
                var t = this;
                i.each(t.slides, (function (i, n) {
                    t.updateSlide(n, e)
                }))
            }, updateSlide: function (e, t) {
                var n = this, a = e && e.$content, o = e.width || e.opts.width, s = e.height || e.opts.height,
                    r = e.$slide;
                n.adjustCaption(e), a && (o || s || "video" === e.contentType) && !e.hasError && (i.fancybox.stop(a), i.fancybox.setTranslate(a, n.getFitPos(e)), e.pos === n.currPos && (n.isAnimating = !1, n.updateCursor())), n.adjustLayout(e), r.length && (r.trigger("refresh"), e.pos === n.currPos && n.$refs.toolbar.add(n.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)), n.trigger("onUpdate", e, t)
            }, centerSlide: function (e) {
                var t = this, n = t.current, a = n.$slide;
                !t.isClosing && n && (a.siblings().css({
                    transform: "",
                    opacity: ""
                }), a.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), i.fancybox.animate(a, {
                    top: 0,
                    left: 0,
                    opacity: 1
                }, void 0 === e ? 0 : e, (function () {
                    a.css({transform: "", opacity: ""}), n.isComplete || t.complete()
                }), !1))
            }, isMoved: function (e) {
                var t, n, a = e || this.current;
                return !!a && (n = i.fancybox.getTranslate(this.$refs.stage), t = i.fancybox.getTranslate(a.$slide), !a.$slide.hasClass("fancybox-animated") && (Math.abs(t.top - n.top) > .5 || Math.abs(t.left - n.left) > .5))
            }, updateCursor: function (e, t) {
                var n, a, o = this, s = o.current, r = o.$refs.container;
                s && !o.isClosing && o.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), a = !!(n = o.canPan(e, t)) || o.isZoomable(), r.toggleClass("fancybox-is-zoomable", a), i("[data-fancybox-zoom]").prop("disabled", !a), n ? r.addClass("fancybox-can-pan") : a && ("zoom" === s.opts.clickContent || i.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || o.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
            }, isZoomable: function () {
                var e, t = this, i = t.current;
                if (i && !t.isClosing && "image" === i.type && !i.hasError) {
                    if (!i.isLoaded) return !0;
                    if ((e = t.getFitPos(i)) && (i.width > e.width || i.height > e.height)) return !0
                }
                return !1
            }, isScaledDown: function (e, t) {
                var n = !1, a = this.current, o = a.$content;
                return void 0 !== e && void 0 !== t ? n = e < a.width && t < a.height : o && (n = (n = i.fancybox.getTranslate(o)).width < a.width && n.height < a.height), n
            }, canPan: function (e, t) {
                var n = this.current, a = null, o = !1;
                return "image" === n.type && (n.isComplete || e && t) && !n.hasError && (o = this.getFitPos(n), void 0 !== e && void 0 !== t ? a = {
                    width: e,
                    height: t
                } : n.isComplete && (a = i.fancybox.getTranslate(n.$content)), a && o && (o = Math.abs(a.width - o.width) > 1.5 || Math.abs(a.height - o.height) > 1.5)), o
            }, loadSlide: function (e) {
                var t, n, a, o = this;
                if (!e.isLoading && !e.isLoaded) {
                    if (e.isLoading = !0, !1 === o.trigger("beforeLoad", e)) return e.isLoading = !1, !1;
                    switch (t = e.type, (n = e.$slide).off("refresh").trigger("onReset").addClass(e.opts.slideClass), t) {
                        case"image":
                            o.setImage(e);
                            break;
                        case"iframe":
                            o.setIframe(e);
                            break;
                        case"html":
                            o.setContent(e, e.src || e.content);
                            break;
                        case"video":
                            o.setContent(e, e.opts.video.tpl.replace(/\{\{src\}\}/gi, e.src).replace("{{format}}", e.opts.videoFormat || e.opts.video.format || "").replace("{{poster}}", e.thumb || ""));
                            break;
                        case"inline":
                            i(e.src).length ? o.setContent(e, i(e.src)) : o.setError(e);
                            break;
                        case"ajax":
                            o.showLoading(e), a = i.ajax(i.extend({}, e.opts.ajax.settings, {
                                url: e.src,
                                success: function (t, i) {
                                    "success" === i && o.setContent(e, t)
                                },
                                error: function (t, i) {
                                    t && "abort" !== i && o.setError(e)
                                }
                            })), n.one("onReset", (function () {
                                a.abort()
                            }));
                            break;
                        default:
                            o.setError(e)
                    }
                    return !0
                }
            }, setImage: function (e) {
                var n, a = this;
                setTimeout((function () {
                    var t = e.$image;
                    a.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || a.showLoading(e)
                }), 50), a.checkSrcset(e), e.$content = i('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")), !1 !== e.opts.preload && e.opts.width && e.opts.height && e.thumb && (e.width = e.opts.width, e.height = e.opts.height, (n = t.createElement("img")).onerror = function () {
                    i(this).remove(), e.$ghost = null
                }, n.onload = function () {
                    a.afterLoad(e)
                }, e.$ghost = i(n).addClass("fancybox-image").appendTo(e.$content).attr("src", e.thumb)), a.setBigImage(e)
            }, checkSrcset: function (t) {
                var i, n, a, o, s = t.opts.srcset || t.opts.image.srcset;
                if (s) {
                    a = e.devicePixelRatio || 1, o = e.innerWidth * a, (n = s.split(",").map((function (e) {
                        var t = {};
                        return e.trim().split(/\s+/).forEach((function (e, i) {
                            var n = parseInt(e.substring(0, e.length - 1), 10);
                            if (0 === i) return t.url = e;
                            n && (t.value = n, t.postfix = e[e.length - 1])
                        })), t
                    }))).sort((function (e, t) {
                        return e.value - t.value
                    }));
                    for (var r = 0; r < n.length; r++) {
                        var l = n[r];
                        if ("w" === l.postfix && l.value >= o || "x" === l.postfix && l.value >= a) {
                            i = l;
                            break
                        }
                    }
                    !i && n.length && (i = n[n.length - 1]), i && (t.src = i.url, t.width && t.height && "w" == i.postfix && (t.height = t.width / t.height * i.value, t.width = i.value), t.opts.srcset = s)
                }
            }, setBigImage: function (e) {
                var n = this, a = t.createElement("img"), o = i(a);
                e.$image = o.one("error", (function () {
                    n.setError(e)
                })).one("load", (function () {
                    var t;
                    e.$ghost || (n.resolveImageSlideSize(e, this.naturalWidth, this.naturalHeight), n.afterLoad(e)), n.isClosing || (e.opts.srcset && ((t = e.opts.sizes) && "auto" !== t || (t = (e.width / e.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(e.width / e.height * 100)) + "vw"), o.attr("sizes", t).attr("srcset", e.opts.srcset)), e.$ghost && setTimeout((function () {
                        e.$ghost && !n.isClosing && e.$ghost.hide()
                    }), Math.min(300, Math.max(1e3, e.height / 1600))), n.hideLoading(e))
                })).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content), (a.complete || "complete" == a.readyState) && o.naturalWidth && o.naturalHeight ? o.trigger("load") : a.error && o.trigger("error")
            }, resolveImageSlideSize: function (e, t, i) {
                var n = parseInt(e.opts.width, 10), a = parseInt(e.opts.height, 10);
                e.width = t, e.height = i, n > 0 && (e.width = n, e.height = Math.floor(n * i / t)), a > 0 && (e.width = Math.floor(a * t / i), e.height = a)
            }, setIframe: function (e) {
                var t, n = this, a = e.opts.iframe, o = e.$slide;
                e.$content = i('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(o), o.addClass("fancybox-slide--" + e.contentType), e.$iframe = t = i(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(e.$content), a.preload ? (n.showLoading(e), t.on("load.fb error.fb", (function (t) {
                    this.isReady = 1, e.$slide.trigger("refresh"), n.afterLoad(e)
                })), o.on("refresh.fb", (function () {
                    var i, n = e.$content, s = a.css.width, r = a.css.height;
                    if (1 === t[0].isReady) {
                        try {
                            i = t.contents().find("body")
                        } catch (e) {
                        }
                        i && i.length && i.children().length && (o.css("overflow", "visible"), n.css({
                            width: "100%",
                            "max-width": "100%",
                            height: "9999px"
                        }), void 0 === s && (s = Math.ceil(Math.max(i[0].clientWidth, i.outerWidth(!0)))), n.css("width", s || "").css("max-width", ""), void 0 === r && (r = Math.ceil(Math.max(i[0].clientHeight, i.outerHeight(!0)))), n.css("height", r || ""), o.css("overflow", "auto")), n.removeClass("fancybox-is-hidden")
                    }
                }))) : n.afterLoad(e), t.attr("src", e.src), o.one("onReset", (function () {
                    try {
                        i(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (e) {
                    }
                    i(this).off("refresh.fb").empty(), e.isLoaded = !1, e.isRevealed = !1
                }))
            }, setContent: function (e, t) {
                var n = this;
                n.isClosing || (n.hideLoading(e), e.$content && i.fancybox.stop(e.$content), e.$slide.empty(), function (e) {
                    return e && e.hasOwnProperty && e instanceof i
                }(t) && t.parent().length ? ((t.hasClass("fancybox-content") || t.parent().hasClass("fancybox-content")) && t.parents(".fancybox-slide").trigger("onReset"), e.$placeholder = i("<div>").hide().insertAfter(t), t.css("display", "inline-block")) : e.hasError || ("string" === i.type(t) && (t = i("<div>").append(i.trim(t)).contents()), e.opts.filter && (t = i("<div>").html(t).find(e.opts.filter))), e.$slide.one("onReset", (function () {
                    i(this).find("video,audio").trigger("pause"), e.$placeholder && (e.$placeholder.after(t.removeClass("fancybox-content").hide()).remove(), e.$placeholder = null), e.$smallBtn && (e.$smallBtn.remove(), e.$smallBtn = null), e.hasError || (i(this).empty(), e.isLoaded = !1, e.isRevealed = !1)
                })), i(t).appendTo(e.$slide), i(t).is("video,audio") && (i(t).addClass("fancybox-video"), i(t).wrap("<div></div>"), e.contentType = "video", e.opts.width = e.opts.width || i(t).attr("width"), e.opts.height = e.opts.height || i(t).attr("height")), e.$content = e.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), e.$content.siblings().hide(), e.$content.length || (e.$content = e.$slide.wrapInner("<div></div>").children().first()), e.$content.addClass("fancybox-content"), e.$slide.addClass("fancybox-slide--" + e.contentType), n.afterLoad(e))
            }, setError: function (e) {
                e.hasError = !0, e.$slide.trigger("onReset").removeClass("fancybox-slide--" + e.contentType).addClass("fancybox-slide--error"), e.contentType = "html", this.setContent(e, this.translate(e, e.opts.errorTpl)), e.pos === this.currPos && (this.isAnimating = !1)
            }, showLoading: function (e) {
                var t = this;
                (e = e || t.current) && !e.$spinner && (e.$spinner = i(t.translate(t, t.opts.spinnerTpl)).appendTo(e.$slide).hide().fadeIn("fast"))
            }, hideLoading: function (e) {
                (e = e || this.current) && e.$spinner && (e.$spinner.stop().remove(), delete e.$spinner)
            }, afterLoad: function (e) {
                var t = this;
                t.isClosing || (e.isLoading = !1, e.isLoaded = !0, t.trigger("afterLoad", e), t.hideLoading(e), !e.opts.smallBtn || e.$smallBtn && e.$smallBtn.length || (e.$smallBtn = i(t.translate(e, e.opts.btnTpl.smallBtn)).appendTo(e.$content)), e.opts.protect && e.$content && !e.hasError && (e.$content.on("contextmenu.fb", (function (e) {
                    return 2 == e.button && e.preventDefault(), !0
                })), "image" === e.type && i('<div class="fancybox-spaceball"></div>').appendTo(e.$content)), t.adjustCaption(e), t.adjustLayout(e), e.pos === t.currPos && t.updateCursor(), t.revealContent(e))
            }, adjustCaption: function (e) {
                var t, i = this, n = e || i.current, a = n.opts.caption, o = n.opts.preventCaptionOverlap,
                    s = i.$refs.caption, r = !1;
                s.toggleClass("fancybox-caption--separate", o), o && a && a.length && (n.pos !== i.currPos ? ((t = s.clone().appendTo(s.parent())).children().eq(0).empty().html(a), r = t.outerHeight(!0), t.empty().remove()) : i.$caption && (r = i.$caption.outerHeight(!0)), n.$slide.css("padding-bottom", r || ""))
            }, adjustLayout: function (e) {
                var t, i, n, a, o = e || this.current;
                o.isLoaded && !0 !== o.opts.disableLayoutFix && (o.$content.css("margin-bottom", ""), o.$content.outerHeight() > o.$slide.height() + .5 && (n = o.$slide[0].style["padding-bottom"], a = o.$slide.css("padding-bottom"), parseFloat(a) > 0 && (t = o.$slide[0].scrollHeight, o.$slide.css("padding-bottom", 0), Math.abs(t - o.$slide[0].scrollHeight) < 1 && (i = a), o.$slide.css("padding-bottom", n))), o.$content.css("margin-bottom", i))
            }, revealContent: function (e) {
                var t, n, a, o, s = this, r = e.$slide, l = !1, d = !1, c = s.isMoved(e), p = e.isRevealed;
                return e.isRevealed = !0, t = e.opts[s.firstRun ? "animationEffect" : "transitionEffect"], a = e.opts[s.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(void 0 === e.forcedDuration ? a : e.forcedDuration, 10), !c && e.pos === s.currPos && a || (t = !1), "zoom" === t && (e.pos === s.currPos && a && "image" === e.type && !e.hasError && (d = s.getThumbPos(e)) ? l = s.getFitPos(e) : t = "fade"), "zoom" === t ? (s.isAnimating = !0, l.scaleX = l.width / d.width, l.scaleY = l.height / d.height, "auto" == (o = e.opts.zoomOpacity) && (o = Math.abs(e.width / e.height - d.width / d.height) > .1), o && (d.opacity = .1, l.opacity = 1), i.fancybox.setTranslate(e.$content.removeClass("fancybox-is-hidden"), d), u(e.$content), void i.fancybox.animate(e.$content, l, a, (function () {
                    s.isAnimating = !1, s.complete()
                }))) : (s.updateSlide(e), t ? (i.fancybox.stop(r), n = "fancybox-slide--" + (e.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + t, r.addClass(n).removeClass("fancybox-slide--current"), e.$content.removeClass("fancybox-is-hidden"), u(r), "image" !== e.type && e.$content.hide().show(0), void i.fancybox.animate(r, "fancybox-slide--current", a, (function () {
                    r.removeClass(n).css({transform: "", opacity: ""}), e.pos === s.currPos && s.complete()
                }), !0)) : (e.$content.removeClass("fancybox-is-hidden"), p || !c || "image" !== e.type || e.hasError || e.$content.hide().fadeIn("fast"), void(e.pos === s.currPos && s.complete())))
            }, getThumbPos: function (e) {
                var t, n, a, o, s, r = !1, l = e.$thumb;
                return !(!l || !f(l[0])) && (t = i.fancybox.getTranslate(l), n = parseFloat(l.css("border-top-width") || 0), a = parseFloat(l.css("border-right-width") || 0), o = parseFloat(l.css("border-bottom-width") || 0), s = parseFloat(l.css("border-left-width") || 0), r = {
                    top: t.top + n,
                    left: t.left + s,
                    width: t.width - a - s,
                    height: t.height - n - o,
                    scaleX: 1,
                    scaleY: 1
                }, t.width > 0 && t.height > 0 && r)
            }, complete: function () {
                var e, t = this, n = t.current, a = {};
                !t.isMoved() && n.isLoaded && (n.isComplete || (n.isComplete = !0, n.$slide.siblings().trigger("onReset"), t.preload("inline"), u(n.$slide), n.$slide.addClass("fancybox-slide--complete"), i.each(t.slides, (function (e, n) {
                    n.pos >= t.currPos - 1 && n.pos <= t.currPos + 1 ? a[n.pos] = n : n && (i.fancybox.stop(n.$slide), n.$slide.off().remove())
                })), t.slides = a), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"), n.opts.video.autoStart && n.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", (function () {
                    this.webkitExitFullscreen && this.webkitExitFullscreen(), t.next()
                })), n.opts.autoFocus && "html" === n.contentType && ((e = n.$content.find("input[autofocus]:enabled:visible:first")).length ? e.trigger("focus") : t.focus(null, !0)), n.$slide.scrollTop(0).scrollLeft(0))
            }, preload: function (e) {
                var t, i, n = this;
                n.group.length < 2 || (i = n.slides[n.currPos + 1], (t = n.slides[n.currPos - 1]) && t.type === e && n.loadSlide(t), i && i.type === e && n.loadSlide(i))
            }, focus: function (e, n) {
                var a, o, s = this,
                    r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                s.isClosing || ((a = (a = !e && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (n ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible")).filter(r).filter((function () {
                    return "hidden" !== i(this).css("visibility") && !i(this).hasClass("disabled")
                }))).length ? (o = a.index(t.activeElement), e && e.shiftKey ? (o < 0 || 0 == o) && (e.preventDefault(), a.eq(a.length - 1).trigger("focus")) : (o < 0 || o == a.length - 1) && (e && e.preventDefault(), a.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
            }, activate: function () {
                var e = this;
                i(".fancybox-container").each((function () {
                    var t = i(this).data("FancyBox");
                    t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
                })), e.isVisible = !0, (e.current || e.isIdle) && (e.update(), e.updateControls()), e.trigger("onActivate"), e.addEvents()
            }, close: function (e, t) {
                var n, a, o, s, r, l, c, p = this, h = p.current, f = function () {
                    p.cleanUp(e)
                };
                return !(p.isClosing || (p.isClosing = !0, !1 === p.trigger("beforeClose", e) ? (p.isClosing = !1, d((function () {
                    p.update()
                })), 1) : (p.removeEvents(), o = h.$content, n = h.opts.animationEffect, a = i.isNumeric(t) ? t : n ? h.opts.animationDuration : 0, h.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== e ? i.fancybox.stop(h.$slide) : n = !1, h.$slide.siblings().trigger("onReset").remove(), a && p.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", a + "ms"), p.hideLoading(h), p.hideControls(!0), p.updateCursor(), "zoom" !== n || o && a && "image" === h.type && !p.isMoved() && !h.hasError && (c = p.getThumbPos(h)) || (n = "fade"), "zoom" === n ? (i.fancybox.stop(o), s = i.fancybox.getTranslate(o), l = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / c.width,
                    scaleY: s.height / c.height,
                    width: c.width,
                    height: c.height
                }, r = h.opts.zoomOpacity, "auto" == r && (r = Math.abs(h.width / h.height - c.width / c.height) > .1), r && (c.opacity = 0), i.fancybox.setTranslate(o, l), u(o), i.fancybox.animate(o, c, a, f), 0) : (n && a ? i.fancybox.animate(h.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + n, a, f) : !0 === e ? setTimeout(f, a) : f(), 0))))
            }, cleanUp: function (t) {
                var n, a, o, s = this, r = s.current.opts.$orig;
                s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", t), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (a = e.scrollX, o = e.scrollY, r.trigger("focus"), i("html, body").scrollTop(o).scrollLeft(a))), s.current = null, (n = i.fancybox.getInstance()) ? n.activate() : (i("body").removeClass("fancybox-active compensate-for-scrollbar"), i("#fancybox-style-noscroll").remove())
            }, trigger: function (e, t) {
                var n, a = Array.prototype.slice.call(arguments, 1), o = this, s = t && t.opts ? t : o.current;
                if (s ? a.unshift(s) : s = o, a.unshift(o), i.isFunction(s.opts[e]) && (n = s.opts[e].apply(s, a)), !1 === n) return n;
                "afterClose" !== e && o.$refs ? o.$refs.container.trigger(e + ".fb", a) : r.trigger(e + ".fb", a)
            }, updateControls: function () {
                var e = this, n = e.current, a = n.index, o = e.$refs.container, s = e.$refs.caption,
                    r = n.opts.caption;
                n.$slide.trigger("refresh"), r && r.length ? (e.$caption = s, s.children().eq(0).html(r)) : e.$caption = null, e.hasHiddenControls || e.isIdle || e.showControls(), o.find("[data-fancybox-count]").html(e.group.length), o.find("[data-fancybox-index]").html(a + 1), o.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && a <= 0), o.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && a >= e.group.length - 1), "image" === n.type ? o.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : n.opts.toolbar && o.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), i(t.activeElement).is(":hidden,[disabled]") && e.$refs.container.trigger("focus")
            }, hideControls: function (e) {
                var t = ["infobar", "toolbar", "nav"];
                !e && this.current.opts.preventCaptionOverlap || t.push("caption"), this.$refs.container.removeClass(t.map((function (e) {
                    return "fancybox-show-" + e
                })).join(" ")), this.hasHiddenControls = !0
            }, showControls: function () {
                var e = this, t = e.current ? e.current.opts : e.opts, i = e.$refs.container;
                e.hasHiddenControls = !1, e.idleSecondsCounter = 0, i.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons)).toggleClass("fancybox-show-infobar", !!(t.infobar && e.group.length > 1)).toggleClass("fancybox-show-caption", !!e.$caption).toggleClass("fancybox-show-nav", !!(t.arrows && e.group.length > 1)).toggleClass("fancybox-is-modal", !!t.modal)
            }, toggleControls: function () {
                this.hasHiddenControls ? this.showControls() : this.hideControls()
            }
        }), i.fancybox = {
            version: "3.5.6",
            defaults: o,
            getInstance: function (e) {
                var t = i('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    n = Array.prototype.slice.call(arguments, 1);
                return t instanceof m && ("string" === i.type(e) ? t[e].apply(t, n) : "function" === i.type(e) && e.apply(t, n), t)
            },
            open: function (e, t, i) {
                return new m(e, t, i)
            },
            close: function (e) {
                var t = this.getInstance();
                t && (t.close(), !0 === e && this.close(e))
            },
            destroy: function () {
                this.close(!0), r.add("body").off("click.fb-start", "**")
            },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function () {
                var i = t.createElement("div");
                return e.getComputedStyle && e.getComputedStyle(i) && e.getComputedStyle(i).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11)
            }(),
            getTranslate: function (e) {
                var t;
                return !(!e || !e.length) && {
                    top: (t = e[0].getBoundingClientRect()).top || 0,
                    left: t.left || 0,
                    width: t.width,
                    height: t.height,
                    opacity: parseFloat(e.css("opacity"))
                }
            },
            setTranslate: function (e, t) {
                var i = "", n = {};
                if (e && t) return void 0 === t.left && void 0 === t.top || (i = (void 0 === t.left ? e.position().left : t.left) + "px, " + (void 0 === t.top ? e.position().top : t.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"), void 0 !== t.scaleX && void 0 !== t.scaleY ? i += " scale(" + t.scaleX + ", " + t.scaleY + ")" : void 0 !== t.scaleX && (i += " scaleX(" + t.scaleX + ")"), i.length && (n.transform = i), void 0 !== t.opacity && (n.opacity = t.opacity), void 0 !== t.width && (n.width = t.width), void 0 !== t.height && (n.height = t.height), e.css(n)
            },
            animate: function (e, t, n, a, o) {
                var s, r = this;
                i.isFunction(n) && (a = n, n = null), r.stop(e), s = r.getTranslate(e), e.on(p, (function (l) {
                    (!l || !l.originalEvent || e.is(l.originalEvent.target) && "z-index" != l.originalEvent.propertyName) && (r.stop(e), i.isNumeric(n) && e.css("transition-duration", ""), i.isPlainObject(t) ? void 0 !== t.scaleX && void 0 !== t.scaleY && r.setTranslate(e, {
                        top: t.top,
                        left: t.left,
                        width: s.width * t.scaleX,
                        height: s.height * t.scaleY,
                        scaleX: 1,
                        scaleY: 1
                    }) : !0 !== o && e.removeClass(t), i.isFunction(a) && a(l))
                })), i.isNumeric(n) && e.css("transition-duration", n + "ms"), i.isPlainObject(t) ? (void 0 !== t.scaleX && void 0 !== t.scaleY && (delete t.width, delete t.height, e.parent().hasClass("fancybox-slide--image") && e.parent().addClass("fancybox-is-scaling")), i.fancybox.setTranslate(e, t)) : e.addClass(t), e.data("timer", setTimeout((function () {
                    e.trigger(p)
                }), n + 33))
            },
            stop: function (e, t) {
                e && e.length && (clearTimeout(e.data("timer")), t && e.trigger(p), e.off(p).css("transition-duration", ""), e.parent().removeClass("fancybox-is-scaling"))
            }
        }, i.fn.fancybox = function (e) {
            var t;
            return (t = (e = e || {}).selector || !1) ? i("body").off("click.fb-start", t).on("click.fb-start", t, {options: e}, a) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: e
            }, a), this
        }, r.on("click.fb-start", "[data-fancybox]", a), r.on("click.fb-start", "[data-fancybox-trigger]", (function (e) {
            i('[data-fancybox="' + i(this).attr("data-fancybox-trigger") + '"]').eq(i(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {$trigger: i(this)})
        })), function () {
            var e = null;
            r.on("mousedown mouseup focus blur", ".fancybox-button", (function (t) {
                switch (t.type) {
                    case"mousedown":
                        e = i(this);
                        break;
                    case"mouseup":
                        e = null;
                        break;
                    case"focusin":
                        i(".fancybox-button").removeClass("fancybox-focus"), i(this).is(e) || i(this).is("[disabled]") || i(this).addClass("fancybox-focus");
                        break;
                    case"focusout":
                        i(".fancybox-button").removeClass("fancybox-focus")
                }
            }))
        }()
    }
}(window, document, jQuery), function (e) {
    "use strict";
    var t = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1},
            paramPlace: 8,
            type: "iframe",
            url: "https://www.youtube-nocookie.com/embed/$4",
            thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1},
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (e) {
                return "//maps.google." + e[2] + "/?ll=" + (e[9] ? e[9] + "&z=" + Math.floor(e[10]) + (e[12] ? e[12].replace(/^\//, "&") : "") : e[12] + "").replace(/\?/, "&") + "&output=" + (e[12] && e[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (e) {
                return "//maps.google." + e[2] + "/maps?q=" + e[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    }, i = function (t, i, n) {
        if (t) return n = n || "", "object" === e.type(n) && (n = e.param(n, !0)), e.each(i, (function (e, i) {
            t = t.replace("$" + e, i || "")
        })), n.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + n), t
    };
    e(document).on("objectNeedsType.fb", (function (n, a, o) {
        var s, r, l, d, c, p, u, h = o.src || "", f = !1;
        s = e.extend(!0, {}, t, o.opts.media), e.each(s, (function (t, n) {
            if (l = h.match(n.matcher)) {
                if (f = n.type, u = t, p = {}, n.paramPlace && l[n.paramPlace]) {
                    "?" == (c = l[n.paramPlace])[0] && (c = c.substring(1)), c = c.split("&");
                    for (var a = 0; a < c.length; ++a) {
                        var s = c[a].split("=", 2);
                        2 == s.length && (p[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return d = e.extend(!0, {}, n.params, o.opts[t], p), h = "function" === e.type(n.url) ? n.url.call(this, l, d, o) : i(n.url, l, d), r = "function" === e.type(n.thumb) ? n.thumb.call(this, l, d, o) : i(n.thumb, l), "youtube" === t ? h = h.replace(/&t=((\d+)m)?(\d+)s/, (function (e, t, i, n) {
                    return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(n, 10))
                })) : "vimeo" === t && (h = h.replace("&%23", "#")), !1
            }
        })), f ? (o.opts.thumb || o.opts.$thumb && o.opts.$thumb.length || (o.opts.thumb = r), "iframe" === f && (o.opts = e.extend(!0, o.opts, {
            iframe: {
                preload: !1,
                attr: {scrolling: "no"}
            }
        })), e.extend(o, {
            type: f,
            src: h,
            origSrc: o.src,
            contentSource: u,
            contentType: "image" === f ? "image" : "gmap_place" == u || "gmap_search" == u ? "map" : "video"
        })) : h && (o.type = o.opts.defaultType)
    }));
    var n = {
        youtube: {src: "https://www.youtube.com/iframe_api", class: "YT", loading: !1, loaded: !1},
        vimeo: {src: "https://player.vimeo.com/api/player.js", class: "Vimeo", loading: !1, loaded: !1},
        load: function (e) {
            var t, i = this;
            this[e].loaded ? setTimeout((function () {
                i.done(e)
            })) : this[e].loading || (this[e].loading = !0, (t = document.createElement("script")).type = "text/javascript", t.src = this[e].src, "youtube" === e ? window.onYouTubeIframeAPIReady = function () {
                i[e].loaded = !0, i.done(e)
            } : t.onload = function () {
                i[e].loaded = !0, i.done(e)
            }, document.body.appendChild(t))
        },
        done: function (t) {
            var i, n;
            "youtube" === t && delete window.onYouTubeIframeAPIReady, (i = e.fancybox.getInstance()) && (n = i.current.$content.find("iframe"), "youtube" === t && void 0 !== YT && YT ? new YT.Player(n.attr("id"), {
                events: {
                    onStateChange: function (e) {
                        0 == e.data && i.next()
                    }
                }
            }) : "vimeo" === t && void 0 !== Vimeo && Vimeo && new Vimeo.Player(n).on("ended", (function () {
                i.next()
            })))
        }
    };
    e(document).on({
        "afterShow.fb": function (e, t, i) {
            t.group.length > 1 && ("youtube" === i.contentSource || "vimeo" === i.contentSource) && n.load(i.contentSource)
        }
    })
}(jQuery), function (e, t, i) {
    "use strict";
    var n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || function (t) {
            return e.setTimeout(t, 1e3 / 60)
        },
        a = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || function (t) {
            e.clearTimeout(t)
        }, o = function (t) {
            var i = [];
            for (var n in t = (t = t.originalEvent || t || e.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t]) t[n].pageX ? i.push({
                x: t[n].pageX,
                y: t[n].pageY
            }) : t[n].clientX && i.push({x: t[n].clientX, y: t[n].clientY});
            return i
        }, s = function (e, t, i) {
            return t && e ? "x" === i ? e.x - t.x : "y" === i ? e.y - t.y : Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) : 0
        }, r = function (e) {
            if (e.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || i.isFunction(e.get(0).onclick) || e.data("selectable")) return !0;
            for (var t = 0, n = e[0].attributes, a = n.length; t < a; t++) if ("data-fancybox-" === n[t].nodeName.substr(0, 14)) return !0;
            return !1
        }, l = function (t) {
            var i = e.getComputedStyle(t)["overflow-y"], n = e.getComputedStyle(t)["overflow-x"],
                a = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
                o = ("scroll" === n || "auto" === n) && t.scrollWidth > t.clientWidth;
            return a || o
        }, d = function (e) {
            for (var t = !1; !(t = l(e.get(0))) && ((e = e.parent()).length && !e.hasClass("fancybox-stage") && !e.is("body"));) ;
            return t
        }, c = function (e) {
            var t = this;
            t.instance = e, t.$bg = e.$refs.bg, t.$stage = e.$refs.stage, t.$container = e.$refs.container, t.destroy(), t.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(t, "ontouchstart"))
        };
    c.prototype.destroy = function () {
        var e = this;
        e.$container.off(".fb.touch"), i(t).off(".fb.touch"), e.requestId && (a(e.requestId), e.requestId = null), e.tapped && (clearTimeout(e.tapped), e.tapped = null)
    }, c.prototype.ontouchstart = function (n) {
        var a = this, l = i(n.target), c = a.instance, p = c.current, u = p.$slide, h = p.$content,
            f = "touchstart" == n.type;
        if (f && a.$container.off("mousedown.fb.touch"), (!n.originalEvent || 2 != n.originalEvent.button) && u.length && l.length && !r(l) && !r(l.parent()) && (l.is("img") || !(n.originalEvent.clientX > l[0].clientWidth + l.offset().left))) {
            if (!p || c.isAnimating || p.$slide.hasClass("fancybox-animated")) return n.stopPropagation(), void n.preventDefault();
            a.realPoints = a.startPoints = o(n), a.startPoints.length && (p.touch && n.stopPropagation(), a.startEvent = n, a.canTap = !0, a.$target = l, a.$content = h, a.opts = p.opts.touch, a.isPanning = !1, a.isSwiping = !1, a.isZooming = !1, a.isScrolling = !1, a.canPan = c.canPan(), a.startTime = (new Date).getTime(), a.distanceX = a.distanceY = a.distance = 0, a.canvasWidth = Math.round(u[0].clientWidth), a.canvasHeight = Math.round(u[0].clientHeight), a.contentLastPos = null, a.contentStartPos = i.fancybox.getTranslate(a.$content) || {
                top: 0,
                left: 0
            }, a.sliderStartPos = i.fancybox.getTranslate(u), a.stagePos = i.fancybox.getTranslate(c.$refs.stage), a.sliderStartPos.top -= a.stagePos.top, a.sliderStartPos.left -= a.stagePos.left, a.contentStartPos.top -= a.stagePos.top, a.contentStartPos.left -= a.stagePos.left, i(t).off(".fb.touch").on(f ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(a, "ontouchend")).on(f ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(a, "ontouchmove")), i.fancybox.isMobile && t.addEventListener("scroll", a.onscroll, !0), ((a.opts || a.canPan) && (l.is(a.$stage) || a.$stage.find(l).length) || (l.is(".fancybox-image") && n.preventDefault(), i.fancybox.isMobile && l.parents(".fancybox-caption").length)) && (a.isScrollable = d(l) || d(l.parent()), i.fancybox.isMobile && a.isScrollable || n.preventDefault(), (1 === a.startPoints.length || p.hasError) && (a.canPan ? (i.fancybox.stop(a.$content), a.isPanning = !0) : a.isSwiping = !0, a.$container.addClass("fancybox-is-grabbing")), 2 === a.startPoints.length && "image" === p.type && (p.isLoaded || p.$ghost) && (a.canTap = !1, a.isSwiping = !1, a.isPanning = !1, a.isZooming = !0, i.fancybox.stop(a.$content), a.centerPointStartX = .5 * (a.startPoints[0].x + a.startPoints[1].x) - i(e).scrollLeft(), a.centerPointStartY = .5 * (a.startPoints[0].y + a.startPoints[1].y) - i(e).scrollTop(), a.percentageOfImageAtPinchPointX = (a.centerPointStartX - a.contentStartPos.left) / a.contentStartPos.width, a.percentageOfImageAtPinchPointY = (a.centerPointStartY - a.contentStartPos.top) / a.contentStartPos.height, a.startDistanceBetweenFingers = s(a.startPoints[0], a.startPoints[1]))))
        }
    }, c.prototype.onscroll = function (e) {
        this.isScrolling = !0, t.removeEventListener("scroll", this.onscroll, !0)
    }, c.prototype.ontouchmove = function (e) {
        var t = this;
        return void 0 !== e.originalEvent.buttons && 0 === e.originalEvent.buttons ? void t.ontouchend(e) : t.isScrolling ? void(t.canTap = !1) : (t.newPoints = o(e), void((t.opts || t.canPan) && t.newPoints.length && t.newPoints.length && (t.isSwiping && !0 === t.isSwiping || e.preventDefault(), t.distanceX = s(t.newPoints[0], t.startPoints[0], "x"), t.distanceY = s(t.newPoints[0], t.startPoints[0], "y"), t.distance = s(t.newPoints[0], t.startPoints[0]), t.distance > 0 && (t.isSwiping ? t.onSwipe(e) : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()))))
    }, c.prototype.onSwipe = function (t) {
        var o, s = this, r = s.instance, l = s.isSwiping, d = s.sliderStartPos.left || 0;
        if (!0 !== l) "x" == l && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? d += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? d -= Math.pow(-s.distanceX, .8) : d += s.distanceX), s.sliderLastPos = {
            top: "x" == l ? 0 : s.sliderStartPos.top + s.distanceY,
            left: d
        }, s.requestId && (a(s.requestId), s.requestId = null), s.requestId = n((function () {
            s.sliderLastPos && (i.each(s.instance.slides, (function (e, t) {
                var n = t.pos - s.instance.currPos;
                i.fancybox.setTranslate(t.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + n * s.canvasWidth + n * t.opts.gutter
                })
            })), s.$container.addClass("fancybox-is-sliding"))
        })); else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && i(e).width() > 800 ? s.isSwiping = "x" : (o = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = o > 45 && o < 135 ? "y" : "x"), "y" === s.isSwiping && i.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
            r.isDragging = s.isSwiping, s.startPoints = s.newPoints, i.each(r.slides, (function (e, t) {
                var n, a;
                i.fancybox.stop(t.$slide), n = i.fancybox.getTranslate(t.$slide), a = i.fancybox.getTranslate(r.$refs.stage), t.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass((function (e, t) {
                    return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                })), t.pos === r.current.pos && (s.sliderStartPos.top = n.top - a.top, s.sliderStartPos.left = n.left - a.left), i.fancybox.setTranslate(t.$slide, {
                    top: n.top - a.top,
                    left: n.left - a.left
                })
            })), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
    }, c.prototype.onPan = function () {
        var e = this;
        s(e.newPoints[0], e.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5) ? e.startPoints = e.newPoints : (e.canTap = !1, e.contentLastPos = e.limitMovement(), e.requestId && a(e.requestId), e.requestId = n((function () {
            i.fancybox.setTranslate(e.$content, e.contentLastPos)
        })))
    }, c.prototype.limitMovement = function () {
        var e, t, i, n, a, o, s = this, r = s.canvasWidth, l = s.canvasHeight, d = s.distanceX, c = s.distanceY,
            p = s.contentStartPos, u = p.left, h = p.top, f = p.width, m = p.height;
        return a = f > r ? u + d : u, o = h + c, e = Math.max(0, .5 * r - .5 * f), t = Math.max(0, .5 * l - .5 * m), i = Math.min(r - f, .5 * r - .5 * f), n = Math.min(l - m, .5 * l - .5 * m), d > 0 && a > e && (a = e - 1 + Math.pow(-e + u + d, .8) || 0), d < 0 && a < i && (a = i + 1 - Math.pow(i - u - d, .8) || 0), c > 0 && o > t && (o = t - 1 + Math.pow(-t + h + c, .8) || 0), c < 0 && o < n && (o = n + 1 - Math.pow(n - h - c, .8) || 0), {
            top: o,
            left: a
        }
    }, c.prototype.limitPosition = function (e, t, i, n) {
        var a = this.canvasWidth, o = this.canvasHeight;
        return i > a ? e = (e = e > 0 ? 0 : e) < a - i ? a - i : e : e = Math.max(0, a / 2 - i / 2), n > o ? t = (t = t > 0 ? 0 : t) < o - n ? o - n : t : t = Math.max(0, o / 2 - n / 2), {
            top: t,
            left: e
        }
    }, c.prototype.onZoom = function () {
        var t = this, o = t.contentStartPos, r = o.width, l = o.height, d = o.left, c = o.top,
            p = s(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers, u = Math.floor(r * p),
            h = Math.floor(l * p), f = (r - u) * t.percentageOfImageAtPinchPointX,
            m = (l - h) * t.percentageOfImageAtPinchPointY,
            v = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(e).scrollLeft(),
            g = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(e).scrollTop(), b = v - t.centerPointStartX,
            y = {top: c + (m + (g - t.centerPointStartY)), left: d + (f + b), scaleX: p, scaleY: p};
        t.canTap = !1, t.newWidth = u, t.newHeight = h, t.contentLastPos = y, t.requestId && a(t.requestId), t.requestId = n((function () {
            i.fancybox.setTranslate(t.$content, t.contentLastPos)
        }))
    }, c.prototype.ontouchend = function (e) {
        var n = this, s = n.isSwiping, r = n.isPanning, l = n.isZooming, d = n.isScrolling;
        if (n.endPoints = o(e), n.dMs = Math.max((new Date).getTime() - n.startTime, 1), n.$container.removeClass("fancybox-is-grabbing"), i(t).off(".fb.touch"), t.removeEventListener("scroll", n.onscroll, !0), n.requestId && (a(n.requestId), n.requestId = null), n.isSwiping = !1, n.isPanning = !1, n.isZooming = !1, n.isScrolling = !1, n.instance.isDragging = !1, n.canTap) return n.onTap(e);
        n.speed = 100, n.velocityX = n.distanceX / n.dMs * .5, n.velocityY = n.distanceY / n.dMs * .5, r ? n.endPanning() : l ? n.endZooming() : n.endSwiping(s, d)
    }, c.prototype.endSwiping = function (e, t) {
        var n = this, a = !1, o = n.instance.group.length, s = Math.abs(n.distanceX),
            r = "x" == e && o > 1 && (n.dMs > 130 && s > 10 || s > 50);
        n.sliderLastPos = null, "y" == e && !t && Math.abs(n.distanceY) > 50 ? (i.fancybox.animate(n.instance.current.$slide, {
            top: n.sliderStartPos.top + n.distanceY + 150 * n.velocityY,
            opacity: 0
        }, 200), a = n.instance.close(!0, 250)) : r && n.distanceX > 0 ? a = n.instance.previous(300) : r && n.distanceX < 0 && (a = n.instance.next(300)), !1 !== a || "x" != e && "y" != e || n.instance.centerSlide(200), n.$container.removeClass("fancybox-is-sliding")
    }, c.prototype.endPanning = function () {
        var e, t, n, a = this;
        a.contentLastPos && (!1 === a.opts.momentum || a.dMs > 350 ? (e = a.contentLastPos.left, t = a.contentLastPos.top) : (e = a.contentLastPos.left + 500 * a.velocityX, t = a.contentLastPos.top + 500 * a.velocityY), (n = a.limitPosition(e, t, a.contentStartPos.width, a.contentStartPos.height)).width = a.contentStartPos.width, n.height = a.contentStartPos.height, i.fancybox.animate(a.$content, n, 366))
    }, c.prototype.endZooming = function () {
        var e, t, n, a, o = this, s = o.instance.current, r = o.newWidth, l = o.newHeight;
        o.contentLastPos && (e = o.contentLastPos.left, a = {
            top: t = o.contentLastPos.top,
            left: e,
            width: r,
            height: l,
            scaleX: 1,
            scaleY: 1
        }, i.fancybox.setTranslate(o.$content, a), r < o.canvasWidth && l < o.canvasHeight ? o.instance.scaleToFit(150) : r > s.width || l > s.height ? o.instance.scaleToActual(o.centerPointStartX, o.centerPointStartY, 150) : (n = o.limitPosition(e, t, r, l), i.fancybox.animate(o.$content, n, 150)))
    }, c.prototype.onTap = function (t) {
        var n, a = this, s = i(t.target), r = a.instance, l = r.current, d = t && o(t) || a.startPoints,
            c = d[0] ? d[0].x - i(e).scrollLeft() - a.stagePos.left : 0,
            p = d[0] ? d[0].y - i(e).scrollTop() - a.stagePos.top : 0, u = function (e) {
                var n = l.opts[e];
                if (i.isFunction(n) && (n = n.apply(r, [l, t])), n) switch (n) {
                    case"close":
                        r.close(a.startEvent);
                        break;
                    case"toggleControls":
                        r.toggleControls();
                        break;
                    case"next":
                        r.next();
                        break;
                    case"nextOrClose":
                        r.group.length > 1 ? r.next() : r.close(a.startEvent);
                        break;
                    case"zoom":
                        "image" == l.type && (l.isLoaded || l.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(c, p) : r.group.length < 2 && r.close(a.startEvent))
                }
            };
        if ((!t.originalEvent || 2 != t.originalEvent.button) && (s.is("img") || !(c > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) n = "Outside"; else if (s.is(".fancybox-slide")) n = "Slide"; else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                n = "Content"
            }
            if (a.tapped) {
                if (clearTimeout(a.tapped), a.tapped = null, Math.abs(c - a.tapX) > 50 || Math.abs(p - a.tapY) > 50) return this;
                u("dblclick" + n)
            } else a.tapX = c, a.tapY = p, l.opts["dblclick" + n] && l.opts["dblclick" + n] !== l.opts["click" + n] ? a.tapped = setTimeout((function () {
                a.tapped = null, r.isAnimating || u("click" + n)
            }), 500) : u("click" + n);
            return this
        }
    }, i(t).on("onActivate.fb", (function (e, t) {
        t && !t.Guestures && (t.Guestures = new c(t))
    })).on("beforeClose.fb", (function (e, t) {
        t && t.Guestures && t.Guestures.destroy()
    }))
}(window, document, jQuery), function (e, t) {
    "use strict";
    t.extend(!0, t.fancybox.defaults, {
        btnTpl: {slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},
        slideShow: {autoStart: !1, speed: 3e3, progress: !0}
    });
    var i = function (e) {
        this.instance = e, this.init()
    };
    t.extend(i.prototype, {
        timer: null, isActive: !1, $button: null, init: function () {
            var e = this, i = e.instance, n = i.group[i.currIndex].opts.slideShow;
            e.$button = i.$refs.toolbar.find("[data-fancybox-play]").on("click", (function () {
                e.toggle()
            })), i.group.length < 2 || !n ? e.$button.hide() : n.progress && (e.$progress = t('<div class="fancybox-progress"></div>').appendTo(i.$refs.inner))
        }, set: function (e) {
            var i = this, n = i.instance, a = n.current;
            a && (!0 === e || a.opts.loop || n.currIndex < n.group.length - 1) ? i.isActive && "video" !== a.contentType && (i.$progress && t.fancybox.animate(i.$progress.show(), {scaleX: 1}, a.opts.slideShow.speed), i.timer = setTimeout((function () {
                n.current.opts.loop || n.current.index != n.group.length - 1 ? n.next() : n.jumpTo(0)
            }), a.opts.slideShow.speed)) : (i.stop(), n.idleSecondsCounter = 0, n.showControls())
        }, clear: function () {
            var e = this;
            clearTimeout(e.timer), e.timer = null, e.$progress && e.$progress.removeAttr("style").hide()
        }, start: function () {
            var e = this, t = e.instance.current;
            t && (e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), e.isActive = !0, t.isComplete && e.set(!0), e.instance.trigger("onSlideShowChange", !0))
        }, stop: function () {
            var e = this, t = e.instance.current;
            e.clear(), e.$button.attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), e.isActive = !1, e.instance.trigger("onSlideShowChange", !1), e.$progress && e.$progress.removeAttr("style").hide()
        }, toggle: function () {
            var e = this;
            e.isActive ? e.stop() : e.start()
        }
    }), t(e).on({
        "onInit.fb": function (e, t) {
            t && !t.SlideShow && (t.SlideShow = new i(t))
        }, "beforeShow.fb": function (e, t, i, n) {
            var a = t && t.SlideShow;
            n ? a && i.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear()
        }, "afterShow.fb": function (e, t, i) {
            var n = t && t.SlideShow;
            n && n.isActive && n.set()
        }, "afterKeydown.fb": function (i, n, a, o, s) {
            var r = n && n.SlideShow;
            !r || !a.opts.slideShow || 80 !== s && 32 !== s || t(e.activeElement).is("button,a,input") || (o.preventDefault(), r.toggle())
        }, "beforeClose.fb onDeactivate.fb": function (e, t) {
            var i = t && t.SlideShow;
            i && i.stop()
        }
    }), t(e).on("visibilitychange", (function () {
        var i = t.fancybox.getInstance(), n = i && i.SlideShow;
        n && n.isActive && (e.hidden ? n.clear() : n.set())
    }))
}(document, jQuery), function (e, t) {
    "use strict";
    var i = function () {
        for (var t = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], i = {}, n = 0; n < t.length; n++) {
            var a = t[n];
            if (a && a[1] in e) {
                for (var o = 0; o < a.length; o++) i[t[0][o]] = a[o];
                return i
            }
        }
        return !1
    }();
    if (i) {
        var n = {
            request: function (t) {
                (t = t || e.documentElement)[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
            }, exit: function () {
                e[i.exitFullscreen]()
            }, toggle: function (t) {
                t = t || e.documentElement, this.isFullscreen() ? this.exit() : this.request(t)
            }, isFullscreen: function () {
                return Boolean(e[i.fullscreenElement])
            }, enabled: function () {
                return Boolean(e[i.fullscreenEnabled])
            }
        };
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},
            fullScreen: {autoStart: !1}
        }), t(e).on(i.fullscreenchange, (function () {
            var e = n.isFullscreen(), i = t.fancybox.getInstance();
            i && (i.current && "image" === i.current.type && i.isAnimating && (i.isAnimating = !1, i.update(!0, !0, 0), i.isComplete || i.complete()), i.trigger("onFullscreenChange", e), i.$refs.container.toggleClass("fancybox-is-fullscreen", e), i.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !e).toggleClass("fancybox-button--fsexit", e))
        }))
    }
    t(e).on({
        "onInit.fb": function (e, t) {
            i ? t && t.group[t.currIndex].opts.fullScreen ? (t.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", (function (e) {
                e.stopPropagation(), e.preventDefault(), n.toggle()
            })), t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && n.request(), t.FullScreen = n) : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
        }, "afterKeydown.fb": function (e, t, i, n, a) {
            t && t.FullScreen && 70 === a && (n.preventDefault(), t.FullScreen.toggle())
        }, "beforeClose.fb": function (e, t) {
            t && t.FullScreen && t.$refs.container.hasClass("fancybox-is-fullscreen") && n.exit()
        }
    })
}(document, jQuery), function (e, t) {
    "use strict";
    var i = "fancybox-thumbs";
    t.fancybox.defaults = t.extend(!0, {
        btnTpl: {thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},
        thumbs: {autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y"}
    }, t.fancybox.defaults);
    var n = function (e) {
        this.init(e)
    };
    t.extend(n.prototype, {
        $button: null, $grid: null, $list: null, isVisible: !1, isActive: !1, init: function (e) {
            var t = this, i = e.group, n = 0;
            t.instance = e, t.opts = i[e.currIndex].opts.thumbs, e.Thumbs = t, t.$button = e.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var a = 0, o = i.length; a < o && (i[a].thumb && n++, !(n > 1)); a++) ;
            n > 1 && t.opts ? (t.$button.removeAttr("style").on("click", (function () {
                t.toggle()
            })), t.isActive = !0) : t.$button.hide()
        }, create: function () {
            var e, n = this, a = n.instance, o = n.opts.parentEl, s = [];
            n.$grid || (n.$grid = t('<div class="' + i + " " + i + "-" + n.opts.axis + '"></div>').appendTo(a.$refs.container.find(o).addBack().filter(o)), n.$grid.on("click", "a", (function () {
                a.jumpTo(t(this).attr("data-index"))
            }))), n.$list || (n.$list = t('<div class="' + i + '__list">').appendTo(n.$grid)), t.each(a.group, (function (t, i) {
                (e = i.thumb) || "image" !== i.type || (e = i.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + t + '"' + (e && e.length ? ' style="background-image:url(' + e + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            })), n.$list[0].innerHTML = s.join(""), "x" === n.opts.axis && n.$list.width(parseInt(n.$grid.css("padding-right"), 10) + a.group.length * n.$list.children().eq(0).outerWidth(!0))
        }, focus: function (e) {
            var t, i, n = this, a = n.$list, o = n.$grid;
            n.instance.current && (i = (t = a.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + n.instance.current.index + '"]').addClass("fancybox-thumbs-active")).position(), "y" === n.opts.axis && (i.top < 0 || i.top > a.height() - t.outerHeight()) ? a.stop().animate({scrollTop: a.scrollTop() + i.top}, e) : "x" === n.opts.axis && (i.left < o.scrollLeft() || i.left > o.scrollLeft() + (o.width() - t.outerWidth())) && a.parent().stop().animate({scrollLeft: i.left}, e))
        }, update: function () {
            var e = this;
            e.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), e.isVisible ? (e.$grid || e.create(), e.instance.trigger("onThumbsShow"), e.focus(0)) : e.$grid && e.instance.trigger("onThumbsHide"), e.instance.update()
        }, hide: function () {
            this.isVisible = !1, this.update()
        }, show: function () {
            this.isVisible = !0, this.update()
        }, toggle: function () {
            this.isVisible = !this.isVisible, this.update()
        }
    }), t(e).on({
        "onInit.fb": function (e, t) {
            var i;
            t && !t.Thumbs && ((i = new n(t)).isActive && !0 === i.opts.autoStart && i.show())
        }, "beforeShow.fb": function (e, t, i, n) {
            var a = t && t.Thumbs;
            a && a.isVisible && a.focus(n ? 0 : 250)
        }, "afterKeydown.fb": function (e, t, i, n, a) {
            var o = t && t.Thumbs;
            o && o.isActive && 71 === a && (n.preventDefault(), o.toggle())
        }, "beforeClose.fb": function (e, t) {
            var i = t && t.Thumbs;
            i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
        }
    })
}(document, jQuery), function (e, t) {
    "use strict";
    t.extend(!0, t.fancybox.defaults, {
        btnTpl: {share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},
        share: {
            url: function (e, t) {
                return !e.currentHash && "inline" !== t.type && "html" !== t.type && (t.origSrc || t.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), t(e).on("click", "[data-fancybox-share]", (function () {
        var e, i, n = t.fancybox.getInstance(), a = n.current || null;
        a && ("function" === t.type(a.opts.share.url) && (e = a.opts.share.url.apply(a, [n, a])), i = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(e)).replace(/\{\{url_raw\}\}/g, function (e) {
            var t = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            };
            return String(e).replace(/[&<>"'`=\/]/g, (function (e) {
                return t[e]
            }))
        }(e)).replace(/\{\{descr\}\}/g, n.$caption ? encodeURIComponent(n.$caption.text()) : ""), t.fancybox.open({
            src: n.translate(n, i),
            type: "html",
            opts: {
                touch: !1, animationEffect: !1, afterLoad: function (e, t) {
                    n.$refs.container.one("beforeClose.fb", (function () {
                        e.close(null, 0)
                    })), t.$content.find(".fancybox-share__button").click((function () {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    }))
                }, mobile: {autoFocus: !1}
            }
        }))
    }))
}(document, jQuery), function (e, t, i) {
    "use strict";

    function n() {
        var t = e.location.hash.substr(1), i = t.split("-"),
            n = i.length > 1 && /^\+?\d+$/.test(i[i.length - 1]) && parseInt(i.pop(-1), 10) || 1;
        return {hash: t, index: n < 1 ? 1 : n, gallery: i.join("-")}
    }

    function a(e) {
        "" !== e.gallery && i("[data-fancybox='" + i.escapeSelector(e.gallery) + "']").eq(e.index - 1).focus().trigger("click.fb-start")
    }

    function o(e) {
        var t, i;
        return !!e && ("" !== (i = (t = e.current ? e.current.opts : e.opts).hash || (t.$orig ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger") : "")) && i)
    }

    i.escapeSelector || (i.escapeSelector = function (e) {
        return (e + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, (function (e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }))
    }), i((function () {
        !1 !== i.fancybox.defaults.hash && (i(t).on({
            "onInit.fb": function (e, t) {
                var i, a;
                !1 !== t.group[t.currIndex].opts.hash && (i = n(), (a = o(t)) && i.gallery && a == i.gallery && (t.currIndex = i.index - 1))
            }, "beforeShow.fb": function (i, n, a, s) {
                var r;
                a && !1 !== a.opts.hash && (r = o(n)) && (n.currentHash = r + (n.group.length > 1 ? "-" + (a.index + 1) : ""), e.location.hash !== "#" + n.currentHash && (s && !n.origHash && (n.origHash = e.location.hash), n.hashTimer && clearTimeout(n.hashTimer), n.hashTimer = setTimeout((function () {
                    "replaceState" in e.history ? (e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + n.currentHash), s && (n.hasCreatedHistory = !0)) : e.location.hash = n.currentHash, n.hashTimer = null
                }), 300)))
            }, "beforeClose.fb": function (i, n, a) {
                a && !1 !== a.opts.hash && (clearTimeout(n.hashTimer), n.currentHash && n.hasCreatedHistory ? e.history.back() : n.currentHash && ("replaceState" in e.history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + (n.origHash || "")) : e.location.hash = n.origHash), n.currentHash = null)
            }
        }), i(e).on("hashchange.fb", (function () {
            var e = n(), t = null;
            i.each(i(".fancybox-container").get().reverse(), (function (e, n) {
                var a = i(n).data("FancyBox");
                if (a && a.currentHash) return t = a, !1
            })), t ? t.currentHash === e.gallery + "-" + e.index || 1 === e.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e.gallery && a(e)
        })), setTimeout((function () {
            i.fancybox.getInstance() || a(n())
        }), 50))
    }))
}(window, document, jQuery), function (e, t) {
    "use strict";
    var i = (new Date).getTime();
    t(e).on({
        "onInit.fb": function (e, t, n) {
            t.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", (function (e) {
                var n = t.current, a = (new Date).getTime();
                t.group.length < 2 || !1 === n.opts.wheel || "auto" === n.opts.wheel && "image" !== n.type || (e.preventDefault(), e.stopPropagation(), n.$slide.hasClass("fancybox-animated") || (e = e.originalEvent || e, a - i < 250 || (i = a, t[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]())))
            }))
        }
    })
}(document, jQuery), function () {
    var e, t, i, n, a, o, s, r, l, d;
    t = window.device, e = {}, window.device = e, n = window.document.documentElement, d = window.navigator.userAgent.toLowerCase(), e.ios = function () {
        return e.iphone() || e.ipod() || e.ipad()
    }, e.iphone = function () {
        return !e.windows() && a("iphone")
    }, e.ipod = function () {
        return a("ipod")
    }, e.ipad = function () {
        return a("ipad")
    }, e.android = function () {
        return !e.windows() && a("android")
    }, e.androidPhone = function () {
        return e.android() && a("mobile")
    }, e.androidTablet = function () {
        return e.android() && !a("mobile")
    }, e.blackberry = function () {
        return a("blackberry") || a("bb10") || a("rim")
    }, e.blackberryPhone = function () {
        return e.blackberry() && !a("tablet")
    }, e.blackberryTablet = function () {
        return e.blackberry() && a("tablet")
    }, e.windows = function () {
        return a("windows")
    }, e.windowsPhone = function () {
        return e.windows() && a("phone")
    }, e.windowsTablet = function () {
        return e.windows() && a("touch") && !e.windowsPhone()
    }, e.fxos = function () {
        return (a("(mobile;") || a("(tablet;")) && a("; rv:")
    }, e.fxosPhone = function () {
        return e.fxos() && a("mobile")
    }, e.fxosTablet = function () {
        return e.fxos() && a("tablet")
    }, e.meego = function () {
        return a("meego")
    }, e.cordova = function () {
        return window.cordova && "file:" === location.protocol
    }, e.nodeWebkit = function () {
        return "object" == typeof window.process
    }, e.mobile = function () {
        return e.androidPhone() || e.iphone() || e.ipod() || e.windowsPhone() || e.blackberryPhone() || e.fxosPhone() || e.meego()
    }, e.tablet = function () {
        return e.ipad() || e.androidTablet() || e.blackberryTablet() || e.windowsTablet() || e.fxosTablet()
    }, e.desktop = function () {
        return !e.tablet() && !e.mobile()
    }, e.television = function () {
        var e;
        for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], e = 0; e < television.length;) {
            if (a(television[e])) return !0;
            e++
        }
        return !1
    }, e.portrait = function () {
        return window.innerHeight / window.innerWidth > 1
    }, e.landscape = function () {
        return window.innerHeight / window.innerWidth < 1
    }, e.noConflict = function () {
        return window.device = t, this
    }, a = function (e) {
        return -1 !== d.indexOf(e)
    }, s = function (e) {
        var t;
        return t = new RegExp(e, "i"), n.className.match(t)
    }, i = function (e) {
        var t = null;
        s(e) || (t = n.className.replace(/^\s+|\s+$/g, ""), n.className = t + " " + e)
    }, l = function (e) {
        s(e) && (n.className = n.className.replace(" " + e, ""))
    }, e.ios() ? e.ipad() ? i("ios ipad tablet") : e.iphone() ? i("ios iphone mobile") : e.ipod() && i("ios ipod mobile") : e.android() ? i(e.androidTablet() ? "android tablet" : "android mobile") : e.blackberry() ? i(e.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : e.windows() ? i(e.windowsTablet() ? "windows tablet" : e.windowsPhone() ? "windows mobile" : "desktop") : e.fxos() ? i(e.fxosTablet() ? "fxos tablet" : "fxos mobile") : e.meego() ? i("meego mobile") : e.nodeWebkit() ? i("node-webkit") : e.television() ? i("television") : e.desktop() && i("desktop"), e.cordova() && i("cordova"), o = function () {
        e.landscape() ? (l("portrait"), i("landscape")) : (l("landscape"), i("portrait"))
    }, r = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(r, o, !1) : window.attachEvent ? window.attachEvent(r, o) : window[r] = o, o(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define((function () {
        return e
    })) : "undefined" != typeof module && module.exports ? module.exports = e : window.device = e
}.call(this), function () {
    "use strict";

    function e(n) {
        if (!n) throw new Error("No options passed to Waypoint constructor");
        if (!n.element) throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + t, this.options = e.Adapter.extend({}, e.defaults, n), this.element = this.options.element, this.adapter = new e.Adapter(this.element), this.callback = n.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = e.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = e.Context.findOrCreateByElement(this.options.context), e.offsetAliases[this.options.offset] && (this.options.offset = e.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, t += 1
    }

    var t = 0, i = {};
    e.prototype.queueTrigger = function (e) {
        this.group.queueTrigger(this, e)
    }, e.prototype.trigger = function (e) {
        this.enabled && this.callback && this.callback.apply(this, e)
    }, e.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, e.prototype.disable = function () {
        return this.enabled = !1, this
    }, e.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
    }, e.prototype.next = function () {
        return this.group.next(this)
    }, e.prototype.previous = function () {
        return this.group.previous(this)
    }, e.invokeAll = function (e) {
        var t = [];
        for (var n in i) t.push(i[n]);
        for (var a = 0, o = t.length; o > a; a++) t[a][e]()
    }, e.destroyAll = function () {
        e.invokeAll("destroy")
    }, e.disableAll = function () {
        e.invokeAll("disable")
    }, e.enableAll = function () {
        for (var t in e.Context.refreshAll(), i) i[t].enabled = !0;
        return this
    }, e.refreshAll = function () {
        e.Context.refreshAll()
    }, e.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
    }, e.viewportWidth = function () {
        return document.documentElement.clientWidth
    }, e.adapters = [], e.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, e.offsetAliases = {
        "bottom-in-view": function () {
            return this.context.innerHeight() - this.adapter.outerHeight()
        }, "right-in-view": function () {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = e
}(), function () {
    "use strict";

    function e(e) {
        window.setTimeout(e, 1e3 / 60)
    }

    function t(e) {
        this.element = e, this.Adapter = a.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, e.waypointContextKey = this.key, n[e.waypointContextKey] = this, i += 1, a.windowContext || (a.windowContext = !0, a.windowContext = new t(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }

    var i = 0, n = {}, a = window.Waypoint, o = window.onload;
    t.prototype.add = function (e) {
        var t = e.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[t][e.key] = e, this.refresh()
    }, t.prototype.checkEmpty = function () {
        var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            t = this.Adapter.isEmptyObject(this.waypoints.vertical), i = this.element == this.element.window;
        e && t && !i && (this.adapter.off(".waypoints"), delete n[this.key])
    }, t.prototype.createThrottledResizeHandler = function () {
        function e() {
            t.handleResize(), t.didResize = !1
        }

        var t = this;
        this.adapter.on("resize.waypoints", (function () {
            t.didResize || (t.didResize = !0, a.requestAnimationFrame(e))
        }))
    }, t.prototype.createThrottledScrollHandler = function () {
        function e() {
            t.handleScroll(), t.didScroll = !1
        }

        var t = this;
        this.adapter.on("scroll.waypoints", (function () {
            (!t.didScroll || a.isTouch) && (t.didScroll = !0, a.requestAnimationFrame(e))
        }))
    }, t.prototype.handleResize = function () {
        a.Context.refreshAll()
    }, t.prototype.handleScroll = function () {
        var e = {}, t = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in t) {
            var n = t[i], a = n.newScroll > n.oldScroll ? n.forward : n.backward;
            for (var o in this.waypoints[i]) {
                var s = this.waypoints[i][o];
                if (null !== s.triggerPoint) {
                    var r = n.oldScroll < s.triggerPoint, l = n.newScroll >= s.triggerPoint;
                    (r && l || !r && !l) && (s.queueTrigger(a), e[s.group.id] = s.group)
                }
            }
        }
        for (var d in e) e[d].flushTriggers();
        this.oldScroll = {x: t.horizontal.newScroll, y: t.vertical.newScroll}
    }, t.prototype.innerHeight = function () {
        return this.element == this.element.window ? a.viewportHeight() : this.adapter.innerHeight()
    }, t.prototype.remove = function (e) {
        delete this.waypoints[e.axis][e.key], this.checkEmpty()
    }, t.prototype.innerWidth = function () {
        return this.element == this.element.window ? a.viewportWidth() : this.adapter.innerWidth()
    }, t.prototype.destroy = function () {
        var e = [];
        for (var t in this.waypoints) for (var i in this.waypoints[t]) e.push(this.waypoints[t][i]);
        for (var n = 0, a = e.length; a > n; n++) e[n].destroy()
    }, t.prototype.refresh = function () {
        var e, t = this.element == this.element.window, i = t ? void 0 : this.adapter.offset(), n = {};
        for (var o in this.handleScroll(), e = {
            horizontal: {
                contextOffset: t ? 0 : i.left,
                contextScroll: t ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: t ? 0 : i.top,
                contextScroll: t ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        }) {
            var s = e[o];
            for (var r in this.waypoints[o]) {
                var l, d, c, p, u = this.waypoints[o][r], h = u.options.offset, f = u.triggerPoint, m = 0,
                    v = null == f;
                u.element !== u.element.window && (m = u.adapter.offset()[s.offsetProp]), "function" == typeof h ? h = h.apply(u) : "string" == typeof h && (h = parseFloat(h), u.options.offset.indexOf("%") > -1 && (h = Math.ceil(s.contextDimension * h / 100))), l = s.contextScroll - s.contextOffset, u.triggerPoint = Math.floor(m + l - h), d = f < s.oldScroll, c = u.triggerPoint >= s.oldScroll, p = !d && !c, !v && (d && c) ? (u.queueTrigger(s.backward), n[u.group.id] = u.group) : (!v && p || v && s.oldScroll >= u.triggerPoint) && (u.queueTrigger(s.forward), n[u.group.id] = u.group)
            }
        }
        return a.requestAnimationFrame((function () {
            for (var e in n) n[e].flushTriggers()
        })), this
    }, t.findOrCreateByElement = function (e) {
        return t.findByElement(e) || new t(e)
    }, t.refreshAll = function () {
        for (var e in n) n[e].refresh()
    }, t.findByElement = function (e) {
        return n[e.waypointContextKey]
    }, window.onload = function () {
        o && o(), t.refreshAll()
    }, a.requestAnimationFrame = function (t) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || e).call(window, t)
    }, a.Context = t
}(), function () {
    "use strict";

    function e(e, t) {
        return e.triggerPoint - t.triggerPoint
    }

    function t(e, t) {
        return t.triggerPoint - e.triggerPoint
    }

    function i(e) {
        this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), n[this.axis][this.name] = this
    }

    var n = {vertical: {}, horizontal: {}}, a = window.Waypoint;
    i.prototype.add = function (e) {
        this.waypoints.push(e)
    }, i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = {up: [], down: [], left: [], right: []}
    }, i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i], a = "up" === i || "left" === i;
            n.sort(a ? t : e);
            for (var o = 0, s = n.length; s > o; o += 1) {
                var r = n[o];
                (r.options.continuous || o === n.length - 1) && r.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function (t) {
        this.waypoints.sort(e);
        var i = a.Adapter.inArray(t, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function (t) {
        this.waypoints.sort(e);
        var i = a.Adapter.inArray(t, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function (e, t) {
        this.triggerQueues[t].push(e)
    }, i.prototype.remove = function (e) {
        var t = a.Adapter.inArray(e, this.waypoints);
        t > -1 && this.waypoints.splice(t, 1)
    }, i.prototype.first = function () {
        return this.waypoints[0]
    }, i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function (e) {
        return n[e.axis][e.name] || new i(e)
    }, a.Group = i
}(), function () {
    "use strict";

    function e(e) {
        this.$element = t(e)
    }

    var t = window.jQuery, i = window.Waypoint;
    t.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], (function (t, i) {
        e.prototype[i] = function () {
            var e = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, e)
        }
    })), t.each(["extend", "inArray", "isEmptyObject"], (function (i, n) {
        e[n] = t[n]
    })), i.adapters.push({name: "jquery", Adapter: e}), i.Adapter = e
}(), function () {
    "use strict";

    function e(e) {
        return function () {
            var i = [], n = arguments[0];
            return e.isFunction(arguments[0]) && ((n = e.extend({}, arguments[1])).handler = arguments[0]), this.each((function () {
                var a = e.extend({}, n, {element: this});
                "string" == typeof a.context && (a.context = e(this).closest(a.context)[0]), i.push(new t(a))
            })), i
        }
    }

    var t = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
}(), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t()
}(this, (function () {
    "use strict";
    var e = "undefined" == typeof document ? {
        body: {}, addEventListener: function () {
        }, removeEventListener: function () {
        }, activeElement: {
            blur: function () {
            }, nodeName: ""
        }, querySelector: function () {
            return null
        }, querySelectorAll: function () {
            return []
        }, getElementById: function () {
            return null
        }, createEvent: function () {
            return {
                initEvent: function () {
                }
            }
        }, createElement: function () {
            return {
                children: [], childNodes: [], style: {}, setAttribute: function () {
                }, getElementsByTagName: function () {
                    return []
                }
            }
        }, location: {hash: ""}
    } : document, t = "undefined" == typeof window ? {
        document: e,
        navigator: {userAgent: ""},
        location: {},
        history: {},
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {
        },
        removeEventListener: function () {
        },
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {
        },
        Date: function () {
        },
        screen: {},
        setTimeout: function () {
        },
        clearTimeout: function () {
        }
    } : window, i = function (e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this
    };

    function n(n, a) {
        var o = [], s = 0;
        if (n && !a && n instanceof i) return n;
        if (n) if ("string" == typeof n) {
            var r, l, d = n.trim();
            if (0 <= d.indexOf("<") && 0 <= d.indexOf(">")) {
                var c = "div";
                for (0 === d.indexOf("<li") && (c = "ul"), 0 === d.indexOf("<tr") && (c = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (c = "tr"), 0 === d.indexOf("<tbody") && (c = "table"), 0 === d.indexOf("<option") && (c = "select"), (l = e.createElement(c)).innerHTML = d, s = 0; s < l.childNodes.length; s += 1) o.push(l.childNodes[s])
            } else for (r = a || "#" !== n[0] || n.match(/[ .<>:~]/) ? (a || e).querySelectorAll(n.trim()) : [e.getElementById(n.trim().split("#")[1])], s = 0; s < r.length; s += 1) r[s] && o.push(r[s])
        } else if (n.nodeType || n === t || n === e) o.push(n); else if (0 < n.length && n[0].nodeType) for (s = 0; s < n.length; s += 1) o.push(n[s]);
        return new i(o)
    }

    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }

    n.fn = i.prototype, n.Class = i, n.Dom7 = i;
    var o = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.add(t[i]);
            return this
        }, removeClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.remove(t[i]);
            return this
        }, hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e)
        }, toggleClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
            return this
        }, attr: function (e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var n = 0; n < this.length; n += 1) if (2 === i.length) this[n].setAttribute(e, t); else for (var a in e) this[n][a] = e[a], this[n].setAttribute(a, e[a]);
            return this
        }, removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        }, data: function (e, t) {
            var i;
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n += 1) (i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0
        }, transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        }, transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        }, on: function () {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var a = t[0], o = t[1], s = t[2], r = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), n(t).is(o)) s.apply(t, i); else for (var a = n(t).parents(), r = 0; r < a.length; r += 1) n(a[r]).is(o) && s.apply(a[r], i)
                }
            }

            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t)
            }

            "function" == typeof t[1] && (a = (e = t)[0], s = e[1], r = e[2], o = void 0), r || (r = !1);
            for (var c, p = a.split(" "), u = 0; u < this.length; u += 1) {
                var h = this[u];
                if (o) for (c = 0; c < p.length; c += 1) {
                    var f = p[c];
                    h.dom7LiveListeners || (h.dom7LiveListeners = {}), h.dom7LiveListeners[f] || (h.dom7LiveListeners[f] = []), h.dom7LiveListeners[f].push({
                        listener: s,
                        proxyListener: l
                    }), h.addEventListener(f, l, r)
                } else for (c = 0; c < p.length; c += 1) {
                    var m = p[c];
                    h.dom7Listeners || (h.dom7Listeners = {}), h.dom7Listeners[m] || (h.dom7Listeners[m] = []), h.dom7Listeners[m].push({
                        listener: s,
                        proxyListener: d
                    }), h.addEventListener(m, d, r)
                }
            }
            return this
        }, off: function () {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var n = t[0], a = t[1], o = t[2], s = t[3];
            "function" == typeof t[1] && (n = (e = t)[0], o = e[1], s = e[2], a = void 0), s || (s = !1);
            for (var r = n.split(" "), l = 0; l < r.length; l += 1) for (var d = r[l], c = 0; c < this.length; c += 1) {
                var p = this[c], u = void 0;
                if (!a && p.dom7Listeners ? u = p.dom7Listeners[d] : a && p.dom7LiveListeners && (u = p.dom7LiveListeners[d]), u && u.length) for (var h = u.length - 1; 0 <= h; h -= 1) {
                    var f = u[h];
                    o && f.listener === o ? (p.removeEventListener(d, f.proxyListener, s), u.splice(h, 1)) : o || (p.removeEventListener(d, f.proxyListener, s), u.splice(h, 1))
                }
            }
            return this
        }, trigger: function () {
            for (var i = [], n = arguments.length; n--;) i[n] = arguments[n];
            for (var a = i[0].split(" "), o = i[1], s = 0; s < a.length; s += 1) for (var r = a[s], l = 0; l < this.length; l += 1) {
                var d = this[l], c = void 0;
                try {
                    c = new t.CustomEvent(r, {detail: o, bubbles: !0, cancelable: !0})
                } catch (i) {
                    (c = e.createEvent("Event")).initEvent(r, !0, !0), c.detail = o
                }
                d.dom7EventData = i.filter((function (e, t) {
                    return 0 < t
                })), d.dispatchEvent(c), d.dom7EventData = [], delete d.dom7EventData
            }
            return this
        }, transitionEnd: function (e) {
            var t, i = ["webkitTransitionEnd", "transitionend"], n = this;

            function a(o) {
                if (o.target === this) for (e.call(this, o), t = 0; t < i.length; t += 1) n.off(i[t], a)
            }

            if (e) for (t = 0; t < i.length; t += 1) n.on(i[t], a);
            return this
        }, outerWidth: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        }, outerHeight: function (e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        }, offset: function () {
            if (0 < this.length) {
                var i = this[0], n = i.getBoundingClientRect(), a = e.body, o = i.clientTop || a.clientTop || 0,
                    s = i.clientLeft || a.clientLeft || 0, r = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return {top: n.top + r - o, left: n.left + l - s}
            }
            return null
        }, css: function (e, i) {
            var n;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (n = 0; n < this.length; n += 1) for (var a in e) this[n].style[a] = e[a];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (n = 0; n < this.length; n += 1) this[n].style[e] = i;
                return this
            }
            return this
        }, each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        }, html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        }, text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        }, is: function (a) {
            var o, s, r = this[0];
            if (!r || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (r.matches) return r.matches(a);
                if (r.webkitMatchesSelector) return r.webkitMatchesSelector(a);
                if (r.msMatchesSelector) return r.msMatchesSelector(a);
                for (o = n(a), s = 0; s < o.length; s += 1) if (o[s] === r) return !0;
                return !1
            }
            if (a === e) return r === e;
            if (a === t) return r === t;
            if (a.nodeType || a instanceof i) {
                for (o = a.nodeType ? [a] : a, s = 0; s < o.length; s += 1) if (o[s] === r) return !0;
                return !1
            }
            return !1
        }, index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        }, eq: function (e) {
            if (void 0 === e) return this;
            var t, n = this.length;
            return new i(n - 1 < e ? [] : e < 0 ? (t = n + e) < 0 ? [] : [this[t]] : [this[e]])
        }, append: function () {
            for (var t, n = [], a = arguments.length; a--;) n[a] = arguments[a];
            for (var o = 0; o < n.length; o += 1) {
                t = n[o];
                for (var s = 0; s < this.length; s += 1) if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t; r.firstChild;) this[s].appendChild(r.firstChild)
                } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) this[s].appendChild(t[l]); else this[s].appendChild(t)
            }
            return this
        }, prepend: function (t) {
            var n, a;
            for (n = 0; n < this.length; n += 1) if ("string" == typeof t) {
                var o = e.createElement("div");
                for (o.innerHTML = t, a = o.childNodes.length - 1; 0 <= a; a -= 1) this[n].insertBefore(o.childNodes[a], this[n].childNodes[0])
            } else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[n].insertBefore(t[a], this[n].childNodes[0]); else this[n].insertBefore(t, this[n].childNodes[0]);
            return this
        }, next: function (e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && n(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        }, nextAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling;) {
                var o = a.nextElementSibling;
                e ? n(o).is(e) && t.push(o) : t.push(o), a = o
            }
            return new i(t)
        }, prev: function (e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && n(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        }, prevAll: function (e) {
            var t = [], a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling;) {
                var o = a.previousElementSibling;
                e ? n(o).is(e) && t.push(o) : t.push(o), a = o
            }
            return new i(t)
        }, parent: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? n(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return n(a(t))
        }, parents: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var o = this[i].parentNode; o;) e ? n(o).is(e) && t.push(o) : t.push(o), o = o.parentNode;
            return n(a(t))
        }, closest: function (e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        }, find: function (e) {
            for (var t = [], n = 0; n < this.length; n += 1) for (var a = this[n].querySelectorAll(e), o = 0; o < a.length; o += 1) t.push(a[o]);
            return new i(t)
        }, children: function (e) {
            for (var t = [], o = 0; o < this.length; o += 1) for (var s = this[o].childNodes, r = 0; r < s.length; r += 1) e ? 1 === s[r].nodeType && n(s[r]).is(e) && t.push(s[r]) : 1 === s[r].nodeType && t.push(s[r]);
            return new i(a(t))
        }, remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }, add: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var o = n(e[i]);
                for (a = 0; a < o.length; a += 1) this[this.length] = o[a], this.length += 1
            }
            return this
        }, styles: function () {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(o).forEach((function (e) {
        n.fn[e] = o[e]
    }));
    var s, r, l, d = {
        deleteProps: function (e) {
            var t = e;
            Object.keys(t).forEach((function (e) {
                try {
                    t[e] = null
                } catch (e) {
                }
                try {
                    delete t[e]
                } catch (e) {
                }
            }))
        }, nextTick: function (e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t)
        }, now: function () {
            return Date.now()
        }, getTranslate: function (e, i) {
            var n, a, o;
            void 0 === i && (i = "x");
            var s = t.getComputedStyle(e, null);
            return t.WebKitCSSMatrix ? (6 < (a = s.transform || s.webkitTransform).split(",").length && (a = a.split(", ").map((function (e) {
                return e.replace(",", ".")
            })).join(", ")), o = new t.WebKitCSSMatrix("none" === a ? "" : a)) : n = (o = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? o.m41 : 16 === n.length ? parseFloat(n[12]) : parseFloat(n[4])), "y" === i && (a = t.WebKitCSSMatrix ? o.m42 : 16 === n.length ? parseFloat(n[13]) : parseFloat(n[5])), a || 0
        }, parseUrlQuery: function (e) {
            var i, n, a, o, s = {}, r = e || t.location.href;
            if ("string" == typeof r && r.length) for (o = (n = (r = -1 < r.indexOf("?") ? r.replace(/\S*\?/, "") : "").split("&").filter((function (e) {
                return "" !== e
            }))).length, i = 0; i < o; i += 1) a = n[i].replace(/#\S+/g, "").split("="), s[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
            return s
        }, isObject: function (e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }, extend: function () {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                var a = e[n];
                if (null != a) for (var o = Object.keys(Object(a)), s = 0, r = o.length; s < r; s += 1) {
                    var l = o[s], c = Object.getOwnPropertyDescriptor(a, l);
                    void 0 !== c && c.enumerable && (d.isObject(i[l]) && d.isObject(a[l]) ? d.extend(i[l], a[l]) : !d.isObject(i[l]) && d.isObject(a[l]) ? (i[l] = {}, d.extend(i[l], a[l])) : i[l] = a[l])
                }
            }
            return i
        }
    }, c = (l = e.createElement("div"), {
        touch: t.Modernizr && !0 === t.Modernizr.touch || !!(0 < t.navigator.maxTouchPoints || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        pointerEvents: !!(t.navigator.pointerEnabled || t.PointerEvent || "maxTouchPoints" in t.navigator),
        prefixedPointerEvents: !!t.navigator.msPointerEnabled,
        transition: (r = l.style, "transition" in r || "webkitTransition" in r || "MozTransition" in r),
        transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || (s = l.style, "webkitPerspective" in s || "MozPerspective" in s || "OPerspective" in s || "MsPerspective" in s || "perspective" in s),
        flexbox: function () {
            for (var e = l.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return !0;
            return !1
        }(),
        observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
        passiveListener: function () {
            var e = !1;
            try {
                var i = Object.defineProperty({}, "passive", {
                    get: function () {
                        e = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, i)
            } catch (e) {
            }
            return e
        }(),
        gestures: "ongesturestart" in t
    }), p = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function (e) {
            t.on(e, t.params.on[e])
        }))
    }, u = {components: {configurable: !0}};
    p.prototype.on = function (e, t, i) {
        var n = this;
        if ("function" != typeof t) return n;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach((function (e) {
            n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][a](t)
        })), n
    }, p.prototype.once = function (e, t, i) {
        var n = this;
        return "function" != typeof t ? n : n.on(e, (function i() {
            for (var a = [], o = arguments.length; o--;) a[o] = arguments[o];
            t.apply(n, a), n.off(e, i)
        }), i)
    }, p.prototype.off = function (e, t) {
        var i = this;
        return i.eventsListeners && e.split(" ").forEach((function (e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function (n, a) {
                n === t && i.eventsListeners[e].splice(a, 1)
            }))
        })), i
    }, p.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, n, a, o = this;
        return o.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], n = e.slice(1, e.length), a = o) : (i = e[0].events, n = e[0].data, a = e[0].context || o), (Array.isArray(i) ? i : i.split(" ")).forEach((function (e) {
            if (o.eventsListeners && o.eventsListeners[e]) {
                var t = [];
                o.eventsListeners[e].forEach((function (e) {
                    t.push(e)
                })), t.forEach((function (e) {
                    e.apply(a, n)
                }))
            }
        }))), o
    }, p.prototype.useModulesParams = function (e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function (i) {
            var n = t.modules[i];
            n.params && d.extend(e, n.params)
        }))
    }, p.prototype.useModules = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function (i) {
            var n = t.modules[i], a = e[i] || {};
            n.instance && Object.keys(n.instance).forEach((function (e) {
                var i = n.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            })), n.on && t.on && Object.keys(n.on).forEach((function (e) {
                t.on(e, n.on[e])
            })), n.create && n.create.bind(t)(a)
        }))
    }, u.components.set = function (e) {
        this.use && this.use(e)
    }, p.installModule = function (e) {
        for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1];
        var n = this;
        n.prototype.modules || (n.prototype.modules = {});
        var a = e.name || Object.keys(n.prototype.modules).length + "_" + d.now();
        return (n.prototype.modules[a] = e).proto && Object.keys(e.proto).forEach((function (t) {
            n.prototype[t] = e.proto[t]
        })), e.static && Object.keys(e.static).forEach((function (t) {
            n[t] = e.static[t]
        })), e.install && e.install.apply(n, t), n
    }, p.use = function (e) {
        for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1];
        var n = this;
        return Array.isArray(e) ? (e.forEach((function (e) {
            return n.installModule(e)
        })), n) : n.installModule.apply(n, [e].concat(t))
    }, Object.defineProperties(p, u);
    var h = {
        updateSize: function () {
            var e, t, i = this, n = i.$el;
            e = void 0 !== i.params.width ? i.params.width : n[0].clientWidth, t = void 0 !== i.params.height ? i.params.height : n[0].clientHeight, 0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(n.css("padding-left"), 10) - parseInt(n.css("padding-right"), 10), t = t - parseInt(n.css("padding-top"), 10) - parseInt(n.css("padding-bottom"), 10), d.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e : t
            }))
        }, updateSlides: function () {
            var e = this, i = e.params, n = e.$wrapperEl, a = e.size, o = e.rtlTranslate, s = e.wrongRTL,
                r = e.virtual && i.virtual.enabled, l = r ? e.virtual.slides.length : e.slides.length,
                p = n.children("." + e.params.slideClass), u = r ? e.virtual.slides.length : p.length, h = [], f = [],
                m = [], v = i.slidesOffsetBefore;
            "function" == typeof v && (v = i.slidesOffsetBefore.call(e));
            var g = i.slidesOffsetAfter;
            "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
            var b = e.snapGrid.length, y = e.snapGrid.length, w = i.spaceBetween, x = -v, S = 0, T = 0;
            if (void 0 !== a) {
                var E, C;
                "string" == typeof w && 0 <= w.indexOf("%") && (w = parseFloat(w.replace("%", "")) / 100 * a), e.virtualSize = -w, o ? p.css({
                    marginLeft: "",
                    marginTop: ""
                }) : p.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < i.slidesPerColumn && (E = Math.floor(u / i.slidesPerColumn) === u / e.params.slidesPerColumn ? u : Math.ceil(u / i.slidesPerColumn) * i.slidesPerColumn, "auto" !== i.slidesPerView && "row" === i.slidesPerColumnFill && (E = Math.max(E, i.slidesPerView * i.slidesPerColumn)));
                for (var k, P = i.slidesPerColumn, M = E / P, $ = Math.floor(u / i.slidesPerColumn), L = 0; L < u; L += 1) {
                    C = 0;
                    var z = p.eq(L);
                    if (1 < i.slidesPerColumn) {
                        var I = void 0, A = void 0, O = void 0;
                        "column" === i.slidesPerColumnFill ? (O = L - (A = Math.floor(L / P)) * P, ($ < A || A === $ && O === P - 1) && P <= (O += 1) && (O = 0, A += 1), I = A + O * E / P, z.css({
                            "-webkit-box-ordinal-group": I,
                            "-moz-box-ordinal-group": I,
                            "-ms-flex-order": I,
                            "-webkit-order": I,
                            order: I
                        })) : A = L - (O = Math.floor(L / M)) * M, z.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== O && i.spaceBetween && i.spaceBetween + "px").attr("data-swiper-column", A).attr("data-swiper-row", O)
                    }
                    if ("none" !== z.css("display")) {
                        if ("auto" === i.slidesPerView) {
                            var D = t.getComputedStyle(z[0], null), F = z[0].style.transform,
                                H = z[0].style.webkitTransform;
                            if (F && (z[0].style.transform = "none"), H && (z[0].style.webkitTransform = "none"), i.roundLengths) C = e.isHorizontal() ? z.outerWidth(!0) : z.outerHeight(!0); else if (e.isHorizontal()) {
                                var B = parseFloat(D.getPropertyValue("width")),
                                    Y = parseFloat(D.getPropertyValue("padding-left")),
                                    X = parseFloat(D.getPropertyValue("padding-right")),
                                    j = parseFloat(D.getPropertyValue("margin-left")),
                                    N = parseFloat(D.getPropertyValue("margin-right")),
                                    R = D.getPropertyValue("box-sizing");
                                C = R && "border-box" === R ? B + j + N : B + Y + X + j + N
                            } else {
                                var V = parseFloat(D.getPropertyValue("height")),
                                    _ = parseFloat(D.getPropertyValue("padding-top")),
                                    q = parseFloat(D.getPropertyValue("padding-bottom")),
                                    G = parseFloat(D.getPropertyValue("margin-top")),
                                    W = parseFloat(D.getPropertyValue("margin-bottom")),
                                    U = D.getPropertyValue("box-sizing");
                                C = U && "border-box" === U ? V + G + W : V + _ + q + G + W
                            }
                            F && (z[0].style.transform = F), H && (z[0].style.webkitTransform = H), i.roundLengths && (C = Math.floor(C))
                        } else C = (a - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (C = Math.floor(C)), p[L] && (e.isHorizontal() ? p[L].style.width = C + "px" : p[L].style.height = C + "px");
                        p[L] && (p[L].swiperSlideSize = C), m.push(C), i.centeredSlides ? (x = x + C / 2 + S / 2 + w, 0 === S && 0 !== L && (x = x - a / 2 - w), 0 === L && (x = x - a / 2 - w), Math.abs(x) < .001 && (x = 0), i.roundLengths && (x = Math.floor(x)), T % i.slidesPerGroup == 0 && h.push(x), f.push(x)) : (i.roundLengths && (x = Math.floor(x)), T % i.slidesPerGroup == 0 && h.push(x), f.push(x), x = x + C + w), e.virtualSize += C + w, S = C, T += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, a) + g, o && s && ("slide" === i.effect || "coverflow" === i.effect) && n.css({width: e.virtualSize + i.spaceBetween + "px"}), c.flexbox && !i.setWrapperSize || (e.isHorizontal() ? n.css({width: e.virtualSize + i.spaceBetween + "px"}) : n.css({height: e.virtualSize + i.spaceBetween + "px"})), 1 < i.slidesPerColumn && (e.virtualSize = (C + i.spaceBetween) * E, e.virtualSize = Math.ceil(e.virtualSize / i.slidesPerColumn) - i.spaceBetween, e.isHorizontal() ? n.css({width: e.virtualSize + i.spaceBetween + "px"}) : n.css({height: e.virtualSize + i.spaceBetween + "px"}), i.centeredSlides)) {
                    k = [];
                    for (var K = 0; K < h.length; K += 1) {
                        var Q = h[K];
                        i.roundLengths && (Q = Math.floor(Q)), h[K] < e.virtualSize + h[0] && k.push(Q)
                    }
                    h = k
                }
                if (!i.centeredSlides) {
                    k = [];
                    for (var Z = 0; Z < h.length; Z += 1) {
                        var J = h[Z];
                        i.roundLengths && (J = Math.floor(J)), h[Z] <= e.virtualSize - a && k.push(J)
                    }
                    h = k, 1 < Math.floor(e.virtualSize - a) - Math.floor(h[h.length - 1]) && h.push(e.virtualSize - a)
                }
                if (0 === h.length && (h = [0]), 0 !== i.spaceBetween && (e.isHorizontal() ? o ? p.css({marginLeft: w + "px"}) : p.css({marginRight: w + "px"}) : p.css({marginBottom: w + "px"})), i.centerInsufficientSlides) {
                    var ee = 0;
                    if (m.forEach((function (e) {
                            ee += e + (i.spaceBetween ? i.spaceBetween : 0)
                        })), (ee -= i.spaceBetween) < a) {
                        var te = (a - ee) / 2;
                        h.forEach((function (e, t) {
                            h[t] = e - te
                        })), f.forEach((function (e, t) {
                            f[t] = e + te
                        }))
                    }
                }
                d.extend(e, {
                    slides: p,
                    snapGrid: h,
                    slidesGrid: f,
                    slidesSizesGrid: m
                }), u !== l && e.emit("slidesLengthChange"), h.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== y && e.emit("slidesGridLengthChange"), (i.watchSlidesProgress || i.watchSlidesVisibility) && e.updateSlidesOffset()
            }
        }, updateAutoHeight: function (e) {
            var t, i = this, n = [], a = 0;
            if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed), "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView) for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
                var o = i.activeIndex + t;
                if (o > i.slides.length) break;
                n.push(i.slides.eq(o)[0])
            } else n.push(i.slides.eq(i.activeIndex)[0]);
            for (t = 0; t < n.length; t += 1) if (void 0 !== n[t]) {
                var s = n[t].offsetHeight;
                a = a < s ? s : a
            }
            a && i.$wrapperEl.css("height", a + "px")
        }, updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        }, updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, i = t.params, a = t.slides, o = t.rtlTranslate;
            if (0 !== a.length) {
                void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
                var s = -e;
                o && (s = e), a.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                for (var r = 0; r < a.length; r += 1) {
                    var l = a[r],
                        d = (s + (i.centeredSlides ? t.minTranslate() : 0) - l.swiperSlideOffset) / (l.swiperSlideSize + i.spaceBetween);
                    if (i.watchSlidesVisibility) {
                        var c = -(s - l.swiperSlideOffset), p = c + t.slidesSizesGrid[r];
                        (0 <= c && c < t.size || 0 < p && p <= t.size || c <= 0 && p >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(r), a.eq(r).addClass(i.slideVisibleClass))
                    }
                    l.progress = o ? -d : d
                }
                t.visibleSlides = n(t.visibleSlides)
            }
        }, updateProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, i = t.params, n = t.maxTranslate() - t.minTranslate(), a = t.progress, o = t.isBeginning,
                s = t.isEnd, r = o, l = s;
            0 === n ? s = o = !(a = 0) : (o = (a = (e - t.minTranslate()) / n) <= 0, s = 1 <= a), d.extend(t, {
                progress: a,
                isBeginning: o,
                isEnd: s
            }), (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e), o && !r && t.emit("reachBeginning toEdge"), s && !l && t.emit("reachEnd toEdge"), (r && !o || l && !s) && t.emit("fromEdge"), t.emit("progress", a)
        }, updateSlidesClasses: function () {
            var e, t = this, i = t.slides, n = t.params, a = t.$wrapperEl, o = t.activeIndex, s = t.realIndex,
                r = t.virtual && n.virtual.enabled;
            i.removeClass(n.slideActiveClass + " " + n.slideNextClass + " " + n.slidePrevClass + " " + n.slideDuplicateActiveClass + " " + n.slideDuplicateNextClass + " " + n.slideDuplicatePrevClass), (e = r ? t.$wrapperEl.find("." + n.slideClass + '[data-swiper-slide-index="' + o + '"]') : i.eq(o)).addClass(n.slideActiveClass), n.loop && (e.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass));
            var l = e.nextAll("." + n.slideClass).eq(0).addClass(n.slideNextClass);
            n.loop && 0 === l.length && (l = i.eq(0)).addClass(n.slideNextClass);
            var d = e.prevAll("." + n.slideClass).eq(0).addClass(n.slidePrevClass);
            n.loop && 0 === d.length && (d = i.eq(-1)).addClass(n.slidePrevClass), n.loop && (l.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass), d.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass))
        }, updateActiveIndex: function (e) {
            var t, i = this, n = i.rtlTranslate ? i.translate : -i.translate, a = i.slidesGrid, o = i.snapGrid,
                s = i.params, r = i.activeIndex, l = i.realIndex, c = i.snapIndex, p = e;
            if (void 0 === p) {
                for (var u = 0; u < a.length; u += 1) void 0 !== a[u + 1] ? n >= a[u] && n < a[u + 1] - (a[u + 1] - a[u]) / 2 ? p = u : n >= a[u] && n < a[u + 1] && (p = u + 1) : n >= a[u] && (p = u);
                s.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
            }
            if ((t = 0 <= o.indexOf(n) ? o.indexOf(n) : Math.floor(p / s.slidesPerGroup)) >= o.length && (t = o.length - 1), p !== r) {
                var h = parseInt(i.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                d.extend(i, {
                    snapIndex: t,
                    realIndex: h,
                    previousIndex: r,
                    activeIndex: p
                }), i.emit("activeIndexChange"), i.emit("snapIndexChange"), l !== h && i.emit("realIndexChange"), i.emit("slideChange")
            } else t !== c && (i.snapIndex = t, i.emit("snapIndexChange"))
        }, updateClickedSlide: function (e) {
            var t = this, i = t.params, a = n(e.target).closest("." + i.slideClass)[0], o = !1;
            if (a) for (var s = 0; s < t.slides.length; s += 1) t.slides[s] === a && (o = !0);
            if (!a || !o) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
            t.clickedSlide = a, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n(a).index(), i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    }, f = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params, i = this.rtlTranslate, n = this.translate, a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -n : n;
            var o = d.getTranslate(a[0], e);
            return i && (o = -o), o || 0
        }, setTranslate: function (e, t) {
            var i = this, n = i.rtlTranslate, a = i.params, o = i.$wrapperEl, s = i.progress, r = 0, l = 0;
            i.isHorizontal() ? r = n ? -e : e : l = e, a.roundLengths && (r = Math.floor(r), l = Math.floor(l)), a.virtualTranslate || (c.transforms3d ? o.transform("translate3d(" + r + "px, " + l + "px, 0px)") : o.transform("translate(" + r + "px, " + l + "px)")), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? r : l;
            var d = i.maxTranslate() - i.minTranslate();
            (0 === d ? 0 : (e - i.minTranslate()) / d) !== s && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
        }, minTranslate: function () {
            return -this.snapGrid[0]
        }, maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        }
    }, m = {
        slideTo: function (e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = this, o = e;
            o < 0 && (o = 0);
            var s = a.params, r = a.snapGrid, l = a.slidesGrid, d = a.previousIndex, p = a.activeIndex,
                u = a.rtlTranslate;
            if (a.animating && s.preventInteractionOnTransition) return !1;
            var h = Math.floor(o / s.slidesPerGroup);
            h >= r.length && (h = r.length - 1), (p || s.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
            var f, m = -r[h];
            if (a.updateProgress(m), s.normalizeSlideIndex) for (var v = 0; v < l.length; v += 1) -Math.floor(100 * m) >= Math.floor(100 * l[v]) && (o = v);
            if (a.initialized && o !== p) {
                if (!a.allowSlideNext && m < a.translate && m < a.minTranslate()) return !1;
                if (!a.allowSlidePrev && m > a.translate && m > a.maxTranslate() && (p || 0) !== o) return !1
            }
            return f = p < o ? "next" : o < p ? "prev" : "reset", u && -m === a.translate || !u && m === a.translate ? (a.updateActiveIndex(o), s.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== s.effect && a.setTranslate(m), "reset" !== f && (a.transitionStart(i, f), a.transitionEnd(i, f)), !1) : (0 !== t && c.transition ? (a.setTransition(t), a.setTranslate(m), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), a.transitionStart(i, f), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
                a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, f))
            }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))) : (a.setTransition(0), a.setTranslate(m), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), a.transitionStart(i, f), a.transitionEnd(i, f)), !0)
        }, slideToLoop: function (e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, n)
        }, slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this, a = n.params, o = n.animating;
            return a.loop ? !o && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, n.slideTo(n.activeIndex + a.slidesPerGroup, e, t, i)) : n.slideTo(n.activeIndex + a.slidesPerGroup, e, t, i)
        }, slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this, a = n.params, o = n.animating, s = n.snapGrid, r = n.slidesGrid, l = n.rtlTranslate;
            if (a.loop) {
                if (o) return !1;
                n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft
            }

            function d(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }

            var c, p = d(l ? n.translate : -n.translate), u = s.map((function (e) {
                return d(e)
            })), h = (r.map((function (e) {
                return d(e)
            })), s[u.indexOf(p)], s[u.indexOf(p) - 1]);
            return void 0 !== h && (c = r.indexOf(h)) < 0 && (c = n.activeIndex - 1), n.slideTo(c, e, t, i)
        }, slideReset: function (e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
        }, slideToClosest: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this, a = n.activeIndex, o = Math.floor(a / n.params.slidesPerGroup);
            if (o < n.snapGrid.length - 1) {
                var s = n.rtlTranslate ? n.translate : -n.translate, r = n.snapGrid[o];
                (n.snapGrid[o + 1] - r) / 2 < s - r && (a = n.params.slidesPerGroup)
            }
            return n.slideTo(a, e, t, i)
        }, slideToClickedSlide: function () {
            var e, t = this, i = t.params, a = t.$wrapperEl,
                o = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, s = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? s < t.loopedSlides - o / 2 || s > t.slides.length - t.loopedSlides + o / 2 ? (t.loopFix(), s = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick((function () {
                    t.slideTo(s)
                }))) : t.slideTo(s) : s > t.slides.length - o ? (t.loopFix(), s = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick((function () {
                    t.slideTo(s)
                }))) : t.slideTo(s)
            } else t.slideTo(s)
        }
    }, v = {
        loopCreate: function () {
            var t = this, i = t.params, a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var o = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var s = i.slidesPerGroup - o.length % i.slidesPerGroup;
                if (s !== i.slidesPerGroup) {
                    for (var r = 0; r < s; r += 1) {
                        var l = n(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    o = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = o.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > o.length && (t.loopedSlides = o.length);
            var d = [], c = [];
            o.each((function (e, i) {
                var a = n(i);
                e < t.loopedSlides && c.push(i), e < o.length && e >= o.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
            }));
            for (var p = 0; p < c.length; p += 1) a.append(n(c[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var u = d.length - 1; 0 <= u; u -= 1) a.prepend(n(d[u].cloneNode(!0)).addClass(i.slideDuplicateClass))
        }, loopFix: function () {
            var e, t = this, i = t.params, n = t.activeIndex, a = t.slides, o = t.loopedSlides, s = t.allowSlidePrev,
                r = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var c = -l[n] - t.getTranslate();
            n < o ? (e = a.length - 3 * o + n, e += o, t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c)) : ("auto" === i.slidesPerView && 2 * o <= n || n >= a.length - o) && (e = -a.length + n + o, e += o, t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c)), t.allowSlidePrev = s, t.allowSlideNext = r
        }, loopDestroy: function () {
            var e = this.$wrapperEl, t = this.params, i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    }, g = {
        setGrabCursor: function (e) {
            if (!(c.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        }, unsetGrabCursor: function () {
            c.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "")
        }
    }, b = {
        appendSlide: function (e) {
            var t = this, i = t.$wrapperEl, n = t.params;
            if (n.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (var a = 0; a < e.length; a += 1) e[a] && i.append(e[a]); else i.append(e);
            n.loop && t.loopCreate(), n.observer && c.observer || t.update()
        }, prependSlide: function (e) {
            var t = this, i = t.params, n = t.$wrapperEl, a = t.activeIndex;
            i.loop && t.loopDestroy();
            var o = a + 1;
            if ("object" == typeof e && "length" in e) {
                for (var s = 0; s < e.length; s += 1) e[s] && n.prepend(e[s]);
                o = a + e.length
            } else n.prepend(e);
            i.loop && t.loopCreate(), i.observer && c.observer || t.update(), t.slideTo(o, 0, !1)
        }, addSlide: function (e, t) {
            var i = this, n = i.$wrapperEl, a = i.params, o = i.activeIndex;
            a.loop && (o -= i.loopedSlides, i.loopDestroy(), i.slides = n.children("." + a.slideClass));
            var s = i.slides.length;
            if (e <= 0) i.prependSlide(t); else if (s <= e) i.appendSlide(t); else {
                for (var r = e < o ? o + 1 : o, l = [], d = s - 1; e <= d; d -= 1) {
                    var p = i.slides.eq(d);
                    p.remove(), l.unshift(p)
                }
                if ("object" == typeof t && "length" in t) {
                    for (var u = 0; u < t.length; u += 1) t[u] && n.append(t[u]);
                    r = e < o ? o + t.length : o
                } else n.append(t);
                for (var h = 0; h < l.length; h += 1) n.append(l[h]);
                a.loop && i.loopCreate(), a.observer && c.observer || i.update(), a.loop ? i.slideTo(r + i.loopedSlides, 0, !1) : i.slideTo(r, 0, !1)
            }
        }, removeSlide: function (e) {
            var t = this, i = t.params, n = t.$wrapperEl, a = t.activeIndex;
            i.loop && (a -= t.loopedSlides, t.loopDestroy(), t.slides = n.children("." + i.slideClass));
            var o, s = a;
            if ("object" == typeof e && "length" in e) {
                for (var r = 0; r < e.length; r += 1) o = e[r], t.slides[o] && t.slides.eq(o).remove(), o < s && (s -= 1);
                s = Math.max(s, 0)
            } else o = e, t.slides[o] && t.slides.eq(o).remove(), o < s && (s -= 1), s = Math.max(s, 0);
            i.loop && t.loopCreate(), i.observer && c.observer || t.update(), i.loop ? t.slideTo(s + t.loopedSlides, 0, !1) : t.slideTo(s, 0, !1)
        }, removeAllSlides: function () {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e)
        }
    }, y = function () {
        var i = t.navigator.userAgent, n = {
                ios: !1,
                android: !1,
                androidChrome: !1,
                desktop: !1,
                windows: !1,
                iphone: !1,
                ipod: !1,
                ipad: !1,
                cordova: t.cordova || t.phonegap,
                phonegap: t.cordova || t.phonegap
            }, a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), o = i.match(/(Android);?[\s\/]+([\d.]+)?/),
            s = i.match(/(iPad).*OS\s([\d_]+)/), r = i.match(/(iPod)(.*OS\s([\d_]+))?/),
            l = !s && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (a && (n.os = "windows", n.osVersion = a[2], n.windows = !0), o && !a && (n.os = "android", n.osVersion = o[2], n.android = !0, n.androidChrome = 0 <= i.toLowerCase().indexOf("chrome")), (s || l || r) && (n.os = "ios", n.ios = !0), l && !r && (n.osVersion = l[2].replace(/_/g, "."), n.iphone = !0), s && (n.osVersion = s[2].replace(/_/g, "."), n.ipad = !0), r && (n.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, n.iphone = !0), n.ios && n.osVersion && 0 <= i.indexOf("Version/") && "10" === n.osVersion.split(".")[0] && (n.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]), n.desktop = !(n.os || n.android || n.webView), n.webView = (l || s || r) && i.match(/.*AppleWebKit(?!.*Safari)/i), n.os && "ios" === n.os) {
            var d = n.osVersion.split("."), c = e.querySelector('meta[name="viewport"]');
            n.minimalUi = !n.webView && (r || l) && (1 * d[0] == 7 ? 1 <= 1 * d[1] : 7 < 1 * d[0]) && c && 0 <= c.getAttribute("content").indexOf("minimal-ui")
        }
        return n.pixelRatio = t.devicePixelRatio || 1, n
    }();

    function w() {
        var e = this, t = e.params, i = e.el;
        if (!i || 0 !== i.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var n = e.allowSlideNext, a = e.allowSlidePrev, o = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) {
                var s = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight()
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = a, e.allowSlideNext = n, e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow()
        }
    }

    var x, S = {
            attachEvents: function () {
                var i = this, a = i.params, o = i.touchEvents, s = i.el, r = i.wrapperEl;
                i.onTouchStart = function (i) {
                    var a = this, o = a.touchEventsData, s = a.params, r = a.touches;
                    if (!a.animating || !s.preventInteractionOnTransition) {
                        var l = i;
                        if (l.originalEvent && (l = l.originalEvent), o.isTouchEvent = "touchstart" === l.type, (o.isTouchEvent || !("which" in l) || 3 !== l.which) && !(!o.isTouchEvent && "button" in l && 0 < l.button || o.isTouched && o.isMoved)) if (s.noSwiping && n(l.target).closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) a.allowClick = !0; else if (!s.swipeHandler || n(l).closest(s.swipeHandler)[0]) {
                            r.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX, r.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
                            var c = r.currentX, p = r.currentY, u = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
                                h = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
                            if (!u || !(c <= h || c >= t.screen.width - h)) {
                                if (d.extend(o, {
                                        isTouched: !0,
                                        isMoved: !1,
                                        allowTouchCallbacks: !0,
                                        isScrolling: void 0,
                                        startMoving: void 0
                                    }), r.startX = c, r.startY = p, o.touchStartTime = d.now(), a.allowClick = !0, a.updateSize(), a.swipeDirection = void 0, 0 < s.threshold && (o.allowThresholdMove = !1), "touchstart" !== l.type) {
                                    var f = !0;
                                    n(l.target).is(o.formElements) && (f = !1), e.activeElement && n(e.activeElement).is(o.formElements) && e.activeElement !== l.target && e.activeElement.blur();
                                    var m = f && a.allowTouchMove && s.touchStartPreventDefault;
                                    (s.touchStartForcePreventDefault || m) && l.preventDefault()
                                }
                                a.emit("touchStart", l)
                            }
                        }
                    }
                }.bind(i), i.onTouchMove = function (t) {
                    var i = this, a = i.touchEventsData, o = i.params, s = i.touches, r = i.rtlTranslate, l = t;
                    if (l.originalEvent && (l = l.originalEvent), a.isTouched) {
                        if (!a.isTouchEvent || "mousemove" !== l.type) {
                            var c = "touchmove" === l.type ? l.targetTouches[0].pageX : l.pageX,
                                p = "touchmove" === l.type ? l.targetTouches[0].pageY : l.pageY;
                            if (l.preventedByNestedSwiper) return s.startX = c, void(s.startY = p);
                            if (!i.allowTouchMove) return i.allowClick = !1, void(a.isTouched && (d.extend(s, {
                                startX: c,
                                startY: p,
                                currentX: c,
                                currentY: p
                            }), a.touchStartTime = d.now()));
                            if (a.isTouchEvent && o.touchReleaseOnEdges && !o.loop) if (i.isVertical()) {
                                if (p < s.startY && i.translate <= i.maxTranslate() || p > s.startY && i.translate >= i.minTranslate()) return a.isTouched = !1, void(a.isMoved = !1)
                            } else if (c < s.startX && i.translate <= i.maxTranslate() || c > s.startX && i.translate >= i.minTranslate()) return;
                            if (a.isTouchEvent && e.activeElement && l.target === e.activeElement && n(l.target).is(a.formElements)) return a.isMoved = !0, void(i.allowClick = !1);
                            if (a.allowTouchCallbacks && i.emit("touchMove", l), !(l.targetTouches && 1 < l.targetTouches.length)) {
                                s.currentX = c, s.currentY = p;
                                var u, h = s.currentX - s.startX, f = s.currentY - s.startY;
                                if (!(i.params.threshold && Math.sqrt(Math.pow(h, 2) + Math.pow(f, 2)) < i.params.threshold)) if (void 0 === a.isScrolling && (i.isHorizontal() && s.currentY === s.startY || i.isVertical() && s.currentX === s.startX ? a.isScrolling = !1 : 25 <= h * h + f * f && (u = 180 * Math.atan2(Math.abs(f), Math.abs(h)) / Math.PI, a.isScrolling = i.isHorizontal() ? u > o.touchAngle : 90 - u > o.touchAngle)), a.isScrolling && i.emit("touchMoveOpposite", l), void 0 === a.startMoving && (s.currentX === s.startX && s.currentY === s.startY || (a.startMoving = !0)), a.isScrolling) a.isTouched = !1; else if (a.startMoving) {
                                    i.allowClick = !1, l.preventDefault(), o.touchMoveStopPropagation && !o.nested && l.stopPropagation(), a.isMoved || (o.loop && i.loopFix(), a.startTranslate = i.getTranslate(), i.setTransition(0), i.animating && i.$wrapperEl.trigger("webkitTransitionEnd transitionend"), a.allowMomentumBounce = !1, !o.grabCursor || !0 !== i.allowSlideNext && !0 !== i.allowSlidePrev || i.setGrabCursor(!0), i.emit("sliderFirstMove", l)), i.emit("sliderMove", l), a.isMoved = !0;
                                    var m = i.isHorizontal() ? h : f;
                                    s.diff = m, m *= o.touchRatio, r && (m = -m), i.swipeDirection = 0 < m ? "prev" : "next", a.currentTranslate = m + a.startTranslate;
                                    var v = !0, g = o.resistanceRatio;
                                    if (o.touchReleaseOnEdges && (g = 0), 0 < m && a.currentTranslate > i.minTranslate() ? (v = !1, o.resistance && (a.currentTranslate = i.minTranslate() - 1 + Math.pow(-i.minTranslate() + a.startTranslate + m, g))) : m < 0 && a.currentTranslate < i.maxTranslate() && (v = !1, o.resistance && (a.currentTranslate = i.maxTranslate() + 1 - Math.pow(i.maxTranslate() - a.startTranslate - m, g))), v && (l.preventedByNestedSwiper = !0), !i.allowSlideNext && "next" === i.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate), !i.allowSlidePrev && "prev" === i.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate), 0 < o.threshold) {
                                        if (!(Math.abs(m) > o.threshold || a.allowThresholdMove)) return void(a.currentTranslate = a.startTranslate);
                                        if (!a.allowThresholdMove) return a.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, a.currentTranslate = a.startTranslate, void(s.diff = i.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY)
                                    }
                                    o.followFinger && ((o.freeMode || o.watchSlidesProgress || o.watchSlidesVisibility) && (i.updateActiveIndex(), i.updateSlidesClasses()), o.freeMode && (0 === a.velocities.length && a.velocities.push({
                                        position: s[i.isHorizontal() ? "startX" : "startY"],
                                        time: a.touchStartTime
                                    }), a.velocities.push({
                                        position: s[i.isHorizontal() ? "currentX" : "currentY"],
                                        time: d.now()
                                    })), i.updateProgress(a.currentTranslate), i.setTranslate(a.currentTranslate))
                                }
                            }
                        }
                    } else a.startMoving && a.isScrolling && i.emit("touchMoveOpposite", l)
                }.bind(i), i.onTouchEnd = function (e) {
                    var t = this, i = t.touchEventsData, n = t.params, a = t.touches, o = t.rtlTranslate, s = t.$wrapperEl,
                        r = t.slidesGrid, l = t.snapGrid, c = e;
                    if (c.originalEvent && (c = c.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", c), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && n.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                    n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                    var p, u = d.now(), h = u - i.touchStartTime;
                    if (t.allowClick && (t.updateClickedSlide(c), t.emit("tap", c), h < 300 && 300 < u - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = d.nextTick((function () {
                            t && !t.destroyed && t.emit("click", c)
                        }), 300)), h < 300 && u - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", c))), i.lastClickTime = d.now(), d.nextTick((function () {
                            t.destroyed || (t.allowClick = !0)
                        })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                    if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = n.followFinger ? o ? t.translate : -t.translate : -i.currentTranslate, n.freeMode) {
                        if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                        if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                        if (n.freeModeMomentum) {
                            if (1 < i.velocities.length) {
                                var f = i.velocities.pop(), m = i.velocities.pop(), v = f.position - m.position,
                                    g = f.time - m.time;
                                t.velocity = v / g, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), (150 < g || 300 < d.now() - f.time) && (t.velocity = 0)
                            } else t.velocity = 0;
                            t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                            var b = 1e3 * n.freeModeMomentumRatio, y = t.velocity * b, w = t.translate + y;
                            o && (w = -w);
                            var x, S, T = !1, E = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                            if (w < t.maxTranslate()) n.freeModeMomentumBounce ? (w + t.maxTranslate() < -E && (w = t.maxTranslate() - E), x = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.maxTranslate(), n.loop && n.centeredSlides && (S = !0); else if (w > t.minTranslate()) n.freeModeMomentumBounce ? (w - t.minTranslate() > E && (w = t.minTranslate() + E), x = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : w = t.minTranslate(), n.loop && n.centeredSlides && (S = !0); else if (n.freeModeSticky) {
                                for (var C, k = 0; k < l.length; k += 1) if (l[k] > -w) {
                                    C = k;
                                    break
                                }
                                w = -(w = Math.abs(l[C] - w) < Math.abs(l[C - 1] - w) || "next" === t.swipeDirection ? l[C] : l[C - 1])
                            }
                            if (S && t.once("transitionEnd", (function () {
                                    t.loopFix()
                                })), 0 !== t.velocity) b = o ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity); else if (n.freeModeSticky) return void t.slideToClosest();
                            n.freeModeMomentumBounce && T ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, s.transitionEnd((function () {
                                t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), t.setTranslate(x), s.transitionEnd((function () {
                                    t && !t.destroyed && t.transitionEnd()
                                })))
                            }))) : t.velocity ? (t.updateProgress(w), t.setTransition(b), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, s.transitionEnd((function () {
                                t && !t.destroyed && t.transitionEnd()
                            })))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
                        } else if (n.freeModeSticky) return void t.slideToClosest();
                        (!n.freeModeMomentum || h >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                    } else {
                        for (var P = 0, M = t.slidesSizesGrid[0], $ = 0; $ < r.length; $ += n.slidesPerGroup) void 0 !== r[$ + n.slidesPerGroup] ? p >= r[$] && p < r[$ + n.slidesPerGroup] && (M = r[(P = $) + n.slidesPerGroup] - r[$]) : p >= r[$] && (P = $, M = r[r.length - 1] - r[r.length - 2]);
                        var L = (p - r[P]) / M;
                        if (h > n.longSwipesMs) {
                            if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && (L >= n.longSwipesRatio ? t.slideTo(P + n.slidesPerGroup) : t.slideTo(P)), "prev" === t.swipeDirection && (L > 1 - n.longSwipesRatio ? t.slideTo(P + n.slidesPerGroup) : t.slideTo(P))
                        } else {
                            if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && t.slideTo(P + n.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(P)
                        }
                    }
                }.bind(i), i.onClick = function (e) {
                    this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }.bind(i);
                var l = "container" === a.touchEventsTarget ? s : r, p = !!a.nested;
                if (c.touch || !c.pointerEvents && !c.prefixedPointerEvents) {
                    if (c.touch) {
                        var u = !("touchstart" !== o.start || !c.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        l.addEventListener(o.start, i.onTouchStart, u), l.addEventListener(o.move, i.onTouchMove, c.passiveListener ? {
                            passive: !1,
                            capture: p
                        } : p), l.addEventListener(o.end, i.onTouchEnd, u)
                    }
                    (a.simulateTouch && !y.ios && !y.android || a.simulateTouch && !c.touch && y.ios) && (l.addEventListener("mousedown", i.onTouchStart, !1), e.addEventListener("mousemove", i.onTouchMove, p), e.addEventListener("mouseup", i.onTouchEnd, !1))
                } else l.addEventListener(o.start, i.onTouchStart, !1), e.addEventListener(o.move, i.onTouchMove, p), e.addEventListener(o.end, i.onTouchEnd, !1);
                (a.preventClicks || a.preventClicksPropagation) && l.addEventListener("click", i.onClick, !0), i.on(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", w, !0)
            }, detachEvents: function () {
                var t = this, i = t.params, n = t.touchEvents, a = t.el, o = t.wrapperEl,
                    s = "container" === i.touchEventsTarget ? a : o, r = !!i.nested;
                if (c.touch || !c.pointerEvents && !c.prefixedPointerEvents) {
                    if (c.touch) {
                        var l = !("onTouchStart" !== n.start || !c.passiveListener || !i.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(n.start, t.onTouchStart, l), s.removeEventListener(n.move, t.onTouchMove, r), s.removeEventListener(n.end, t.onTouchEnd, l)
                    }
                    (i.simulateTouch && !y.ios && !y.android || i.simulateTouch && !c.touch && y.ios) && (s.removeEventListener("mousedown", t.onTouchStart, !1), e.removeEventListener("mousemove", t.onTouchMove, r), e.removeEventListener("mouseup", t.onTouchEnd, !1))
                } else s.removeEventListener(n.start, t.onTouchStart, !1), e.removeEventListener(n.move, t.onTouchMove, r), e.removeEventListener(n.end, t.onTouchEnd, !1);
                (i.preventClicks || i.preventClicksPropagation) && s.removeEventListener("click", t.onClick, !0), t.off(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", w)
            }
        }, T = {
            setBreakpoint: function () {
                var e = this, t = e.activeIndex, i = e.initialized, n = e.loopedSlides;
                void 0 === n && (n = 0);
                var a = e.params, o = a.breakpoints;
                if (o && (!o || 0 !== Object.keys(o).length)) {
                    var s = e.getBreakpoint(o);
                    if (s && e.currentBreakpoint !== s) {
                        var r = s in o ? o[s] : void 0;
                        r && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach((function (e) {
                            var t = r[e];
                            void 0 !== t && (r[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        }));
                        var l = r || e.originalParams, c = a.loop && l.slidesPerView !== a.slidesPerView;
                        d.extend(e.params, l), d.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = s, c && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - n + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                    }
                }
            }, getBreakpoint: function (e) {
                if (e) {
                    var i = !1, n = [];
                    Object.keys(e).forEach((function (e) {
                        n.push(e)
                    })), n.sort((function (e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    }));
                    for (var a = 0; a < n.length; a += 1) {
                        var o = n[a];
                        this.params.breakpointsInverse ? o <= t.innerWidth && (i = o) : o >= t.innerWidth && !i && (i = o)
                    }
                    return i || "max"
                }
            }
        }, E = {
            isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: (x = t.navigator.userAgent.toLowerCase(), 0 <= x.indexOf("safari") && x.indexOf("chrome") < 0 && x.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        }, C = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsInverse: !1,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        }, k = {
            update: h,
            translate: f,
            transition: {
                setTransition: function (e, t) {
                    this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
                }, transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    var i = this, n = i.activeIndex, a = i.params, o = i.previousIndex;
                    a.autoHeight && i.updateAutoHeight();
                    var s = t;
                    if (s || (s = o < n ? "next" : n < o ? "prev" : "reset"), i.emit("transitionStart"), e && n !== o) {
                        if ("reset" === s) return void i.emit("slideResetTransitionStart");
                        i.emit("slideChangeTransitionStart"), "next" === s ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart")
                    }
                }, transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    var i = this, n = i.activeIndex, a = i.previousIndex;
                    i.animating = !1, i.setTransition(0);
                    var o = t;
                    if (o || (o = a < n ? "next" : n < a ? "prev" : "reset"), i.emit("transitionEnd"), e && n !== a) {
                        if ("reset" === o) return void i.emit("slideResetTransitionEnd");
                        i.emit("slideChangeTransitionEnd"), "next" === o ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd")
                    }
                }
            },
            slide: m,
            loop: v,
            grabCursor: g,
            manipulation: b,
            events: S,
            breakpoints: T,
            checkOverflow: {
                checkOverflow: function () {
                    var e = this, t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update())
                }
            },
            classes: {
                addClasses: function () {
                    var e = this.classNames, t = this.params, i = this.rtl, n = this.$el, a = [];
                    a.push(t.direction), t.freeMode && a.push("free-mode"), c.flexbox || a.push("no-flexbox"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), 1 < t.slidesPerColumn && a.push("multirow"), y.android && a.push("android"), y.ios && a.push("ios"), (E.isIE || E.isEdge) && (c.pointerEvents || c.prefixedPointerEvents) && a.push("wp8-" + t.direction), a.forEach((function (i) {
                        e.push(t.containerModifierClass + i)
                    })), n.addClass(e.join(" "))
                }, removeClasses: function () {
                    var e = this.$el, t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function (e, i, n, a, o, s) {
                    var r;

                    function l() {
                        s && s()
                    }

                    e.complete && o ? l() : i ? ((r = new t.Image).onload = l, r.onerror = l, a && (r.sizes = a), n && (r.srcset = n), i && (r.src = i)) : l()
                }, preloadImages: function () {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }

                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var n = e.imagesToLoad[i];
                        e.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, t)
                    }
                }
            }
        }, P = {}, M = function (e) {
            function t() {
                for (var i, a, o, s = [], r = arguments.length; r--;) s[r] = arguments[r];
                1 === s.length && s[0].constructor && s[0].constructor === Object ? o = s[0] : (a = (i = s)[0], o = i[1]), o || (o = {}), o = d.extend({}, o), a && !o.el && (o.el = a), e.call(this, o), Object.keys(k).forEach((function (e) {
                    Object.keys(k[e]).forEach((function (i) {
                        t.prototype[i] || (t.prototype[i] = k[e][i])
                    }))
                }));
                var l = this;
                void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach((function (e) {
                    var t = l.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0], n = t.params[i];
                        if ("object" != typeof n || null === n) return;
                        if (!(i in o) || !("enabled" in n)) return;
                        !0 === o[i] && (o[i] = {enabled: !0}), "object" != typeof o[i] || "enabled" in o[i] || (o[i].enabled = !0), o[i] || (o[i] = {enabled: !1})
                    }
                }));
                var p = d.extend({}, C);
                l.useModulesParams(p), l.params = d.extend({}, p, P, o), l.originalParams = d.extend({}, l.params), l.passedParams = d.extend({}, o);
                var u = (l.$ = n)(l.params.el);
                if (a = u[0]) {
                    if (1 < u.length) {
                        var h = [];
                        return u.each((function (e, i) {
                            var n = d.extend({}, o, {el: i});
                            h.push(new t(n))
                        })), h
                    }
                    a.swiper = l, u.data("swiper", l);
                    var f, m, v = u.children("." + l.params.wrapperClass);
                    return d.extend(l, {
                        $el: u,
                        el: a,
                        $wrapperEl: v,
                        wrapperEl: v[0],
                        classNames: [],
                        slides: n(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function () {
                            return "horizontal" === l.params.direction
                        },
                        isVertical: function () {
                            return "vertical" === l.params.direction
                        },
                        rtl: "rtl" === a.dir.toLowerCase() || "rtl" === u.css("direction"),
                        rtlTranslate: "horizontal" === l.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === u.css("direction")),
                        wrongRTL: "-webkit-box" === v.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: l.params.allowSlideNext,
                        allowSlidePrev: l.params.allowSlidePrev,
                        touchEvents: (f = ["touchstart", "touchmove", "touchend"], m = ["mousedown", "mousemove", "mouseup"], c.pointerEvents ? m = ["pointerdown", "pointermove", "pointerup"] : c.prefixedPointerEvents && (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), l.touchEventsTouch = {
                            start: f[0],
                            move: f[1],
                            end: f[2]
                        }, l.touchEventsDesktop = {
                            start: m[0],
                            move: m[1],
                            end: m[2]
                        }, c.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video",
                            lastClickTime: d.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: l.params.allowTouchMove,
                        touches: {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0},
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), l.useModules(), l.params.init && l.init(), l
                }
            }

            e && (t.__proto__ = e);
            var i = {
                extendedDefaults: {configurable: !0},
                defaults: {configurable: !0},
                Class: {configurable: !0},
                $: {configurable: !0}
            };
            return ((t.prototype = Object.create(e && e.prototype)).constructor = t).prototype.slidesPerViewDynamic = function () {
                var e = this, t = e.params, i = e.slides, n = e.slidesGrid, a = e.size, o = e.activeIndex, s = 1;
                if (t.centeredSlides) {
                    for (var r, l = i[o].swiperSlideSize, d = o + 1; d < i.length; d += 1) i[d] && !r && (s += 1, a < (l += i[d].swiperSlideSize) && (r = !0));
                    for (var c = o - 1; 0 <= c; c -= 1) i[c] && !r && (s += 1, a < (l += i[c].swiperSlideSize) && (r = !0))
                } else for (var p = o + 1; p < i.length; p += 1) n[p] - n[o] < a && (s += 1);
                return s
            }, t.prototype.update = function () {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid, i = e.params;
                    i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (n(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || 1 < e.params.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || n(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function n() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.init = function () {
                var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"))
            }, t.prototype.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this, n = i.params, a = i.$el, o = i.$wrapperEl, s = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), o.removeAttr("style"), s && s.length && s.removeClass([n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function (e) {
                    i.off(e)
                })), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), d.deleteProps(i)), i.destroyed = !0), null
            }, t.extendDefaults = function (e) {
                d.extend(P, e)
            }, i.extendedDefaults.get = function () {
                return P
            }, i.defaults.get = function () {
                return C
            }, i.Class.get = function () {
                return e
            }, i.$.get = function () {
                return n
            }, Object.defineProperties(t, i), t
        }(p), $ = {name: "device", proto: {device: y}, static: {device: y}},
        L = {name: "support", proto: {support: c}, static: {support: c}},
        z = {name: "browser", proto: {browser: E}, static: {browser: E}}, I = {
            name: "resize", create: function () {
                var e = this;
                d.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        }, orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            }, on: {
                init: function () {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                }, destroy: function () {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        }, A = {
            func: t.MutationObserver || t.WebkitMutationObserver, attach: function (e, i) {
                void 0 === i && (i = {});
                var n = this, a = new A.func((function (e) {
                    if (1 !== e.length) {
                        var i = function () {
                            n.emit("observerUpdate", e[0])
                        };
                        t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                    } else n.emit("observerUpdate", e[0])
                }));
                a.observe(e, {
                    attributes: void 0 === i.attributes || i.attributes,
                    childList: void 0 === i.childList || i.childList,
                    characterData: void 0 === i.characterData || i.characterData
                }), n.observer.observers.push(a)
            }, init: function () {
                var e = this;
                if (c.observer && e.params.observer) {
                    if (e.params.observeParents) for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                    e.observer.attach(e.$el[0], {childList: e.params.observeSlideChildren}), e.observer.attach(e.$wrapperEl[0], {attributes: !1})
                }
            }, destroy: function () {
                this.observer.observers.forEach((function (e) {
                    e.disconnect()
                })), this.observer.observers = []
            }
        }, O = {
            name: "observer",
            params: {observer: !1, observeParents: !1, observeSlideChildren: !1},
            create: function () {
                d.extend(this, {
                    observer: {
                        init: A.init.bind(this),
                        attach: A.attach.bind(this),
                        destroy: A.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function () {
                    this.observer.init()
                }, destroy: function () {
                    this.observer.destroy()
                }
            }
        }, D = {
            update: function (e) {
                var t = this, i = t.params, n = i.slidesPerView, a = i.slidesPerGroup, o = i.centeredSlides,
                    s = t.params.virtual, r = s.addSlidesBefore, l = s.addSlidesAfter, c = t.virtual, p = c.from, u = c.to,
                    h = c.slides, f = c.slidesGrid, m = c.renderSlide, v = c.offset;
                t.updateActiveIndex();
                var g, b, y, w = t.activeIndex || 0;
                g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", o ? (b = Math.floor(n / 2) + a + r, y = Math.floor(n / 2) + a + l) : (b = n + (a - 1) + r, y = a + l);
                var x = Math.max((w || 0) - y, 0), S = Math.min((w || 0) + b, h.length - 1),
                    T = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

                function E() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }

                if (d.extend(t.virtual, {
                        from: x,
                        to: S,
                        offset: T,
                        slidesGrid: t.slidesGrid
                    }), p === x && u === S && !e) return t.slidesGrid !== f && T !== v && t.slides.css(g, T + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: T,
                    from: x,
                    to: S,
                    slides: function () {
                        for (var e = [], t = x; t <= S; t += 1) e.push(h[t]);
                        return e
                    }()
                }), void E();
                var C = [], k = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove(); else for (var P = p; P <= u; P += 1) (P < x || S < P) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
                for (var M = 0; M < h.length; M += 1) x <= M && M <= S && (void 0 === u || e ? k.push(M) : (u < M && k.push(M), M < p && C.push(M)));
                k.forEach((function (e) {
                    t.$wrapperEl.append(m(h[e], e))
                })), C.sort((function (e, t) {
                    return t - e
                })).forEach((function (e) {
                    t.$wrapperEl.prepend(m(h[e], e))
                })), t.$wrapperEl.children(".swiper-slide").css(g, T + "px"), E()
            }, renderSlide: function (e, t) {
                var i = this, a = i.params.virtual;
                if (a.cache && i.virtual.cache[t]) return i.virtual.cache[t];
                var o = a.renderSlide ? n(a.renderSlide.call(i, e, t)) : n('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return o.attr("data-swiper-slide-index") || o.attr("data-swiper-slide-index", t), a.cache && (i.virtual.cache[t] = o), o
            }, appendSlide: function (e) {
                this.virtual.slides.push(e), this.virtual.update(!0)
            }, prependSlide: function (e) {
                var t = this;
                if (t.virtual.slides.unshift(e), t.params.virtual.cache) {
                    var i = t.virtual.cache, n = {};
                    Object.keys(i).forEach((function (e) {
                        n[e + 1] = i[e]
                    })), t.virtual.cache = n
                }
                t.virtual.update(!0), t.slideNext(0)
            }
        }, F = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    virtual: {
                        update: D.update.bind(e),
                        appendSlide: D.appendSlide.bind(e),
                        prependSlide: D.prependSlide.bind(e),
                        renderSlide: D.renderSlide.bind(e),
                        slides: e.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {watchSlidesProgress: !0};
                        d.extend(e.params, t), d.extend(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                    }
                }, setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        }, H = {
            handle: function (i) {
                var n = this, a = n.rtlTranslate, o = i;
                o.originalEvent && (o = o.originalEvent);
                var s = o.keyCode || o.charCode;
                if (!n.allowSlideNext && (n.isHorizontal() && 39 === s || n.isVertical() && 40 === s)) return !1;
                if (!n.allowSlidePrev && (n.isHorizontal() && 37 === s || n.isVertical() && 38 === s)) return !1;
                if (!(o.shiftKey || o.altKey || o.ctrlKey || o.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (n.params.keyboard.onlyInViewport && (37 === s || 39 === s || 38 === s || 40 === s)) {
                        var r = !1;
                        if (0 < n.$el.parents("." + n.params.slideClass).length && 0 === n.$el.parents("." + n.params.slideActiveClass).length) return;
                        var l = t.innerWidth, d = t.innerHeight, c = n.$el.offset();
                        a && (c.left -= n.$el[0].scrollLeft);
                        for (var p = [[c.left, c.top], [c.left + n.width, c.top], [c.left, c.top + n.height], [c.left + n.width, c.top + n.height]], u = 0; u < p.length; u += 1) {
                            var h = p[u];
                            0 <= h[0] && h[0] <= l && 0 <= h[1] && h[1] <= d && (r = !0)
                        }
                        if (!r) return
                    }
                    n.isHorizontal() ? (37 !== s && 39 !== s || (o.preventDefault ? o.preventDefault() : o.returnValue = !1), (39 === s && !a || 37 === s && a) && n.slideNext(), (37 === s && !a || 39 === s && a) && n.slidePrev()) : (38 !== s && 40 !== s || (o.preventDefault ? o.preventDefault() : o.returnValue = !1), 40 === s && n.slideNext(), 38 === s && n.slidePrev()), n.emit("keyPress", s)
                }
            }, enable: function () {
                this.keyboard.enabled || (n(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            }, disable: function () {
                this.keyboard.enabled && (n(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        }, B = {
            name: "keyboard", params: {keyboard: {enabled: !1, onlyInViewport: !0}}, create: function () {
                d.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: H.enable.bind(this),
                        disable: H.disable.bind(this),
                        handle: H.handle.bind(this)
                    }
                })
            }, on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable()
                }, destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        }, Y = {
            lastScrollTime: d.now(),
            event: -1 < t.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
                var t = "onwheel", i = t in e;
                if (!i) {
                    var n = e.createElement("div");
                    n.setAttribute(t, "return;"), i = "function" == typeof n[t]
                }
                return !i && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (i = e.implementation.hasFeature("Events.wheel", "3.0")), i
            }() ? "wheel" : "mousewheel",
            normalize: function (e) {
                var t = 0, i = 0, n = 0, a = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || a) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, a *= 40) : (n *= 800, a *= 800)), n && !t && (t = n < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: n,
                    pixelY: a
                }
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1
            },
            handle: function (e) {
                var i = e, n = this, a = n.params.mousewheel;
                if (!n.mouseEntered && !a.releaseOnEdges) return !0;
                i.originalEvent && (i = i.originalEvent);
                var o = 0, s = n.rtlTranslate ? -1 : 1, r = Y.normalize(i);
                if (a.forceToAxis) if (n.isHorizontal()) {
                    if (!(Math.abs(r.pixelX) > Math.abs(r.pixelY))) return !0;
                    o = r.pixelX * s
                } else {
                    if (!(Math.abs(r.pixelY) > Math.abs(r.pixelX))) return !0;
                    o = r.pixelY
                } else o = Math.abs(r.pixelX) > Math.abs(r.pixelY) ? -r.pixelX * s : -r.pixelY;
                if (0 === o) return !0;
                if (a.invert && (o = -o), n.params.freeMode) {
                    n.params.loop && n.loopFix();
                    var l = n.getTranslate() + o * a.sensitivity, c = n.isBeginning, p = n.isEnd;
                    if (l >= n.minTranslate() && (l = n.minTranslate()), l <= n.maxTranslate() && (l = n.maxTranslate()), n.setTransition(0), n.setTranslate(l), n.updateProgress(), n.updateActiveIndex(), n.updateSlidesClasses(), (!c && n.isBeginning || !p && n.isEnd) && n.updateSlidesClasses(), n.params.freeModeSticky && (clearTimeout(n.mousewheel.timeout), n.mousewheel.timeout = d.nextTick((function () {
                            n.slideToClosest()
                        }), 300)), n.emit("scroll", i), n.params.autoplay && n.params.autoplayDisableOnInteraction && n.autoplay.stop(), l === n.minTranslate() || l === n.maxTranslate()) return !0
                } else {
                    if (60 < d.now() - n.mousewheel.lastScrollTime) if (o < 0) if (n.isEnd && !n.params.loop || n.animating) {
                        if (a.releaseOnEdges) return !0
                    } else n.slideNext(), n.emit("scroll", i); else if (n.isBeginning && !n.params.loop || n.animating) {
                        if (a.releaseOnEdges) return !0
                    } else n.slidePrev(), n.emit("scroll", i);
                    n.mousewheel.lastScrollTime = (new t.Date).getTime()
                }
                return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
            },
            enable: function () {
                var e = this;
                if (!Y.event) return !1;
                if (e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = n(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(Y.event, e.mousewheel.handle), e.mousewheel.enabled = !0
            },
            disable: function () {
                var e = this;
                if (!Y.event) return !1;
                if (!e.mousewheel.enabled) return !1;
                var t = e.$el;
                return "container" !== e.params.mousewheel.eventsTarged && (t = n(e.params.mousewheel.eventsTarged)), t.off(Y.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1)
            }
        }, X = {
            update: function () {
                var e = this, t = e.params.navigation;
                if (!e.params.loop) {
                    var i = e.navigation, n = i.$nextEl, a = i.$prevEl;
                    a && 0 < a.length && (e.isBeginning ? a.addClass(t.disabledClass) : a.removeClass(t.disabledClass), a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), n && 0 < n.length && (e.isEnd ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            }, onPrevClick: function (e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            }, onNextClick: function (e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            }, init: function () {
                var e, t, i = this, a = i.params.navigation;
                (a.nextEl || a.prevEl) && (a.nextEl && (e = n(a.nextEl), i.params.uniqueNavElements && "string" == typeof a.nextEl && 1 < e.length && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))), a.prevEl && (t = n(a.prevEl), i.params.uniqueNavElements && "string" == typeof a.prevEl && 1 < t.length && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))), e && 0 < e.length && e.on("click", i.navigation.onNextClick), t && 0 < t.length && t.on("click", i.navigation.onPrevClick), d.extend(i.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            }, destroy: function () {
                var e = this, t = e.navigation, i = t.$nextEl, n = t.$prevEl;
                i && i.length && (i.off("click", e.navigation.onNextClick), i.removeClass(e.params.navigation.disabledClass)), n && n.length && (n.off("click", e.navigation.onPrevClick), n.removeClass(e.params.navigation.disabledClass))
            }
        }, j = {
            update: function () {
                var e = this, t = e.rtl, i = e.params.pagination;
                if (i.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a, o = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        s = e.pagination.$el,
                        r = e.params.loop ? Math.ceil((o - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((a = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > o - 1 - 2 * e.loopedSlides && (a -= o - 2 * e.loopedSlides), r - 1 < a && (a -= r), a < 0 && "bullets" !== e.params.paginationType && (a = r + a)) : a = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === i.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                        var l, d, c, p = e.pagination.bullets;
                        if (i.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), s.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (i.dynamicMainBullets + 4) + "px"), 1 < i.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += a - e.previousIndex, e.pagination.dynamicBulletIndex > i.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = i.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), l = a - e.pagination.dynamicBulletIndex, c = ((d = l + (Math.min(p.length, i.dynamicMainBullets) - 1)) + l) / 2), p.removeClass(i.bulletActiveClass + " " + i.bulletActiveClass + "-next " + i.bulletActiveClass + "-next-next " + i.bulletActiveClass + "-prev " + i.bulletActiveClass + "-prev-prev " + i.bulletActiveClass + "-main"), 1 < s.length) p.each((function (e, t) {
                            var o = n(t), s = o.index();
                            s === a && o.addClass(i.bulletActiveClass), i.dynamicBullets && (l <= s && s <= d && o.addClass(i.bulletActiveClass + "-main"), s === l && o.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), s === d && o.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next"))
                        })); else if (p.eq(a).addClass(i.bulletActiveClass), i.dynamicBullets) {
                            for (var u = p.eq(l), h = p.eq(d), f = l; f <= d; f += 1) p.eq(f).addClass(i.bulletActiveClass + "-main");
                            u.prev().addClass(i.bulletActiveClass + "-prev").prev().addClass(i.bulletActiveClass + "-prev-prev"), h.next().addClass(i.bulletActiveClass + "-next").next().addClass(i.bulletActiveClass + "-next-next")
                        }
                        if (i.dynamicBullets) {
                            var m = Math.min(p.length, i.dynamicMainBullets + 4),
                                v = (e.pagination.bulletSize * m - e.pagination.bulletSize) / 2 - c * e.pagination.bulletSize,
                                g = t ? "right" : "left";
                            p.css(e.isHorizontal() ? g : "top", v + "px")
                        }
                    }
                    if ("fraction" === i.type && (s.find("." + i.currentClass).text(i.formatFractionCurrent(a + 1)), s.find("." + i.totalClass).text(i.formatFractionTotal(r))), "progressbar" === i.type) {
                        var b;
                        b = i.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var y = (a + 1) / r, w = 1, x = 1;
                        "horizontal" === b ? w = y : x = y, s.find("." + i.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + x + ")").transition(e.params.speed)
                    }
                    "custom" === i.type && i.renderCustom ? (s.html(i.renderCustom(e, a + 1, r)), e.emit("paginationRender", e, s[0])) : e.emit("paginationUpdate", e, s[0]), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](i.lockClass)
                }
            }, render: function () {
                var e = this, t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        n = e.pagination.$el, a = "";
                    if ("bullets" === t.type) {
                        for (var o = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, s = 0; s < o; s += 1) t.renderBullet ? a += t.renderBullet.call(e, s, t.bulletClass) : a += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        n.html(a), e.pagination.bullets = n.find("." + t.bulletClass)
                    }
                    "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', n.html(a)), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', n.html(a)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            }, init: function () {
                var e = this, t = e.params.pagination;
                if (t.el) {
                    var i = n(t.el);
                    0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && 1 < i.length && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, (function (t) {
                        t.preventDefault();
                        var i = n(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                    })), d.extend(e.pagination, {$el: i, el: i[0]}))
                }
            }, destroy: function () {
                var e = this, t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i = e.pagination.$el;
                    i.removeClass(t.hiddenClass), i.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && i.off("click", "." + t.bulletClass)
                }
            }
        }, N = {
            setTranslate: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar, i = e.rtlTranslate, n = e.progress, a = t.dragSize, o = t.trackSize, s = t.$dragEl,
                        r = t.$el, l = e.params.scrollbar, d = a, p = (o - a) * n;
                    i ? 0 < (p = -p) ? (d = a - p, p = 0) : o < -p + a && (d = o + p) : p < 0 ? (d = a + p, p = 0) : o < p + a && (d = o - p), e.isHorizontal() ? (c.transforms3d ? s.transform("translate3d(" + p + "px, 0, 0)") : s.transform("translateX(" + p + "px)"), s[0].style.width = d + "px") : (c.transforms3d ? s.transform("translate3d(0px, " + p + "px, 0)") : s.transform("translateY(" + p + "px)"), s[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), r[0].style.opacity = 1, e.scrollbar.timeout = setTimeout((function () {
                        r[0].style.opacity = 0, r.transition(400)
                    }), 1e3))
                }
            }, setTransition: function (e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            }, updateSize: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar, i = t.$dragEl, n = t.$el;
                    i[0].style.width = "", i[0].style.height = "";
                    var a, o = e.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight, s = e.size / e.virtualSize,
                        r = s * (o / e.size);
                    a = "auto" === e.params.scrollbar.dragSize ? o * s : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? i[0].style.width = a + "px" : i[0].style.height = a + "px", n[0].style.display = 1 <= s ? "none" : "", e.params.scrollbarHide && (n[0].style.opacity = 0), d.extend(t, {
                        trackSize: o,
                        divider: s,
                        moveDivider: r,
                        dragSize: a
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            }, setDragPosition: function (e) {
                var t, i = this, n = i.scrollbar, a = i.rtlTranslate, o = n.$el, s = n.dragSize, r = n.trackSize;
                t = ((i.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - o.offset()[i.isHorizontal() ? "left" : "top"] - s / 2) / (r - s), t = Math.max(Math.min(t, 1), 0), a && (t = 1 - t);
                var l = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
                i.updateProgress(l), i.setTranslate(l), i.updateActiveIndex(), i.updateSlidesClasses()
            }, onDragStart: function (e) {
                var t = this, i = t.params.scrollbar, n = t.scrollbar, a = t.$wrapperEl, o = n.$el, s = n.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.transition(100), s.transition(100), n.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), o.transition(0), i.hide && o.css("opacity", 1), t.emit("scrollbarDragStart", e)
            }, onDragMove: function (e) {
                var t = this.scrollbar, i = this.$wrapperEl, n = t.$el, a = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), n.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
            }, onDragEnd: function (e) {
                var t = this, i = t.params.scrollbar, n = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = d.nextTick((function () {
                    n.css("opacity", 0), n.transition(400)
                }), 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest())
            }, enableDraggable: function () {
                var t = this;
                if (t.params.scrollbar.el) {
                    var i = t.scrollbar, n = t.touchEventsTouch, a = t.touchEventsDesktop, o = t.params, s = i.$el[0],
                        r = !(!c.passiveListener || !o.passiveListeners) && {passive: !1, capture: !1},
                        l = !(!c.passiveListener || !o.passiveListeners) && {passive: !0, capture: !1};
                    c.touch ? (s.addEventListener(n.start, t.scrollbar.onDragStart, r), s.addEventListener(n.move, t.scrollbar.onDragMove, r), s.addEventListener(n.end, t.scrollbar.onDragEnd, l)) : (s.addEventListener(a.start, t.scrollbar.onDragStart, r), e.addEventListener(a.move, t.scrollbar.onDragMove, r), e.addEventListener(a.end, t.scrollbar.onDragEnd, l))
                }
            }, disableDraggable: function () {
                var t = this;
                if (t.params.scrollbar.el) {
                    var i = t.scrollbar, n = t.touchEventsTouch, a = t.touchEventsDesktop, o = t.params, s = i.$el[0],
                        r = !(!c.passiveListener || !o.passiveListeners) && {passive: !1, capture: !1},
                        l = !(!c.passiveListener || !o.passiveListeners) && {passive: !0, capture: !1};
                    c.touch ? (s.removeEventListener(n.start, t.scrollbar.onDragStart, r), s.removeEventListener(n.move, t.scrollbar.onDragMove, r), s.removeEventListener(n.end, t.scrollbar.onDragEnd, l)) : (s.removeEventListener(a.start, t.scrollbar.onDragStart, r), e.removeEventListener(a.move, t.scrollbar.onDragMove, r), e.removeEventListener(a.end, t.scrollbar.onDragEnd, l))
                }
            }, init: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar, i = e.$el, a = e.params.scrollbar, o = n(a.el);
                    e.params.uniqueNavElements && "string" == typeof a.el && 1 < o.length && 1 === i.find(a.el).length && (o = i.find(a.el));
                    var s = o.find("." + e.params.scrollbar.dragClass);
                    0 === s.length && (s = n('<div class="' + e.params.scrollbar.dragClass + '"></div>'), o.append(s)), d.extend(t, {
                        $el: o,
                        el: o[0],
                        $dragEl: s,
                        dragEl: s[0]
                    }), a.draggable && t.enableDraggable()
                }
            }, destroy: function () {
                this.scrollbar.disableDraggable()
            }
        }, R = {
            setTransform: function (e, t) {
                var i = this.rtl, a = n(e), o = i ? -1 : 1, s = a.attr("data-swiper-parallax") || "0",
                    r = a.attr("data-swiper-parallax-x"), l = a.attr("data-swiper-parallax-y"),
                    d = a.attr("data-swiper-parallax-scale"), c = a.attr("data-swiper-parallax-opacity");
                if (r || l ? (r = r || "0", l = l || "0") : this.isHorizontal() ? (r = s, l = "0") : (l = s, r = "0"), r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t * o + "%" : r * t * o + "px", l = 0 <= l.indexOf("%") ? parseInt(l, 10) * t + "%" : l * t + "px", null != c) {
                    var p = c - (c - 1) * (1 - Math.abs(t));
                    a[0].style.opacity = p
                }
                if (null == d) a.transform("translate3d(" + r + ", " + l + ", 0px)"); else {
                    var u = d - (d - 1) * (1 - Math.abs(t));
                    a.transform("translate3d(" + r + ", " + l + ", 0px) scale(" + u + ")")
                }
            }, setTranslate: function () {
                var e = this, t = e.$el, i = e.slides, a = e.progress, o = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each((function (t, i) {
                    e.parallax.setTransform(i, a)
                })), i.each((function (t, i) {
                    var s = i.progress;
                    1 < e.params.slidesPerGroup && "auto" !== e.params.slidesPerView && (s += Math.ceil(t / 2) - a * (o.length - 1)), s = Math.min(Math.max(s, -1), 1), n(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each((function (t, i) {
                        e.parallax.setTransform(i, s)
                    }))
                }))
            }, setTransition: function (e) {
                void 0 === e && (e = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each((function (t, i) {
                    var a = n(i), o = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (o = 0), a.transition(o)
                }))
            }
        }, V = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX,
                    a = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(n - t, 2) + Math.pow(a - i, 2))
            }, onGestureStart: function (e) {
                var t = this, i = t.params.zoom, a = t.zoom, o = a.gesture;
                if (a.fakeGestureTouched = !1, a.fakeGestureMoved = !1, !c.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    a.fakeGestureTouched = !0, o.scaleStart = V.getDistanceBetweenTouches(e)
                }
                o.$slideEl && o.$slideEl.length || (o.$slideEl = n(e.target).closest(".swiper-slide"), 0 === o.$slideEl.length && (o.$slideEl = t.slides.eq(t.activeIndex)), o.$imageEl = o.$slideEl.find("img, svg, canvas"), o.$imageWrapEl = o.$imageEl.parent("." + i.containerClass), o.maxRatio = o.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== o.$imageWrapEl.length) ? (o.$imageEl.transition(0), t.zoom.isScaling = !0) : o.$imageEl = void 0
            }, onGestureChange: function (e) {
                var t = this.params.zoom, i = this.zoom, n = i.gesture;
                if (!c.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, n.scaleMove = V.getDistanceBetweenTouches(e)
                }
                n.$imageEl && 0 !== n.$imageEl.length && (i.scale = c.gestures ? e.scale * i.currentScale : n.scaleMove / n.scaleStart * i.currentScale, i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            }, onGestureEnd: function (e) {
                var t = this.params.zoom, i = this.zoom, n = i.gesture;
                if (!c.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !y.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0))
            }, onTouchStart: function (e) {
                var t = this.zoom, i = t.gesture, n = t.image;
                i.$imageEl && 0 !== i.$imageEl.length && (n.isTouched || (y.android && e.preventDefault(), n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }, onTouchMove: function (e) {
                var t = this, i = t.zoom, n = i.gesture, a = i.image, o = i.velocity;
                if (n.$imageEl && 0 !== n.$imageEl.length && (t.allowClick = !1, a.isTouched && n.$slideEl)) {
                    a.isMoved || (a.width = n.$imageEl[0].offsetWidth, a.height = n.$imageEl[0].offsetHeight, a.startX = d.getTranslate(n.$imageWrapEl[0], "x") || 0, a.startY = d.getTranslate(n.$imageWrapEl[0], "y") || 0, n.slideWidth = n.$slideEl[0].offsetWidth, n.slideHeight = n.$slideEl[0].offsetHeight, n.$imageWrapEl.transition(0), t.rtl && (a.startX = -a.startX, a.startY = -a.startY));
                    var s = a.width * i.scale, r = a.height * i.scale;
                    if (!(s < n.slideWidth && r < n.slideHeight)) {
                        if (a.minX = Math.min(n.slideWidth / 2 - s / 2, 0), a.maxX = -a.minX, a.minY = Math.min(n.slideHeight / 2 - r / 2, 0), a.maxY = -a.minY, a.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.isMoved && !i.isScaling) {
                            if (t.isHorizontal() && (Math.floor(a.minX) === Math.floor(a.startX) && a.touchesCurrent.x < a.touchesStart.x || Math.floor(a.maxX) === Math.floor(a.startX) && a.touchesCurrent.x > a.touchesStart.x)) return void(a.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(a.minY) === Math.floor(a.startY) && a.touchesCurrent.y < a.touchesStart.y || Math.floor(a.maxY) === Math.floor(a.startY) && a.touchesCurrent.y > a.touchesStart.y)) return void(a.isTouched = !1)
                        }
                        e.preventDefault(), e.stopPropagation(), a.isMoved = !0, a.currentX = a.touchesCurrent.x - a.touchesStart.x + a.startX, a.currentY = a.touchesCurrent.y - a.touchesStart.y + a.startY, a.currentX < a.minX && (a.currentX = a.minX + 1 - Math.pow(a.minX - a.currentX + 1, .8)), a.currentX > a.maxX && (a.currentX = a.maxX - 1 + Math.pow(a.currentX - a.maxX + 1, .8)), a.currentY < a.minY && (a.currentY = a.minY + 1 - Math.pow(a.minY - a.currentY + 1, .8)), a.currentY > a.maxY && (a.currentY = a.maxY - 1 + Math.pow(a.currentY - a.maxY + 1, .8)), o.prevPositionX || (o.prevPositionX = a.touchesCurrent.x), o.prevPositionY || (o.prevPositionY = a.touchesCurrent.y), o.prevTime || (o.prevTime = Date.now()), o.x = (a.touchesCurrent.x - o.prevPositionX) / (Date.now() - o.prevTime) / 2, o.y = (a.touchesCurrent.y - o.prevPositionY) / (Date.now() - o.prevTime) / 2, Math.abs(a.touchesCurrent.x - o.prevPositionX) < 2 && (o.x = 0), Math.abs(a.touchesCurrent.y - o.prevPositionY) < 2 && (o.y = 0), o.prevPositionX = a.touchesCurrent.x, o.prevPositionY = a.touchesCurrent.y, o.prevTime = Date.now(), n.$imageWrapEl.transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                    }
                }
            }, onTouchEnd: function () {
                var e = this.zoom, t = e.gesture, i = e.image, n = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var a = 300, o = 300, s = n.x * a, r = i.currentX + s, l = n.y * o, d = i.currentY + l;
                    0 !== n.x && (a = Math.abs((r - i.currentX) / n.x)), 0 !== n.y && (o = Math.abs((d - i.currentY) / n.y));
                    var c = Math.max(a, o);
                    i.currentX = r, i.currentY = d;
                    var p = i.width * e.scale, u = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - u / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(c).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            }, onTransitionEnd: function () {
                var e = this.zoom, t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            }, toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            }, in: function (e) {
                var t, i, a, o, s, r, l, d, c, p, u, h, f, m, v, g, b = this, y = b.zoom, w = b.params.zoom, x = y.gesture,
                    S = y.image;
                x.$slideEl || (x.$slideEl = b.clickedSlide ? n(b.clickedSlide) : b.slides.eq(b.activeIndex), x.$imageEl = x.$slideEl.find("img, svg, canvas"), x.$imageWrapEl = x.$imageEl.parent("." + w.containerClass)), x.$imageEl && 0 !== x.$imageEl.length && (x.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === S.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = S.touchesStart.x, i = S.touchesStart.y), y.scale = x.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, y.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (v = x.$slideEl[0].offsetWidth, g = x.$slideEl[0].offsetHeight, a = x.$slideEl.offset().left + v / 2 - t, o = x.$slideEl.offset().top + g / 2 - i, l = x.$imageEl[0].offsetWidth, d = x.$imageEl[0].offsetHeight, c = l * y.scale, p = d * y.scale, f = -(u = Math.min(v / 2 - c / 2, 0)), m = -(h = Math.min(g / 2 - p / 2, 0)), (s = a * y.scale) < u && (s = u), f < s && (s = f), (r = o * y.scale) < h && (r = h), m < r && (r = m)) : r = s = 0, x.$imageWrapEl.transition(300).transform("translate3d(" + s + "px, " + r + "px,0)"), x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")"))
            }, out: function () {
                var e = this, t = e.zoom, i = e.params.zoom, a = t.gesture;
                a.$slideEl || (a.$slideEl = e.clickedSlide ? n(e.clickedSlide) : e.slides.eq(e.activeIndex), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass)), a.$imageEl && 0 !== a.$imageEl.length && (t.scale = 1, t.currentScale = 1, a.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), a.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), a.$slideEl.removeClass("" + i.zoomedSlideClass), a.$slideEl = void 0)
            }, enable: function () {
                var e = this, t = e.zoom;
                if (!t.enabled) {
                    t.enabled = !0;
                    var i = !("touchstart" !== e.touchEvents.start || !c.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    c.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }, disable: function () {
                var e = this, t = e.zoom;
                if (t.enabled) {
                    e.zoom.enabled = !1;
                    var i = !("touchstart" !== e.touchEvents.start || !c.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    c.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove)
                }
            }
        }, _ = {
            loadInSlide: function (e, t) {
                void 0 === t && (t = !0);
                var i = this, a = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var o = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        s = o.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                    !o.hasClass(a.elementClass) || o.hasClass(a.loadedClass) || o.hasClass(a.loadingClass) || (s = s.add(o[0])), 0 !== s.length && s.each((function (e, s) {
                        var r = n(s);
                        r.addClass(a.loadingClass);
                        var l = r.attr("data-background"), d = r.attr("data-src"), c = r.attr("data-srcset"),
                            p = r.attr("data-sizes");
                        i.loadImage(r[0], d || l, c, p, !1, (function () {
                            if (null != i && i && (!i || i.params) && !i.destroyed) {
                                if (l ? (r.css("background-image", 'url("' + l + '")'), r.removeAttr("data-background")) : (c && (r.attr("srcset", c), r.removeAttr("data-srcset")), p && (r.attr("sizes", p), r.removeAttr("data-sizes")), d && (r.attr("src", d), r.removeAttr("data-src"))), r.addClass(a.loadedClass).removeClass(a.loadingClass), o.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                                    var e = o.attr("data-swiper-slide-index");
                                    if (o.hasClass(i.params.slideDuplicateClass)) {
                                        var n = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                        i.lazy.loadInSlide(n.index(), !1)
                                    } else {
                                        var s = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        i.lazy.loadInSlide(s.index(), !1)
                                    }
                                }
                                i.emit("lazyImageReady", o[0], r[0])
                            }
                        })), i.emit("lazyImageLoad", o[0], r[0])
                    }))
                }
            }, load: function () {
                var e = this, t = e.$wrapperEl, i = e.params, a = e.slides, o = e.activeIndex,
                    s = e.virtual && i.virtual.enabled, r = i.lazy, l = i.slidesPerView;

                function d(e) {
                    if (s) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (a[e]) return !0;
                    return !1
                }

                function c(e) {
                    return s ? n(e).attr("data-swiper-slide-index") : n(e).index()
                }

                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function (t, i) {
                    var a = s ? n(i).attr("data-swiper-slide-index") : n(i).index();
                    e.lazy.loadInSlide(a)
                })); else if (1 < l) for (var p = o; p < o + l; p += 1) d(p) && e.lazy.loadInSlide(p); else e.lazy.loadInSlide(o);
                if (r.loadPrevNext) if (1 < l || r.loadPrevNextAmount && 1 < r.loadPrevNextAmount) {
                    for (var u = r.loadPrevNextAmount, h = l, f = Math.min(o + h + Math.max(u, h), a.length), m = Math.max(o - Math.max(h, u), 0), v = o + l; v < f; v += 1) d(v) && e.lazy.loadInSlide(v);
                    for (var g = m; g < o; g += 1) d(g) && e.lazy.loadInSlide(g)
                } else {
                    var b = t.children("." + i.slideNextClass);
                    0 < b.length && e.lazy.loadInSlide(c(b));
                    var y = t.children("." + i.slidePrevClass);
                    0 < y.length && e.lazy.loadInSlide(c(y))
                }
            }
        }, q = {
            LinearSpline: function (e, t) {
                var i, n, a, o, s;
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                    return e ? (s = function (e, t) {
                        for (n = -1, i = e.length; 1 < i - n;) e[a = i + n >> 1] <= t ? n = a : i = a;
                        return i
                    }(this.x, e), o = s - 1, (e - this.x[o]) * (this.y[s] - this.y[o]) / (this.x[s] - this.x[o]) + this.y[o]) : 0
                }, this
            }, getInterpolateFunction: function (e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new q.LinearSpline(t.slidesGrid, e.slidesGrid) : new q.LinearSpline(t.snapGrid, e.snapGrid))
            }, setTranslate: function (e, t) {
                var i, n, a = this, o = a.controller.control;

                function s(e) {
                    var t = a.rtlTranslate ? -a.translate : a.translate;
                    "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), n = -a.controller.spline.interpolate(-t)), n && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), n = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, a), e.updateActiveIndex(), e.updateSlidesClasses()
                }

                if (Array.isArray(o)) for (var r = 0; r < o.length; r += 1) o[r] !== t && o[r] instanceof M && s(o[r]); else o instanceof M && t !== o && s(o)
            }, setTransition: function (e, t) {
                var i, n = this, a = n.controller.control;

                function o(t) {
                    t.setTransition(e, n), 0 !== e && (t.transitionStart(), t.params.autoHeight && d.nextTick((function () {
                        t.updateAutoHeight()
                    })), t.$wrapperEl.transitionEnd((function () {
                        a && (t.params.loop && "slide" === n.params.controller.by && t.loopFix(), t.transitionEnd())
                    })))
                }

                if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof M && o(a[i]); else a instanceof M && t !== a && o(a)
            }
        }, G = {
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e
            }, addElRole: function (e, t) {
                return e.attr("role", t), e
            }, addElLabel: function (e, t) {
                return e.attr("aria-label", t), e
            }, disableEl: function (e) {
                return e.attr("aria-disabled", !0), e
            }, enableEl: function (e) {
                return e.attr("aria-disabled", !1), e
            }, onEnterKey: function (e) {
                var t = this, i = t.params.a11y;
                if (13 === e.keyCode) {
                    var a = n(e.target);
                    t.navigation && t.navigation.$nextEl && a.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), t.navigation && t.navigation.$prevEl && a.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), t.pagination && a.is("." + t.params.pagination.bulletClass) && a[0].click()
                }
            }, notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            }, updateNavigation: function () {
                var e = this;
                if (!e.params.loop) {
                    var t = e.navigation, i = t.$nextEl, n = t.$prevEl;
                    n && 0 < n.length && (e.isBeginning ? e.a11y.disableEl(n) : e.a11y.enableEl(n)), i && 0 < i.length && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i))
                }
            }, updatePagination: function () {
                var e = this, t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (i, a) {
                    var o = n(a);
                    e.a11y.makeElFocusable(o), e.a11y.addElRole(o, "button"), e.a11y.addElLabel(o, t.paginationBulletMessage.replace(/{{index}}/, o.index() + 1))
                }))
            }, init: function () {
                var e = this;
                e.$el.append(e.a11y.liveRegion);
                var t, i, n = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, n.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, n.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
            }, destroy: function () {
                var e, t, i = this;
                i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey)
            }
        }, W = {
            init: function () {
                var e = this;
                if (e.params.history) {
                    if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var i = e.history;
                    i.initialized = !0, i.paths = W.getPathValues(), (i.paths.key || i.paths.value) && (i.scrollToSlide(0, i.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
                }
            }, destroy: function () {
                this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
            }, setHistoryPopState: function () {
                this.history.paths = W.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            }, getPathValues: function () {
                var e = t.location.pathname.slice(1).split("/").filter((function (e) {
                    return "" !== e
                })), i = e.length;
                return {key: e[i - 2], value: e[i - 1]}
            }, setHistory: function (e, i) {
                if (this.history.initialized && this.params.history.enabled) {
                    var n = this.slides.eq(i), a = W.slugify(n.attr("data-history"));
                    t.location.pathname.includes(e) || (a = e + "/" + a);
                    var o = t.history.state;
                    o && o.value === a || (this.params.history.replaceState ? t.history.replaceState({value: a}, null, a) : t.history.pushState({value: a}, null, a))
                }
            }, slugify: function (e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            }, scrollToSlide: function (e, t, i) {
                var n = this;
                if (t) for (var a = 0, o = n.slides.length; a < o; a += 1) {
                    var s = n.slides.eq(a);
                    if (W.slugify(s.attr("data-history")) === t && !s.hasClass(n.params.slideDuplicateClass)) {
                        var r = s.index();
                        n.slideTo(r, e, i)
                    }
                } else n.slideTo(0, e, i)
            }
        }, U = {
            onHashCange: function () {
                var t = this, i = e.location.hash.replace("#", "");
                if (i !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                    var n = t.$wrapperEl.children("." + t.params.slideClass + '[data-hash="' + i + '"]').index();
                    if (void 0 === n) return;
                    t.slideTo(n)
                }
            }, setHash: function () {
                var i = this;
                if (i.hashNavigation.initialized && i.params.hashNavigation.enabled) if (i.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + i.slides.eq(i.activeIndex).attr("data-hash") || ""); else {
                    var n = i.slides.eq(i.activeIndex), a = n.attr("data-hash") || n.attr("data-history");
                    e.location.hash = a || ""
                }
            }, init: function () {
                var i = this;
                if (!(!i.params.hashNavigation.enabled || i.params.history && i.params.history.enabled)) {
                    i.hashNavigation.initialized = !0;
                    var a = e.location.hash.replace("#", "");
                    if (a) for (var o = 0, s = i.slides.length; o < s; o += 1) {
                        var r = i.slides.eq(o);
                        if ((r.attr("data-hash") || r.attr("data-history")) === a && !r.hasClass(i.params.slideDuplicateClass)) {
                            var l = r.index();
                            i.slideTo(l, 0, i.params.runCallbacksOnInit, !0)
                        }
                    }
                    i.params.hashNavigation.watchState && n(t).on("hashchange", i.hashNavigation.onHashCange)
                }
            }, destroy: function () {
                this.params.hashNavigation.watchState && n(t).off("hashchange", this.hashNavigation.onHashCange)
            }
        }, K = {
            run: function () {
                var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = d.nextTick((function () {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                }), i)
            }, start: function () {
                var e = this;
                return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0)
            }, stop: function () {
                var e = this;
                return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0)
            }, pause: function (e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitLionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            }
        }, Q = {
            setTranslate: function () {
                for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
                    var n = e.slides.eq(i), a = -n[0].swiperSlideOffset;
                    e.params.virtualTranslate || (a -= e.translate);
                    var o = 0;
                    e.isHorizontal() || (o = a, a = 0);
                    var s = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(n[0].progress), 0) : 1 + Math.min(Math.max(n[0].progress, -1), 0);
                    n.css({opacity: s}).transform("translate3d(" + a + "px, " + o + "px, 0px)")
                }
            }, setTransition: function (e) {
                var t = this, i = t.slides, n = t.$wrapperEl;
                if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var a = !1;
                    i.transitionEnd((function () {
                        if (!a && t && !t.destroyed) {
                            a = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) n.trigger(e[i])
                        }
                    }))
                }
            }
        }, Z = {
            setTranslate: function () {
                var e, t = this, i = t.$el, a = t.$wrapperEl, o = t.slides, s = t.width, r = t.height, l = t.rtlTranslate,
                    d = t.size, c = t.params.cubeEffect, p = t.isHorizontal(), u = t.virtual && t.params.virtual.enabled,
                    h = 0;
                c.shadow && (p ? (0 === (e = a.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), a.append(e)), e.css({height: s + "px"})) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = n('<div class="swiper-cube-shadow"></div>'), i.append(e)));
                for (var f = 0; f < o.length; f += 1) {
                    var m = o.eq(f), v = f;
                    u && (v = parseInt(m.attr("data-swiper-slide-index"), 10));
                    var g = 90 * v, b = Math.floor(g / 360);
                    l && (g = -g, b = Math.floor(-g / 360));
                    var y = Math.max(Math.min(m[0].progress, 1), -1), w = 0, x = 0, S = 0;
                    v % 4 == 0 ? (w = 4 * -b * d, S = 0) : (v - 1) % 4 == 0 ? (w = 0, S = 4 * -b * d) : (v - 2) % 4 == 0 ? (w = d + 4 * b * d, S = d) : (v - 3) % 4 == 0 && (w = -d, S = 3 * d + 4 * d * b), l && (w = -w), p || (x = w, w = 0);
                    var T = "rotateX(" + (p ? 0 : -g) + "deg) rotateY(" + (p ? g : 0) + "deg) translate3d(" + w + "px, " + x + "px, " + S + "px)";
                    if (y <= 1 && -1 < y && (h = 90 * v + 90 * y, l && (h = 90 * -v - 90 * y)), m.transform(T), c.slideShadows) {
                        var C = p ? m.find(".swiper-slide-shadow-left") : m.find(".swiper-slide-shadow-top"),
                            k = p ? m.find(".swiper-slide-shadow-right") : m.find(".swiper-slide-shadow-bottom");
                        0 === C.length && (C = n('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), m.append(C)), 0 === k.length && (k = n('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), m.append(k)), C.length && (C[0].style.opacity = Math.max(-y, 0)), k.length && (k[0].style.opacity = Math.max(y, 0))
                    }
                }
                if (a.css({
                        "-webkit-transform-origin": "50% 50% -" + d / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + d / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + d / 2 + "px",
                        "transform-origin": "50% 50% -" + d / 2 + "px"
                    }), c.shadow) if (p) e.transform("translate3d(0px, " + (s / 2 + c.shadowOffset) + "px, " + -s / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + c.shadowScale + ")"); else {
                    var P = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                        M = 1.5 - (Math.sin(2 * P * Math.PI / 360) / 2 + Math.cos(2 * P * Math.PI / 360) / 2),
                        $ = c.shadowScale, L = c.shadowScale / M, z = c.shadowOffset;
                    e.transform("scale3d(" + $ + ", 1, " + L + ") translate3d(0px, " + (r / 2 + z) + "px, " + -r / 2 / L + "px) rotateX(-90deg)")
                }
                var I = E.isSafari || E.isUiWebView ? -d / 2 : 0;
                a.transform("translate3d(0px,0," + I + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
            }, setTransition: function (e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        }, J = {
            setTranslate: function () {
                for (var e = this, t = e.slides, i = e.rtlTranslate, a = 0; a < t.length; a += 1) {
                    var o = t.eq(a), s = o[0].progress;
                    e.params.flipEffect.limitRotation && (s = Math.max(Math.min(o[0].progress, 1), -1));
                    var r = -180 * s, l = 0, d = -o[0].swiperSlideOffset, c = 0;
                    if (e.isHorizontal() ? i && (r = -r) : (c = d, l = -r, r = d = 0), o[0].style.zIndex = -Math.abs(Math.round(s)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                            u = e.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = n('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), o.append(p)), 0 === u.length && (u = n('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(u)), p.length && (p[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
                    }
                    o.transform("translate3d(" + d + "px, " + c + "px, 0px) rotateX(" + l + "deg) rotateY(" + r + "deg)")
                }
            }, setTransition: function (e) {
                var t = this, i = t.slides, n = t.activeIndex, a = t.$wrapperEl;
                if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var o = !1;
                    i.eq(n).transitionEnd((function () {
                        if (!o && t && !t.destroyed) {
                            o = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
                        }
                    }))
                }
            }
        }, ee = {
            setTranslate: function () {
                for (var e = this, t = e.width, i = e.height, a = e.slides, o = e.$wrapperEl, s = e.slidesSizesGrid, r = e.params.coverflowEffect, l = e.isHorizontal(), d = e.translate, p = l ? t / 2 - d : i / 2 - d, u = l ? r.rotate : -r.rotate, h = r.depth, f = 0, m = a.length; f < m; f += 1) {
                    var v = a.eq(f), g = s[f], b = (p - v[0].swiperSlideOffset - g / 2) / g * r.modifier, y = l ? u * b : 0,
                        w = l ? 0 : u * b, x = -h * Math.abs(b), S = l ? 0 : r.stretch * b, T = l ? r.stretch * b : 0;
                    Math.abs(T) < .001 && (T = 0), Math.abs(S) < .001 && (S = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(w) < .001 && (w = 0);
                    var E = "translate3d(" + T + "px," + S + "px," + x + "px)  rotateX(" + w + "deg) rotateY(" + y + "deg)";
                    if (v.transform(E), v[0].style.zIndex = 1 - Math.abs(Math.round(b)), r.slideShadows) {
                        var C = l ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            k = l ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === C.length && (C = n('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'), v.append(C)), 0 === k.length && (k = n('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'), v.append(k)), C.length && (C[0].style.opacity = 0 < b ? b : 0), k.length && (k[0].style.opacity = 0 < -b ? -b : 0)
                    }
                }
                (c.pointerEvents || c.prefixedPointerEvents) && (o[0].style.perspectiveOrigin = p + "px 50%")
            }, setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        }, te = {
            init: function () {
                var e = this, t = e.params.thumbs, i = e.constructor;
                t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, d.extend(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), d.extend(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : d.isObject(t.swiper) && (e.thumbs.swiper = new i(d.extend({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick)
            }, onThumbClick: function () {
                var e = this, t = e.thumbs.swiper;
                if (t) {
                    var i = t.clickedIndex, a = t.clickedSlide;
                    if (!(a && n(a).hasClass(e.params.thumbs.slideThumbActiveClass) || null == i)) {
                        var o;
                        if (o = t.params.loop ? parseInt(n(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i, e.params.loop) {
                            var s = e.activeIndex;
                            e.slides.eq(s).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, s = e.activeIndex);
                            var r = e.slides.eq(s).prevAll('[data-swiper-slide-index="' + o + '"]').eq(0).index(),
                                l = e.slides.eq(s).nextAll('[data-swiper-slide-index="' + o + '"]').eq(0).index();
                            o = void 0 === r ? l : void 0 === l ? r : l - s < s - r ? l : r
                        }
                        e.slideTo(o)
                    }
                }
            }, update: function (e) {
                var t = this, i = t.thumbs.swiper;
                if (i) {
                    var n = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
                    if (t.realIndex !== i.realIndex) {
                        var a, o = i.activeIndex;
                        if (i.params.loop) {
                            i.slides.eq(o).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, o = i.activeIndex);
                            var s = i.slides.eq(o).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                r = i.slides.eq(o).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            a = void 0 === s ? r : void 0 === r ? s : r - o == o - s ? o : r - o < o - s ? r : s
                        } else a = t.realIndex;
                        i.visibleSlidesIndexes.indexOf(a) < 0 && (i.params.centeredSlides ? a = o < a ? a - Math.floor(n / 2) + 1 : a + Math.floor(n / 2) - 1 : o < a && (a = a - n + 1), i.slideTo(a, e ? 0 : void 0))
                    }
                    var l = 1, d = t.params.thumbs.slideThumbActiveClass;
                    if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), i.slides.removeClass(d), i.params.loop) for (var c = 0; c < l; c += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + c) + '"]').addClass(d); else for (var p = 0; p < l; p += 1) i.slides.eq(t.realIndex + p).addClass(d)
                }
            }
        }, ie = [$, L, z, I, O, F, B, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    mousewheel: {
                        enabled: !1,
                        enable: Y.enable.bind(e),
                        disable: Y.disable.bind(e),
                        handle: Y.handle.bind(e),
                        handleMouseEnter: Y.handleMouseEnter.bind(e),
                        handleMouseLeave: Y.handleMouseLeave.bind(e),
                        lastScrollTime: d.now()
                    }
                })
            },
            on: {
                init: function () {
                    this.params.mousewheel.enabled && this.mousewheel.enable()
                }, destroy: function () {
                    this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    navigation: {
                        init: X.init.bind(e),
                        update: X.update.bind(e),
                        destroy: X.destroy.bind(e),
                        onNextClick: X.onNextClick.bind(e),
                        onPrevClick: X.onPrevClick.bind(e)
                    }
                })
            },
            on: {
                init: function () {
                    this.navigation.init(), this.navigation.update()
                }, toEdge: function () {
                    this.navigation.update()
                }, fromEdge: function () {
                    this.navigation.update()
                }, destroy: function () {
                    this.navigation.destroy()
                }, click: function (e) {
                    var t = this.navigation, i = t.$nextEl, a = t.$prevEl;
                    !this.params.navigation.hideOnClick || n(e.target).is(a) || n(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function (e) {
                        return e
                    },
                    formatFractionTotal: function (e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    pagination: {
                        init: j.init.bind(e),
                        render: j.render.bind(e),
                        update: j.update.bind(e),
                        destroy: j.destroy.bind(e),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function () {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                }, activeIndexChange: function () {
                    (this.params.loop || void 0 === this.snapIndex) && this.pagination.update()
                }, snapIndexChange: function () {
                    this.params.loop || this.pagination.update()
                }, slidesLengthChange: function () {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                }, snapGridLengthChange: function () {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                }, destroy: function () {
                    this.pagination.destroy()
                }, click: function (e) {
                    var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !n(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass)
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    scrollbar: {
                        init: N.init.bind(e),
                        destroy: N.destroy.bind(e),
                        updateSize: N.updateSize.bind(e),
                        setTranslate: N.setTranslate.bind(e),
                        setTransition: N.setTransition.bind(e),
                        enableDraggable: N.enableDraggable.bind(e),
                        disableDraggable: N.disableDraggable.bind(e),
                        setDragPosition: N.setDragPosition.bind(e),
                        onDragStart: N.onDragStart.bind(e),
                        onDragMove: N.onDragMove.bind(e),
                        onDragEnd: N.onDragEnd.bind(e),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function () {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                }, update: function () {
                    this.scrollbar.updateSize()
                }, resize: function () {
                    this.scrollbar.updateSize()
                }, observerUpdate: function () {
                    this.scrollbar.updateSize()
                }, setTranslate: function () {
                    this.scrollbar.setTranslate()
                }, setTransition: function (e) {
                    this.scrollbar.setTransition(e)
                }, destroy: function () {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax", params: {parallax: {enabled: !1}}, create: function () {
                d.extend(this, {
                    parallax: {
                        setTransform: R.setTransform.bind(this),
                        setTranslate: R.setTranslate.bind(this),
                        setTransition: R.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                }, init: function () {
                    this.params.parallax && this.parallax.setTranslate()
                }, setTranslate: function () {
                    this.params.parallax && this.parallax.setTranslate()
                }, setTransition: function (e) {
                    this.params.parallax && this.parallax.setTransition(e)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function () {
                var e = this, t = {
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0}
                };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function (i) {
                    t[i] = V[i].bind(e)
                })), d.extend(e, {zoom: t});
                var i = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function () {
                        return i
                    }, set: function (t) {
                        if (i !== t) {
                            var n = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, n, a)
                        }
                        i = t
                    }
                })
            },
            on: {
                init: function () {
                    this.params.zoom.enabled && this.zoom.enable()
                }, destroy: function () {
                    this.zoom.disable()
                }, touchStart: function (e) {
                    this.zoom.enabled && this.zoom.onTouchStart(e)
                }, touchEnd: function (e) {
                    this.zoom.enabled && this.zoom.onTouchEnd(e)
                }, doubleTap: function (e) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                }, transitionEnd: function () {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function () {
                d.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: _.load.bind(this),
                        loadInSlide: _.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                }, init: function () {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                }, scroll: function () {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                }, resize: function () {
                    this.params.lazy.enabled && this.lazy.load()
                }, scrollbarDragMove: function () {
                    this.params.lazy.enabled && this.lazy.load()
                }, transitionStart: function () {
                    var e = this;
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                }, transitionEnd: function () {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                }
            }
        }, {
            name: "controller", params: {controller: {control: void 0, inverse: !1, by: "slide"}}, create: function () {
                var e = this;
                d.extend(e, {
                    controller: {
                        control: e.params.controller.control,
                        getInterpolateFunction: q.getInterpolateFunction.bind(e),
                        setTranslate: q.setTranslate.bind(e),
                        setTransition: q.setTransition.bind(e)
                    }
                })
            }, on: {
                update: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, resize: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, observerUpdate: function () {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                }, setTranslate: function (e, t) {
                    this.controller.control && this.controller.setTranslate(e, t)
                }, setTransition: function (e, t) {
                    this.controller.control && this.controller.setTransition(e, t)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {a11y: {liveRegion: n('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')}}), Object.keys(G).forEach((function (t) {
                    e.a11y[t] = G[t].bind(e)
                }))
            },
            on: {
                init: function () {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                }, toEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                }, fromEdge: function () {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                }, paginationUpdate: function () {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                }, destroy: function () {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history", params: {history: {enabled: !1, replaceState: !1, key: "slides"}}, create: function () {
                var e = this;
                d.extend(e, {
                    history: {
                        init: W.init.bind(e),
                        setHistory: W.setHistory.bind(e),
                        setHistoryPopState: W.setHistoryPopState.bind(e),
                        scrollToSlide: W.scrollToSlide.bind(e),
                        destroy: W.destroy.bind(e)
                    }
                })
            }, on: {
                init: function () {
                    this.params.history.enabled && this.history.init()
                }, destroy: function () {
                    this.params.history.enabled && this.history.destroy()
                }, transitionEnd: function () {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {hashNavigation: {enabled: !1, replaceState: !1, watchState: !1}},
            create: function () {
                var e = this;
                d.extend(e, {
                    hashNavigation: {
                        initialized: !1,
                        init: U.init.bind(e),
                        destroy: U.destroy.bind(e),
                        setHash: U.setHash.bind(e),
                        onHashCange: U.onHashCange.bind(e)
                    }
                })
            },
            on: {
                init: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                }, destroy: function () {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                }, transitionEnd: function () {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function () {
                var e = this;
                d.extend(e, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: K.run.bind(e),
                        start: K.start.bind(e),
                        stop: K.stop.bind(e),
                        pause: K.pause.bind(e),
                        onTransitionEnd: function (t) {
                            e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function () {
                    this.params.autoplay.enabled && this.autoplay.start()
                }, beforeTransitionStart: function (e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                }, sliderFirstMove: function () {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                }, destroy: function () {
                    this.autoplay.running && this.autoplay.stop()
                }
            }
        }, {
            name: "effect-fade", params: {fadeEffect: {crossFade: !1}}, create: function () {
                d.extend(this, {
                    fadeEffect: {
                        setTranslate: Q.setTranslate.bind(this),
                        setTransition: Q.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    var e = this;
                    if ("fade" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        d.extend(e.params, t), d.extend(e.originalParams, t)
                    }
                }, setTranslate: function () {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                }, setTransition: function (e) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-cube",
            params: {cubeEffect: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94}},
            create: function () {
                d.extend(this, {
                    cubeEffect: {
                        setTranslate: Z.setTranslate.bind(this),
                        setTransition: Z.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    if ("cube" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        d.extend(e.params, t), d.extend(e.originalParams, t)
                    }
                }, setTranslate: function () {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                }, setTransition: function (e) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-flip", params: {flipEffect: {slideShadows: !0, limitRotation: !0}}, create: function () {
                d.extend(this, {
                    flipEffect: {
                        setTranslate: J.setTranslate.bind(this),
                        setTransition: J.setTransition.bind(this)
                    }
                })
            }, on: {
                beforeInit: function () {
                    var e = this;
                    if ("flip" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        d.extend(e.params, t), d.extend(e.originalParams, t)
                    }
                }, setTranslate: function () {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                }, setTransition: function (e) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {coverflowEffect: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0}},
            create: function () {
                d.extend(this, {
                    coverflowEffect: {
                        setTranslate: ee.setTranslate.bind(this),
                        setTransition: ee.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this;
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                }, setTranslate: function () {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                }, setTransition: function (e) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    swiper: null,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function () {
                d.extend(this, {
                    thumbs: {
                        swiper: null,
                        init: te.init.bind(this),
                        update: te.update.bind(this),
                        onThumbClick: te.onThumbClick.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function () {
                    var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
                }, slideChange: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, update: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, resize: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, observerUpdate: function () {
                    this.thumbs.swiper && this.thumbs.update()
                }, setTransition: function (e) {
                    var t = this.thumbs.swiper;
                    t && t.setTransition(e)
                }, beforeDestroy: function () {
                    var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy()
                }
            }
        }];
    return void 0 === M.use && (M.use = M.Class.use, M.installModule = M.Class.installModule), M.use(ie), M
})), function (e) {
    "use strict";
    var t = "starRating", i = function () {
    }, n = {
        totalStars: 5,
        useFullStars: !1,
        starShape: "straight",
        emptyColor: "lightgray",
        hoverColor: "orange",
        activeColor: "gold",
        ratedColor: "crimson",
        useGradient: !0,
        readOnly: !1,
        disableAfterRate: !0,
        baseUrl: !1,
        starGradient: {start: "#FEF7CD", end: "#FF9511"},
        strokeWidth: 4,
        strokeColor: "black",
        initialRating: 0,
        starSize: 40,
        callback: i,
        onHover: i,
        onLeave: i
    }, a = function (i, a) {
        var o, s;
        this.element = i, this.$el = e(i), this.settings = e.extend({}, n, a), o = this.$el.data("rating") || this.settings.initialRating, s = ((this.settings.forceRoundUp ? Math.ceil : Math.round)(2 * o) / 2).toFixed(1), this._state = {rating: s}, this._uid = Math.floor(999 * Math.random()), a.starGradient || this.settings.useGradient || (this.settings.starGradient.start = this.settings.starGradient.end = this.settings.activeColor), this._defaults = n, this._name = t, this.init()
    }, o = {
        init: function () {
            this.renderMarkup(), this.addListeners(), this.initRating()
        }, addListeners: function () {
            this.settings.readOnly || (this.$stars.on("mouseover", this.hoverRating.bind(this)), this.$stars.on("mouseout", this.restoreState.bind(this)), this.$stars.on("click", this.handleRating.bind(this)))
        }, hoverRating: function (e) {
            var t = this.getIndex(e);
            this.paintStars(t, "hovered"), this.settings.onHover(t + 1, this._state.rating, this.$el)
        }, handleRating: function (e) {
            var t = this.getIndex(e) + 1;
            this.applyRating(t, this.$el), this.executeCallback(t, this.$el), this.settings.disableAfterRate && this.$stars.off()
        }, applyRating: function (e) {
            var t = e - 1;
            this.paintStars(t, "rated"), this._state.rating = t + 1, this._state.rated = !0
        }, restoreState: function (e) {
            var t = this.getIndex(e), i = this._state.rating || -1, n = this._state.rated ? "rated" : "active";
            this.paintStars(i - 1, n), this.settings.onLeave(t + 1, this._state.rating, this.$el)
        }, getIndex: function (t) {
            var i = e(t.currentTarget), n = i.width(), a = e(t.target).attr("data-side"), o = this.settings.minRating;
            a = a || this.getOffsetByPixel(t, i, n), a = this.settings.useFullStars ? "right" : a;
            var s = i.index() - ("left" === a ? .5 : 0);
            return s = .5 > s && t.offsetX < n / 4 ? -1 : s, o && o <= this.settings.totalStars && o > s ? o - 1 : s
        }, getOffsetByPixel: function (e, t, i) {
            return i / 2 >= e.pageX - t.offset().left && !this.settings.useFullStars ? "left" : "right"
        }, initRating: function () {
            this.paintStars(this._state.rating - 1, "active")
        }, paintStars: function (t, i) {
            var n, a, o, s;
            e.each(this.$stars, function (r, l) {
                n = e(l).find('[data-side="left"]'), a = e(l).find('[data-side="right"]'), o = s = t >= r ? i : "empty", o = r - t == .5 ? i : o, n.attr("class", "svg-" + o + "-" + this._uid), a.attr("class", "svg-" + s + "-" + this._uid)
            }.bind(this))
        }, renderMarkup: function () {
            for (var e = this.settings, t = e.baseUrl ? location.href.split("#")[0] : "", i = '<div class="jq-star" style="width:' + e.starSize + "px;  height:" + e.starSize + 'px;"><svg version="1.0" class="jq-star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" ' + this.getSvgDimensions(e.starShape) + " stroke-width:" + e.strokeWidth + 'px;" xml:space="preserve"><style type="text/css">.svg-empty-' + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_1_);}.svg-hovered-" + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_2_);}.svg-active-" + this._uid + "{fill:url(" + t + "#" + this._uid + "_SVGID_3_);}.svg-rated-" + this._uid + "{fill:" + e.ratedColor + ";}</style>" + this.getLinearGradient(this._uid + "_SVGID_1_", e.emptyColor, e.emptyColor, e.starShape) + this.getLinearGradient(this._uid + "_SVGID_2_", e.hoverColor, e.hoverColor, e.starShape) + this.getLinearGradient(this._uid + "_SVGID_3_", e.starGradient.start, e.starGradient.end, e.starShape) + this.getVectorPath(this._uid, {
                starShape: e.starShape,
                strokeWidth: e.strokeWidth,
                strokeColor: e.strokeColor
            }) + "</svg></div>", n = "", a = 0; a < e.totalStars; a++) n += i;
            this.$el.append(n), this.$stars = this.$el.find(".jq-star")
        }, getVectorPath: function (e, t) {
            return "rounded" === t.starShape ? this.getRoundedVectorPath(e, t) : this.getSpikeVectorPath(e, t)
        }, getSpikeVectorPath: function (e, t) {
            return '<polygon data-side="center" class="svg-empty-' + e + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 " style="fill: transparent; stroke: ' + t.strokeColor + ';" /><polygon data-side="left" class="svg-empty-' + e + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke-opacity: 0;" /><polygon data-side="right" class="svg-empty-' + e + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-opacity: 0;" />'
        }, getRoundedVectorPath: function (e, t) {
            var i = "M520.9,336.5c-3.8-11.8-14.2-20.5-26.5-22.2l-140.9-20.5l-63-127.7 c-5.5-11.2-16.8-18.2-29.3-18.2c-12.5,0-23.8,7-29.3,18.2l-63,127.7L28,314.2C15.7,316,5.4,324.7,1.6,336.5S1,361.3,9.9,370 l102,99.4l-24,140.3c-2.1,12.3,2.9,24.6,13,32c5.7,4.2,12.4,6.2,19.2,6.2c5.2,0,10.5-1.2,15.2-3.8l126-66.3l126,66.2 c4.8,2.6,10,3.8,15.2,3.8c6.8,0,13.5-2.1,19.2-6.2c10.1-7.3,15.1-19.7,13-32l-24-140.3l102-99.4 C521.6,361.3,524.8,348.3,520.9,336.5z";
            return '<path data-side="center" class="svg-empty-' + e + '" d="' + i + '" style="stroke: ' + t.strokeColor + '; fill: transparent; " /><path data-side="right" class="svg-empty-' + e + '" d="' + i + '" style="stroke-opacity: 0;" /><path data-side="left" class="svg-empty-' + e + '" d="M121,648c-7.3,0-14.1-2.2-19.8-6.4c-10.4-7.6-15.6-20.3-13.4-33l24-139.9l-101.6-99 c-9.1-8.9-12.4-22.4-8.6-34.5c3.9-12.1,14.6-21.1,27.2-23l140.4-20.4L232,164.6c5.7-11.6,17.3-18.8,30.2-16.8c0.6,0,1,0.4,1,1 v430.1c0,0.4-0.2,0.7-0.5,0.9l-126,66.3C132,646.6,126.6,648,121,648z" style="stroke: ' + t.strokeColor + '; stroke-opacity: 0;" />'
        }, getSvgDimensions: function (e) {
            return "rounded" === e ? 'width="550px" height="500.2px" viewBox="0 146.8 550 500.2" style="enable-background:new 0 0 550 500.2;' : 'x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305;'
        }, getLinearGradient: function (e, t, i, n) {
            return '<linearGradient id="' + e + '" gradientUnits="userSpaceOnUse" x1="0" y1="-50" x2="0" y2="' + ("rounded" === n ? 500 : 250) + '"><stop  offset="0" style="stop-color:' + t + '"/><stop  offset="1" style="stop-color:' + i + '"/> </linearGradient>'
        }, executeCallback: function (e, t) {
            (0, this.settings.callback)(e, t)
        }
    }, s = {
        unload: function () {
            var i = "plugin_" + t, n = e(this);
            n.data(i).$stars.off(), n.removeData(i).remove()
        }, setRating: function (t, i) {
            var n = e(this).data("plugin_starRating");
            t > n.settings.totalStars || 0 > t || (i && (t = Math.round(t)), n.applyRating(t))
        }, getRating: function () {
            return e(this).data("plugin_starRating")._state.rating
        }, resize: function (t) {
            var i = e(this).data("plugin_starRating").$stars;
            return 1 >= t || t > 200 ? void console.log("star size out of bounds") : void(i = Array.prototype.slice.call(i)).forEach((function (i) {
                e(i).css({width: t + "px", height: t + "px"})
            }))
        }, setReadOnly: function (t) {
            var i = e(this).data("plugin_starRating");
            !0 === t ? i.$stars.off("mouseover mouseout click") : (i.settings.readOnly = !1, i.addListeners())
        }
    };
    e.extend(a.prototype, o), e.fn[t] = function (i) {
        if (!e.isPlainObject(i)) {
            if (s.hasOwnProperty(i)) return s[i].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + i + " does not exist on " + t + ".js")
        }
        return this.each((function () {
            e.data(this, "plugin_" + t) || e.data(this, "plugin_" + t, new a(this, i))
        }))
    }
}(jQuery, window, document), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, (function () {
    "use strict";

    function e(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var i = e.ownerDocument.defaultView.getComputedStyle(e, null);
        return t ? i[t] : i
    }

    function i(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case"HTML":
            case"BODY":
                return e.ownerDocument.body;
            case"#document":
                return e.body
        }
        var a = t(e), o = a.overflow, s = a.overflowX, r = a.overflowY;
        return /(auto|scroll|overlay)/.test(o + r + s) ? e : n(i(e))
    }

    function a(e) {
        return 11 === e ? K : 10 === e ? Q : K || Q
    }

    function o(e) {
        if (!e) return document.documentElement;
        for (var i = a(10) ? document.body : null, n = e.offsetParent || null; n === i && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var s = n && n.nodeName;
        return s && "BODY" !== s && "HTML" !== s ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === t(n, "position") ? o(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }

    function r(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = i ? e : t, a = i ? t : e,
            l = document.createRange();
        l.setStart(n, 0), l.setEnd(a, 0);
        var d = l.commonAncestorContainer;
        if (e !== d && t !== d || n.contains(a)) return function (e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || o(e.firstElementChild) === e)
        }(d) ? d : o(d);
        var c = s(e);
        return c.host ? r(c.host, t) : r(e, s(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            i = "top" === t ? "scrollTop" : "scrollLeft", n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var a = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || a;
            return o[i]
        }
        return e[i]
    }

    function d(e, t) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], n = l(t, "top"), a = l(t, "left"),
            o = i ? -1 : 1;
        return e.top += n * o, e.bottom += n * o, e.left += a * o, e.right += a * o, e
    }

    function c(e, t) {
        var i = "x" === t ? "Left" : "Top", n = "Left" == i ? "Right" : "Bottom";
        return parseFloat(e["border" + i + "Width"], 10) + parseFloat(e["border" + n + "Width"], 10)
    }

    function p(e, t, i, n) {
        return V(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], a(10) ? parseInt(i["offset" + e]) + parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
    }

    function u(e) {
        var t = e.body, i = e.documentElement, n = a(10) && getComputedStyle(i);
        return {height: p("Height", t, i, n), width: p("Width", t, i, n)}
    }

    function h(e) {
        return te({}, e, {right: e.left + e.width, bottom: e.top + e.height})
    }

    function f(e) {
        var i = {};
        try {
            if (a(10)) {
                i = e.getBoundingClientRect();
                var n = l(e, "top"), o = l(e, "left");
                i.top += n, i.left += o, i.bottom += n, i.right += o
            } else i = e.getBoundingClientRect()
        } catch (e) {
        }
        var s = {left: i.left, top: i.top, width: i.right - i.left, height: i.bottom - i.top},
            r = "HTML" === e.nodeName ? u(e.ownerDocument) : {}, d = r.width || e.clientWidth || s.right - s.left,
            p = r.height || e.clientHeight || s.bottom - s.top, f = e.offsetWidth - d, m = e.offsetHeight - p;
        if (f || m) {
            var v = t(e);
            f -= c(v, "x"), m -= c(v, "y"), s.width -= f, s.height -= m
        }
        return h(s)
    }

    function m(e, i) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], s = a(10), r = "HTML" === i.nodeName,
            l = f(e), c = f(i), p = n(e), u = t(i), m = parseFloat(u.borderTopWidth, 10),
            v = parseFloat(u.borderLeftWidth, 10);
        o && r && (c.top = V(c.top, 0), c.left = V(c.left, 0));
        var g = h({top: l.top - c.top - m, left: l.left - c.left - v, width: l.width, height: l.height});
        if (g.marginTop = 0, g.marginLeft = 0, !s && r) {
            var b = parseFloat(u.marginTop, 10), y = parseFloat(u.marginLeft, 10);
            g.top -= m - b, g.bottom -= m - b, g.left -= v - y, g.right -= v - y, g.marginTop = b, g.marginLeft = y
        }
        return (s && !o ? i.contains(p) : i === p && "BODY" !== p.nodeName) && (g = d(g, i)), g
    }

    function v(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], i = e.ownerDocument.documentElement,
            n = m(e, i), a = V(i.clientWidth, window.innerWidth || 0), o = V(i.clientHeight, window.innerHeight || 0),
            s = t ? 0 : l(i), r = t ? 0 : l(i, "left"),
            d = {top: s - n.top + n.marginTop, left: r - n.left + n.marginLeft, width: a, height: o};
        return h(d)
    }

    function g(e) {
        var n = e.nodeName;
        if ("BODY" === n || "HTML" === n) return !1;
        if ("fixed" === t(e, "position")) return !0;
        var a = i(e);
        return !!a && g(a)
    }

    function b(e) {
        if (!e || !e.parentElement || a()) return document.documentElement;
        for (var i = e.parentElement; i && "none" === t(i, "transform");) i = i.parentElement;
        return i || document.documentElement
    }

    function y(e, t, a, o) {
        var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], l = {top: 0, left: 0},
            d = s ? b(e) : r(e, t);
        if ("viewport" === o) l = v(d, s); else {
            var c;
            "scrollParent" === o ? "BODY" === (c = n(i(t))).nodeName && (c = e.ownerDocument.documentElement) : c = "window" === o ? e.ownerDocument.documentElement : o;
            var p = m(c, d, s);
            if ("HTML" !== c.nodeName || g(d)) l = p; else {
                var h = u(e.ownerDocument), f = h.height, y = h.width;
                l.top += p.top - p.marginTop, l.bottom = f + p.top, l.left += p.left - p.marginLeft, l.right = y + p.left
            }
        }
        var w = "number" == typeof(a = a || 0);
        return l.left += w ? a : a.left || 0, l.top += w ? a : a.top || 0, l.right -= w ? a : a.right || 0, l.bottom -= w ? a : a.bottom || 0, l
    }

    function w(e) {
        return e.width * e.height
    }

    function x(e, t, i, n, a) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var s = y(i, n, o, a), r = {
            top: {width: s.width, height: t.top - s.top},
            right: {width: s.right - t.right, height: s.height},
            bottom: {width: s.width, height: s.bottom - t.bottom},
            left: {width: t.left - s.left, height: s.height}
        }, l = Object.keys(r).map((function (e) {
            return te({key: e}, r[e], {area: w(r[e])})
        })).sort((function (e, t) {
            return t.area - e.area
        })), d = l.filter((function (e) {
            var t = e.width, n = e.height;
            return t >= i.clientWidth && n >= i.clientHeight
        })), c = 0 < d.length ? d[0].key : l[0].key, p = e.split("-")[1];
        return c + (p ? "-" + p : "")
    }

    function S(e, t, i) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, a = n ? b(t) : r(t, i);
        return m(i, a, n)
    }

    function T(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            n = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
        return {width: e.offsetWidth + n, height: e.offsetHeight + i}
    }

    function E(e) {
        var t = {left: "right", right: "left", bottom: "top", top: "bottom"};
        return e.replace(/left|right|bottom|top/g, (function (e) {
            return t[e]
        }))
    }

    function C(e, t, i) {
        i = i.split("-")[0];
        var n = T(e), a = {width: n.width, height: n.height}, o = -1 !== ["right", "left"].indexOf(i),
            s = o ? "top" : "left", r = o ? "left" : "top", l = o ? "height" : "width", d = o ? "width" : "height";
        return a[s] = t[s] + t[l] / 2 - n[l] / 2, a[r] = i === r ? t[r] - n[d] : t[E(r)], a
    }

    function k(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function P(t, i, n) {
        return (void 0 === n ? t : t.slice(0, function (e, t, i) {
            if (Array.prototype.findIndex) return e.findIndex((function (e) {
                return e[t] === i
            }));
            var n = k(e, (function (e) {
                return e[t] === i
            }));
            return e.indexOf(n)
        }(t, "name", n))).forEach((function (t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && e(n) && (i.offsets.popper = h(i.offsets.popper), i.offsets.reference = h(i.offsets.reference), i = n(i, t))
        })), i
    }

    function M() {
        if (!this.state.isDestroyed) {
            var e = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
            e.offsets.reference = S(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = x(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = C(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function $(e, t) {
        return e.some((function (e) {
            var i = e.name;
            return e.enabled && i === t
        }))
    }

    function L(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var a = t[n], o = a ? "" + a + i : e;
            if (void 0 !== document.body.style[o]) return o
        }
        return null
    }

    function z() {
        return this.state.isDestroyed = !0, $(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[L("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function I(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function A(e, t, i, a) {
        i.updateBound = a, I(e).addEventListener("resize", i.updateBound, {passive: !0});
        var o = n(e);
        return function e(t, i, a, o) {
            var s = "BODY" === t.nodeName, r = s ? t.ownerDocument.defaultView : t;
            r.addEventListener(i, a, {passive: !0}), s || e(n(r.parentNode), i, a, o), o.push(r)
        }(o, "scroll", i.updateBound, i.scrollParents), i.scrollElement = o, i.eventsEnabled = !0, i
    }

    function O() {
        this.state.eventsEnabled || (this.state = A(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function D() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = function (e, t) {
            return I(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach((function (e) {
                e.removeEventListener("scroll", t.updateBound)
            })), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
        }(this.reference, this.state))
    }

    function F(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function H(e, t) {
        Object.keys(t).forEach((function (i) {
            var n = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && F(t[i]) && (n = "px"), e.style[i] = t[i] + n
        }))
    }

    function B(e, t, i) {
        var n = k(e, (function (e) {
            return e.name === t
        })), a = !!n && e.some((function (e) {
            return e.name === i && e.enabled && e.order < n.order
        }));
        if (!a) {
            var o = "`" + t + "`";
            console.warn("`" + i + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return a
    }

    function Y(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], i = ae.indexOf(e),
            n = ae.slice(i + 1).concat(ae.slice(0, i));
        return t ? n.reverse() : n
    }

    function X(e, t, i, n) {
        var a = [0, 0], o = -1 !== ["right", "left"].indexOf(n), s = e.split(/(\+|\-)/).map((function (e) {
            return e.trim()
        })), r = s.indexOf(k(s, (function (e) {
            return -1 !== e.search(/,|\s/)
        })));
        s[r] && -1 === s[r].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            d = -1 === r ? [s] : [s.slice(0, r).concat([s[r].split(l)[0]]), [s[r].split(l)[1]].concat(s.slice(r + 1))];
        return (d = d.map((function (e, n) {
            var a = (1 === n ? !o : o) ? "height" : "width", s = !1;
            return e.reduce((function (e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
            }), []).map((function (e) {
                return function (e, t, i, n) {
                    var a = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), o = +a[1], s = a[2];
                    if (!o) return e;
                    if (0 === s.indexOf("%")) {
                        var r;
                        switch (s) {
                            case"%p":
                                r = i;
                                break;
                            case"%":
                            case"%r":
                            default:
                                r = n
                        }
                        return h(r)[t] / 100 * o
                    }
                    return "vh" === s || "vw" === s ? ("vh" === s ? V(document.documentElement.clientHeight, window.innerHeight || 0) : V(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
                }(e, a, t, i)
            }))
        }))).forEach((function (e, t) {
            e.forEach((function (i, n) {
                F(i) && (a[t] += i * ("-" === e[n - 1] ? -1 : 1))
            }))
        })), a
    }

    for (var j = Math.min, N = Math.floor, R = Math.round, V = Math.max, _ = "undefined" != typeof window && "undefined" != typeof document, q = ["Edge", "Trident", "Firefox"], G = 0, W = 0; W < q.length; W += 1) if (_ && 0 <= navigator.userAgent.indexOf(q[W])) {
        G = 1;
        break
    }
    var U = _ && window.Promise ? function (e) {
            var t = !1;
            return function () {
                t || (t = !0, window.Promise.resolve().then((function () {
                    t = !1, e()
                })))
            }
        } : function (e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout((function () {
                    t = !1, e()
                }), G))
            }
        }, K = _ && !(!window.MSInputMethodContext || !document.documentMode), Q = _ && /MSIE 10/.test(navigator.userAgent),
        Z = function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }, J = function () {
            function e(e, t) {
                for (var i, n = 0; n < t.length; n++) (i = t[n]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }

            return function (t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(), ee = function (e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }, te = Object.assign || function (e) {
            for (var t, i = 1; i < arguments.length; i++) for (var n in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }, ie = _ && /Firefox/i.test(navigator.userAgent),
        ne = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        ae = ne.slice(3), oe = "flip", se = "clockwise", re = "counterclockwise", le = function () {
            function t(i, n) {
                var a = this, o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                Z(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(a.update)
                }, this.update = U(this.update.bind(this)), this.options = te({}, t.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = i && i.jquery ? i[0] : i, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(te({}, t.Defaults.modifiers, o.modifiers)).forEach((function (e) {
                    a.options.modifiers[e] = te({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                })), this.modifiers = Object.keys(this.options.modifiers).map((function (e) {
                    return te({name: e}, a.options.modifiers[e])
                })).sort((function (e, t) {
                    return e.order - t.order
                })), this.modifiers.forEach((function (t) {
                    t.enabled && e(t.onLoad) && t.onLoad(a.reference, a.popper, a.options, t, a.state)
                })), this.update();
                var s = this.options.eventsEnabled;
                s && this.enableEventListeners(), this.state.eventsEnabled = s
            }

            return J(t, [{
                key: "update", value: function () {
                    return M.call(this)
                }
            }, {
                key: "destroy", value: function () {
                    return z.call(this)
                }
            }, {
                key: "enableEventListeners", value: function () {
                    return O.call(this)
                }
            }, {
                key: "disableEventListeners", value: function () {
                    return D.call(this)
                }
            }]), t
        }();
    return le.Utils = ("undefined" == typeof window ? global : window).PopperUtils, le.placements = ne, le.Defaults = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {
        },
        onUpdate: function () {
        },
        modifiers: {
            shift: {
                order: 100, enabled: !0, fn: function (e) {
                    var t = e.placement, i = t.split("-")[0], n = t.split("-")[1];
                    if (n) {
                        var a = e.offsets, o = a.reference, s = a.popper, r = -1 !== ["bottom", "top"].indexOf(i),
                            l = r ? "left" : "top", d = r ? "width" : "height",
                            c = {start: ee({}, l, o[l]), end: ee({}, l, o[l] + o[d] - s[d])};
                        e.offsets.popper = te({}, s, c[n])
                    }
                    return e
                }
            }, offset: {
                order: 200, enabled: !0, fn: function (e, t) {
                    var i, n = t.offset, a = e.placement, o = e.offsets, s = o.popper, r = o.reference,
                        l = a.split("-")[0];
                    return i = F(+n) ? [+n, 0] : X(n, s, r, l), "left" === l ? (s.top += i[0], s.left -= i[1]) : "right" === l ? (s.top += i[0], s.left += i[1]) : "top" === l ? (s.left += i[0], s.top -= i[1]) : "bottom" === l && (s.left += i[0], s.top += i[1]), e.popper = s, e
                }, offset: 0
            }, preventOverflow: {
                order: 300, enabled: !0, fn: function (e, t) {
                    var i = t.boundariesElement || o(e.instance.popper);
                    e.instance.reference === i && (i = o(i));
                    var n = L("transform"), a = e.instance.popper.style, s = a.top, r = a.left, l = a[n];
                    a.top = "", a.left = "", a[n] = "";
                    var d = y(e.instance.popper, e.instance.reference, t.padding, i, e.positionFixed);
                    a.top = s, a.left = r, a[n] = l, t.boundaries = d;
                    var c = t.priority, p = e.offsets.popper, u = {
                        primary: function (e) {
                            var i = p[e];
                            return p[e] < d[e] && !t.escapeWithReference && (i = V(p[e], d[e])), ee({}, e, i)
                        }, secondary: function (e) {
                            var i = "right" === e ? "left" : "top", n = p[i];
                            return p[e] > d[e] && !t.escapeWithReference && (n = j(p[i], d[e] - ("right" === e ? p.width : p.height))), ee({}, i, n)
                        }
                    };
                    return c.forEach((function (e) {
                        var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                        p = te({}, p, u[t](e))
                    })), e.offsets.popper = p, e
                }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent"
            }, keepTogether: {
                order: 400, enabled: !0, fn: function (e) {
                    var t = e.offsets, i = t.popper, n = t.reference, a = e.placement.split("-")[0], o = N,
                        s = -1 !== ["top", "bottom"].indexOf(a), r = s ? "right" : "bottom", l = s ? "left" : "top",
                        d = s ? "width" : "height";
                    return i[r] < o(n[l]) && (e.offsets.popper[l] = o(n[l]) - i[d]), i[l] > o(n[r]) && (e.offsets.popper[l] = o(n[r])), e
                }
            }, arrow: {
                order: 500, enabled: !0, fn: function (e, i) {
                    var n;
                    if (!B(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var a = i.element;
                    if ("string" == typeof a) {
                        if (!(a = e.instance.popper.querySelector(a))) return e
                    } else if (!e.instance.popper.contains(a)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var o = e.placement.split("-")[0], s = e.offsets, r = s.popper, l = s.reference,
                        d = -1 !== ["left", "right"].indexOf(o), c = d ? "height" : "width", p = d ? "Top" : "Left",
                        u = p.toLowerCase(), f = d ? "left" : "top", m = d ? "bottom" : "right", v = T(a)[c];
                    l[m] - v < r[u] && (e.offsets.popper[u] -= r[u] - (l[m] - v)), l[u] + v > r[m] && (e.offsets.popper[u] += l[u] + v - r[m]), e.offsets.popper = h(e.offsets.popper);
                    var g = l[u] + l[c] / 2 - v / 2, b = t(e.instance.popper), y = parseFloat(b["margin" + p], 10),
                        w = parseFloat(b["border" + p + "Width"], 10), x = g - e.offsets.popper[u] - y - w;
                    return x = V(j(r[c] - v, x), 0), e.arrowElement = a, e.offsets.arrow = (ee(n = {}, u, R(x)), ee(n, f, ""), n), e
                }, element: "[x-arrow]"
            }, flip: {
                order: 600,
                enabled: !0,
                fn: function (e, t) {
                    if ($(e.instance.modifiers, "inner")) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var i = y(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split("-")[0], a = E(n), o = e.placement.split("-")[1] || "", s = [];
                    switch (t.behavior) {
                        case oe:
                            s = [n, a];
                            break;
                        case se:
                            s = Y(n);
                            break;
                        case re:
                            s = Y(n, !0);
                            break;
                        default:
                            s = t.behavior
                    }
                    return s.forEach((function (r, l) {
                        if (n !== r || s.length === l + 1) return e;
                        n = e.placement.split("-")[0], a = E(n);
                        var d = e.offsets.popper, c = e.offsets.reference, p = N,
                            u = "left" === n && p(d.right) > p(c.left) || "right" === n && p(d.left) < p(c.right) || "top" === n && p(d.bottom) > p(c.top) || "bottom" === n && p(d.top) < p(c.bottom),
                            h = p(d.left) < p(i.left), f = p(d.right) > p(i.right), m = p(d.top) < p(i.top),
                            v = p(d.bottom) > p(i.bottom),
                            g = "left" === n && h || "right" === n && f || "top" === n && m || "bottom" === n && v,
                            b = -1 !== ["top", "bottom"].indexOf(n),
                            y = !!t.flipVariations && (b && "start" === o && h || b && "end" === o && f || !b && "start" === o && m || !b && "end" === o && v),
                            w = !!t.flipVariationsByContent && (b && "start" === o && f || b && "end" === o && h || !b && "start" === o && v || !b && "end" === o && m),
                            x = y || w;
                        (u || g || x) && (e.flipped = !0, (u || g) && (n = s[l + 1]), x && (o = function (e) {
                            return "end" === e ? "start" : "start" === e ? "end" : e
                        }(o)), e.placement = n + (o ? "-" + o : ""), e.offsets.popper = te({}, e.offsets.popper, C(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, "flip"))
                    })), e
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport",
                flipVariations: !1,
                flipVariationsByContent: !1
            }, inner: {
                order: 700, enabled: !1, fn: function (e) {
                    var t = e.placement, i = t.split("-")[0], n = e.offsets, a = n.popper, o = n.reference,
                        s = -1 !== ["left", "right"].indexOf(i), r = -1 === ["top", "left"].indexOf(i);
                    return a[s ? "left" : "top"] = o[i] - (r ? a[s ? "width" : "height"] : 0), e.placement = E(t), e.offsets.popper = h(a), e
                }
            }, hide: {
                order: 800, enabled: !0, fn: function (e) {
                    if (!B(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference, i = k(e.instance.modifiers, (function (e) {
                        return "preventOverflow" === e.name
                    })).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }
            }, computeStyle: {
                order: 850, enabled: !0, fn: function (e, t) {
                    var i = t.x, n = t.y, a = e.offsets.popper, s = k(e.instance.modifiers, (function (e) {
                        return "applyStyle" === e.name
                    })).gpuAcceleration;
                    void 0 !== s && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var r, l, d = void 0 === s ? t.gpuAcceleration : s, c = o(e.instance.popper), p = f(c),
                        u = {position: a.position}, h = function (e, t) {
                            var i = e.offsets, n = i.popper, a = i.reference, o = R, s = function (e) {
                                    return e
                                }, r = o(a.width), l = o(n.width), d = -1 !== ["left", "right"].indexOf(e.placement),
                                c = -1 !== e.placement.indexOf("-"), p = t ? d || c || r % 2 == l % 2 ? o : N : s,
                                u = t ? o : s;
                            return {
                                left: p(1 == r % 2 && 1 == l % 2 && !c && t ? n.left - 1 : n.left),
                                top: u(n.top),
                                bottom: u(n.bottom),
                                right: p(n.right)
                            }
                        }(e, 2 > window.devicePixelRatio || !ie), m = "bottom" === i ? "top" : "bottom",
                        v = "right" === n ? "left" : "right", g = L("transform");
                    if (l = "bottom" == m ? "HTML" === c.nodeName ? -c.clientHeight + h.bottom : -p.height + h.bottom : h.top, r = "right" == v ? "HTML" === c.nodeName ? -c.clientWidth + h.right : -p.width + h.right : h.left, d && g) u[g] = "translate3d(" + r + "px, " + l + "px, 0)", u[m] = 0, u[v] = 0, u.willChange = "transform"; else {
                        var b = "bottom" == m ? -1 : 1, y = "right" == v ? -1 : 1;
                        u[m] = l * b, u[v] = r * y, u.willChange = m + ", " + v
                    }
                    var w = {"x-placement": e.placement};
                    return e.attributes = te({}, w, e.attributes), e.styles = te({}, u, e.styles), e.arrowStyles = te({}, e.offsets.arrow, e.arrowStyles), e
                }, gpuAcceleration: !0, x: "bottom", y: "right"
            }, applyStyle: {
                order: 900, enabled: !0, fn: function (e) {
                    return H(e.instance.popper, e.styles), function (e, t) {
                        Object.keys(t).forEach((function (i) {
                            !1 === t[i] ? e.removeAttribute(i) : e.setAttribute(i, t[i])
                        }))
                    }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && H(e.arrowElement, e.arrowStyles), e
                }, onLoad: function (e, t, i, n, a) {
                    var o = S(a, t, e, i.positionFixed),
                        s = x(i.placement, o, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return t.setAttribute("x-placement", s), H(t, {position: i.positionFixed ? "fixed" : "absolute"}), i
                }, gpuAcceleration: void 0
            }
        }
    }, le
})), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], t) : (e = e || self).tippy = t(e.Popper)
}(this, (function (e) {
    "use strict";

    function t() {
        return (t = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        }).apply(this, arguments)
    }

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var i = "undefined" != typeof window && "undefined" != typeof document, n = i ? navigator.userAgent : "",
        a = /MSIE |Trident\//.test(n), o = /UCBrowser\//.test(n),
        s = i && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream, r = {
            a11y: !0,
            allowHTML: !0,
            animateFill: !0,
            animation: "shift-away",
            appendTo: function () {
                return document.body
            },
            aria: "describedby",
            arrow: !1,
            arrowType: "sharp",
            boundary: "scrollParent",
            content: "",
            delay: 0,
            distance: 10,
            duration: [325, 275],
            flip: !0,
            flipBehavior: "flip",
            flipOnUpdate: !1,
            followCursor: !1,
            hideOnClick: !0,
            ignoreAttributes: !1,
            inertia: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            lazy: !0,
            maxWidth: 350,
            multiple: !1,
            offset: 0,
            onHidden: function () {
            },
            onHide: function () {
            },
            onMount: function () {
            },
            onShow: function () {
            },
            onShown: function () {
            },
            onTrigger: function () {
            },
            placement: "top",
            popperOptions: {},
            role: "tooltip",
            showOnInit: !1,
            size: "regular",
            sticky: !1,
            target: "",
            theme: "dark",
            touch: !0,
            touchHold: !1,
            trigger: "mouseenter focus",
            triggerTarget: null,
            updateDuration: 0,
            wait: null,
            zIndex: 9999
        },
        l = ["arrow", "arrowType", "boundary", "distance", "flip", "flipBehavior", "flipOnUpdate", "offset", "placement", "popperOptions"],
        d = i ? Element.prototype : {},
        c = d.matches || d.matchesSelector || d.webkitMatchesSelector || d.mozMatchesSelector || d.msMatchesSelector;

    function p(e) {
        return [].slice.call(e)
    }

    function u(e, t) {
        return h(e, (function (e) {
            return c.call(e, t)
        }))
    }

    function h(e, t) {
        for (; e;) {
            if (t(e)) return e;
            e = e.parentElement
        }
        return null
    }

    var f = {passive: !0}, m = "x-placement", v = "x-out-of-boundaries", g = "tippy-iOS", b = "tippy-active",
        y = "tippy-popper", w = "tippy-tooltip", x = "tippy-content", S = "tippy-backdrop", T = "tippy-arrow",
        E = "tippy-roundarrow", C = ".".concat(y), k = ".".concat(w), P = ".".concat(x), M = ".".concat(S),
        $ = ".".concat(T), L = ".".concat(E), z = !1;

    function I() {
        z || (z = !0, s && document.body.classList.add(g), window.performance && document.addEventListener("mousemove", O))
    }

    var A = 0;

    function O() {
        var e = performance.now();
        e - A < 20 && (z = !1, document.removeEventListener("mousemove", O), s || document.body.classList.remove(g)), A = e
    }

    function D() {
        var e = document.activeElement;
        e && e.blur && e._tippy && e.blur()
    }

    var F = Object.keys(r);

    function H(e, t) {
        return {}.hasOwnProperty.call(e, t)
    }

    function B(e, t, i) {
        if (Array.isArray(e)) {
            var n = e[t];
            return null == n ? i : n
        }
        return e
    }

    function Y(e, t) {
        return 0 === t ? e : function (n) {
            clearTimeout(i), i = setTimeout((function () {
                e(n)
            }), t)
        };
        var i
    }

    function X(e, t) {
        return e && e.modifiers && e.modifiers[t]
    }

    function j(e, t) {
        return e.indexOf(t) > -1
    }

    function N(e) {
        return e instanceof Element
    }

    function R(e) {
        return !(!e || !H(e, "isVirtual")) || N(e)
    }

    function V(e, t) {
        return "function" == typeof e ? e.apply(null, t) : e
    }

    function _(e, t) {
        e.filter((function (e) {
            return "flip" === e.name
        }))[0].enabled = t
    }

    function q() {
        return document.createElement("div")
    }

    function G(e, t) {
        e.forEach((function (e) {
            e && (e.style.transitionDuration = "".concat(t, "ms"))
        }))
    }

    function W(e, t) {
        e.forEach((function (e) {
            e && e.setAttribute("data-state", t)
        }))
    }

    function U(e, i) {
        var n = t({}, i, {content: V(i.content, [e])}, i.ignoreAttributes ? {} : function (e) {
            return F.reduce((function (t, i) {
                var n = (e.getAttribute("data-tippy-".concat(i)) || "").trim();
                if (!n) return t;
                if ("content" === i) t[i] = n; else try {
                    t[i] = JSON.parse(n)
                } catch (e) {
                    t[i] = n
                }
                return t
            }), {})
        }(e));
        return (n.arrow || o) && (n.animateFill = !1), n
    }

    function K(e, t) {
        Object.keys(e).forEach((function (e) {
            if (!H(t, e)) throw new Error("[tippy]: `".concat(e, "` is not a valid option"))
        }))
    }

    function Q(e, t) {
        e.innerHTML = N(t) ? t.innerHTML : t
    }

    function Z(e, t) {
        N(t.content) ? (Q(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (e[t.allowHTML ? "innerHTML" : "textContent"] = t.content)
    }

    function J(e) {
        return {
            tooltip: e.querySelector(k),
            backdrop: e.querySelector(M),
            content: e.querySelector(P),
            arrow: e.querySelector($) || e.querySelector(L)
        }
    }

    function ee(e) {
        e.setAttribute("data-inertia", "")
    }

    function te(e) {
        var t = q();
        return "round" === e ? (t.className = E, Q(t, '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>')) : t.className = T, t
    }

    function ie() {
        var e = q();
        return e.className = S, e.setAttribute("data-state", "hidden"), e
    }

    function ne(e, t) {
        e.setAttribute("tabindex", "-1"), t.setAttribute("data-interactive", "")
    }

    function ae(e, t, i) {
        var n = o && void 0 !== document.body.style.webkitTransition ? "webkitTransitionEnd" : "transitionend";
        e[t + "EventListener"](n, i)
    }

    function oe(e) {
        var t = e.getAttribute(m);
        return t ? t.split("-")[0] : ""
    }

    function se(e, t, i) {
        i.split(" ").forEach((function (i) {
            e.classList[t](i + "-theme")
        }))
    }

    function re(e, t) {
        var i = q();
        i.className = y, i.id = "tippy-".concat(e), i.style.zIndex = "" + t.zIndex, i.style.position = "absolute", i.style.top = "0", i.style.left = "0", t.role && i.setAttribute("role", t.role);
        var n = q();
        n.className = w, n.style.maxWidth = t.maxWidth + ("number" == typeof t.maxWidth ? "px" : ""), n.setAttribute("data-size", t.size), n.setAttribute("data-animation", t.animation), n.setAttribute("data-state", "hidden"), se(n, "add", t.theme);
        var a = q();
        return a.className = x, a.setAttribute("data-state", "hidden"), t.interactive && ne(i, n), t.arrow && n.appendChild(te(t.arrowType)), t.animateFill && (n.appendChild(ie()), n.setAttribute("data-animatefill", "")), t.inertia && ee(n), Z(a, t), n.appendChild(a), i.appendChild(n), i
    }

    function le(e, t, i) {
        var n = J(e), a = n.tooltip, o = n.content, s = n.backdrop, r = n.arrow;
        e.style.zIndex = "" + i.zIndex, a.setAttribute("data-size", i.size), a.setAttribute("data-animation", i.animation), a.style.maxWidth = i.maxWidth + ("number" == typeof i.maxWidth ? "px" : ""), i.role ? e.setAttribute("role", i.role) : e.removeAttribute("role"), t.content !== i.content && Z(o, i), !t.animateFill && i.animateFill ? (a.appendChild(ie()), a.setAttribute("data-animatefill", "")) : t.animateFill && !i.animateFill && (a.removeChild(s), a.removeAttribute("data-animatefill")), !t.arrow && i.arrow ? a.appendChild(te(i.arrowType)) : t.arrow && !i.arrow && a.removeChild(r), t.arrow && i.arrow && t.arrowType !== i.arrowType && a.replaceChild(te(i.arrowType), r), !t.interactive && i.interactive ? ne(e, a) : t.interactive && !i.interactive && function (e, t) {
            e.removeAttribute("tabindex"), t.removeAttribute("data-interactive")
        }(e, a), !t.inertia && i.inertia ? ee(a) : t.inertia && !i.inertia && function (e) {
            e.removeAttribute("data-inertia")
        }(a), t.theme !== i.theme && (se(a, "remove", t.theme), se(a, "add", i.theme))
    }

    var de = 1, ce = [];

    function pe(i, n) {
        var o, s, d, g, y, w = U(i, n);
        if (!w.multiple && i._tippy) return null;
        var x, S, T, E, k, P = !1, M = !1, $ = !1, L = !1, I = [], A = Y(ve, w.interactiveDebounce), O = de++,
            D = re(O, w), F = J(D), R = {
                id: O,
                reference: i,
                popper: D,
                popperChildren: F,
                popperInstance: null,
                props: w,
                state: {isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1},
                clearDelayTimeouts: Pe,
                set: Me,
                setContent: function (e) {
                    Me({content: e})
                },
                show: $e,
                hide: Le,
                enable: function () {
                    R.state.isEnabled = !0
                },
                disable: function () {
                    R.state.isEnabled = !1
                },
                destroy: function (e) {
                    if (!R.state.isDestroyed) {
                        M = !0, R.state.isMounted && Le(0), he(), delete i._tippy;
                        var t = R.props.target;
                        t && e && N(i) && p(i.querySelectorAll(t)).forEach((function (e) {
                            e._tippy && e._tippy.destroy()
                        })), R.popperInstance && R.popperInstance.destroy(), M = !1, R.state.isDestroyed = !0
                    }
                }
            };
        return i._tippy = R, D._tippy = R, ue(), w.lazy || Te(), w.showOnInit && Ee(), !w.a11y || w.target || !N(k = Z()) || c.call(k, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") && !k.hasAttribute("disabled") || Z().setAttribute("tabindex", "0"), D.addEventListener("mouseenter", (function (e) {
            R.props.interactive && R.state.isVisible && "mouseenter" === o && Ee(e, !0)
        })), D.addEventListener("mouseleave", (function () {
            R.props.interactive && "mouseenter" === o && document.addEventListener("mousemove", A)
        })), R;

        function q() {
            document.removeEventListener("mousemove", fe)
        }

        function Q() {
            document.body.removeEventListener("mouseleave", Ce), document.removeEventListener("mousemove", A), ce = ce.filter((function (e) {
                return e !== A
            }))
        }

        function Z() {
            return R.props.triggerTarget || i
        }

        function ee() {
            document.addEventListener("click", ke, !0)
        }

        function te() {
            return [R.popperChildren.tooltip, R.popperChildren.backdrop, R.popperChildren.content]
        }

        function ie() {
            var e = R.props.followCursor;
            return e && "focus" !== o || z && "initial" === e
        }

        function ne(e, t) {
            var i = R.popperChildren.tooltip;

            function n(e) {
                e.target === i && (ae(i, "remove", n), t())
            }

            if (0 === e) return t();
            ae(i, "remove", T), ae(i, "add", n), T = n
        }

        function se(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            Z().addEventListener(e, t, i), I.push({eventType: e, handler: t, options: i})
        }

        function ue() {
            R.props.touchHold && !R.props.target && (se("touchstart", me, f), se("touchend", ge, f)), R.props.trigger.trim().split(" ").forEach((function (e) {
                if ("manual" !== e) if (R.props.target) switch (e) {
                    case"mouseenter":
                        se("mouseover", ye), se("mouseout", we);
                        break;
                    case"focus":
                        se("focusin", ye), se("focusout", we);
                        break;
                    case"click":
                        se(e, ye)
                } else switch (se(e, me), e) {
                    case"mouseenter":
                        se("mouseleave", ge);
                        break;
                    case"focus":
                        se(a ? "focusout" : "blur", be)
                }
            }))
        }

        function he() {
            I.forEach((function (e) {
                var t = e.eventType, i = e.handler, n = e.options;
                Z().removeEventListener(t, i, n)
            })), I = []
        }

        function fe(e) {
            var n = s = e, a = n.clientX, o = n.clientY;
            if (E) {
                var r = h(e.target, (function (e) {
                        return e === i
                    })), l = i.getBoundingClientRect(), d = R.props.followCursor, c = "horizontal" === d,
                    p = "vertical" === d, u = j(["top", "bottom"], oe(D)), f = D.getAttribute(m),
                    v = !!f && !!f.split("-")[1], g = u ? D.offsetWidth : D.offsetHeight, b = g / 2,
                    y = u ? 0 : v ? g : b, w = u ? v ? g : b : 0;
                !r && R.props.interactive || (R.popperInstance.reference = t({}, R.popperInstance.reference, {
                    clientWidth: 0,
                    clientHeight: 0,
                    getBoundingClientRect: function () {
                        return {
                            width: u ? g : 0,
                            height: u ? 0 : g,
                            top: (c ? l.top : o) - y,
                            bottom: (c ? l.bottom : o) + y,
                            left: (p ? l.left : a) - w,
                            right: (p ? l.right : a) + w
                        }
                    }
                }), R.popperInstance.update()), "initial" === d && R.state.isVisible && q()
            }
        }

        function me(e) {
            R.state.isEnabled && !xe(e) && (R.state.isVisible || (o = e.type, e instanceof MouseEvent && (s = e, ce.forEach((function (t) {
                return t(e)
            })))), "click" === e.type && !1 !== R.props.hideOnClick && R.state.isVisible ? Ce() : Ee(e))
        }

        function ve(e) {
            var t = u(e.target, C) === D, n = h(e.target, (function (e) {
                return e === i
            }));
            t || n || function (e, t, i, n) {
                if (!e) return !0;
                var a = i.clientX, o = i.clientY, s = n.interactiveBorder, r = n.distance,
                    l = t.top - o > ("top" === e ? s + r : s), d = o - t.bottom > ("bottom" === e ? s + r : s),
                    c = t.left - a > ("left" === e ? s + r : s), p = a - t.right > ("right" === e ? s + r : s);
                return l || d || c || p
            }(oe(D), D.getBoundingClientRect(), e, R.props) && (Q(), Ce())
        }

        function ge(e) {
            if (!xe(e)) return R.props.interactive ? (document.body.addEventListener("mouseleave", Ce), document.addEventListener("mousemove", A), void ce.push(A)) : void Ce()
        }

        function be(e) {
            e.target === Z() && (R.props.interactive && e.relatedTarget && D.contains(e.relatedTarget) || Ce())
        }

        function ye(e) {
            u(e.target, R.props.target) && Ee(e)
        }

        function we(e) {
            u(e.target, R.props.target) && Ce()
        }

        function xe(e) {
            var t = "ontouchstart" in window, i = j(e.type, "touch"), n = R.props.touchHold;
            return t && z && n && !i || z && !n && i
        }

        function Se() {
            !L && S && (L = !0, function (e) {
                e.offsetHeight
            }(D), S())
        }

        function Te() {
            var n = R.props.popperOptions, a = R.popperChildren, o = a.tooltip, s = a.arrow,
                r = X(n, "preventOverflow");

            function l(e) {
                R.props.flip && !R.props.flipOnUpdate && (e.flipped && (R.popperInstance.options.placement = e.placement), _(R.popperInstance.modifiers, !1)), o.setAttribute(m, e.placement), !1 !== e.attributes[v] ? o.setAttribute(v, "") : o.removeAttribute(v), x && x !== e.placement && $ && (o.style.transition = "none", requestAnimationFrame((function () {
                    o.style.transition = ""
                }))), x = e.placement, $ = R.state.isVisible;
                var i = oe(D), n = o.style;
                n.top = n.bottom = n.left = n.right = "", n[i] = -(R.props.distance - 10) + "px";
                var a = r && void 0 !== r.padding ? r.padding : 4, s = "number" == typeof a, l = t({
                    top: s ? a : a.top,
                    bottom: s ? a : a.bottom,
                    left: s ? a : a.left,
                    right: s ? a : a.right
                }, !s && a);
                l[i] = s ? a + R.props.distance : (a[i] || 0) + R.props.distance, R.popperInstance.modifiers.filter((function (e) {
                    return "preventOverflow" === e.name
                }))[0].padding = l, E = l
            }

            var d = t({
                eventsEnabled: !1,
                placement: R.props.placement
            }, n, {
                modifiers: t({}, n ? n.modifiers : {}, {
                    preventOverflow: t({
                        boundariesElement: R.props.boundary,
                        padding: 4
                    }, r),
                    arrow: t({element: s, enabled: !!s}, X(n, "arrow")),
                    flip: t({
                        enabled: R.props.flip,
                        padding: R.props.distance + 4,
                        behavior: R.props.flipBehavior
                    }, X(n, "flip")),
                    offset: t({offset: R.props.offset}, X(n, "offset"))
                }), onCreate: function (e) {
                    l(e), Se(), n && n.onCreate && n.onCreate(e)
                }, onUpdate: function (e) {
                    l(e), Se(), n && n.onUpdate && n.onUpdate(e)
                }
            });
            R.popperInstance = new e(i, D, d)
        }

        function Ee(e, i) {
            if (Pe(), !R.state.isVisible) {
                if (R.props.target) return function (e) {
                    if (e) {
                        var i = u(e.target, R.props.target);
                        i && !i._tippy && pe(i, t({}, R.props, {
                            content: V(n.content, [i]),
                            appendTo: n.appendTo,
                            target: "",
                            showOnInit: !0
                        }))
                    }
                }(e);
                if (P = !0, e && !i && R.props.onTrigger(R, e), R.props.wait) return R.props.wait(R, e);
                ie() && !R.state.isMounted && (R.popperInstance || Te(), document.addEventListener("mousemove", fe)), ee();
                var a = B(R.props.delay, 0, r.delay);
                a ? d = setTimeout((function () {
                    $e()
                }), a) : $e()
            }
        }

        function Ce() {
            if (Pe(), !R.state.isVisible) return q();
            P = !1;
            var e = B(R.props.delay, 1, r.delay);
            e ? g = setTimeout((function () {
                R.state.isVisible && Le()
            }), e) : y = requestAnimationFrame((function () {
                Le()
            }))
        }

        function ke(e) {
            if (!R.props.interactive || !D.contains(e.target)) {
                if (Z().contains(e.target)) {
                    if (z) return;
                    if (R.state.isVisible && j(R.props.trigger, "click")) return
                }
                !0 === R.props.hideOnClick && (Pe(), Le())
            }
        }

        function Pe() {
            clearTimeout(d), clearTimeout(g), cancelAnimationFrame(y)
        }

        function Me(e) {
            K(e = e || {}, r), he();
            var n = R.props, a = U(i, t({}, R.props, e, {ignoreAttributes: !0}));
            a.ignoreAttributes = H(e, "ignoreAttributes") ? e.ignoreAttributes || !1 : n.ignoreAttributes, R.props = a, ue(), Q(), A = Y(ve, a.interactiveDebounce), le(D, n, a), R.popperChildren = J(D), R.popperInstance && (l.some((function (t) {
                return H(e, t) && e[t] !== n[t]
            })) ? (R.popperInstance.destroy(), Te(), R.state.isVisible && R.popperInstance.enableEventListeners(), R.props.followCursor && s && fe(s)) : R.popperInstance.update())
        }

        function $e() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : B(R.props.duration, 0, r.duration[1]);
            if (!R.state.isDestroyed && R.state.isEnabled && (!z || R.props.touch) && !Z().hasAttribute("disabled") && !1 !== R.props.onShow(R)) {
                ee(), D.style.visibility = "visible", R.state.isVisible = !0, R.props.interactive && Z().classList.add(b);
                var t = te();
                G(t.concat(D), 0), S = function () {
                    if (R.state.isVisible) {
                        var i = ie();
                        i && s ? fe(s) : i || R.popperInstance.update(), R.popperChildren.backdrop && (R.popperChildren.content.style.transitionDelay = Math.round(e / 12) + "ms"), R.props.sticky && (G([D], a ? 0 : R.props.updateDuration), function e() {
                            R.popperInstance.scheduleUpdate(), R.state.isMounted ? requestAnimationFrame(e) : G([D], 0)
                        }()), G([D], R.props.updateDuration), G(t, e), W(t, "visible"), function (e, t) {
                            ne(e, (function () {
                                R.props.aria && Z().setAttribute("aria-".concat(R.props.aria), D.id), R.props.onShown(R), R.state.isShown = !0
                            }))
                        }(e)
                    }
                }, function () {
                    L = !1;
                    var e = ie();
                    R.popperInstance ? (_(R.popperInstance.modifiers, R.props.flip), e || (R.popperInstance.reference = i, R.popperInstance.enableEventListeners()), R.popperInstance.scheduleUpdate()) : (Te(), e || R.popperInstance.enableEventListeners());
                    var t = R.props.appendTo, n = "parent" === t ? i.parentNode : V(t, [i]);
                    n.contains(D) || (n.appendChild(D), R.props.onMount(R), R.state.isMounted = !0)
                }()
            }
        }

        function Le() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : B(R.props.duration, 1, r.duration[1]);
            if (!R.state.isDestroyed && (R.state.isEnabled || M) && (!1 !== R.props.onHide(R) || M)) {
                document.removeEventListener("click", ke, !0), D.style.visibility = "hidden", R.state.isVisible = !1, R.state.isShown = !1, $ = !1, R.props.interactive && Z().classList.remove(b);
                var t = te();
                G(t, e), W(t, "hidden"), function (e, t) {
                    ne(e, (function () {
                        !R.state.isVisible && D.parentNode && D.parentNode.contains(D) && (P || q(), R.props.aria && Z().removeAttribute("aria-".concat(R.props.aria)), R.popperInstance.disableEventListeners(), R.popperInstance.options.placement = R.props.placement, D.parentNode.removeChild(D), R.props.onHidden(R), R.state.isMounted = !1)
                    }))
                }(e)
            }
        }
    }

    var ue = !1;

    function he(e, i) {
        K(i || {}, r), ue || (document.addEventListener("touchstart", I, f), window.addEventListener("blur", D), ue = !0);
        var n, a = t({}, r, i);
        n = e, "[object Object]" !== {}.toString.call(n) || n.addEventListener || function (e) {
            var t = {
                isVirtual: !0, attributes: e.attributes || {}, contains: function () {
                }, setAttribute: function (t, i) {
                    e.attributes[t] = i
                }, getAttribute: function (t) {
                    return e.attributes[t]
                }, removeAttribute: function (t) {
                    delete e.attributes[t]
                }, hasAttribute: function (t) {
                    return t in e.attributes
                }, addEventListener: function () {
                }, removeEventListener: function () {
                }, classList: {
                    classNames: {}, add: function (t) {
                        e.classList.classNames[t] = !0
                    }, remove: function (t) {
                        delete e.classList.classNames[t]
                    }, contains: function (t) {
                        return t in e.classList.classNames
                    }
                }
            };
            for (var i in t) e[i] = t[i]
        }(e);
        var o = function (e) {
            if (R(e)) return [e];
            if (e instanceof NodeList) return p(e);
            if (Array.isArray(e)) return e;
            try {
                return p(document.querySelectorAll(e))
            } catch (e) {
                return []
            }
        }(e).reduce((function (e, t) {
            var i = t && pe(t, a);
            return i && e.push(i), e
        }), []);
        return R(e) ? o[0] : o
    }

    return he.version = "4.3.4", he.defaults = r, he.setDefaults = function (e) {
        Object.keys(e).forEach((function (t) {
            r[t] = e[t]
        }))
    }, he.hideAll = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.exclude, i = e.duration;
        p(document.querySelectorAll(C)).forEach((function (e) {
            var n, a = e._tippy;
            if (a) {
                var o = !1;
                t && (o = (n = t)._tippy && !c.call(n, C) ? a.reference === t : e === t.popper), o || a.hide(i)
            }
        }))
    }, he.group = function (e) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = i.delay,
            a = void 0 === n ? e[0].props.delay : n, o = i.duration, s = void 0 === o ? 0 : o, r = !1;

        function l(e) {
            r = e, u()
        }

        function d(t) {
            t._originalProps.onShow(t), e.forEach((function (e) {
                e.set({duration: s}), e.state.isVisible && e.hide()
            })), l(!0)
        }

        function c(e) {
            e._originalProps.onHide(e), l(!1)
        }

        function p(e) {
            e._originalProps.onShown(e), e.set({duration: e._originalProps.duration})
        }

        function u() {
            e.forEach((function (e) {
                e.set({
                    onShow: d,
                    onShown: p,
                    onHide: c,
                    delay: r ? [0, Array.isArray(a) ? a[1] : a] : a,
                    duration: r ? s : e._originalProps.duration
                })
            }))
        }

        e.forEach((function (e) {
            e._originalProps ? e.set(e._originalProps) : e._originalProps = t({}, e.props)
        })), u()
    }, i && setTimeout((function () {
        p(document.querySelectorAll("[data-tippy]")).forEach((function (e) {
            var t = e.getAttribute("data-tippy");
            t && he(e, {content: t})
        }))
    })), he
})), function (e) {
    "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && null !== module && module.exports ? module.exports = e : e()
}((function () {
    var e = Object.assign || window.jQuery && jQuery.extend,
        t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
            return window.setTimeout((function () {
                e()
            }), 25)
        };
    !function () {
        if ("function" == typeof window.CustomEvent) return !1;

        function e(e, t) {
            t = t || {bubbles: !1, cancelable: !1, detail: void 0};
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
        }

        e.prototype = window.Event.prototype, window.CustomEvent = e
    }();
    var i = {textarea: !0, input: !0, select: !0, button: !0}, n = "mousemove", a = "mouseup dragstart", o = "mouseup",
        s = "touchmove", r = "touchend", l = "touchend", d = /\s+/, c = {bubbles: !0, cancelable: !0},
        p = "function" == typeof Symbol ? Symbol("events") : {};

    function u(e) {
        return e[p] || (e[p] = {})
    }

    function h(e, t, i, n, a) {
        t = t.split(d);
        var o, s = u(e), r = t.length;

        function l(e) {
            i(e, n)
        }

        for (; r--;) (s[o = t[r]] || (s[o] = [])).push([i, l]), e.addEventListener(o, l)
    }

    function f(e, t, i, n) {
        t = t.split(d);
        var a, o, s, r = u(e), l = t.length;
        if (r) for (; l--;) if (o = r[a = t[l]]) for (s = o.length; s--;) o[s][0] === i && (e.removeEventListener(a, o[s][1]), o.splice(s, 1))
    }

    function m(t, i, n) {
        var a = function (e) {
            return new CustomEvent(e, c)
        }(i);
        n && e(a, n), t.dispatchEvent(a)
    }

    function v(e) {
        var i = e, n = !1, a = !1;

        function o(e) {
            n ? (i(), t(o), a = !0, n = !1) : a = !1
        }

        this.kick = function (e) {
            n = !0, a || o()
        }, this.end = function (e) {
            var t = i;
            e && (a ? (i = n ? function () {
                t(), e()
            } : e, n = !0) : e())
        }
    }

    function g() {
    }

    function b(e) {
        e.preventDefault()
    }

    function y(e, t) {
        var i, n;
        if (e.identifiedTouch) return e.identifiedTouch(t);
        for (i = -1, n = e.length; ++i < n;) if (e[i].identifier === t) return e[i]
    }

    function w(e, t) {
        var i = y(e.changedTouches, t.identifier);
        if (i && (i.pageX !== t.pageX || i.pageY !== t.pageY)) return i
    }

    function x(e, t) {
        C(e, t, e, T)
    }

    function S(e, t) {
        T()
    }

    function T() {
        f(document, n, x), f(document, a, S)
    }

    function E(e) {
        f(document, s, e.touchmove), f(document, r, e.touchend)
    }

    function C(e, t, i, n) {
        var a = i.pageX - t.pageX, o = i.pageY - t.pageY;
        a * a + o * o < 64 || function (e, t, i, n, a, o) {
            var s = e.targetTouches, r = e.timeStamp - t.timeStamp, l = {
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                startX: t.pageX,
                startY: t.pageY,
                distX: n,
                distY: a,
                deltaX: n,
                deltaY: a,
                pageX: i.pageX,
                pageY: i.pageY,
                velocityX: n / r,
                velocityY: a / r,
                identifier: t.identifier,
                targetTouches: s,
                finger: s ? s.length : 1,
                enableMove: function () {
                    this.moveEnabled = !0, this.enableMove = g, e.preventDefault()
                }
            };
            m(t.target, "movestart", l), o(t)
        }(e, t, i, a, o, n)
    }

    function k(e, t) {
        var i = t.timer;
        t.touch = e, t.timeStamp = e.timeStamp, i.kick()
    }

    function P(e, t) {
        var i = t.target, a = t.event, s = t.timer;
        f(document, n, k), f(document, o, P), $(i, a, s, (function () {
            setTimeout((function () {
                f(i, "click", b)
            }), 0)
        }))
    }

    function M(e, t) {
        var i = t.target, n = t.event, a = t.timer;
        y(e.changedTouches, n.identifier) && (!function (e) {
            f(document, s, e.activeTouchmove), f(document, l, e.activeTouchend)
        }(t), $(i, n, a))
    }

    function $(e, t, i, n) {
        i.end((function () {
            return m(e, "moveend", t), n && n()
        }))
    }

    if (h(document, "mousedown", (function (e) {
            (function (e) {
                return 1 === e.which && !e.ctrlKey && !e.altKey
            })(e) && (function (e) {
                return !!i[e.target.tagName.toLowerCase()]
            }(e) || (h(document, n, x, e), h(document, a, S, e)))
        })), h(document, "touchstart", (function (e) {
            if (!i[e.target.tagName.toLowerCase()]) {
                var t = e.changedTouches[0], n = {
                    target: t.target,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    identifier: t.identifier,
                    touchmove: function (e, t) {
                        !function (e, t) {
                            var i = w(e, t);
                            if (!i) return;
                            C(e, t, i, E)
                        }(e, t)
                    },
                    touchend: function (e, t) {
                        !function (e, t) {
                            if (!y(e.changedTouches, t.identifier)) return;
                            E(t)
                        }(e, t)
                    }
                };
                h(document, s, n.touchmove, n), h(document, r, n.touchend, n)
            }
        })), h(document, "movestart", (function (e) {
            if (!e.defaultPrevented && e.moveEnabled) {
                var t = {
                    startX: e.startX,
                    startY: e.startY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    distX: e.distX,
                    distY: e.distY,
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                    velocityX: e.velocityX,
                    velocityY: e.velocityY,
                    identifier: e.identifier,
                    targetTouches: e.targetTouches,
                    finger: e.finger
                }, i = {
                    target: e.target, event: t, timer: new v((function (e) {
                        (function (e, t, i) {
                            var n = i - e.timeStamp;
                            e.distX = t.pageX - e.startX, e.distY = t.pageY - e.startY, e.deltaX = t.pageX - e.pageX, e.deltaY = t.pageY - e.pageY, e.velocityX = .3 * e.velocityX + .7 * e.deltaX / n, e.velocityY = .3 * e.velocityY + .7 * e.deltaY / n, e.pageX = t.pageX, e.pageY = t.pageY
                        })(t, i.touch, i.timeStamp), m(i.target, "move", t)
                    })), touch: void 0, timeStamp: e.timeStamp
                };
                void 0 === e.identifier ? (h(e.target, "click", b), h(document, n, k, i), h(document, o, P, i)) : (i.activeTouchmove = function (e, t) {
                    !function (e, t) {
                        var i = t.event, n = t.timer, a = w(e, i);
                        a && (e.preventDefault(), i.targetTouches = e.targetTouches, t.touch = a, t.timeStamp = e.timeStamp, n.kick())
                    }(e, t)
                }, i.activeTouchend = function (e, t) {
                    M(e, t)
                }, h(document, s, i.activeTouchmove, i), h(document, l, i.activeTouchend, i))
            }
        })), window.jQuery) {
        var L = "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(" ");
        jQuery.event.special.movestart = {
            setup: function () {
                return h(this, "movestart", z), !1
            }, teardown: function () {
                return f(this, "movestart", z), !1
            }, add: O
        }, jQuery.event.special.move = {
            setup: function () {
                return h(this, "movestart", I), !1
            }, teardown: function () {
                return f(this, "movestart", I), !1
            }, add: O
        }, jQuery.event.special.moveend = {
            setup: function () {
                return h(this, "movestart", A), !1
            }, teardown: function () {
                return f(this, "movestart", A), !1
            }, add: O
        }
    }

    function z(e) {
        e.enableMove()
    }

    function I(e) {
        e.enableMove()
    }

    function A(e) {
        e.enableMove()
    }

    function O(e) {
        var t = e.handler;
        e.handler = function (e) {
            for (var i, n = L.length; n--;) e[i = L[n]] = e.originalEvent[i];
            t.apply(this, arguments)
        }
    }
})), function (e) {
    e.fn.twentytwenty = function (t) {
        t = e.extend({
            default_offset_pct: .5,
            orientation: "horizontal",
            before_label: "Before",
            after_label: "After",
            no_overlay: !1,
            move_slider_on_hover: !1,
            move_with_handle_only: !0,
            click_to_move: !1
        }, t);
        return this.each((function () {
            var i = t.default_offset_pct, n = e(this), a = t.orientation, o = "vertical" === a ? "down" : "left",
                s = "vertical" === a ? "up" : "right";
            if (n.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), !t.no_overlay) {
                n.append("<div class='twentytwenty-overlay'></div>");
                var r = n.find(".twentytwenty-overlay");
                r.append("<div class='twentytwenty-before-label' data-content='" + t.before_label + "'></div>"), r.append("<div class='twentytwenty-after-label' data-content='" + t.after_label + "'></div>")
            }
            var l = n.find("img:first"), d = n.find("img:last");
            n.append("<div class='twentytwenty-handle'></div>");
            var c = n.find(".twentytwenty-handle");
            c.append("<span class='twentytwenty-" + o + "-arrow'></span>"), c.append("<span class='twentytwenty-" + s + "-arrow'></span>"), n.addClass("twentytwenty-container"), l.addClass("twentytwenty-before"), d.addClass("twentytwenty-after");
            var p = function (e) {
                var t, i, o, s = (t = e, i = l.width(), o = l.height(), {
                    w: i + "px",
                    h: o + "px",
                    cw: t * i + "px",
                    ch: t * o + "px"
                });
                c.css("vertical" === a ? "top" : "left", "vertical" === a ? s.ch : s.cw), function (e) {
                    "vertical" === a ? (l.css("clip", "rect(0," + e.w + "," + e.ch + ",0)"), d.css("clip", "rect(" + e.ch + "," + e.w + "," + e.h + ",0)")) : (l.css("clip", "rect(0," + e.cw + "," + e.h + ",0)"), d.css("clip", "rect(0," + e.w + "," + e.h + "," + e.cw + ")")), n.css("height", e.h)
                }(s)
            }, u = function (e, t) {
                var i, n, o;
                return i = "vertical" === a ? (t - f) / v : (e - h) / m, n = 0, o = 1, Math.max(n, Math.min(o, i))
            };
            e(window).on("resize.twentytwenty", (function (e) {
                p(i)
            }));
            var h = 0, f = 0, m = 0, v = 0, g = function (e) {
                ((e.distX > e.distY && e.distX < -e.distY || e.distX < e.distY && e.distX > -e.distY) && "vertical" !== a || (e.distX < e.distY && e.distX < -e.distY || e.distX > e.distY && e.distX > -e.distY) && "vertical" === a) && e.preventDefault(), n.addClass("active"), h = n.offset().left, f = n.offset().top, m = l.width(), v = l.height()
            }, b = function (e) {
                n.hasClass("active") && (i = u(e.pageX, e.pageY), p(i))
            }, y = function () {
                n.removeClass("active")
            }, w = t.move_with_handle_only ? c : n;
            w.on("movestart", g), w.on("move", b), w.on("moveend", y), t.move_slider_on_hover && (n.on("mouseenter", g), n.on("mousemove", b), n.on("mouseleave", y)), c.on("touchmove", (function (e) {
                e.preventDefault()
            })), n.find("img").on("mousedown", (function (e) {
                e.preventDefault()
            })), t.click_to_move && n.on("click", (function (e) {
                h = n.offset().left, f = n.offset().top, m = l.width(), v = l.height(), i = u(e.pageX, e.pageY), p(i)
            })), e(window).trigger("resize.twentytwenty")
        }))
    }
}(jQuery), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, (function () {
    function e() {
    }

    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {}, n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[e] = i[e] || {})[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], a = 0; a < i.length; a++) {
                var o = i[a];
                n && n[o] && (this.off(e, o), delete n[o]), o.apply(this, t)
            }
            return this
        }
    }, t.allOff = function () {
        delete this._events, delete this._onceEvents
    }, e
})), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], (function (i) {
        return t(e, i)
    })) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, (function (e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e, t, a) {
        if (!(this instanceof n)) return new n(e, t, a);
        var o = e;
        return "string" == typeof e && (o = document.querySelectorAll(e)), o ? (this.elements = function (e) {
            return Array.isArray(e) ? e : "object" == typeof e && "number" == typeof e.length ? l.call(e) : [e]
        }(o), this.options = i({}, this.options), "function" == typeof t ? a = t : i(this.options, t), a && this.on("always", a), this.getImages(), s && (this.jqDeferred = new s.Deferred), void setTimeout(this.check.bind(this))) : void r.error("Bad element for imagesLoaded " + (o || e))
    }

    function a(e) {
        this.img = e
    }

    function o(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }

    var s = e.jQuery, r = e.console, l = Array.prototype.slice;
    n.prototype = Object.create(t.prototype), n.prototype.options = {}, n.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, n.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var a = i[n];
                this.addImage(a)
            }
            if ("string" == typeof this.options.background) {
                var o = e.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var s = o[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {1: !0, 9: !0, 11: !0};
    return n.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
            var a = n && n[2];
            a && this.addBackground(a, e), n = i.exec(t.backgroundImage)
        }
    }, n.prototype.addImage = function (e) {
        var t = new a(e);
        this.images.push(t)
    }, n.prototype.addBackground = function (e, t) {
        var i = new o(e, t);
        this.images.push(i)
    }, n.prototype.check = function () {
        function e(e, i, n) {
            setTimeout((function () {
                t.progress(e, i, n)
            }))
        }

        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach((function (t) {
            t.once("progress", e), t.check()
        })) : void this.complete()
    }, n.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && r && r.log("progress: " + i, e, t)
    }, n.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, a.prototype = Object.create(t.prototype), a.prototype.check = function () {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, a.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth
    }, a.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, a.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, a.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, a.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, a.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, o.prototype = Object.create(a.prototype), o.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, o.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, o.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, n.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery) && ((s = t).fn.imagesLoaded = function (e, t) {
            return new n(this, e, t).jqDeferred.promise(s(this))
        })
    }, n.makeJQueryPlugin(), n
})), function (e, t, i) {
    function n(e, t) {
        return typeof e === t
    }

    function a(e) {
        return e.replace(/([a-z])-([a-z])/g, (function (e, t, i) {
            return t + i.toUpperCase()
        })).replace(/^-/, "")
    }

    function o(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function s() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : w ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function r(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    function l(t, i, n) {
        var a;
        if ("getComputedStyle" in e) {
            a = getComputedStyle.call(e, t, i);
            var o = e.console;
            if (null !== a) n && (a = a.getPropertyValue(n)); else if (o) {
                o[o.error ? "error" : "log"].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
            }
        } else a = !i && t.currentStyle && t.currentStyle[n];
        return a
    }

    function d(e) {
        return e.replace(/([A-Z])/g, (function (e, t) {
            return "-" + t.toLowerCase()
        })).replace(/^ms-/, "-ms-")
    }

    function c(e, i, n, a) {
        var o, r, l, d, c = "modernizr", p = s("div"), u = function () {
            var e = t.body;
            return e || ((e = s(w ? "svg" : "body")).fake = !0), e
        }();
        if (parseInt(n, 10)) for (; n--;) (l = s("div")).id = a ? a[n] : c + (n + 1), p.appendChild(l);
        return (o = s("style")).type = "text/css", o.id = "s" + c, (u.fake ? u : p).appendChild(o), u.appendChild(p), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), p.id = c, u.fake && (u.style.background = "", u.style.overflow = "hidden", d = y.style.overflow, y.style.overflow = "hidden", y.appendChild(u)), r = i(p, e), u.fake ? (u.parentNode.removeChild(u), y.style.overflow = d, y.offsetHeight) : p.parentNode.removeChild(p), !!r
    }

    function p(t, n) {
        var a = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; a--;) if (e.CSS.supports(d(t[a]), n)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var o = []; a--;) o.push("(" + d(t[a]) + ":" + n + ")");
            return c("@supports (" + (o = o.join(" or ")) + ") { #modernizr { position: absolute; } }", (function (e) {
                return "absolute" == l(e, null, "position")
            }))
        }
        return i
    }

    function u(e, t, r, l) {
        function d() {
            u && (delete C.style, delete C.modElem)
        }

        if (l = !n(l, "undefined") && l, !n(r, "undefined")) {
            var c = p(e, r);
            if (!n(c, "undefined")) return c
        }
        for (var u, h, f, m, v, g = ["modernizr", "tspan", "samp"]; !C.style && g.length;) u = !0, C.modElem = s(g.shift()), C.style = C.modElem.style;
        for (f = e.length, h = 0; f > h; h++) if (m = e[h], v = C.style[m], o(m, "-") && (m = a(m)), C.style[m] !== i) {
            if (l || n(r, "undefined")) return d(), "pfx" != t || m;
            try {
                C.style[m] = r
            } catch (e) {
            }
            if (C.style[m] != v) return d(), "pfx" != t || m
        }
        return d(), !1
    }

    function h(e, t, i, a, o) {
        var s = e.charAt(0).toUpperCase() + e.slice(1), l = (e + " " + T.join(s + " ") + s).split(" ");
        return n(t, "string") || n(t, "undefined") ? u(l, t, a, o) : function (e, t, i) {
            var a;
            for (var o in e) if (e[o] in t) return !1 === i ? e[o] : n(a = t[e[o]], "function") ? r(a, i || t) : a;
            return !1
        }(l = (e + " " + S.join(s + " ") + s).split(" "), t, i)
    }

    function f(e, t, n) {
        return h(e, i, i, t, n)
    }

    var m = [], v = [], g = {
        _version: "3.6.0",
        _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
        _q: [],
        on: function (e, t) {
            var i = this;
            setTimeout((function () {
                t(i[e])
            }), 0)
        },
        addTest: function (e, t, i) {
            v.push({name: e, fn: t, options: i})
        },
        addAsyncTest: function (e) {
            v.push({name: null, fn: e})
        }
    }, b = function () {
    };
    b.prototype = g, b = new b;
    var y = t.documentElement, w = "svg" === y.nodeName.toLowerCase(), x = "Moz O ms Webkit",
        S = g._config.usePrefixes ? x.toLowerCase().split(" ") : [];
    g._domPrefixes = S;
    var T = g._config.usePrefixes ? x.split(" ") : [];
    g._cssomPrefixes = T;
    var E = {elem: s("modernizr")};
    b._q.push((function () {
        delete E.elem
    }));
    var C = {style: E.elem.style};
    b._q.unshift((function () {
        delete C.style
    })), g.testAllProps = h, g.testAllProps = f, b.addTest("cssgridlegacy", f("grid-columns", "10px", !0)), b.addTest("cssgrid", f("grid-template-rows", "none", !0)), function () {
        var e, t, i, a, o, s;
        for (var r in v) if (v.hasOwnProperty(r)) {
            if (e = [], (t = v[r]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
            for (a = n(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) 1 === (s = e[o].split(".")).length ? b[s[0]] = a : (!b[s[0]] || b[s[0]] instanceof Boolean || (b[s[0]] = new Boolean(b[s[0]])), b[s[0]][s[1]] = a), m.push((a ? "" : "no-") + s.join("-"))
        }
    }(), function (e) {
        var t = y.className, i = b._config.classPrefix || "";
        if (w && (t = t.baseVal), b._config.enableJSClass) {
            var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
            t = t.replace(n, "$1" + i + "js$2")
        }
        b._config.enableClasses && (t += " " + i + e.join(" " + i), w ? y.className.baseVal = t : y.className = t)
    }(m), delete g.addTest, delete g.addAsyncTest;
    for (var k = 0; k < b._q.length; k++) b._q[k]();
    e.Modernizr = b
}(window, document);