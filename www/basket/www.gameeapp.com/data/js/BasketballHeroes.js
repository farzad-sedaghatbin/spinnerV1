var Game;
!function (e) {
  !function (e) {
    e[e.court0Name = 0] = "court0Name", e[e.court0Description = 1] = "court0Description", e[e.court1Name = 2] = "court1Name", e[e.court2Name = 3] = "court2Name", e[e.court2UnlockMsg = 4] = "court2UnlockMsg", e[e.giftBtnTitle = 5] = "giftBtnTitle", e[e.openNow = 6] = "openNow", e[e.balls = 7] = "balls", e[e.play = 8] = "play", e[e.locked = 9] = "locked", e[e.selected = 10] = "selected", e[e.use = 11] = "use", e[e.bestScore1 = 12] = "bestScore1", e[e.bestScore2 = 13] = "bestScore2", e[e.prize = 14] = "prize", e[e.newBest = 15] = "newBest", e[e.ok = 16] = "ok", e[e.tapTheBox = 17] = "tapTheBox", e[e.greatWork = 18] = "greatWork", e[e.beginnersCourtUnlocked = 19] = "beginnersCourtUnlocked", e[e.bonus = 20] = "bonus", e[e.thankYou = 21] = "thankYou", e[e.biniBallUnlocked = 22] = "biniBallUnlocked"
  }(e.eTextAsset || (e.eTextAsset = {}));
  var t = e.eTextAsset, i = function () {
    function i() {
    }

    return i.initTextAssets = function () {
      i._textAssets = [], i._textAssets[t.court0Name] = "BINI'S TRAINING", i._textAssets[t.court0Description] = "Practise your skills here", i._textAssets[t.court1Name] = "BEGINNERS COURT", i._textAssets[t.court2Name] = "CHAMPIONS COURT", i._textAssets[t.court2UnlockMsg] = "Score more than 45 on\rthe Beginner's court", i._textAssets[t.giftBtnTitle] = "DAILY GIFT", i._textAssets[t.openNow] = "OPEN NOW!", i._textAssets[t.balls] = "BALLS", i._textAssets[t.play] = "PLAY", i._textAssets[t.locked] = "LOCKED", i._textAssets[t.selected] = "SELECTED", i._textAssets[t.use] = "USE", i._textAssets[t.bestScore1] = "Best Score:", i._textAssets[t.bestScore2] = "BEST SCORE:", i._textAssets[t.prize] = "PRIZE:", i._textAssets[t.newBest] = "NEW BEST", i._textAssets[t.ok] = "OK", i._textAssets[t.tapTheBox] = "TAP THE BOX TO OPEN\rYOUR FREE DAILY GIFT!", i._textAssets[t.greatWork] = "GREAT WORK!", i._textAssets[t.beginnersCourtUnlocked] = "Let's play a match on\rthe Beginners Court.", i._textAssets[t.bonus] = "BONUS", i._textAssets[t.thankYou] = "THANK YOU!", i._textAssets[t.biniBallUnlocked] = "Here's a special Bini ball\rfor playing 15 games"
    }, i.getText = function (e) {
      return i._textAssets[e]
    }, Object.defineProperty(i, "saveData", {
      get: function () {
        return i._saveData
      }, set: function (e) {
        i._saveData = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "totalScore", {
      get: function () {
        return i._saveData.totalScore
      }, set: function (e) {
        i._saveData.totalScore = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "coins", {
      get: function () {
        return i._saveData.coins
      }, set: function (e) {
        i._saveData.coins != e && (i._saveData.coins = e, i._onCoinsChange.dispatch(e))
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "onCoinsChange", {
      get: function () {
        return this._onCoinsChange
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "courts", {
      get: function () {
        return i._courts
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "selectedCourt", {
      get: function () {
        return i.courts[i._saveData.selectedCourtId]
      }, set: function (e) {
        i._saveData.selectedCourtId = e.id
      }, enumerable: !0, configurable: !0
    }), i.initCourts = function () {
      i._courts = [], i._courts[0] = new e.CourtData(0, i.getText(t.court0Name), 10, 60, 4e3, i.getText(t.court0Description)), i._courts[1] = new e.CourtData(1, i.getText(t.court1Name), 10, 70, 3500), i._courts[2] = new e.CourtData(2, i.getText(t.court2Name), 30, 90, 2e3, void 0, i.getText(t.court2UnlockMsg))
    }, Object.defineProperty(i, "balls", {
      get: function () {
        return i._balls
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "selectedBall", {
      get: function () {
        if (null == i._selectedBall) {
          for (var e = i._saveData.selectedBallId, t = i._balls.length; 0 != t-- && i._balls[t].id != e;);
          i._selectedBall = i._balls[t]
        }
        return i._selectedBall
      }, set: function (e) {
        i._saveData.selectedBallId != e.id && (i._saveData.selectedBallId = e.id, i._selectedBall = e, i._onSelectedBallChange.dispatch())
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i, "onSelectedBallChange", {
      get: function () {
        return this._onSelectedBallChange
      }, enumerable: !0, configurable: !0
    }), i.initBalls = function () {
      i._balls = [], i._balls.push(new e.BallData(0, "Standard Ball", ""));
      var t = new e.BallData(16, "Mystery Ball", "Play 15 games on\rany court");
      t.iconKey = "mysteryBallIcon", i._balls.push(t), i._balls.push(new e.BallData(1, "Tennis Ball", "Win 10 games on\rthe Beginners Court")), i._balls.push(new e.BallData(2, "Stripey Ball", "Win 3 games in a row on\rthe Beginners Court")), i._balls.push(new e.BallData(3, "Football", "Play 50 games on\rthe Beginners Court")), i._balls.push(new e.BallData(4, "Pool Ball", "Score 1000 in total")), i._balls.push(new e.BallData(5, "Beach Ball", "Score more than 35 on\rthe Beginners Court")), i._balls.push(new e.BallData(6, "Camo Ball", "Win 10 games on\rthe Champions Court")), i._balls.push(new e.BallData(7, "Champs Ball", "Win 3 games in a row on\rthe Champions Court")), t = new e.BallData(8, "Melon Ball", "Bonus Score 2%", 25), t.scoreBonus = .02, i._balls.push(t), t = new e.BallData(9, "Candy Ball", "Bonus Time +2 seconds\rfor each Perfect Shot", 50), t.timeBonus = 2, i._balls.push(t), i._balls.push(new e.BallData(10, "Monster Ball", "Double Power-Ups", 75)), t = new e.BallData(11, "Dotty Ball", "Bonus Score 5%", 100), t.scoreBonus = .05, i._balls.push(t), t = new e.BallData(12, "Smiley Ball", "Bonus Time +5 seconds\rfor each Perfect Shot", 100), t.timeBonus = 5, i._balls.push(t), i._balls.push(new e.BallData(13, "Eye Ball", "5 Seconds Head Start", 250)), i._balls.push(new e.BallData(14, "Droid Ball", "Fireball x3", 300)), t = new e.BallData(15, "Golden Ball", "Bonus Score 10%", 400), t.scoreBonus = .1, t.iconKey = "goldenBallIcon", i._balls.push(t), i._onSelectedBallChange = new Phaser.Signal
    }, i.unlockMysteryBall = function () {
      if (i._balls[1].locked) {
        var e = i._balls[1];
        e.unlock(), e.name = "Bini Ball", e.iconKey = null
      }
    }, Object.defineProperty(i, "dailyGift", {
      get: function () {
        return this._dailyGift
      }, enumerable: !0, configurable: !0
    }), i.init = function (t) {
      i.game = t, i._onCoinsChange = new Phaser.Signal, i.initTextAssets(), i.initCourts(), i.initBalls(), i._dailyGift = new e.Gift
    }, i.setAudioUnlockCallback = function (e, t) {
      i._audioUnlockCallback = e, i._audioUnlockCallbackContext = t
    }, i.unlockAudio = function () {
      i.game.input.touch.addTouchLockCallback(function () {
        if (this.noAudio || !this.touchLocked)return !0;
        if (this.usingWebAudio) {
          var e = this.context.createBuffer(1, 1, 22050), t = this.context.createBufferSource();
          t.buffer = e, t.connect(this.context.destination), void 0 === t.start ? t.noteOn(0) : t.start(0), "suspended" == t.context.state && t.context.resume()
        }
        return void 0 != i._audioUnlockCallback && i._audioUnlockCallback.call(i._audioUnlockCallbackContext), !0
      }, i.game.sound, !0)
    }, i.GAME_MAX_WIDTH = 640, i.GAME_MAX_HEIGHT = 1136, i.GAME_MIN_WIDTH = 640, i.GAME_MIN_HEIGHT = 946, i.FPS = 60, i.GAMEE = !0, i.DEBUG = !1, i.ATLAS_0 = "atlas0", i.ATLAS_1 = "atlas1", i.FONT_0 = "fnt0", i.FONT_1 = "fnt1", i.elapsedTime = 0, i.deltaRatio = 1, i.BALL_CNT = 17, i._selectedBall = null, i
  }();
  e.Global = i, window.onload = function () {
    i.init(new e.Game)
  }
}(Game || (Game = {}));
var Collections;
!function (e) {
  function t(t, i, a) {
    for (var n = a || e.defaultEquals, s = t.length, o = 0; s > o; o++)if (n(t[o], i))return o;
    return -1
  }

  function i(t, i, a) {
    for (var n = a || e.defaultEquals, s = t.length, o = s - 1; o >= 0; o--)if (n(t[o], i))return o;
    return -1
  }

  function a(e, i, a) {
    return t(e, i, a) >= 0
  }

  function n(e, i, a) {
    var n = t(e, i, a);
    return 0 > n ? !1 : (e.splice(n, 1), !0)
  }

  function s(t, i, a) {
    for (var n = a || e.defaultEquals, s = t.length, o = 0, l = 0; s > l; l++)n(t[l], i) && o++;
    return o
  }

  function o(t, i, a) {
    var n = a || e.defaultEquals;
    if (t.length !== i.length)return !1;
    for (var s = t.length, o = 0; s > o; o++)if (!n(t[o], i[o]))return !1;
    return !0
  }

  function l(e) {
    return e.concat()
  }

  function r(e, t, i) {
    if (0 > t || t >= e.length || 0 > i || i >= e.length)return !1;
    var a = e[t];
    return e[t] = e[i], e[i] = a, !0
  }

  function h(e) {
    return "[" + e.toString() + "]"
  }

  function c(e, t) {
    for (var i = 0, a = e; i < a.length; i++) {
      var n = a[i];
      if (t(n) === !1)return
    }
  }

  e.indexOf = t, e.lastIndexOf = i, e.contains = a, e.remove = n, e.frequency = s, e.equals = o, e.copy = l, e.swap = r, e.toString = h, e.forEach = c
}(Collections || (Collections = {}));
var Collections;
!function (e) {
  var t = function () {
    function t() {
      this.firstNode = null, this.lastNode = null, this.nElements = 0
    }

    return t.prototype.add = function (t, i) {
      if (e.isUndefined(i) && (i = this.nElements), 0 > i || i > this.nElements || e.isUndefined(t))return !1;
      var a = this.createNode(t);
      if (0 === this.nElements)this.firstNode = a, this.lastNode = a; else if (i === this.nElements)this.lastNode.next = a, this.lastNode = a; else if (0 === i)a.next = this.firstNode, this.firstNode = a; else {
        var n = this.nodeAtIndex(i - 1);
        a.next = n.next, n.next = a
      }
      return this.nElements++, !0
    }, Object.defineProperty(t.prototype, "first", {
      get: function () {
        return null !== this.firstNode ? this.firstNode.element : void 0
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "last", {
      get: function () {
        return null !== this.lastNode ? this.lastNode.element : void 0
      }, enumerable: !0, configurable: !0
    }), t.prototype.elementAtIndex = function (e) {
      var t = this.nodeAtIndex(e);
      return null === t ? void 0 : t.element
    }, t.prototype.indexOf = function (t, i) {
      var a = i || e.defaultEquals;
      if (e.isUndefined(t))return -1;
      for (var n = this.firstNode, s = 0; null !== n;) {
        if (a(n.element, t))return s;
        s++, n = n.next
      }
      return -1
    }, t.prototype.previous = function (t, i) {
      var a = i || e.defaultEquals;
      if (e.isUndefined(t))return null;
      for (var n = this.firstNode, s = null; null !== n;) {
        if (a(n.element, t))return null != s ? s.element : null;
        s = n, n = n.next
      }
      return null
    }, t.prototype.next = function (t, i) {
      var a = i || e.defaultEquals;
      if (e.isUndefined(t))return null;
      for (var n = this.firstNode; null !== n;) {
        if (a(n.element, t)) {
          var s = n.next;
          return void 0 != s && null != s ? s.element : null
        }
        n = n.next
      }
      return null
    }, t.prototype.contains = function (e, t) {
      return this.indexOf(e, t) >= 0
    }, t.prototype.remove = function (t, i) {
      var a = i || e.defaultEquals;
      if (this.nElements < 1 || e.isUndefined(t))return !1;
      for (var n = null, s = this.firstNode; null !== s;) {
        if (a(s.element, t))return s === this.firstNode ? (this.firstNode = this.firstNode.next, s === this.lastNode && (this.lastNode = null)) : s === this.lastNode ? (this.lastNode = n, n.next = s.next, s.next = null) : (n.next = s.next, s.next = null), this.nElements--, !0;
        n = s, s = s.next
      }
      return !1
    }, t.prototype.clear = function () {
      this.firstNode = null, this.lastNode = null, this.nElements = 0
    }, t.prototype.equals = function (i, a) {
      var n = a || e.defaultEquals;
      return i instanceof t ? this.size != i.size ? !1 : this.equalsAux(this.firstNode, i.firstNode, n) : !1
    }, t.prototype.equalsAux = function (e, t, i) {
      for (; null !== e;) {
        if (!i(e.element, t.element))return !1;
        e = e.next, t = t.next
      }
      return !0
    }, t.prototype.removeElementAtIndex = function (e) {
      if (0 > e || e >= this.nElements)return void 0;
      var t;
      if (1 === this.nElements)t = this.firstNode.element, this.firstNode = null, this.lastNode = null; else {
        var i = this.nodeAtIndex(e - 1);
        null === i ? (t = this.firstNode.element, this.firstNode = this.firstNode.next) : i.next === this.lastNode && (t = this.lastNode.element, this.lastNode = i), null !== i && (t = i.next.element, i.next = i.next.next)
      }
      return this.nElements--, t
    }, t.prototype.forEach = function (e, t) {
      for (var i = [], a = 2; a < arguments.length; a++)i[a - 2] = arguments[a];
      for (var n = this.firstNode; null !== n;) {
        var s = n.next;
        if (!e.call(t, n.element, i))break;
        n = s
      }
    }, t.prototype.reverse = function () {
      for (var e = null, t = this.firstNode, i = null; null !== t;)i = t.next, t.next = e, e = t, t = i;
      i = this.firstNode, this.firstNode = this.lastNode, this.lastNode = i
    }, t.prototype.toArray = function () {
      for (var e = [], t = this.firstNode; null !== t;)e.push(t.element), t = t.next;
      return e
    }, Object.defineProperty(t.prototype, "size", {
      get: function () {
        return this.nElements
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "isEmpty", {
      get: function () {
        return this.nElements <= 0
      }, enumerable: !0, configurable: !0
    }), t.prototype.toString = function () {
      return e.toString(this.toArray())
    }, t.prototype.nodeAtIndex = function (e) {
      if (0 > e || e >= this.nElements)return null;
      if (e === this.nElements - 1)return this.lastNode;
      for (var t = this.firstNode, i = 0; e > i; i++)t = t.next;
      return t
    }, t.prototype.createNode = function (e) {
      return {element: e, next: null}
    }, t
  }();
  e.LinkedList = t
}(Collections || (Collections = {}));
var Collections;
!function (e) {
  var t = function () {
    function e(e, t, i, a, n) {
      for (void 0 === t && (t = 0), void 0 === i && (i = !0), void 0 === a && (a = null), this._itemType = e, this._itemCreateFnc = a, this._itemCreateFncThis = n, this._canGrow = i, this._pool = [], this._count = 0; 0 != t--;)this._pool.push(this.newItem()), this._count++
    }

    return Object.defineProperty(e.prototype, "count", {
      get: function () {
        return this._count
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "canGrow", {
      get: function () {
        return this._canGrow
      }, enumerable: !0, configurable: !0
    }), e.prototype.getItem = function () {
      if (0 == this._count)return this._canGrow ? this.newItem() : null;
      var e = this._pool[--this._count];
      return this._pool[this._count] = null, e
    }, e.prototype.returnItem = function (e) {
      this._pool[this._count++] = e
    }, e.prototype.newItem = function () {
      return null != this._itemCreateFnc ? this._itemCreateFnc.call(this._itemCreateFncThis, this._count) : new this._itemType
    }, e
  }();
  e.Pool = t
}(Collections || (Collections = {}));
var Collections;
!function (e) {
  function t(e, t) {
    return t > e ? -1 : e === t ? 0 : 1
  }

  function i(e, t) {
    return e === t
  }

  function a(e) {
    return null === e ? "COLLECTION_NULL" : o(e) ? "COLLECTION_UNDEFINED" : l(e) ? "$s" + e : "$o" + e.toString()
  }

  function n(t, i) {
    if (void 0 === i && (i = ","), null === t)return "COLLECTION_NULL";
    if (o(t))return "COLLECTION_UNDEFINED";
    if (l(t))return t.toString();
    var a = "{", n = !0;
    for (var s in t)e.has(t, s) && (n ? n = !1 : a += i, a = a + s + ":" + t[s]);
    return a + "}"
  }

  function s(e) {
    return "function" == typeof e
  }

  function o(e) {
    return "undefined" == typeof e
  }

  function l(e) {
    return "[object String]" === Object.prototype.toString.call(e)
  }

  function r(e) {
    return s(e) ? function (t, i) {
      return -1 * e(t, i)
    } : function (e, t) {
      return t > e ? 1 : e === t ? 0 : -1
    }
  }

  function h(e) {
    return function (t, i) {
      return 0 === e(t, i)
    }
  }

  var c = Object.prototype.hasOwnProperty;
  e.has = function (e, t) {
    return c.call(e, t)
  }, e.defaultCompare = t, e.defaultEquals = i, e.defaultToString = a, e.makeString = n, e.isFunction = s, e.isUndefined = o, e.isString = l, e.reverseCompareFunction = r, e.compareToEquals = h
}(Collections || (Collections = {}));
var Collections;
!function (e) {
  var t = function () {
    function e() {
      this._array = [], this._firstItemId = 0, this._itemCnt = 0
    }

    return Object.defineProperty(e.prototype, "itemCnt", {
      get: function () {
        return this._itemCnt
      }, enumerable: !0, configurable: !0
    }), e.prototype.addItem = function (e, t) {
      void 0 === t && (t = !0), this.ensureSpaceForNewItem(t);
      var i;
      t ? i = this.itemId2ItemArrayPos(this._itemCnt) : (0 != this._itemCnt ? (i = this._firstItemId - 1, 0 > i && (i = this._array.length - 1)) : i = 0, this._firstItemId = i), this._array[i] = e, this._itemCnt++
    }, e.prototype.removeItem = function (e) {
      void 0 === e && (e = !0);
      var t = null;
      if (0 != this._itemCnt) {
        if (e) {
          var i = this.itemId2ItemArrayPos(this._itemCnt - 1);
          t = this._array[i], this._array[i] = null
        } else t = this._array[this._firstItemId], this._array[this._firstItemId] = null, ++this._firstItemId == this._array.length && (this._firstItemId = 0);
        this._itemCnt--
      }
      return t
    }, e.prototype.clear = function () {
      for (var e = this._itemCnt, t = this._firstItemId; 0 != e--;)this._array[t] = null, ++t == this._array.length && (t = 0);
      this._firstItemId = 0, this._itemCnt = 0
    }, e.prototype.getItemAtIndex = function (e) {
      return e >= this._itemCnt ? null : this._array[this.itemId2ItemArrayPos(e)]
    }, e.prototype.getLastItem = function () {
      return this.getItemAtIndex(this._itemCnt - 1)
    }, e.prototype.ensureSpaceForNewItem = function (e) {
      return this._itemCnt < this._array.length ? void 0 : 0 == this._itemCnt || (0 != this._firstItemId && (this._array = this.toArray(), this._firstItemId = 0), e) ? void this._array.push(null) : (this._array.unshift(null), void(this._firstItemId = 1))
    }, e.prototype.toArray = function () {
      for (var e = [], t = this._array, i = this._itemCnt, a = this._firstItemId; 0 != i--;)e.push(t[a]), ++a == this._array.length && (a = 0);
      return e
    }, e.prototype.itemId2ItemArrayPos = function (e) {
      return e += this._firstItemId, e >= this._array.length && (e -= this._array.length), e
    }, e
  }();
  e.WrappedArray = t
}(Collections || (Collections = {}));
var Controls;
!function (e) {
  var t = function () {
    function e(e) {
      this._enabled = !0, this._pressed = !1, this._onClick = new Phaser.Signal, this._container = e, e.inputEnabled = !0, e.events.onInputDown.add(this.inputDownClb, this), e.events.onInputUp.add(this.inputUpClb, this)
    }

    return Object.defineProperty(e.prototype, "container", {
      get: function () {
        return this._container
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "enabled", {
      get: function () {
        return this._enabled
      }, set: function (e) {
        this._enabled != e && (this._enabled = e, e ? this.enabledClb() : this.disabledClb())
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "pressed", {
      get: function () {
        return this._pressed
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function () {
        return this._container.x
      }, set: function (e) {
        this._container.x = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._container.y
      }, set: function (e) {
        this._container.y = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
      get: function () {
        return this._container.width
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      get: function () {
        return this._container.height
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "onClick", {
      get: function () {
        return this._onClick
      }, enumerable: !0, configurable: !0
    }), e.prototype.inputDownClb = function () {
      this._enabled && (this._pressed = !0, this.pressedClb())
    }, e.prototype.inputUpClb = function (e, t, i) {
      if (this._pressed) {
        this._pressed = !1;
        var a = !1;
        i && (a = !0, this._onClick.dispatch(this)), this.releasedClb(a)
      }
    }, e
  }();
  e.ButtonBase = t
}(Controls || (Controls = {}));
var Controls;
!function (e) {
  var t = function () {
    function e(e, t, i, a, n, s, o, l, r) {
      this._content = null, this._width = a, this._height = n, this._containerMask = new Phaser.Graphics(e), this._container = new Phaser.Group(e, r), this._container.position.set(t, i), this._container.mask = this._containerMask, this.createContainerMask(), this._itemHeight = s, this._itemPadding = o, this._itemType = l, this._actItems = new Collections.WrappedArray, this._inactItems = new Collections.Pool(void 0, 0, !0, this.createListBoxItem, this), this._scrolling = new Utils.KineticScrolling(e, !1, !0), this._scrolling.area = new Phaser.Rectangle(t, i, a, n), this._scrolling.onPosChange.add(this.scrollingPosChanged, this)
    }

    return Object.defineProperty(e.prototype, "items", {
      get: function () {
        return this._actItems
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function () {
        return this._container.x
      }, set: function (e) {
        this.setPosition(e, this._container.y)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._container.y
      }, set: function (e) {
        this.setPosition(this._container.x, e)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
      get: function () {
        return this._width
      }, set: function (e) {
        this._width != e && (this._width = e, this.createContainerMask(), this.updateScrollBarPosAndSize(), this._scrolling.area.width = e)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      get: function () {
        return this._height
      }, set: function (e) {
        this._height != e && (this._height = e, this.createContainerMask(), this.updateScrollBarPosAndSize(), this._scrolling.area.height = e, this.refill())
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "parent", {
      get: function () {
        return this._container.parent
      }, set: function (e) {
        e.addChild(this._container)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "content", {
      get: function () {
        return this._content
      }, set: function (e) {
        this._content = e, this.updateScrollBarPosAndSize(), this.fill()
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "contentHeight", {
      get: function () {
        return null == this._content ? 0 : this._content.length * (this._itemHeight + this._itemPadding) - this._itemPadding
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "viewOffset", {
      get: function () {
        return this._viewOffset
      }, enumerable: !0, configurable: !0
    }), e.prototype.destroy = function () {
      this._scrolling.destroy()
    }, e.prototype.update = function () {
      this._scrolling.update()
    }, e.prototype.setPosition = function (e, t) {
      this._container.position.set(e, t), this.createContainerMask(), this.updateScrollBarPosAndSize(), this._scrolling.area.x = e, this._scrolling.area.y = t
    }, e.prototype.moveView = function (e) {
      if (0 != this._actItems.itemCnt) {
        var t = this._viewOffset + e, i = this._itemHeight + this._itemPadding;
        if (0 > e)0 > t && (t = 0); else {
          var a = this._content.length * i - this._itemPadding;
          t + this._height > a && (t = Math.max(0, a - this._height))
        }
        if (Math.floor(this._viewOffset) != Math.floor(t)) {
          e = Math.floor(t) - Math.floor(this._viewOffset), this.setViewOffset(t);
          for (var n = this._actItems.itemCnt; 0 != n--;) {
            var s = this._actItems.getItemAtIndex(n).move(-e);
            e > 0 ? s <= -this._itemHeight && this._inactItems.returnItem(this._actItems.removeItem(!1).deactivate()) : s >= this._height && this._inactItems.returnItem(this._actItems.removeItem().deactivate())
          }
          if (0 != this._actItems.itemCnt)if (e > 0)for (var o = this._actItems.getLastItem(), l = o.y + i; l < this._height;) {
            var r = o.contentId + 1;
            o = this._inactItems.getItem(), o.activate(r, l, this._content[r]), this._actItems.addItem(o), l += i
          } else for (var o = this._actItems.getItemAtIndex(0), l = o.y - i; l > -this._itemHeight;) {
            var r = o.contentId - 1;
            o = this._inactItems.getItem(), o.activate(r, l, this._content[r]), this._actItems.addItem(o, !1), l -= i
          } else {
            n = Math.floor(t / i);
            for (var h = -(t % i); h < this._height;)this._actItems.addItem(this._inactItems.getItem().activate(n, h, this._content[n])), n++, h += i
          }
        }
      }
    }, e.prototype.createListBoxItem = function () {
      return new this._itemType(this._container)
    }, e.prototype.createContainerMask = function () {
      var e = this._containerMask;
      e.clear(), e.beginFill(0, 1), e.drawRect(this._container.x, this._container.y, this._width, this._height), e.endFill()
    }, e.prototype.setViewOffset = function (e) {
      this._viewOffset = e, this.updateScrollBarThumbPos()
    }, e.prototype.scrollingPosChanged = function (e, t) {
      this.moveView(-t)
    }, e.prototype.fill = function () {
      for (var e = this._actItems.itemCnt; 0 != e--;)this._inactItems.returnItem(this._actItems.getItemAtIndex(e).deactivate());
      if (this._actItems.clear(), null != this._content) {
        var t = this._content.length, i = 0;
        for (e = 0; t > e && i < this._height;) {
          var a = this._inactItems.getItem();
          a.activate(e, i, this._content[e]), this._actItems.addItem(a), e++, i += this._itemHeight + this._itemPadding
        }
      }
      this.setViewOffset(0)
    }, e.prototype.refill = function () {
      if (0 != this._actItems.itemCnt) {
        var e = this._itemHeight + this._itemPadding, t = this._actItems.getItemAtIndex(0), i = this._actItems.getLastItem(), a = i.contentId, n = Math.floor((Math.floor(this._viewOffset) + this._height - 1) / e);
        if (n != a)if (a > n)for (; n != a;)this._inactItems.returnItem(this._actItems.removeItem().deactivate()), a--; else {
          for (var s = this._content.length - 1, o = i.y + e; n > a && s > a;)a++, this._actItems.addItem(this._inactItems.getItem().activate(a, o, this._content[a])), o += e;
          if (a != n) {
            var l = -t.y;
            if (0 != t.contentId && (l += t.contentId * e), l > 0) {
              l = Math.min(l, this._height - (o - this._itemPadding));
              for (var r = this._actItems.itemCnt; 0 != r--;)this._actItems.getItemAtIndex(r).move(l);
              this.setViewOffset(Math.floor(this._viewOffset) - l);
              var h = t.y, c = t.contentId;
              h > this._itemPadding && (c--, h -= e, this._actItems.addItem(this._inactItems.getItem().activate(c, h, this._content[c]), !1))
            }
          }
        }
      }
    }, Object.defineProperty(e.prototype, "scrollBar", {
      get: function () {
        return this._scrollBar
      }, enumerable: !0, configurable: !0
    }), e.prototype.connectScrollBar = function (e, t) {
      this._scrollBar = e, this._scrollBarOffset = t, this.updateScrollBarPosAndSize(), this.updateScrollBarThumbPos()
    }, e.prototype.updateScrollBarPosAndSize = function () {
      var e = this._scrollBar;
      if (void 0 != e && null != e) {
        var t = Math.min(1, this._height / this.contentHeight);
        e.x = this.x + this.width + this._scrollBarOffset, e.y = this.y, e.height = this._height, e.thumbSize = t, e.visible = t > 0 && 1 > t
      }
    }, e.prototype.updateScrollBarThumbPos = function () {
      var e = this._scrollBar;
      if (void 0 != e && null != e) {
        var t = this.contentHeight;
        e.thumbPosition = 0 != t ? this._viewOffset / (t - this._height) : 0
      }
    }, e.SCROLLING_MAX_SPEED = 50, e
  }();
  e.ListBox = t
}(Controls || (Controls = {}));
var Controls;
!function (e) {
  var t = function () {
    function e(e, t) {
      this._container = new Phaser.Group(e, t), this._container.visible = !1, this._container.exists = !1
    }

    return Object.defineProperty(e.prototype, "contentId", {
      get: function () {
        return this._contentId
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "content", {
      get: function () {
        return this._content
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._container.y
      }, set: function (e) {
        this._container.y = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "enabled", {
      get: function () {
        return this._enabled
      }, set: function (e) {
        this._enabled != e && (this._enabled = e, this.enabledChangeClb(e))
      }, enumerable: !0, configurable: !0
    }), e.prototype.move = function (e) {
      return this._container.y += e, this._container.y
    }, e.prototype.activate = function (e, t, i) {
      return this._contentId = e, this.y = t, this._content = i, this._container.visible = !0, this._container.exists = !0, this
    }, e.prototype.deactivate = function () {
      return this._container.visible = !1, this._container.exists = !1, this
    }, e.prototype.enabledChangeClb = function (e) {
    }, e
  }();
  e.ListBoxItemBase = t
}(Controls || (Controls = {}));
var Controls;
!function (e) {
  var t = function () {
    function e(e, t, i) {
      this._container = e, this._vertical = i, this._width = i ? t : 0, this._height = i ? 0 : t, this._thumbPos = 0, this._thumbSize = 0
    }

    return Object.defineProperty(e.prototype, "vertical", {
      get: function () {
        return this._vertical
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function () {
        return this._container.x
      }, set: function (e) {
        this._container.x = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._container.y
      }, set: function (e) {
        this._container.y = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "width", {
      get: function () {
        return this._width
      }, set: function (e) {
        this._width = e, this.updateWidth(e)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "height", {
      get: function () {
        return this._height
      }, set: function (e) {
        this._height = e, this.updateHeight(e)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "visible", {
      get: function () {
        return this._container.visible
      }, set: function (e) {
        this._container.visible = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "thumbPosition", {
      get: function () {
        return this._thumbPos
      }, set: function (e) {
        0 > e ? e = 0 : e > 1 && (e = 1), this._thumbPos != e && (this._thumbPos = e, this.updateThumbPos())
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "thumbSize", {
      get: function () {
        return this._thumbSize
      }, set: function (e) {
        e > 1 && (e = 1), this._thumbSize = e, this.updateThumbSize()
      }, enumerable: !0, configurable: !0
    }), e.prototype.getThumbPosInPixels = function () {
      return this._vertical ? (this._height - this._thumbSize * this._height) * this._thumbPos : (this._width - this._thumbSize * this._width) * this._thumbPos
    }, e.prototype.validSettings = function () {
      return this._width > 0 && this._height > 0 && this._thumbSize > 0
    }, e
  }();
  e.ScrollBarBase = t
}(Controls || (Controls = {}));
var Game;
!function (e) {
  var t = function () {
    function e() {
    }

    return e
  }();
  e.GameResults = t
}(Game || (Game = {}));
var Playfield;
!function (e) {
  var t = function () {
    function e() {
      this._image = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0, "sparkle"), this._image.anchor.set(.5)
    }

    return e.prototype.show = function (e, t) {
      this._ball = e, this._timer = Game.Global.elapsedTime;
      var i = Game.Global.game.rnd;
      this._distance = i.realInRange(.1, .9), this._dir = i.realInRange(0, 359.9), this._angle = i.realInRange(0, 89.9), t.add(this._image, !0)
    }, e.prototype.update = function () {
      var t = (Game.Global.elapsedTime - this._timer) / e.LIFE_SPAN;
      if (t >= 1)return !1;
      this._image.angle = this._angle + 90 * t;
      var i = this._ball.scale, a = .1 * i, n = 1 * i;
      .5 > t ? t /= .5 : t = 1 - (t - .5) / .5, this._image.scale.set(a + Phaser.Easing.Linear.None(t) * (n - a)), this._image.alpha = t;
      var s = this._ball.radius * this._distance, o = Phaser.Math.degToRad(this._dir + this._ball.angle);
      return this._image.position.set(Math.cos(o) * s, Math.sin(o) * s), !0
    }, e.prototype.kill = function () {
      this._image.parent.remove(this._image, !1, !0)
    }, e.LIFE_SPAN = 1e3, e
  }();
  e.BallSpark = t
}(Playfield || (Playfield = {}));
var BallFireFx;
!function (e) {
  var t = function () {
    function e() {
      this._image = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0, "fireFxTail"), this._image.anchor.set(.5)
    }

    return e.prototype.show = function (e, t, i, a) {
      this._image.position.copyFrom(e), this._image.scale.set(t), this._image.alpha = 1, i.add(this._image, !0, a), this._timer = Game.Global.elapsedTime, this._startScale = t, this._startY = e.y
    }, e.prototype.update = function () {
      var t = (Game.Global.elapsedTime - this._timer) / e.LIFE_SPAN;
      if (t >= 1)return !1;
      var i = Phaser.Easing.Cubic.Out(t), a = 2 * this._startScale;
      return this._image.scale.set(a - a * i), this._image.alpha = .75 - .75 * i, !0
    }, e.prototype.kill = function () {
      this._image.parent.removeChild(this._image)
    }, e.LIFE_SPAN = 750, e
  }();
  e.TailParticle = t
}(BallFireFx || (BallFireFx = {}));
var __extends = this && this.__extends || function (e, t) {
    function i() {
      this.constructor = e
    }

    for (var a in t)t.hasOwnProperty(a) && (e[a] = t[a]);
    e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
  }, Playfield;
!function (e) {
  var t = function (e) {
    function t(t) {
      var i = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "giftBoxSmall", t);
      i.anchor.set(.5), e.call(this, i), i.kill()
    }

    return __extends(t, e), t.prototype.show = function () {
      Game.Global.game.tweens.removeFrom(this._container), this.updatePosition(), this._container.revive(), this._timer = Game.Global.elapsedTime, this.enabled = !0
    }, t.prototype.hide = function () {
      this.enabled = !1, Game.Global.game.add.tween(this._container).to({x: Game.Global.GAME_MAX_WIDTH + Math.round(this._container.width * this._container.anchor.x)}, 750, Phaser.Easing.Cubic.In, !0).onComplete.add(function () {
        this._container.kill()
      }, this)
    }, t.prototype.update = function () {
      if (this.pressed)this._timer = Game.Global.elapsedTime; else {
        var e = (Game.Global.elapsedTime - this._timer) % 750;
        this._container.scale.set(1.2 - .2 * Phaser.Easing.Elastic.Out(e / 750))
      }
    }, t.prototype.updatePosition = function () {
      var e = Game.Global.game.camera;
      this._container.position.set(e.x + e.width - t.X_OFFSET, e.y + e.height - t.Y_OFFSET)
    }, t.prototype.enabledClb = function () {
    }, t.prototype.disabledClb = function () {
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t.X_OFFSET = 80, t.Y_OFFSET = 100, t
  }(Controls.ButtonBase);
  e.GiftButton = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function (e) {
    function t(t) {
      var i = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "btnMenu", t);
      i.anchor.y = .5, e.call(this, i), this._noticeIcon = Game.Global.game.add.image(100, -58, Game.Global.ATLAS_0, "noticeIcon"), this._noticeIcon.anchor.set(.5), this._noticeIcon.kill(), i.addChild(this._noticeIcon), this._container.kill()
    }

    return __extends(t, e), t.prototype.show = function () {
      Game.Global.game.tweens.removeFrom(this._container), this.updatePosition(), this._container.revive(), 0 == Game.Global.saveData.newBallNoticeMask && Game.Global.dailyGift.locked ? this._noticeIcon.kill() : this._noticeIcon.revive(), this.enabled = !0
    }, t.prototype.hide = function () {
      this.enabled = !1, Game.Global.game.add.tween(this._container).to({x: -this._container.width}, 750, Phaser.Easing.Cubic.In, !0).onComplete.add(function () {
        this._container.kill()
      }, this)
    }, t.prototype.updatePosition = function () {
      var e = Game.Global.game.camera;
      this._container.position.set(e.x, e.y + t.Y_OFFSET)
    }, t.prototype.enabledClb = function () {
    }, t.prototype.disabledClb = function () {
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t.Y_OFFSET = 260, t
  }(Controls.ButtonBase);
  e.MenuButton = t
}(Playfield || (Playfield = {}));
var Game;
!function (e) {
  var t = function () {
    function t() {
      var t = this._layer = new Phaser.Group(e.Global.game);
      this._newBestScoreMsg = e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "msgNewBestScore", t), this._newBestScoreMsg.anchor.x = .5, this._resultMsg = e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "msgYouWin", t), this._resultMsg.anchor.x = .5, this._resultsBox = e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "resultsBox", t), this._resultsBox.anchor.x = .5;
      var i = e.Global.game.add.group(this._resultsBox);
      this._resultsBox.addChild(i), this._scoreBonusMsg = e.Global.game.add.bitmapText(0, 0, e.Global.FONT_0, "", 28, i), this._coinsMsg = e.Global.game.add.group(i), e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "coinIcon", this._coinsMsg), this._coinsVal = e.Global.game.add.bitmapText(this._coinsMsg.width + 10, 0, e.Global.FONT_0, "0", 28, this._coinsMsg), this._coinsVal.y = (this._coinsMsg.height - this._coinsVal.height) / 2;
      var a = e.Global.game.add.emitter(0, this._resultsBox.height / 2, 10);
      a.setXSpeed(-400, 400), a.setYSpeed(-900, -700), a.setAlpha(1, .5, 2e3), a.setScale(1, 2, 1, 2, 2e3), a.gravity = 1500, a.makeParticles(e.Global.ATLAS_0, "coinIcon", a.maxParticles, !1, !1), a.width = 100, this._coinEmitter = a, this._resultsBox.addChild(a)
    }

    return t.prototype.show = function (t) {
      var i = 0;
      if (t.newBestScore ? (this._newBestScoreMsg.visible = !0, i += this._newBestScoreMsg.height + 10) : this._newBestScoreMsg.visible = !1, this._resultMsg.frameName = t.aiScore < t.playerScore ? "msgYouWin" : t.aiScore > t.playerScore ? "msgYouLose" : "msgItsADraw",
          this._resultMsg.y = i, i += this._resultMsg.height + 20, 0 != t.coins || 0 != t.playerBonusScore) {
        this._resultsBox.visible = !0, this._resultsBox.y = i, i = 0, 0 != t.playerBonusScore && (this._scoreBonusMsg.text = e.Global.getText(e.eTextAsset.bonus) + " +" + t.playerBonusScore, i += this._scoreBonusMsg.height + 10), this._coinsMsg.y = i, this._coinsVal.text = "+" + t.coins;
        var a = this._coinsMsg.parent;
        a.position.set(-a.width / 2, (this._resultsBox.height - a.height) / 2)
      } else this._resultsBox.visible = !1;
      var n = e.Global.game.camera;
      this._layer.position.set(n.x + n.width / 2, n.y + (n.height - this._layer.height) / 2), e.Global.game.world.addChild(this._layer), t.playerScore >= t.aiScore && this._coinEmitter.explode(2e3, this._coinEmitter.maxParticles), e.Global.game.time.events.add(3e3, function () {
        15 == e.Global.saveData.totalGames ? e.Play.instance.showBiniBallUnlockMsg() : e.Play.instance.endGame()
      }, this)
    }, t.prototype.hide = function () {
      null != this._layer.parent && this._layer.parent.removeChild(this._layer)
    }, t
  }();
  e.ResultsPanel = t
}(Game || (Game = {}));
var Windows;
!function (e) {
  var t = function () {
    function e() {
      this._layer = new Phaser.Group(Game.Global.game), this._layer.visible = this._layer.exists = !1, Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "card", this._layer), new Game.TextButton(this._layer.width / 2, 216, Game.Global.FONT_0, 42, Game.Global.getText(Game.eTextAsset.ok), this._layer).onClick.add(this.okButtonClickClb, this), this._onClose = new Phaser.Signal
    }

    return Object.defineProperty(e.prototype, "onClose", {
      get: function () {
        return this._onClose
      }, enumerable: !0, configurable: !0
    }), e.prototype.show = function () {
      this._layer.visible = this._layer.exists = !0, this.updatePosition()
    }, e.prototype.hide = function () {
      this._layer.visible = this._layer.exists = !1
    }, e.prototype.updatePosition = function () {
      var e = Game.Global.game.camera;
      this._layer.position.set(e.x + (e.width - this._layer.width) / 2, e.y + (e.height - this._layer.height) / 2)
    }, e.prototype.okButtonClickClb = function () {
      Utils.AudioUtils.playSound("click"), this._onClose.dispatch()
    }, e.TITLE_FONT_SIZE = 36, e.MESSAGE_FONT_SIZE = 28, e
  }();
  e.WindowBase = t
}(Windows || (Windows = {}));
var Windows;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this);
      var i = Game.Global.game;
      i.add.bitmapText(176, 22, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.thankYou), e.WindowBase.TITLE_FONT_SIZE, this._layer);
      var a = Game.Global.game.add.image(83, 158, Game.Global.ATLAS_0, "ballShadow", this._layer);
      a.anchor.set(.5), a.scale.set(.6), i.add.image(8, 8, Game.Global.ATLAS_0, "ball_16", this._layer).scale.set(.6), i.add.bitmapText(184, 90, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.biniBallUnlocked), e.WindowBase.MESSAGE_FONT_SIZE, this._layer).tint = 9474192
    }

    return __extends(i, t), i
  }(e.WindowBase);
  e.BiniBallUnlocked = t
}(Windows || (Windows = {}));
var Windows;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this);
      var a = Game.Global.game;
      a.add.image(10, -10, Game.Global.ATLAS_0, "biniIcon", this._layer).scale.set(1.1, 1.1);
      var n = a.add.group(this._layer);
      a.add.bitmapText(0, 0, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.greatWork), e.WindowBase.TITLE_FONT_SIZE, n).anchor.set(0, .5), a.add.image(n.width + 20, 0, Game.Global.ATLAS_0, "coinIcon", n).anchor.set(0, .5), a.add.bitmapText(n.width + 10, 0, Game.Global.FONT_0, "+" + i.PRIZE, e.WindowBase.TITLE_FONT_SIZE, n).anchor.set(0, .5), n.position.set(140, 36);
      var s = a.add.bitmapText(this._layer.width / 2, 90, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.beginnersCourtUnlocked), e.WindowBase.MESSAGE_FONT_SIZE, this._layer);
      s.anchor.set(.5, 0), s.tint = 9474192
    }

    return __extends(i, t), i.NORMAL_FONT_SIZE = 42, i.PRIZE = 10, i
  }(e.WindowBase);
  e.TrainingCompleted = t
}(Windows || (Windows = {}));
var PopupMessage;
!function (e) {
  var t = function () {
    function e() {
      this._active = !1
    }

    return Object.defineProperty(e.prototype, "startY", {
      get: function () {
        return this._startY
      }, enumerable: !0, configurable: !0
    }), e.prototype.update = function (e) {
      if (!this._active)return !1;
      var t = e - this._timer;
      return this._type.updateMessage(t, this) ? !0 : (this._active = !1, !1)
    }, e.prototype.showMessage = function (e, t, i, a) {
      var n = this.getMsgContainer();
      n.x = e, n.y = t, n.alpha = 1, this._timer = a, this._startY = t, this._type = i, this._active = !0
    }, e.prototype.kill = function () {
      this._active = !1
    }, e
  }();
  e.MessageBase = t
}(PopupMessage || (PopupMessage = {}));
var PopupMessage;
!function (e) {
  var t = function () {
    function e(e, t, i, a, n, s) {
      this._moveDistance = e, this._moveTime = t, this._moveEase = i, this._alphaDelay = a, this._alphaTime = n, this._alphaEase = s
    }

    return Object.defineProperty(e.prototype, "moveDistance", {
      get: function () {
        return this._moveDistance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "moveTime", {
      get: function () {
        return this._moveTime
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "moveEase", {
      get: function () {
        return this._moveEase
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "alphaDelay", {
      get: function () {
        return this._alphaDelay
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "alphaTime", {
      get: function () {
        return this._alphaTime
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "alphaEase", {
      get: function () {
        return this._alphaEase
      }, enumerable: !0, configurable: !0
    }), e.prototype.updateMessage = function (e, t) {
      var i = 0, a = t.getMsgContainer(), n = e / this._moveTime;
      return n >= 1 && (n = 1, i |= 1), a.y = t.startY - this._moveEase(n) * this._moveDistance, e > this._alphaDelay && (n = (e - this._alphaDelay) / this._alphaTime, n >= 1 && (n = 1, i |= 2), a.alpha = 1 - this._alphaEase(n)), 3 == i ? !1 : !0
    }, e
  }();
  e.MessageType = t
}(PopupMessage || (PopupMessage = {}));
var SlideMessage;
!function (e) {
  !function (e) {
    e[e.completed = 0] = "completed", e[e.slideIn = 1] = "slideIn", e[e.slideOutDelay = 2] = "slideOutDelay", e[e.slideOut = 3] = "slideOut"
  }(e.eMessageState || (e.eMessageState = {}));
  var t = e.eMessageState, i = function () {
    function e() {
      this._state = t.completed, this._onStateChange = new Phaser.Signal
    }

    return Object.defineProperty(e.prototype, "state", {
      get: function () {
        return this._state
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "onStateChange", {
      get: function () {
        return this._onStateChange
      }, enumerable: !0, configurable: !0
    }), e.prototype.update = function (e) {
      if (this._state == t.completed)return !1;
      var i = e - this._timer, a = this._type.updateMessage(i, this);
      return a != this._state && (this._state = a, this.onStateChange.dispatch(a)), this._state != t.completed
    }, e.prototype.kill = function () {
      this._state = t.completed
    }, e.prototype.showMessage = function (e, i, a) {
      this._type = i, this._timer = a, this._state = t.slideIn;
      var n = this.getMsgContainer();
      n.y = e, n.x = i.getMessageStartX(this), n.alpha = i.slideInAlphaStart, this.onStateChange.dispatch(t.slideIn)
    }, e
  }();
  e.MessageBase = i
}(SlideMessage || (SlideMessage = {}));
var SlideMessage;
!function (e) {
  var t = function () {
    function t(e, t, i, a, n, s, o, l, r, h, c) {
      this._game = e, this._dir = t, this._slideInTime = i, this._slideInEase = a, this._slideInAlphaStart = n, this._slideInAlphaEase = void 0 == s || null == s ? a : s, this._slideOutTime = o, this._slideOutDelay = l, this._slideOutEase = r, this._slideOutAlphaEnd = h, this._slideOutAlphaEase = void 0 == c || null == c ? r : c
    }

    return Object.defineProperty(t.prototype, "slideDir", {
      get: function () {
        return this._dir
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideInTime", {
      get: function () {
        return this._slideInTime
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideInEase", {
      get: function () {
        return this._slideInEase
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideInAlphaStart", {
      get: function () {
        return this._slideInAlphaStart
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideInAlphaEase", {
      get: function () {
        return this._slideInAlphaEase
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideOutTime", {
      get: function () {
        return this._slideOutTime
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideOutDelay", {
      get: function () {
        return this._slideOutDelay
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideOutEase", {
      get: function () {
        return this._slideOutEase
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideOutAlphaEnd", {
      get: function () {
        return this._slideOutAlphaEnd
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "slideOutAlphaEase", {
      get: function () {
        return this._slideOutAlphaEase
      }, enumerable: !0, configurable: !0
    }), t.prototype.getMessageStartX = function (e) {
      var t = this._game.camera;
      return this._dir < 0 ? t.x + t.width : t.x - e.getMsgContainer().width
    }, t.prototype.updateMessage = function (t, i) {
      var a = i.getMsgContainer(), n = i.state, s = this._game.camera;
      switch (n) {
        case e.eMessageState.slideIn:
          var o = t / this._slideInTime;
          o >= 1 && (o = 1, n = e.eMessageState.slideOutDelay), 1 != this._slideInAlphaStart && (a.alpha = this._slideInAlphaStart + this._slideInAlphaEase(o) * (1 - this._slideInAlphaStart));
          var l = this.getMessageStartX(i), r = s.x + (s.width - a.width) / 2;
          a.x = l + this._slideInEase(o) * (r - l);
          break;
        case e.eMessageState.slideOutDelay:
          if (t - this._slideInTime < this._slideOutDelay) {
            a.x = s.x + (s.width - a.width) / 2;
            break
          }
          n = e.eMessageState.slideOut;
        case e.eMessageState.slideOut:
          var o = (t - this._slideInTime - this._slideOutDelay) / this._slideOutTime;
          o >= 1 && (o = 1, n = e.eMessageState.completed);
          var r = s.x + (s.width - a.width) / 2, h = this._dir < 0 ? s.x - a.width : s.x + s.width;
          a.x = r + (h - r) * this._slideOutEase(o), 1 != this._slideOutAlphaEnd && (a.alpha = 1 - (1 - this._slideOutAlphaEnd) * this._slideOutAlphaEase(o))
      }
      return n
    }, t
  }();
  e.MessageType = t
}(SlideMessage || (SlideMessage = {}));
var BallSelection;
!function (e) {
  var t = function (t) {
    function i(a) {
      t.call(this, Game.Global.game, a), void 0 == i._getBallUnlockProgressFnc && (i._getBallUnlockProgressFnc = [], i._getBallUnlockProgressFnc[1] = i.getBallUnlockProgress1, i._getBallUnlockProgressFnc[2] = i.getBallUnlockProgress2, i._getBallUnlockProgressFnc[3] = i.getBallUnlockProgress3, i._getBallUnlockProgressFnc[4] = i.getBallUnlockProgress4, i._getBallUnlockProgressFnc[5] = i.getBallUnlockProgress5, i._getBallUnlockProgressFnc[6] = i.getBallUnlockProgress6, i._getBallUnlockProgressFnc[7] = i.getBallUnlockProgress7, i._getBallUnlockProgressFnc[16] = i.getBallUnlockProgress16), this._bg = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "card", this._container), this._iconShadow = Game.Global.game.add.image(i.ICON_SHADOW_X, i.ICON_SHADOW_Y, Game.Global.ATLAS_0, "ballShadow", this._container), this._iconShadow.anchor.set(.5), this._iconShadow.scale.set(.6), this._icon = Game.Global.game.add.image(i.ICON_X, i.ICON_Y, Game.Global.ATLAS_0, "ball_0", this._container), this._icon.scale.set(.6), this._name = Game.Global.game.add.bitmapText(i.NAME_X, i.NAME_Y, Game.Global.FONT_0, "", i.NAME_FONT_SIZE, this._container), this._button = new e.BallLsbItemBtn(i.BTN_X, i.BTN_Y, this._container), this._button.onClick.add(this.buttonClickClb, this), this._description = Game.Global.game.add.bitmapText(i.DESCRIPTION_X, i.DESCRIPTION_Y, Game.Global.FONT_0, "", i.DESCRIPTION_FONT_SIZE, this._container), this._description.tint = 9474192, this._unlockProgress = Game.Global.game.add.bitmapText(0, i.UNLOCK_PROGRESS_Y, Game.Global.FONT_0, "", 24, this._container), this._newBallNotice = Game.Global.game.add.image(i.NOTICE_ICON_X, i.NOTICE_ICON_Y, Game.Global.ATLAS_0, "noticeIcon", this._container), this._newBallNotice.anchor.set(.5)
    }

    return __extends(i, t), i.prototype.activate = function (e, a, n) {
      t.prototype.activate.call(this, e, a, n);
      var s = n;
      if (this.enabled = !s.locked || s.price > 0 && s.price <= Game.Global.coins, this._icon.frameName = s.iconKey, this._name.text = s.name, this._button.content = s, this._description.text = s.description, this._newBallNotice.visible = !1, s.selected && Game.Global.onSelectedBallChange.addOnce(this.selectedBallChangeClb, this), s.locked)if (s.price > 0)Game.Global.onCoinsChange.add(this.coinsChangeClb, this), this._unlockProgress.kill(); else {
        this._unlockProgress.text = "";
        var o = i._getBallUnlockProgressFnc[s.id];
        void 0 != o && (this._unlockProgress.text = o()), this._unlockProgress.position.x = 580 - i.UNLOCK_PROGRESS_X - this._unlockProgress.width, this._unlockProgress.revive()
      } else this._unlockProgress.kill(), 0 == s.price && s.justUnlocked && (this._newBallNotice.visible = !0);
      return this
    }, i.prototype.deactivate = function () {
      t.prototype.deactivate.call(this);
      var e = this._content;
      return e.selected && Game.Global.onSelectedBallChange.remove(this.selectedBallChangeClb, this), e.locked && e.price > 0 && Game.Global.onCoinsChange.remove(this.coinsChangeClb, this), this
    }, i.prototype.buttonClickClb = function () {
      var e = this._content;
      e.locked ? e.price > 0 && e.price <= Game.Global.coins && (Game.Global.onCoinsChange.remove(this.coinsChangeClb, this), e.unlock(), this._button.updateContent(), Utils.AudioUtils.playSound("payment")) : (Game.Global.selectedBall = e, Game.Global.onSelectedBallChange.addOnce(this.selectedBallChangeClb, this), this._button.updateContent(), Utils.AudioUtils.playSound("click")), Game.Global.GAMEE && Gamee2.Gamee.gameSave()
    }, i.prototype.selectedBallChangeClb = function () {
      this._button.updateContent()
    }, i.prototype.coinsChangeClb = function (e) {
      var t = this._content;
      this.enabled = t.price <= e
    }, i.prototype.enabledChangeClb = function (e) {
      this._bg.frameName = e ? "card" : "cardLocked", this._button.enabled = e
    }, i.getBallUnlockProgress1 = function () {
      return Game.Global.courts[1].wins.toString() + "/10"
    }, i.getBallUnlockProgress2 = function () {
      return Game.Global.courts[1].winsInRow.toString() + "/3"
    }, i.getBallUnlockProgress3 = function () {
      return Game.Global.courts[1].games.toString() + "/50"
    }, i.getBallUnlockProgress4 = function () {
      return Game.Global.totalScore.toString() + "/1000"
    }, i.getBallUnlockProgress5 = function () {
      return Game.Global.courts[1].highScore.toString() + "/35"
    }, i.getBallUnlockProgress6 = function () {
      return Game.Global.courts[2].wins.toString() + "/10"
    }, i.getBallUnlockProgress7 = function () {
      return Game.Global.courts[2].winsInRow.toString() + "/3"
    }, i.getBallUnlockProgress16 = function () {
      return Game.Global.saveData.totalGames.toString() + "/15"
    }, i.ICON_X = 16, i.ICON_Y = 16, i.ICON_SHADOW_X = 91, i.ICON_SHADOW_Y = 166, i.NAME_X = 176, i.NAME_Y = 20, i.NAME_FONT_SIZE = 36, i.BTN_X = 290, i.BTN_Y = 218, i.DESCRIPTION_X = 184, i.DESCRIPTION_Y = 90, i.DESCRIPTION_FONT_SIZE = 28, i.UNLOCK_PROGRESS_X = 20, i.UNLOCK_PROGRESS_Y = 26, i.NOTICE_ICON_X = 91, i.NOTICE_ICON_Y = 166, i
  }(Controls.ListBoxItemBase);
  e.BallLsbItem = t
}(BallSelection || (BallSelection = {}));
var BallSelection;
!function (e) {
  var t = function (e) {
    function t(i, a, n) {
      var s = Game.Global.game.add.image(i, a, Game.Global.ATLAS_0, t.NORMAL_FRAME_NAME, n);
      s.anchor.set(.5), e.call(this, s), this._caption = new Phaser.BitmapText(Game.Global.game, 0, 0, Game.Global.FONT_0, "", t.CAPTION_FONT_SIZE), this._caption.anchor.set(.5, .4), s.addChild(this._caption), this._priceIcon = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0, "coinIcon"), this._priceIcon.anchor.set(0, .5), s.addChild(this._priceIcon), this._price = new Phaser.BitmapText(Game.Global.game, 0, 0, Game.Global.FONT_0, "", t.CAPTION_FONT_SIZE), this._price.anchor.set(0, .4), s.addChild(this._price)
    }

    return __extends(t, e), Object.defineProperty(t.prototype, "content", {
      get: function () {
        return this._content
      }, set: function (e) {
        this._content = e, this.updateContent()
      }, enumerable: !0, configurable: !0
    }), t.prototype.updateContent = function () {
      var e = this._content;
      e.locked ? e.price > 0 ? (this._price.text = e.price.toString(), this._priceIcon.x = -(this._priceIcon.width + 10 + this._price.width) / 2, this._price.x = this._priceIcon.x + this._priceIcon.width + 10, this._caption.visible = !1, this._priceIcon.visible = this._price.visible = !0, this.enabled = e.price <= Game.Global.coins) : (this._caption.text = Game.Global.getText(Game.eTextAsset.locked), this._caption.visible = !0, this._priceIcon.visible = this._price.visible = !1, this.enabled = !1) : (e.selected ? (this._caption.text = Game.Global.getText(Game.eTextAsset.selected), this.enabled = !1, this._container.frameName = t.SELECTED_FRAME_NAME) : (this._caption.text = Game.Global.getText(Game.eTextAsset.use), this.enabled = !0), this._caption.visible = !0, this._priceIcon.visible = this._price.visible = !1), this.enabled || e.selected || this._container.frameName != t.SELECTED_FRAME_NAME || (this._container.frameName = t.DISABLED_FRAME_NAME)
    }, t.prototype.enabledClb = function () {
      this._container.frameName = t.NORMAL_FRAME_NAME
    }, t.prototype.disabledClb = function () {
      this._container.frameName = t.DISABLED_FRAME_NAME
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t.NORMAL_FRAME_NAME = "buttonLgGreen", t.SELECTED_FRAME_NAME = "buttonLgYellow", t.DISABLED_FRAME_NAME = "buttonLgDisabled", t.CAPTION_FONT_SIZE = 42, t
  }(Controls.ButtonBase);
  e.BallLsbItemBtn = t
}(BallSelection || (BallSelection = {}));
var CourtSelection;
!function (e) {
  var t = function (e) {
    function t(t, i, a) {
      var n = Game.Global.game.add.image(t, i, Game.Global.ATLAS_0, "buttonSmGreen", a);
      n.anchor.set(.5), e.call(this, n);
      var s = new Phaser.BitmapText(Game.Global.game, 0, 0, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.balls), 34);
      s.anchor.set(.5), n.addChild(s);
      var o = new Phaser.Image(Game.Global.game, 60, -46, Game.Global.ATLAS_0, "noticeIcon");
      o.visible = 0 != Game.Global.saveData.newBallNoticeMask, n.addChild(o)
    }

    return __extends(t, e), t.prototype.enabledClb = function () {
    }, t.prototype.disabledClb = function () {
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t
  }(Controls.ButtonBase);
  e.BallsButton = t
}(CourtSelection || (CourtSelection = {}));
var CourtSelection;
!function (e) {
  var t = function (e) {
    function t(i, a, n) {
      var s = Game.Global.game.add.image(i, a, Game.Global.ATLAS_0, t.NORMAL_FRAME_NAME, n);
      s.anchor.set(.5), e.call(this, s), s.addChild(new Phaser.Image(Game.Global.game, 58, -74, Game.Global.ATLAS_0, "giftBoxSmall")), s.addChild(new Phaser.BitmapText(Game.Global.game, -156, -48, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.giftBtnTitle), t.TITLE_FONT_SIZE)), this._message = new Phaser.BitmapText(Game.Global.game, -156, -10, Game.Global.FONT_0, "", t.TEXT_FONT_SIZE), s.addChild(this._message), this._noticeIcon = Game.Global.game.add.image(140, -58, Game.Global.ATLAS_0, "noticeIcon"), this._noticeIcon.anchor.set(.5), s.addChild(this._noticeIcon)
    }

    return __extends(t, e), Object.defineProperty(t.prototype, "content", {
      get: function () {
        return this._content
      }, set: function (e) {
        this._content = e, this.updateGiftLockState(e.locked)
      }, enumerable: !0, configurable: !0
    }), t.prototype.update = function () {
      this._content.locked != this._giftLocked ? this.updateGiftLockState(!this._giftLocked) : this._giftLocked && this.updateGiftUnlockTime()
    }, t.prototype.updateGiftLockState = function (e) {
      this._giftLocked = e, e ? (this.enabled = !1, this._giftUnlockTime = -1e3, this.updateGiftUnlockTime(), this._noticeIcon.kill()) : (this.enabled = !0, this._message.text = Game.Global.getText(Game.eTextAsset.openNow), this._noticeIcon.revive())
    }, t.prototype.updateGiftUnlockTime = function () {
      var e = this._content.timeToUnlock;
      if (!(Math.abs(this._giftUnlockTime - e) < 1e3)) {
        this._giftUnlockTime = e;
        var t, i = Math.floor(e / 36e5);
        t = 10 > i ? "0" + i : i.toString(), t += ":";
        var a = e % 36e5;
        i = Math.floor(a / 6e4), t += 10 > i ? "0" + i : i.toString(), t += ":", i = Math.floor(a % 6e4 / 1e3), t += 10 > i ? "0" + i : i.toString(), this._message.text = t
      }
    }, t.prototype.enabledClb = function () {
      this._container.frameName = t.NORMAL_FRAME_NAME
    }, t.prototype.disabledClb = function () {
      this._container.frameName = t.DISABLED_FRAME_NAME
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t.NORMAL_FRAME_NAME = "giftCard", t.DISABLED_FRAME_NAME = "giftCardLocked", t.TITLE_FONT_SIZE = 34, t.TEXT_FONT_SIZE = 28, t
  }(Controls.ButtonBase);
  e.GiftButton = t
}(CourtSelection || (CourtSelection = {}));
var CourtSelection;
!function (e) {
  var t = function (t) {
    function i(a) {
      t.call(this, Game.Global.game, a), this._bg = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "card", this._container), this._icon = Game.Global.game.add.image(i.ICON_X, i.ICON_Y, Game.Global.ATLAS_0, "courtIcon_0", this._container), this._title = Game.Global.game.add.bitmapText(i.TITLE_X, i.TITLE_Y, Game.Global.FONT_0, "", i.TITLE_FONT_SIZE, this._container), this._playBtn = new e.CourtLsbItemBtn(i.PLAY_BTN_X, i.PLAY_BTN_Y, this._container), this._playBtn.onClick.add(this.playButtonClickClb, this), this._prizeGroup = Game.Global.game.add.group(this._container), this._prizeGroup.position.set(i.TEXT_X, i.PRIZE_Y);
      var n = Game.Global.game.add.bitmapText(0, 0, Game.Global.FONT_0, Game.Global.getText(Game.eTextAsset.prize), i.TEXT_FONT_SIZE, this._prizeGroup);
      n.tint = 0;
      var s = Game.Global.game.add.image(n.width + 10, n.height / 2, Game.Global.ATLAS_0, "coinIcon", this._prizeGroup);
      s.anchor.set(0, .5), this._prize = Game.Global.game.add.bitmapText(this._prizeGroup.width + 10, 0, Game.Global.FONT_0, "", i.TEXT_FONT_SIZE, this._prizeGroup), this._prize.tint = 0, this._highscore = Game.Global.game.add.bitmapText(i.TEXT_X, i.HIGHSCORE_Y, Game.Global.FONT_0, "", i.TEXT_FONT_SIZE, this._container), this._highscore.tint = 0, this._infoMessage = Game.Global.game.add.bitmapText(i.TEXT_X, i.INFO_MESSAGE_Y, Game.Global.FONT_0, "", i.TEXT_FONT_SIZE, this._container), this._infoMessage.tint = 9474192
    }

    return __extends(i, t), i.prototype.activate = function (e, i, a) {
      t.prototype.activate.call(this, e, i, a);
      var n = a;
      return this._icon.frameName = n.iconKey, this._title.text = n.title, this._playBtn.content = n, n.locked ? (this._bg.frameName = "cardLocked", this._prizeGroup.visible = !1, this._highscore.visible = !1, this._infoMessage.text = n.lockedMessage, this._infoMessage.visible = !0) : (this._bg.frameName = "card", n.prize > 0 ? (this._prizeGroup.visible = !0, this._prize.text = "+" + n.prize, this._infoMessage.visible = !1) : (this._prizeGroup.visible = !1, this._infoMessage.text = n.description, this._infoMessage.visible = !0), this._highscore.text = Game.Global.getText(Game.eTextAsset.bestScore1) + " " + n.highScore, this._highscore.visible = !0), this
    }, i.prototype.playButtonClickClb = function () {
      Game.Global.selectedCourt = this._content, Game.Global.GAMEE && Gamee2.Gamee.gameSave(), Utils.AudioUtils.playSound("click"), Game.Global.game.state.start("Play")
    }, i.ICON_X = 16, i.ICON_Y = 16, i.TITLE_X = 176, i.TITLE_Y = 20, i.TITLE_FONT_SIZE = 36, i.PLAY_BTN_X = 290, i.PLAY_BTN_Y = 218, i.TEXT_FONT_SIZE = 28, i.TEXT_X = 184, i.PRIZE_Y = 90, i.HIGHSCORE_Y = 130, i.INFO_MESSAGE_Y = 90, i
  }(Controls.ListBoxItemBase);
  e.CourtLsbItem = t
}(CourtSelection || (CourtSelection = {}));
var CourtSelection;
!function (e) {
  var t = function (e) {
    function t(i, a, n) {
      var s = Game.Global.game.add.image(i, a, Game.Global.ATLAS_0, t.NORMAL_FRAME_NAME, n);
      s.anchor.set(.5), e.call(this, s), this._caption = new Phaser.BitmapText(Game.Global.game, 0, 0, Game.Global.FONT_0, "", 42), this._caption.anchor.set(.5, .4), s.addChild(this._caption)
    }

    return __extends(t, e), Object.defineProperty(t.prototype, "content", {
      get: function () {
        return this._content
      }, set: function (e) {
        this._content = e, e.locked ? (this.enabled = !1, this._caption.text = Game.Global.getText(Game.eTextAsset.locked)) : (this.enabled = !0, this._caption.text = Game.Global.getText(Game.eTextAsset.play))
      }, enumerable: !0, configurable: !0
    }), t.prototype.enabledClb = function () {
      this._container.frameName = t.NORMAL_FRAME_NAME
    }, t.prototype.disabledClb = function () {
      this._container.frameName = t.DISABLED_FRAME_NAME
    }, t.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, t.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, t.NORMAL_FRAME_NAME = "buttonLgGreen", t.DISABLED_FRAME_NAME = "buttonLgDisabled", t
  }(Controls.ButtonBase);
  e.CourtLsbItemBtn = t
}(CourtSelection || (CourtSelection = {}));
var Playfield;
!function (e) {
  var t = function (e) {
    function t() {
      e.call(this, 150, 1e3, Phaser.Easing.Cubic.Out, 900, 500, Phaser.Easing.Linear.None)
    }

    return __extends(t, e), t.prototype.updateMessage = function (t, i) {
      return 750 > t ? i.getMsgContainer().scale.set(1.3 - .3 * Phaser.Easing.Elastic.Out(t / 750)) : i.getMsgContainer().scale.set(1), e.prototype.updateMessage.call(this, t, i)
    }, t
  }(PopupMessage.MessageType);
  e.PopupMessageType = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this), this._msgContainer = new Phaser.Group(Game.Global.game), Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "timeIcon", this._msgContainer).anchor.y = .5, this._timeValue = Game.Global.game.add.bitmapText(this._msgContainer.width + 5, 0, Game.Global.FONT_1, "", 30, this._msgContainer), this._timeValue.anchor.y = .4
    }

    return __extends(i, t), i.prototype.getMsgContainer = function () {
      return this._msgContainer
    }, i.prototype.show = function (i, a, n, s) {
      this._timeValue.text = "+" + n, e.Playfield.instance.fxLayer.add(this._msgContainer, !0), t.prototype.showMessage.call(this, i - this._msgContainer.width / 2, a, s, Game.Global.elapsedTime)
    }, i.prototype.update = function () {
      return t.prototype.update.call(this, Game.Global.elapsedTime)
    }, i.prototype.kill = function () {
      t.prototype.kill.call(this), this._msgContainer.parent.removeChild(this._msgContainer)
    }, i
  }(PopupMessage.MessageBase);
  e.TimeBonusMessage = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this), this._msgContainer = new Phaser.Group(Game.Global.game), this._msgPart1 = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "msgPlus_2", this._msgContainer), this._msgPart2 = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "msgPoints", this._msgContainer)
    }

    return __extends(i, t), i.prototype.getMsgContainer = function () {
      return this._msgContainer
    }, i.prototype.show = function (i, a, n, s) {
      this._msgPart1.frameName = n;
      var o = this._msgPart1.width + 10 + this._msgPart2.width;
      this._msgPart1.x = -(o / 2), this._msgPart2.x = this._msgPart1.x + this._msgPart1.width + 10;
      var l = o / 2, r = Game.Global.game.camera;
      i - l < r.x ? i = l : i + l > r.x + r.width && (i = r.x + r.width - l), e.Playfield.instance.fxLayer.add(this._msgContainer, !0), t.prototype.showMessage.call(this, i, a, s, Game.Global.elapsedTime)
    }, i.prototype.update = function () {
      return t.prototype.update.call(this, Game.Global.elapsedTime)
    }, i.prototype.kill = function () {
      t.prototype.kill.call(this), this._msgContainer.parent.removeChild(this._msgContainer)
    }, i
  }(PopupMessage.MessageBase);
  e.PointsMessage = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this), void 0 == i._type && (i._type = new SlideMessage.MessageType(Game.Global.game, -1, 750, Phaser.Easing.Elastic.Out, 0, Phaser.Easing.Cubic.Out, 500, 750, Phaser.Easing.Cubic.In, 0, Phaser.Easing.Linear.None)), this._msgContainer = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0), this._msgContainer.anchor.set(0, .5)
    }

    return __extends(i, t), i.prototype.getMsgContainer = function () {
      return this._msgContainer
    }, i.prototype.show = function (a, n) {
      this._msgContainer.frameName = n, e.Playfield.instance.fxLayer.add(this._msgContainer, !0), t.prototype.showMessage.call(this, a, i._type, Game.Global.elapsedTime)
    }, i.prototype.update = function () {
      return t.prototype.update.call(this, Game.Global.elapsedTime)
    }, i.prototype.kill = function () {
      null != this._msgContainer.parent && (this._msgContainer.parent.removeChild(this._msgContainer), t.prototype.kill.call(this))
    }, i
  }(SlideMessage.MessageBase);
  e.InfoMessage = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function () {
    function e() {
    }

    return e.prototype.onBallFloorHit = function (e) {
      return !0
    }, e.prototype.onBallOutOfScreen = function (e) {
      return !0
    }, e
  }();
  e.BallController = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function () {
    function e(e, t, i) {
      this._time = e, this._offsetX = t, this._offsetY = i
    }

    return Object.defineProperty(e.prototype, "time", {
      get: function () {
        return this._time
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "offsetX", {
      get: function () {
        return this._offsetX
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "offsetY", {
      get: function () {
        return this._offsetY
      }, enumerable: !0, configurable: !0
    }), e
  }(), i = function () {
    function e() {
    }

    return e
  }(), a = function () {
    function i(i, a, n, s, o) {
      for (var l, r = 250, h = e.Backboard.MIN_Y, c = e.Backboard.MAX_Y, u = 0, _ = 0, d = n / r, p = 0, m = 1e3 / r, f = o / r, g = []; ;) {
        if (l = s / r, u += d, _ += l, s += f, l > 0 && _ >= h && (g.push(new t(p, u, _)), _ > c))break;
        p += m
      }
      this._ballPhySimData = g, this._angle = i - 90, this._posCorrection = a
    }

    return i.prototype.setupLaunchData = function (t) {
      for (var i = Game.Global.elapsedTime + this._ballPhySimData[this._ballPhySimData.length - 1].time + 500, a = e.Backboard.instance.getPosInTime(i), n = a.y + e.Backboard.BASKET_VOFFSET, s = null, o = this._ballPhySimData.length; 0 != o--;)if (s = this._ballPhySimData[o], s.offsetY <= n && o != this._ballPhySimData.length - 1) {
        var l = n - s.offsetY, r = this._ballPhySimData[o + 1].offsetY - n;
        l > r && (s = this._ballPhySimData[o + 1]);
        break
      }
      var h = Game.Global.game.rnd.realInRange(0, 99) < Game.Global.selectedCourt.aiSuccessRate;
      if (Game.Global.game.rnd.realInRange(0, 1) < .5 && a.x + s.offsetX - this._posCorrection <= Game.Global.GAME_MAX_WIDTH / 2 + e.Ball.START_X_MAX_OFFSET || a.x - s.offsetX + this._posCorrection < Game.Global.GAME_MAX_WIDTH / 2 - e.Ball.START_X_MAX_OFFSET ? (t.angle = 90 - this._angle, t.pos = a.x + s.offsetX - this._posCorrection) : (t.angle = 90 + this._angle, t.pos = a.x - s.offsetX + this._posCorrection), !h) {
        var c = Game.Global.game.rnd.realInRange(90, 120);
        Game.Global.game.rnd.realInRange(0, 1) < .5 && (c *= -1), t.pos += c
      }
      t.time = i - s.time
    }, i
  }(), n = function (t) {
    function n() {
      t.call(this), this._launchData = new i
    }

    return __extends(n, t), n.prototype.ai = function () {
      return !0
    }, n.prototype.reset = function () {
      this._launchDataSet = !1, this._playfieldState = e.ePlayfieldState.waitForStart
    }, n.prototype.update = function (t) {
      if (this._playfieldState != e.ePlayfieldState.game && t == e.ePlayfieldState.game && (this._launchData.time = Game.Global.elapsedTime + (13 != Game.Global.selectedBall.id ? 1e3 : 5e3)), this._playfieldState = t, t == e.ePlayfieldState.game && 0 != e.HUD.instance.time && Game.Global.elapsedTime >= this._launchData.time)if (this._launchDataSet) {
        var i = e.BallManager.instance.activateBall();
        i.show(this, !1, !1, this._launchData.pos), i.launch(this._launchData.angle), this._launchData.time = Game.Global.elapsedTime + Math.round(Game.Global.selectedCourt.aiShotInterval * Game.Global.game.rnd.realInRange(.7, 1.1)), this._launchDataSet = !1
      } else n._shotData[Game.Global.game.rnd.integerInRange(0, n._shotData.length - 1)].setupLaunchData(this._launchData), this._launchDataSet = !0
    }, n.prototype.onBallSuccessfulShot = function (t) {
      var i = e.HUD.instance;
      i.aiScore += t.hitBasketHoop ? 2 : 3
    }, n.initShots = function () {
      n._shotData = [], n._shotData.push(new a(90, 0, 0, -2e3, 4e3)), n._shotData.push(new a(93, 40, 121.57310485839844, -2319.7531127929688, 4e3)), n._shotData.push(new a(96, 90, 243.7038230895996, -2318.686981201172, 4e3))
    }, n
  }(e.BallController);
  e.AI = n
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this), i._instance = this, this._roundBalls = [];
      for (var e = 0; e < i.MAX_BALLS_PER_ROUND; e++)this._roundBalls.push(null);
      this._aim = new Utils.DragAim(Game.Global.game, 150, 0, !0, 20, 20), this._aim.onAimed.add(this.launchBall, this)
    }

    return __extends(i, t), Object.defineProperty(i, "instance", {
      get: function () {
        return i._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "roundRemBallCnt", {
      get: function () {
        return this._roundRemBallCnt
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "activeBallCnt", {
      get: function () {
        return this._actBallCnt
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "successfulShots", {
      get: function () {
        return this._successfulShots
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "ballLaunched", {
      get: function () {
        return this._ballLaunched
      }, enumerable: !0, configurable: !0
    }), i.prototype.ai = function () {
      return !1
    }, i.prototype.reset = function () {
      this._ballLaunched = !1, this._successfulShots = 0, this._actBallCnt = 0, this.startRound()
    }, i.prototype.update = function (t) {
      this._ballLaunched = !1, t != e.ePlayfieldState.gameOver && 0 != this._roundRemBallCnt && this._aim.update()
    }, i.prototype.startRound = function () {
      var t = e.BallManager.instance, a = e.FireBallBar.instance.fireBallActive, n = e.PowerUpManager.instance.actPowerUp;
      a && Utils.AudioUtils.playSound("fireBall1"), n == e.ePowerUp.multiBall ? (this._roundBalls[1] = t.activateBall().show(this, a, !1, Game.Global.GAME_MAX_WIDTH / 2 - i.MULTI_BALL_SPACING, 1, !0), this._roundBalls[2] = t.activateBall().show(this, a, !1, Game.Global.GAME_MAX_WIDTH / 2 + i.MULTI_BALL_SPACING, 2, !0), this._roundBalls[0] = t.activateBall().show(this, a, !1, Game.Global.GAME_MAX_WIDTH / 2, 0, !0), this._roundRemBallCnt = i.MAX_BALLS_PER_ROUND) : (this._roundBalls[0] = t.activateBall().show(this, a, n == e.ePowerUp.smallBall, e.Playfield.instance.state == e.ePlayfieldState.waitForStart ? Game.Global.GAME_MAX_WIDTH / 2 : void 0), this._roundRemBallCnt = 1), this._actBallCnt += this._roundRemBallCnt, this._aim.reset()
    }, i.prototype.launchBall = function (t, a, n, s) {
      if (0 != this._roundRemBallCnt && 0 != e.HUD.instance.time) {
        this._ballLaunched = !0;
        var o;
        if (this._roundRemBallCnt > 1)if (null != s && void 0 != s.sprite && void 0 != s.sprite._ball)o = s.sprite._ball.id; else {
          var l = void 0, r = null;
          for (o = 0; o < i.MAX_BALLS_PER_ROUND; o++) {
            var h = this._roundBalls[o];
            if (null != h) {
              var c = Math.abs(h.position.x - t.x);
              if (c < h.radius) {
                l = h;
                break
              }
              (null == r || r > c) && (r = c, l = h)
            }
          }
          o = l.id
        } else for (o = 0; o < i.MAX_BALLS_PER_ROUND && null == this._roundBalls[o]; o++);
        var u = 90 + (90 - -a);
        u = 90 + i.AIM_ROUNDING * Math.round((u - 90) / i.AIM_ROUNDING),
          this._roundBalls[o].launch(u), this._roundBalls[o] = null, this._roundRemBallCnt--, Utils.AudioUtils.playSound("shoot")
      }
    }, i.prototype.onBallSuccessfulShot = function (t) {
      var i = e.Playfield.instance;
      i.emitStars(t.position.x, t.position.y, e.eStarEmitter.both), i.scorePoints(t), this._successfulShots++
    }, i.prototype.onBallFloorHit = function (e) {
      var t, i = e.floorHitId;
      return t = 0 == i ? 1 : 3 >= i ? 1 - .25 * i : 0, 0 != t && Utils.AudioUtils.playSound("bounceFloor", t), e.active ? (this._actBallCnt--, !1) : !0
    }, i.prototype.onBallOutOfScreen = function (e) {
      return e.active ? (this._actBallCnt--, !1) : !0
    }, i.AIM_ROUNDING = 2, i.MAX_BALLS_PER_ROUND = 3, i.MULTI_BALL_SPACING = 160, i
  }(e.BallController);
  e.Player = t
}(Playfield || (Playfield = {}));
var BallFireFx;
!function (e) {
  var t = function () {
    function e() {
      this._image = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0, "fireFxSpot"), this._image.anchor.set(.5)
    }

    return e.prototype.show = function (e, t) {
      this._ball = e, this._timer = Game.Global.elapsedTime;
      var i = Game.Global.game.rnd;
      this._distance = i.realInRange(.1, .9), this._dir = i.realInRange(0, 359.9), t.add(this._image, !0)
    }, e.prototype.update = function () {
      var t = (Game.Global.elapsedTime - this._timer) / e.LIFE_SPAN;
      if (t >= 1)return !1;
      var i = this._ball.scale, a = e.START_SCALE * i, n = e.END_SCALE * i;
      this._image.scale.set(a + (n - a) * Phaser.Easing.Cubic.Out(t)), this._image.alpha = (1 - Phaser.Easing.Linear.None(t)) * this._ball.alpha;
      var s = this._ball.radius * this._distance, o = Phaser.Math.degToRad(this._dir + this._ball.angle);
      return this._image.position.set(Math.cos(o) * s, Math.sin(o) * s), !0
    }, e.prototype.kill = function () {
      this._image.parent.remove(this._image, !1, !0)
    }, e.LIFE_SPAN = 1e3, e.START_SCALE = 1, e.END_SCALE = 4, e
  }();
  e.Spot = t
}(BallFireFx || (BallFireFx = {}));
var BallFireFx;
!function (e) {
  var t = function () {
    function e() {
      this._image = new Phaser.Image(Game.Global.game, 0, 0, Game.Global.ATLAS_0, "fireFxRing"), this._image.anchor.set(.5)
    }

    return e.prototype.show = function (t, i) {
      this._ball = t, this._image.scale.set(e.START_SCALE * t.scale), this._image.alpha = 1, this._image.revive(), i.add(this._image), this._timer = Game.Global.elapsedTime
    }, e.prototype.update = function () {
      var t = (Game.Global.elapsedTime - this._timer) / e.LIFE_SPAN;
      if (t >= 1)return !1;
      var i = this._ball.scale, a = e.START_SCALE * i, n = e.END_SCALE * i;
      return this._image.scale.set(a + (n - a) * Phaser.Easing.Quadratic.Out(t)), this._image.alpha = (1 - Phaser.Easing.Cubic.Out(t)) * this._ball.alpha, !0
    }, e.prototype.kill = function () {
      this._image.parent.remove(this._image, !1, !0)
    }, e.START_SCALE = 1, e.END_SCALE = 1.5, e.LIFE_SPAN = 750, e
  }();
  e.Ring = t
}(BallFireFx || (BallFireFx = {}));
var Playfield;
!function (e) {
  !function (e) {
    e[e.singlePlayer = 0] = "singlePlayer", e[e.vsAI = 1] = "vsAI"
  }(e.eHUDMode || (e.eHUDMode = {}));
  var t = e.eHUDMode, i = function () {
    function i() {
      i._instance = this, this._layer = Game.Global.game.add.group(), this._layer.fixedToCamera = !0, this._layer.cameraOffset.set(0, 0), this._bg = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "HUD_0", this._layer), this._scoreTxt = Game.Global.game.add.bitmapText(0, i.SCORE_Y, Game.Global.FONT_0, "", 42, this._layer), this._scoreTxt.anchor.set(.5), this._aiScoreTxt = Game.Global.game.add.bitmapText(i.AI_SCORE_X, i.SCORE_Y, Game.Global.FONT_0, "", 42, this._layer), this._aiScoreTxt.anchor.set(.5), this._timeTxt = Game.Global.game.add.bitmapText(0, i.TIME_Y, Game.Global.FONT_0, "", 42, this._layer), this._timeTxt.anchor.set(.5)
    }

    return Object.defineProperty(i, "instance", {
      get: function () {
        return i._instance
      }, enumerable: !0, configurable: !0
    }), i.prototype.reset = function (e) {
      this._mode = e, this.resetScore(), this.resetTime();
      var t = "HUD_" + e;
      this._bg.frameName != t && (this._bg.frameName = t)
    }, i.prototype.update = function (t) {
      if (t == e.ePlayfieldState.game) {
        var i = this.seconds;
        this.time -= Game.Global.deltaRatio;
        var a = this.seconds;
        i != a && 5 >= a && (Utils.AudioUtils.playSound(0 != a ? "tick" : "siren"), 0 == a && e.Playfield.instance.timeOut())
      }
    }, Object.defineProperty(i.prototype, "score", {
      get: function () {
        return this._score
      }, set: function (e) {
        var t = e - this._score;
        0 != t && (this._score = e, this._scoreTxt.text = e.toString(), Game.Global.totalScore += t, Game.Global.GAMEE && (Gamee2.Gamee.score = e))
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "aiScore", {
      get: function () {
        return this._aiScore
      }, set: function (e) {
        this._aiScore = e, this._aiScoreTxt.text = e.toString()
      }, enumerable: !0, configurable: !0
    }), i.prototype.resetScore = function () {
      this._score = 0, this._scoreTxt.text = this._score.toString(), this.aiScore = 0, this._mode == t.singlePlayer ? (this._scoreTxt.position.x = i.SCORE_X_0, this._aiScoreTxt.kill()) : (this._aiScoreTxt.revive(), this._scoreTxt.position.x = i.SCORE_X_1)
    }, Object.defineProperty(i.prototype, "time", {
      get: function () {
        return this._time
      }, set: function (e) {
        0 > e && (e = 0);
        var t = Math.ceil(e / Game.Global.FPS);
        t != Math.ceil(this._time / Game.Global.FPS) && (10 > t ? this._timeTxt.text = "0" + t : this._timeTxt.text = t.toString()), this._time = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "seconds", {
      get: function () {
        return Math.ceil(this._time / Game.Global.FPS)
      }, enumerable: !0, configurable: !0
    }), i.prototype.resetTime = function () {
      this._time = 0, this.time = 0 == Game.Global.selectedCourt.id ? i.TUTORIAL_TIME : i.GAME_TIME, this._timeTxt.x = this._mode == t.singlePlayer ? i.TIME_X_0 : i.TIME_X_1
    }, i.prototype.addTime = function (e) {
      this.time += e * Game.Global.FPS
    }, i.SCORE_X_0 = 275, i.SCORE_X_1 = 161, i.SCORE_Y = 79, i.AI_SCORE_X = 480, i.GAME_TIME = 60 * Game.Global.FPS, i.TUTORIAL_TIME = 30 * Game.Global.FPS, i.TIME_X_0 = 460, i.TIME_X_1 = 346, i.TIME_Y = 79, i
  }();
  e.HUD = i
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  !function (e) {
    e[e.multiBall = 0] = "multiBall", e[e.smallBall = 1] = "smallBall", e[e.none = 2] = "none"
  }(e.ePowerUp || (e.ePowerUp = {}));
  var t = e.ePowerUp, i = function () {
    function i() {
      i._instance = this, this._sprite = Game.Global.game.add.sprite(0, 0, Game.Global.ATLAS_0, "powerUp_0", e.Backboard.instance.middleLayer)
    }

    return Object.defineProperty(i, "instance", {
      get: function () {
        return i._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "actPowerUp", {
      get: function () {
        return this._actPowerUp
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "phyColGroup", {
      get: function () {
        return this._phyColGroup
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "phyBodyId", {
      get: function () {
        return this._sprite.body.id
      }, enumerable: !0, configurable: !0
    }), i.prototype.setupPhysics = function () {
      var t = Game.Global.game.physics.p2;
      t.enable(this._sprite, Game.Global.DEBUG), this._phyColGroup = t.createCollisionGroup();
      var i = this._sprite.body;
      i["static"] = !0, i.setCircle(33).sensor = !0, i.setCollisionGroup(this._phyColGroup), i.collides(e.BallManager.instance.ballCollisionGroup)
    }, i.prototype.reset = function () {
      this._hideTweens = [], this._hideTweens.push(Game.Global.game.add.tween(this._sprite).to({alpha: 0}, 1e3, Phaser.Easing.Cubic.In, !1)), this._hideTweens.push(Game.Global.game.add.tween(this._sprite.scale).to({
        x: 1.5,
        y: 1.5
      }, 1e3, Phaser.Easing.Cubic.Out, !1)), this._hideTweens[0].onComplete.add(function () {
        this._sprite.kill()
      }, this), this._actPowerUp = t.none, this._spritePowerUp = t.none, this._sprite.kill(), 0 != Game.Global.selectedCourt.id ? 10 != Game.Global.selectedBall.id ? this._nextPowerUpTime = Game.Global.game.rnd.integerInRange(25e3, 35e3) : this._nextPowerUpTime = Game.Global.game.rnd.integerInRange(16e3, 24e3) : this._nextPowerUpTime = 0
    }, i.prototype.startRound = function () {
      if (this._spritePowerUp != t.none && this.hidePowerUp(!1), this._actPowerUp == t.none && this._nextPowerUpTime > 0 && Game.Global.elapsedTime >= this._nextPowerUpTime && !this._sprite.visible) {
        var i = Game.Global.game.rnd;
        this._spritePowerUp = i.integerInRange(0, 1);
        var a = e.Backboard.instance.getPosInTime(Game.Global.elapsedTime + i.integerInRange(3e3, 6e3));
        a.y > e.Backboard.MIN_Y && (a.y = i.integerInRange(e.Backboard.MIN_Y, a.y)), a.y -= 20, this._sprite.revive(), this._sprite.frameName = "powerUp_" + this._spritePowerUp.toString(), this._sprite.body.reset(a.x, a.y), this._nextPowerUpTime = 0, 10 == Game.Global.selectedBall.id && Game.Global.elapsedTime < 35e3 && (this._nextPowerUpTime = i.integerInRange(36e3, 44e3))
      }
    }, i.prototype.hidePowerUp = function (i) {
      if (this._spritePowerUp != t.none) {
        if (i) {
          Utils.AudioUtils.playSound("powerUp"), this._actPowerUp = this._spritePowerUp, e.Playfield.instance.showInfoMessage("msgPowerUp" + this._actPowerUp);
          var a = 1e4;
          10 == Game.Global.selectedBall.id && (a *= 2), Game.Global.game.time.events.add(a, this.deactivatePowerUp, this)
        }
        for (var n = this._hideTweens.length; 0 != n--;)this._hideTweens[n].start();
        this._spritePowerUp = t.none
      }
    }, i.prototype.deactivatePowerUp = function () {
      this._actPowerUp = t.none
    }, i
  }();
  e.PowerUpManager = i
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function () {
    function e() {
      var t = Game.Global.game;
      this._layer = t.add.group(), this._layer.position.set(Game.Global.GAME_MAX_WIDTH / 2, 600), t.add.image(0, 50, Game.Global.ATLAS_0, "arrow", this._layer).anchor.set(.5, 0), this._hand = t.add.image(0, e.MOVE_DISTANCE, Game.Global.ATLAS_0, "hand", this._layer), this._hand.anchor.set(.01), this._layer.visible = this._layer.exists = !1
    }

    return e.prototype.show = function () {
      if (!this._layer.visible) {
        var t = Game.Global.game;
        this._moveTween = t.add.tween(this._hand).to({y: 0}, 1e3, Phaser.Easing.Quadratic.Out, !0), this._moveTween.onComplete.add(function () {
          this._moveRestartEvent = t.time.events.add(200, function () {
            this._hand.y = e.MOVE_DISTANCE, this._moveTween.start()
          }, this)
        }, this), this._layer.visible = this._layer.exists = !0
      }
    }, e.prototype.hide = function () {
      this._layer.visible && (this._layer.visible = this._layer.exists = !1, this._moveTween.stop(!1), void 0 != this._moveRestartEvent && Game.Global.game.time.events.remove(this._moveRestartEvent))
    }, e.MOVE_DISTANCE = 300, e
  }();
  e.Tutorial = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  !function (e) {
    e[e.both = 0] = "both"
  }(e.eStarEmitter || (e.eStarEmitter = {}));
  var t = e.eStarEmitter;
  !function (e) {
    e[e.game = 0] = "game", e[e.waitForStart = 1] = "waitForStart", e[e.gameOver = 2] = "gameOver"
  }(e.ePlayfieldState || (e.ePlayfieldState = {}));
  var i = e.ePlayfieldState, a = function () {
    function a() {
      a._instance = this, this._bg = Game.Global.game.add.sprite(Game.Global.GAME_MAX_WIDTH / 2, Game.Global.GAME_MAX_HEIGHT / 2, Game.Global.ATLAS_1, "bg_" + Game.Global.selectedCourt.id), this._bg.anchor.set(.5), this._bg.name = "playfield";
      var t = Game.Global.game.physics.p2;
      this._phyColGroup = t.createCollisionGroup(), this._backboard = new e.Backboard, this._powerUp = new e.PowerUpManager, this._balls = new e.BallManager, this._player = new e.Player, 0 != Game.Global.selectedCourt.id && (this._ai = new e.AI), this._hud = new e.HUD, this._fireBallBar = new e.FireBallBar, this._fireBallBar.onFireBallStart.add(function () {
        this.showInfoMessage("msgFire")
      }, this), this._fxLayer = Game.Global.game.add.group(), this.initMessages(), this.initStarEmitters(), this._menuButton = null, this._giftButton = null, Game.Global.saveData.trainingCompleted && (this._menuButton = new e.MenuButton, this._menuButton.onClick.add(function () {
        Utils.AudioUtils.playSound("click"), Game.Global.game.state.start("CourtSelection")
      }, this), Game.Global.dailyGift.locked || (this._giftButton = new e.GiftButton, this._giftButton.onClick.add(function () {
        Utils.AudioUtils.playSound("click"), Game.Global.game.state.start("DailyGift", !0, !1, "Play")
      }, this))), this._tutorial = 0 == Game.Global.selectedCourt.id ? new e.Tutorial : null, this.setupPhysics(), Game.Play.instance.onResize.add(this.resize, this)
    }

    return Object.defineProperty(a, "instance", {
      get: function () {
        return a._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "state", {
      get: function () {
        return this._state
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "backboard", {
      get: function () {
        return this._backboard
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "balls", {
      get: function () {
        return this._balls
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "player", {
      get: function () {
        return this._player
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "hud", {
      get: function () {
        return this._hud
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "fxLayer", {
      get: function () {
        return this._fxLayer
      }, enumerable: !0, configurable: !0
    }), a.prototype.reset = function () {
      this._state = i.waitForStart, null != this._tutorial && this._tutorial.show(), this._fireBallBar.reset(), this._powerUp.reset(), this._hud.reset(0 == Game.Global.selectedCourt.id ? e.eHUDMode.singlePlayer : e.eHUDMode.vsAI), this.resetMessages(), this._backboard.reset(), this._balls.reset(), this._player.reset(), 0 != Game.Global.selectedCourt.id && this._ai.reset(), null != this._menuButton && this._menuButton.show(), null != this._giftButton && this._giftButton.show(), this._timeOutTime = 0
    }, a.prototype.update = function () {
      var e = this._state;
      this._backboard.update(), this._balls.update(), this._player.update(e), e == i.game ? 0 == this._timeOutTime ? 0 == this._player.activeBallCnt && (this._player.startRound(), this._powerUp.startRound()) : 0 == this._hud.time ? Game.Global.elapsedTime - this._timeOutTime >= 2e3 && this._player.activeBallCnt - this._player.roundRemBallCnt == 0 && (this._state = i.gameOver, Game.Play.instance.gameOver(this._hud.score, this._hud.aiScore)) : this._timeOutTime = 0 : e == i.waitForStart && (this._player.ballLaunched ? (null != this._tutorial && this._tutorial.hide(), null != this._menuButton && this._menuButton.hide(), null != this._giftButton && this._giftButton.hide(), this._state = i.game) : null != this._giftButton && this._giftButton.update()), 0 != Game.Global.selectedCourt.id && this._ai.update(e), this._fireBallBar.update(e), this._hud.update(e), this._pointsMessages.updateObjects(), this._timeBnsMessages.updateObjects(), this._infoMessage.update()
    }, a.prototype.resize = function (e, t) {
      var i = Game.Global.game.camera;
      i.y = Game.Global.GAME_MAX_HEIGHT - Math.max(994, t), i.update(), null != this._menuButton && this._menuButton.updatePosition(), null != this._giftButton && this._giftButton.updatePosition()
    }, a.prototype.scorePoints = function (e) {
      var t, i = e.position.y;
      e.hitBasketHoop ? (t = 2, Utils.AudioUtils.playSound("successfulShot")) : (t = 3, this.showInfoMessage("msgPerfectShot"), Utils.AudioUtils.playSound("perfectShot")), e.fireBall && (t *= this._fireBallBar.multiplier), this._hud.score += t;
      this._fireBallBar.fireBallActive;
      this._fireBallBar.incValue(.25);
      var a = 0;
      0 == Game.Global.selectedCourt.id || e.hitBasketHoop || (a += Game.Global.selectedBall.timeBonus), 0 != a && (this._hud.addTime(a), i -= 25, this._timeBnsMessages.activateObject().show(e.position.x, i, a, this._popupMsgType), i += 50), this._pointsMessages.activateObject().show(e.position.x, i, "msgPlus" + t, this._popupMsgType)
    }, a.prototype.timeOut = function () {
      this._timeOutTime = Game.Global.elapsedTime
    }, a.prototype.showInfoMessage = function (e) {
      this._infoMessage.state == SlideMessage.eMessageState.completed ? this._infoMessage.show(a.INFO_MSG_Y, e) : this._infoMessageStack.add(e)
    }, a.prototype.initMessages = function () {
      this._popupMsgType = new e.PopupMessageType, this._pointsMessages = new Utils.GameObjectCollection(e.PointsMessage), this._timeBnsMessages = new Utils.GameObjectCollection(e.TimeBonusMessage), this._infoMessage = new e.InfoMessage, this._infoMessage.onStateChange.add(this.onInfoMessageStateChange, this), this._infoMessageStack = new Collections.LinkedList
    }, a.prototype.resetMessages = function () {
      this._pointsMessages.reset(), this._timeBnsMessages.reset(), this._infoMessage.kill(), this._infoMessageStack.clear()
    }, a.prototype.onInfoMessageStateChange = function (e) {
      e == SlideMessage.eMessageState.completed && (this._infoMessageStack.isEmpty || (this._infoMessage.show(a.INFO_MSG_Y, this._infoMessageStack.elementAtIndex(0)), this._infoMessageStack.removeElementAtIndex(0)))
    }, a.prototype.emitStars = function (e, t, i) {
      var a = this._starEmitters[i];
      a.position.set(e, t), a.explode(2e3, 10)
    }, a.prototype.initStarEmitters = function () {
      this._starEmitters = [];
      var e = Game.Global.game.add.emitter(0, 0, 15);
      e.setXSpeed(-300, 300), e.setYSpeed(-700, -300), e.setAlpha(1, 0, 2e3), e.setScale(.5, 1, .5, 1, 2e3), e.gravity = 1200, e.makeParticles(Game.Global.ATLAS_0, "partStar", e.maxParticles, !1, !1), this._fxLayer.add(e, !0), this._starEmitters[t.both] = e
    }, Object.defineProperty(a.prototype, "phyColGroup", {
      get: function () {
        return this._phyColGroup
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "phyBody", {
      get: function () {
        return this._bg.body
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(a.prototype, "floorPhyShape", {
      get: function () {
        return this._floorPhyShape
      }, enumerable: !0, configurable: !0
    }), a.prototype.setupPhysics = function () {
      var t = e.BallManager.instance, i = Game.Global.game.physics.p2;
      i.enable(this._bg, Game.Global.DEBUG);
      var n = this._bg.body;
      n["static"] = !0, n.clearShapes(), n.collides(t.ballCollisionGroup);
      var s = n.addRectangle(4 * Game.Global.GAME_MAX_WIDTH, Game.Global.GAME_MAX_HEIGHT - a.FLOOR_Y, 0, a.FLOOR_Y - Game.Global.GAME_MAX_HEIGHT / 2 + (Game.Global.GAME_MAX_HEIGHT - a.FLOOR_Y) / 2), o = i.createMaterial("floor");
      n.setCollisionGroup(this._phyColGroup, s), n.setMaterial(o, s);
      var l = i.createContactMaterial(o, t.ballMaterial);
      l.friction = .8, l.restitution = .6, this._floorPhyShape = s, this._backboard.setupPhysics(), this._powerUp.setupPhysics()
    }, a.WALL_W = 100, a.FLOOR_Y = 912, a.INFO_MSG_Y = 600, a.MENU_BUTTON_Y = 260, a
  }();
  e.Playfield = a
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function () {
    function t() {
      var e = Game.Global.game;
      t._instance = this, this._backboard = e.add.sprite(0, 0, Game.Global.ATLAS_0, "board_" + Game.Global.selectedCourt.id), this._backboard.anchor.set(.5, .5), this._backboard.name = "basket", this._middleLayer = e.add.group(), this._basket = e.add.group(), this._net = e.add.image(0, 4, Game.Global.ATLAS_0, "net", this._basket), this._net.anchor.set(.5, 0);
      var i = e.add.image(0, 0, Game.Global.ATLAS_0, "hoop", this._basket);
      i.anchor.set(.5, 0), this._posInTime = new Phaser.Point
    }

    return Object.defineProperty(t, "instance", {
      get: function () {
        return t._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "middleLayer", {
      get: function () {
        return this._middleLayer
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "basketBodyId", {
      get: function () {
        return this._backboard.body.id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "basketSensorShapeId", {
      get: function () {
        return this._basketSensorShapeId
      }, enumerable: !0, configurable: !0
    }), t.prototype.setupPhysics = function () {
      var t = e.BallManager.instance, i = Game.Global.game.physics.p2;
      i.enable(this._backboard, Game.Global.DEBUG);
      var a = this._backboard.body;
      a.kinematic = !0, a.clearShapes(), a.addCircle(10, -61, 61), a.addCircle(10, 60, 61);
      var n = a.addRectangle(80, 20, 0, 120);
      n.sensor = !0, this._basketSensorShapeId = n.id, a.setCollisionGroup(e.Playfield.instance.phyColGroup), a.collides(t.ballCollisionGroup);
      var s = i.createMaterial("basketHoop", a), o = i.createContactMaterial(s, t.ballMaterial);
      o.restitution = .3, o.friction = .5
    }, t.prototype.reset = function () {
      var e = this._backboard.body;
      e.reset(t.START_X, t.START_Y, !1, !1), this._basket.position.set(t.START_X, t.START_Y + t.BASKET_VOFFSET), this._net.scale.y = 1, this._netFxTimer = null, this._hMoveEnableTime = 0, this._vMoveEnableTime = 0
    }, t.prototype.update = function () {
      if (0 != e.HUD.instance.time && (0 == this._hMoveEnableTime ? e.Player.instance.successfulShots >= 5 && (this._hMoveEnableTime = Game.Global.elapsedTime) : 0 == this._vMoveEnableTime && e.Player.instance.successfulShots >= 10 && (this._vMoveEnableTime = Game.Global.elapsedTime), 0 != this._hMoveEnableTime)) {
        var i = this._backboard.body;
        this.getPosInTime(Game.Global.elapsedTime), i.x = this._posInTime.x, i.y = this._posInTime.y, this._basket.position.set(this._posInTime.x, this._posInTime.y + t.BASKET_VOFFSET)
      }
      if (null != this._netFxTimer) {
        var a = (Game.Global.elapsedTime - this._netFxTimer) / 1e3;
        a >= 1 && (a = 1, this._netFxTimer = null), this._net.scale.y = 1.2 - .2 * Phaser.Easing.Elastic.Out(a)
      }
    }, t.prototype.showNetFx = function () {
      null == this._netFxTimer && (this._netFxTimer = Game.Global.elapsedTime)
    }, t.prototype.getPosInTime = function (e) {
      if (0 == this._hMoveEnableTime)this._posInTime.set(t.START_X, t.START_Y); else {
        var i = (e - this._hMoveEnableTime) / Game.Global.FPS * t.MOVE_SPEED_PER_FRAME;
        i <= t.START_X - t.MIN_X ? this._posInTime.x = t.START_X - i : (i -= t.START_X - t.MIN_X, i %= 2 * (t.MAX_X - t.MIN_X), i = i <= t.MAX_X - t.MIN_X ? t.MIN_X + i : t.MAX_X - (i - (t.MAX_X - t.MIN_X)), this._posInTime.x = i), 0 == this._vMoveEnableTime ? this._posInTime.y = t.START_Y : (i = (e - this._vMoveEnableTime) / Game.Global.FPS * t.MOVE_SPEED_PER_FRAME, i %= 2 * (t.MAX_Y - t.MIN_Y), i = i <= t.MAX_Y - t.MIN_Y ? t.MIN_Y + i : t.MAX_Y - (i - (t.MAX_Y - t.MIN_Y)), this._posInTime.y = i)
      }
      return this._posInTime
    }, t.START_X = 320, t.START_Y = 410, t.BASKET_VOFFSET = 53, t.MIN_X = 170, t.MAX_X = 470, t.MIN_Y = t.START_Y, t.MAX_Y = t.MIN_Y + 100, t.MOVE_SPEED_PER_FRAME = 2, t
  }();
  e.Backboard = t
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t;
  !function (e) {
    e[e.wait = 0] = "wait", e[e.launch = 1] = "launch", e[e.fall = 2] = "fall", e[e.hide = 3] = "hide"
  }(t || (t = {}));
  var i;
  !function (e) {
    e[e.hitHoop = 1] = "hitHoop", e[e.scaleBall = 2] = "scaleBall", e[e.fireBall = 4] = "fireBall", e[e.scored = 8] = "scored", e[e.smallBall = 16] = "smallBall", e[e.aiControlled = 32] = "aiControlled", e[e.active = 64] = "active", e[e.stuck = 128] = "stuck"
  }(i || (i = {}));
  var a = function (e) {
    function t(t) {
      e.call(this, Game.Global.game, 0, 0, Game.Global.ATLAS_0, Game.Global.selectedBall.imageKey), this._ball = t
    }

    return __extends(t, e), t.prototype.postUpdate = function () {
      e.prototype.postUpdate.call(this), this.exists && this._ball.postUpdate()
    }, t
  }(Phaser.Sprite), n = function () {
    function n() {
      void 0 == n._fallColGroups && (n._fallColGroups = [e.Playfield.instance.phyColGroup, e.PowerUpManager.instance.phyColGroup]), this._flags = 0, this._scaleRatio = 1, this._updateFnc = [void 0, this.updateLaunch, this.updateFall, this.updateHide], this._shadow = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "ballShadow", e.BallManager.instance.getLayer(e.eBallLayer.behindBasketAI)), this._shadow.anchor.set(.5, .6), this._ball = new a(this), this._ball.anchor.set(.5), this._ball.kill(), Game.Global.game.physics.p2.enable(this._ball, Game.Global.DEBUG);
      var t = this._ball.body;
      this.createBallShape(), t.onBeginContact.add(this.impactClb, this), this.initFireFx(), this._sparks = new Utils.GameObjectCollection(e.BallSpark)
    }

    return Object.defineProperty(n.prototype, "active", {
      get: function () {
        return 0 != (this._flags & i.active)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "floorHitId", {
      get: function () {
        return this._floorHitId
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "alpha", {
      get: function () {
        return this._ball.alpha
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "scale", {
      get: function () {
        return this._ball.scale.x
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "angle", {
      get: function () {
        return this._ball.angle
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "hitBasketHoop", {
      get: function () {
        return 0 != (this._flags & i.hitHoop)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "position", {
      get: function () {
        return this._ball.position
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "id", {
      get: function () {
        return this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "radius", {
      get: function () {
        return this._ball.width / 2
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(n.prototype, "aiControlled", {
      get: function () {
        return 0 != (this._flags & i.aiControlled)
      }, enumerable: !0, configurable: !0
    }), n.prototype.show = function (a, s, o, l, r, h) {
      void 0 === r && (r = 0), void 0 === h && (h = !1);
      var c, u = e.BallManager.instance, _ = 0 != (this._flags & i.smallBall) != o;
      this._id = r, this._flags = i.active, this._controller = a, this._floorHitId = 0, a.ai() ? (this._flags |= i.aiControlled, this._alphaRatio = .4, this._data = Game.Global.balls[0], c = u.getLayer(e.eBallLayer.inFrontOfBasketAI)) : (this._alphaRatio = 1, this._data = Game.Global.selectedBall, c = u.getLayer(e.eBallLayer.inFrontOfBasketPl)), s && (this._flags |= i.fireBall, e.FireBallBar.instance.onFireBallEnd.addOnce(this.cancelFireBall, this), this._fireFxNextRingTime = 0, this._fireFxNextSpotTime = 0, this._fireFxRingLayer = u.getBallFxLayer(), c.add(this._fireFxRingLayer)), this._nextSparkTime = 0, o ? (this._flags |= i.smallBall, this._scaleRatio = n.SMALL_BALL_SCALE_RATIO) : this._scaleRatio = 1, this._ball.frameName = this._data.imageKey, this._ball.revive(), this._ball.alpha = this._alphaRatio, this._ball.scale.set(n.START_SCALE * this._scaleRatio), this._ball.inputEnabled = h, c.add(this._ball), s || 15 == this._data.id ? (this._fxLayer = u.getBallFxLayer(), c.add(this._fxLayer)) : this._fxLayer = null;
      var d = this._ball.body;
      return _ && this.createBallShape(), void 0 == l && (l = Game.Global.game.rnd.integerInRange(Game.Global.GAME_MAX_WIDTH / 2 - n.START_X_MAX_OFFSET, Game.Global.GAME_MAX_WIDTH / 2 + n.START_X_MAX_OFFSET)), d.reset(l, n.START_Y, !1, !1), d.angle = 0, d.damping = 0, d.removeCollisionGroup(n._fallColGroups), d.data.gravityScale = 0, this.aiControlled || (this._shadow.revive(), this._shadow.scale.set(1 * this._scaleRatio), this._shadow.alpha = 1, this._shadow.position.set(d.x, d.y + this._ball.height / 2)), this._state = t.wait, this
    }, n.prototype.launch = function (e) {
      e < n.LAUNCH_MIN_DIR ? e = n.LAUNCH_MIN_DIR : e > n.LAUNCH_MAX_DIR && (e = n.LAUNCH_MAX_DIR);
      var a = n.STRAIGHT_LAUNCH_SPEED + Phaser.Easing.Sinusoidal.In(Math.abs(90 - e) / (90 - n.LAUNCH_MIN_DIR)) * (n.SLOPING_LAUNCH_SPEED - n.STRAIGHT_LAUNCH_SPEED);
      e = Phaser.Math.degToRad(e);
      var s = Math.cos(e) * a, o = Math.sin(e) * a, l = this._ball.body;
      l.data.gravityScale = 1, l.applyImpulse([s, o], 0, 0);
      l.velocity.x, l.velocity.y;
      this._shadow.kill(), this._flags |= i.scaleBall, 0 != (this._flags & i.fireBall) && (this._fireFxNextTailParticleTime = Game.Global.elapsedTime), this._launchTime = Game.Global.elapsedTime, this._state = t.launch
    }, n.prototype.update = function () {
      if (0 != (this._flags & i.scaleBall)) {
        var e = (Game.Global.elapsedTime - this._launchTime) / 800;
        e >= 1 && (e = 1, this._flags &= ~i.scaleBall);
        var t = n.START_SCALE * this._scaleRatio, a = n.END_SCALE * this._scaleRatio;
        this._ball.scale.set(t - (t - a) * e)
      }
      var s = this._updateFnc[this._state];
      return void 0 != s ? s.call(this) : !0
    }, n.prototype.postUpdate = function () {
      null != this._fxLayer && this._fxLayer.position.copyFrom(this._ball.position), 0 != (this._flags & i.fireBall) && this.updateFireFx(), 15 == this._data.id && (Game.Global.elapsedTime >= this._nextSparkTime && (this._nextSparkTime = Game.Global.elapsedTime + n.SPARK_INTERVAL, this._sparks.activateObject().show(this, this._fxLayer)), this._sparks.updateObjects())
    }, n.prototype.kill = function () {
      this._ball.alive && (this._flags &= ~i.active, this._ball.kill(), this._shadow.kill(), this._sparks.reset(), null != this._fxLayer && (e.BallManager.instance.releaseBallFxLayer(this._fxLayer), this._fxLayer = null), this.cancelFireBall())
    }, n.prototype.updateLaunch = function () {
      if (this._ball.body.velocity.y >= 0) {
        this._state = t.fall;
        var i = e.BallManager.instance.getLayer(this.aiControlled ? e.eBallLayer.behindBasketAI : e.eBallLayer.behindBasketPl);
        this.fireBall && i.addChild(this._fireFxRingLayer), i.addChild(this._ball), null != this._fxLayer && i.addChild(this._fxLayer), this._ball.body.collides(n._fallColGroups)
      }
      return this.checkBallHPos()
    }, n.prototype.updateFall = function () {
      var e = this._ball.body.velocity;
      return 0 == (this._flags & i.stuck) ? (Math.abs(e.x) < 1 && Math.abs(e.y) < 1 && (this._stuckTime = Game.Global.elapsedTime, this._flags |= i.stuck), this.updateShadow(), this.checkBallHPos()) : (Math.abs(e.x) < 1 && Math.abs(e.y) < 1 ? Game.Global.elapsedTime - this._stuckTime >= 1500 && (this._controller.onBallOutOfScreen(this), this.hideBall(), this._flags &= ~i.active) : this._flags &= ~i.stuck, !0)
    }, n.prototype.updateHide = function () {
      var e = (Game.Global.elapsedTime - this._hideTime) / n.HIDE_LEN;
      return e >= 1 ? !1 : (this._ball.alpha = this._alphaRatio - this._alphaRatio * Phaser.Easing.Cubic.In(e), this.updateShadow(), !0)
    }, n.prototype.updateShadow = function () {
      var t = e.Playfield.FLOOR_Y - this._ball.y;
      if (0 > t && (t = 0), t <= n.SHADOW_VISIBILITY_DIS) {
        this._shadow.alive || this._shadow.revive();
        var i = 1 - t / n.SHADOW_VISIBILITY_DIS;
        this._shadow.position.set(this._ball.x, e.Playfield.FLOOR_Y + 10), this._shadow.alpha = i * this._ball.alpha, this._shadow.scale.set(n.SHADOW_MIN_SCALE + (n.SHADOW_MAX_SCALE - n.SHADOW_MIN_SCALE) * i)
      }
    }, n.prototype.checkBallHPos = function () {
      var t = this._ball.x, a = !1;
      return t < this._ball.previousPosition.x ? t + this.radius <= 0 && (a = !0) : t - this.radius >= Game.Global.GAME_MAX_WIDTH && (a = !0), a ? (this._controller.onBallOutOfScreen(this) || (this._flags &= ~i.active), 0 == (this._flags & (i.scored | i.aiControlled)) && e.FireBallBar.instance.fireBallActive && e.FireBallBar.instance.clear(), !1) : !0
    }, n.prototype.impactClb = function (t, a, n, s) {
      var o = s.id;
      if (t.id == e.Playfield.instance.phyBody.id) {
        var l = e.Playfield.instance;
        o == l.floorPhyShape.id && (this._controller.onBallFloorHit(this) || (this._flags &= ~i.active), 0 == this._floorHitId++ && this.hideBall())
      } else if (t.id == e.Backboard.instance.basketBodyId) {
        var r = e.Backboard.instance;
        o == r.basketSensorShapeId ? 0 == this._floorHitId && (this._flags |= i.scored, r.showNetFx(), this._controller.onBallSuccessfulShot(this)) : 0 == (this._flags & i.hitHoop) && (this._flags |= i.hitHoop, this.aiControlled || Utils.AudioUtils.playSound("bounceHoop"))
      } else this.aiControlled || t.id != e.PowerUpManager.instance.phyBodyId || e.PowerUpManager.instance.hidePowerUp(!0)
    }, n.prototype.hideBall = function () {
      this._state != t.hide && (this._state = t.hide, this._hideTime = Game.Global.elapsedTime, 0 == (this._flags & (i.scored | i.aiControlled)) && e.FireBallBar.instance.fireBallActive && e.FireBallBar.instance.clear())
    }, n.prototype.createBallShape = function () {
      var t = this._ball.body;
      t.clearCollision(!0, !0), t.setCircle(125 * n.END_SCALE * this._scaleRatio), t.setMaterial(e.BallManager.instance.ballMaterial), t.setCollisionGroup(e.BallManager.instance.ballCollisionGroup)
    }, Object.defineProperty(n.prototype, "fireBall", {
      get: function () {
        return 0 != (this._flags & i.fireBall)
      }, enumerable: !0, configurable: !0
    }), n.prototype.initFireFx = function () {
      this._fireFxRings = new Utils.GameObjectCollection(BallFireFx.Ring), this._fireFxSpots = new Utils.GameObjectCollection(BallFireFx.Spot)
    }, n.prototype.updateFireFx = function () {
      var i = Game.Global.elapsedTime;
      this._fireFxRingLayer.position.copyFrom(this._ball.position), i >= this._fireFxNextRingTime && (this._fireFxNextRingTime = i + n.FIREFX_RING_INTERVAL, this._fireFxRings.activateObject().show(this, this._fireFxRingLayer)), this._fireFxRings.updateObjects(), i >= this._fireFxNextSpotTime && (this._fireFxNextSpotTime = i + n.FIREFX_SPOT_INTERVAL, this._fireFxSpots.activateObject().show(this, this._fxLayer)), this._fireFxSpots.updateObjects(), (this._state == t.launch || this._state == t.fall) && i >= this._fireFxNextTailParticleTime && (e.BallManager.instance.activateFireBallTailParticle(this._ball.previousPosition, this._ball.scale.x), this._fireFxNextTailParticleTime = i + n.FIREFX_TAIL_INTERVAL)
    }, n.prototype.cancelFireBall = function () {
      0 != (this._flags & i.fireBall) && (this._flags &= ~i.fireBall, e.FireBallBar.instance.onFireBallEnd.remove(this.cancelFireBall, this), e.BallManager.instance.releaseBallFxLayer(this._fireFxRingLayer), this._fireFxRingLayer = null, this._fireFxRings.reset(), this._fireFxSpots.reset())
    }, n.START_X_MAX_OFFSET = 190, n.START_Y = 950, n.START_SCALE = 1, n.END_SCALE = .35, n.SMALL_BALL_SCALE_RATIO = .7, n.SHADOW_VISIBILITY_DIS = 400, n.SHADOW_MIN_SCALE = .1, n.SHADOW_MAX_SCALE = .4, n.HIDE_LEN = 1e3, n.LAUNCH_MIN_DIR = 75, n.LAUNCH_MAX_DIR = 105, n.STRAIGHT_LAUNCH_SPEED = 116, n.SLOPING_LAUNCH_SPEED = 119, n.SPARK_INTERVAL = 500, n.FIREFX_RING_INTERVAL = 250, n.FIREFX_SPOT_INTERVAL = 250, n.FIREFX_TAIL_INTERVAL = 75, n
  }();
  e.Ball = n
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  !function (e) {
    e[e.behindBasketAI = 0] = "behindBasketAI", e[e.behindBasketPl = 1] = "behindBasketPl", e[e.inFrontOfBasketAI = 2] = "inFrontOfBasketAI", e[e.inFrontOfBasketPl = 3] = "inFrontOfBasketPl"
  }(e.eBallLayer || (e.eBallLayer = {}));
  var t = e.eBallLayer, i = function () {
    function i() {
      i._instance = this, this._fireBallTailParticles = new Utils.GameObjectCollection(BallFireFx.TailParticle), this._ballFxLayers = new Collections.Pool(void 0, 6, !0, this.createBallFxLayer, this), this._balls = new Utils.GameObjectCollection(e.Ball), this._layers = [], this._layers[t.behindBasketAI] = Game.Global.game.add.group(e.Backboard.instance.middleLayer), this._layers[t.behindBasketPl] = Game.Global.game.add.group(e.Backboard.instance.middleLayer), this._layers[t.inFrontOfBasketAI] = Game.Global.game.add.group(), this._layers[t.inFrontOfBasketPl] = Game.Global.game.add.group();
      var a = Game.Global.game.physics.p2;
      this._collisionGroup = a.createCollisionGroup(), this._material = a.createMaterial("ball")
    }

    return Object.defineProperty(i, "instance", {
      get: function () {
        return i._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "ballCollisionGroup", {
      get: function () {
        return this._collisionGroup
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "ballMaterial", {
      get: function () {
        return this._material
      }, enumerable: !0, configurable: !0
    }), i.prototype.reset = function () {
      this._fireBallTailParticles.reset(), this._balls.reset()
    }, i.prototype.update = function () {
      this._balls.updateObjects(), this._fireBallTailParticles.updateObjects()
    }, i.prototype.getLayer = function (e) {
      return this._layers[e]
    }, i.prototype.activateBall = function () {
      return this._balls.activateObject()
    }, i.prototype.activateFireBallTailParticle = function (e, i) {
      this._fireBallTailParticles.activateObject().show(e, i, this._layers[t.behindBasketPl], 0)
    }, i.prototype.getBallFxLayer = function () {
      return this._ballFxLayers.getItem()
    }, i.prototype.releaseBallFxLayer = function (e) {
      null != e.parent && e.parent.removeChild(e.parent), this._ballFxLayers.returnItem(e)
    }, i.prototype.createBallFxLayer = function () {
      return new Phaser.Group(Game.Global.game)
    }, i
  }();
  e.BallManager = i
}(Playfield || (Playfield = {}));
var Playfield;
!function (e) {
  var t = function () {
    function t() {
      this._iconTweens = [], this._fillFxTweens = [], this._multiplierActTweens = [], this._multiplierHideTweens = [], t._instance = this;
      var e = Game.Global.game;
      this._onFireBallStart = new Phaser.Signal, this._onFireBallEnd = new Phaser.Signal, this._layer = e.add.group(), this._layer.fixedToCamera = !0, this._layer.cameraOffset.set(t.X, t.Y), e.add.image(139, 55, Game.Global.ATLAS_0, "fireBallBarBck", this._layer), this._fillFx = e.add.image(t.FILL_OFFSET_X, t.FILL_OFFSET_Y, Game.Global.ATLAS_0, "fireBallBarFillFx", this._layer), this._fillFx.position.y += this._fillFx.height / 2, this._fillFx.anchor.set(0, .5), this._fillFx.crop(new Phaser.Rectangle(0, 0, 0, this._fillFx.height), !1), this._fill = e.add.image(t.FILL_OFFSET_X, t.FILL_OFFSET_Y, Game.Global.ATLAS_0, "fireBallBarFill", this._layer), this._fillFullW = this._fill.width, this._fill.crop(new Phaser.Rectangle(0, 0, 0, this._fill.height), !1), this._icon = e.add.image(104, 65, Game.Global.ATLAS_0, "fireBallBarIco", this._layer), this._icon.anchor.set(104 / this._icon.width, 65 / this._icon.height);
      var i = this.multiplier;
      this._multiplierLayer = e.add.group(this._layer), this._multiplierLayer.position.set(t.MULTIPLIER_OFFSET_X, t.MULTIPLIER_OFFSET_Y), this._multiplierLayer.visible = !1, this._multiplierIconFx = e.add.image(0, 0, Game.Global.ATLAS_0, "fireBallBarMultiplierFx" + i, this._multiplierLayer), this._multiplierIconFx.anchor.set(.5), this._multiplierIcon = e.add.image(0, 0, Game.Global.ATLAS_0, "fireBallBarMultiplier" + i, this._multiplierLayer), this._multiplierIcon.anchor.set(.5)
    }

    return Object.defineProperty(t, "instance", {
      get: function () {
        return t._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "multiplier", {
      get: function () {
        return 14 != Game.Global.selectedBall.id ? 2 : 3
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "fireBallActive", {
      get: function () {
        return this._fireBallActive
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "onFireBallStart", {
      get: function () {
        return this._onFireBallStart
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "onFireBallEnd", {
      get: function () {
        return this._onFireBallEnd
      }, enumerable: !0, configurable: !0
    }), t.prototype.reset = function () {
      this._fillFxTweens[0] = Game.Global.game.add.tween(this._fillFx.scale).to({y: 3}, 750, Phaser.Easing.Cubic.Out, !1), this._fillFxTweens[1] = Game.Global.game.add.tween(this._fillFx).to({alpha: 0}, 750, Phaser.Easing.Cubic.In, !1), this._fillFxTweens[1].onComplete.add(function () {
        this._fillFx.visible = !1
      }, this), this._iconTweens[0] = Game.Global.game.add.tween(this._icon.scale).to({
        x: 1,
        y: 1
      }, 750, Phaser.Easing.Elastic.Out, !1), this._multiplierHideTweens[0] = Game.Global.game.add.tween(this._multiplierLayer).to({alpha: 0}, 1e3, Phaser.Easing.Cubic.Out, !1), this._multiplierHideTweens[1] = Game.Global.game.add.tween(this._multiplierLayer.scale).to({
        x: 2,
        y: 2
      }, 1e3, Phaser.Easing.Cubic.Out, !1), this._multiplierHideTweens[1].onComplete.add(function () {
        this.hideMultiplierLayer()
      }, this), this.clear(!1)
    }, t.prototype.clear = function (e) {
      if (void 0 === e && (e = !0), this._value = 0, this.updateFillCrop(), this._fillFx.visible = !1, this._fireBallActive = !1, this._multiplierLayer.visible)if (e) {
        for (var t = this._multiplierHideTweens.length; 0 != t--;)this._multiplierHideTweens[t].start();
        this._onFireBallEnd.dispatch()
      } else this.hideMultiplierLayer()
    }, t.prototype.hideMultiplierLayer = function () {
      for (var e = this._multiplierActTweens.length; 0 != e--;)null != this._multiplierActTweens[e] && (this._multiplierActTweens[e].stop(!1), this._multiplierActTweens[e] = null);
      this._multiplierLayer.visible = !1
    }, t.prototype.update = function (i) {
      i != e.ePlayfieldState.game || this._fireBallActive || 0 == e.HUD.instance.time || 0 == this._value || (this._value -= (this._fireBallActive ? t.VALUE_FIREBALL_DEC_STEP : t.VALUE_DEC_STEP) * Game.Global.deltaRatio, this._value <= 0 && this.clear(), this.updateFillCrop())
    }, t.prototype.incValue = function (e) {
      if (!this._fireBallActive) {
        (this._value += e) >= 1 && (this._value = 1, this._multiplierLayer.alpha = 1, this._multiplierLayer.scale.set(1), this._multiplierLayer.visible = !0, this._multiplierLayer.angle = -5, this._multiplierIconFx.scale.set(1), this._multiplierIconFx.alpha = .4, this._multiplierActTweens[0] = Game.Global.game.add.tween(this._multiplierLayer).to({angle: "+10"}, 400, Phaser.Easing.Linear.None, !0, 0, -1, !0), this._multiplierActTweens[1] = Game.Global.game.add.tween(this._multiplierIconFx.scale).to({
          x: 1.3,
          y: 1.3
        }, 400, Phaser.Easing.Cubic.Out, !0, 0, -1), this._multiplierActTweens[2] = Game.Global.game.add.tween(this._multiplierIconFx).to({alpha: 0}, 400, Phaser.Easing.Cubic.In, !0, 0, -1), this._fireBallActive = !0, this._onFireBallStart.dispatch()), this.updateFillCrop(), this._fillFx.cropRect.width = this._fill.cropRect.width, this._fillFx.updateCrop(), this._fillFx.alpha = .5, this._fillFx.scale.set(1, 1), this._fillFx.visible = !0;
        for (var t = this._fillFxTweens.length; 0 != t--;)this._fillFxTweens[t].start();
        for (this._icon.scale.set(1.2), t = this._iconTweens.length; 0 != t--;)this._iconTweens[t].start()
      }
    }, t.prototype.updateFillCrop = function () {
      this._fill.cropRect.width = Math.floor(this._value * this._fillFullW), this._fill.updateCrop()
    }, t.TIME_BONUS = 5, t.X = 30, t.Y = 70, t.FILL_OFFSET_X = 139, t.FILL_OFFSET_Y = 60, t.MULTIPLIER_OFFSET_X = 520, t.MULTIPLIER_OFFSET_Y = 66, t.VALUE_DEC_STEP = 4e-4, t.VALUE_FIREBALL_DEC_STEP = .0015, t
  }();
  e.FireBallBar = t
}(Playfield || (Playfield = {}));
var Results;
!function (e) {
  var t = function () {
    function e(e, t, i, a) {
      void 0 === t && (t = 0), void 0 === i && (i = 0);
      var n = 360 / e, s = Game.Global.elapsedTime % 360;
      this._layer = Game.Global.game.add.group(a), this._layer.position.set(t, i), this._beams = [];
      for (var o = 0; e > o; o++) {
        var l = Game.Global.game.add.image(0, 0, Game.Global.ATLAS_0, "shine", this._layer);
        l.anchor.set(.5, 1), l.angle = s, this._beams.push(l), s += n
      }
    }

    return Object.defineProperty(e.prototype, "layer", {
      get: function () {
        return this._layer
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function () {
        return this._layer.x
      }, set: function (e) {
        this._layer.x = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._layer.y
      }, set: function (e) {
        this._layer.y = e
      }, enumerable: !0, configurable: !0
    }), e.prototype.update = function () {
      for (var e = this._beams.length, t = Game.Global.elapsedTime / 16 % 360, i = 360 / e; 0 != e--;)this._beams[e].angle = t, t += i
    }, e.prototype.setPosition = function (e, t) {
      this._layer.position.set(e, t)
    }, e
  }();
  e.ShineFx = t
}(Results || (Results = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i(i, a) {
      t.call(this), this._msgContainer = new Phaser.BitmapText(e.Global.game, 0, 0, i, "", a), this._msgContainer.anchor.set(.5)
    }

    return __extends(i, t), i.prototype.getMsgContainer = function () {
      return this._msgContainer
    }, i.prototype.show = function (i, a, n, s, o) {
      this._msgContainer.text = n, void 0 == o && (o = e.Global.game.world), o.addChild(this._msgContainer), o.bringToTop(this._msgContainer), t.prototype.showMessage.call(this, i, a, s, e.Global.elapsedTime)
    }, i.prototype.update = function () {
      return t.prototype.update.call(this, e.Global.elapsedTime)
    }, i.prototype.kill = function () {
      t.prototype.kill.call(this), this._msgContainer.parent.removeChild(this._msgContainer)
    }, i
  }(PopupMessage.MessageBase);
  e.TextPopupMessage = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i(i, a, n, s) {
      void 0 === i && (i = 0), void 0 === a && (a = 0), void 0 === n && (n = !0);
      var o = e.Global.game.add.group(s);
      o.position.set(i, a), t.call(this, o, 10, n), this._bg = e.Global.game.add.graphics(0, 0, o), this._thumb = e.Global.game.add.graphics(0, 0, o)
    }

    return __extends(i, t), i.prototype.updateThumbSize = function () {
      this.validSettings() && this.createThumb()
    }, i.prototype.updateThumbPos = function () {
      this.validSettings() && (this._vertical ? this._thumb.y = this.getThumbPosInPixels() : this._thumb.x = this.getThumbPosInPixels())
    }, i.prototype.updateWidth = function (e) {
      e > 0 && this._height > 0 && (this.createBg(), this._thumbSize > 0 && this.createThumb())
    }, i.prototype.updateHeight = function (e) {
      e > 0 && this._width > 0 && (this.createBg(), this._thumbSize > 0 && this.createThumb())
    }, i.prototype.createBg = function () {
      var e = this._bg;
      e.clear(), e.beginFill(68906, 1), e.drawRoundedRect(0, 0, this._width, this._height, 4), e.endFill()
    }, i.prototype.createThumb = function () {
      var e = this._thumb, t = this._width, i = this._height;
      this._vertical ? i = Math.round(i * this._thumbSize) : t = Math.round(t * this._thumbSize), e.clear(), e.beginFill(16777215, 1), e.drawRoundedRect(0, 0, t, i, 4), e.endFill(), this.updateThumbPos()
    }, i
  }(Controls.ScrollBarBase);
  e.ScrollBar = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function () {
    function e() {
      this.reset()
    }

    return e.prototype.update = function (e) {
      if (void 0 == e.version && this.reset(), this.trainingCompleted = e.trainingCompleted, this.giftOpenTime = e.giftOpenTime, this.coins = e.coins, this.totalScore = e.totalScore, this.totalGames = e.totalGames, this.courtBestScore = e.courtBestScore, this.courtLocked = e.courtLocked, this.courtWins = e.courtWins, this.courtWinsInARow = e.courtWinsInARow, this.courtGames = e.courtGames, this.selectedCourtId = e.selectedCourtId, 1 == e.version) {
        for (var t = e.ballLocked.length, i = 0; 0 != t--;)e.ballLocked[t] && (i |= 1 << t);
        this.ballLockMask = i
      } else this.ballLockMask = e.ballLockMask;
      this.selectedBallId = e.selectedBallId, e.version < 2 ? this.newBallNoticeMask = 0 : this.newBallNoticeMask = e.newBallNoticeMask
    }, e.prototype.reset = function () {
      this.version = 2, this.trainingCompleted = !1, this.giftOpenTime = 0, this.coins = 0, this.totalScore = 0, this.totalGames = 0, this.courtBestScore = [0, 0, 0], this.courtLocked = [!1, !1, !0], this.courtGames = [0, 0, 0], this.courtWins = [0, 0, 0], this.courtWinsInARow = [0, 0, 0], this.selectedCourtId = 0, this.ballLockMask = 16777214, this.newBallNoticeMask = 0, this.selectedBallId = 0
    }, e
  }();
  e.SaveData = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i(a, n, s, o, l, r) {
      void 0 === l && (l = "");
      var h = e.Global.game.add.image(a, n, e.Global.ATLAS_0, i.NORMAL_FRAME_NAME, r);
      h.anchor.set(.5), t.call(this, h), this._caption = new Phaser.BitmapText(e.Global.game, 0, 0, s, l, o), this._caption.anchor.set(.5, .4), h.addChild(this._caption)
    }

    return __extends(i, t), Object.defineProperty(i.prototype, "text", {
      get: function () {
        return this._caption.text
      }, set: function (e) {
        this._caption.text = e
      }, enumerable: !0, configurable: !0
    }), i.prototype.enabledClb = function () {
      this._container.frameName = i.NORMAL_FRAME_NAME
    }, i.prototype.disabledClb = function () {
      this._container.frameName = i.DISABLED_FRAME_NAME
    }, i.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, i.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, i.NORMAL_FRAME_NAME = "buttonLgGreen", i.DISABLED_FRAME_NAME = "buttonLgDisabled", i
  }(Controls.ButtonBase);
  e.TextButton = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function () {
    function t() {
    }

    return Object.defineProperty(t.prototype, "openDate", {
      get: function () {
        return void 0 == this._openDate && (0 == e.Global.saveData.giftOpenTime ? this._openDate = new Date(Date.now()) : this._openDate = new Date(e.Global.saveData.giftOpenTime)), this._openDate
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "locked", {
      get: function () {
        return this.timeToUnlock >= 1e3
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "timeToUnlock", {
      get: function () {
        var e = this.openDate.valueOf() - Date.now();
        return Math.max(0, e)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
      get: function () {
        return 25
      }, enumerable: !0, configurable: !0
    }), t.prototype.collect = function () {
      e.Global.coins += this.value, this._openDate = new Date(Date.now() + 864e5), e.Global.saveData.giftOpenTime = this._openDate.valueOf(), e.Global.GAMEE && Gamee2.Gamee.gameSave()
    }, t
  }();
  e.Gift = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function () {
    function t(e, t, i, a) {
      void 0 === a && (a = 0), this._iconKey = null, this._id = e, this._name = t, this._description = i, this._price = a, this._scoreBonus = 0, this._timeBonus = 0, this._powerUpLifeSpan = 1
    }

    return Object.defineProperty(t.prototype, "id", {
      get: function () {
        return this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "name", {
      get: function () {
        return this._name
      }, set: function (e) {
        this._name = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "iconKey", {
      get: function () {
        return null != this._iconKey ? this._iconKey : this.imageKey
      }, set: function (e) {
        this._iconKey = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "imageKey", {
      get: function () {
        return "ball_" + this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "description", {
      get: function () {
        return this._description
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "price", {
      get: function () {
        return this._price
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "locked", {
      get: function () {
        return 0 != (e.Global.saveData.ballLockMask & 1 << this._id)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "justUnlocked", {
      get: function () {
        return 0 != (e.Global.saveData.newBallNoticeMask & 1 << this.id)
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "selected", {
      get: function () {
        return e.Global.saveData.selectedBallId == this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "scoreBonus", {
      get: function () {
        return this._scoreBonus
      }, set: function (e) {
        this._scoreBonus = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "timeBonus", {
      get: function () {
        return this._timeBonus
      }, set: function (e) {
        this._timeBonus = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "powerUpLifeSpan", {
      get: function () {
        return this._powerUpLifeSpan
      }, set: function (e) {
        this._powerUpLifeSpan = e
      }, enumerable: !0, configurable: !0
    }), t.prototype.unlock = function () {
      this.locked && (e.Global.saveData.ballLockMask &= ~(1 << this._id), 0 == this._price ? e.Global.saveData.newBallNoticeMask |= 1 << this._id : e.Global.coins -= this._price)
    }, t
  }();
  e.BallData = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function () {
    function t(e, t, i, a, n, s, o) {
      this._id = e, this._title = t, this._prize = i, this._aiSuccessRate = a, this._aiShotInterval = n, this._description = s, this._lockedMsg = o
    }

    return Object.defineProperty(t.prototype, "id", {
      get: function () {
        return this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "title", {
      get: function () {
        return this._title
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "iconKey", {
      get: function () {
        return "courtIcon_" + this._id
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "locked", {
      get: function () {
        return e.Global.saveData.courtLocked[this._id]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "highScore", {
      get: function () {
        return e.Global.saveData.courtBestScore[this._id]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "prize", {
      get: function () {
        return this._prize
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "newBestScorePrize", {
      get: function () {
        return 0 == this._id ? 0 : 1
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "games", {
      get: function () {
        return e.Global.saveData.courtGames[this._id]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "wins", {
      get: function () {
        return e.Global.saveData.courtWins[this._id]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "winsInRow", {
      get: function () {
        return e.Global.saveData.courtWinsInARow[this._id]
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "description", {
      get: function () {
        return this._description
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "lockedMessage", {
      get: function () {
        return this._lockedMsg
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "aiSuccessRate", {
      get: function () {
        return this._aiSuccessRate
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(t.prototype, "aiShotInterval", {
      get: function () {
        return this._aiShotInterval
      }, enumerable: !0, configurable: !0
    }), t.prototype.setGameResult = function (t, i) {
      var a = e.Global.saveData, n = 0;
      return this.highScore < t && (a.courtBestScore[this._id] = t, n += this.newBestScorePrize), a.courtGames[this._id]++, 0 != this.id && a.totalGames++, t > i ? (a.courtWins[this._id]++, a.courtWinsInARow[this._id]++, n += this._prize) : (a.courtWinsInARow[this._id] = 0, t == i && (n += 0 != this.id ? Math.round(this._prize / 2) : this._prize)), a.coins += n, n
    }, t.prototype.unlock = function () {
      e.Global.saveData.courtLocked[this._id] = !1
    }, t
  }();
  e.CourtData = t
}(Game || (Game = {}));
var Game;
!function (e) {
  !function (e) {
    e[e.idle = 0] = "idle", e[e.disabled = 1] = "disabled"
  }(e.eImageButtonFrame || (e.eImageButtonFrame = {}));
  var t = e.eImageButtonFrame, i = function (i) {
    function a(a, n, s, o, l) {
      var r = e.Global.game.add.image(a, n, s, o[t.idle], l);
      r.anchor.set(.5), i.call(this, r), this._frames = o
    }

    return __extends(a, i), a.prototype.enabledClb = function () {
      this._container.frameName = this._frames[t.idle]
    }, a.prototype.disabledClb = function () {
      var e = this._frames[t.disabled];
      (void 0 == e || null == e || 0 == e.length) && (e = this._frames[t.idle]), this._container.frameName = e
    }, a.prototype.pressedClb = function () {
      this._container.scale.set(.9)
    }, a.prototype.releasedClb = function (e) {
      this._container.scale.set(1)
    }, a
  }(Controls.ButtonBase);
  e.ImageButton = i
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments), this._gameMinDims = new Phaser.Point(e.Global.GAME_MIN_WIDTH, e.Global.GAME_MIN_HEIGHT), this._gameMaxDims = new Phaser.Point(e.Global.GAME_MAX_WIDTH, e.Global.GAME_MAX_HEIGHT), this._gameDims = new Phaser.Point, this._userScale = new Phaser.Point(0, 0)
    }

    return __extends(i, t), i.prototype.init = function () {
      this.input.maxPointers = 1, this.game.renderer.renderSession.roundPixels = !1, this.stage.disableVisibilityChange = !1, this._gameDims.x = void 0, this._gameDims.y = void 0, this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE, this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.scale.setResizeCallback(this.gameResized, this), this.gameResized(this.scale, null), this.world.resize(e.Global.GAME_MAX_WIDTH, e.Global.GAME_MAX_HEIGHT), (this.game.device.iOS || this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55) && (this.game.sound.touchLocked = !0, e.Global.unlockAudio())
    }, i.prototype.create = function () {
      this.game.state.start("Preload")
    }, i.prototype.calcGameDims = function () {
      var e, t = (this.scale, Math.min(this._gameMinDims.x, this._gameMaxDims.x) / Math.max(this._gameMinDims.y, this._gameMaxDims.y)), i = Math.max(this._gameMinDims.x, this._gameMaxDims.x) / Math.min(this._gameMinDims.y, this._gameMaxDims.y);
      t > i && (e = t, t = i, i = e);
      var a = window.innerWidth, n = window.innerHeight;
      e = a / n, t > e ? n = Math.floor(a / t) : e > i && (a = Math.floor(n * i));
      var s = a, o = n;
      s < this._gameMinDims.x ? (o = Math.round(o * (this._gameMinDims.x / s)), s = this._gameMinDims.x) : s > this._gameMaxDims.x && (o = Math.round(o * (this._gameMaxDims.x / s)), s = this._gameMaxDims.x), o < this._gameMinDims.y ? (s = Math.round(s * (this._gameMinDims.y / o)), o = this._gameMinDims.y) : o > this._gameMaxDims.y && (s = Math.round(s * (this._gameMaxDims.y / o)), o = this._gameMaxDims.y), this._gameDims.set(s, o), this._userScale.set(a / s, n / o)
    }, i.prototype.gameResized = function (e, t) {
      if (!e.incorrectOrientation) {
        var i = this._userScale.x, a = this._userScale.y, n = this._gameDims.x, s = this._gameDims.y;
        this.calcGameDims();
        var o = this._gameDims, l = this._userScale, r = o.x != this.game.width || o.y != this.game.height;
        if ((r || Math.abs(l.x - i) > .001 || Math.abs(l.y - a) > .001) && (r && this.scale.setGameSize(o.x, o.y), this.scale.setUserScale(l.x, l.y), r)) {
          var h = this.game.state.getCurrentState();
          "function" == typeof h.resized && h.resized(o.x, o.y, n, s)
        }
      }
    }, i
  }(Phaser.State);
  e.Boot = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments)
    }

    return __extends(i, t), Object.defineProperty(i, "instance", {
      get: function () {
        return i._instance
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(i.prototype, "onResize", {
      get: function () {
        return this._onResize
      }, enumerable: !0, configurable: !0
    }), i.prototype.init = function () {
      i._instance = this, e.Global.saveData.trainingCompleted && 0 == e.Global.selectedCourt.id && (e.Global.selectedCourt = e.Global.courts[1]), this._results = new e.GameResults, this._onResize = new Phaser.Signal, this.physics.startSystem(Phaser.Physics.P2JS), this.physics.p2.gravity.y = 4e3, this.physics.p2.emitImpactEvent = !1, this.physics.p2.useElapsedTime = !0
    }, i.prototype.create = function () {
      this._playfield = new Playfield.Playfield, this._bgShadow = this.game.add.graphics(0, 0), this._bgShadow.kill(), this._resultsPanel = new e.ResultsPanel, 0 != e.Global.selectedCourt.id || e.Global.saveData.trainingCompleted || (this._wndTrainingCompleted = new Windows.TrainingCompleted, this._wndTrainingCompleted.onClose.add(function () {
        this.game.state.start("CourtSelection")
      }, this)), 14 == e.Global.saveData.totalGames && (this._wndBiniBallUnlocked = new Windows.BiniBallUnlocked, this._wndBiniBallUnlocked.onClose.add(function () {
        this.endGame()
      }, this)), this.reset(), this.resized(this.game.width, this.game.height, this.game.width, this.game.height), e.Global.GAMEE && Gamee2.Gamee.initialized && !Gamee2.Gamee.ready ? (this.game.paused = !0, Gamee2.Gamee.gameReady()) : this.playAmbientSfx()
    }, i.prototype.shutdown = function () {
      Utils.AudioUtils.stopMusic()
    }, i.prototype.update = function () {
      e.Global.elapsedTime = this.time.elapsedSince(e.Global.timeBase), e.Global.deltaRatio = this.time.elapsedMS / (1e3 / 60), this._playfield.update()
    }, i.prototype.gameOver = function (t, i) {
      var a = e.Global.selectedCourt, n = !e.Global.saveData.trainingCompleted;
      this._results.playerBonusScore = Math.round(t * e.Global.selectedBall.scoreBonus), 0 != this._results.playerBonusScore && (t += this._results.playerBonusScore, Playfield.HUD.instance.score = t), this._results.playerScore = t, this._results.aiScore = i, this._results.newBestScore = a.highScore < t, this._results.coins = a.setGameResult(t, i);
      var s = e.Global.balls;
      s[4].locked && e.Global.saveData.totalScore >= 1e3 && s[4].unlock(), 0 == a.id ? n && (e.Global.saveData.trainingCompleted = !0) : 1 == a.id ? (e.Global.courts[2].locked && t > 45 && e.Global.courts[2].unlock(), s[1].locked && a.wins >= 10 && s[1].unlock(), s[2].locked && a.winsInRow >= 3 && s[2].unlock(), s[3].locked && a.games >= 50 && s[3].unlock(), s[5].locked && t >= 35 && s[5].unlock()) : (s[6].locked && a.wins >= 10 && s[6].unlock(), s[7].locked && a.winsInRow >= 3 && s[7].unlock()), 15 == e.Global.saveData.totalGames && e.Global.unlockMysteryBall(), e.Global.GAMEE && Gamee2.Gamee.gameSave(), Utils.AudioUtils.playSound("applause"), this._bgShadow.revive(), 0 == a.id && n ? this._wndTrainingCompleted.show() : this._resultsPanel.show(this._results)
    }, i.prototype.showBiniBallUnlockMsg = function () {
      this._resultsPanel.hide(), this._wndBiniBallUnlocked.show()
    }, i.prototype.endGame = function () {
      e.Global.GAMEE && Gamee2.Gamee.initialized ? Gamee2.Gamee.gameOver() : e.Global.game.state.start("CourtSelection")
    }, i.prototype.resumed = function () {
      e.Global.timeBase += this.time.pauseDuration
    }, i.prototype.resized = function (e, t, i, a) {
      this._onResize.dispatch(e, t), void 0 != this._wndBiniBallUnlocked && this._wndBiniBallUnlocked.updatePosition(), void 0 != this._wndTrainingCompleted && this._wndTrainingCompleted.updatePosition(), this.updateBgShadow()
    }, i.prototype.onGameeStart = function () {
      0 != e.Global.elapsedTime && this.reset(), this.playAmbientSfx()
    }, i.prototype.reset = function () {
      e.Global.timeBase = this.time.elapsedSince(0), e.Global.elapsedTime = 0, this.tweens.removeAll(), this.time.events.removeAll(), this._playfield.reset(), this._bgShadow.kill(), this._resultsPanel.hide()
    }, i.prototype.playAmbientSfx = function () {
      this.game.device.webAudio && (this.sound.touchLocked ? e.Global.setAudioUnlockCallback(function () {
        Utils.AudioUtils.playMusic("ambient", !0)
      }, this) : Utils.AudioUtils.playMusic("ambient", !0))
    }, i.prototype.updateBgShadow = function () {
      this._bgShadow.clear(), this._bgShadow.beginFill(0, .25), this._bgShadow.drawRect(this.camera.x, this.camera.y, this.camera.width, this.camera.height), this._bgShadow.endFill()
    }, i
  }(Phaser.State);
  e.Play = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments), this._ready = !1
    }

    return __extends(i, t), i.prototype.preload = function () {
      if (this.load.baseURL = "assets/", this.load.atlasJSONArray(e.Global.ATLAS_0), this.load.atlasJSONArray(e.Global.ATLAS_1), this.load.bitmapFont(e.Global.FONT_0), this.load.bitmapFont(e.Global.FONT_1), this.game.device.webAudio)this.load.audiosprite("sfx", e.Sounds.AUDIO_JSON.resources, null, e.Sounds.AUDIO_JSON), this.load.audio("ambient", ["ambient.ogg", "ambient.mp3"]); else for (var t in e.Sounds.AUDIO_JSON.spritemap)this.load.audio(t, t + ".mp3");
      e.Global.saveData = new e.SaveData, e.Global.GAMEE && (Gamee2.Gamee.onInitialized.add(function (t) {
        if (null == Gamee2.Gamee.saveState)Gamee2.Gamee.saveState = e.Global.saveData; else {
          e.Global.saveData.update(Gamee2.Gamee.saveState), Gamee2.Gamee.saveState = e.Global.saveData;
          var i = e.Global.balls[1];
          i.locked ? e.Global.saveData.totalGames >= 15 && e.Global.unlockMysteryBall() : (i.name = "Bini Ball", i.iconKey = null)
        }
        this._gameeInitialized = !0
      }, this), Gamee2.Gamee.initialize("FullScreen", ["saveState"]) && (this._gameeInitialized = !1))
    }, i.prototype.create = function () {
      if (this.game.device.webAudio) {
        var t = this.add.audioSprite("sfx");
        for (var i in e.Sounds.AUDIO_JSON.spritemap)t.sounds[i].allowMultiple = !0;
        Utils.AudioUtils.setSfxAudioSprite(t), Utils.AudioUtils.addMusic("ambient", this.add.audio("ambient"))
      } else for (var i in e.Sounds.AUDIO_JSON.spritemap) {
        var a = this.add.audio(i);
        a.allowMultiple = !0, Utils.AudioUtils.addSfxSound(i, a)
      }
    }, i.prototype.update = function () {
      (void 0 == this._gameeInitialized || this._gameeInitialized) && 0 == this._ready && (this._ready = !0, Playfield.AI.initShots(), this.startGame())
    }, i.prototype.startGame = function () {
      this.game.state.start("Play")
    }, i
  }(Phaser.State);
  e.Preload = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments)
    }

    return __extends(i, t), i.prototype.create = function () {
      this.stage.backgroundColor = 136764, this._ballSelBox = new Controls.ListBox(e.Global.game, i.BALL_SEL_X, i.BALL_SEL_Y, i.BALL_SEL_WIDTH, this.camera.height - i.BALL_SEL_Y - i.BALL_SEL_BOT_OFFSET, i.BALL_SEL_CARD_H, i.BALL_SEL_CARD_PADDING, BallSelection.BallLsbItem), this._ballSelBox.connectScrollBar(new e.ScrollBar, 10), this._ballSelBox.content = e.Global.balls, e.Global.game.add.image(i.COINS_X, i.COINS_Y, e.Global.ATLAS_0, "coinIcon"), this._coins = e.Global.game.add.bitmapText(i.COINS_X + 56, i.COINS_Y + 7, e.Global.FONT_0, e.Global.coins.toString(), 44), e.Global.onCoinsChange.add(this.coinsChangeClb, this);
      var t = new e.ImageButton(i.CLOSE_BTN_X, i.CLOSE_BTN_Y, e.Global.ATLAS_0, ["buttonClose"]);
      t.onClick.add(this.closeButtonClickClb, this)
    }, i.prototype.update = function () {
      this._ballSelBox.update()
    }, i.prototype.shutdown = function () {
      this._ballSelBox.destroy(), e.Global.onCoinsChange.removeAll(), e.Global.onSelectedBallChange.removeAll(), e.Global.saveData.newBallNoticeMask = 0, e.Global.GAMEE && Gamee2.Gamee.gameSave()
    }, i.prototype.resized = function (e, t) {
      this._ballSelBox.height = t - i.BALL_SEL_Y - i.BALL_SEL_BOT_OFFSET
    }, i.prototype.coinsChangeClb = function (e) {
      this._coins.text = e.toString()
    }, i.prototype.closeButtonClickClb = function () {
      e.Global.GAMEE && Gamee2.Gamee.gameSave(), Utils.AudioUtils.playSound("click"), this.game.state.start("CourtSelection")
    }, i.BALL_SEL_X = 30, i.BALL_SEL_Y = 120, i.BALL_SEL_BOT_OFFSET = 20, i.BALL_SEL_WIDTH = 580, i.BALL_SEL_CARD_H = 290, i.BALL_SEL_CARD_PADDING = 10, i.COINS_X = 30, i.COINS_Y = 20, i.CLOSE_BTN_X = 574, i.CLOSE_BTN_Y = 56, i
  }(Phaser.State);
  e.BallSelectionState = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments)
    }

    return __extends(i, t), i.prototype.create = function () {
      this.stage.backgroundColor = 136764, this._giftButton = new CourtSelection.GiftButton(i.GIFT_X, i.GIFT_Y), this._giftButton.content = e.Global.dailyGift, this._giftButton.onClick.add(this.giftButtonClickClb, this), this._courtSelBox = new Controls.ListBox(e.Global.game, i.COURT_SEL_X, i.COURT_SEL_Y, i.COURT_SEL_WIDTH, this.camera.height - i.COURT_SEL_Y - i.COURT_SEL_BOT_OFFSET, i.COURT_SEL_CARD_H, i.COURT_SEL_CARD_PADDING, CourtSelection.CourtLsbItem), this._courtSelBox.connectScrollBar(new e.ScrollBar, 10), this._courtSelBox.content = [e.Global.courts[1], e.Global.courts[2]], e.Global.game.add.image(i.COINS_X, i.COINS_Y, e.Global.ATLAS_0, "coinIcon"), e.Global.game.add.bitmapText(i.COINS_X + 56, i.COINS_Y + 7, e.Global.FONT_0, e.Global.coins.toString(), 44);
      var t = new CourtSelection.BallsButton(i.BALLS_X, i.BALLS_Y);
      t.onClick.add(this.ballsButtonClickClb, this), e.Global.GAMEE && Gamee2.Gamee.initialized && Gamee2.Gamee.gameReady()
    }, i.prototype.update = function () {
      this._giftButton.update(), this._courtSelBox.update()
    }, i.prototype.shutdown = function () {
      this._courtSelBox.destroy()
    }, i.prototype.resized = function (e, t) {
      this._courtSelBox.height = t - i.COURT_SEL_Y - i.COURT_SEL_BOT_OFFSET
    }, i.prototype.ballsButtonClickClb = function () {
      Utils.AudioUtils.playSound("click"), this.game.state.start("BallSelection")
    }, i.prototype.giftButtonClickClb = function () {
      Utils.AudioUtils.playSound("click"), this.game.state.start("DailyGift")
    }, i.GIFT_X = 438, i.GIFT_Y = 86, i.COURT_SEL_X = 30, i.COURT_SEL_Y = 170, i.COURT_SEL_BOT_OFFSET = 20, i.COURT_SEL_WIDTH = 580, i.COURT_SEL_CARD_H = 290, i.COURT_SEL_CARD_PADDING = 10, i.COINS_X = 30, i.COINS_Y = 20, i.BALLS_X = 143, i.BALLS_Y = 118, i
  }(Phaser.State);
  e.CourtSelectionState = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments)
    }

    return __extends(i, t), i.prototype.init = function (e) {
      void 0 === e && (e = "CourtSelection"), this._returnState = e
    }, i.prototype.create = function () {
      this.stage.backgroundColor = 3449581, this._timeBase = this.time.elapsedSince(0), e.Global.elapsedTime = 0, e.Global.game.add.image(i.COINS_X, i.COINS_Y, e.Global.ATLAS_0, "coinIcon"), this._coins = e.Global.game.add.bitmapText(i.COINS_X + 56, i.COINS_Y + 7, e.Global.FONT_0, e.Global.coins.toString(), i.LARGE_FONT);
      var t = new e.ImageButton(i.CLOSE_BTN_X, i.CLOSE_BTN_Y, e.Global.ATLAS_0, ["buttonClose"]);
      t.onClick.add(this.closeButtonClickClb, this);
      var a = e.Global.game.add.emitter(0, 0, 25);
      a.setXSpeed(-400, 400), a.setYSpeed(-900, -700), a.setAlpha(1, .5, 2e3), a.setScale(1, 2, 1, 2, 2e3), a.gravity = 1500, a.makeParticles(e.Global.ATLAS_0, "coinIcon", a.maxParticles, !1, !1), a.width = 100, this._giftLayer = e.Global.game.add.group(), this._giftInfoText = e.Global.game.add.bitmapText(0, 0, e.Global.FONT_0, e.Global.getText(e.eTextAsset.tapTheBox), i.NORMAL_FONT, this._giftLayer), this._giftInfoText.anchor.x = .5, this._giftBox = e.Global.game.add.image(0, this._giftLayer.height + 30, e.Global.ATLAS_0, "giftBoxLarge", this._giftLayer), this._giftBox.anchor.set(.5), this._giftBox.y += this._giftBox.height / 2, this._giftBox.inputEnabled = !0, this._giftBox.events.onInputDown.addOnce(this.giftBoxInputDownClb, this), this._giftLayer.position.set(e.Global.GAME_MAX_WIDTH / 2, (this.camera.height - this._giftLayer.height) / 2), a.position.set(this._giftLayer.x + this._giftBox.x, this._giftLayer.y + this._giftBox.y), this._coinEmitter = a, this._message = new e.TextPopupMessage(e.Global.FONT_0, 44), this._messageType = new PopupMessage.MessageType(200, 1e3, Phaser.Easing.Cubic.Out, 750, 1e3, Phaser.Easing.Linear.None), this._giftOpened = !1
    }, i.prototype.update = function () {
      if (e.Global.elapsedTime = this.time.elapsedSince(this._timeBase), this._giftOpened) {
        var t = e.Global.dailyGift.value;
        this._coins.text = (e.Global.coins - t + Math.round(Math.min(1, (e.Global.elapsedTime - this._giftOpenTime) / 1750) * t)).toString()
      }
      this._message.update()
    }, i.prototype.resumed = function () {
      this._timeBase += this.time.pauseDuration
    }, i.prototype.resized = function (e, t) {
      this._giftLayer.y = (t - this._giftLayer.height) / 2
    }, i.prototype.closeButtonClickClb = function () {
      Utils.AudioUtils.playSound("click"), this.exitScreen()
    }, i.prototype.exitScreen = function () {
      this.game.state.start(this._returnState)
    }, i.prototype.giftBoxInputDownClb = function () {
      this._giftBox.inputEnabled = !1, this.game.add.tween(this._giftInfoText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, !0);
      var t = this.game.add.tween(this._giftBox.scale).to({x: 1.3, y: 1.3}, 250, Phaser.Easing.Cubic.Out, !0, 0, 2, !0);
      t.onRepeat.add(function () {
        this._coinEmitter.explode(2e3, 5)
      }, this), t.onComplete.add(function () {
        this.game.add.tween(this._giftBox.scale).to({
          x: 2,
          y: 2
        }, 500, Phaser.Easing.Cubic.Out, !0), this.game.add.tween(this._giftBox).to({alpha: 0}, 500, Phaser.Easing.Linear.None, !0), this._message.show(e.Global.GAME_MAX_WIDTH / 2, this.camera.height / 2, "+" + e.Global.dailyGift.value, this._messageType), this.game.time.events.add(3e3, this.exitScreen, this)
      }, this), this._giftOpened = !0, this._giftOpenTime = e.Global.elapsedTime, Utils.AudioUtils.playSound("gift"),
        e.Global.dailyGift.collect()
    }, i.LARGE_FONT = 44, i.NORMAL_FONT = 42, i.COINS_X = 30, i.COINS_Y = 20, i.CLOSE_BTN_X = 574, i.CLOSE_BTN_Y = 56, i
  }(Phaser.State);
  e.DailyGift = t
}(Game || (Game = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.apply(this, arguments)
    }

    return __extends(i, t), i.prototype.init = function (t) {
      e.Global.selectedCourt;
      this.stage.backgroundColor = 136764, this._gameeGameOver = !1, this._gameResults = t
    }, i.prototype.create = function () {
      var t = e.Global.game.camera, a = e.Global.selectedCourt, n = 0 == a.id || this._gameResults.playerScore > this._gameResults.aiScore ? 0 : this._gameResults.playerScore < this._gameResults.aiScore ? 1 : -1;
      this._timeBase = this.time.elapsedSince(0), e.Global.elapsedTime = 0, n >= 0 && (this._shineFx = new Results.ShineFx(8)), e.Global.game.add.image(i.COINS_X, i.COINS_Y, e.Global.ATLAS_0, "coinIcon"), e.Global.game.add.bitmapText(i.COINS_X + 56, i.COINS_Y + 7, e.Global.FONT_0, e.Global.coins.toString(), i.LARGE_FONT), e.Global.game.add.bitmapText(e.Global.GAME_MAX_WIDTH / 2, i.COURT_NAME_Y, e.Global.FONT_0, a.title, i.LARGE_FONT).anchor.set(.5, 0);
      var s = e.Global.game.add.group();
      if (e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "resultsPl", s), e.Global.game.add.bitmapText(75, 100, e.Global.FONT_0, this._gameResults.playerScore.toString(), i.NORMAL_FONT, s).anchor.set(.5, 0), s.y = i.RES_ICON_Y, 0 == a.id)s.x = Math.round((e.Global.GAME_MAX_WIDTH - s.width) / 2), this._shineFx.setPosition(s.x + s.width / 2, s.y + s.height / 2); else {
        var o = e.Global.game.add.group();
        e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "resultsAI", o), e.Global.game.add.bitmapText(75, 100, e.Global.FONT_0, this._gameResults.aiScore.toString(), i.NORMAL_FONT, o).anchor.set(.5, 0), o.y = i.RES_ICON_Y, s.x = Math.round((e.Global.GAME_MAX_WIDTH - (2 * s.width + i.RES_ICONS_SPACING)) / 2), o.x = s.x + s.width + i.RES_ICONS_SPACING;
        var l = e.Global.game.add.image(0, i.WINNER_CAPTION_Y, e.Global.ATLAS_0, "resultsPlWin");
        l.anchor.x = .5;
        var r = i.WINNER_PRIZE_Y;
        if (0 != this._gameResults.playerBonusScore) {
          var h = e.Global.game.add.bitmapText(0, i.WINNER_PRIZE_Y, e.Global.FONT_0, e.Global.getText(e.eTextAsset.bonus) + " +" + this._gameResults.playerBonusScore, i.LARGE_FONT);
          h.x = s.x + s.width / 2 - h.width / 2, r += h.height + 40
        }
        if (1 == n) {
          var c = o.x + o.width / 2;
          l.frameName = "resultsAIWins", l.x = c, this._shineFx.setPosition(c, o.y + o.height / 2)
        } else if (0 == n) {
          var c = s.x + s.width / 2;
          l.x = c, this._shineFx.setPosition(c, s.y + s.height / 2);
          var u = e.Global.game.add.group();
          e.Global.game.add.image(0, 0, e.Global.ATLAS_0, "coinIcon", u).anchor.set(0, .5), e.Global.game.add.bitmapText(u.width + 10, 0, e.Global.FONT_0, "+" + a.prize, i.LARGE_FONT, u).anchor.set(0, .5), u.position.set(c - u.width / 2, r)
        } else l.frameName = "resultsDraw", l.x = e.Global.GAME_MAX_WIDTH / 2
      }
      if (this._gameResults.newBestScore) {
        var u = e.Global.game.add.group();
        e.Global.game.add.bitmapText(0, 0, e.Global.FONT_0, e.Global.getText(e.eTextAsset.newBest), i.LARGE_FONT, u).anchor.set(0, .5), e.Global.game.add.image(u.width + 20, 0, e.Global.ATLAS_0, "coinIcon", u).anchor.set(0, .5), e.Global.game.add.bitmapText(u.width + 10, 0, e.Global.FONT_0, "+" + i.NEW_BEST_PRIZE.toString(), i.LARGE_FONT, u).anchor.set(0, .5), u.position.set((e.Global.GAME_MAX_WIDTH - u.width) / 2, t.height - i.NEW_BEST_Y)
      }
      e.Global.game.add.bitmapText(e.Global.GAME_MAX_WIDTH / 2, t.height - i.BEST_SCORE_Y, e.Global.FONT_0, e.Global.getText(e.eTextAsset.bestScore2) + " " + e.Global.selectedCourt.highScore.toString(), i.NORMAL_FONT).anchor.set(.5, 0);
      var _ = new e.TextButton(e.Global.GAME_MAX_WIDTH / 2, t.height - i.OK_BUTTON_Y, e.Global.FONT_0, i.NORMAL_FONT, e.Global.getText(e.eTextAsset.ok));
      _.onClick.add(this.okButtonClickClb, this)
    }, i.prototype.update = function () {
      e.Global.elapsedTime = this.time.elapsedSince(this._timeBase), this._gameResults.playerScore != this._gameResults.aiScore && this._shineFx.update()
    }, i.prototype.resumed = function () {
      this._timeBase += this.time.pauseDuration
    }, i.prototype.okButtonClickClb = function () {
      this._gameeGameOver || (this._gameeGameOver = !0, Utils.AudioUtils.playSound("click"), e.Global.GAMEE && Gamee2.Gamee.initialized ? Gamee2.Gamee.gameOver() : this.game.state.start("CourtSelection"))
    }, i.LARGE_FONT = 44, i.NORMAL_FONT = 42, i.COINS_X = 30, i.COINS_Y = 20, i.COURT_NAME_Y = 110, i.RES_ICONS_SPACING = 82, i.RES_ICON_Y = 330, i.WINNER_CAPTION_Y = i.RES_ICON_Y - 60, i.WINNER_PRIZE_Y = i.RES_ICON_Y + 184, i.BEST_SCORE_Y = 220, i.NEW_BEST_Y = 250, i.NEW_BEST_PRIZE = 1, i.OK_BUTTON_Y = 110, i
  }(Phaser.State);
  e.ResultsState = t
}(Game || (Game = {}));
var Utils;
!function (e) {
  var t = function () {
    function e() {
    }

    return Object.defineProperty(e, "sfxOn", {
      get: function () {
        return e._sfxOn
      }, set: function (t) {
        e._sfxOn = t
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "musicOn", {
      get: function () {
        return e._musicOn
      }, set: function (t) {
        t ? e.resumeMusic() : e.pauseMusic(), e._musicOn = t
      }, enumerable: !0, configurable: !0
    }), e.setSfxAudioSprite = function (t) {
      e._sfxAudioSprite = t
    }, e.addSfxSound = function (t, i) {
      e._sfxSounds[t] = i
    }, e.playSound = function (t, i) {
      if (void 0 === i && (i = 1), e._sfxOn)if (null != e._sfxAudioSprite)e._sfxAudioSprite.play(t, i); else {
        var a = e._sfxSounds[t];
        void 0 != a && a.play("", 0, i)
      }
    }, e.stopSound = function (t) {
      if (null != e._sfxAudioSprite)e._sfxAudioSprite.stop(t); else {
        var i = e._sfxSounds[t];
        void 0 != i && i.stop()
      }
    }, Object.defineProperty(e, "currentMusic", {
      get: function () {
        return e._currentMusic
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "isMusicPlaying", {
      get: function () {
        if (null == e._currentMusic || 0 == e._currentMusic.length)return !1;
        var t = e._music[e._currentMusic];
        return void 0 == t ? !1 : t.isPlaying
      }, enumerable: !0, configurable: !0
    }), e.addMusic = function (t, i) {
      e._music[t] = i
    }, e.playMusic = function (t, i) {
      if (void 0 === i && (i = !0), e._musicOn && e._currentMusic != t && (e.isMusicPlaying && e.stopMusic(), t in e._music)) {
        e._currentMusic = t;
        var a = e._music[t];
        a.loop = i, a.play(), i || a.onStop.addOnce(function () {
          e.onMusicFinished.dispatch(t)
        }, this)
      }
    }, e.stopMusic = function () {
      e.isMusicPlaying && (e._music[e._currentMusic].stop(), e._currentMusic = null)
    }, e.pauseMusic = function () {
      e.isMusicPlaying && e._music[e._currentMusic].pause()
    }, e.resumeMusic = function () {
      if (null != e._currentMusic && e._currentMusic.length > 0) {
        var t = e._music[e._currentMusic];
        t.paused && t.resume()
      }
    }, e._sfxOn = !0, e._musicOn = !0, e._sfxAudioSprite = null, e._sfxSounds = [], e._music = [], e._currentMusic = null, e.onMusicFinished = new Phaser.Signal, e
  }();
  e.AudioUtils = t
}(Utils || (Utils = {}));
var Utils;
!function (e) {
  var t;
  !function (e) {
    e[e.idle = 0] = "idle", e[e.aiming = 1] = "aiming", e[e.confirmed = 2] = "confirmed"
  }(t || (t = {}));
  var i = function () {
    function e(e, t, i, a, n, s, o, l) {
      this._game = e, this._minValidDistance = t, this._autoConfirmDistance = i, this._autoConfirmOnDragStop = a, this._correctionDistance = n, this._correctionMaxDirDif = s, this._minAllowedDir = o, this._maxAllowedDir = l, this._startPos = new Phaser.Point, this._correctionPos = new Phaser.Point, this._lastPos = new Phaser.Point, this._onAimed = new Phaser.Signal, this.reset()
    }

    return Object.defineProperty(e.prototype, "onAimed", {
      get: function () {
        return this._onAimed
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "targetObject", {
      get: function () {
        return this._targetObject
      }, enumerable: !0, configurable: !0
    }), e.prototype.reset = function () {
      this._state = t.idle
    }, e.prototype.update = function () {
      var e = this._game.input.activePointer;
      if (e.isDown) {
        if (this._state == t.idle)this._state = t.aiming, this.setStartPoint(e.position), this._targetObject = e.targetObject, this._lastChangeTime = Game.Global.elapsedTime; else if (this._state == t.aiming) {
          if (this._lastPos.equals(e.position))return void(Game.Global.elapsedTime - this._lastChangeTime >= 250 && this.endAim(this._lastPos));
          this._lastPos.copyFrom(e.position), this._lastChangeTime = Game.Global.elapsedTime;
          var i = this._correctionPos.distance(e.position);
          if (i >= this._correctionDistance) {
            var a = this._correctionPos.angle(e.position, !0);
            null == this._curDir ? this._curDir = a : (Math.abs(this._curDir - a) > this._correctionMaxDirDif ? this.setStartPoint(this._correctionPos, a) : this._curDir = this._startPos.angle(e.position, !0), this._correctionPos.copyFrom(e.position))
          }
          this._autoConfirmDistance > 0 && (i = this._startPos.distance(e.position), i >= this._autoConfirmDistance && this.endAim(e.position, i))
        }
      } else this._state == t.aiming ? this.endAim(e.position) : this._state == t.confirmed && (this._state = t.idle)
    }, e.prototype.setStartPoint = function (e, t) {
      void 0 === t && (t = null), this._startPos.copyFrom(e), this._correctionPos.copyFrom(e), this._lastPos.copyFrom(e), this._curDir = t
    }, e.prototype.endAim = function (e, i) {
      return void 0 === i && (i = 0), 0 == i && (i = this._startPos.distance(e)), this._minValidDistance <= 0 || this._minValidDistance <= i ? (this._state = t.confirmed, this._curDir = this._startPos.angle(e, !0), this._onAimed.dispatch(this._startPos, this._curDir, i, this._targetObject), !0) : (this._state = t.idle, !1)
    }, e
  }();
  e.DragAim = i
}(Utils || (Utils = {}));
var Utils;
!function (e) {
  var t = function () {
    function e(e, t, i) {
      void 0 === e && (e = void 0), this._objectType = e, this._objectCreateFnc = t, this._objectCreateFncThis = i, this._actObjects = new Collections.LinkedList, this._inactObjects = new Collections.LinkedList
    }

    return Object.defineProperty(e.prototype, "activeObjects", {
      get: function () {
        return this._actObjects
      }, enumerable: !0, configurable: !0
    }), e.prototype.reset = function () {
      for (; !this._actObjects.isEmpty;)this.deactivateObject(this._actObjects.elementAtIndex(0))
    }, e.prototype.activateObject = function () {
      var e;
      return e = this._inactObjects.isEmpty ? void 0 != this._objectCreateFnc ? this._objectCreateFnc.call(this._objectCreateFncThis) : new this._objectType : this._inactObjects.removeElementAtIndex(0), this._actObjects.add(e), e
    }, e.prototype.deactivateObject = function (e) {
      e.kill && e.kill(), this._actObjects.remove(e) && this._inactObjects.add(e)
    }, e.prototype.updateObjects = function () {
      for (var e = [], t = 0; t < arguments.length; t++)e[t - 0] = arguments[t];
      this._actObjects.forEach(this.updateObjectsInt, this, e)
    }, e.prototype.updateObjectsInt = function (e) {
      for (var t = [], i = 1; i < arguments.length; i++)t[i - 1] = arguments[i];
      return e.update && (e.update(t) || this.deactivateObject(e)), !0
    }, e
  }();
  e.GameObjectCollection = t
}(Utils || (Utils = {}));
var Utils;
!function (e) {
  var t = function () {
    function e() {
      this.kineticMovement = !0, this.timeConstantScroll = 325, this.horizontalScroll = !1, this.verticalScroll = !1, this.deltaWheel = 40
    }

    return e
  }();
  e.KineticScrollingSettings = t;
  var i = function () {
    function e(e, i, a) {
      this._pressed = !1, this._dragging = !1, this._autoScrollX = !1, this._autoScrollY = !1, this._directionWheel = 0, this._game = e, this._settings = new t, this._settings.horizontalScroll = i, this._settings.verticalScroll = a, e.input.onDown.add(this.beginMove, this), e.input.addMoveCallback(this.move, this), e.input.onUp.add(this.endMove, this), e.input.mouse.mouseWheelCallback = this.mouseWheel.bind(this), this._x = 0, this._y = 0, this._onPosChange = new Phaser.Signal
    }

    return Object.defineProperty(e.prototype, "game", {
      get: function () {
        return this._game
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "settings", {
      get: function () {
        return this._settings
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "area", {
      get: function () {
        return this._area
      }, set: function (e) {
        this._area = e
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "x", {
      get: function () {
        return this._x
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "y", {
      get: function () {
        return this._y
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e.prototype, "onPosChange", {
      get: function () {
        return this._onPosChange
      }, enumerable: !0, configurable: !0
    }), e.prototype.destroy = function () {
      this._game.input.onDown.remove(this.beginMove, this), this._game.input.deleteMoveCallback(this.move, this), this._game.input.onUp.remove(this.endMove, this), this._game.input.mouse.mouseWheelCallback = null
    }, e.prototype.update = function () {
      var e = Date.now() - this._timeStamp;
      this._velocityWheelXAbs = Math.abs(this._velocityWheelX), this._velocityWheelYAbs = Math.abs(this._velocityWheelY);
      var t = this._x, i = this._y;
      if (this._autoScrollX && 0 != this._amplitudeX) {
        var a = -this._amplitudeX * Math.exp(-e / this._settings.timeConstantScroll);
        if (a > .5 || -.5 > a) {
          this._targetX - a
        } else this._autoScrollX = !1, t = this._targetX
      }
      if (this._autoScrollY && 0 != this._amplitudeY) {
        var a = -this._amplitudeY * Math.exp(-e / this._settings.timeConstantScroll);
        a > .5 || -.5 > a ? i = this._targetY - a : (this._autoScrollY = !1, i = this._targetY)
      }
      this._autoScrollX || this._autoScrollY || (this._dragging = !1), this._settings.horizontalScroll && this._velocityWheelXAbs > .1 && (this._dragging = !0, this._amplitudeX = 0, this._autoScrollX = !1, t -= this._velocityWheelX, this._velocityWheelX *= .95), this._settings.verticalScroll && this._velocityWheelYAbs > .1 && (this._dragging = !0, this._autoScrollY = !1, i -= this._velocityWheelY, this._velocityWheelY *= .95), (t != this._x || i != this._y) && this.updatePosition(this._x - t, this._y - i)
    }, e.prototype.beginMove = function (e) {
      (void 0 == this._area || null == this._area || this._area.contains(e.x, e.y)) && (this._pressed = !0, this._timeStamp = Date.now(), this._startX = e.x, this._startY = e.y, this._velocityX = this._velocityY = this._amplitudeX = this._amplitudeY = 0)
    }, e.prototype.move = function (e) {
      if (this._pressed) {
        var t = Date.now(), i = t - this._timeStamp;
        this._timeStamp = t;
        var a = 0, n = 0;
        this._settings.horizontalScroll && (a = e.x - this._startX, 0 != a && (this._dragging = !0, this._startX = e.x), this._velocityX = .8 * (1e3 * a / (1 + i)) + .2 * this._velocityX), this._settings.verticalScroll && (n = e.y - this._startY, 0 != n && (this._dragging = !0, this._startY = e.y), this._velocityY = .8 * (1e3 * n / (1 + i)) + .2 * this._velocityY), this.updatePosition(a, n)
      }
    }, e.prototype.endMove = function () {
      if (this._pressed && (this._pressed = !1, this._autoScrollX = !1, this._autoScrollY = !1, this._settings.kineticMovement)) {
        var e = Date.now(), t = e - this._timeStamp;
        t > 100 || (this._timeStamp = e, this._game.input.activePointer.withinGame ? ((this._velocityX > 10 || this._velocityX < -10) && (this._amplitudeX = .8 * this._velocityX, this._targetX = Math.round(this._x - this._amplitudeX), this._autoScrollX = !0), (this._velocityY > 10 || this._velocityY < -10) && (this._amplitudeY = .8 * this._velocityY, this._targetY = Math.round(this._y - this._amplitudeY), this._autoScrollY = !0)) : (this._velocityWheelXAbs = Math.abs(this._velocityWheelX), this._velocityWheelYAbs = Math.abs(this._velocityWheelY), this._settings.horizontalScroll && this._velocityWheelXAbs < .1 && (this._autoScrollX = !0), this._settings.verticalScroll && this._velocityWheelYAbs < .1 && (this._autoScrollY = !0)))
      }
    }, e.prototype.mouseWheel = function () {
      if ((this._settings.horizontalScroll || this._settings.verticalScroll) && (void 0 == this._area || null == this._area || this._area.contains(this._game.input.activePointer.x, this._game.input.activePointer.y))) {
        event.preventDefault();
        var e = 120 * this._game.input.mouse.wheelDelta / this._settings.deltaWheel;
        this._directionWheel != this._game.input.mouse.wheelDelta && (this._velocityWheelX = 0, this._velocityWheelY = 0, this._directionWheel = this._game.input.mouse.wheelDelta), this._settings.verticalScroll ? (this._autoScrollY = !1, this._velocityWheelY += e) : this._settings.horizontalScroll && (this._autoScrollX = !1, this._velocityWheelX += e)
      }
    }, e.prototype.updatePosition = function (e, t) {
      this._x -= e, this._y -= t, this._onPosChange.dispatch(e, t, this._x, this._y)
    }, e
  }();
  e.KineticScrolling = i
}(Utils || (Utils = {}));
var Game;
!function (e) {
  var t = function (t) {
    function i() {
      t.call(this, {
        width: 128,
        height: 128,
        renderer: Phaser.AUTO,
        parent: "content",
        transparent: !1,
        antialias: !0,
        physicsConfig: null,
        forceSetTimeOut: !1,
        preserveDrawingBuffer: !0
      }), this.state.add("Boot", e.Boot), this.state.add("Preload", e.Preload), this.state.add("CourtSelection", e.CourtSelectionState), this.state.add("BallSelection", e.BallSelectionState), this.state.add("Play", e.Play), this.state.add("DailyGift", e.DailyGift), this.state.start("Boot"), e.Global.GAMEE && (Gamee2.Gamee.onStart.add(this.onGameeStart, this), Gamee2.Gamee.onPause.add(this.onGameePause, this), Gamee2.Gamee.onResume.add(this.onGameeResume, this), Gamee2.Gamee.onMute.add(this.onGameeMute, this), Gamee2.Gamee.onUnmute.add(this.onGameeUnmute, this))
    }

    return __extends(i, t), i.prototype.onGameeStart = function () {
      this.paused = !1;
      var t = this.state.getCurrentState();
      t instanceof e.Play ? t.onGameeStart() : this.state.start("Play")
    }, i.prototype.onGameePause = function () {
      Utils.AudioUtils.pauseMusic(), this.paused = !0
    }, i.prototype.onGameeResume = function () {
      this.paused = !1, Utils.AudioUtils.resumeMusic()
    }, i.prototype.onGameeMute = function () {
      Utils.AudioUtils.sfxOn = !1, Utils.AudioUtils.musicOn = !1
    }, i.prototype.onGameeUnmute = function () {
      Utils.AudioUtils.sfxOn = !0, Utils.AudioUtils.musicOn = !0
    }, i
  }(Phaser.Game);
  e.Game = t
}(Game || (Game = {}));
var Gamee2;
!function (e) {
  !function (e) {
    e[e.none = 0] = "none", e[e.ok = 1] = "ok", e[e.inProgress = 2] = "inProgress", e[e.error = 3] = "error"
  }(e.eInitState || (e.eInitState = {}));
  var t = e.eInitState, i = function () {
    function e() {
    }

    return Object.defineProperty(e, "onInitialized", {
      get: function () {
        return this._onInitialized
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "onStart", {
      get: function () {
        return this._onStart
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "onPause", {
      get: function () {
        return this._onPause
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "onResume", {
      get: function () {
        return this._onResume
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "onMute", {
      get: function () {
        return this._onMute
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "onUnmute", {
      get: function () {
        return this._onUnmute
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "initState", {
      get: function () {
        return this._initState
      }, enumerable: !0, configurable: !0
    }), Object.defineProperty(e, "initialized", {
      get: function () {
        return this._initState == t.ok
      }, enumerable: !0, configurable: !0
    }), e.initialize = function (i, a) {
      if (e._initState === t.none) {
        if (void 0 === window.gamee)return e._initState = t.error, console.log("window.gamee doesn't exist"), !1;
        e._initState = t.inProgress, window.gamee.gameInit(i, {}, a, function (i, n) {
          if (void 0 === i || null === i) {
            if (e._initState = t.ok, a.indexOf("saveState") >= 0 && void 0 != n.saveState && null != n.saveState && "string" == typeof n.saveState && 0 != n.saveState.length)try {
              e.saveState = JSON.parse(n.saveState)
            } catch (s) {
            }
            window.gamee.emitter.addEventListener("start", function () {
              e.onStart.dispatch()
            }), window.gamee.emitter.addEventListener("pause", function () {
              e.onPause.dispatch()
            }), window.gamee.emitter.addEventListener("resume", function () {
              e.onResume.dispatch()
            }), window.gamee.emitter.addEventListener("mute", function () {
              e.onMute.dispatch()
            }), window.gamee.emitter.addEventListener("unmute", function () {
              e.onUnmute.dispatch()
            })
          } else e._initState = t.error, console.log(i);
          e.onInitialized.dispatch(e._initState)
        })
      }
      return !0
    }, Object.defineProperty(e, "ready", {
      get: function () {
        return e._ready
      }, enumerable: !0, configurable: !0
    }), e.gameReady = function () {
      e._initState != t.ok || e._ready || window.gamee.gameReady(function (t) {
        null == t ? e._ready = !0 : console.log(t)
      })
    }, e.gameOver = function () {
      e._initState == t.ok && e._ready && window.gamee.gameOver()
    }, e.gameSave = function () {
      e._initState == t.ok && e._ready && window.gamee.gameSave(e.saveState)
    }, Object.defineProperty(e, "score", {
      get: function () {
        return e._score
      }, set: function (i) {
        e._score = i, e._initState == t.ok && window.gamee.updateScore(i)
      }, enumerable: !0, configurable: !0
    }), e._onInitialized = new Phaser.Signal, e._onStart = new Phaser.Signal, e._onPause = new Phaser.Signal, e._onResume = new Phaser.Signal, e._onMute = new Phaser.Signal, e._onUnmute = new Phaser.Signal, e.saveState = null, e._initState = t.none, e._ready = !1, e._score = 0, e
  }();
  e.Gamee = i
}(Gamee2 || (Gamee2 = {}));
var Game;
!function (e) {
  var t = function () {
    function e() {
    }

    return e.AUDIO_JSON = {
      resources: ["sfx.ogg", "sfx.mp3"],
      spritemap: {
        applause: {start: 0, end: 3.047981859410431, loop: !1},
        bounceFloor: {start: 5, end: 5.4577097505668934, loop: !1},
        bounceHoop: {start: 7, end: 7.357845804988662, loop: !1},
        click: {start: 9, end: 9.095011337868481, loop: !1},
        successfulShot: {start: 11, end: 11.285986394557824, loop: !1},
        payment: {start: 13, end: 14.182789115646258, loop: !1},
        perfectShot: {start: 16, end: 16.602993197278913, loop: !1},
        shoot: {start: 18, end: 18.155260770975058, loop: !1},
        siren: {start: 20, end: 21.484308390022676, loop: !1},
        tick: {start: 23, end: 23.120226757369615, loop: !1},
        powerUp: {start: 25, end: 25.49732426303855, loop: !1},
        gift: {start: 27, end: 28.511496598639457, loop: !1},
        fireBall1: {start: 30, end: 31.40108843537415, loop: !1}
      }
    }, e
  }();
  e.Sounds = t
}(Game || (Game = {}));
