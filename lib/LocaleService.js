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
function getLocaleFromResources(id) {
  if (!initLocale) {
    initLocaleResources();
    initLocale = true;
  }
  return lr[id];
}
var r1 = / |,|\$|€|£|¥|'|٬|،| /g;
var r2 = / |\.|\$|€|£|¥|'|٬|،| /g;
var r3 = /,/g;
var DefaultLocaleService = (function () {
  function DefaultLocaleService() {
    this.locale = this.locale.bind(this);
    this.getZeroCurrencyByLanguage = this.getZeroCurrencyByLanguage.bind(this);
    this.getZeroCurrency = this.getZeroCurrency.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.formatInteger = this.formatInteger.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.format = this.format.bind(this);
  }
  DefaultLocaleService.prototype.locale = function (id) {
    var locale = getLocaleFromResources(id);
    if (!locale) {
      var newId = ShortLocaleMap_1.shortLocaleMap[id];
      if (!newId) {
        return null;
      }
      locale = getLocaleFromResources(newId);
    }
    return locale;
  };
  DefaultLocaleService.prototype.getZeroCurrencyByLanguage = function (language) {
    return this.getZeroCurrency(this.locale(language));
  };
  DefaultLocaleService.prototype.getZeroCurrency = function (locale) {
    if (locale) {
      if (locale.decimalDigits <= 0) {
        return '0';
      }
      else {
        var start = '0' + locale.decimalSeparator;
        var padLength = start.length + locale.decimalDigits;
        return padRight(start, padLength, '0');
      }
    }
    else {
      return '0.00';
    }
  };
  DefaultLocaleService.prototype.formatCurrency = function (value, currencyCode, locale, includingCurrencySymbol) {
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
      v = _formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      v = _formatNumber(value, currency.b, '.', ',');
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
      return _formatNumber(value, 0, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      return _formatNumber(value, 0, '.', ',');
    }
  };
  DefaultLocaleService.prototype.formatNumber = function (value, scale, locale) {
    if (locale) {
      return _formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    }
    else {
      return _formatNumber(value, scale, '.', ',');
    }
  };
  DefaultLocaleService.prototype.format = function (v, format, locale) {
    var f = _format(v, format);
    if (locale) {
      if (locale.decimalSeparator !== '.') {
        f = f.replace('.', '|');
        f = f.replace(r3, locale.groupSeparator);
        f = f.replace('|', locale.decimalSeparator);
      }
      else if (locale.groupSeparator !== ',') {
        f = f.replace(r3, locale.groupSeparator);
      }
      return f;
    }
    else {
      return f;
    }
  };
  return DefaultLocaleService;
}());
exports.DefaultLocaleService = DefaultLocaleService;
function parseNumber(value, locale, scale) {
  if (!locale) {
    locale = this.getLocale('en-US');
  }
  if (locale.decimalSeparator === '.') {
    var n2 = value.replace(r1, '');
    if (isNaN(n2)) {
      return null;
    }
    else {
      return round(n2, scale);
    }
  }
  else {
    var n1 = value.replace(r2, '');
    var n2 = n1.replace(locale.groupSeparator, '.');
    if (isNaN(n2)) {
      return null;
    }
    else {
      return round(n2, scale);
    }
  }
}
exports.parseNumber = parseNumber;
function padRight(str, length, pad) {
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
}
function round(v, scale) {
  return (scale ? parseFloat(v.toFixed(scale)) : v);
}
function _formatNumber(v, n, d, g) {
  if (!v) {
    return '';
  }
  if (!g && !d) {
    g = ',';
    d = '.';
  }
  var s = (n === 0 || n ? v.toFixed(n) : v.toString());
  var x = s.split('.', 2);
  var y = x[0];
  var a = [];
  var l = y.length - 1;
  for (var k = 0; k < l; k++) {
    a.push(y[l - k]);
    if ((k + 1) % 3 === 0) {
      a.push(g);
    }
  }
  a.push(y[0]);
  if (x.length === 1) {
    return a.reverse().join('');
  }
  else {
    return a.reverse().join('') + d + x[1];
  }
}
function _format(a, b) {
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
}
