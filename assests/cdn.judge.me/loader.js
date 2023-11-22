"use strict";
!(function () {
  (window.jdgm = window.jdgm || {}),
    (window.judgeme = jdgm),
    (jdgm.CDN_HOST = jdgm.CDN_HOST || "https://cdn.judge.me/");
  var e = ".jdgm-all-reviews-page, .jdgm-all-reviews-widget",
    t = {
      "widget/arp.js": e,
      "widget/others.js":
        ".jdgm-carousel, .jdgm-revs-tab, .jdgm-all-reviews-rating, .jdgm-medals, .jdgm-all-reviews-text__text, .jdgm-ugc-media, .jdgm-verified-badge",
      "widget/main.js":
        ".jdgm-review-widget, #judgeme_product_reviews, .jdgm-preview-badge, .judgeme-preview-badge",
    },
    n = Object.assign({}, t, {
      "widget/media.js":
        ".jdgm-revs-tab, .jdgm-medal__image, .jdgm-review-widget, #judgeme_product_reviews, .jdgm-ugc-media, " +
        e,
    }),
    i = {
      "main.css": {
        selector:
          ".jdgm-review-widget, #judgeme_product_reviews, .jdgm-revs-tab, .jdgm-ugc-media, " +
          e,
        callback: function () {
          var e = document.createEvent("Event");
          e.initEvent("jdgm.doneLoadingCss", !0, !0), document.dispatchEvent(e);
        },
      },
    },
    r = { "media.css": ".jdgm-ugc-media" },
    o = [
      "judgeme_token",
      "judgeme_review_uuid",
      "judgeme_dynamic_form",
      "judgeme_follow_up_token",
      "judgeme_upload_pictures",
    ],
    a = jdgm.CDN_HOST + "widget/base.js",
    s = jdgm.CDN_HOST + "widget/common.js",
    l = !1,
    u = !1,
    c = [];
  (jdgm.prefetchResource = function (e, t) {
    var n = document.createElement("link");
    (n.className = "jdgm-prefetch"),
      (n.rel = "prefetch"),
      t && (n.as = t),
      (n.href = e),
      document.body.appendChild(n);
  }),
    (jdgm.loadScript = function (e, t, n) {
      if (n || !(jdgm.loadScript.requestedUrls.indexOf(e) >= 0))
        if (
          (jdgm.loadScript.requestedUrls.push(e),
          jdgm.loadJS && jdgmSettings.widget_advanced_speed_features <= 10)
        )
          jdgm.loadJS(e, t);
        else if (jdgm.$ && jdgm.$.ajax)
          jdgm.$.ajax({ dataType: "script", cache: !0, url: e }).done(t);
        else {
          var i = document.createElement("script");
          (i.className = "jdgm-script"),
            (i.type = "text/javascript"),
            (i.src = e),
            (i.async = !0),
            t && (i.onload = t),
            document.body.appendChild(i);
        }
    }),
    (jdgm.loadScript.requestedUrls = []),
    (jdgm.loadCSS = function (e, t, n) {
      if (n || !(jdgm.loadCSS.requestedUrls.indexOf(e) >= 0)) {
        jdgm.loadCSS.requestedUrls.push(e);
        var i = document.createElement("link");
        (i.rel = "stylesheet"),
          (i.className = "jdgm-stylesheet"),
          (i.media = "nope!"),
          (i.href = e),
          (i.onload = function () {
            (this.media = "all"), t && setTimeout(t);
          }),
          document.body.appendChild(i);
      }
    }),
    (jdgm.loadCSS.requestedUrls = []),
    (jdgm.docReady = function (e) {
      (
        document.attachEvent
          ? "complete" === document.readyState
          : "loading" !== document.readyState
      )
        ? setTimeout(e, 0)
        : document.addEventListener("DOMContentLoaded", e);
    });
  var d = function () {
      return document.querySelectorAll(Object.values(t).join(", ")).length > 0;
    },
    p = function () {
      (u = !0),
        c.forEach(function (e) {
          e();
        }),
        setTimeout(function () {
          jdgm.triggerVanillaEvent("finishLoadingCore");
        }, 0);
    },
    f = function (e) {
      l ||
        ((l = !0),
        jdgm.loadScript(a, function () {
          jdgm.loadScript(s, p);
        }),
        jdgm.prefetchResource(s, "script")),
        u ? e() : c.push(e);
    },
    h = function () {
      var e = window.location,
        t = "#judgeme" == e.hash || "#judgeme_product_reviews" == e.hash;
      return (
        o.forEach(function (n) {
          t = t || e.search.indexOf(n) >= 0;
        }),
        t
      );
    },
    m = function () {
      f(function () {
        Object.keys(t).forEach(function (e) {
          document.querySelectorAll(t[e]).length > 0 &&
            jdgm.loadScript(jdgm.CDN_HOST + e);
        });
      }),
        Object.keys(n).forEach(function (e) {
          document.querySelectorAll(n[e]).length > 0 &&
            jdgm.prefetchResource(jdgm.CDN_HOST + e, "script");
        }),
        h() &&
          (jdgm.prefetchResource(jdgm.CDN_HOST + "widget/form.js", "script"),
          jdgm.prefetchResource(jdgm.widgetPath("form.css"), "style"));
    },
    g = function () {
      jdgm.loadCSS(jdgm.widgetPath("base.css")),
        Object.keys(i).forEach(function (e) {
          if (document.querySelectorAll(i[e].selector).length > 0) {
            var t = jdgm.widgetPath(e);
            jdgm.loadCSS(t, i[e].callback);
          }
        }),
        Object.keys(r).forEach(function (e) {
          document.querySelectorAll(r[e]).length > 0 &&
            jdgm.prefetchResource(jdgm.widgetPath(e), "stylesheet");
        });
    };
  jdgm.docReady(function () {
    (jdgm.isVersion3 = parseFloat(jdgmSettings.widget_version) >= 3),
      (jdgm.widgetPath = function (e) {
        var t = jdgm.isVersion3 ? "widget_v3/" : "widget/";
        return jdgm.CDN_HOST + t + e;
      });
  }),
    jdgm.docReady(function () {
      if (window.jdgmLoadCSS || d()) {
        var e = jdgm.CDN_HOST + "shopify_v2.css";
        document.querySelector("link[rel='stylesheet'][href='" + e + "']") ||
          (jdgmSettings.widget_load_with_code_splitting
            ? g()
            : jdgm.loadCSS(e));
      }
    }),
    jdgm.docReady(function () {
      (window.jdgmLoadJS || d()) &&
        (jdgmSettings.widget_load_with_code_splitting
          ? m()
          : jdgm.loadScript(jdgm.CDN_HOST + "shopify_v2.js", p));
    });
})();
