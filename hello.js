'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ——————————————————————————————————————————————————
// TextScramble (source: http://codepen.io/soulwire/pen/mErPAK by: Justin Windle)
// ——————————————————————————————————————————————————

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerText;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        return _this.resolve = resolve;
      });
      this.queue = [];
      for (var i = 0; i < length; i++) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from: from, to: to, start: start, end: end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
  }, {
    key: 'update',
    value: function update() {
      var output = '';
      var complete = 0;
      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _queue$i = this.queue[i];
        var from = _queue$i.from;
        var to = _queue$i.to;
        var start = _queue$i.start;
        var end = _queue$i.end;
        var char = _queue$i.char;

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += '<span class="dud">' + char + '</span>';
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }, {
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

// var phrases = ['Dear visitor,', 'This page is just a placeholder.', 'If you want to know more,', 'contact me...', 'viggoz.com'];
var phrases = ['亲爱的TMD用户', '很不幸的是', '我们的网站于2017年10月20日永久停止所有服务', '服务停止后,我们会陆续处理用户退款申请', '感谢大家的支持', '请各位加此售后qq群申请退款'];

var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
  if (counter >= phrases.length) {
    el.innerHTML = '<a href="//shang.qq.com/wpa/qunwpa?idkey=b030477c0d71c46515ca464167b3a16894cd70527afebbbb6848371a56908b47">QQ群：57794952</a>';
    return;
  }

  fx.setText(phrases[counter]).then(function () {
    setTimeout(next, 1500);
  });
  counter++;
};

next();