var Gamee;
!function (t) {
  var e = function () {
    function t(e, i) {
      void 0 === i && (i = !1), this._game = null, this._gameeController = null, this._indices = {
        right: 1,
        up: 2,
        left: 4,
        down: 8,
        A: 16,
        B: 32,
        button: 64
      }, this._pressesCache = 0, this._isDown = 0, this._justDown = 0, this._justUp = 0, this._gameRunning = !1, this._score = 0, void 0 !== window.gamee && ("Touch" !== e ? (this._gameeController = window.gamee.controller.requestController(e, {enableKeyboard: i}), this.keyHandlers()) : (this._gameeController = window.gamee.controller.requestController("Touch"), this.touchHandlers())), this.eventHandlers(), t._instance = this
    }

    return Object.defineProperty(t, "instance", {
      get: function () {
        return null === t._instance, t._instance
      }, enumerable: !0, configurable: !0
    }), t.prototype.setGame = function (t) {
      this._game = t
    }, Object.defineProperty(t.prototype, "gameRunning", {
      get: function () {
        return this._gameRunning
      }, enumerable: !0, configurable: !0
    }), t.prototype.keyHandlers = function () {
      var t = this;
      this._gameeController.on("keydown", function (e) {
        t._pressesCache |= t._indices[e.button];
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeButtonDown && i.onGameeButtonDown(e.button)
      }), this._gameeController.on("keyup", function (e) {
        t._pressesCache &= ~t._indices[e.button];
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeButtonUp && i.onGameeButtonUp(e.button)
      })
    }, t.prototype.processKeys = function () {
      var t = this._isDown;
      this._isDown = this._pressesCache;
      var e = t ^ this._isDown;
      this._justDown = e & this._isDown, this._justUp = e & ~this._isDown
    }, t.prototype.clearKeys = function () {
      this._pressesCache = 0, this._isDown = 0, this._justDown = 0, this._justUp = 0
    }, t.prototype.isDown = function (t) {
      return (this._isDown & this._indices[t]) > 0
    }, t.prototype.justDown = function (t) {
      return (this._justDown & this._indices[t]) > 0
    }, Object.defineProperty(t.prototype, "anyIsDown", {
      get: function () {
        return this._isDown > 0
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "anyJustDown", {
      get: function () {
        return this._justDown > 0
      }, enumerable: !0, configurable: !0
    }), t.prototype.isUp = function (t) {
      return !this.isDown(t)
    }, t.prototype.justUp = function (t) {
      return (this._justUp & this._indices[t]) > 0
    }, t.prototype.touchHandlers = function () {
      var t = this;
      this._gameeController.on("touchstart", function (e) {
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeTouchStart && i.onGameeTouchStart(e)
      }), this._gameeController.on("touchend", function (e) {
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeTouchEnd && i.onGameeTouchEnd(e)
      }), this._gameeController.on("touchmove", function (e) {
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeTouchMove && i.onGameeTouchMove(e)
      }), this._gameeController.on("touchleave", function (e) {
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeTouchLeave && i.onGameeTouchLeave(e)
      }), this._gameeController.on("touchcancel", function (e) {
        var i = t._game.state.getCurrentState();
        "function" == typeof i.onGameeTouchCancel && i.onGameeTouchCancel(e)
      })
    }, t.prototype.eventHandlers = function () {
      var t = this;
      window.gamee.onPause = function () {
        t.onPause()
      }, window.gamee.onUnpause = function () {
        t.onUnpause()
      }, window.gamee.onRestart = function () {
        t.onRestart()
      }, window.gamee.onMute = function () {
        t._game.onMute()
      }, window.gamee.onUnmute = function () {
        t._game.onUnmute()
      }
    }, t.prototype.onPause = function () {
      var t = this._game.state.getCurrentState();
      "function" == typeof t.onGameePause && t.onGameePause()
    }, t.prototype.onUnpause = function () {
      var t = this._game.state.getCurrentState();
      "function" == typeof t.onGameeUnpause && t.onGameeUnpause()
    }, t.prototype.onRestart = function () {
      var t = this._game.state.getCurrentState();
      "function" == typeof t.onGameeRestart && t.onGameeRestart()
    }, Object.defineProperty(t.prototype, "score", {
      get: function () {
        return this._score
      }, set: function (t) {
        this._score = t, window.gamee.score = t
      }, enumerable: !0, configurable: !0
    }), t.prototype.addScore = function (t) {
      this.score += t
    }, t.prototype.gameStart = function () {
      this._gameRunning || (this._gameRunning = !0, window.gamee.gameStart())
    }, t.prototype.gameOver = function () {
      this._gameRunning && (this._gameRunning = !1, window.gamee.gameOver())
    }, t._instance = null, t
  }();
  t.Gamee = e
}(Gamee || (Gamee = {}));
var Log;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.msg = function (e) {
      var i = t.messages;
      if (i.length < t.MAX_LINE)t.messages.push(e); else {
        for (var n = 1; n < t.MAX_LINE; n++)i[n - 1] = i[n];
        i[t.MAX_LINE - 1] = e
      }
    }, t.render = function (e) {
      for (var i = t.messages, n = 0; n < i.length; n++)e.text(i[n], 50, 70 + 16 * n, "RGB(255, 0, 0)")
    }, t.MAX_LINE = 20, t.messages = [], t
  }();
  t.Log = e
}(Log || (Log = {}));
var Helper;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.randomizeArray = function (t, e, i, n) {
      void 0 === i && (i = !1), void 0 === n && (n = !1);
      var a = i ? e.slice() : e;
      return Phaser.ArrayUtils.shuffle(a), n ? a.slice(0, t) : a
    }, t.sort = function (e, i, n, a) {
      if (void 0 === n && (n = 0), void 0 === a && (a = e.length), a > n) {
        for (var s, r = n, o = n + 1; a >= o; o++)i(e[n], e[o]) > 0 && (s = e[++r], e[r] = e[o], e[o] = s);
        s = e[n], e[n] = e[r], e[r] = s, t.sort(e, i, n, r - 1), t.sort(e, i, r + 1, a)
      }
    }, t
  }();
  t.ArrayUtils = e
}(Helper || (Helper = {}));
var Helper;
!function (t) {
  var e;
  !function (t) {
    function e(t, e, i) {
      var n = t * Math.PI * 2 * e, a = t * (2 * Math.PI * i + Math.PI / 2);
      return Math.sin(n) * Math.cos(a)
    }

    function i(t, e, i) {
      var n = t * Math.PI * 2 * e, a = -t * i;
      return Math.sin(n) * Math.exp(a)
    }

    function n(t) {
      return -2 * t * t + 3 * t
    }

    function a(t) {
      return -(n(1 - t) - 1)
    }

    function s(t) {
      return Math.sin(2 * t * Math.PI)
    }

    function r(t) {
      return Math.sin(t * Math.PI)
    }

    function o(t, e) {
      return Math.sin(2 * t * Math.PI * e)
    }

    t.wiggle = e, t.sinWithExpDecay = i, t.pop5 = n, t.pop5rev = a, t.sin = s, t.halfSin = r, t.sinWithPeriod = o
  }(e = t.Easing || (t.Easing = {}))
}(Helper || (Helper = {}));
var Helper;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.create = function (e, i, n, a, s, r, o, h, l, u) {
      return void 0 === r && (r = 0), void 0 === o && (o = 0), void 0 === h && (h = 0), void 0 === l && (l = 0), void 0 === u && (u = !1), t._image = new Phaser.Image(e, 0, 0, a), "string" == typeof s ? t._frame = e.cache.getFrameByName(a, s) : t._frame = e.cache.getFrameByIndex(a, s), t.calculateNineImage(i, n, r, o, h, l, u), t._nineImage = new Phaser.BitmapData(e, "NineImage" + t._textureKey++, t._width, t._height), t.renderNineImage(), t._nineImage
    }, t.calculateNineImage = function (e, i, n, a, s, r, o) {
      var h = t._frame;
      if (t._centralWidth = h.width - a - r, t._centralHeight = h.height - n - s, o)t._horizontalRepeats = e, t._verticalRepeats = i, t._width = a + r + t._centralWidth * e, t._height = n + s + t._centralHeight * i, t._lastWidth = 0, t._lastHeight = 0; else {
        var l = e - a - r;
        t._horizontalRepeats = Math.floor(l / t._centralWidth), t._lastWidth = l % t._centralWidth;
        var u = i - n - s;
        t._verticalRepeats = Math.floor(u / t._centralHeight), t._lastHeight = u % t._centralHeight, t._width = e, t._height = i
      }
      t._leftWidth = a, t._rightWidth = r, t._topHeight = n, t._bottomHeight = s
    }, t.renderNineImage = function () {
      var e = t._frame.y, i = 0;
      t._topHeight > 0 && (t.renderNineImageRow(t._image, e, i, t._topHeight), e += t._topHeight, i += t._topHeight);
      for (var n = 0; n < t._verticalRepeats; n++)t.renderNineImageRow(t._image, e, i, t._centralHeight), i += t._centralHeight;
      t._lastHeight > 0 && (t.renderNineImageRow(t._image, e, i, t._lastHeight), i += t._lastHeight), e += t._centralHeight, t._bottomHeight > 0 && t.renderNineImageRow(t._image, e, i, t._bottomHeight)
    }, t.renderNineImageRow = function (e, i, n, a) {
      var s = t._frame.x, r = 0;
      t._leftWidth > 0 && (t._nineImage.copy(e, s, i, t._leftWidth, a, r, n), r += t._leftWidth, s += t._leftWidth);
      for (var o = 0; o < t._horizontalRepeats; o++)t._nineImage.copy(e, s, i, t._centralWidth, a, r, n), r += t._centralWidth;
      t._lastWidth > 0 && (t._nineImage.copy(e, s, i, t._lastWidth, a, r, n), r += t._lastWidth), s += t._centralWidth, t._rightWidth > 0 && t._nineImage.copy(e, s, i, t._rightWidth, a, r, n)
    }, t._textureKey = 0, t
  }();
  t.NineImage = e
}(Helper || (Helper = {}));
var Helper;
!function (t) {
  var e;
  !function (t) {
    t[t.UNDEFINED = -1] = "UNDEFINED", t[t.SPACE = 1] = "SPACE", t[t.NEWLINE = 2] = "NEWLINE", t[t.CHARACTER = 3] = "CHARACTER"
  }(e || (e = {}));
  var i = function () {
    function t() {
    }

    return t.hasNext = function () {
      return t.textPosition < t.text.length
    }, t.getChar = function () {
      return t.text.charAt(t.textPosition++)
    }, t.peekChar = function () {
      return t.text.charAt(t.textPosition)
    }, t.getPosition = function () {
      return t.textPosition
    }, t.setPosition = function (e) {
      t.textPosition = e
    }, t.getCharAdvance = function (e, i) {
      var n = t.fontData.chars[e], a = n.xAdvance;
      return i > 0 && n.kerning[i] && (a += n.kerning[i]), a
    }, t.getCharType = function (t) {
      return " " === t ? e.SPACE : /(?:\r\n|\r|\n)/.test(t) ? e.NEWLINE : e.CHARACTER
    }, t.wrapText = function (i, n, a, s, r, o) {
      t.text = n, t.setPosition(0), t.fontData = i.cache.getBitmapFont(r).font, void 0 === o && (o = t.fontData.size);
      var h = o / t.fontData.size, l = t.fontData.lineHeight * h, u = a / h, c = [], p = [], _ = [], m = 0, d = !0, f = 0, g = 0;
      c[m] = g, _[f++] = 0;
      for (var P = s; t.hasNext();) {
        for (var y = 0, E = 0, v = -1, N = e.UNDEFINED, T = e.UNDEFINED, C = u, R = -1; t.hasNext();) {
          g = t.getPosition();
          var A = t.getChar();
          N = t.getCharType(A);
          var M = A.charCodeAt(0);
          if (N === e.SPACE)T !== e.SPACE && (E = y), ++y, C -= t.getCharAdvance(M, R); else if (N === e.CHARACTER) {
            if (T !== e.CHARACTER && (v = g), C -= t.getCharAdvance(M, R), 0 > C)break;
            ++y
          } else if (N === e.NEWLINE) {
            var S = !1;
            if (t.hasNext() && (S = !0, E = y, v = t.getPosition(), g = v, C = -1, N = e.CHARACTER), S)break
          }
          T = N, R = M
        }
        P -= l, 0 > P && (_[f++] = m), 0 > C && N === e.CHARACTER ? (0 !== E ? p[m] = E : p[m] = y, d = !1, 0 > P && (d = !0, P = s - l), 0 !== E ? (c[++m] = v, t.setPosition(v)) : (c[++m] = g, t.setPosition(g))) : t.hasNext() || (N === e.CHARACTER ? p[m] = y : N === e.SPACE && (p[m] = E))
      }
      _[f] = m + 1;
      for (var w = [], b = 1; f >= b; b++) {
        for (var O = _[b - 1], I = _[b], U = [], x = O; I > x; x++)U.push(t.text.substr(c[x], p[x]));
        w.push(U.join("\n"))
      }
      return w
    }, t
  }();
  t.TextWrapper = i
}(Helper || (Helper = {}));
var Particles;
!function (t) {
  var e = function () {
    function e(t, i) {
      this.maxVelocity = e.MAX_VELOCITY, this._delay = 0, this._velocity = new Phaser.Point(0, 0), this._angularVelocity = 0, this._friction = 0, this._angularDrag = 0, this._gravity = 0, this._alpha = 1, this._scaleChange = 0, this._alphaChange = 0, this._game = t
    }

    return Object.defineProperty(e.prototype, "visual", {
      get: function () {
        return this._visual
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "on", {
      set: function (t) {
        this._on = t, this._visual.exists = t, this._visual.visible = t
      }, enumerable: !0, configurable: !0
    }), e.prototype.remove = function () {
      var t = this._visual.parent;
      null !== t && (t instanceof Phaser.Group ? t.remove(this._visual) : t.removeChild(this._visual), t = null)
    }, e.prototype.bringToTop = function () {
      var t = this._visual.parent;
      t instanceof Phaser.Group && t.bringToTop(this._visual)
    }, e.prototype.sendToBack = function () {
      var t = this._visual.parent;
      t instanceof Phaser.Group && t.sendToBack(this._visual)
    }, Object.defineProperty(e.prototype, "textureKey", {
      set: function (t) {
        this._textureKey = t
      }, enumerable: !0, configurable: !0
    }), e.prototype.setScaleChange = function (t, e) {
      void 0 === e && (e = 0), this._scaleChangeType = t, this._scaleChange = e
    }, Object.defineProperty(e.prototype, "delay", {
      set: function (t) {
        this._delay = t, t > 0 && (this.on = !1)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "alpha", {
      set: function (t) {
        this._alpha = t, this._visual.alpha = Phaser.Math.clamp(t, 0, 1)
      }, enumerable: !0, configurable: !0
    }), e.prototype.setAlphaChange = function (t, e) {
      void 0 === e && (e = 0), this._alphaChangeType = t, this._alphaChange = e
    }, e.prototype.setPhysics = function (t, e, i, n, a, s) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === a && (a = 0), void 0 === s && (s = 0), this._velocity.setTo(t, e), this._angularVelocity = i, this._friction = n, this._angularDrag = a, this._gravity = s, this._simplePhysics = 0 === s && 0 === n && 0 === a
    }, e.prototype.setFrame = function (t) {
    }, e.prototype.onEmit = function (t) {
      t.add(this._visual)
    }, e.prototype.onKill = function (t) {
    }, e.prototype.update = function (e) {
      void 0 === e && (e = !0);
      var i = this._game.time.physicsElapsed;
      if (this._delay > 0) {
        if ((this._delay -= i) > 0)return !0;
        this.on = !0
      }
      if (this.lifetime > 0 && (this.lifetime -= i) <= 0)return !1;
      if ((0 !== this._velocity.x || 0 !== this._velocity.y) && (this._visual.x += this._velocity.x * i, this._visual.y += this._velocity.y * i), 0 !== this._angularVelocity && (this._visual.angle += this._angularVelocity * i), this._simplePhysics || (this._velocity.x += -this._friction * this._velocity.x * i, this._velocity.y += (this._gravity - this._friction * this._velocity.y) * i, this._angularVelocity += -this._angularDrag * this._angularVelocity * i), !e)return !0;
      if (this._scaleChangeType != t.eParameterChangeType.NO_CHANGE)switch (this._scaleChangeType) {
        case t.eParameterChangeType.IN_TIME:
          (this._visual.scale.x += this._scaleChange * i) < 0 && (this._visual.scale.x = 0, this._scaleChange < 0 && (this._scaleChangeType = t.eParameterChangeType.NO_CHANGE)), (this._visual.scale.y += this._scaleChange * i) < 0 && (this._visual.scale.y = 0, this._scaleChange < 0 && (this._scaleChangeType = t.eParameterChangeType.NO_CHANGE))
      }
      if (this._alphaChangeType != t.eParameterChangeType.NO_CHANGE)switch (this._alphaChangeType) {
        case t.eParameterChangeType.IN_TIME:
          this._alpha += this._alphaChange * i, this._alpha < 0 ? (this._visual.alpha = 0, this._alphaChange < 0 && (this._alphaChangeType = t.eParameterChangeType.NO_CHANGE)) : this._alpha > 1 ? (this._visual.alpha = 1, this._alphaChange > 0 && (this._alphaChangeType = t.eParameterChangeType.NO_CHANGE)) : this._visual.alpha = this._alpha
      }
      return !0
    }, e.MAX_VELOCITY = 1e3, e
  }();
  t.Particle = e
}(Particles || (Particles = {}));
var __extends = this && this.__extends || function (t, e) {
    function i() {
      this.constructor = t
    }

    for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n]);
    t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
  }, Particles;
!function (t) {
  var e = function (t) {
    function e() {
      t.apply(this, arguments)
    }

    return __extends(e, t), e.prototype.setFrame = function (t) {
      var e = this._visual;
      "string" == typeof t ? e.frameName = t : e.frame = t
    }, e.prototype.onCreate = function (t) {
      var e = new Phaser.Sprite(this._game, 0, 0, this._textureKey);
      e.anchor.setTo(.5, .5), this._visual = e
    }, e
  }(t.Particle);
  t.SpriteParticle = e
}(Particles || (Particles = {}));
var Particles;
!function (t) {
  var e = function (t) {
    function e(e, i) {
      t.call(this, e, i), (void 0 === i || null !== i) && (this._anims = i[0])
    }

    return __extends(e, t), e.prototype.onCreate = function (e) {
      t.prototype.onCreate.call(this, e);
      for (var i = this._visual, n = 0; n < this._anims.length; n++) {
        var a = this._anims[n], s = i.animations.add(a.name, a.frames, a.frameRate, a.loop);
        !a.loop && a.killOnComplete && (s.killOnComplete = !0)
      }
    }, e.prototype.update = function (e) {
      void 0 === e && (e = !0);
      var i = this._delay, n = t.prototype.update.call(this, e);
      return i > 0 && this._delay <= 0 && this._visual.animations.currentAnim.play(), n
    }, e.prototype.setFrame = function (t) {
      this.setAnim(t)
    }, e.prototype.setAnim = function (t) {
      var e = this._visual;
      e.animations.stop(null, !0), this._delay <= 0 ? e.animations.play(t) : (e.animations.currentAnim = e.animations.getAnimation(t), e.frame = e.animations.currentAnim._frames[0])
    }, e.prototype.setRandomAnim = function () {
      var t = (this._visual, this._anims[this._game.rnd.integerInRange(0, this._anims.length - 1)].name);
      this.setAnim(t)
    }, e
  }(t.SpriteParticle);
  t.AnimatedParticle = e
}(Particles || (Particles = {}));
var Particles;
!function (t) {
  var e = function () {
    function e(e) {
      this.area = new Phaser.Point(0, 0), this.gravity = 0, this.minLifetime = 1, this.maxLifetime = 1, this.delay = 0, this.minScale = 1, this.maxScale = 1, this.scaleChange = 0, this.scaleChangeType = t.eParameterChangeType.NO_CHANGE, this.minAngle = 0, this.maxAngle = 0, this.minSpeedX = 0, this.maxSpeedX = 0, this.minSpeedY = 0, this.maxSpeedY = 0, this.friction = 0, this.minAngularSpeed = 0, this.maxAngularSpeed = 0, this.angularDrag = 0, this.minAlpha = 1, this.maxAlpha = 1, this.alphaChange = 0, this.alphaChangeType = t.eParameterChangeType.NO_CHANGE, this.frames = null, this._minAdvScale = new Phaser.Point(1, 1), this._maxAdvScale = new Phaser.Point(1, 1), this._game = e
    }

    return e.readParams = function (t, i) {
      var n = {};
      for (var a in i) {
        var s = new e(t);
        e.doReadParams(s, i, a), n[a] = s
      }
      return n
    }, e.doReadParams = function (t, i, n) {
      var a = i[n];
      if ("undefined" != typeof a.parent && null !== a.parent) {
        var s = a.parent;
        e.doReadParams(t, i, s)
      }
      for (var r in a)"parent" !== r && ("undefined" == typeof t[r], t[r] = a[r])
    }, e.prototype.clear = function () {
      this.gravity = 0, this.setXSpeed(0, 0), this.setYSpeed(0, 0), this.setAngularSpeed(0)
    }, e.prototype.randomFrame = function () {
      var t = null;
      return null !== this.frames && (t = Array.isArray(this.frames) ? "string" == typeof this.frames[0] ? this._game.rnd.pick(this.frames) : this._game.rnd.pick(this.frames) : this.frames), t
    }, e.prototype.setXSpeed = function (t, e) {
      t = t || 0, e = e || 0, this.minSpeedX = t, this.maxSpeedX = e
    }, e.prototype.setYSpeed = function (t, e) {
      t = t || 0, e = e || 0, this.minSpeedY = t, this.maxSpeedY = e
    }, e.prototype.setAngularSpeed = function (t, e) {
      t = t || 0, e = e || 0, this.minAngularSpeed = t, this.maxAngularSpeed = e
    }, e.prototype.setAlpha = function (t, e) {
      void 0 === t && (t = 1), void 0 === e && (e = 1), this.minAlpha = t, this.maxAlpha = e
    }, e.prototype.setAlphaChange = function (e, i, n) {
      switch (void 0 === i && (i = 0), void 0 === n && (n = 0), this.alphaChangeType = e, e) {
        case t.eParameterChangeType.NO_CHANGE:
          this.alphaChange = 0;
          break;
        case t.eParameterChangeType.IN_TIME:
          0 === n && (n = 1), this.alphaChange = i / n
      }
    }, e.prototype.setScale = function (t, e) {
      t = t || 0, e = e || 0, this.minScale = t, this.maxScale = e
    }, Object.defineProperty(e.prototype, "advScaleMin", {
      get: function () {
        return this._minAdvScale
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "advScaleMax", {
      get: function () {
        return this._maxAdvScale
      }, enumerable: !0, configurable: !0
    }), e.prototype.setAdvScale = function (t, e, i, n) {
      void 0 === t && (t = 1), void 0 === e && (e = 1), void 0 === i && (i = 1), void 0 === n && (n = 1), this._minAdvScale.setTo(t, i), this._maxAdvScale.setTo(e, n)
    }, e.prototype.setScaleChange = function (e, i, n) {
      switch (void 0 === i && (i = 0), void 0 === n && (n = 0), this.scaleChangeType = e, e) {
        case t.eParameterChangeType.NO_CHANGE:
          this.scaleChange = 0;
          break;
        case t.eParameterChangeType.IN_TIME:
          0 === n && (n = 1), this.scaleChange = i / n
      }
    }, e.prototype.setAngle = function (t, e) {
      void 0 === t && (t = 0), void 0 === e && (e = 0), this.minAngle = t, this.maxAngle = e
    }, e
  }();
  t.ParticleParams = e
}(Particles || (Particles = {}));
var Particles;
!function (t) {
  var e;
  !function (t) {
    t[t.NONE = 0] = "NONE", t[t.FLOW = 1] = "FLOW", t[t.EXPLODE = 2] = "EXPLODE"
  }(e || (e = {})), function (t) {
    t[t.NO_CHANGE = 0] = "NO_CHANGE", t[t.IN_TIME = 1] = "IN_TIME"
  }(t.eParameterChangeType || (t.eParameterChangeType = {}));
  var i = t.eParameterChangeType, n = function (n) {
    function a(i, s, r, o) {
      n.call(this, i, null), this._maxParticles = a.MAX_PARTICELES, this.emitPoint = new Phaser.Point(0, 0), this.emitObject = null, this.particleClass = t.SpriteParticle, this.particleBringToTop = !1, this.particleSendToBack = !1, this.frequency = 100, this.forceEmit = !1, this._alternativeParams = null, this._on = !1, this._mode = e.NONE, this._flowQuantity = 0, this._flowTotal = 0, this._flowCounter = 0, this._particlesPool = [], this._counterPool = 0, this._particlesUsed = [], this._counterUsed = 0, this._timer = 0, this._emitPoint = new Phaser.Point(0, 0), this._params = new t.ParticleParams(i), this.position.setTo(s, r), this._maxParticles = o
    }

    return __extends(a, n), Object.defineProperty(a.prototype, "params", {
      set: function (t) {
        this._params = t
      }, enumerable: !0, configurable: !0
    }), a.prototype.clear = function () {
      this._params.clear()
    }, a.prototype.update = function () {
      if (this._on && this.game.time.time >= this._timer && (this._timer = this.game.time.time + this.frequency * this.game.time.slowMotion, this._mode === e.FLOW))if (-1 !== this._flowTotal && this._flowCounter >= this._flowTotal)this.stopFlow(); else for (var t = Math.max(1, this._flowQuantity), i = 0; t > i && !(this.emitParticle(this.forceEmit) && (this._flowCounter++, -1 !== this._flowTotal && this._flowCounter >= this._flowTotal)); i++);
      for (var i = this._counterUsed - 1; i >= 0; i--) {
        var n = this._particlesUsed[i];
        n.update() || (n.on = !1, n.remove(), n.onKill(this), this._particlesUsed[i] = this._particlesUsed[--this._counterUsed], this._particlesPool[this._counterPool++] = n)
      }
    }, a.prototype.makeParticles = function (t, e, i, n) {
      (void 0 === i || i > this._maxParticles) && (i = this._maxParticles), void 0 !== e && (this._params.frames = e);
      for (var a = 0; i > a; a++) {
        var s = new this.particleClass(this.game, n);
        s.textureKey = t, s.onCreate(this), s.on = !1, this._particlesPool[this._counterPool++] = s
      }
    }, Object.defineProperty(a.prototype, "on", {
      set: function (t) {
        this._on = t, this.exists = t, this.visible = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "count", {
      get: function () {
        return this._counterUsed
      }, enumerable: !0, configurable: !0
    }), a.prototype.explode = function (t, i, n) {
      this._mode = e.EXPLODE, this.on = !0, this.emitParticles(t, i, n)
    }, a.prototype.flow = function (t, i, n, a, s, r) {
      this._mode = e.FLOW, this.on = !0, (void 0 === i || 0 === i) && (i = 1), void 0 === n && (n = -1), void 0 === a && (a = !0), i > this._maxParticles && (i = this._maxParticles), this.frequency = t, this._flowCounter = 0, this._flowQuantity = i, this._flowTotal = n, a && (this.emitParticles(i, s, r), this._flowCounter += i, this._timer = this.game.time.time + t * this.game.time.slowMotion)
    }, a.prototype.stopFlow = function () {
      this._mode = e.NONE
    }, a.prototype.killAllParticles = function (t) {
      for (void 0 === t && (t = !0); this._counterUsed > 0;) {
        var e = this._particlesUsed[--this._counterUsed];
        e.remove(), t || e.onKill(this), this._particlesPool[this._counterPool++] = e
      }
    }, a.prototype.emitParticles = function (t, e, i) {
      for (var n = 0; t > n; n++) {
        var a = this.emitParticle(this.forceEmit);
        if (null === a)break;
        void 0 !== e && null !== e && e.call(i, a)
      }
    }, a.prototype.emitParticle = function (t, e) {
      if (void 0 === t && (t = !1), void 0 === e && (e = !1), 0 === this._counterPool) {
        if (!t)return null;
        var n = this._particlesUsed[0];
        this._particlesUsed[0] = this._particlesUsed[--this._counterUsed], n.remove(), n.onKill(this), this._particlesPool[this._counterPool++] = n
      }
      var a = this._particlesPool[--this._counterPool];
      this._particlesUsed[this._counterUsed++] = a, a.on = !0;
      var s = null !== this._alternativeParams ? this._alternativeParams : this._params;
      if (this.randomEmitPoint(this._emitPoint, s), a.visual.position.set(this._emitPoint.x, this._emitPoint.y), a.visual.angle = 0, e)a.lifetime = -1, a.visual.scale.set(1, 1), a.setScaleChange(i.NO_CHANGE), a.visual.angle = 0, a.alpha = 1, a.setAlphaChange(i.NO_CHANGE), a.setPhysics(); else {
        if (a.lifetime = this.game.rnd.realInRange(s.minLifetime, s.maxLifetime), a.delay = s.delay, 1 !== s.minScale || 1 !== s.maxScale) {
          var r = this.game.rnd.realInRange(s.minScale, s.maxScale);
          a.visual.scale.set(r, r)
        } else s.advScaleMin.x !== s.advScaleMax.x || s.advScaleMin.y !== s.advScaleMax.y ? a.visual.scale.set(this.game.rnd.realInRange(s.advScaleMin.x, s.advScaleMax.x), this.game.rnd.realInRange(s.advScaleMin.y, s.advScaleMax.y)) : a.visual.scale.set(1, 1);
        a.setScaleChange(s.scaleChangeType, s.scaleChange), a.visual.angle = s.minAngle === s.maxAngle ? s.minAngle : this.game.rnd.realInRange(s.minAngle, s.maxAngle), a.alpha = this.game.rnd.realInRange(s.minAlpha, s.maxAlpha), a.setAlphaChange(s.alphaChangeType, s.alphaChange), a.setPhysics(this.game.rnd.realInRange(s.minSpeedX, s.maxSpeedX), this.game.rnd.realInRange(s.minSpeedY, s.maxSpeedY), this.game.rnd.realInRange(s.minAngularSpeed, s.maxAngularSpeed), s.friction, s.angularDrag, s.gravity), null !== s.frames && a.setFrame(s.randomFrame())
      }
      return a.onEmit(this), this.particleBringToTop ? a.bringToTop() : this.particleSendToBack && a.sendToBack(), a
    }, a.prototype.destroy = function () {
      t.ParticlesManager.instance.remove(this), n.prototype.destroy.call(this, !0, !1)
    }, a.prototype.randomEmitPoint = function (t, e) {
      return e.area instanceof Phaser.Point ? t.setTo(0, 0) : e.area.random(t), t.x += this.emitPoint.x, t.y += this.emitPoint.y, null !== this.emitObject && (t.x += this.emitObject.x, t.y += this.emitObject.y), t
    }, Object.defineProperty(a.prototype, "area", {
      set: function (t) {
        this._params.area = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "gravity", {
      set: function (t) {
        this._params.gravity = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "friction", {
      set: function (t) {
        this._params.friction = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "angularDrag", {
      set: function (t) {
        this._params.angularDrag = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "minScale", {
      set: function (t) {
        this._params.minScale = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "maxScale", {
      set: function (t) {
        this._params.maxScale = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "minAngle", {
      set: function (t) {
        this._params.minAngle = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "maxAngle", {
      set: function (t) {
        this._params.maxAngle = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "lifetime", {
      set: function (t) {
        this._params.minLifetime = this._params.maxLifetime = t
      }, enumerable: !0, configurable: !0
    }), a.prototype.setXSpeed = function (t, e) {
      this._params.setXSpeed(t, e)
    }, a.prototype.setYSpeed = function (t, e) {
      this._params.setYSpeed(t, e)
    }, a.prototype.setAngularSpeed = function (t, e) {
      this._params.setAngularSpeed(t, e)
    }, a.prototype.setAlpha = function (t, e) {
      this._params.setAlpha(t, e)
    }, a.prototype.setAlphaChange = function (t, e, i) {
      void 0 === e && (e = 0), void 0 === i && (i = 0), this._params.setAlphaChange(t, e, i)
    }, a.prototype.setScale = function (t, e) {
      this._params.setScale(t, e)
    }, a.prototype.setAdvScale = function (t, e, i, n) {
      this._params.setAdvScale(t, e, i, n)
    }, a.prototype.setScaleChange = function (t, e, i) {
      void 0 === e && (e = 0), void 0 === i && (i = 0), this._params.setScaleChange(t, e, i)
    }, a.prototype.setAngle = function (t, e) {
      this._params.setAngle(t, e)
    }, a.prototype.emitAt = function (t, e) {
      this.emitPoint.setTo(t, e)
    }, a.prototype.emitAtObject = function (t) {
      t.center ? this.emitPoint.setTo(t.center.x, t.center.y) : this.emitPoint.setTo(t.x, t.y)
    }, a.MAX_PARTICELES = 16, a
  }(Phaser.Group);
  t.ParticlesEmitter = n
}(Particles || (Particles = {}));
var Particles;
!function (t) {
  var e = function () {
    function t(t, e, i, n) {
      void 0 === i && (i = null), void 0 === n && (n = null), this._emitter = null, this._game = t, this._emitter = e, this._animEmitter = i, this._params = n
    }

    return t.prototype.emit = function (t, e, i, n, a) {
      for (this._emitter.emitAt(t, e), null !== this._animEmitter && this._animEmitter.emitAt(t, e); null !== i;) {
        var s = i.animated ? this._animEmitter : this._emitter;
        if (null === this._params && null !== i.paramsName, null !== this._params) {
          var r = this._params[i.paramsName];
          "undefined" == typeof r || (s.params = r)
        }
        s.explode(this._game.rnd.integerInRange(i.countMin, i.countMax), n, a), i = i.next
      }
    }, t
  }();
  t.ParticleChain = e
}(Particles || (Particles = {}));
var Particles;
!function (t) {
  var e = function () {
    function t() {
      this._emitters = [], this._emittersCount = 0
    }

    return Object.defineProperty(t, "instance", {
      get: function () {
        return null === t._instance && (t._instance = new t), t._instance
      }, enumerable: !0, configurable: !0
    }), t.prototype.add = function (t) {
      this._emitters[this._emittersCount++] = t
    }, t.prototype.remove = function (t) {
      for (var e = this._emittersCount - 1; e >= 0 && this._emitters[e] !== t; e--);
      -1 !== e && (this._emitters[e] = this._emitters[--this._emittersCount])
    }, t.prototype.update = function () {
      for (var t = 0; t < this._emittersCount; t++) {
        var e = this._emitters[t];
        e.exists && e.update()
      }
    }, t._instance = null, t
  }();
  t.ParticlesManager = e
}(Particles || (Particles = {}));
var Ninja;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.GRAVITY = 4800, t.SPEED_X_MIN = 200, t.SPEED_X_MAX = 400, t.SPEED_Y_COEF = 1.5, t.SPEED_UP_TIME = 3, t.SPEED_DOWN_TIME = 1, t.TIME_TO_HARDEST_PATTERN = 60, t.COIN_COUNTER_MIN = 8, t.COIN_COUNTER_MAX = 8, t.SLOW_BONUS_COUNTER = 5, t.COINS_PAUSE = 1, t
  }();
  t.Gameplay = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function t(t, e, i) {
      void 0 === i && (i = null), this.name = "<no name>", this.debug = 0, this._newFunction = null, this._count = 0, this._pool = [], this._canGrow = !0, this._poolSize = 0, this._classType = t, this._newFunction = i;
      for (var n = 0; e > n; n++) {
        var a = this.newItem();
        this._pool[this._count++] = a
      }
      this._poolSize = e
    }

    return t.prototype.createItem = function () {
      return 0 === this._count ? ((this.debug & t.DEBUG_ALLOCATION) > 0, this._canGrow ? this.newItem() : null) : ((this.debug & t.DEBUG_CREATE) > 0, this._pool[--this._count])
    }, t.prototype.destroyItem = function (e) {
      (this.debug & t.DEBUG_DESTROY) > 0, this._pool[this._count++] = e
    }, Object.defineProperty(t.prototype, "newFunction", {
      set: function (t) {
        this._newFunction = t
      }, enumerable: !0, configurable: !0
    }), t.prototype.newItem = function () {
      return null !== this._newFunction ? this._newFunction() : new this._classType
    }, Object.defineProperty(t.prototype, "canGrow", {
      set: function (t) {
        this._canGrow = t
      }, enumerable: !0, configurable: !0
    }), t.DEBUG_ALLOCATION = 1, t.DEBUG_CREATE = 2, t.DEBUG_DESTROY = 4, t.DEBUG_ALL = 7, t
  }();
  t.Pool = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e(e, i, n, a, s) {
      t.call(this, e, i, n, a), void 0 !== s && this.setAnchoredFrame(s)
    }

    return __extends(e, t), e.prototype.setAnchoredFrame = function (t) {
      if ("string" == typeof this.key) {
        var e = null;
        "string" == typeof t ? (this.frameName = t, e = this.game.cache.getFrameByName(this.key, t)) : (this.frame = t, e = this.game.cache.getFrameByIndex(this.key, t)), void 0 !== e.anchorX && void 0 !== e.anchorY && this.anchor.setTo(e.anchorX, e.anchorY)
      }
    }, e
  }(Phaser.Sprite);
  t.AnchoredSprite = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e(e, i, n, a, s, r) {
      t.call(this, e, i), this._scrollCoef = r;
      var o;
      o = "number" == typeof a ? e.cache.getFrameByIndex(n, a) : e.cache.getFrameByName(n, a), this._frame = o;
      var h = e.add.sprite(0, 0, n, a, this);
      h.anchor.y = s, h.fixedToCamera = !0, this._sprite1Crop = new Phaser.Rectangle(0, 0, 0, o.height), h.crop(this._sprite1Crop, !1), this._sprite1 = h, h = e.add.sprite(0, 0, n, a, this), h.fixedToCamera = !0, h.anchor.y = s, this._sprite2Crop = new Phaser.Rectangle(0, 0, 0, o.height), h.crop(this._sprite2Crop, !1), this._sprite2 = h
    }

    return __extends(e, t), e.prototype.updatePosition = function (t) {
      t *= this._scrollCoef, 0 > t && (t += 640);
      var e = this._frame.width, i = Math.floor(t) % e;
      this._sprite1Crop.x = i, this._sprite1Crop.width = Math.min(e - i, this.game.width), this._sprite1.updateCrop(), this._sprite2Crop.width = this.game.width - this._sprite1Crop.width, this._sprite2.cameraOffset.x = this._sprite1Crop.width, this._sprite2.updateCrop()
    }, e
  }(Phaser.Group);
  t.BgLayer = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e() {
      t.apply(this, arguments)
    }

    return __extends(e, t), e.prototype.init = function (t, e, i) {
      var n = this.game.camera.x - this.parent.x + 640 + this.game.rnd.integerInRange(100, 640);
      this.position.set(n, this.game.rnd.integerInRange(e, e + i));
      var a = this.game.rnd.realInRange(.75, 1.25);
      this.scale.set(a * this.game.rnd.sign(), a * this.game.rnd.sign()), this.frameName = t, this._speed = -Math.abs(this.width) * a / 8, this.exists = !0, this.visible = !0
    }, e.prototype.updateCloud = function () {
      this.position.x += this._speed * this.game.time.physicsElapsed;
      var t = this.x - (this.game.camera.x - this.parent.x), e = Math.abs(this.width) >> 1;
      (-e > t || t > 2 * this.game.width) && this.kill()
    }, e.SPEED_PX_IN_SEC = -5, e
  }(Phaser.Sprite);
  t.Cloud = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (e) {
    function i(i, n, a, s, r, o, h) {
      e.call(this, i, n), this._clouds = [], this._count = a, this._speedCoef = 1 - s, this._frames = r, this._topY = o, this._rangeY = h;
      for (var l = 0; a > l; l++) {
        var u = new t.Cloud(i, 0, 0, "Sprites");
        u.anchor.x = .5, u.kill(), this.add(u), this._clouds[l] = u
      }
    }

    return __extends(i, e), i.prototype.updatePosition = function (t) {
      this.x = t * this._speedCoef;
      for (var e = 0; e < this._count; e++) {
        var i = this._clouds[e];
        i.exists ? i.updateCloud() : i.init(this._frames[this.game.rnd.integerInRange(0, this._frames.length - 1)], this._topY, this._rangeY)
      }
    }, i
  }(Phaser.Group);
  t.Clouds = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function e(e, i) {
      this._hlpPt = new t.HitInfo, this._patternsTop = [], this._patternsBottom = [], this._game = e, this._rnd = e.rnd, this._grid = [];
      for (var n = 0; 10 > n; n++) {
        for (var a = [], s = 0; 64 > s; s++)a[s] = 0;
        this._grid.push(a)
      }
      this._wallsPool = new t.Pool(Phaser.Sprite, 32, function () {
        var t = new Phaser.Sprite(e, 0, 0, "Sprites");
        e.physics.enable(t, Phaser.Physics.ARCADE);
        var i = t.body;
        return i.allowGravity = !1, i.immovable = !0, i.moves = !1, i.setSize(64, 64, 0, 0), t
      }), this._walls = new Phaser.Group(e), this._bonuses = new Phaser.Group(e);
      for (var n = 0; 50 > n; n++) {
        var r = new Phaser.Sprite(e, 0, 0, "Sprites");
        r.anchor.set(.5, .5), r.animations.add("mince", ["coin1", "coin2", "coin3", "coin4", "coin5", "coin6", "coin7", "coin8", "coin9"], 10, !0), e.physics.enable(r, Phaser.Physics.ARCADE);
        var o = r.body;
        o.allowGravity = !1, o.immovable = !0, o.moves = !1, o.setSize(40, 40, -4, 0), r.exists = !1, this._bonuses.add(r)
      }
      this._patternInitial = new t.Pattern(e, t.Patterns.PATTERN_0, function (t) {
        t.intParams[0] = 5, t.intParams[1] = 3
      }, this);
      var h;
      h = new t.Pattern(e, t.Patterns.PATTERN_1, function (t) {
        var e = t.height;
        t.intParams[0] = e > 6 ? 3 : 2, t.intParams[1] = e > 6 ? 3 : 2, t.intParams[2] = e > 6 ? this._rnd.integerInRange(3, 4) : this._rnd.integerInRange(2, 3), t.intParams[3] = 5 >= e ? this._rnd.integerInRange(1, 2) : 1
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_2a, function (t) {
        t.intParams[0] = 1, t.intParams[1] = 2, t.intParams[2] = this._rnd.integerInRange(2, 3)
      }, this), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_2b, function (t) {
        t.intParams[0] = 1, t.intParams[1] = 2, t.intParams[2] = this._rnd.integerInRange(2, 3)
      }, this), this._patternsTop.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_3a, function (t) {
        t.intParams[0] = 1, t.intParams[1] = 1, t.intParams[2] = this._rnd.integerInRange(2, 3), t.intParams[3] = 2 * t.intParams[2], t.intParams[4] = this._rnd.integerInRange(1, 3)
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_3b, function (t) {
        t.intParams[0] = 1, t.intParams[1] = 1, t.intParams[2] = this._rnd.integerInRange(2, 3), t.intParams[3] = 2 * t.intParams[2], t.intParams[4] = this._rnd.integerInRange(1, 2)
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_4, function (t) {
        t.intParams[0] = this._rnd.integerInRange(2, 3), t.intParams[1] = this._rnd.integerInRange(2, 3), t.intParams[2] = Math.ceil(t.intParams[1] / 2), t.intParams[3] = t.intParams[1] - t.intParams[2], t.boolParams[2] = 1 === this._rnd.sign()
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_6, function (t) {
        t.intParams[0] = 1, t.intParams[1] = 1, t.intParams[2] = 3 + t.height - 8
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_7, function (t) {
        t.height;
        t.intParams[0] = t.height >= 8 ? 4 : 3, t.intParams[1] = this._rnd.integerInRange(1, 3), t.intParams[2] = t.height >= 8 ? 5 : 4, t.intParams[3] = t.height >= 8 ? 3 : 2
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_10, function (t) {
        t.intParams[0] = this._rnd.integerInRange(2, 3), t.intParams[1] = t.height >= 8 ? 4 : 3, t.intParams[2] = t.height >= 8 ? 3 : 2
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_8, function (t) {
        t.intParams[0] = 2, t.intParams[1] = 2, t.intParams[2] = 3
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_5, function (t) {
        t.height;
        t.intParams[0] = t.height >= 8 ? 3 : 2, t.intParams[1] = this._rnd.integerInRange(1, 3), t.intParams[2] = t.height >= 8 ? 3 : 2, t.intParams[3] = t.height >= 8 ? 3 : 2
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h), h = new t.Pattern(e, t.Patterns.PATTERN_9, function (t) {
        t.height;
        t.intParams[0] = 2, t.intParams[1] = 2, t.intParams[2] = 1, t.intParams[3] = this._rnd.integerInRange(2, 3), t.boolParams[2] = 1 === this._rnd.sign()
      }, this), this._patternsTop.push(h), this._patternsBottom.push(h)
    }

    return Object.defineProperty(e.prototype, "walls", {
      get: function () {
        return this._walls
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "bonuses", {
      get: function () {
        return this._bonuses
      }, enumerable: !0, configurable: !0
    }), e.prototype.reset = function () {
      this._cameraX = 0;
      for (var e = 0; e < this._grid.length; e++)for (var i = 0; i < this._grid[e].length; i++)this._grid[e][i] = 0;
      this.cleanTiles(0, !0), this._lastColumn = 0;
      var n = !0;
      this._pattern = this._patternInitial, this._pattern.randomize(6, !1, n), this._lastHeight = 4, this._patternY = 3, this._endsTop = n, this._coinsPause = t.Gameplay.COINS_PAUSE, this._previousCoinsColumn = !1, this._prevCoinDropped = !1, this._coinSequence = !1, this._startTime = this._game.time.time
    }, e.prototype.cleanTiles = function (t, e) {
      void 0 === e && (e = !1);
      for (var i = this._walls.length - 1; i >= 0; i--) {
        var n = this._walls.getChildAt(i);
        (n.x - t <= -64 || e) && (this._walls.remove(n), n.parent = null, this._wallsPool.destroyItem(n))
      }
      for (var i = this._bonuses.length - 1; i >= 0; i--) {
        var a = this._bonuses.getChildAt(i);
        (a.x - t <= -64 || e) && (a.exists = !1)
      }
    }, e.prototype.updateGenerator = function (t) {
      this._cameraX = t, this.cleanTiles(t);
      for (var e = Math.floor((t + 640) / 64) + 2; this._lastColumn < e;) {
        var i = this._lastColumn % 64;
        for (this.clearGridColumn(i); !this._pattern.putIntoData(this._grid, i, this._patternY);)this.randomizePattern();
        this.drawColumn(i, this._lastColumn), ++this._lastColumn
      }
    }, e.prototype.randomizePattern = function () {
      this._prevEndsTop = this._endsTop;
      for (var e = this._pattern.exitTopY, i = this._pattern.exitBottomY, n = Phaser.Math.clamp((this._game.time.time - this._startTime) / 1e3 / t.Gameplay.TIME_TO_HARDEST_PATTERN, 0, 1); ;) {
        var a = 1 === this._rnd.sign(), s = a ? this._patternsTop : this._patternsBottom, r = Math.max(5, Math.floor((s.length - 1) * n)), o = s[this._rnd.integerInRange(0, r)], h = o.minPatternHeight, l = o.maxPatternHeight, u = this._lastHeight + Phaser.Math.sign(this._rnd.integerInRange(0, l - h) - (this._lastHeight - h)) * this._rnd.integerInRange(1, 2);
        u = Phaser.Math.clamp(u, h, l), this._endsTop = 1 === this._rnd.sign(), (this._endsTop && -1 === o.exitTopY || !this._endsTop && -1 === o.exitBottomY) && (this._endsTop = !this._endsTop), o.randomize(u, a, this._endsTop);
        var c = o.height, p = this._patternY + (this._prevEndsTop ? e : i), _ = 0;
        p -= a ? o.enterTopY : o.enterBottomY, a && !this._prevEndsTop ? (p -= 3, _ = -1) : !a && this._prevEndsTop ? (p += 3, _ = 1) : a && this._prevEndsTop ? _ = -1 : a || this._prevEndsTop || (_ = 1);
        for (var m = 1; m > 0 && (0 > p || p + c > 10); m--)p += _;
        if (0 !== m) {
          this._pattern = o, this._patternY = p, this._lastHeight = c;
          break
        }
      }
    }, e.prototype.drawColumn = function (e, i) {
      --this._coinsPause;
      var n = !1, a = this._previousCoinsColumn;
      this._previousCoinsColumn = !1;
      for (var s = 128 === this._grid[0][e] ? 4 : 0, r = 0; r < this._grid.length; r++) {
        if (128 === this._grid[r][e] ? s |= 2 : s &= -3, (3840 & this._grid[r][e]) === t.MINCE && (this._previousCoinsColumn = !0, this._coinsPause <= 0 && !a && (this._coinSequence || (this._coinSequence = !0)), this._coinSequence)) {
          n = !0;
          var o = 64 * (255 & this._grid[r][e]) / 2;
          this._grid[r][e] = 0;
          var h = this._bonuses.getFirstExists(!1);
          null !== h && (h.position.set(64 * i + o + 32, 64 * r + 32), h.exists = !0, h.animations.play("mince"))
        }
        var l = r + 1 < this._grid.length ? this._grid[r + 1][e] : this._grid[r][e];
        if (128 === l ? s |= 1 : s &= -2, 2 & s) {
          var u = 7 & s, c = 2 === u ? "kostka_oboji" : 6 === u ? "kostka_horni" : 3 === u ? "kostka_spodni" : "kostka_stred";
          this.addTile(i, r, c)
        }
        s <<= 1
      }
      this._coinSequence && !n && (this._coinSequence = !1, this._coinsPause = t.Gameplay.COINS_PAUSE)
    }, e.prototype.addTile = function (t, e, i) {
      var n = this._wallsPool.createItem();
      n.position.set(64 * t, 64 * e), n.exists = !0, n.visible = !0, n.frameName = i, null === n.parent && this._walls.add(n)
    }, e.prototype.clearGridColumn = function (t) {
      for (var e = 0; 10 > e; e++)this._grid[e][t] = 0
    }, e.prototype.castRay = function (t, e, i, n, a, s) {
      return this.doCastRay(t, e, i, n, a, s)
    }, e.prototype.castYLimitedRay = function (t, e, i, n, a, s, r, o) {
      return this.doCastRay(t, e, i, n, a, s, r, o)
    }, e.prototype.castYLimitedRayWithCallback = function (t, e, i, n, a, s, r, o, h) {
      return this.doCastRay(t, e, i, n, a, 0, s, r, o, h)
    }, e.prototype.doCastRay = function (t, i, n, a, s, r, o, h, l, u) {
      void 0 === o && (o = 0), void 0 === h && (h = 9), void 0 === l && (l = null), void 0 === u && (u = null);
      var c = this._hlpPt;
      c.hitType = s, c.unit = r, c.fromX = t, c.fromY = i;
      var p = Math.floor(t / 64), _ = Math.floor(i / 64), m = Phaser.Math.sign(n), d = Phaser.Math.sign(a), f = Math.abs(n), g = Math.abs(a), P = t / 64 - p;
      m > 0 && (P = 1 - P);
      var y = i / 64 - _;
      d > 0 && (y = 1 - y);
      for (var E = P * g - y * f; ;)if (0 > E) {
        p += m;
        var v = p >= 0 && _ > o && h > _;
        if (v && null !== l && l.call(u, p, _), (v && (this._grid[_][p % 64] & e.WALL) > 0 || !v) && (!v || 0 === s || 2 === s)) {
          if (1 === r) {
            var N = 64 * (0 > m ? p + 1 : p), T = i + a * (N - t) / n;
            c.destX = N, c.destY = T;
            break
          }
          c.destX = p, c.destY = _;
          break
        }
        E += g
      } else {
        _ += d;
        var v = p >= 0 && _ > o && h > _;
        if (v && null !== l && l.call(u, p, _), (v && (this._grid[_][p % 64] & e.WALL) > 0 || !v) && (!v || 0 === s || 1 === s)) {
          if (1 === r) {
            var T = 64 * (0 > d ? _ + 1 : _), N = t + n * (T - i) / a;
            c.destX = N, c.destY = T;
            break
          }
          c.destX = p, c.destY = _;
          break
        }
        E -= f
      }
      return c
    }, e.WALL = 128, e
  }();
  t.Generator = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function t() {
    }

    return t
  }();
  t.HitInfo = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function e(t, i, n, a) {
      void 0 === n && (n = null), void 0 === a && (a = null), this._intParams = [], this._boolParams = [], this._cmdStack = [], this._fillUp = !0, this._fillDown = !0, this._fillTmp = [], this._game = t, this._rnd = t.rnd, this._pattern = i, this._randomizeFce = n, this._context = a;
      for (var s = 0; s < e.MAX_INT_PARAMS; s++)this._intParams[s] = 0;
      for (var s = 0; s < e.MAX_BOOL_PARAMS; s++)this._boolParams[s] = !1
    }

    return Object.defineProperty(e.prototype, "height", {
      get: function () {
        for (var t = this._pattern, e = 0, i = 0; i < t.rowHeader.length; i++)t.rowHeader[i] < this._excludeLevel && ++e;
        return e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "enterTop", {
      get: function () {
        return this._boolParams[0]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "exitTop", {
      get: function () {
        return this._boolParams[1]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "intParams", {
      get: function () {
        return this._intParams
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "boolParams", {
      get: function () {
        return this._boolParams
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "minPatternHeight", {
      get: function () {
        return this._pattern.minHeight
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "maxPatternHeight", {
      get: function () {
        return this._pattern.maxHeight
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "enterTopY", {
      get: function () {
        return this.getFirstBlock(!0, !1)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "name", {
      get: function () {
        return this._pattern.name
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "enterBottomY", {
      get: function () {
        var t = this.getFirstBlock(!1, !1);
        return -1 === t ? -1 : this.height - t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "exitTopY", {
      get: function () {
        return this.getFirstBlock(!0, !0)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "exitBottomY", {
      get: function () {
        var t = this.getFirstBlock(!1, !0);
        return -1 === t ? -1 : this.height - t
      }, enumerable: !0, configurable: !0
    }), e.prototype.getFirstBlock = function (t, e) {
      for (var i = this._pattern, n = t ? 1 : -1, a = t ? 160 : 144, s = t ? 0 : i.rowHeader.length - 1, r = t ? 0 : 1, o = e ? i.columnHeader.length - 1 : 0, h = -1; s < i.rowHeader.length && s >= 0; s += n)i.rowHeader[s] >= this._excludeLevel || ((240 & i.pattern[s][o]) === a && (h = r), ++r);
      return h
    }, e.prototype.randomize = function (t, i, n) {
      if (this._excludeLevel = t, this._boolParams[0] = i, this._boolParams[1] = n, null !== this._randomizeFce)this._randomizeFce.call(this._context, this); else {
        for (var a = 2; a < e.MAX_BOOL_PARAMS; a++)this._boolParams[a] = 1 === this._rnd.sign();
        for (var a = 0; a < e.MAX_INT_PARAMS; a++)this._intParams[a] = this._rnd.integerInRange(0, 5)
      }
      this._x = 0, this._cmdIndex = 0, this._cmdStackTop = 0, this._fillUp = !0, this._fillDown = !0, this._firstColumnInRepeat = !1, this._repeatLength = -1
    }, e.prototype.patternColumnEmpty = function (t) {
      for (var e = this._pattern, i = 0; i < e.rowHeader.length; i++)if (!(e.rowHeader[i] >= this._excludeLevel)) {
        var n = e.pattern[i][t];
        if (this.showBlock(n))return !1
      }
      return !0
    }, e.prototype.showBlock = function (t) {
      if (0 === (128 & t))return !1;
      var i = 112 & t, n = 15 & t;
      return i === e.BLOCK_OFF && this._boolParams[n] || i === e.BLOCK_ON && !this._boolParams[n] ? !1 : !0
    }, e.prototype.putIntoData = function (i, n, a) {
      for (var s = this._pattern, r = s.commands, o = this._cmdStack; this._cmdIndex < r.length;) {
        var h = r[this._cmdIndex++];
        if (h === t.REP_START) {
          var l = this._intParams[r[this._cmdIndex++]];
          o[this._cmdStackTop++] = l, o[this._cmdStackTop++] = this._cmdIndex, o[this._cmdStackTop++] = this._x, this._firstColumnInRepeat = !0, this._repeatLength = l
        }
        if (h === t.REP_END) {
          var u = o[--this._cmdStackTop], c = o[--this._cmdStackTop], l = o[--this._cmdStackTop] - 1;
          l > 0 && (this._x = u, this._cmdIndex = c, o[this._cmdStackTop++] = l, o[this._cmdStackTop++] = c, o[this._cmdStackTop++] = u), this._repeatLength = -1
        }
        if (h === t.COLUMN) {
          var p = this._x++, _ = s.columnHeader[p], m = 240 & _, d = 15 & _, f = m === e.HEADER_EXCLUDE && d >= this._excludeLevel;
          if (!f && !(0 === p && this.patternColumnEmpty(0) || p === s.columnHeader.length - 1 && this.patternColumnEmpty(p)))return this.putColumnIntoData(i, n, a, p), this._firstColumnInRepeat = !1, this._repeatLength = -1, !0;
          this._firstColumnInRepeat = !1, this._repeatLength = -1
        }
      }
      return !1
    }, e.prototype.putColumnIntoData = function (i, n, a, s) {
      for (var r = this._pattern, o = 0, h = 0; h < r.rowHeader.length; h++)if (!(r.rowHeader[h] >= this._excludeLevel)) {
        var l = r.pattern[h][s];
        if (l === t.MINCE && (this._firstColumnInRepeat && this._repeatLength > 0 || !this._firstColumnInRepeat && -1 === this._repeatLength) && (i[a][n] = t.MINCE + (this._repeatLength <= 0 ? 0 : this._repeatLength - this._cmdStack[this._cmdStackTop - 3])), this.showBlock(l)) {
          i[a][n] = 128;
          var u = 3840 & l;
          u > 0 && (this._fillTmp[o++] = u + a)
        }
        a++
      }
      for (var h = 0; o > h; h++) {
        var c = this._fillTmp[h];
        if (this._fillUp && (3840 & c) === e.FILL_UP)for (var p = (255 & c) - 1; p >= 0 && 0 === i[p][n];)i[p][n] = 128, --p;
        if (this._fillDown && (3840 & c) == e.FILL_DOWN)for (var p = (255 & c) + 1; 9 >= p && 0 === i[p][n];)i[p][n] = 128, ++p
      }
    }, e.HEADER_EXCLUDE = 16, e.HEADER_REPEAT = 32, e.HEADER_REPEAT_START = 48, e.HEADER_REPEAT_END = 64, e.BLOCK_OFF = 16, e.BLOCK_ON = 32, e.FILL_UP = 256, e.FILL_DOWN = 512, e.MAX_INT_PARAMS = 5, e.MAX_BOOL_PARAMS = 5, e
  }();
  t.Pattern = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = 0;
  t.MINCE = 2048, t.COLUMN = 1, t.REP_START = 2, t.REP_END = 3;
  var i = function () {
    function i() {
    }

    return i.PATTERN_0 = {
      name: "pattern 0: starting block",
      minHeight: 4,
      maxHeight: 10,
      rowHeader: [0, 2, 3, 4, 5, 6, 7, 8, 9, 1],
      columnHeader: [25, 0, 0],
      pattern: [[e, e, 417], [e, e, e], [e, e, e], [e, e, e], [e, e, e], [e, e, e], [e, e, e], [e, e, e], [e, e, e], [e, 640, 657]],
      commands: [t.COLUMN, t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_1 = {
      name: "pattern 1: nahore a dole",
      minHeight: 4,
      maxHeight: 8,
      rowHeader: [0, 8, 6, 4, 2, 3, 5, 7, 9, 1],
      columnHeader: [0, 0, 0, 0],
      pattern: [[416, e, 384, 417], [e, e, e, e], [e, e, e, e], [e, t.MINCE, t.MINCE, e], [e, t.MINCE, t.MINCE, e], [e, t.MINCE, t.MINCE, e], [e, e, e, e], [e, e, e, e], [e, e, e, e], [656, 640, e, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_2a = {
      name: "pattern 2a: schody dolu",
      minHeight: 6,
      maxHeight: 8,
      rowHeader: [0, 1, 9, 8, 7, 6, 5, 4, 3, 2],
      columnHeader: [26, 25, 24, 23, 22, 0, 0, 0, 0, 0],
      pattern: [[e, e, e, e, e, e, e, e, e, e], [e, e, e, e, e, e, e, e, e, e], [656, 640, t.MINCE, e, e, e, e, e, e, e], [656, e, 640, t.MINCE, e, e, e, e, e, e], [656, e, e, 640, t.MINCE, e, e, e, e, e], [656, e, e, e, 640, t.MINCE, e, e, e, e], [656, e, e, e, e, 640, t.MINCE, e, e, 417], [e, e, e, e, e, e, 640, t.MINCE, e, e], [e, e, e, e, e, e, e, 640, t.MINCE, e], [e, e, e, e, e, e, e, e, 640, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_2b = {
      name: "pattern 2b: schody nahoru",
      minHeight: 6,
      maxHeight: 8,
      rowHeader: [2, 3, 4, 5, 6, 7, 8, 9, 1, 0],
      columnHeader: [26, 25, 24, 23, 22, 0, 0, 0, 0, 0],
      pattern: [[e, e, e, e, e, e, e, e, 384, 417], [e, e, e, e, e, e, e, 384, t.MINCE, e], [e, e, e, e, e, e, 384, t.MINCE, e, e], [416, e, e, e, e, 384, t.MINCE, e, e, 657], [416, e, e, e, 384, t.MINCE, e, e, e, e], [416, e, e, 384, t.MINCE, e, e, e, e, e], [416, e, 384, t.MINCE, e, e, e, e, e, e], [416, 384, t.MINCE, e, e, e, e, e, e, e], [e, e, e, e, e, e, e, e, e, e], [e, e, e, e, e, e, e, e, e, e]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_3a = {
      name: "pattern 3a: vlnka nahoru",
      minHeight: 6,
      maxHeight: 8,
      rowHeader: [0, 1, 2, 6, 7, 8, 9, 3, 4, 5],
      columnHeader: [26, 0, 0, 0, 0, 0, 26],
      pattern: [[e, e, e, 384, e, e, e], [e, e, 384, t.MINCE, 384, e, e], [416, 384, e, t.MINCE, e, 384, 417], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, 640, e, e, e], [e, e, 640, e, 640, e, e], [656, 640, e, e, e, 640, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 4, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 3, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_3b = {
      name: "pattern 3b: vlnka dolu",
      minHeight: 6,
      maxHeight: 8,
      rowHeader: [0, 1, 2, 6, 7, 8, 9, 3, 4, 5],
      columnHeader: [26, 0, 0, 0, 0, 0, 26],
      pattern: [[416, 384, e, e, e, 384, 417], [e, e, 384, e, 384, e, e], [e, e, e, 384, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [656, 640, e, t.MINCE, e, 640, 657], [e, e, 640, t.MINCE, 640, e, e], [e, e, e, 640, e, e, e]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 4, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 3, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_4 = {
      name: "pattern 4: chodba",
      minHeight: 4,
      maxHeight: 6,
      rowHeader: [0, 1, 4, 5, 6, 7, 8, 9, 2, 3],
      columnHeader: [26, 0, 0, 0, 0, 0, 0],
      pattern: [[416, 384, 384, 384, 384, 384, 417], [e, e, 162, t.MINCE, 146, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, 146, t.MINCE, 162, e, e], [656, 640, 640, 640, 640, 640, 657]],
      commands: [t.COLUMN, t.REP_START, 0, t.REP_START, 2, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 1, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 3, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_5 = {
      name: "pattern 5: doura",
      minHeight: 6,
      maxHeight: 10,
      rowHeader: [0, 0, 8, 9, 0, 0, 9, 8, 0, 0],
      columnHeader: [26, 0, 0, 0, 0, 0, 0],
      pattern: [[416, 384, 384, 384, 384, 384, 417], [e, e, t.MINCE, e, 128, e, e], [e, e, 128, e, 128, e, e], [e, e, 128, e, 128, e, e], [e, e, 128, e, t.MINCE, e, e], [e, e, 128, e, t.MINCE, e, e], [e, e, 128, e, 128, e, e], [e, e, 128, e, 128, e, e], [e, e, t.MINCE, e, 128, e, e], [656, 640, 640, 640, 640, 640, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 1, t.REP_START, 2, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 3, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 0, t.COLUMN, t.REP_END]
    }, i.PATTERN_6 = {
      name: "pattern 6: lezaty X",
      minHeight: 8,
      maxHeight: 10,
      rowHeader: [0, 1, 2, 6, 7, 8, 9, 3, 4, 5],
      columnHeader: [26, 0, 0, 0, 0, 0, 26],
      pattern: [[416, 384, e, e, e, 384, 417], [e, e, 384, e, 384, e, e], [e, e, e, 384, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, 640, e, e, e], [e, e, 640, e, 640, e, e], [656, 640, e, e, e, 640, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_7 = {
      name: "pattern 7: elka",
      minHeight: 7,
      maxHeight: 10,
      rowHeader: [0, 0, 0, 9, 0, 7, 9, 0, 0, 0],
      columnHeader: [0, 0, 0, 0, 0, 0, 0],
      pattern: [[416, 384, 384, 384, 384, 384, 417], [e, 128, 128, 128, 128, e, e], [e, e, 128, t.MINCE, t.MINCE, e, e], [e, e, 128, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, e, e, e], [e, e, e, t.MINCE, 128, e, e], [e, e, t.MINCE, t.MINCE, 128, e, e], [e, e, 128, 128, 128, 128, e], [656, 640, 640, 640, 640, 640, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 1, t.REP_START, 2, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 3, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 0, t.COLUMN, t.REP_END]
    }, i.PATTERN_8 = {
      name: "pattern 8: diamant",
      minHeight: 8,
      maxHeight: 10,
      rowHeader: [0, 1, 2, 3, 8, 8, 4, 5, 6, 7],
      columnHeader: [0, 24, 0, 0, 0, 24, 0],
      pattern: [[e, e, e, 384, e, e, e], [e, e, 384, t.MINCE, 384, e, e], [416, 384, e, t.MINCE, e, 384, 417], [e, e, e, 128, e, e, e], [e, e, 128, 128, 128, e, e], [e, e, 128, 128, 128, e, e], [e, e, e, 128, e, e, e], [656, 640, e, t.MINCE, e, 640, 657], [e, e, 640, t.MINCE, 640, e, e], [e, e, e, 640, e, e, e]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.COLUMN, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_9 = {
      name: "pattern 9: chaos",
      minHeight: 5,
      maxHeight: 8,
      rowHeader: [7, 5, 0, 0, 0, 0, 0, 5, 9, 9],
      columnHeader: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      pattern: [[416, e, e, e, 128, 128, 128, e, e, e, 417], [416, 128, 128, e, e, e, e, e, 128, 128, 417], [416, 128, 128, e, 128, 128, 128, e, 128, 128, 417], [e, e, t.MINCE, t.MINCE, e, e, 162, e, e, e, e], [e, 128, 128, 128, 128, 0, 128, 128, 128, 128, e], [e, e, t.MINCE, t.MINCE, e, e, 146, e, e, e, e], [656, 128, 128, e, 128, 128, 128, e, 128, 128, 657], [656, 128, 128, e, e, e, e, e, 128, 128, 657], [656, e, e, e, 128, 128, 128, e, e, e, 657], [656, e, e, e, 128, 128, 128, e, e, e, 657]],
      commands: [t.REP_START, 0, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.COLUMN, t.COLUMN, t.COLUMN, t.REP_START, 3, t.COLUMN, t.REP_END, t.COLUMN, t.COLUMN, t.COLUMN, t.COLUMN, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i.PATTERN_10 = {
      name: "pattern 10: bloky",
      minHeight: 6,
      maxHeight: 10,
      rowHeader: [0, 1, 2, 6, 8, 9, 7, 3, 4, 5],
      columnHeader: [0, 0, 0, 0, 0, 26, 0],
      pattern: [[416, 384, 384, 384, 384, 384, 417], [e, e, 160, e, 144, e, e], [e, e, 160, e, 144, e, e], [e, t.MINCE, 128, t.MINCE, 128, e, e], [e, t.MINCE, 128, t.MINCE, 128, e, e], [e, t.MINCE, 128, t.MINCE, 128, e, e], [e, t.MINCE, 128, t.MINCE, 128, e, e], [e, e, 144, e, 160, e, e], [e, e, 144, e, 160, e, e], [656, 640, 640, 640, 640, 640, 657]],
      commands: [t.REP_START, 1, t.COLUMN, t.REP_END, t.REP_START, 0, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_START, 2, t.COLUMN, t.REP_END, t.REP_END, t.REP_START, 1, t.COLUMN, t.REP_END]
    }, i
  }();
  t.Patterns = i
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function t() {
      this.position = new Phaser.Point(0, 0), this.tiles = [], this.nextPosition = new Phaser.Point(0, 0)
    }

    return t
  }();
  t.Piece = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e(i) {
      t.call(this, i, 0, 0, "Sprites", "skeleton-jump_5"), this.onOutOfScreen = new Phaser.Signal, this.anchor.set(0, .5), i.physics.arcade.enable(this, !1);
      var n = this.body;
      n.setSize(31, 53, 7, 5);
      var a = 0, s = this.height / 2;
      this._rect = new Phaser.Rectangle(7 - a, 5 - s, 31, 53), n.allowGravity = !0, this.animations.add("run", e.ANIM_RUN, 16, !0), this.animations.add("jump", e.ANIM_JUMP, 20, !1), this.animations.add("fall", e.ANIM_FALL, 1, !1)
    }

    return __extends(e, t), Object.defineProperty(e.prototype, "allowGravity", {
      set: function (t) {
        var e = this.body;
        e.allowGravity = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "rect", {
      get: function () {
        return this._rect
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "onFloor", {
      get: function () {
        return this._onFloor
      }, set: function (t) {
        this._onFloor = t
      }, enumerable: !0, configurable: !0
    }), e.prototype.resetPlayer = function () {
      var t = this.body;
      this.position.set(-50, this.game.height / 2 - 100), this.scale.y = 1, t.allowGravity = !0, t.velocity.set(0, 0), this._onFloor = !0
    }, e.prototype.postUpdate = function () {
      t.prototype.postUpdate.call(this);
      var e = this.body;
      (this.y < -40 || this.y > this.game.height + 40) && (e.velocity.set(0, 0), e.allowGravity = !1, this.onOutOfScreen.dispatch())
    }, e.ANIM_RUN = ["skeleton-run_0", "skeleton-run_1", "skeleton-run_2", "skeleton-run_3", "skeleton-run_4", "skeleton-run_5"], e.ANIM_JUMP = ["skeleton-jump_0", "skeleton-jump_1", "skeleton-jump_2", "skeleton-jump_3", "skeleton-jump_4", "skeleton-jump_5"], e.ANIM_FALL = ["skeleton-jump_5"], e
  }(Phaser.Sprite);
  t.Player = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.AUDIO_JSON = {
      resources: ["http://dagala.ir/ninja/www.gameeapp.com/data/assets/sfx/Sfx.ogg", "http://dagala.ir/ninja/www.gameeapp.com/data/assets/sfx/Sfx.m4a"],
      spritemap: {
        bonus: {start: 0, end: .7888662131519274, loop: !1},
        end: {start: 2, end: 4.77297052154195, loop: !1},
        jump: {start: 6, end: 6.695283446712018, loop: !1},
        katana: {start: 8, end: 9.380975056689342, loop: !1},
        land: {start: 11, end: 11.529727891156462, loop: !1}
      }
    }, t
  }();
  t.Sounds = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e() {
      t.call(this), this._ignoreNextResize = !1
    }

    return __extends(e, t), e.prototype.init = function () {
      this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0;
      var t = Utils.ScreenUtils.screenMetrics;
      this.game.device.desktop ? (this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE, this.scale.setMinMax(.25 * this.game.width, .25 * this.game.height, 2.5 * this.game.width, 2.5 * this.game.height), this.scale.setUserScale(t.scaleX, t.scaleY), this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.scale.setResizeCallback(this.gameResized, this)) : (this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE, this.scale.setUserScale(t.scaleX, t.scaleY), this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.scale.forceOrientation(!0, !1), this.scale.setResizeCallback(this.gameResized, this), this.scale.onOrientationChange.add(this.orientationChange, this)), this.orientationChange(this.scale, "", !0)
    }, e.prototype.create = function () {
      this.game.state.start("Preloader", !0, !1)
    }, e.prototype.gameResized = function (t, e) {
    }, e.prototype.orientationChange = function (t, e, i) {
    }, e
  }(Phaser.State);
  t.Boot = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (t) {
    function e() {
      t.call(this), this._restartCounter = 2
    }

    return __extends(e, t), e.prototype.create = function () {
      this._once = !1, this._pressed = !1;
      var t = this.add.image(0, 0, "Tut");
      t.inputEnabled = !0, t.events.onInputUp.add(function () {
        this._pressed = !0
      }, this), this._space = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    }, e.prototype.onGameeRestart = function () {
      --this._restartCounter <= 0 && (this._pressed = !0)
    }, e.prototype.onGameeButtonDown = function (t) {
      this._pressed = !0
    }, e.prototype.update = function () {
      this._once || (this._space.justDown && (this._pressed = !0), this._pressed && (this._once = !0, App.Global.GAMEE && Gamee.Gamee.instance.gameStart(), this.game.state.start("Play")))
    }, e
  }(Phaser.State);
  t.Menu = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (e) {
    function i() {
      e.call(this), this._ready = !1
    }

    return __extends(i, e), i.prototype.preload = function () {
      var e = "http://dagala.ir/ninja/www.gameeapp.com/data/assets/sfx/";
      if (this.game.device.ie || Phaser.Device.isAndroidStockBrowser()) {
        for (var i in t.Sounds.AUDIO_JSON.spritemap)this.load.audio(i, e + i + ".mp3");
        this.load.audio("Music", e + "music.mp3")
      } else {
        var n = 0;
        this.game.device.iOS && (n = .1), this.load.audiosprite("Sfx", t.Sounds.AUDIO_JSON.resources, null, t.Sounds.AUDIO_JSON), this.load.audio("Music", [e + "music.ogg", e + "music.m4a"])
      }
      e = "assets/", this.load.atlas("Sprites", e + "Sprites.png", e + "Sprites.json"), this.load.json("Config", e + "config.json")
    }, i.prototype.loadUpdate = function () {
      this.setLoadingText(this.load.progress)
    }, i.prototype.create = function () {
      this.readConfig();
      var e = this.add.audio("Music");
      if (e.volume = .65, Utils.AudioUtils.addMusic("Music", e), this.game.device.ie || Phaser.Device.isAndroidStockBrowser()) {
        Utils.AudioUtils.setSounds(null);
        for (var i in t.Sounds.AUDIO_JSON.spritemap) {
          var n = this.add.audio(i);
          n.allowMultiple = !0, Utils.AudioUtils.addSound(i, n)
        }
      } else {
        var a = this.add.audioSprite("Sfx");
        for (var i in t.Sounds.AUDIO_JSON.spritemap) {
          var n = a.sounds[i];
          n.allowMultiple = !0
        }
        Utils.AudioUtils.setSounds(a)
      }
    }, i.prototype.readConfig = function () {
      var e = this.game.cache.getJSON("Config");
      for (var i in e)t.Gameplay[i] = e[i]
    }, i.prototype.update = function () {
      this._ready === !1 && (this._ready = !0, this.game.state.start("Play"))
    }, i.prototype.setLoadingText = function (t) {
    }, i
  }(Phaser.State);
  t.Preloader = e
}(Ninja || (Ninja = {}));
var Ninja;
!function (t) {
  var e = function (e) {
    function i() {
      e.call(this), this._gameOver = !1, this._runFromRestart = !1, this._gameDirty = !0
    }

    return __extends(i, e), i.prototype.create = function () {
      this.camera.bounds = null, this.physics.arcade.gravity.y = t.Gameplay.GRAVITY, this._button = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR), this.game.input.onDown.add(function () {
        this._buttonDown = !0
      }, this), this.game.input.onUp.add(function () {
        this._buttonDown = !1
      }, this), this.createBackground(), this._arrow = new Phaser.Sprite(this.game, 256, 524, "Sprites", "sipka"), this._arrow.anchor.set(.5, 1), this._arrow.angle = 33.7, this.world.add(this._arrow), this._player = new t.Player(this.game), this._player.onOutOfScreen.add(function () {
        this.setGameOver()
      }, this), this.world.add(this._player), this._generator = new t.Generator(this.game, this._player), this.world.add(this._generator.walls), this.world.bringToTop(this._player), this.createEmitters(), this.reset()
    }, i.prototype.onGameePause = function () {
      this.game.paused = !0
    }, i.prototype.onGameeUnpause = function () {
      this.game.paused = !1
    }, i.prototype.onGameeRestart = function () {
      App.Global.game.paused = !1, Gamee.Gamee.instance.gameStart(), Utils.AudioUtils.playSound("katana"), this.reset()
    }, i.prototype.onGameeButtonDown = function (t) {
      var e = Gamee.Gamee.instance;
      e.gameRunning ? this._buttonDown = !0 : this._runFromRestart || (e.gameStart(), Utils.AudioUtils.playSound("katana"), this.reset())
    }, i.prototype.onGameeButtonUp = function (t) {
      Gamee.Gamee.instance;
      this._buttonDown = !1
    }, i.prototype.reset = function () {
      this._gameOver = !1, this._buttonDown = !1, Utils.AudioUtils.stopSound("katana"), this.camera.x = 0, this.physics.arcade.gravity.y = t.Gameplay.GRAVITY, this._gameDirty && (this._generator.reset(), this._generator.updateGenerator(0), this.updateBackground(0), this._gameDirty = !1), this._player.resetPlayer(), this._standing = !1, this._jumpTimer = 0, this._inAir = !1, this._speed = t.Gameplay.SPEED_X_MIN, this._speedUpdateDir = 1, this._arrow.exists = !0, this._arrow.position.set(256, 534), this._arrow.alpha = 1, this._arrowTween = this.add.tween(this._arrow).to({
        x: 258,
        y: 531
      }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this._score = 0, this._lastScoreTime = 0, Utils.AudioUtils.stopMusic(), Utils.AudioUtils.playMusic("Music")
    }, i.prototype.update = function () {
      this._player.body;
      if (!this._gameOver) {
        if (App.Global.GAMEE && !Gamee.Gamee.instance.gameRunning)return void this._player.resetPlayer();
        this._gameDirty = !0, this._inAir && this.movePlayer(), this.updatePhysics(), this.updateSpeed(), this.camera.x = Math.max(0, this._player.x - 125), this._generator.updateGenerator(this.camera.x), this.handleInput();
        var t = Math.floor(this._lastScoreTime / 1e3);
        this._lastScoreTime += this.time.elapsedMS, Math.floor(this._lastScoreTime / 1e3) > t && this.onScore(1)
      }
      this.updateBackground(this.camera.x)
    }, i.prototype.updateSpeed = function () {
      if (1 === this._speedUpdateDir) {
        var e = t.Gameplay.SPEED_X_MAX - t.Gameplay.SPEED_X_MIN;
        this._speed += e / t.Gameplay.SPEED_UP_TIME * this.time.physicsElapsed, this._speed > t.Gameplay.SPEED_X_MAX && (this._speedUpdateDir = 0)
      } else if (-1 === this._speedUpdateDir) {
        var e = t.Gameplay.SPEED_X_MAX - t.Gameplay.SPEED_X_MIN;
        this._speed -= e / t.Gameplay.SPEED_DOWN_TIME * this.time.physicsElapsed, this._speed < t.Gameplay.SPEED_X_MIN && (this._speedUpdateDir = 1)
      }
      Phaser.Math.clamp(this._speed, t.Gameplay.SPEED_X_MIN, t.Gameplay.SPEED_X_MAX)
    }, i.prototype.movePlayer = function () {
      var e = this._player.body, i = Phaser.Math.sign(this.physics.arcade.gravity.y), n = this.time.physicsElapsed;
      e.y += this._speed * t.Gameplay.SPEED_Y_COEF * n * i, e.x += this._speed * n, (0 > i && e.y <= this._destinationY || i > 0 && e.y >= this._destinationY) && (e.y = this._destinationY, this._player.allowGravity = !0, this._inAir = !1);
      var a = Math.abs(e.y - this._startY) / Math.abs(this._startY - this._destinationY), s = (2 * Phaser.Easing.Exponential.InOut(a) - 1) * i;
      this._player.scale.y = s
    }, i.prototype.handleInput = function () {
      this._button.justDown && (this._buttonDown = !0), this._button.justUp && (this._buttonDown = !1);
      var e = this._buttonDown;
      if (e && this._standing && !this._inAir && !(this.game.time.now < this._jumpTimer)) {
        this._buttonDown = !1, this._jumpTimer = this.game.time.now + 150;
        var i = this._player.onFloor;
        this._player.onFloor = !i;
        var n = this._speed, a = (i ? -this._speed : this._speed) * t.Gameplay.SPEED_Y_COEF, s = this._player.rect, r = this._player.x + s.x, o = this._player.y + s.y, h = 0;
        i ? (h = Math.max(this._generator.castRay(r, o, n, a, 1, 1).destY, this._generator.castRay(r + s.width, o, n, a, 1, 1).destY), h += s.height + s.y) : (h = Math.min(this._generator.castRay(r, o + s.height, n, a, 1, 1).destY, this._generator.castRay(r + s.width, o + s.height, n, a, 1, 1).destY), h -= s.height + s.y);
        var l = this._player.body;
        this._inAir = !0, this._startY = this._player.y - (this._player.y - l.y), this._destinationY = h - (this._player.y - l.y), this._player.allowGravity = !1, l.velocity.set(0, 0), this.physics.arcade.gravity.y = t.Gameplay.GRAVITY * (this._player.onFloor ? 1 : -1), this._player.animations.play("jump"), Utils.AudioUtils.playSound("jump"), this._arrow.exists && (this._arrowTween.stop(), this.add.tween(this._arrow).to({alpha: 0}, 400, Phaser.Easing.Linear.None, !0, 0).onComplete.add(function () {
          this._arrow.exists = !1
        }, this))
      }
    }, i.prototype.updatePhysics = function () {
      var e = this._player.body;
      this.physics.arcade.overlap(this._player, this._generator.bonuses, function (t, e) {
        this.onScore(1), Utils.AudioUtils.playSound("bonus"), e.exists = !1, this._coinEmitter.emitAt(e.x, e.y);
        var i = this._coinEmitter.emitParticle();
        null !== i && (i.visual.frameName = e.frameName)
      }, null, this), e.touching.none = !0, e.touching.up = e.touching.down = e.touching.left = e.touching.right = !1;
      var i = this._inAir ? this.physics.arcade.overlap(this._player, this._generator.walls) : this.physics.arcade.collide(this._player, this._generator.walls);
      if (this._inAir && i) {
        e.touching.none = !0, e.touching.up = e.touching.down = e.touching.left = e.touching.right = !1, this.physics.arcade.overlap(this._player, this._generator.walls), this._player.allowGravity = !0, this._inAir = !1;
        var n = Phaser.Math.sign(this._destinationY - e.y), a = (2 * Phaser.Easing.Exponential.InOut(1) - 1) * n;
        this._player.scale.y = a
      }
      if (e.touching.left || e.touching.right)return this._inAir = !1, e.velocity.set(0, 0), this.physics.arcade.gravity.y = t.Gameplay.GRAVITY, void this.setGameOver();
      var s = this._standing;
      this._standing = e.touching.down || e.touching.up, this._inAir || s === this._standing || (this._player.animations.play(this._standing ? "run" : "fall"), this._standing && Utils.AudioUtils.playSound("land")), e.velocity.x = this._inAir ? 0 : this._speed
    }, i.prototype.setGameOver = function () {
      this._gameOver || (this._player.animations.stop(), this._gameOver = !0, Utils.AudioUtils.stopMusic(), Utils.AudioUtils.playSound("end"), this.time.events.add(1e3, function () {
        this._player.resetPlayer(), App.Global.GAMEE ? (this._runFromRestart = !0, Gamee.Gamee.instance.gameOver()) : this.reset()
      }, this))
    }, i.prototype.onScore = function (t) {
      this._score += t, App.Global.GAMEE && (Gamee.Gamee.instance.score = this._score)
    }, i.prototype.createBackground = function () {
      var e = this.add.sprite(0, 0, "Sprites", "bg", this.world);
      e.fixedToCamera = !0, e.height = this.game.height, e.width = this.game.width;
      var i = this.add.sprite(400, 330, "Sprites", "slunce", this.world);
      i.scale.set(2, 2), i.anchor.set(.5, .5), i.fixedToCamera = !0, this._backClouds = new t.Clouds(this.game, this.world, 3, .2, ["mrak_maly"], 190, 110),
        this._mountains = new t.BgLayer(this.game, this.world, "Sprites", "hory", 1, .4), this._mountains.position.y = this.game.height - 170, this._frontClouds = new t.Clouds(this.game, this.world, 5, .6, ["mrak_stredni", "mrak_velky"], 0, 190), this._front = new t.BgLayer(this.game, this.world, "Sprites", "front", 1, .8), this._front.position.y = this.game.height
    }, i.prototype.updateBackground = function (t) {
      this._backClouds.updatePosition(t), this._mountains.updatePosition(t), this._frontClouds.updatePosition(t), this._front.updatePosition(t)
    }, i.prototype.createEmitters = function () {
      var t = new Particles.ParticlesEmitter(this.game, 0, 0, 16);
      t.gravity = 2500, t.lifetime = .8, t.setXSpeed(-100, 100), t.setYSpeed(-400, -600), t.makeParticles("Sprites", "coin1", 16), this.world.add(t), this._coinEmitter = t
    }, i.DEBUG = !1, i
  }(Phaser.State);
  t.Play = e
}(Ninja || (Ninja = {}));
var App;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.GAMEE = !0, t.game = null, t.GAME_WIDTH = 640, t.GAME_HEIGHT = 640, t.MAX_GAME_WIDTH = 640, t.MAX_GAME_HEIGHT = 640, t.scaleX = 1, t.scaleY = 1, t.correctOrientation = !1, t.musicOn = !0, t.soundOn = !0, t.showLanguages = !1, t.supportedLanguages = ["en"], t.currentLanguage = "en", t
  }();
  t.Global = e
}(App || (App = {}));
var PhaserGlobal = {stopFocus: !0};
window.onload = function () {
  var t = new Ninja.Game;
  if (App.Global.game = t, App.Global.GAMEE) {
    var e = new Gamee.Gamee("OneButton", !0);
    e.setGame(t)
  }
};
var Ninja;
!function (t) {
  var e = function (e) {
    function i() {
      var n = (window.innerWidth, window.innerHeight, Utils.ScreenUtils.calculateScreenMetrics(App.Global.GAME_WIDTH, App.Global.GAME_HEIGHT, Utils.eOrientation.PORTRAIT, !0, App.Global.MAX_GAME_WIDTH, App.Global.MAX_GAME_HEIGHT)), a = Phaser.AUTO;
      e.call(this, {
        width: n.gameWidth,
        height: n.gameHeight,
        renderer: a,
        parent: "content",
        transparent: !1,
        antialias: !0,
        physicsConfig: null,
        preserveDrawingBuffer: !0
      }), i.game = this, Utils.PhaserUtils.ChangeAnimationPhaserJSONData(this.additionalFrameProperties), Utils.PhaserUtils.AdjustTweenFunctions(), Utils.PhaserUtils.AddBitmapFontAddMethod(), this.state.add("Boot", t.Boot), this.state.add("Preloader", t.Preloader), this.state.add("Menu", t.Menu), this.state.add("Play", t.Play), this.state.add("Test", t.Play), this.state.start("Boot")
    }

    return __extends(i, e), i.prototype.onMute = function () {
      Utils.AudioUtils.stopMusic(), App.Global.soundOn = !1, App.Global.musicOn = !1, this.sound.mute = !0
    }, i.prototype.onUnmute = function () {
      this.sound.mute = !1, App.Global.soundOn = !0, App.Global.musicOn = !0, Utils.AudioUtils.playMusic("Music")
    }, i.prototype.additionalFrameProperties = function (t, e) {
      e.anchor && (t.anchorX = e.anchor.w, t.anchorY = e.anchor.h), e.nextitem && (t.nextItemX = e.nextitem.w, t.nextItemY = e.nextitem.h)
    }, i
  }(Phaser.Game);
  t.Game = e
}(Ninja || (Ninja = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.setSounds = function (e, i) {
      void 0 === i && (i = null), t._sfx = e, t._sfxIds = i, t._isAudioSprite = null !== e && e instanceof Phaser.AudioSprite
    }, t.addSound = function (e, i) {
      t._sfxs[e] = i
    }, t.playSound = function (e) {
      var i = t.getSoundName(e);
      App.Global.soundOn && (null !== t._sfx ? t._isAudioSprite ? t._sfx.play(i) : t._sfx.play(i) : void 0 !== t._sfxs[i] && t._sfxs[i].play())
    }, t.stopSound = function (e) {
      var i = t.getSoundName(e);
      null !== t._sfx ? t._isAudioSprite && t._sfx.stop(i) : void 0 !== t._sfxs[i] && t._sfxs[i].stop()
    }, t.getSoundName = function (e) {
      var i;
      return i = "number" == typeof e ? t._sfxIds[e] : e
    }, Object.defineProperty(t, "currentMusic", {
      get: function () {
        return t._currentMusic
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t, "isMusicPlaying", {
      get: function () {
        if (null === this._currentMusic || 0 === this._currentMusic.length)return !1;
        var e = t._music[t._currentMusic];
        return e.isPlaying
      }, enumerable: !0, configurable: !0
    }), t.addMusic = function (e, i) {
      t._music[e] = i
    }, t.playMusic = function (e, i) {
      if (void 0 === i && (i = !0), t._currentMusic !== e && (null !== t._currentMusic && t._currentMusic.length > 0 && t.stopMusic(), e in t._music && App.Global.musicOn)) {
        t._currentMusic = e;
        var n = t._music[e];
        n.loop = i, n.play(), i || n.onStop.addOnce(function () {
          t.onFinished.dispatch(e)
        }, this)
      }
    }, t.stopMusic = function () {
      if (null !== t._currentMusic && t._currentMusic.length > 0) {
        var e = t._music[t._currentMusic];
        e.isPlaying && e.stop(), t._currentMusic = ""
      }
    }, t.pauseMusic = function () {
      if (null !== t._currentMusic && t._currentMusic.length > 0) {
        var e = t._music[t._currentMusic];
        e.isPlaying && e.pause()
      }
    }, t.resumeMusic = function () {
      if (null !== t._currentMusic && t._currentMusic.length > 0) {
        var e = t._music[t._currentMusic];
        e.paused && e.resume()
      }
    }, t._sfx = null, t._isAudioSprite = !1, t._sfxs = {}, t._music = {}, t._currentMusic = "", t.onFinished = new Phaser.Signal, t
  }();
  t.AudioUtils = e
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.supported = function () {
      return App.Global.game.scale.compatibility.supportsFullScreen
    }, t.isFullscreen = function () {
      return App.Global.game.scale.isFullScreen
    }, t.changeFullscreen = function () {
      var t = App.Global.game, e = t.scale.isFullScreen;
      e ? t.scale.stopFullScreen() : t.scale.startFullScreen(!1, !1)
    }, t
  }();
  t.FullscreenUtils = e
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.ChangeAnimationPhaserJSONData = function (t) {
      Phaser.AnimationParser.myCallback = t, Phaser.AnimationParser.JSONData = function (t, e) {
        if (e.frames) {
          for (var i = new Phaser.FrameData, n = e.frames, a = 0; a < n.length; a++) {
            var s = i.addFrame(new Phaser.Frame(a, n[a].frame.x, n[a].frame.y, n[a].frame.w, n[a].frame.h, n[a].filename));
            n[a].trimmed && s.setTrim(n[a].trimmed, n[a].sourceSize.w, n[a].sourceSize.h, n[a].spriteSourceSize.x, n[a].spriteSourceSize.y, n[a].spriteSourceSize.w, n[a].spriteSourceSize.h), Phaser.AnimationParser.myCallback(s, n[a])
          }
          return i
        }
      }
    }, t.AdjustTweenFunctions = function () {
      Phaser.TweenManager.prototype.removeFromUpdateQueue = function (t) {
        var e = this._tweens.indexOf(t);
        -1 !== e ? this._tweens.splice(e, 1) : (e = this._add.indexOf(t), -1 !== e && this._add.splice(e, 1))
      }, Phaser.Tween.prototype.stopAndRemoveFromUpdateQueue = function (t) {
        var e = this, i = e.stop(t);
        return e.manager.removeFromUpdateQueue(e), e.pendingDelete = !1, i
      }
    }, t.AddBitmapFontAddMethod = function () {
      Phaser.Cache.prototype.addBitmapFontFromImage = function (t, e, i, n, a, s, r) {
        var o = this.getImage(i, !0), h = {url: e, data: o.data, font: null, base: o.base};
        void 0 === s && (s = 0), void 0 === r && (r = 0), "json" === a ? h.font = Phaser.LoaderParser.jsonBitmapFont(n, h.base, s, r) : h.font = Phaser.LoaderParser.xmlBitmapFont(n, h.base, s, r), this._cache.bitmapFont[t] = h, this._resolveURL(e, h)
      }
    }, t
  }();
  t.PhaserUtils = e
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t
  }();
  t.ScreenMetrics = e, function (t) {
    t[t.PORTRAIT = 0] = "PORTRAIT", t[t.LANDSCAPE = 1] = "LANDSCAPE"
  }(t.eOrientation || (t.eOrientation = {}));
  var i = t.eOrientation, n = function () {
    function t() {
    }

    return t.calculateScreenMetrics = function (t, n, a, s, r, o) {
      void 0 === a && (a = i.LANDSCAPE);
      var h, l;
      if (h = window.innerWidth, l = window.innerHeight, (l > h && a === i.LANDSCAPE || h > l && a === i.PORTRAIT) && !s) {
        var u = h;
        h = l, l = u
      }
      ("undefined" == typeof r || "undefined" == typeof o) && (a === i.LANDSCAPE ? (r = Math.round(1024 * t / 960), o = Math.round(720 * n / 600)) : (r = Math.round(720 * t / 600), o = Math.round(1024 * n / 960)));
      var c = t / n, p = h / l, _ = 0, m = 0, d = 0, f = 0;
      p > c ? (f = n, d = 2 * Math.ceil(f * p / 2), d = Math.min(d, r), _ = (d - t) / 2, m = 0) : (d = t, f = 2 * Math.ceil(d / p / 2), f = Math.min(f, o), _ = 0, m = (f - n) / 2);
      var g = (h + .01) / d, P = (l + .01) / f;
      return s && a === i.LANDSCAPE && (g = P), this.screenMetrics = new e, this.screenMetrics.windowWidth = h, this.screenMetrics.windowHeight = l, this.screenMetrics.defaultGameWidth = t, this.screenMetrics.defaultGameHeight = n, this.screenMetrics.maxGameWidth = r, this.screenMetrics.maxGameHeight = o, this.screenMetrics.gameWidth = d, this.screenMetrics.gameHeight = f, this.screenMetrics.scaleX = g, this.screenMetrics.scaleY = P, this.screenMetrics.offsetX = _, this.screenMetrics.offsetY = m, this.screenMetrics
    }, t
  }();
  t.ScreenUtils = n
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t
  }(), i = function () {
    function t() {
    }

    return t.save = function () {
      var i = new e;
      i.musicOn = App.Global.musicOn, i.soundOn = App.Global.soundOn, i.currentLanguage = App.Global.currentLanguage;
      var n = t.getLocalStorage();
      if (null !== n) {
        var a = JSON.stringify(i);
        n.setItem("ninja_save", a)
      }
    }, t.load = function () {
      var e = null;
      if (null === e || void 0 === e) {
        var i = t.getLocalStorage();
        if (null === i)return !1;
        e = JSON.parse(i.getItem("fjm_save"))
      }
      return null === e || void 0 === e ? !1 : (App.Global.musicOn = e.musicOn, App.Global.soundOn = e.soundOn, App.Global.currentLanguage = e.currentLanguage, !0)
    }, t.getLocalStorage = function () {
      try {
        if ("localStorage" in window && null !== window.localStorage)return localStorage
      } catch (t) {
        return null
      }
      return null
    }, t
  }();
  t.StorageUtils = i
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.padNumber = function (t, e, i) {
      void 0 === i && (i = "0");
      var n = t + "";
      return n.length >= e ? n : new Array(e - n.length + 1).join(i) + n
    }, t.addSpacingToNumber = function (t, e) {
      return void 0 === e && (e = " "), ("" + t).replace(/\B(?=(\d{3})+(?!\d))/g, e)
    }, t.formatTime = function (e, i, n, a) {
      void 0 === n && (n = -1), void 0 === a && (a = ":"), e = Math.floor(e);
      var s = !1, r = "";
      if (e > 3600 || 0 === i) {
        var o = Math.floor(e / 3600);
        r += (-1 !== n ? t.padNumber(o, n) : o) + a, e %= 3600, s = !0
      }
      if (s === !0 || e > 60 || 1 === i) {
        var h = Math.floor(e / 60);
        r += (-1 !== n ? t.padNumber(h, n) : h) + a, e %= 60, s = !0
      }
      var l = e;
      return r += -1 !== n ? t.padNumber(l, n) : l
    }, t
  }();
  t.StringUtils = e
}(Utils || (Utils = {}));
var Utils;
!function (t) {
  var e = function () {
    function t() {
    }

    return t.setTexts = function (e) {
      t._texts = e
    }, t.getText = function (e, i) {
      if (null === t._texts)return "Texts not set";
      "undefined" == typeof i && (i = App.Global.currentLanguage);
      var n = t._texts[i];
      if ("undefined" == typeof n)return "Invalid language " + i;
      var a = n[e];
      return "undefined" == typeof a ? "!MISSING TEXT!" : a
    }, t._texts = null, t
  }();
  t.TextUtils = e
}(Utils || (Utils = {}));
