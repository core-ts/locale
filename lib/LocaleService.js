"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyResources_1 = require("./CurrencyResources");
var LocaleResources_1 = require("./LocaleResources");
var ShortLocaleMap_1 = require("./ShortLocaleMap");
var initLocale = false;
var lr = {};
function initLocaleResources() {
  var keys = Object.keys(LocaleResources_1.localeResources);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var x = LocaleResources_1.localeResources[key];
    var locale = {
      id: x.a,
      countryCode: x.b,
      dateFormat: (x.c ? x.c : 'dd/MM/yyyy'),
      firstDayOfWeek: (x.d ? x.d : 2),
      decimalSeparator: (x.e ? x.e : '.'),
      groupSeparator: (x.f ? x.f : ','),
      decimalDigits: (x.g ? x.g : 2),
      currencyCode: (x.h ? x.h : 'EUR'),
      currencySymbol: (x.i ? x.i : '€'),
      currencyPattern: (x.j ? x.j : 2),
      currencySample: x.k
    };
    lr[key] = locale;
  }
}
var DefaultLocaleService = (function () {
  function DefaultLocaleService() {
    this._r1 = / |,|\$|€|£|¥|'|٬|،| /g;
    this._r2 = / |\.|\$|€|£|¥|'|٬|،| /g;
    this._r3 = /,/g;
    this.parseNumber = this.parseNumber.bind(this);
    this.round = this.round.bind(this);
    this.getLocaleFromResources = this.getLocaleFromResources.bind(this);
    this._formatNumber = this._formatNumber.bind(this);
    this.padRight = this.padRight.bind(this);
    this._format = this._format.bind(this);
    this.getLocale = this.getLocale.bind(this);
    this.getLocaleOrDefault = this.getLocaleOrDefault.bind(this);
    this.getZeroCurrencyByLanguage = this.getZeroCurrencyByLanguage.bind(this);
    this.getZeroCurrency = this.getZeroCurrency.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.formatInteger = this.formatInteger.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.format = this.format.bind(this);
  }
  DefaultLocaleService.prototype.parseNumber = function (value, locale, scale) {
    if (!locale) {
      locale = this.getLocale('en-US');
    }
    if (locale.decimalSeparator === '.') {
      var n2 = value.replace(this._r1, '');
      if (isNaN(n2)) {
        return null;
      }
      else {
        return this.round(n2, scale);
      }
    }
    else {
      var n1 = value.replace(this._r2, '');
      var n2 = n1.replace(locale.groupSeparator, '.');
      if (isNaN(n2)) {
        return null;
      }
      else {
        return this.round(n2, scale);
      }
    }
  };
  DefaultLocaleService.prototype.getLocale = function (id) {
    var locale = this.getLocaleFromResources(id);
    if (!locale) {
      var newId = ShortLocaleMap_1.shortLocaleMap[id];
      if (!newId) {
        return null;
      }
      locale = this.getLocaleFromResources(newId);
    }
    return locale;
  };
  DefaultLocaleService.prototype.getLocaleOrDefault = function (id) {
    var locale = this.getLocaleFromResources(id);
    if (!locale) {
      var newId = ShortLocaleMap_1.shortLocaleMap[id];
      if (!newId) {
        return null;
      }
      locale = this.getLocaleFromResources(newId);
    }
    if (!locale) {
      locale = this.getLocaleFromResources('en-US');
    }
    return locale;
  };
  DefaultLocaleService.prototype.getLocaleFromResources = function (id) {
    if (!initLocale) {
      initLocaleResources();
      initLocale = true;
    }
    return lr[id];
  };
  DefaultLocaleService.prototype.getZeroCurrencyByLanguage = function (language) {
    return this.getZeroCurrency(this.getLocale(language));
  };
  DefaultLocaleService.prototype.getZeroCurrency = function (locale) {
    if (locale) {
      if (locale.decimalDigits <= 0) {
        return '0';
      }
      else {
        var start = '0' + locale.decimalSeparator;
        var padLength = start.length + locale.decimalDigits;
        return this.padRight(start, padLength, '0');
      }
    }
    else {
      return '0.00';
    }
  };
  DefaultLocaleService.prototype.formatCurrency = function (value, currencyCode, locale, includingCurrencySymbol) {
    if (includingCurrencySymbol === void 0) { includingCurrencySymbol = false; }
    if (!value) {
      return '';
    }
    if (!currencyCode) {
      currencyCode = 'USD';
    }
    currencyCode = currencyCode.toUpperCase();
    var currency = CurrencyResources_1.currencyResources[currencyCode];
    if (!currency) {
      currency = CurrencyResources_1.currencyResources['USD'];
    }
    var v;
    if (locale) {
      var scale = currency.b;
      v = this._formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      v = this._formatNumber(value, currency.b, '.', ',');
    }
    if (locale && includingCurrencySymbol) {
      var symbol = (locale.currencyCode === currencyCode ? locale.currencySymbol : currency.c);
      switch (locale.currencyPattern) {
        case 0:
          v = symbol + v;
          break;
        case 1:
          v = '' + v + symbol;
          break;
        case 2:
          v = symbol + ' ' + v;
          break;
        case 3:
          v = '' + v + ' ' + symbol;
          break;
        default:
          break;
      }
    }
    return v;
  };
  DefaultLocaleService.prototype.formatInteger = function (value, locale) {
    if (locale) {
      return this._formatNumber(value, 0, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      return this._formatNumber(value, 0, '.', ',');
    }
  };
  DefaultLocaleService.prototype.formatNumber = function (value, scale, locale) {
    if (locale) {
      return this._formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      return this._formatNumber(value, scale, '.', ',');
    }
  };
  DefaultLocaleService.prototype.format = function (v, format, locale) {
    var f = this._format(v, format);
    if (locale) {
      if (locale.decimalSeparator !== '.') {
        f = f.replace('.', '|');
        f = f.replace(this._r3, locale.groupSeparator);
        f = f.replace('|', locale.decimalSeparator);
      }
      else if (locale.groupSeparator !== ',') {
        f = f.replace(this._r3, locale.groupSeparator);
      }
      return f;
    }
    else {
      return f;
    }
  };
  DefaultLocaleService.prototype.padRight = function (str, length, pad) {
    if (!str) {
      return str;
    }
    if (typeof str !== 'string') {
      str = '' + str;
    }
    if (str.length >= length) {
      return str;
    }
    var str2 = str;
    if (!pad) {
      pad = ' ';
    }
    while (str2.length < length) {
      str2 = str2 + pad;
    }
    return str2;
  };
  DefaultLocaleService.prototype.round = function (v, scale) {
    if (scale === void 0) { scale = null; }
    return (scale ? parseFloat(v.toFixed(scale)) : v);
  };
  DefaultLocaleService.prototype._formatNumber = function (value, scale, decimalSeparator, groupSeparator) {
    if (!value) {
      return '';
    }
    if (!groupSeparator && !decimalSeparator) {
      groupSeparator = ',';
      decimalSeparator = '.';
    }
    var s = (scale === 0 || scale ? value.toFixed(scale) : value.toString());
    var x = s.split('.', 2);
    var y = x[0];
    var arr = [];
    var len = y.length - 1;
    for (var k = 0; k < len; k++) {
      arr.push(y[len - k]);
      if ((k + 1) % 3 === 0) {
        arr.push(groupSeparator);
      }
    }
    arr.push(y[0]);
    if (x.length === 1) {
      return arr.reverse().join('');
    }
    else {
      return arr.reverse().join('') + decimalSeparator + x[1];
    }
  };
  DefaultLocaleService.prototype._format = function (a, b) {
    var j, e, h, c;
    a = a + '';
    if (a == 0 || a == '0')
      return '0';
    if (!b || isNaN(+a))
      return a;
    a = b.charAt(0) == '-' ? -a : +a, j = a < 0 ? a = -a : 0, e = b.match(/[^\d\-\+#]/g), h = e &&
      e[e.length - 1] || '.', e = e && e[1] && e[0] || ',', b = b.split(h), a = a.toFixed(b[1] && b[1].length),
      a = +a + '', d = b[1] && b[1].lastIndexOf('0'), c = a.split('.');
    if (!c[1] || c[1] && c[1].length <= d)
      a = (+a).toFixed(d + 1);
    d = b[0].split(e);
    b[0] = d.join('');
    var f = b[0] && b[0].indexOf('0');
    if (f > -1)
      for (; c[0].length < b[0].length - f;)
        c[0] = '0' + c[0];
    else
      +c[0] == 0 && (c[0] = '');
    a = a.split('.');
    a[0] = c[0];
    if (c = d[1] && d[d.length - 1].length) {
      f = '';
      for (var d = a[0], k = d.length % c, g = 0, i = d.length; g < i; g++)
        f += d.charAt(g), !((g - k + 1) % c) && g < i - c && (f += e);
      a[0] = f;
    }
    a[1] = b[1] && a[1] ? h + a[1] : '';
    return (j ? '-' : '') + a[0] + a[1];
  };
  return DefaultLocaleService;
}());
exports.DefaultLocaleService = DefaultLocaleService;
