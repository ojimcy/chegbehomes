!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
          {}),
        t.jQuery,
        t.Popper
      );
})(this, function (t, e, i) {
  "use strict";
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function s(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function o() {
    return (o =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = arguments[e];
          for (var n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
        }
        return t;
      }).apply(this, arguments);
  }
  (e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e),
    (i =
      i && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i);
  var r = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var i = t.getAttribute("href");
        e = i && "#" !== i ? i.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var i = e(t).css("transition-duration"),
        n = e(t).css("transition-delay"),
        s = parseFloat(i),
        o = parseFloat(n);
      return s || o
        ? ((i = i.split(",")[0]),
          (n = n.split(",")[0]),
          1e3 * (parseFloat(i) + parseFloat(n)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      e(t).trigger("transitionend");
    },
    supportsTransitionEnd: function () {
      return Boolean("transitionend");
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, i) {
      for (var n in i)
        if (Object.prototype.hasOwnProperty.call(i, n)) {
          var s = i[n],
            o = e[n],
            a =
              o && r.isElement(o)
                ? "element"
                : null === (l = o) || void 0 === l
                ? "" + l
                : {}.toString
                    .call(l)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
          if (!new RegExp(s).test(a))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                n +
                '" provided type "' +
                a +
                '" but expected type "' +
                s +
                '".'
            );
        }
      var l;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? r.findShadowRoot(t.parentNode)
        : null;
    },
    jQueryDetection: function () {
      if (void 0 === e)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = e.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        t[0] >= 4
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    },
  };
  r.jQueryDetection(),
    (e.fn.emulateTransitionEnd = function (t) {
      var i = this,
        n = !1;
      return (
        e(this).one(r.TRANSITION_END, function () {
          n = !0;
        }),
        setTimeout(function () {
          n || r.triggerTransitionEnd(i);
        }, t),
        this
      );
    }),
    (e.event.special[r.TRANSITION_END] = {
      bindType: "transitionend",
      delegateType: "transitionend",
      handle: function (t) {
        if (e(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var a = "alert",
    l = e.fn[a],
    h = (function () {
      function t(t) {
        this._element = t;
      }
      var i = t.prototype;
      return (
        (i.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (i.dispose = function () {
          e.removeData(this._element, "bs.alert"), (this._element = null);
        }),
        (i._getRootElement = function (t) {
          var i = r.getSelectorFromElement(t),
            n = !1;
          return (
            i && (n = document.querySelector(i)),
            n || (n = e(t).closest(".alert")[0]),
            n
          );
        }),
        (i._triggerCloseEvent = function (t) {
          var i = e.Event("close.bs.alert");
          return e(t).trigger(i), i;
        }),
        (i._removeElement = function (t) {
          var i = this;
          if ((e(t).removeClass("show"), e(t).hasClass("fade"))) {
            var n = r.getTransitionDurationFromElement(t);
            e(t)
              .one(r.TRANSITION_END, function (e) {
                return i._destroyElement(t, e);
              })
              .emulateTransitionEnd(n);
          } else this._destroyElement(t);
        }),
        (i._destroyElement = function (t) {
          e(t).detach().trigger("closed.bs.alert").remove();
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this),
              s = n.data("bs.alert");
            s || ((s = new t(this)), n.data("bs.alert", s)),
              "close" === i && s[i](this);
          });
        }),
        (t._handleDismiss = function (t) {
          return function (e) {
            e && e.preventDefault(), t.close(this);
          };
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.alert.data-api",
    '[data-dismiss="alert"]',
    h._handleDismiss(new h())
  ),
    (e.fn[a] = h._jQueryInterface),
    (e.fn[a].Constructor = h),
    (e.fn[a].noConflict = function () {
      return (e.fn[a] = l), h._jQueryInterface;
    });
  var c = e.fn.button,
    u = (function () {
      function t(t) {
        this._element = t;
      }
      var i = t.prototype;
      return (
        (i.toggle = function () {
          var t = !0,
            i = !0,
            n = e(this._element).closest('[data-toggle="buttons"]')[0];
          if (n) {
            var s = this._element.querySelector('input:not([type="hidden"])');
            if (s) {
              if ("radio" === s.type)
                if (s.checked && this._element.classList.contains("active"))
                  t = !1;
                else {
                  var o = n.querySelector(".active");
                  o && e(o).removeClass("active");
                }
              t &&
                (("checkbox" !== s.type && "radio" !== s.type) ||
                  (s.checked = !this._element.classList.contains("active")),
                e(s).trigger("change")),
                s.focus(),
                (i = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (i &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains("active")
              ),
            t && e(this._element).toggleClass("active"));
        }),
        (i.dispose = function () {
          e.removeData(this._element, "bs.button"), (this._element = null);
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this).data("bs.button");
            n || ((n = new t(this)), e(this).data("bs.button", n)),
              "toggle" === i && n[i]();
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on("click.bs.button.data-api", '[data-toggle^="button"]', function (t) {
      var i = t.target,
        n = i;
      if (
        (e(i).hasClass("btn") || (i = e(i).closest(".btn")[0]),
        !i || i.hasAttribute("disabled") || i.classList.contains("disabled"))
      )
        t.preventDefault();
      else {
        var s = i.querySelector('input:not([type="hidden"])');
        if (
          s &&
          (s.hasAttribute("disabled") || s.classList.contains("disabled"))
        )
          return void t.preventDefault();
        ("LABEL" !== n.tagName || (s && "checkbox" !== s.type)) &&
          u._jQueryInterface.call(e(i), "toggle");
      }
    })
    .on(
      "focus.bs.button.data-api blur.bs.button.data-api",
      '[data-toggle^="button"]',
      function (t) {
        var i = e(t.target).closest(".btn")[0];
        e(i).toggleClass("focus", /^focus(in)?$/.test(t.type));
      }
    ),
    e(window).on("load.bs.button.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-toggle="buttons"] .btn')
          ),
          e = 0,
          i = t.length;
        e < i;
        e++
      ) {
        var n = t[e],
          s = n.querySelector('input:not([type="hidden"])');
        s.checked || s.hasAttribute("checked")
          ? n.classList.add("active")
          : n.classList.remove("active");
      }
      for (
        var o = 0,
          r = (t = [].slice.call(
            document.querySelectorAll('[data-toggle="button"]')
          )).length;
        o < r;
        o++
      ) {
        var a = t[o];
        "true" === a.getAttribute("aria-pressed")
          ? a.classList.add("active")
          : a.classList.remove("active");
      }
    }),
    (e.fn.button = u._jQueryInterface),
    (e.fn.button.Constructor = u),
    (e.fn.button.noConflict = function () {
      return (e.fn.button = c), u._jQueryInterface;
    });
  var d = "carousel",
    p = e.fn[d],
    f = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    g = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    m = { TOUCH: "touch", PEN: "pen" },
    _ = (function () {
      function t(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(
            ".carousel-indicators"
          )),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var i = t.prototype;
      return (
        (i.next = function () {
          this._isSliding || this._slide("next");
        }),
        (i.nextWhenVisible = function () {
          !document.hidden &&
            e(this._element).is(":visible") &&
            "hidden" !== e(this._element).css("visibility") &&
            this.next();
        }),
        (i.prev = function () {
          this._isSliding || this._slide("prev");
        }),
        (i.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(
              ".carousel-item-next, .carousel-item-prev"
            ) && (r.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (i.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (i.to = function (t) {
          var i = this;
          this._activeElement = this._element.querySelector(
            ".active.carousel-item"
          );
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              e(this._element).one("slid.bs.carousel", function () {
                return i.to(t);
              });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var s = t > n ? "next" : "prev";
              this._slide(s, this._items[t]);
            }
        }),
        (i.dispose = function () {
          e(this._element).off(".bs.carousel"),
            e.removeData(this._element, "bs.carousel"),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (i._getConfig = function (t) {
          return (t = o({}, f, t)), r.typeCheckConfig(d, t, g), t;
        }),
        (i._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            (this.touchDeltaX = 0), e > 0 && this.prev(), e < 0 && this.next();
          }
        }),
        (i._addEventListeners = function () {
          var t = this;
          this._config.keyboard &&
            e(this._element).on("keydown.bs.carousel", function (e) {
              return t._keydown(e);
            }),
            "hover" === this._config.pause &&
              e(this._element)
                .on("mouseenter.bs.carousel", function (e) {
                  return t.pause(e);
                })
                .on("mouseleave.bs.carousel", function (e) {
                  return t.cycle(e);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (i._addTouchEventListeners = function () {
          var t = this;
          if (this._touchSupported) {
            var i = function (e) {
                t._pointerEvent && m[e.originalEvent.pointerType.toUpperCase()]
                  ? (t.touchStartX = e.originalEvent.clientX)
                  : t._pointerEvent ||
                    (t.touchStartX = e.originalEvent.touches[0].clientX);
              },
              n = function (e) {
                t._pointerEvent &&
                  m[e.originalEvent.pointerType.toUpperCase()] &&
                  (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                  t._handleSwipe(),
                  "hover" === t._config.pause &&
                    (t.pause(),
                    t.touchTimeout && clearTimeout(t.touchTimeout),
                    (t.touchTimeout = setTimeout(function (e) {
                      return t.cycle(e);
                    }, 500 + t._config.interval)));
              };
            e(this._element.querySelectorAll(".carousel-item img")).on(
              "dragstart.bs.carousel",
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (e(this._element).on("pointerdown.bs.carousel", function (t) {
                    return i(t);
                  }),
                  e(this._element).on("pointerup.bs.carousel", function (t) {
                    return n(t);
                  }),
                  this._element.classList.add("pointer-event"))
                : (e(this._element).on("touchstart.bs.carousel", function (t) {
                    return i(t);
                  }),
                  e(this._element).on("touchmove.bs.carousel", function (e) {
                    return (function (e) {
                      e.originalEvent.touches &&
                      e.originalEvent.touches.length > 1
                        ? (t.touchDeltaX = 0)
                        : (t.touchDeltaX =
                            e.originalEvent.touches[0].clientX - t.touchStartX);
                    })(e);
                  }),
                  e(this._element).on("touchend.bs.carousel", function (t) {
                    return n(t);
                  }));
          }
        }),
        (i._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (i._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item"))
                : []),
            this._items.indexOf(t)
          );
        }),
        (i._getItemByDirection = function (t, e) {
          var i = "next" === t,
            n = "prev" === t,
            s = this._getItemIndex(e),
            o = this._items.length - 1;
          if (((n && 0 === s) || (i && s === o)) && !this._config.wrap)
            return e;
          var r = (s + ("prev" === t ? -1 : 1)) % this._items.length;
          return -1 === r
            ? this._items[this._items.length - 1]
            : this._items[r];
        }),
        (i._triggerSlideEvent = function (t, i) {
          var n = this._getItemIndex(t),
            s = this._getItemIndex(
              this._element.querySelector(".active.carousel-item")
            ),
            o = e.Event("slide.bs.carousel", {
              relatedTarget: t,
              direction: i,
              from: s,
              to: n,
            });
          return e(this._element).trigger(o), o;
        }),
        (i._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var i = [].slice.call(
              this._indicatorsElement.querySelectorAll(".active")
            );
            e(i).removeClass("active");
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && e(n).addClass("active");
          }
        }),
        (i._slide = function (t, i) {
          var n,
            s,
            o,
            a = this,
            l = this._element.querySelector(".active.carousel-item"),
            h = this._getItemIndex(l),
            c = i || (l && this._getItemByDirection(t, l)),
            u = this._getItemIndex(c),
            d = Boolean(this._interval);
          if (
            ("next" === t
              ? ((n = "carousel-item-left"),
                (s = "carousel-item-next"),
                (o = "left"))
              : ((n = "carousel-item-right"),
                (s = "carousel-item-prev"),
                (o = "right")),
            c && e(c).hasClass("active"))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(c, o).isDefaultPrevented() &&
            l &&
            c
          ) {
            (this._isSliding = !0),
              d && this.pause(),
              this._setActiveIndicatorElement(c);
            var p = e.Event("slid.bs.carousel", {
              relatedTarget: c,
              direction: o,
              from: h,
              to: u,
            });
            if (e(this._element).hasClass("slide")) {
              e(c).addClass(s), r.reflow(c), e(l).addClass(n), e(c).addClass(n);
              var f = parseInt(c.getAttribute("data-interval"), 10);
              f
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = f))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
              var g = r.getTransitionDurationFromElement(l);
              e(l)
                .one(r.TRANSITION_END, function () {
                  e(c)
                    .removeClass(n + " " + s)
                    .addClass("active"),
                    e(l).removeClass("active " + s + " " + n),
                    (a._isSliding = !1),
                    setTimeout(function () {
                      return e(a._element).trigger(p);
                    }, 0);
                })
                .emulateTransitionEnd(g);
            } else
              e(l).removeClass("active"),
                e(c).addClass("active"),
                (this._isSliding = !1),
                e(this._element).trigger(p);
            d && this.cycle();
          }
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this).data("bs.carousel"),
              s = o({}, f, e(this).data());
            "object" == typeof i && (s = o({}, s, i));
            var r = "string" == typeof i ? i : s.slide;
            if (
              (n || ((n = new t(this, s)), e(this).data("bs.carousel", n)),
              "number" == typeof i)
            )
              n.to(i);
            else if ("string" == typeof r) {
              if (void 0 === n[r])
                throw new TypeError('No method named "' + r + '"');
              n[r]();
            } else s.interval && s.ride && (n.pause(), n.cycle());
          });
        }),
        (t._dataApiClickHandler = function (i) {
          var n = r.getSelectorFromElement(this);
          if (n) {
            var s = e(n)[0];
            if (s && e(s).hasClass("carousel")) {
              var a = o({}, e(s).data(), e(this).data()),
                l = this.getAttribute("data-slide-to");
              l && (a.interval = !1),
                t._jQueryInterface.call(e(s), a),
                l && e(s).data("bs.carousel").to(l),
                i.preventDefault();
            }
          }
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return f;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    _._dataApiClickHandler
  ),
    e(window).on("load.bs.carousel.data-api", function () {
      for (
        var t = [].slice.call(
            document.querySelectorAll('[data-ride="carousel"]')
          ),
          i = 0,
          n = t.length;
        i < n;
        i++
      ) {
        var s = e(t[i]);
        _._jQueryInterface.call(s, s.data());
      }
    }),
    (e.fn[d] = _._jQueryInterface),
    (e.fn[d].Constructor = _),
    (e.fn[d].noConflict = function () {
      return (e.fn[d] = p), _._jQueryInterface;
    });
  var v = "collapse",
    y = e.fn[v],
    w = { toggle: !0, parent: "" },
    b = { toggle: "boolean", parent: "(string|element)" },
    C = (function () {
      function t(t, e) {
        (this._isTransitioning = !1),
          (this._element = t),
          (this._config = this._getConfig(e)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                t.id +
                '"],[data-toggle="collapse"][data-target="#' +
                t.id +
                '"]'
            )
          ));
        for (
          var i = [].slice.call(
              document.querySelectorAll('[data-toggle="collapse"]')
            ),
            n = 0,
            s = i.length;
          n < s;
          n++
        ) {
          var o = i[n],
            a = r.getSelectorFromElement(o),
            l = [].slice
              .call(document.querySelectorAll(a))
              .filter(function (e) {
                return e === t;
              });
          null !== a &&
            l.length > 0 &&
            ((this._selector = a), this._triggerArray.push(o));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var i = t.prototype;
      return (
        (i.toggle = function () {
          e(this._element).hasClass("show") ? this.hide() : this.show();
        }),
        (i.show = function () {
          var i,
            n,
            s = this;
          if (
            !(
              this._isTransitioning ||
              e(this._element).hasClass("show") ||
              (this._parent &&
                0 ===
                  (i = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (t) {
                      return "string" == typeof s._config.parent
                        ? t.getAttribute("data-parent") === s._config.parent
                        : t.classList.contains("collapse");
                    })).length &&
                (i = null),
              i &&
                (n = e(i).not(this._selector).data("bs.collapse")) &&
                n._isTransitioning)
            )
          ) {
            var o = e.Event("show.bs.collapse");
            if ((e(this._element).trigger(o), !o.isDefaultPrevented())) {
              i &&
                (t._jQueryInterface.call(e(i).not(this._selector), "hide"),
                n || e(i).data("bs.collapse", null));
              var a = this._getDimension();
              e(this._element).removeClass("collapse").addClass("collapsing"),
                (this._element.style[a] = 0),
                this._triggerArray.length &&
                  e(this._triggerArray)
                    .removeClass("collapsed")
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var l = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                h = r.getTransitionDurationFromElement(this._element);
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  e(s._element)
                    .removeClass("collapsing")
                    .addClass("collapse show"),
                    (s._element.style[a] = ""),
                    s.setTransitioning(!1),
                    e(s._element).trigger("shown.bs.collapse");
                })
                .emulateTransitionEnd(h),
                (this._element.style[a] = this._element[l] + "px");
            }
          }
        }),
        (i.hide = function () {
          var t = this;
          if (!this._isTransitioning && e(this._element).hasClass("show")) {
            var i = e.Event("hide.bs.collapse");
            if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
              var n = this._getDimension();
              (this._element.style[n] =
                this._element.getBoundingClientRect()[n] + "px"),
                r.reflow(this._element),
                e(this._element)
                  .addClass("collapsing")
                  .removeClass("collapse show");
              var s = this._triggerArray.length;
              if (s > 0)
                for (var o = 0; o < s; o++) {
                  var a = this._triggerArray[o],
                    l = r.getSelectorFromElement(a);
                  null !== l &&
                    (e([].slice.call(document.querySelectorAll(l))).hasClass(
                      "show"
                    ) ||
                      e(a).addClass("collapsed").attr("aria-expanded", !1));
                }
              this.setTransitioning(!0), (this._element.style[n] = "");
              var h = r.getTransitionDurationFromElement(this._element);
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    e(t._element)
                      .removeClass("collapsing")
                      .addClass("collapse")
                      .trigger("hidden.bs.collapse");
                })
                .emulateTransitionEnd(h);
            }
          }
        }),
        (i.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (i.dispose = function () {
          e.removeData(this._element, "bs.collapse"),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (i._getConfig = function (t) {
          return (
            ((t = o({}, w, t)).toggle = Boolean(t.toggle)),
            r.typeCheckConfig(v, t, b),
            t
          );
        }),
        (i._getDimension = function () {
          return e(this._element).hasClass("width") ? "width" : "height";
        }),
        (i._getParent = function () {
          var i,
            n = this;
          r.isElement(this._config.parent)
            ? ((i = this._config.parent),
              void 0 !== this._config.parent.jquery &&
                (i = this._config.parent[0]))
            : (i = document.querySelector(this._config.parent));
          var s =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            o = [].slice.call(i.querySelectorAll(s));
          return (
            e(o).each(function (e, i) {
              n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i]);
            }),
            i
          );
        }),
        (i._addAriaAndCollapsedClass = function (t, i) {
          var n = e(t).hasClass("show");
          i.length &&
            e(i).toggleClass("collapsed", !n).attr("aria-expanded", n);
        }),
        (t._getTargetFromElement = function (t) {
          var e = r.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this),
              s = n.data("bs.collapse"),
              r = o({}, w, n.data(), "object" == typeof i && i ? i : {});
            if (
              (!s &&
                r.toggle &&
                "string" == typeof i &&
                /show|hide/.test(i) &&
                (r.toggle = !1),
              s || ((s = new t(this, r)), n.data("bs.collapse", s)),
              "string" == typeof i)
            ) {
              if (void 0 === s[i])
                throw new TypeError('No method named "' + i + '"');
              s[i]();
            }
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return w;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.collapse.data-api",
    '[data-toggle="collapse"]',
    function (t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var i = e(this),
        n = r.getSelectorFromElement(this),
        s = [].slice.call(document.querySelectorAll(n));
      e(s).each(function () {
        var t = e(this),
          n = t.data("bs.collapse") ? "toggle" : i.data();
        C._jQueryInterface.call(t, n);
      });
    }
  ),
    (e.fn[v] = C._jQueryInterface),
    (e.fn[v].Constructor = C),
    (e.fn[v].noConflict = function () {
      return (e.fn[v] = y), C._jQueryInterface;
    });
  var E = "dropdown",
    T = e.fn[E],
    x = new RegExp("38|40|27"),
    k = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    S = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    j = (function () {
      function t(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var n = t.prototype;
      return (
        (n.toggle = function () {
          if (
            !this._element.disabled &&
            !e(this._element).hasClass("disabled")
          ) {
            var i = e(this._menu).hasClass("show");
            t._clearMenus(), i || this.show(!0);
          }
        }),
        (n.show = function (n) {
          if (
            (void 0 === n && (n = !1),
            !(
              this._element.disabled ||
              e(this._element).hasClass("disabled") ||
              e(this._menu).hasClass("show")
            ))
          ) {
            var s = { relatedTarget: this._element },
              o = e.Event("show.bs.dropdown", s),
              a = t._getParentFromElement(this._element);
            if ((e(a).trigger(o), !o.isDefaultPrevented())) {
              if (!this._inNavbar && n) {
                if (void 0 === i)
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                  );
                var l = this._element;
                "parent" === this._config.reference
                  ? (l = a)
                  : r.isElement(this._config.reference) &&
                    ((l = this._config.reference),
                    void 0 !== this._config.reference.jquery &&
                      (l = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary &&
                    e(a).addClass("position-static"),
                  (this._popper = new i(
                    l,
                    this._menu,
                    this._getPopperConfig()
                  ));
              }
              "ontouchstart" in document.documentElement &&
                0 === e(a).closest(".navbar-nav").length &&
                e(document.body).children().on("mouseover", null, e.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                e(this._menu).toggleClass("show"),
                e(a)
                  .toggleClass("show")
                  .trigger(e.Event("shown.bs.dropdown", s));
            }
          }
        }),
        (n.hide = function () {
          if (
            !this._element.disabled &&
            !e(this._element).hasClass("disabled") &&
            e(this._menu).hasClass("show")
          ) {
            var i = { relatedTarget: this._element },
              n = e.Event("hide.bs.dropdown", i),
              s = t._getParentFromElement(this._element);
            e(s).trigger(n),
              n.isDefaultPrevented() ||
                (this._popper && this._popper.destroy(),
                e(this._menu).toggleClass("show"),
                e(s)
                  .toggleClass("show")
                  .trigger(e.Event("hidden.bs.dropdown", i)));
          }
        }),
        (n.dispose = function () {
          e.removeData(this._element, "bs.dropdown"),
            e(this._element).off(".bs.dropdown"),
            (this._element = null),
            (this._menu = null),
            null !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (n.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (n._addEventListeners = function () {
          var t = this;
          e(this._element).on("click.bs.dropdown", function (e) {
            e.preventDefault(), e.stopPropagation(), t.toggle();
          });
        }),
        (n._getConfig = function (t) {
          return (
            (t = o({}, this.constructor.Default, e(this._element).data(), t)),
            r.typeCheckConfig(E, t, this.constructor.DefaultType),
            t
          );
        }),
        (n._getMenuElement = function () {
          if (!this._menu) {
            var e = t._getParentFromElement(this._element);
            e && (this._menu = e.querySelector(".dropdown-menu"));
          }
          return this._menu;
        }),
        (n._getPlacement = function () {
          var t = e(this._element.parentNode),
            i = "bottom-start";
          return (
            t.hasClass("dropup")
              ? (i = e(this._menu).hasClass("dropdown-menu-right")
                  ? "top-end"
                  : "top-start")
              : t.hasClass("dropright")
              ? (i = "right-start")
              : t.hasClass("dropleft")
              ? (i = "left-start")
              : e(this._menu).hasClass("dropdown-menu-right") &&
                (i = "bottom-end"),
            i
          );
        }),
        (n._detectNavbar = function () {
          return e(this._element).closest(".navbar").length > 0;
        }),
        (n._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this._config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = o(
                      {},
                      e.offsets,
                      t._config.offset(e.offsets, t._element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this._config.offset),
            e
          );
        }),
        (n._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            o({}, t, this._config.popperConfig)
          );
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this).data("bs.dropdown");
            if (
              (n ||
                ((n = new t(this, "object" == typeof i ? i : null)),
                e(this).data("bs.dropdown", n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw new TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        (t._clearMenus = function (i) {
          if (!i || (3 !== i.which && ("keyup" !== i.type || 9 === i.which)))
            for (
              var n = [].slice.call(
                  document.querySelectorAll('[data-toggle="dropdown"]')
                ),
                s = 0,
                o = n.length;
              s < o;
              s++
            ) {
              var r = t._getParentFromElement(n[s]),
                a = e(n[s]).data("bs.dropdown"),
                l = { relatedTarget: n[s] };
              if ((i && "click" === i.type && (l.clickEvent = i), a)) {
                var h = a._menu;
                if (
                  e(r).hasClass("show") &&
                  !(
                    i &&
                    (("click" === i.type &&
                      /input|textarea/i.test(i.target.tagName)) ||
                      ("keyup" === i.type && 9 === i.which)) &&
                    e.contains(r, i.target)
                  )
                ) {
                  var c = e.Event("hide.bs.dropdown", l);
                  e(r).trigger(c),
                    c.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        e(document.body)
                          .children()
                          .off("mouseover", null, e.noop),
                      n[s].setAttribute("aria-expanded", "false"),
                      a._popper && a._popper.destroy(),
                      e(h).removeClass("show"),
                      e(r)
                        .removeClass("show")
                        .trigger(e.Event("hidden.bs.dropdown", l)));
                }
              }
            }
        }),
        (t._getParentFromElement = function (t) {
          var e,
            i = r.getSelectorFromElement(t);
          return i && (e = document.querySelector(i)), e || t.parentNode;
        }),
        (t._dataApiKeydownHandler = function (i) {
          if (
            !(/input|textarea/i.test(i.target.tagName)
              ? 32 === i.which ||
                (27 !== i.which &&
                  ((40 !== i.which && 38 !== i.which) ||
                    e(i.target).closest(".dropdown-menu").length))
              : !x.test(i.which)) &&
            !this.disabled &&
            !e(this).hasClass("disabled")
          ) {
            var n = t._getParentFromElement(this),
              s = e(n).hasClass("show");
            if (s || 27 !== i.which) {
              if (
                (i.preventDefault(),
                i.stopPropagation(),
                !s || (s && (27 === i.which || 32 === i.which)))
              )
                return (
                  27 === i.which &&
                    e(n.querySelector('[data-toggle="dropdown"]')).trigger(
                      "focus"
                    ),
                  void e(this).trigger("click")
                );
              var o = [].slice
                .call(
                  n.querySelectorAll(
                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                  )
                )
                .filter(function (t) {
                  return e(t).is(":visible");
                });
              if (0 !== o.length) {
                var r = o.indexOf(i.target);
                38 === i.which && r > 0 && r--,
                  40 === i.which && r < o.length - 1 && r++,
                  r < 0 && (r = 0),
                  o[r].focus();
              }
            }
          }
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return k;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return S;
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on(
      "keydown.bs.dropdown.data-api",
      '[data-toggle="dropdown"]',
      j._dataApiKeydownHandler
    )
    .on(
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      j._dataApiKeydownHandler
    )
    .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", j._clearMenus)
    .on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        j._jQueryInterface.call(e(this), "toggle");
    })
    .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
      t.stopPropagation();
    }),
    (e.fn[E] = j._jQueryInterface),
    (e.fn[E].Constructor = j),
    (e.fn[E].noConflict = function () {
      return (e.fn[E] = T), j._jQueryInterface;
    });
  var D = e.fn.modal,
    I = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    A = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    N = (function () {
      function t(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(".modal-dialog")),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var i = t.prototype;
      return (
        (i.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (i.show = function (t) {
          var i = this;
          if (!this._isShown && !this._isTransitioning) {
            e(this._element).hasClass("fade") && (this._isTransitioning = !0);
            var n = e.Event("show.bs.modal", { relatedTarget: t });
            e(this._element).trigger(n),
              this._isShown ||
                n.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(this._element).on(
                  "click.dismiss.bs.modal",
                  '[data-dismiss="modal"]',
                  function (t) {
                    return i.hide(t);
                  }
                ),
                e(this._dialog).on("mousedown.dismiss.bs.modal", function () {
                  e(i._element).one("mouseup.dismiss.bs.modal", function (t) {
                    e(t.target).is(i._element) && (i._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return i._showElement(t);
                }));
          }
        }),
        (i.hide = function (t) {
          var i = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var n = e.Event("hide.bs.modal");
            if (
              (e(this._element).trigger(n),
              this._isShown && !n.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var s = e(this._element).hasClass("fade");
              if (
                (s && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(document).off("focusin.bs.modal"),
                e(this._element).removeClass("show"),
                e(this._element).off("click.dismiss.bs.modal"),
                e(this._dialog).off("mousedown.dismiss.bs.modal"),
                s)
              ) {
                var o = r.getTransitionDurationFromElement(this._element);
                e(this._element)
                  .one(r.TRANSITION_END, function (t) {
                    return i._hideModal(t);
                  })
                  .emulateTransitionEnd(o);
              } else this._hideModal();
            }
          }
        }),
        (i.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return e(t).off(".bs.modal");
          }),
            e(document).off("focusin.bs.modal"),
            e.removeData(this._element, "bs.modal"),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (i.handleUpdate = function () {
          this._adjustDialog();
        }),
        (i._getConfig = function (t) {
          return (t = o({}, I, t)), r.typeCheckConfig("modal", t, A), t;
        }),
        (i._triggerBackdropTransition = function () {
          var t = this;
          if ("static" === this._config.backdrop) {
            var i = e.Event("hidePrevented.bs.modal");
            if ((e(this._element).trigger(i), i.defaultPrevented)) return;
            var n =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            n || (this._element.style.overflowY = "hidden"),
              this._element.classList.add("modal-static");
            var s = r.getTransitionDurationFromElement(this._dialog);
            e(this._element).off(r.TRANSITION_END),
              e(this._element)
                .one(r.TRANSITION_END, function () {
                  t._element.classList.remove("modal-static"),
                    n ||
                      e(t._element)
                        .one(r.TRANSITION_END, function () {
                          t._element.style.overflowY = "";
                        })
                        .emulateTransitionEnd(t._element, s);
                })
                .emulateTransitionEnd(s),
              this._element.focus();
          } else this.hide();
        }),
        (i._showElement = function (t) {
          var i = this,
            n = e(this._element).hasClass("fade"),
            s = this._dialog ? this._dialog.querySelector(".modal-body") : null;
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            e(this._dialog).hasClass("modal-dialog-scrollable") && s
              ? (s.scrollTop = 0)
              : (this._element.scrollTop = 0),
            n && r.reflow(this._element),
            e(this._element).addClass("show"),
            this._config.focus && this._enforceFocus();
          var o = e.Event("shown.bs.modal", { relatedTarget: t }),
            a = function () {
              i._config.focus && i._element.focus(),
                (i._isTransitioning = !1),
                e(i._element).trigger(o);
            };
          if (n) {
            var l = r.getTransitionDurationFromElement(this._dialog);
            e(this._dialog).one(r.TRANSITION_END, a).emulateTransitionEnd(l);
          } else a();
        }),
        (i._enforceFocus = function () {
          var t = this;
          e(document)
            .off("focusin.bs.modal")
            .on("focusin.bs.modal", function (i) {
              document !== i.target &&
                t._element !== i.target &&
                0 === e(t._element).has(i.target).length &&
                t._element.focus();
            });
        }),
        (i._setEscapeEvent = function () {
          var t = this;
          this._isShown
            ? e(this._element).on("keydown.dismiss.bs.modal", function (e) {
                t._config.keyboard && 27 === e.which
                  ? (e.preventDefault(), t.hide())
                  : t._config.keyboard ||
                    27 !== e.which ||
                    t._triggerBackdropTransition();
              })
            : this._isShown || e(this._element).off("keydown.dismiss.bs.modal");
        }),
        (i._setResizeEvent = function () {
          var t = this;
          this._isShown
            ? e(window).on("resize.bs.modal", function (e) {
                return t.handleUpdate(e);
              })
            : e(window).off("resize.bs.modal");
        }),
        (i._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              e(document.body).removeClass("modal-open"),
                t._resetAdjustments(),
                t._resetScrollbar(),
                e(t._element).trigger("hidden.bs.modal");
            });
        }),
        (i._removeBackdrop = function () {
          this._backdrop &&
            (e(this._backdrop).remove(), (this._backdrop = null));
        }),
        (i._showBackdrop = function (t) {
          var i = this,
            n = e(this._element).hasClass("fade") ? "fade" : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = "modal-backdrop"),
              n && this._backdrop.classList.add(n),
              e(this._backdrop).appendTo(document.body),
              e(this._element).on("click.dismiss.bs.modal", function (t) {
                i._ignoreBackdropClick
                  ? (i._ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    i._triggerBackdropTransition();
              }),
              n && r.reflow(this._backdrop),
              e(this._backdrop).addClass("show"),
              !t)
            )
              return;
            if (!n) return void t();
            var s = r.getTransitionDurationFromElement(this._backdrop);
            e(this._backdrop).one(r.TRANSITION_END, t).emulateTransitionEnd(s);
          } else if (!this._isShown && this._backdrop) {
            e(this._backdrop).removeClass("show");
            var o = function () {
              i._removeBackdrop(), t && t();
            };
            if (e(this._element).hasClass("fade")) {
              var a = r.getTransitionDurationFromElement(this._backdrop);
              e(this._backdrop)
                .one(r.TRANSITION_END, o)
                .emulateTransitionEnd(a);
            } else o();
          } else t && t();
        }),
        (i._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (i._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (i._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing =
            Math.round(t.left + t.right) < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (i._setScrollbar = function () {
          var t = this;
          if (this._isBodyOverflowing) {
            var i = [].slice.call(
                document.querySelectorAll(
                  ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
                )
              ),
              n = [].slice.call(document.querySelectorAll(".sticky-top"));
            e(i).each(function (i, n) {
              var s = n.style.paddingRight,
                o = e(n).css("padding-right");
              e(n)
                .data("padding-right", s)
                .css("padding-right", parseFloat(o) + t._scrollbarWidth + "px");
            }),
              e(n).each(function (i, n) {
                var s = n.style.marginRight,
                  o = e(n).css("margin-right");
                e(n)
                  .data("margin-right", s)
                  .css(
                    "margin-right",
                    parseFloat(o) - t._scrollbarWidth + "px"
                  );
              });
            var s = document.body.style.paddingRight,
              o = e(document.body).css("padding-right");
            e(document.body)
              .data("padding-right", s)
              .css(
                "padding-right",
                parseFloat(o) + this._scrollbarWidth + "px"
              );
          }
          e(document.body).addClass("modal-open");
        }),
        (i._resetScrollbar = function () {
          var t = [].slice.call(
            document.querySelectorAll(
              ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
            )
          );
          e(t).each(function (t, i) {
            var n = e(i).data("padding-right");
            e(i).removeData("padding-right"), (i.style.paddingRight = n || "");
          });
          var i = [].slice.call(document.querySelectorAll(".sticky-top"));
          e(i).each(function (t, i) {
            var n = e(i).data("margin-right");
            void 0 !== n &&
              e(i).css("margin-right", n).removeData("margin-right");
          });
          var n = e(document.body).data("padding-right");
          e(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (i._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = "modal-scrollbar-measure"),
            document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (t._jQueryInterface = function (i, n) {
          return this.each(function () {
            var s = e(this).data("bs.modal"),
              r = o({}, I, e(this).data(), "object" == typeof i && i ? i : {});
            if (
              (s || ((s = new t(this, r)), e(this).data("bs.modal", s)),
              "string" == typeof i)
            ) {
              if (void 0 === s[i])
                throw new TypeError('No method named "' + i + '"');
              s[i](n);
            } else r.show && s.show(n);
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return I;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.modal.data-api",
    '[data-toggle="modal"]',
    function (t) {
      var i,
        n = this,
        s = r.getSelectorFromElement(this);
      s && (i = document.querySelector(s));
      var a = e(i).data("bs.modal")
        ? "toggle"
        : o({}, e(i).data(), e(this).data());
      ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
      var l = e(i).one("show.bs.modal", function (t) {
        t.isDefaultPrevented() ||
          l.one("hidden.bs.modal", function () {
            e(n).is(":visible") && n.focus();
          });
      });
      N._jQueryInterface.call(e(i), a, this);
    }
  ),
    (e.fn.modal = N._jQueryInterface),
    (e.fn.modal.Constructor = N),
    (e.fn.modal.noConflict = function () {
      return (e.fn.modal = D), N._jQueryInterface;
    });
  var O = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    Q = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&\/:?]*(?:[#\/?]|$))/gi,
    z =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+\/a-z]+=*$/i;
  function L(t, e, i) {
    if (0 === t.length) return t;
    if (i && "function" == typeof i) return i(t);
    for (
      var n = new window.DOMParser().parseFromString(t, "text/html"),
        s = Object.keys(e),
        o = [].slice.call(n.body.querySelectorAll("*")),
        r = function (t, i) {
          var n = o[t],
            r = n.nodeName.toLowerCase();
          if (-1 === s.indexOf(n.nodeName.toLowerCase()))
            return n.parentNode.removeChild(n), "continue";
          var a = [].slice.call(n.attributes),
            l = [].concat(e["*"] || [], e[r] || []);
          a.forEach(function (t) {
            (function (t, e) {
              var i = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(i))
                return (
                  -1 === O.indexOf(i) ||
                  Boolean(t.nodeValue.match(Q) || t.nodeValue.match(z))
                );
              for (
                var n = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  s = 0,
                  o = n.length;
                s < o;
                s++
              )
                if (i.match(n[s])) return !0;
              return !1;
            })(t, l) || n.removeAttribute(t.nodeName);
          });
        },
        a = 0,
        l = o.length;
      a < l;
      a++
    )
      r(a);
    return n.body.innerHTML;
  }
  var $ = "tooltip",
    P = e.fn[$],
    R = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    M = ["sanitize", "whiteList", "sanitizeFn"],
    q = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    F = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    H = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    B = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    },
    W = (function () {
      function t(t, e) {
        if (void 0 === i)
          throw new TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var n = t.prototype;
      return (
        (n.enable = function () {
          this._isEnabled = !0;
        }),
        (n.disable = function () {
          this._isEnabled = !1;
        }),
        (n.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (n.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var i = this.constructor.DATA_KEY,
                n = e(t.currentTarget).data(i);
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                e(t.currentTarget).data(i, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger()
                  ? n._enter(null, n)
                  : n._leave(null, n);
            } else {
              if (e(this.getTipElement()).hasClass("show"))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (n.dispose = function () {
          clearTimeout(this._timeout),
            e.removeData(this.element, this.constructor.DATA_KEY),
            e(this.element).off(this.constructor.EVENT_KEY),
            e(this.element)
              .closest(".modal")
              .off("hide.bs.modal", this._hideModalHandler),
            this.tip && e(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (n.show = function () {
          var t = this;
          if ("none" === e(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var n = e.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            e(this.element).trigger(n);
            var s = r.findShadowRoot(this.element),
              o = e.contains(
                null !== s ? s : this.element.ownerDocument.documentElement,
                this.element
              );
            if (n.isDefaultPrevented() || !o) return;
            var a = this.getTipElement(),
              l = r.getUID(this.constructor.NAME);
            a.setAttribute("id", l),
              this.element.setAttribute("aria-describedby", l),
              this.setContent(),
              this.config.animation && e(a).addClass("fade");
            var h =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, a, this.element)
                  : this.config.placement,
              c = this._getAttachment(h);
            this.addAttachmentClass(c);
            var u = this._getContainer();
            e(a).data(this.constructor.DATA_KEY, this),
              e.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || e(a).appendTo(u),
              e(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new i(this.element, a, this._getPopperConfig(c))),
              e(a).addClass("show"),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().on("mouseover", null, e.noop);
            var d = function () {
              t.config.animation && t._fixTransition();
              var i = t._hoverState;
              (t._hoverState = null),
                e(t.element).trigger(t.constructor.Event.SHOWN),
                "out" === i && t._leave(null, t);
            };
            if (e(this.tip).hasClass("fade")) {
              var p = r.getTransitionDurationFromElement(this.tip);
              e(this.tip).one(r.TRANSITION_END, d).emulateTransitionEnd(p);
            } else d();
          }
        }),
        (n.hide = function (t) {
          var i = this,
            n = this.getTipElement(),
            s = e.Event(this.constructor.Event.HIDE),
            o = function () {
              "show" !== i._hoverState &&
                n.parentNode &&
                n.parentNode.removeChild(n),
                i._cleanTipClass(),
                i.element.removeAttribute("aria-describedby"),
                e(i.element).trigger(i.constructor.Event.HIDDEN),
                null !== i._popper && i._popper.destroy(),
                t && t();
            };
          if ((e(this.element).trigger(s), !s.isDefaultPrevented())) {
            if (
              (e(n).removeClass("show"),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().off("mouseover", null, e.noop),
              (this._activeTrigger.click = !1),
              (this._activeTrigger.focus = !1),
              (this._activeTrigger.hover = !1),
              e(this.tip).hasClass("fade"))
            ) {
              var a = r.getTransitionDurationFromElement(n);
              e(n).one(r.TRANSITION_END, o).emulateTransitionEnd(a);
            } else o();
            this._hoverState = "";
          }
        }),
        (n.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (n.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (n.addAttachmentClass = function (t) {
          e(this.getTipElement()).addClass("bs-tooltip-" + t);
        }),
        (n.getTipElement = function () {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (n.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(
            e(t.querySelectorAll(".tooltip-inner")),
            this.getTitle()
          ),
            e(t).removeClass("fade show");
        }),
        (n.setElementContent = function (t, i) {
          "object" != typeof i || (!i.nodeType && !i.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (i = L(i, this.config.whiteList, this.config.sanitizeFn)),
                t.html(i))
              : t.text(i)
            : this.config.html
            ? e(i).parent().is(t) || t.empty().append(i)
            : t.text(e(i).text());
        }),
        (n.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (
            t ||
              (t =
                "function" == typeof this.config.title
                  ? this.config.title.call(this.element)
                  : this.config.title),
            t
          );
        }),
        (n._getPopperConfig = function (t) {
          var e = this;
          return o(
            {},
            {
              placement: t,
              modifiers: {
                offset: this._getOffset(),
                flip: { behavior: this.config.fallbackPlacement },
                arrow: { element: ".arrow" },
                preventOverflow: { boundariesElement: this.config.boundary },
              },
              onCreate: function (t) {
                t.originalPlacement !== t.placement &&
                  e._handlePopperPlacementChange(t);
              },
              onUpdate: function (t) {
                return e._handlePopperPlacementChange(t);
              },
            },
            this.config.popperConfig
          );
        }),
        (n._getOffset = function () {
          var t = this,
            e = {};
          return (
            "function" == typeof this.config.offset
              ? (e.fn = function (e) {
                  return (
                    (e.offsets = o(
                      {},
                      e.offsets,
                      t.config.offset(e.offsets, t.element) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this.config.offset),
            e
          );
        }),
        (n._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : r.isElement(this.config.container)
            ? e(this.config.container)
            : e(document).find(this.config.container);
        }),
        (n._getAttachment = function (t) {
          return F[t.toUpperCase()];
        }),
        (n._setListeners = function () {
          var t = this;
          this.config.trigger.split(" ").forEach(function (i) {
            if ("click" === i)
              e(t.element).on(
                t.constructor.Event.CLICK,
                t.config.selector,
                function (e) {
                  return t.toggle(e);
                }
              );
            else if ("manual" !== i) {
              var n =
                  "hover" === i
                    ? t.constructor.Event.MOUSEENTER
                    : t.constructor.Event.FOCUSIN,
                s =
                  "hover" === i
                    ? t.constructor.Event.MOUSELEAVE
                    : t.constructor.Event.FOCUSOUT;
              e(t.element)
                .on(n, t.config.selector, function (e) {
                  return t._enter(e);
                })
                .on(s, t.config.selector, function (e) {
                  return t._leave(e);
                });
            }
          }),
            (this._hideModalHandler = function () {
              t.element && t.hide();
            }),
            e(this.element)
              .closest(".modal")
              .on("hide.bs.modal", this._hideModalHandler),
            this.config.selector
              ? (this.config = o({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (n._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) &&
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (n._enter = function (t, i) {
          var n = this.constructor.DATA_KEY;
          (i = i || e(t.currentTarget).data(n)) ||
            ((i = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            e(t.currentTarget).data(n, i)),
            t &&
              (i._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
            e(i.getTipElement()).hasClass("show") || "show" === i._hoverState
              ? (i._hoverState = "show")
              : (clearTimeout(i._timeout),
                (i._hoverState = "show"),
                i.config.delay && i.config.delay.show
                  ? (i._timeout = setTimeout(function () {
                      "show" === i._hoverState && i.show();
                    }, i.config.delay.show))
                  : i.show());
        }),
        (n._leave = function (t, i) {
          var n = this.constructor.DATA_KEY;
          (i = i || e(t.currentTarget).data(n)) ||
            ((i = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            e(t.currentTarget).data(n, i)),
            t &&
              (i._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
                !1),
            i._isWithActiveTrigger() ||
              (clearTimeout(i._timeout),
              (i._hoverState = "out"),
              i.config.delay && i.config.delay.hide
                ? (i._timeout = setTimeout(function () {
                    "out" === i._hoverState && i.hide();
                  }, i.config.delay.hide))
                : i.hide());
        }),
        (n._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (n._getConfig = function (t) {
          var i = e(this.element).data();
          return (
            Object.keys(i).forEach(function (t) {
              -1 !== M.indexOf(t) && delete i[t];
            }),
            "number" ==
              typeof (t = o(
                {},
                this.constructor.Default,
                i,
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            r.typeCheckConfig($, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = L(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (n._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (n._cleanTipClass = function () {
          var t = e(this.getTipElement()),
            i = t.attr("class").match(R);
          null !== i && i.length && t.removeClass(i.join(""));
        }),
        (n._handlePopperPlacementChange = function (t) {
          (this.tip = t.instance.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (n._fixTransition = function () {
          var t = this.getTipElement(),
            i = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (e(t).removeClass("fade"),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = i));
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this).data("bs.tooltip"),
              s = "object" == typeof i && i;
            if (
              (n || !/dispose|hide/.test(i)) &&
              (n || ((n = new t(this, s)), e(this).data("bs.tooltip", n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw new TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return H;
            },
          },
          {
            key: "NAME",
            get: function () {
              return $;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.tooltip";
            },
          },
          {
            key: "Event",
            get: function () {
              return B;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.tooltip";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return q;
            },
          },
        ]),
        t
      );
    })();
  (e.fn[$] = W._jQueryInterface),
    (e.fn[$].Constructor = W),
    (e.fn[$].noConflict = function () {
      return (e.fn[$] = P), W._jQueryInterface;
    });
  var U = "popover",
    V = e.fn[U],
    X = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    K = o({}, W.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    Y = o({}, W.DefaultType, { content: "(string|element|function)" }),
    Z = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    },
    G = (function (t) {
      var i, n;
      function o() {
        return t.apply(this, arguments) || this;
      }
      (n = t),
        ((i = o).prototype = Object.create(n.prototype)),
        (i.prototype.constructor = i),
        (i.__proto__ = n);
      var r = o.prototype;
      return (
        (r.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (r.addAttachmentClass = function (t) {
          e(this.getTipElement()).addClass("bs-popover-" + t);
        }),
        (r.getTipElement = function () {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (r.setContent = function () {
          var t = e(this.getTipElement());
          this.setElementContent(t.find(".popover-header"), this.getTitle());
          var i = this._getContent();
          "function" == typeof i && (i = i.call(this.element)),
            this.setElementContent(t.find(".popover-body"), i),
            t.removeClass("fade show");
        }),
        (r._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (r._cleanTipClass = function () {
          var t = e(this.getTipElement()),
            i = t.attr("class").match(X);
          null !== i && i.length > 0 && t.removeClass(i.join(""));
        }),
        (o._jQueryInterface = function (t) {
          return this.each(function () {
            var i = e(this).data("bs.popover"),
              n = "object" == typeof t ? t : null;
            if (
              (i || !/dispose|hide/.test(t)) &&
              (i || ((i = new o(this, n)), e(this).data("bs.popover", i)),
              "string" == typeof t)
            ) {
              if (void 0 === i[t])
                throw new TypeError('No method named "' + t + '"');
              i[t]();
            }
          });
        }),
        s(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return K;
            },
          },
          {
            key: "NAME",
            get: function () {
              return U;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return "bs.popover";
            },
          },
          {
            key: "Event",
            get: function () {
              return Z;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return ".bs.popover";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Y;
            },
          },
        ]),
        o
      );
    })(W);
  (e.fn[U] = G._jQueryInterface),
    (e.fn[U].Constructor = G),
    (e.fn[U].noConflict = function () {
      return (e.fn[U] = V), G._jQueryInterface;
    });
  var J = "scrollspy",
    tt = e.fn[J],
    et = { offset: 10, method: "auto", target: "" },
    it = { offset: "number", method: "string", target: "(string|element)" },
    nt = (function () {
      function t(t, i) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(i)),
          (this._selector =
            this._config.target +
            " .nav-link," +
            this._config.target +
            " .list-group-item," +
            this._config.target +
            " .dropdown-item"),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          e(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
            return n._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var i = t.prototype;
      return (
        (i.refresh = function () {
          var t = this,
            i =
              this._scrollElement === this._scrollElement.window
                ? "offset"
                : "position",
            n = "auto" === this._config.method ? i : this._config.method,
            s = "position" === n ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var i,
                  o = r.getSelectorFromElement(t);
                if ((o && (i = document.querySelector(o)), i)) {
                  var a = i.getBoundingClientRect();
                  if (a.width || a.height) return [e(i)[n]().top + s, o];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (e) {
                t._offsets.push(e[0]), t._targets.push(e[1]);
              });
        }),
        (i.dispose = function () {
          e.removeData(this._element, "bs.scrollspy"),
            e(this._scrollElement).off(".bs.scrollspy"),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (i._getConfig = function (t) {
          if (
            "string" !=
              typeof (t = o({}, et, "object" == typeof t && t ? t : {}))
                .target &&
            r.isElement(t.target)
          ) {
            var i = e(t.target).attr("id");
            i || ((i = r.getUID(J)), e(t.target).attr("id", i)),
              (t.target = "#" + i);
          }
          return r.typeCheckConfig(J, t, it), t;
        }),
        (i._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (i._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (i._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (i._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            i = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
            var n = this._targets[this._targets.length - 1];
            this._activeTarget !== n && this._activate(n);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              this._offsets[0] > 0
            )
              return (this._activeTarget = null), void this._clear();
            for (var s = this._offsets.length; s--; )
              this._activeTarget !== this._targets[s] &&
                t >= this._offsets[s] &&
                (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) &&
                this._activate(this._targets[s]);
          }
        }),
        (i._activate = function (t) {
          (this._activeTarget = t), this._clear();
          var i = this._selector.split(",").map(function (e) {
              return (
                e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
              );
            }),
            n = e([].slice.call(document.querySelectorAll(i.join(","))));
          n.hasClass("dropdown-item")
            ? (n
                .closest(".dropdown")
                .find(".dropdown-toggle")
                .addClass("active"),
              n.addClass("active"))
            : (n.addClass("active"),
              n
                .parents(".nav, .list-group")
                .prev(".nav-link, .list-group-item")
                .addClass("active"),
              n
                .parents(".nav, .list-group")
                .prev(".nav-item")
                .children(".nav-link")
                .addClass("active")),
            e(this._scrollElement).trigger("activate.bs.scrollspy", {
              relatedTarget: t,
            });
        }),
        (i._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains("active");
            })
            .forEach(function (t) {
              return t.classList.remove("active");
            });
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this).data("bs.scrollspy");
            if (
              (n ||
                ((n = new t(this, "object" == typeof i && i)),
                e(this).data("bs.scrollspy", n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw new TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "Default",
            get: function () {
              return et;
            },
          },
        ]),
        t
      );
    })();
  e(window).on("load.bs.scrollspy.data-api", function () {
    for (
      var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
        i = t.length;
      i--;

    ) {
      var n = e(t[i]);
      nt._jQueryInterface.call(n, n.data());
    }
  }),
    (e.fn[J] = nt._jQueryInterface),
    (e.fn[J].Constructor = nt),
    (e.fn[J].noConflict = function () {
      return (e.fn[J] = tt), nt._jQueryInterface;
    });
  var st = e.fn.tab,
    ot = (function () {
      function t(t) {
        this._element = t;
      }
      var i = t.prototype;
      return (
        (i.show = function () {
          var t = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                e(this._element).hasClass("active")) ||
              e(this._element).hasClass("disabled")
            )
          ) {
            var i,
              n,
              s = e(this._element).closest(".nav, .list-group")[0],
              o = r.getSelectorFromElement(this._element);
            if (s) {
              var a =
                "UL" === s.nodeName || "OL" === s.nodeName
                  ? "> li > .active"
                  : ".active";
              n = (n = e.makeArray(e(s).find(a)))[n.length - 1];
            }
            var l = e.Event("hide.bs.tab", { relatedTarget: this._element }),
              h = e.Event("show.bs.tab", { relatedTarget: n });
            if (
              (n && e(n).trigger(l),
              e(this._element).trigger(h),
              !h.isDefaultPrevented() && !l.isDefaultPrevented())
            ) {
              o && (i = document.querySelector(o)),
                this._activate(this._element, s);
              var c = function () {
                var i = e.Event("hidden.bs.tab", { relatedTarget: t._element }),
                  s = e.Event("shown.bs.tab", { relatedTarget: n });
                e(n).trigger(i), e(t._element).trigger(s);
              };
              i ? this._activate(i, i.parentNode, c) : c();
            }
          }
        }),
        (i.dispose = function () {
          e.removeData(this._element, "bs.tab"), (this._element = null);
        }),
        (i._activate = function (t, i, n) {
          var s = this,
            o = (
              !i || ("UL" !== i.nodeName && "OL" !== i.nodeName)
                ? e(i).children(".active")
                : e(i).find("> li > .active")
            )[0],
            a = n && o && e(o).hasClass("fade"),
            l = function () {
              return s._transitionComplete(t, o, n);
            };
          if (o && a) {
            var h = r.getTransitionDurationFromElement(o);
            e(o)
              .removeClass("show")
              .one(r.TRANSITION_END, l)
              .emulateTransitionEnd(h);
          } else l();
        }),
        (i._transitionComplete = function (t, i, n) {
          if (i) {
            e(i).removeClass("active");
            var s = e(i.parentNode).find("> .dropdown-menu .active")[0];
            s && e(s).removeClass("active"),
              "tab" === i.getAttribute("role") &&
                i.setAttribute("aria-selected", !1);
          }
          if (
            (e(t).addClass("active"),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            r.reflow(t),
            t.classList.contains("fade") && t.classList.add("show"),
            t.parentNode && e(t.parentNode).hasClass("dropdown-menu"))
          ) {
            var o = e(t).closest(".dropdown")[0];
            if (o) {
              var a = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
              e(a).addClass("active");
            }
            t.setAttribute("aria-expanded", !0);
          }
          n && n();
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this),
              s = n.data("bs.tab");
            if (
              (s || ((s = new t(this)), n.data("bs.tab", s)),
              "string" == typeof i)
            ) {
              if (void 0 === s[i])
                throw new TypeError('No method named "' + i + '"');
              s[i]();
            }
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    "click.bs.tab.data-api",
    '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    function (t) {
      t.preventDefault(), ot._jQueryInterface.call(e(this), "show");
    }
  ),
    (e.fn.tab = ot._jQueryInterface),
    (e.fn.tab.Constructor = ot),
    (e.fn.tab.noConflict = function () {
      return (e.fn.tab = st), ot._jQueryInterface;
    });
  var rt = e.fn.toast,
    at = { animation: "boolean", autohide: "boolean", delay: "number" },
    lt = { animation: !0, autohide: !0, delay: 500 },
    ht = (function () {
      function t(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var i = t.prototype;
      return (
        (i.show = function () {
          var t = this,
            i = e.Event("show.bs.toast");
          if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
            this._clearTimeout(),
              this._config.animation && this._element.classList.add("fade");
            var n = function () {
              t._element.classList.remove("showing"),
                t._element.classList.add("show"),
                e(t._element).trigger("shown.bs.toast"),
                t._config.autohide &&
                  (t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay));
            };
            if (
              (this._element.classList.remove("hide"),
              r.reflow(this._element),
              this._element.classList.add("showing"),
              this._config.animation)
            ) {
              var s = r.getTransitionDurationFromElement(this._element);
              e(this._element).one(r.TRANSITION_END, n).emulateTransitionEnd(s);
            } else n();
          }
        }),
        (i.hide = function () {
          if (this._element.classList.contains("show")) {
            var t = e.Event("hide.bs.toast");
            e(this._element).trigger(t),
              t.isDefaultPrevented() || this._close();
          }
        }),
        (i.dispose = function () {
          this._clearTimeout(),
            this._element.classList.contains("show") &&
              this._element.classList.remove("show"),
            e(this._element).off("click.dismiss.bs.toast"),
            e.removeData(this._element, "bs.toast"),
            (this._element = null),
            (this._config = null);
        }),
        (i._getConfig = function (t) {
          return (
            (t = o(
              {},
              lt,
              e(this._element).data(),
              "object" == typeof t && t ? t : {}
            )),
            r.typeCheckConfig("toast", t, this.constructor.DefaultType),
            t
          );
        }),
        (i._setListeners = function () {
          var t = this;
          e(this._element).on(
            "click.dismiss.bs.toast",
            '[data-dismiss="toast"]',
            function () {
              return t.hide();
            }
          );
        }),
        (i._close = function () {
          var t = this,
            i = function () {
              t._element.classList.add("hide"),
                e(t._element).trigger("hidden.bs.toast");
            };
          if (
            (this._element.classList.remove("show"), this._config.animation)
          ) {
            var n = r.getTransitionDurationFromElement(this._element);
            e(this._element).one(r.TRANSITION_END, i).emulateTransitionEnd(n);
          } else i();
        }),
        (i._clearTimeout = function () {
          clearTimeout(this._timeout), (this._timeout = null);
        }),
        (t._jQueryInterface = function (i) {
          return this.each(function () {
            var n = e(this),
              s = n.data("bs.toast");
            if (
              (s ||
                ((s = new t(this, "object" == typeof i && i)),
                n.data("bs.toast", s)),
              "string" == typeof i)
            ) {
              if (void 0 === s[i])
                throw new TypeError('No method named "' + i + '"');
              s[i](this);
            }
          });
        }),
        s(t, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.5.2";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return at;
            },
          },
          {
            key: "Default",
            get: function () {
              return lt;
            },
          },
        ]),
        t
      );
    })();
  (e.fn.toast = ht._jQueryInterface),
    (e.fn.toast.Constructor = ht),
    (e.fn.toast.noConflict = function () {
      return (e.fn.toast = rt), ht._jQueryInterface;
    }),
    (t.Alert = h),
    (t.Button = u),
    (t.Carousel = _),
    (t.Collapse = C),
    (t.Dropdown = j),
    (t.Modal = N),
    (t.Popover = G),
    (t.Scrollspy = nt),
    (t.Tab = ot),
    (t.Toast = ht),
    (t.Tooltip = W),
    (t.Util = r),
    Object.defineProperty(t, "__esModule", { value: !0 });
}),
  (function (t, e, i, n) {
    function s(e, i) {
      (this.settings = null),
        (this.options = t.extend({}, s.Defaults, i)),
        (this.$element = t(e)),
        (this._handlers = {}),
        (this._plugins = {}),
        (this._supress = {}),
        (this._current = null),
        (this._speed = null),
        (this._coordinates = []),
        (this._breakpoint = null),
        (this._width = null),
        (this._items = []),
        (this._clones = []),
        (this._mergers = []),
        (this._widths = []),
        (this._invalidated = {}),
        (this._pipe = []),
        (this._drag = {
          time: null,
          target: null,
          pointer: null,
          stage: { start: null, current: null },
          direction: null,
        }),
        (this._states = {
          current: {},
          tags: {
            initializing: ["busy"],
            animating: ["busy"],
            dragging: ["interacting"],
          },
        }),
        t.each(
          ["onResize", "onThrottledResize"],
          t.proxy(function (e, i) {
            this._handlers[i] = t.proxy(this[i], this);
          }, this)
        ),
        t.each(
          s.Plugins,
          t.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
          }, this)
        ),
        t.each(
          s.Workers,
          t.proxy(function (e, i) {
            this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
          }, this)
        ),
        this.setup(),
        this.initialize();
    }
    (s.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      rewind: !1,
      checkVisibility: !0,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: e,
      fallbackEasing: "swing",
      slideTransition: "",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      refreshClass: "owl-refresh",
      loadedClass: "owl-loaded",
      loadingClass: "owl-loading",
      rtlClass: "owl-rtl",
      responsiveClass: "owl-responsive",
      dragClass: "owl-drag",
      itemClass: "owl-item",
      stageClass: "owl-stage",
      stageOuterClass: "owl-stage-outer",
      grabClass: "owl-grab",
    }),
      (s.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
      (s.Type = { Event: "event", State: "state" }),
      (s.Plugins = {}),
      (s.Workers = [
        {
          filter: ["width", "settings"],
          run: function () {
            this._width = this.$element.width();
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            t.current =
              this._items && this._items[this.relative(this._current)];
          },
        },
        {
          filter: ["items", "settings"],
          run: function () {
            this.$stage.children(".cloned").remove();
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e = this.settings.margin || "",
              i = !this.settings.autoWidth,
              n = this.settings.rtl,
              s = {
                width: "auto",
                "margin-left": n ? e : "",
                "margin-right": n ? "" : e,
              };
            !i && this.$stage.children().css(s), (t.css = s);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e =
                (this.width() / this.settings.items).toFixed(3) -
                this.settings.margin,
              i = null,
              n = this._items.length,
              s = !this.settings.autoWidth,
              o = [];
            for (t.items = { merge: !1, width: e }; n--; )
              (i = this._mergers[n]),
                (i =
                  (this.settings.mergeFit &&
                    Math.min(i, this.settings.items)) ||
                  i),
                (t.items.merge = i > 1 || t.items.merge),
                (o[n] = s ? e * i : this._items[n].width());
            this._widths = o;
          },
        },
        {
          filter: ["items", "settings"],
          run: function () {
            var e = [],
              i = this._items,
              n = this.settings,
              s = Math.max(2 * n.items, 4),
              o = 2 * Math.ceil(i.length / 2),
              r = n.loop && i.length ? (n.rewind ? s : Math.max(s, o)) : 0,
              a = "",
              l = "";
            for (r /= 2; r > 0; )
              e.push(this.normalize(e.length / 2, !0)),
                (a += i[e[e.length - 1]][0].outerHTML),
                e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)),
                (l = i[e[e.length - 1]][0].outerHTML + l),
                (r -= 1);
            (this._clones = e),
              t(a).addClass("cloned").appendTo(this.$stage),
              t(l).addClass("cloned").prependTo(this.$stage);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function () {
            for (
              var t = this.settings.rtl ? 1 : -1,
                e = this._clones.length + this._items.length,
                i = -1,
                n = 0,
                s = 0,
                o = [];
              ++i < e;

            )
              (n = o[i - 1] || 0),
                (s = this._widths[this.relative(i)] + this.settings.margin),
                o.push(n + s * t);
            this._coordinates = o;
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function () {
            var t = this.settings.stagePadding,
              e = this._coordinates,
              i = {
                width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                "padding-left": t || "",
                "padding-right": t || "",
              };
            this.$stage.css(i);
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            var e = this._coordinates.length,
              i = !this.settings.autoWidth,
              n = this.$stage.children();
            if (i && t.items.merge)
              for (; e--; )
                (t.css.width = this._widths[this.relative(e)]),
                  n.eq(e).css(t.css);
            else i && ((t.css.width = t.items.width), n.css(t.css));
          },
        },
        {
          filter: ["items"],
          run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style");
          },
        },
        {
          filter: ["width", "items", "settings"],
          run: function (t) {
            (t.current = t.current
              ? this.$stage.children().index(t.current)
              : 0),
              (t.current = Math.max(
                this.minimum(),
                Math.min(this.maximum(), t.current)
              )),
              this.reset(t.current);
          },
        },
        {
          filter: ["position"],
          run: function () {
            this.animate(this.coordinates(this._current));
          },
        },
        {
          filter: ["width", "position", "items", "settings"],
          run: function () {
            var t,
              e,
              i,
              n,
              s = this.settings.rtl ? 1 : -1,
              o = 2 * this.settings.stagePadding,
              r = this.coordinates(this.current()) + o,
              a = r + this.width() * s,
              l = [];
            for (i = 0, n = this._coordinates.length; i < n; i++)
              (t = this._coordinates[i - 1] || 0),
                (e = Math.abs(this._coordinates[i]) + o * s),
                ((this.op(t, "<=", r) && this.op(t, ">", a)) ||
                  (this.op(e, "<", r) && this.op(e, ">", a))) &&
                  l.push(i);
            this.$stage.children(".active").removeClass("active"),
              this.$stage
                .children(":eq(" + l.join("), :eq(") + ")")
                .addClass("active"),
              this.$stage.children(".center").removeClass("center"),
              this.settings.center &&
                this.$stage.children().eq(this.current()).addClass("center");
          },
        },
      ]),
      (s.prototype.initializeStage = function () {
        (this.$stage = this.$element.find("." + this.settings.stageClass)),
          this.$stage.length ||
            (this.$element.addClass(this.options.loadingClass),
            (this.$stage = t("<" + this.settings.stageElement + ">", {
              class: this.settings.stageClass,
            }).wrap(t("<div/>", { class: this.settings.stageOuterClass }))),
            this.$element.append(this.$stage.parent()));
      }),
      (s.prototype.initializeItems = function () {
        var e = this.$element.find(".owl-item");
        if (e.length)
          return (
            (this._items = e.get().map(function (e) {
              return t(e);
            })),
            (this._mergers = this._items.map(function () {
              return 1;
            })),
            void this.refresh()
          );
        this.replace(this.$element.children().not(this.$stage.parent())),
          this.isVisible() ? this.refresh() : this.invalidate("width"),
          this.$element
            .removeClass(this.options.loadingClass)
            .addClass(this.options.loadedClass);
      }),
      (s.prototype.initialize = function () {
        var t, e, i;
        this.enter("initializing"),
          this.trigger("initialize"),
          this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
          this.settings.autoWidth &&
            !this.is("pre-loading") &&
            ((t = this.$element.find("img")),
            (e = this.settings.nestedItemSelector
              ? "." + this.settings.nestedItemSelector
              : void 0),
            (i = this.$element.children(e).width()),
            t.length && i <= 0 && this.preloadAutoWidthImages(t)),
          this.initializeStage(),
          this.initializeItems(),
          this.registerEventHandlers(),
          this.leave("initializing"),
          this.trigger("initialized");
      }),
      (s.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible");
      }),
      (s.prototype.setup = function () {
        var e = this.viewport(),
          i = this.options.responsive,
          n = -1,
          s = null;
        i
          ? (t.each(i, function (t) {
              t <= e && t > n && (n = Number(t));
            }),
            "function" ==
              typeof (s = t.extend({}, this.options, i[n])).stagePadding &&
              (s.stagePadding = s.stagePadding()),
            delete s.responsive,
            s.responsiveClass &&
              this.$element.attr(
                "class",
                this.$element
                  .attr("class")
                  .replace(
                    new RegExp(
                      "(" + this.options.responsiveClass + "-)\\S+\\s",
                      "g"
                    ),
                    "$1" + n
                  )
              ))
          : (s = t.extend({}, this.options)),
          this.trigger("change", { property: { name: "settings", value: s } }),
          (this._breakpoint = n),
          (this.settings = s),
          this.invalidate("settings"),
          this.trigger("changed", {
            property: { name: "settings", value: this.settings },
          });
      }),
      (s.prototype.optionsLogic = function () {
        this.settings.autoWidth &&
          ((this.settings.stagePadding = !1), (this.settings.merge = !1));
      }),
      (s.prototype.prepare = function (e) {
        var i = this.trigger("prepare", { content: e });
        return (
          i.data ||
            (i.data = t("<" + this.settings.itemElement + "/>")
              .addClass(this.options.itemClass)
              .append(e)),
          this.trigger("prepared", { content: i.data }),
          i.data
        );
      }),
      (s.prototype.update = function () {
        for (
          var e = 0,
            i = this._pipe.length,
            n = t.proxy(function (t) {
              return this[t];
            }, this._invalidated),
            s = {};
          e < i;

        )
          (this._invalidated.all ||
            t.grep(this._pipe[e].filter, n).length > 0) &&
            this._pipe[e].run(s),
            e++;
        (this._invalidated = {}), !this.is("valid") && this.enter("valid");
      }),
      (s.prototype.width = function (t) {
        switch ((t = t || s.Width.Default)) {
          case s.Width.Inner:
          case s.Width.Outer:
            return this._width;
          default:
            return (
              this._width -
              2 * this.settings.stagePadding +
              this.settings.margin
            );
        }
      }),
      (s.prototype.refresh = function () {
        this.enter("refreshing"),
          this.trigger("refresh"),
          this.setup(),
          this.optionsLogic(),
          this.$element.addClass(this.options.refreshClass),
          this.update(),
          this.$element.removeClass(this.options.refreshClass),
          this.leave("refreshing"),
          this.trigger("refreshed");
      }),
      (s.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer),
          (this.resizeTimer = e.setTimeout(
            this._handlers.onResize,
            this.settings.responsiveRefreshRate
          ));
      }),
      (s.prototype.onResize = function () {
        return (
          !!this._items.length &&
          this._width !== this.$element.width() &&
          !!this.isVisible() &&
          (this.enter("resizing"),
          this.trigger("resize").isDefaultPrevented()
            ? (this.leave("resizing"), !1)
            : (this.invalidate("width"),
              this.refresh(),
              this.leave("resizing"),
              void this.trigger("resized")))
        );
      }),
      (s.prototype.registerEventHandlers = function () {
        t.support.transition &&
          this.$stage.on(
            t.support.transition.end + ".owl.core",
            t.proxy(this.onTransitionEnd, this)
          ),
          !1 !== this.settings.responsive &&
            this.on(e, "resize", this._handlers.onThrottledResize),
          this.settings.mouseDrag &&
            (this.$element.addClass(this.options.dragClass),
            this.$stage.on(
              "mousedown.owl.core",
              t.proxy(this.onDragStart, this)
            ),
            this.$stage.on(
              "dragstart.owl.core selectstart.owl.core",
              function () {
                return !1;
              }
            )),
          this.settings.touchDrag &&
            (this.$stage.on(
              "touchstart.owl.core",
              t.proxy(this.onDragStart, this)
            ),
            this.$stage.on(
              "touchcancel.owl.core",
              t.proxy(this.onDragEnd, this)
            ));
      }),
      (s.prototype.onDragStart = function (e) {
        var n = null;
        3 !== e.which &&
          (t.support.transform
            ? (n = {
                x: (n = this.$stage
                  .css("transform")
                  .replace(/.*\(|\)| /g, "")
                  .split(","))[16 === n.length ? 12 : 4],
                y: n[16 === n.length ? 13 : 5],
              })
            : ((n = this.$stage.position()),
              (n = {
                x: this.settings.rtl
                  ? n.left +
                    this.$stage.width() -
                    this.width() +
                    this.settings.margin
                  : n.left,
                y: n.top,
              })),
          this.is("animating") &&
            (t.support.transform ? this.animate(n.x) : this.$stage.stop(),
            this.invalidate("position")),
          this.$element.toggleClass(
            this.options.grabClass,
            "mousedown" === e.type
          ),
          this.speed(0),
          (this._drag.time = new Date().getTime()),
          (this._drag.target = t(e.target)),
          (this._drag.stage.start = n),
          (this._drag.stage.current = n),
          (this._drag.pointer = this.pointer(e)),
          t(i).on(
            "mouseup.owl.core touchend.owl.core",
            t.proxy(this.onDragEnd, this)
          ),
          t(i).one(
            "mousemove.owl.core touchmove.owl.core",
            t.proxy(function (e) {
              var n = this.difference(this._drag.pointer, this.pointer(e));
              t(i).on(
                "mousemove.owl.core touchmove.owl.core",
                t.proxy(this.onDragMove, this)
              ),
                (Math.abs(n.x) < Math.abs(n.y) && this.is("valid")) ||
                  (e.preventDefault(),
                  this.enter("dragging"),
                  this.trigger("drag"));
            }, this)
          ));
      }),
      (s.prototype.onDragMove = function (t) {
        var e = null,
          i = null,
          n = null,
          s = this.difference(this._drag.pointer, this.pointer(t)),
          o = this.difference(this._drag.stage.start, s);
        this.is("dragging") &&
          (t.preventDefault(),
          this.settings.loop
            ? ((e = this.coordinates(this.minimum())),
              (i = this.coordinates(this.maximum() + 1) - e),
              (o.x = ((((o.x - e) % i) + i) % i) + e))
            : ((e = this.settings.rtl
                ? this.coordinates(this.maximum())
                : this.coordinates(this.minimum())),
              (i = this.settings.rtl
                ? this.coordinates(this.minimum())
                : this.coordinates(this.maximum())),
              (n = this.settings.pullDrag ? (-1 * s.x) / 5 : 0),
              (o.x = Math.max(Math.min(o.x, e + n), i + n))),
          (this._drag.stage.current = o),
          this.animate(o.x));
      }),
      (s.prototype.onDragEnd = function (e) {
        var n = this.difference(this._drag.pointer, this.pointer(e)),
          s = this._drag.stage.current,
          o = (n.x > 0) ^ this.settings.rtl ? "left" : "right";
        t(i).off(".owl.core"),
          this.$element.removeClass(this.options.grabClass),
          ((0 !== n.x && this.is("dragging")) || !this.is("valid")) &&
            (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(
              this.closest(s.x, 0 !== n.x ? o : this._drag.direction)
            ),
            this.invalidate("position"),
            this.update(),
            (this._drag.direction = o),
            (Math.abs(n.x) > 3 ||
              new Date().getTime() - this._drag.time > 300) &&
              this._drag.target.one("click.owl.core", function () {
                return !1;
              })),
          this.is("dragging") &&
            (this.leave("dragging"), this.trigger("dragged"));
      }),
      (s.prototype.closest = function (e, i) {
        var n = -1,
          s = this.width(),
          o = this.coordinates();
        return (
          this.settings.freeDrag ||
            t.each(
              o,
              t.proxy(function (t, r) {
                return (
                  "left" === i && e > r - 30 && e < r + 30
                    ? (n = t)
                    : "right" === i && e > r - s - 30 && e < r - s + 30
                    ? (n = t + 1)
                    : this.op(e, "<", r) &&
                      this.op(e, ">", void 0 !== o[t + 1] ? o[t + 1] : r - s) &&
                      (n = "left" === i ? t + 1 : t),
                  -1 === n
                );
              }, this)
            ),
          this.settings.loop ||
            (this.op(e, ">", o[this.minimum()])
              ? (n = e = this.minimum())
              : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())),
          n
        );
      }),
      (s.prototype.animate = function (e) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(),
          i && (this.enter("animating"), this.trigger("translate")),
          t.support.transform3d && t.support.transition
            ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px,0px)",
                transition:
                  this.speed() / 1e3 +
                  "s" +
                  (this.settings.slideTransition
                    ? " " + this.settings.slideTransition
                    : ""),
              })
            : i
            ? this.$stage.animate(
                { left: e + "px" },
                this.speed(),
                this.settings.fallbackEasing,
                t.proxy(this.onTransitionEnd, this)
              )
            : this.$stage.css({ left: e + "px" });
      }),
      (s.prototype.is = function (t) {
        return this._states.current[t] && this._states.current[t] > 0;
      }),
      (s.prototype.current = function (t) {
        if (void 0 === t) return this._current;
        if (0 !== this._items.length) {
          if (((t = this.normalize(t)), this._current !== t)) {
            var e = this.trigger("change", {
              property: { name: "position", value: t },
            });
            void 0 !== e.data && (t = this.normalize(e.data)),
              (this._current = t),
              this.invalidate("position"),
              this.trigger("changed", {
                property: { name: "position", value: this._current },
              });
          }
          return this._current;
        }
      }),
      (s.prototype.invalidate = function (e) {
        return (
          "string" === t.type(e) &&
            ((this._invalidated[e] = !0),
            this.is("valid") && this.leave("valid")),
          t.map(this._invalidated, function (t, e) {
            return e;
          })
        );
      }),
      (s.prototype.reset = function (t) {
        void 0 !== (t = this.normalize(t)) &&
          ((this._speed = 0),
          (this._current = t),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(t)),
          this.release(["translate", "translated"]));
      }),
      (s.prototype.normalize = function (t, e) {
        var i = this._items.length,
          n = e ? 0 : this._clones.length;
        return (
          !this.isNumeric(t) || i < 1
            ? (t = void 0)
            : (t < 0 || t >= i + n) &&
              (t = ((((t - n / 2) % i) + i) % i) + n / 2),
          t
        );
      }),
      (s.prototype.relative = function (t) {
        return (t -= this._clones.length / 2), this.normalize(t, !0);
      }),
      (s.prototype.maximum = function (t) {
        var e,
          i,
          n,
          s = this.settings,
          o = this._coordinates.length;
        if (s.loop) o = this._clones.length / 2 + this._items.length - 1;
        else if (s.autoWidth || s.merge) {
          if ((e = this._items.length))
            for (
              i = this._items[--e].width(), n = this.$element.width();
              e-- &&
              !((i += this._items[e].width() + this.settings.margin) > n);

            );
          o = e + 1;
        } else
          o = s.center ? this._items.length - 1 : this._items.length - s.items;
        return t && (o -= this._clones.length / 2), Math.max(o, 0);
      }),
      (s.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2;
      }),
      (s.prototype.items = function (t) {
        return void 0 === t
          ? this._items.slice()
          : ((t = this.normalize(t, !0)), this._items[t]);
      }),
      (s.prototype.mergers = function (t) {
        return void 0 === t
          ? this._mergers.slice()
          : ((t = this.normalize(t, !0)), this._mergers[t]);
      }),
      (s.prototype.clones = function (e) {
        var i = this._clones.length / 2,
          n = i + this._items.length,
          s = function (t) {
            return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2;
          };
        return void 0 === e
          ? t.map(this._clones, function (t, e) {
              return s(e);
            })
          : t.map(this._clones, function (t, i) {
              return t === e ? s(i) : null;
            });
      }),
      (s.prototype.speed = function (t) {
        return void 0 !== t && (this._speed = t), this._speed;
      }),
      (s.prototype.coordinates = function (e) {
        var i,
          n = 1,
          s = e - 1;
        return void 0 === e
          ? t.map(
              this._coordinates,
              t.proxy(function (t, e) {
                return this.coordinates(e);
              }, this)
            )
          : (this.settings.center
              ? (this.settings.rtl && ((n = -1), (s = e + 1)),
                (i = this._coordinates[e]),
                (i +=
                  ((this.width() - i + (this._coordinates[s] || 0)) / 2) * n))
              : (i = this._coordinates[s] || 0),
            (i = Math.ceil(i)));
      }),
      (s.prototype.duration = function (t, e, i) {
        return 0 === i
          ? 0
          : Math.min(Math.max(Math.abs(e - t), 1), 6) *
              Math.abs(i || this.settings.smartSpeed);
      }),
      (s.prototype.to = function (t, e) {
        var i = this.current(),
          n = null,
          s = t - this.relative(i),
          o = (s > 0) - (s < 0),
          r = this._items.length,
          a = this.minimum(),
          l = this.maximum();
        this.settings.loop
          ? (!this.settings.rewind && Math.abs(s) > r / 2 && (s += -1 * o * r),
            (n = (((((t = i + s) - a) % r) + r) % r) + a) !== t &&
              n - s <= l &&
              n - s > 0 &&
              ((i = n - s), (t = n), this.reset(i)))
          : (t = this.settings.rewind
              ? ((t % (l += 1)) + l) % l
              : Math.max(a, Math.min(l, t))),
          this.speed(this.duration(i, t, e)),
          this.current(t),
          this.isVisible() && this.update();
      }),
      (s.prototype.next = function (t) {
        (t = t || !1), this.to(this.relative(this.current()) + 1, t);
      }),
      (s.prototype.prev = function (t) {
        (t = t || !1), this.to(this.relative(this.current()) - 1, t);
      }),
      (s.prototype.onTransitionEnd = function (t) {
        if (
          void 0 !== t &&
          (t.stopPropagation(),
          (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))
        )
          return !1;
        this.leave("animating"), this.trigger("translated");
      }),
      (s.prototype.viewport = function () {
        var n;
        return (
          this.options.responsiveBaseElement !== e
            ? (n = t(this.options.responsiveBaseElement).width())
            : e.innerWidth
            ? (n = e.innerWidth)
            : i.documentElement && i.documentElement.clientWidth
            ? (n = i.documentElement.clientWidth)
            : console.warn("Can not detect viewport width."),
          n
        );
      }),
      (s.prototype.replace = function (e) {
        this.$stage.empty(),
          (this._items = []),
          e && (e = e instanceof jQuery ? e : t(e)),
          this.settings.nestedItemSelector &&
            (e = e.find("." + this.settings.nestedItemSelector)),
          e
            .filter(function () {
              return 1 === this.nodeType;
            })
            .each(
              t.proxy(function (t, e) {
                (e = this.prepare(e)),
                  this.$stage.append(e),
                  this._items.push(e),
                  this._mergers.push(
                    1 *
                      e
                        .find("[data-merge]")
                        .addBack("[data-merge]")
                        .attr("data-merge") || 1
                  );
              }, this)
            ),
          this.reset(
            this.isNumeric(this.settings.startPosition)
              ? this.settings.startPosition
              : 0
          ),
          this.invalidate("items");
      }),
      (s.prototype.add = function (e, i) {
        var n = this.relative(this._current);
        (i = void 0 === i ? this._items.length : this.normalize(i, !0)),
          (e = e instanceof jQuery ? e : t(e)),
          this.trigger("add", { content: e, position: i }),
          (e = this.prepare(e)),
          0 === this._items.length || i === this._items.length
            ? (0 === this._items.length && this.$stage.append(e),
              0 !== this._items.length && this._items[i - 1].after(e),
              this._items.push(e),
              this._mergers.push(
                1 *
                  e
                    .find("[data-merge]")
                    .addBack("[data-merge]")
                    .attr("data-merge") || 1
              ))
            : (this._items[i].before(e),
              this._items.splice(i, 0, e),
              this._mergers.splice(
                i,
                0,
                1 *
                  e
                    .find("[data-merge]")
                    .addBack("[data-merge]")
                    .attr("data-merge") || 1
              )),
          this._items[n] && this.reset(this._items[n].index()),
          this.invalidate("items"),
          this.trigger("added", { content: e, position: i });
      }),
      (s.prototype.remove = function (t) {
        void 0 !== (t = this.normalize(t, !0)) &&
          (this.trigger("remove", { content: this._items[t], position: t }),
          this._items[t].remove(),
          this._items.splice(t, 1),
          this._mergers.splice(t, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: t }));
      }),
      (s.prototype.preloadAutoWidthImages = function (e) {
        e.each(
          t.proxy(function (e, i) {
            this.enter("pre-loading"),
              (i = t(i)),
              t(new Image())
                .one(
                  "load",
                  t.proxy(function (t) {
                    i.attr("src", t.target.src),
                      i.css("opacity", 1),
                      this.leave("pre-loading"),
                      !this.is("pre-loading") &&
                        !this.is("initializing") &&
                        this.refresh();
                  }, this)
                )
                .attr(
                  "src",
                  i.attr("src") ||
                    i.attr("data-src") ||
                    i.attr("data-src-retina")
                );
          }, this)
        );
      }),
      (s.prototype.destroy = function () {
        for (var n in (this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        t(i).off(".owl.core"),
        !1 !== this.settings.responsive &&
          (e.clearTimeout(this.resizeTimer),
          this.off(e, "resize", this._handlers.onThrottledResize)),
        this._plugins))
          this._plugins[n].destroy();
        this.$stage.children(".cloned").remove(),
          this.$stage.unwrap(),
          this.$stage.children().contents().unwrap(),
          this.$stage.children().unwrap(),
          this.$stage.remove(),
          this.$element
            .removeClass(this.options.refreshClass)
            .removeClass(this.options.loadingClass)
            .removeClass(this.options.loadedClass)
            .removeClass(this.options.rtlClass)
            .removeClass(this.options.dragClass)
            .removeClass(this.options.grabClass)
            .attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                  ""
                )
            )
            .removeData("owl.carousel");
      }),
      (s.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
          case "<":
            return n ? t > i : t < i;
          case ">":
            return n ? t < i : t > i;
          case ">=":
            return n ? t <= i : t >= i;
          case "<=":
            return n ? t >= i : t <= i;
        }
      }),
      (s.prototype.on = function (t, e, i, n) {
        t.addEventListener
          ? t.addEventListener(e, i, n)
          : t.attachEvent && t.attachEvent("on" + e, i);
      }),
      (s.prototype.off = function (t, e, i, n) {
        t.removeEventListener
          ? t.removeEventListener(e, i, n)
          : t.detachEvent && t.detachEvent("on" + e, i);
      }),
      (s.prototype.trigger = function (e, i, n, o, r) {
        var a = { item: { count: this._items.length, index: this.current() } },
          l = t.camelCase(
            t
              .grep(["on", e, n], function (t) {
                return t;
              })
              .join("-")
              .toLowerCase()
          ),
          h = t.Event(
            [e, "owl", n || "carousel"].join(".").toLowerCase(),
            t.extend({ relatedTarget: this }, a, i)
          );
        return (
          this._supress[e] ||
            (t.each(this._plugins, function (t, e) {
              e.onTrigger && e.onTrigger(h);
            }),
            this.register({ type: s.Type.Event, name: e }),
            this.$element.trigger(h),
            this.settings &&
              "function" == typeof this.settings[l] &&
              this.settings[l].call(this, h)),
          h
        );
      }),
      (s.prototype.enter = function (e) {
        t.each(
          [e].concat(this._states.tags[e] || []),
          t.proxy(function (t, e) {
            void 0 === this._states.current[e] && (this._states.current[e] = 0),
              this._states.current[e]++;
          }, this)
        );
      }),
      (s.prototype.leave = function (e) {
        t.each(
          [e].concat(this._states.tags[e] || []),
          t.proxy(function (t, e) {
            this._states.current[e]--;
          }, this)
        );
      }),
      (s.prototype.register = function (e) {
        if (e.type === s.Type.Event) {
          if (
            (t.event.special[e.name] || (t.event.special[e.name] = {}),
            !t.event.special[e.name].owl)
          ) {
            var i = t.event.special[e.name]._default;
            (t.event.special[e.name]._default = function (t) {
              return !i ||
                !i.apply ||
                (t.namespace && -1 !== t.namespace.indexOf("owl"))
                ? t.namespace && t.namespace.indexOf("owl") > -1
                : i.apply(this, arguments);
            }),
              (t.event.special[e.name].owl = !0);
          }
        } else
          e.type === s.Type.State &&
            (this._states.tags[e.name]
              ? (this._states.tags[e.name] = this._states.tags[e.name].concat(
                  e.tags
                ))
              : (this._states.tags[e.name] = e.tags),
            (this._states.tags[e.name] = t.grep(
              this._states.tags[e.name],
              t.proxy(function (i, n) {
                return t.inArray(i, this._states.tags[e.name]) === n;
              }, this)
            )));
      }),
      (s.prototype.suppress = function (e) {
        t.each(
          e,
          t.proxy(function (t, e) {
            this._supress[e] = !0;
          }, this)
        );
      }),
      (s.prototype.release = function (e) {
        t.each(
          e,
          t.proxy(function (t, e) {
            delete this._supress[e];
          }, this)
        );
      }),
      (s.prototype.pointer = function (t) {
        var i = { x: null, y: null };
        return (
          (t =
            (t = t.originalEvent || t || e.event).touches && t.touches.length
              ? t.touches[0]
              : t.changedTouches && t.changedTouches.length
              ? t.changedTouches[0]
              : t).pageX
            ? ((i.x = t.pageX), (i.y = t.pageY))
            : ((i.x = t.clientX), (i.y = t.clientY)),
          i
        );
      }),
      (s.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t));
      }),
      (s.prototype.difference = function (t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }),
      (t.fn.owlCarousel = function (e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
          var n = t(this),
            o = n.data("owl.carousel");
          o ||
            ((o = new s(this, "object" == typeof e && e)),
            n.data("owl.carousel", o),
            t.each(
              [
                "next",
                "prev",
                "to",
                "destroy",
                "refresh",
                "replace",
                "add",
                "remove",
              ],
              function (e, i) {
                o.register({ type: s.Type.Event, name: i }),
                  o.$element.on(
                    i + ".owl.carousel.core",
                    t.proxy(function (t) {
                      t.namespace &&
                        t.relatedTarget !== this &&
                        (this.suppress([i]),
                        o[i].apply(this, [].slice.call(arguments, 1)),
                        this.release([i]));
                    }, o)
                  );
              }
            )),
            "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i);
        });
      }),
      (t.fn.owlCarousel.Constructor = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (e) {
      (this._core = e),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (s.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (s.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = e.setInterval(
            t.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (s.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (s.prototype.destroy = function () {
        var t, i;
        for (t in (e.clearInterval(this._interval), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (i in Object.getOwnPropertyNames(this))
          "function" != typeof this[i] && (this[i] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (e) {
      (this._core = e),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            t.proxy(function (e) {
              if (
                e.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((e.property && "position" == e.property.name) ||
                  "initialized" == e.type)
              ) {
                var i = this._core.settings,
                  n = (i.center && Math.ceil(i.items / 2)) || i.items,
                  s = (i.center && -1 * n) || 0,
                  o =
                    (e.property && void 0 !== e.property.value
                      ? e.property.value
                      : this._core.current()) + s,
                  r = this._core.clones().length,
                  a = t.proxy(function (t, e) {
                    this.load(e);
                  }, this);
                for (
                  i.lazyLoadEager > 0 &&
                  ((n += i.lazyLoadEager),
                  i.loop && ((o -= i.lazyLoadEager), n++));
                  s++ < n;

                )
                  this.load(r / 2 + this._core.relative(o)),
                    r && t.each(this._core.clones(this._core.relative(o)), a),
                    o++;
              }
            }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (s.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (s.prototype.load = function (i) {
        var n = this._core.$stage.children().eq(i),
          s = n && n.find(".owl-lazy");
        !s ||
          t.inArray(n.get(0), this._loaded) > -1 ||
          (s.each(
            t.proxy(function (i, n) {
              var s,
                o = t(n),
                r =
                  (e.devicePixelRatio > 1 && o.attr("data-src-retina")) ||
                  o.attr("data-src") ||
                  o.attr("data-srcset");
              this._core.trigger("load", { element: o, url: r }, "lazy"),
                o.is("img")
                  ? o
                      .one(
                        "load.owl.lazy",
                        t.proxy(function () {
                          o.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: o, url: r },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", r)
                  : o.is("source")
                  ? o
                      .one(
                        "load.owl.lazy",
                        t.proxy(function () {
                          this._core.trigger(
                            "loaded",
                            { element: o, url: r },
                            "lazy"
                          );
                        }, this)
                      )
                      .attr("srcset", r)
                  : (((s = new Image()).onload = t.proxy(function () {
                      o.css({
                        "background-image": 'url("' + r + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: o, url: r },
                          "lazy"
                        );
                    }, this)),
                    (s.src = r));
            }, this)
          ),
          this._loaded.push(n.get(0)));
      }),
      (s.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Lazy = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (i) {
      (this._core = i),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (
            t
          ) {
            t.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              "position" === t.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.autoHeight &&
              t.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var n = this;
      t(e).on("load", function () {
        n._core.settings.autoHeight && n.update();
      }),
        t(e).resize(function () {
          n._core.settings.autoHeight &&
            (null != n._intervalId && clearTimeout(n._intervalId),
            (n._intervalId = setTimeout(function () {
              n.update();
            }, 250)));
        });
    };
    (s.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (s.prototype.update = function () {
        var e = this._core._current,
          i = e + this._core.settings.items,
          n = this._core.settings.lazyLoad,
          s = this._core.$stage.children().toArray().slice(e, i),
          o = [],
          r = 0;
        t.each(s, function (e, i) {
          o.push(t(i).height());
        }),
          (r = Math.max.apply(null, o)) <= 1 &&
            n &&
            this._previousHeight &&
            (r = this._previousHeight),
          (this._previousHeight = r),
          this._core.$stage
            .parent()
            .height(r)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (s.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (e) {
      (this._core = e),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              t.preventDefault();
          }, this),
          "refreshed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              "position" === t.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": t.proxy(function (e) {
            if (e.namespace) {
              var i = t(e.content).find(".owl-video");
              i.length &&
                (i.css("display", "none"), this.fetch(i, t(e.content)));
            }
          }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          t.proxy(function (t) {
            this.play(t);
          }, this)
        );
    };
    (s.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (s.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id")
            ? "vimeo"
            : t.attr("data-vzaar-id")
            ? "vzaar"
            : "youtube",
          n =
            t.attr("data-vimeo-id") ||
            t.attr("data-youtube-id") ||
            t.attr("data-vzaar-id"),
          s = t.attr("data-width") || this._core.settings.videoWidth,
          o = t.attr("data-height") || this._core.settings.videoHeight,
          r = t.attr("href");
        if (!r) throw new Error("Missing video URL.");
        if (
          (n = r.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          ))[3].indexOf("youtu") > -1
        )
          i = "youtube";
        else if (n[3].indexOf("vimeo") > -1) i = "vimeo";
        else {
          if (!(n[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          i = "vzaar";
        }
        (n = n[6]),
          (this._videos[r] = { type: i, id: n, width: s, height: o }),
          e.attr("data-video", r),
          this.thumbnail(t, this._videos[r]);
      }),
      (s.prototype.thumbnail = function (e, i) {
        var n,
          s,
          o =
            i.width && i.height
              ? "width:" + i.width + "px;height:" + i.height + "px;"
              : "",
          r = e.find("img"),
          a = "src",
          l = "",
          h = this._core.settings,
          c = function (i) {
            (n = h.lazyLoad
              ? t("<div/>", { class: "owl-video-tn " + l, srcType: i })
              : t("<div/>", {
                  class: "owl-video-tn",
                  style: "opacity:1;background-image:url(" + i + ")",
                })),
              e.after(n),
              e.after('<div class="owl-video-play-icon"></div>');
          };
        if (
          (e.wrap(t("<div/>", { class: "owl-video-wrapper", style: o })),
          this._core.settings.lazyLoad && ((a = "data-src"), (l = "owl-lazy")),
          r.length)
        )
          return c(r.attr(a)), r.remove(), !1;
        "youtube" === i.type
          ? ((s = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"), c(s))
          : "vimeo" === i.type
          ? t.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + i.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (t) {
                (s = t[0].thumbnail_large), c(s);
              },
            })
          : "vzaar" === i.type &&
            t.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + i.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (t) {
                (s = t.framegrab_url), c(s);
              },
            });
      }),
      (s.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (s.prototype.play = function (e) {
        var i,
          n = t(e.target).closest("." + this._core.settings.itemClass),
          s = this._videos[n.attr("data-video")],
          o = s.width || "100%",
          r = s.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (n = this._core.items(this._core.relative(n.index()))),
          this._core.reset(n.index()),
          (i = t(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
          )).attr("height", r),
          i.attr("width", o),
          "youtube" === s.type
            ? i.attr(
                "src",
                "//www.youtube.com/embed/" +
                  s.id +
                  "?autoplay=1&rel=0&v=" +
                  s.id
              )
            : "vimeo" === s.type
            ? i.attr("src", "//player.vimeo.com/video/" + s.id + "?autoplay=1")
            : "vzaar" === s.type &&
              i.attr(
                "src",
                "//view.vzaar.com/" + s.id + "/player?autoplay=true"
              ),
          t(i)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(n.find(".owl-video")),
          (this._playing = n.addClass("owl-video-playing")));
      }),
      (s.prototype.isInFullScreen = function () {
        var e =
          i.fullscreenElement ||
          i.mozFullScreenElement ||
          i.webkitFullscreenElement;
        return e && t(e).parent().hasClass("owl-video-frame");
      }),
      (s.prototype.destroy = function () {
        var t, e;
        for (t in (this._core.$element.off("click.owl.video"), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Video = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (e) {
      (this.core = e),
        (this.core.options = t.extend({}, s.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = void 0),
        (this.next = void 0),
        (this.handlers = {
          "change.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              "position" == t.property.name &&
              ((this.previous = this.core.current()),
              (this.next = t.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            t.proxy(function (t) {
              t.namespace && (this.swapping = "translated" == t.type);
            }, this),
          "translate.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (s.Defaults = { animateOut: !1, animateIn: !1 }),
      (s.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          t.support.animation &&
          t.support.transition
        ) {
          this.core.speed(0);
          var e,
            i = t.proxy(this.clear, this),
            n = this.core.$stage.children().eq(this.previous),
            s = this.core.$stage.children().eq(this.next),
            o = this.core.settings.animateIn,
            r = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (r &&
              ((e =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              n
                .one(t.support.animation.end, i)
                .css({ left: e + "px" })
                .addClass("animated owl-animated-out")
                .addClass(r)),
            o &&
              s
                .one(t.support.animation.end, i)
                .addClass("animated owl-animated-in")
                .addClass(o));
        }
      }),
      (s.prototype.clear = function (e) {
        t(e.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (s.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Animate = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = function (e) {
      (this._core = e),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace && "settings" === t.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : t.namespace &&
                "position" === t.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": t.proxy(function (t, e, i) {
            t.namespace && this.play(e, i);
          }, this),
          "stop.owl.autoplay": t.proxy(function (t) {
            t.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": t.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": t.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = t.extend({}, s.Defaults, this._core.options));
    };
    (s.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (s.prototype._next = function (n) {
        (this._call = e.setTimeout(
          t.proxy(this._next, this, n),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read()
        )),
          this._core.is("interacting") ||
            i.hidden ||
            this._core.next(n || this._core.settings.autoplaySpeed);
      }),
      (s.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (s.prototype.play = function (i, n) {
        var s;
        this._core.is("rotating") || this._core.enter("rotating"),
          (i = i || this._core.settings.autoplayTimeout),
          (s = Math.min(this._time % (this._timeout || i), i)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : e.clearTimeout(this._call),
          (this._time += (this.read() % i) - s),
          (this._timeout = i),
          (this._call = e.setTimeout(t.proxy(this._next, this, n), i - s));
      }),
      (s.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
          (this._paused = !0),
          e.clearTimeout(this._call),
          this._core.leave("rotating"));
      }),
      (s.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          e.clearTimeout(this._call));
      }),
      (s.prototype.destroy = function () {
        var t, e;
        for (t in (this.stop(), this._handlers))
          this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this))
          "function" != typeof this[e] && (this[e] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.autoplay = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    "use strict";
    var s = function (e) {
      (this._core = e),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": t.proxy(function (e) {
            e.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  t(e.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(t.position, 1);
          }, this),
          "changed.owl.carousel": t.proxy(function (t) {
            t.namespace && "position" == t.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": t.proxy(function (t) {
            t.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (s.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (s.prototype.initialize = function () {
        var e,
          i = this._core.settings;
        for (e in ((this._controls.$relative = (
          i.navContainer
            ? t(i.navContainer)
            : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
        (this._controls.$previous = t("<" + i.navElement + ">")
          .addClass(i.navClass[0])
          .html(i.navText[0])
          .prependTo(this._controls.$relative)
          .on(
            "click",
            t.proxy(function (t) {
              this.prev(i.navSpeed);
            }, this)
          )),
        (this._controls.$next = t("<" + i.navElement + ">")
          .addClass(i.navClass[1])
          .html(i.navText[1])
          .appendTo(this._controls.$relative)
          .on(
            "click",
            t.proxy(function (t) {
              this.next(i.navSpeed);
            }, this)
          )),
        i.dotsData ||
          (this._templates = [
            t('<button role="button">')
              .addClass(i.dotClass)
              .append(t("<span>"))
              .prop("outerHTML"),
          ]),
        (this._controls.$absolute = (
          i.dotsContainer
            ? t(i.dotsContainer)
            : t("<div>").addClass(i.dotsClass).appendTo(this.$element)
        ).addClass("disabled")),
        this._controls.$absolute.on(
          "click",
          "button",
          t.proxy(function (e) {
            var n = t(e.target).parent().is(this._controls.$absolute)
              ? t(e.target).index()
              : t(e.target).parent().index();
            e.preventDefault(), this.to(n, i.dotsSpeed);
          }, this)
        ),
        this._overrides))
          this._core[e] = t.proxy(this[e], this);
      }),
      (s.prototype.destroy = function () {
        var t, e, i, n, s;
        for (t in ((s = this._core.settings), this._handlers))
          this.$element.off(t, this._handlers[t]);
        for (e in this._controls)
          "$relative" === e && s.navContainer
            ? this._controls[e].html("")
            : this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this))
          "function" != typeof this[i] && (this[i] = null);
      }),
      (s.prototype.update = function () {
        var t,
          e,
          i = this._core.clones().length / 2,
          n = i + this._core.items().length,
          s = this._core.maximum(!0),
          o = this._core.settings,
          r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
        if (
          ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)),
          o.dots || "page" == o.slideBy)
        )
          for (this._pages = [], t = i, e = 0; t < n; t++) {
            if (e >= r || 0 === e) {
              if (
                (this._pages.push({
                  start: Math.min(s, t - i),
                  end: t - i + r - 1,
                }),
                Math.min(s, t - i) === s)
              )
                break;
              e = 0;
            }
            e += this._core.mergers(this._core.relative(t));
          }
      }),
      (s.prototype.draw = function () {
        var e,
          i = this._core.settings,
          n = this._core.items().length <= i.items,
          s = this._core.relative(this._core.current()),
          o = i.loop || i.rewind;
        this._controls.$relative.toggleClass("disabled", !i.nav || n),
          i.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !o && s <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !o && s >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !i.dots || n),
          i.dots &&
            ((e =
              this._pages.length - this._controls.$absolute.children().length),
            i.dotsData && 0 !== e
              ? this._controls.$absolute.html(this._templates.join(""))
              : e > 0
              ? this._controls.$absolute.append(
                  new Array(e + 1).join(this._templates[0])
                )
              : e < 0 && this._controls.$absolute.children().slice(e).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(t.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (s.prototype.onTrigger = function (e) {
        var i = this._core.settings;
        e.page = {
          index: t.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            i &&
            (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items),
        };
      }),
      (s.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t
          .grep(
            this._pages,
            t.proxy(function (t, i) {
              return t.start <= e && t.end >= e;
            }, this)
          )
          .pop();
      }),
      (s.prototype.getPosition = function (e) {
        var i,
          n,
          s = this._core.settings;
        return (
          "page" == s.slideBy
            ? ((i = t.inArray(this.current(), this._pages)),
              (n = this._pages.length),
              e ? ++i : --i,
              (i = this._pages[((i % n) + n) % n].start))
            : ((i = this._core.relative(this._core.current())),
              (n = this._core.items().length),
              e ? (i += s.slideBy) : (i -= s.slideBy)),
          i
        );
      }),
      (s.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
      }),
      (s.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
      }),
      (s.prototype.to = function (e, i, n) {
        var s;
        !n && this._pages.length
          ? ((s = this._pages.length),
            t.proxy(this._overrides.to, this._core)(
              this._pages[((e % s) + s) % s].start,
              i
            ))
          : t.proxy(this._overrides.to, this._core)(e, i);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Navigation = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    "use strict";
    var s = function (i) {
      (this._core = i),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": t.proxy(function (i) {
            i.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              t(e).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": t.proxy(function (e) {
            if (e.namespace) {
              var i = t(e.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!i) return;
              this._hashes[i] = e.content;
            }
          }, this),
          "changed.owl.carousel": t.proxy(function (i) {
            if (i.namespace && "position" === i.property.name) {
              var n = this._core.items(
                  this._core.relative(this._core.current())
                ),
                s = t
                  .map(this._hashes, function (t, e) {
                    return t === n ? e : null;
                  })
                  .join();
              if (!s || e.location.hash.slice(1) === s) return;
              e.location.hash = s;
            }
          }, this),
        }),
        (this._core.options = t.extend({}, s.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        t(e).on(
          "hashchange.owl.navigation",
          t.proxy(function (t) {
            var i = e.location.hash.substring(1),
              n = this._core.$stage.children(),
              s = this._hashes[i] && n.index(this._hashes[i]);
            void 0 !== s &&
              s !== this._core.current() &&
              this._core.to(this._core.relative(s), !1, !0);
          }, this)
        );
    };
    (s.Defaults = { URLhashListener: !1 }),
      (s.prototype.destroy = function () {
        var i, n;
        for (i in (t(e).off("hashchange.owl.navigation"), this._handlers))
          this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this))
          "function" != typeof this[n] && (this[n] = null);
      }),
      (t.fn.owlCarousel.Constructor.Plugins.Hash = s);
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e, i, n) {
    var s = t("<support>").get(0).style,
      o = "Webkit Moz O ms".split(" "),
      r = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      };
    function a(e, i) {
      var r = !1,
        a = e.charAt(0).toUpperCase() + e.slice(1);
      return (
        t.each((e + " " + o.join(a + " ") + a).split(" "), function (t, e) {
          if (s[e] !== n) return (r = !i || e), !1;
        }),
        r
      );
    }
    function l(t) {
      return a(t, !0);
    }
    !!a("transition") &&
      ((t.support.transition = new String(l("transition"))),
      (t.support.transition.end = r.transition.end[t.support.transition])),
      !!a("animation") &&
        ((t.support.animation = new String(l("animation"))),
        (t.support.animation.end = r.animation.end[t.support.animation])),
      a("transform") &&
        ((t.support.transform = new String(l("transform"))),
        (t.support.transform3d = !!a("perspective")));
  })(window.Zepto || window.jQuery, window, document),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t = t || self).LazyLoad = e());
  })(this, function () {
    "use strict";
    function t() {
      return (t =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var n in i)
              Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
          }
          return t;
        }).apply(this, arguments);
    }
    var e = "undefined" != typeof window,
      i =
        (e && !("onscroll" in window)) ||
        ("undefined" != typeof navigator &&
          /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
      n = e && "IntersectionObserver" in window,
      s = e && "classList" in document.createElement("p"),
      o = e && window.devicePixelRatio > 1,
      r = {
        elements_selector: "IMG",
        container: i || e ? document : null,
        threshold: 300,
        thresholds: null,
        data_src: "src",
        data_srcset: "srcset",
        data_sizes: "sizes",
        data_bg: "bg",
        data_bg_hidpi: "bg-hidpi",
        data_bg_multi: "bg-multi",
        data_bg_multi_hidpi: "bg-multi-hidpi",
        data_poster: "poster",
        class_applied: "applied",
        class_loading: "loading",
        class_loaded: "loaded",
        class_error: "error",
        unobserve_completed: !0,
        unobserve_entered: !1,
        cancel_on_exit: !1,
        callback_enter: null,
        callback_exit: null,
        callback_applied: null,
        callback_loading: null,
        callback_loaded: null,
        callback_error: null,
        callback_finish: null,
        callback_cancel: null,
        use_native: !1,
      },
      a = function (e) {
        return t({}, r, e);
      },
      l = function (t, e) {
        var i,
          n = new t(e);
        try {
          i = new CustomEvent("LazyLoad::Initialized", {
            detail: { instance: n },
          });
        } catch (t) {
          (i = document.createEvent("CustomEvent")).initCustomEvent(
            "LazyLoad::Initialized",
            !1,
            !1,
            { instance: n }
          );
        }
        window.dispatchEvent(i);
      },
      h = function (t, e) {
        return t.getAttribute("data-" + e);
      },
      c = function (t, e, i) {
        var n = "data-" + e;
        null !== i ? t.setAttribute(n, i) : t.removeAttribute(n);
      },
      u = function (t) {
        return h(t, "ll-status");
      },
      d = function (t, e) {
        return c(t, "ll-status", e);
      },
      p = function (t) {
        return d(t, null);
      },
      f = function (t) {
        return null === u(t);
      },
      g = function (t) {
        return "native" === u(t);
      },
      m = function (t, e, i, n) {
        t && (void 0 === n ? (void 0 === i ? t(e) : t(e, i)) : t(e, i, n));
      },
      _ = function (t, e) {
        s ? t.classList.add(e) : (t.className += (t.className ? " " : "") + e);
      },
      v = function (t, e) {
        s
          ? t.classList.remove(e)
          : (t.className = t.className
              .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, ""));
      },
      y = function (t) {
        return t.llTempImage;
      },
      w = function (t, e) {
        if (e) {
          var i = e._observer;
          i && i.unobserve(t);
        }
      },
      b = function (t, e) {
        t && (t.loadingCount += e);
      },
      C = function (t, e) {
        t && (t.toLoadCount = e);
      },
      E = function (t) {
        for (var e, i = [], n = 0; (e = t.children[n]); n += 1)
          "SOURCE" === e.tagName && i.push(e);
        return i;
      },
      T = function (t, e, i) {
        i && t.setAttribute(e, i);
      },
      x = function (t, e) {
        t.removeAttribute(e);
      },
      k = function (t) {
        return !!t.llOriginalAttrs;
      },
      S = function (t) {
        if (!k(t)) {
          var e = {};
          (e.src = t.getAttribute("src")),
            (e.srcset = t.getAttribute("srcset")),
            (e.sizes = t.getAttribute("sizes")),
            (t.llOriginalAttrs = e);
        }
      },
      j = function (t) {
        if (k(t)) {
          var e = t.llOriginalAttrs;
          T(t, "src", e.src), T(t, "srcset", e.srcset), T(t, "sizes", e.sizes);
        }
      },
      D = function (t, e) {
        T(t, "sizes", h(t, e.data_sizes)),
          T(t, "srcset", h(t, e.data_srcset)),
          T(t, "src", h(t, e.data_src));
      },
      I = function (t) {
        x(t, "src"), x(t, "srcset"), x(t, "sizes");
      },
      A = function (t, e) {
        var i = t.parentNode;
        i && "PICTURE" === i.tagName && E(i).forEach(e);
      },
      N = function (t, e) {
        E(t).forEach(e);
      },
      O = {
        IMG: function (t, e) {
          A(t, function (t) {
            S(t), D(t, e);
          }),
            S(t),
            D(t, e);
        },
        IFRAME: function (t, e) {
          T(t, "src", h(t, e.data_src));
        },
        VIDEO: function (t, e) {
          N(t, function (t) {
            T(t, "src", h(t, e.data_src));
          }),
            T(t, "poster", h(t, e.data_poster)),
            T(t, "src", h(t, e.data_src)),
            t.load();
        },
      },
      Q = function (t, e) {
        var i = O[t.tagName];
        i && i(t, e);
      },
      z = function (t, e, i) {
        b(i, 1),
          _(t, e.class_loading),
          d(t, "loading"),
          m(e.callback_loading, t, i);
      },
      L = {
        IMG: function (t, e) {
          c(t, e.data_src, null),
            c(t, e.data_srcset, null),
            c(t, e.data_sizes, null),
            A(t, function (t) {
              c(t, e.data_srcset, null), c(t, e.data_sizes, null);
            });
        },
        IFRAME: function (t, e) {
          c(t, e.data_src, null);
        },
        VIDEO: function (t, e) {
          c(t, e.data_src, null),
            c(t, e.data_poster, null),
            N(t, function (t) {
              c(t, e.data_src, null);
            });
        },
      },
      $ = function (t, e) {
        var i = L[t.tagName];
        i
          ? i(t, e)
          : (function (t, e) {
              c(t, e.data_bg, null), c(t, e.data_bg_hidpi, null);
            })(t, e);
      },
      P = ["IMG", "IFRAME", "VIDEO"],
      R = function (t, e) {
        !e ||
          e.loadingCount > 0 ||
          e.toLoadCount > 0 ||
          m(t.callback_finish, e);
      },
      M = function (t, e, i) {
        t.addEventListener(e, i), (t.llEvLisnrs[e] = i);
      },
      q = function (t, e, i) {
        t.removeEventListener(e, i);
      },
      F = function (t) {
        return !!t.llEvLisnrs;
      },
      H = function (t) {
        if (F(t)) {
          var e = t.llEvLisnrs;
          for (var i in e) {
            var n = e[i];
            q(t, i, n);
          }
          delete t.llEvLisnrs;
        }
      },
      B = function (t, e, i) {
        !(function (t) {
          delete t.llTempImage;
        })(t),
          b(i, -1),
          i && (i.toLoadCount -= 1),
          v(t, e.class_loading),
          e.unobserve_completed && w(t, i);
      },
      W = function (t, e, i) {
        var n = y(t) || t;
        F(n) ||
          (function (t, e, i) {
            F(t) || (t.llEvLisnrs = {});
            var n = "VIDEO" === t.tagName ? "loadeddata" : "load";
            M(t, n, e), M(t, "error", i);
          })(
            n,
            function (s) {
              !(function (t, e, i, n) {
                var s = g(e);
                B(e, i, n),
                  _(e, i.class_loaded),
                  d(e, "loaded"),
                  $(e, i),
                  m(i.callback_loaded, e, n),
                  s || R(i, n);
              })(0, t, e, i),
                H(n);
            },
            function (s) {
              !(function (t, e, i, n) {
                var s = g(e);
                B(e, i, n),
                  _(e, i.class_error),
                  d(e, "error"),
                  m(i.callback_error, e, n),
                  s || R(i, n);
              })(0, t, e, i),
                H(n);
            }
          );
      },
      U = function (t, e, i) {
        !(function (t) {
          return P.indexOf(t.tagName) > -1;
        })(t)
          ? (function (t, e, i) {
              !(function (t) {
                t.llTempImage = document.createElement("IMG");
              })(t),
                W(t, e, i),
                (function (t, e, i) {
                  var n = h(t, e.data_bg),
                    s = h(t, e.data_bg_hidpi),
                    r = o && s ? s : n;
                  r &&
                    ((t.style.backgroundImage = 'url("'.concat(r, '")')),
                    y(t).setAttribute("src", r),
                    z(t, e, i));
                })(t, e, i),
                (function (t, e, i) {
                  var n = h(t, e.data_bg_multi),
                    s = h(t, e.data_bg_multi_hidpi),
                    r = o && s ? s : n;
                  r &&
                    ((t.style.backgroundImage = r),
                    (function (t, e, i) {
                      _(t, e.class_applied),
                        d(t, "applied"),
                        (function (t, e) {
                          c(t, e.data_bg_multi, null),
                            c(t, e.data_bg_multi_hidpi, null);
                        })(t, e),
                        e.unobserve_completed && w(t, e),
                        m(e.callback_applied, t, i);
                    })(t, e, i));
                })(t, e, i);
            })(t, e, i)
          : (function (t, e, i) {
              W(t, e, i), Q(t, e), z(t, e, i);
            })(t, e, i);
      },
      V = ["IMG", "IFRAME"],
      X = function (t) {
        return t.use_native && "loading" in HTMLImageElement.prototype;
      },
      K = function (t) {
        return Array.prototype.slice.call(t);
      },
      Y = function (t) {
        return t.container.querySelectorAll(t.elements_selector);
      },
      Z = function (t) {
        return (function (t) {
          return "error" === u(t);
        })(t);
      },
      G = function (t, e) {
        return (function (t) {
          return K(t).filter(f);
        })(t || Y(e));
      },
      J = function (t, i) {
        var s = a(t);
        (this._settings = s),
          (this.loadingCount = 0),
          (function (t, e) {
            n &&
              !X(t) &&
              (e._observer = new IntersectionObserver(
                function (i) {
                  !(function (t, e, i) {
                    t.forEach(function (t) {
                      return (function (t) {
                        return t.isIntersecting || t.intersectionRatio > 0;
                      })(t)
                        ? (function (t, e, i, n) {
                            m(i.callback_enter, t, e, n),
                              (function (t, e, i) {
                                e.unobserve_entered && w(t, i);
                              })(t, i, n),
                              (function (t) {
                                return !f(t);
                              })(t) || U(t, i, n);
                          })(t.target, t, e, i)
                        : (function (t, e, i, n) {
                            f(t) ||
                              ((function (t, e, i, n) {
                                i.cancel_on_exit &&
                                  (function (t) {
                                    return "loading" === u(t);
                                  })(t) &&
                                  "IMG" === t.tagName &&
                                  (H(t),
                                  (function (t) {
                                    A(t, function (t) {
                                      I(t);
                                    }),
                                      I(t);
                                  })(t),
                                  (function (t) {
                                    A(t, function (t) {
                                      j(t);
                                    }),
                                      j(t);
                                  })(t),
                                  v(t, i.class_loading),
                                  b(n, -1),
                                  p(t),
                                  m(i.callback_cancel, t, e, n));
                              })(t, e, i, n),
                              m(i.callback_exit, t, e, n));
                          })(t.target, t, e, i);
                    });
                  })(i, t, e);
                },
                (function (t) {
                  return {
                    root: t.container === document ? null : t.container,
                    rootMargin: t.thresholds || t.threshold + "px",
                  };
                })(t)
              ));
          })(s, this),
          (function (t, i) {
            e &&
              window.addEventListener("online", function () {
                !(function (t, e) {
                  var i;
                  ((i = Y(t)), K(i).filter(Z)).forEach(function (e) {
                    v(e, t.class_error), p(e);
                  }),
                    e.update();
                })(t, i);
              });
          })(s, this),
          this.update(i);
      };
    return (
      (J.prototype = {
        update: function (t) {
          var e,
            s,
            o = this._settings,
            r = G(t, o);
          C(this, r.length),
            !i && n
              ? X(o)
                ? (function (t, e, i) {
                    r.forEach(function (t) {
                      -1 !== V.indexOf(t.tagName) &&
                        (t.setAttribute("loading", "lazy"),
                        (function (t, e, i) {
                          W(t, e, i), Q(t, e), $(t, e), d(t, "native");
                        })(t, e, i));
                    }),
                      C(i, 0);
                  })(0, o, this)
                : ((s = r),
                  (function (t) {
                    t.disconnect();
                  })((e = this._observer)),
                  (function (t, e) {
                    s.forEach(function (e) {
                      t.observe(e);
                    });
                  })(e))
              : this.loadAll(r);
        },
        destroy: function () {
          this._observer && this._observer.disconnect(),
            Y(this._settings).forEach(function (t) {
              delete t.llOriginalAttrs;
            }),
            delete this._observer,
            delete this._settings,
            delete this.loadingCount,
            delete this.toLoadCount;
        },
        loadAll: function (t) {
          var e = this,
            i = this._settings;
          G(t, i).forEach(function (t) {
            U(t, i, e);
          });
        },
      }),
      (J.load = function (t, e) {
        var i = a(e);
        U(t, i);
      }),
      (J.resetStatus = function (t) {
        p(t);
      }),
      e &&
        (function (t, e) {
          if (e)
            if (e.length) for (var i, n = 0; (i = e[n]); n += 1) l(t, i);
            else l(t, e);
        })(J, window.lazyLoadOptions),
      J
    );
  }),
  jQuery("html").addClass("hidden-c"),
  jQuery("html").attr("style", "margin-top:0px !important"),
  jQuery(document).ready(function (t) {
    n(),
      t(window).scroll(function () {
        n();
      }),
      t(window).on("load", function () {
        n();
      });
    var e = "https://ik.imagekit.io/buildrite/ajax.js",
      i = "ec71dd55d2f2b0ac2924ad943f80be75";
    new LazyLoad({
      elements_selector:
        "img.lazy, iframe.lazy, video.lazy, div.lazy, section.lazy",
    });
    function n() {
      var t = jQuery(window).scrollTop(),
        e = jQuery(window).height(),
        i = t + e;
      jQuery(".wowo:not(.animated)").each(function () {
        var e = jQuery(this),
          n = e.offset().top,
          s = e.innerHeight();
        n > t - s && n + s < i + s && e.addClass("animated");
      });
    }
    t("[href*='tel:']").click(function (t) {
      gtag("event", "click", {
        name: "Call",
        event_category: "CTA",
        event_label: "Call",
      });
    }),
      t("[href*='mailto:']").click(function (t) {
        gtag("event", "click", {
          name: "Email",
          event_category: "CTA",
          event_label: "Email",
        });
      }),
      t("[href$='.pdf']").click(function (t) {
        gtag("event", "click", {
          name: "PDF",
          event_category: "CTA",
          event_label: "PDF",
        });
      }),
      t(".contact-form").submit(function (e) {
        e.preventDefault();
        var i = t("#website"),
          n = t("#page"),
          s = t("#input-4827384952"),
          o = t("#input-6565436745"),
          r = t("#input-646476547564"),
          a = t("#input-654745637546745"),
          l = t("#input-5253246625643"),
          h =
            "website=" +
            i.val() +
            "&page=" +
            n.val() +
            "&name=" +
            s.val() +
            "&phone=" +
            o.val() +
            "&email=" +
            r.val() +
            "&service=" +
            a.val() +
            "&message=" +
            l.val();
        return (
          t(".loading").fadeIn("slow").html("Loading..."),
          t.ajax({
            type: "POST",
            data: h,
            url: "thank-you.php",
            cache: !1,
            success: function (e) {
              "success" == e
                ? (t(".loading")
                    .fadeIn("slow")
                    .html(
                      '<font color="#48af4b" class="wpcf7-mail-sent-ok">Sent Successfully, We will be in contact shortly.</font>'
                    )
                    .delay(3e3)
                    .fadeOut("slow"),
                  dataLayer.push({
                    event: "formSubmission",
                    formType: "Contact Us",
                  }))
                : t(".loading")
                    .fadeIn("slow")
                    .html('<font color="#ff5607">Something went wrong.</font>')
                    .delay(3e3)
                    .fadeOut("slow");
            },
          }),
          !1
        );
      }),
      document.body.addEventListener("touchstart", function () {}),
      t(window).scroll(function () {
        var e = t(window).scrollTop();
        e > 38 && !t("#head").hasClass("head-small")
          ? t("#head").addClass("head-small")
          : e <= 1 &&
            t("#head").hasClass("head-small") &&
            t("#head").removeClass("head-small");
      }),
      t(window).scroll(function () {
        var t = jQuery(window).scrollTop(),
          e = jQuery(window).height() / 3;
        jQuery(".parallax-s").each(function () {
          var i = jQuery(this).offset().top;
          if (t > i - e) {
            var n = (t - (i - e)) / 6;
            jQuery(this).css("transform", "translate3d(0px,-" + n + "px, 0px)");
          }
        });
      });
    var s = document.createElement("script");
    function o() {
      var t = 0;
      jQuery(".blog-news .blog-news-box .content .block").each(function () {
        var e = jQuery(this)
          .children(".text")
          .children(".text-box")
          .outerHeight();
        (t = e > t ? e : t), console.log(t);
      }),
        jQuery(".blog-news .blog-news-box .content .block .text .text-box").css(
          "min-height",
          t
        );
    }
    (s.type = "text/javascript"),
      (s.id = "sc"),
      (s.async = !0),
      (s.src = e + "?action=sc&task=getjs&md5=" + i),
      document.body.appendChild(s),
      jQuery(".hamburger").click(function () {
        jQuery(this).toggleClass("open"),
          jQuery(".head-menu").toggleClass("open"),
          jQuery("#head").toggleClass("open"),
          jQuery(".hamburger").hasClass("open") &&
            (jQuery("body").addClass("hidden"),
            setTimeout(function () {
              jQuery(".head-logo").addClass("open");
            }, 800)),
          jQuery(".hamburger").hasClass("open") ||
            (jQuery("body").removeClass("hidden"),
            setTimeout(function () {
              jQuery(".head-logo").removeClass("open");
            }, 1),
            jQuery(
              ".menu .menu-box .menu-box-box .menu-menu .menu-item-has-children .sub-menu"
            ).removeClass("open-sub-menu")),
          jQuery(".hamburger").hasClass("open");
      }),
      jQuery(".head-menu .menu .menu-item-has-children>a").append(
        "<span class='icon iconfont icondvmp'></span>"
      ),
      jQuery("body").on(
        "click",
        ".head-menu .menu .menu-item-has-children>a .icondvmp",
        function (t) {
          t.preventDefault(),
            jQuery(this).parent("a").siblings(".sub-menu").slideToggle(300),
            jQuery(this)
              .parents(".menu-item-has-children")
              .toggleClass("is-active"),
            jQuery(this)
              .parents(".menu-item-has-children")
              .siblings()
              .children(".sub-menu")
              .slideUp(300),
            jQuery(this)
              .parents(".menu-item-has-children")
              .siblings()
              .removeClass("is-active");
        }
      ),
      (function () {
        jQuery(".home-banner-owl").length > 0 &&
          jQuery(".home-banner-owl").owlCarousel({
            loop: !1,
            margin: 0,
            nav: !1,
            dots: !1,
            autoplay: !1,
            autoplayTimeout: 1e4,
            animateOut: "fadeOut",
            mouseDrag: !1,
            touchDrag: !0,
            lazyLoad: !0,
            responsive: {
              0: { items: 1 },
              600: { items: 1 },
              1000: { items: 1 },
            },
          }),
          jQuery(".thumbnail-owl").length > 0 &&
            jQuery(".thumbnail-owl").owlCarousel({
              loop: !1,
              margin: 12,
              nav: !1,
              dots: !1,
              autoplay: !1,
              autoplayTimeout: 1e4,
              animateOut: "fadeOut",
              mouseDrag: !1,
              touchDrag: !1,
              lazyLoad: !0,
              responsive: {
                0: { items: 3 },
                600: { items: 3 },
                1000: { items: 3 },
              },
            });
        var e = t(".home-banner-owl"),
          i = t(".thumbnail-owl"),
          n = !1;
        e
          .owlCarousel({
            items: 1,
            margin: 10,
            nav: !0,
            dots: !0,
            animateOut: "fadeOut",
          })
          .on("changed.owl.carousel", function (t) {
            n ||
              ((n = !0),
              i.trigger("to.owl.carousel", [t.item.index, 300, !0]),
              (n = !1));
          }),
          i
            .owlCarousel({
              margin: 20,
              items: 3,
              nav: !0,
              center: !1,
              dots: !1,
              navRewind: !1,
            })
            .on("click", ".owl-item", function (i) {
              e.trigger("to.owl.carousel", [t(this).index(), 300, !0]);
              var n = t(this).index(),
                s = document.getElementById("home-video");
              0 !== n
                ? s.pause()
                : setTimeout(function () {
                    s.play();
                  }, 600);
            })
            .on("changed.owl.carousel", function (t) {
              n ||
                ((n = !0),
                e.trigger("to.owl.carousel", [t.item.index, 300, !0]),
                (n = !1));
            }),
          jQuery(".about-style-two .about-style-two-box .left .video").click(
            function () {
              var t = document.getElementById("home-about-video"),
                e = jQuery(this);
              !0 === t.paused
                ? (t.play(), e.children("button").fadeOut(300))
                : (t.pause(), e.children("button").fadeIn(300));
            }
          ),
          jQuery(".home-about .home-about-box .video-and-images .video").click(
            function () {
              var t = document.getElementById("home-about-video"),
                e = jQuery(this);
              !0 === t.paused
                ? (t.play(), e.children("button").fadeOut(300))
                : (t.pause(), e.children("button").fadeIn(300));
            }
          ),
          jQuery(".home-testimonials-owl").length > 0 &&
            jQuery(".home-testimonials-owl").owlCarousel({
              loop: !0,
              margin: 10,
              nav: !0,
              autoplay: !0,
              lazyLoad: !0,
              autoplayTimeout: 1e4,
              smartSpeed: 600,
              navText: [
                "<i class='demo-icon icon-left-arrow'>&#xe81e;</i>",
                "<i class='demo-icon icon-right-arrow'>&#xe81d;</i>",
              ],
              responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 },
              },
            }),
          jQuery(".home-our-work-owl").length > 0 &&
            jQuery(".home-our-work-owl").owlCarousel({
              dots: !1,
              loop: !0,
              margin: 10,
              nav: !0,
              lazyLoad: !0,
              autoplay: !0,
              autoplayTimeout: 1e4,
              smartSpeed: 600,
              navText: [
                "<i class='demo-icon icon-left-arrow'>&#xe81e;</i>",
                "<i class='demo-icon icon-right-arrow'>&#xe81d;</i>",
              ],
              responsive: {
                1200: { items: 3 },
                767: { items: 2 },
                0: { items: 1 },
              },
            }),
          jQuery(".home-our-work .home-our-work-box .right .block a").hover(
            function () {
              jQuery(this).stop().toggleClass("is-active"),
                jQuery(this)
                  .children(".text")
                  .children("p")
                  .stop()
                  .slideToggle(300);
            }
          ),
          jQuery(".home-budiasih-owl").length > 0 &&
            jQuery(".home-budiasih-owl").owlCarousel({
              loop: !0,
              margin: 0,
              nav: !0,
              dots: !1,
              autoplay: !1,
              lazyLoad: !0,
              autoplayTimeout: 6e3,
              animateOut: "fadeOut",
              mouseDrag: !1,
              touchDrag: !0,
              navText: [
                "<i class='demo-icon icon-left-arrow'>&#xe81e;</i>",
                "<i class='demo-icon icon-right-arrow'>&#xe81d;</i>",
              ],
              responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 },
              },
            }),
          jQuery(".home-budiasih-owl").on("changed.owl.carousel", function (t) {
            var e;
            (e = t.item.index),
              jQuery(".home-budiasih-owl .owl-item.nnnn").removeClass("nnnn"),
              jQuery(".home-budiasih-owl .owl-item.pppp").removeClass("pppp"),
              jQuery(".home-budiasih-owl .owl-item")
                .eq(e - 1)
                .addClass("pppp"),
              jQuery(".home-budiasih-owl .owl-item")
                .eq(e + 1)
                .addClass("nnnn");
          }),
          jQuery(".home-our-news-owl").length > 0 &&
            jQuery(".home-our-news-owl").owlCarousel({
              loop: !0,
              margin: 10,
              nav: !1,
              autoplay: !0,
              dots: !1,
              lazyLoad: !0,
              lazyLoadEager: 1,
              autoplayTimeout: 1e4,
              smartSpeed: 600,
              responsive: {
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 },
              },
            });
        var s = jQuery(".home-our-news-owl");
        jQuery(".home-our-news .home-our-news-box .prev").click(function () {
          s.trigger("prev.owl.carousel");
        }),
          jQuery(".home-our-news .home-our-news-box .next").click(function () {
            s.trigger("next.owl.carousel");
          }),
          jQuery(".home-faq .home-faq-box .content .block .heading").click(
            function () {
              jQuery(this).siblings(".text").slideToggle(300),
                jQuery(this).toggleClass("is-active"),
                jQuery(this)
                  .parents(".block")
                  .siblings()
                  .children(".text")
                  .slideUp(300),
                jQuery(this)
                  .parents(".block")
                  .siblings()
                  .children(".heading")
                  .removeClass("is-active");
            }
          ),
          jQuery(".blog-news .blog-news-box .content .block a").hover(
            function () {
              jQuery(this).parents(".block").toggleClass("is-active");
            }
          ),
          jQuery(".video.video-iframe").click(function (t) {
            t.preventDefault(),
              jQuery(document).bind("mousewheel DOMMouseScroll", function (t) {
                t.preventDefault();
              }),
              jQuery(document).bind("touchmove", function (t) {
                t.preventDefault();
              }),
              jQuery(".video-light-box").fadeIn(300);
            var e = jQuery(this).find(".data-video").html();
            console.log(e),
              jQuery(".video-light-box").find(".play-iframe-video").html(e);
          }),
          jQuery(".video-light-box .close").click(function () {
            jQuery(document).unbind("mousewheel DOMMouseScroll"),
              jQuery(document).unbind("touchmove"),
              jQuery(".video-light-box").fadeOut(300),
              setTimeout(function () {
                jQuery(".video-light-box").find(".play-iframe-video").html("");
              }, 300);
          });
      })(),
      o(),
      jQuery(".download-pop-up").length > 0 &&
        (jQuery(".download-btn").on("click", function (t) {
          t.preventDefault(),
            jQuery(".download-pop-up").addClass("up"),
            jQuery("body").addClass("body-hidden");
        }),
        jQuery(".download-pop-up .masker-layer").on("click", function (t) {
          t.preventDefault(),
            jQuery(".download-pop-up").removeClass("up"),
            jQuery("body").removeClass("body-hidden");
        }),
        jQuery(".download-pop-up .close").on("click", function (t) {
          t.preventDefault(),
            jQuery(".download-pop-up").removeClass("up"),
            jQuery("body").removeClass("body-hidden");
        })),
      jQuery(window).resize(function () {
        o();
      });
  });
