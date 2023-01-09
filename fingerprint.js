export const spoofing = (seed) => {
  console.log("🚀 ~ file: fingerprint.ts ~ line 2 ~ spoofing ~ seed", seed);

  // console.log('Spoofing');
  !(function (t) {
    const e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      const o = (e[r] = {
        i: r,
        l: !1,
        exports: {},
      });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) ||
          Object.defineProperty(t, e, {
            enumerable: !0,
            get: r,
          });
      }),
      (n.r = function (t) {
        typeof Symbol !== "undefined" &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(t, "__esModule", {
            value: !0,
          });
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && typeof t === "object" && t && t.__esModule) return t;
        const r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t,
          }),
          2 & e && typeof t !== "string")
        )
          for (const o in t)
            n.d(
              r,
              o,
              function (e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function (t) {
        const e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 0));
  })([
    function (t, e) {
      const n = function (t) {
        // console.log('Seed: ', seed);
        // console.log(window);
        // console.log(window?.location?.ancestorOrigins);
        let e = JSON.parse(t);
        const n = e.g.substr(2, 5);
        const r = e.g.substr(7);
        window[n] ? (e = Object.assign(window[n], e)) : (window[n] = e);
        const o = function (t, n) {
          return n.forEach(function (n) {
            return (e[n] = (t | e.v) == e.v ? t : 0);
          });
        };
        if (
          (o(1, [
            "toDataURL",
            "toBlob",
            "getImageData",
            "getLineDash",
            "measureText",
          ]),
          o(2, ["readPixels", "bufferData", "getParameter"]),
          o(4, ["getChannelData", "getFloatFrequencyData"]),
          o(8, ["offsetWidth", "offsetHeight"]),
          o(16, [
            "getBattery",
            "getGamepads",
            "getVRDisplays",
            "screen",
            "plugins",
            "mimeTypes",
            "platform",
            "language",
            "languages",
          ]),
          o(32, [
            "enumerateDevices",
            "MediaStreamTrack",
            "RTCPeerConnection",
            "RTCSessionDescription",
            "webkitMediaStreamTrack",
            "webkitRTCPeerConnection",
            "webkitRTCSessionDescription",
          ]),
          o(64, ["getClientRects"]),
          o(128, ["getTimezoneOffset", "resolvedOptions"]),
          o(256, ["logs"]),
          (e.s = (512 | e.v) == e.v ? Math.random() : parseFloat(e.s)),
          !window[r])
        ) {
          const i = function (t) {
            return Math.floor(e.s * t);
          };
          const a = function () {
            return (
              e.i % e.c == 0 && ((e.i = 1), e.n.push((e.c = e.n.shift()))),
              e.r % e.c == e.i++ ? 1 : 0
            );
          };
          Object.assign(e, {
            i: 0,
            c: 7,
            n: [7, 11, 13, 17, 19, 2053],
            r: i(1e6),
          });
          const u = function (t) {
            if (t[r]) return t;
            const n = function (t, n) {
              const r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : function () {
                      return 0;
                    };
              const o = function (n, r) {
                const o = t[n];
                Object.defineProperty(t, n, {
                  get() {
                    return (e[n] !== 0 ? r : o).bind(this);
                  },
                });
              };
              t &&
                (typeof n === "string"
                  ? o(n, r)
                  : n instanceof Array
                  ? n.forEach(function (t) {
                      return o(t, r);
                    })
                  : Object.keys(n).forEach(function (t) {
                      return o(t, n[t]);
                    }));
            };
            const o = function (t, n) {
              return Object.keys(n).forEach(function (r) {
                const o = t[r];
                Object.defineProperty(t, r, {
                  get() {
                    return e[r] !== 0 ? n[r] : o;
                  },
                });
              });
            };
            const u = function (n) {
              try {
                n(t);
              } catch (t) {
                e.debug && console.error(t);
              }
            };
            return (
              u(function (r) {
                console.log("🚀 ~ file: fingerprint.ts ~ line 188 ~ r", r);
                const o = r.HTMLCanvasElement.prototype;
                const a = o.toDataURL;
                console.log(
                  "🚀 ~ file: fingerprint.ts ~ line 190 ~ o.toDataURL",
                  o.toDataURL
                );
                const u = o.toBlob;
                console.log(
                  "🚀 ~ file: fingerprint.ts ~ line 192 ~ o.toBlob",
                  o.toBlob
                );
                const c = r.CanvasRenderingContext2D.prototype.getImageData;
                const s = t.document.createElement("canvas");
                const p = s.getContext("2d");
                const f = function (t) {
                  !(function (t, n) {
                    if (e.logs) {
                      const r = {};
                      (r[t] = n),
                        window.dispatchEvent(
                          new CustomEvent(e.g, {
                            detail: r,
                          })
                        );
                    }
                  })(location.host, a.apply(t));
                  const n = t.width;
                  const r = t.height;
                  return (
                    Object.assign(s, {
                      width: n,
                      height: r,
                    }),
                    p.drawImage(t, 0, 0),
                    (p.fillStyle = "rgba(255,255,255,".concat(e.s, ")")),
                    p.fillRect(0, 0, 0.6, 0.6),
                    s
                  );
                };
                n(r.HTMLCanvasElement.prototype, {
                  toDataURL() {
                    return a.apply(f(this), arguments);
                  },
                  toBlob() {
                    return u.apply(f(this), arguments);
                  },
                }),
                  n(r.CanvasRenderingContext2D.prototype, {
                    getImageData() {
                      return f(this.canvas), c.apply(this, arguments);
                    },
                    getLineDash: (function (t) {
                      function e() {
                        return t.apply(this, arguments);
                      }
                      return (
                        (e.toString = function () {
                          return t.toString();
                        }),
                        e
                      );
                    })(() => {
                      return f(this.canvas), getLineDash.apply(this, arguments);
                    }),
                    measureText() {
                      return {
                        width: 0.01 * i(21543),
                        __proto__: r.TextMetrics.prototype,
                      };
                    },
                  });
              }),
              u(function (t) {
                return n(t.WebGL2RenderingContext.prototype, {
                  getParameter() {
                    return i(8190);
                  },
                  readPixels() {},
                  bufferData() {},
                });
              }),
              u(function (t) {
                return n(t.WebGLRenderingContext.prototype, {
                  getParameter() {
                    return i(8190);
                  },
                  readPixels() {},
                  bufferData() {},
                });
              }),
              u(function (t) {
                let r = null;
                const o = t.AudioBuffer.prototype.getChannelData;
                n(t.AudioBuffer.prototype, {
                  getChannelData() {
                    const t = o.apply(this, arguments);
                    if (r == t) return r;
                    r = t;
                    for (let n = 0; n < r.length; n += 88) {
                      const a = i(n);
                      r[a] = (r[a] + e.s) / 2;
                    }
                    return r;
                  },
                });
              }),
              u(function (t) {
                const r = t.AnalyserNode.prototype.getFloatFrequencyData;
                n(t.AnalyserNode.prototype, {
                  getFloatFrequencyData() {
                    for (
                      var t = r.apply(this, arguments), n = 0;
                      n < arguments[0].length;
                      n += 88
                    ) {
                      const o = i(n);
                      arguments[o] = (arguments[o] + e.s) / 2;
                    }
                    return t;
                  },
                });
              }),
              u(function (t) {
                return (
                  (n = t.HTMLElement.prototype),
                  (r = {
                    offsetWidth() {
                      return (
                        Math.floor(this.getBoundingClientRect().width) + a()
                      );
                    },
                    offsetHeight() {
                      return (
                        Math.floor(this.getBoundingClientRect().height) + a()
                      );
                    },
                  }),
                  Object.keys(r).forEach(function (t) {
                    const o = n.__lookupGetter__(t);
                    Object.defineProperty(n, t, {
                      get() {
                        return (e[t] !== 0 ? r[t] : o).apply(this, arguments);
                      },
                    });
                  })
                );
                let n;
                let r;
              }),
              u(function (t) {
                return n(t.Element.prototype, "getClientRects", function () {
                  return {
                    0: {
                      x: 0,
                      y: 0,
                      top: 0,
                      bottom: i(500),
                      left: 0,
                      right: i(400),
                      height: i(500),
                      width: i(400),
                      __proto__: t.DOMRect.prototype,
                    },
                    length: 1,
                    __proto__: t.DOMRectList.prototype,
                  };
                });
              }),
              u(function (t) {
                return o(t, {
                  screen: {
                    availLeft: 0,
                    availTop: 0,
                    availWidth: 1024,
                    availHeight: 768,
                    width: 1024,
                    height: 768,
                    colorDepth: 16,
                    pixelDepth: 16,
                    __proto__: t.Screen.prototype,
                    orientation: {
                      angle: 0,
                      type: "landscape-primary",
                      onchange: null,
                      __proto__: t.ScreenOrientation.prototype,
                    },
                  },
                });
              }),
              u(function (t) {
                return n(t.navigator, [
                  "getBattery",
                  "getGamepads",
                  "getVRDisplays",
                ]);
              }),
              u(function (t) {
                return o(t.navigator, {
                  plugins: {
                    length: 0,
                    __proto__: t.PluginArray.prototype,
                  },
                  mimeTypes: {
                    length: 0,
                    __proto__: t.MimeTypeArray.prototype,
                  },
                  platform: "Win32",
                  language: "en-US",
                  languages: ["en-US"],
                });
              }),
              u(function (t) {
                const e = t.navigator.mediaDevices.enumerateDevices;
                n(t.navigator.mediaDevices, {
                  enumerateDevices() {
                    return e.apply(this, arguments).then(function (e) {
                      return (
                        e.push({
                          deviceId: "default",
                          groupId: "n/a",
                          kind: "audiooutput",
                          label: `FPS-Audio ${i(400)}`,
                          __proto__: t.MediaDeviceInfo.prototype,
                        }),
                        e
                      );
                    });
                  },
                });
              }),
              u(function (t) {
                return n(t, [
                  "MediaStreamTrack",
                  "RTCPeerConnection",
                  "RTCSessionDescription",
                  "webkitMediaStreamTrack",
                  "webkitRTCPeerConnection",
                  "webkitRTCSessionDescription",
                ]);
              }),
              u(function (t) {
                return n(
                  t.Intl.DateTimeFormat.prototype,
                  "resolvedOptions",
                  function () {
                    return {
                      calendar: "gregory",
                      day: "numeric",
                      locale: "en-US",
                      month: "numeric",
                      numberingSystem: "latn",
                      timeZone: "UTC",
                      year: "numeric",
                    };
                  }
                );
              }),
              u(function (t) {
                return n(t.Date.prototype, "getTimezoneOffset", function () {
                  return [
                    720, 660, 600, 570, 540, 480, 420, 360, 300, 240, 210, 180,
                    120, 60, 0, -60, -120, -180, -210, -240, -270, -300, -330,
                    -345, -360, -390, -420, -480, -510, -525, -540, -570, -600,
                    -630, -660, -720, -765, -780, -840,
                  ][i(39)];
                });
              }),
              (t[r] = !0),
              t
            );
          };
          u(window);
          const c =
            HTMLIFrameElement.prototype.__lookupGetter__("contentWindow");
          const s =
            HTMLIFrameElement.prototype.__lookupGetter__("contentDocument");
          Object.defineProperties(HTMLIFrameElement.prototype, {
            contentWindow: {
              get() {
                const t = c.apply(this, arguments);
                return this.src &&
                  this.src.indexOf("//") != -1 &&
                  location.host != this.src.split("/")[2]
                  ? t
                  : u(t);
              },
            },
            contentDocument: {
              get() {
                return this.src &&
                  this.src.indexOf("//") != -1 &&
                  location.host != this.src.split("/")[2]
                  ? s.apply(this, arguments)
                  : (u(c.apply(this, arguments)), s.apply(this, arguments));
              },
            },
          });
        }
      };
      const seedToG = function (e) {
        return (
          1e-99 *
          new Uint8Array(e.length)
            .map(function (t, n) {
              return e.charCodeAt(n);
            })
            .reduce(function (e, t, n) {
              return e + t * Math.pow(8, n);
            }, 0)
        )
          .toExponential()
          .slice(1, -4);
      };
      console.log(
        "🚀 ~ file: fingerprint.ts ~ line 498 ~ spoofing ~ seedToG(seed)",
        seedToG(seed)
      );
      if (!window?.location?.ancestorOrigins?.length)
        n(
          JSON.stringify({
            v: 111,
            s: seedToG(seed),
            g: Math.random().toString(36).substr(2),
          })
        );
    },
  ]);
};
