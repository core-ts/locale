"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currencies_1 = require("./currencies");
var locales_1 = require("./locales");
var map_1 = require("./map");
var initLocale = false;
var lr = {};
function initLocaleResources() {
  var keys = Object.keys(locales_1.locales);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var x = locales_1.locales[key];
    var l = {
      id: x.a,
      countryCode: x.b,
      dateFormat: (x.c !== undefined ? x.c : 'dd/MM/yyyy'),
      firstDayOfWeek: (x.d !== undefined ? x.d : 2),
      decimalSeparator: (x.e !== undefined ? x.e : '.'),
      groupSeparator: (x.f !== undefined ? x.f : ','),
      decimalDigits: (x.g !== undefined ? x.g : 2),
      currencyCode: (x.h !== undefined ? x.h : 'EUR'),
      currencySymbol: (x.i !== undefined ? x.i : '€'),
      currencyPattern: (x.j !== undefined ? x.j : 2),
      currencySample: x.k
    };
    lr[key] = l;
  }
}
function getLocaleFromResources(i) {
  if (!initLocale) {
    initLocaleResources();
    initLocale = true;
  }
  return lr[i];
}
function locale(l) {
  var lc = getLocaleFromResources(l);
  if (!lc) {
    var newId = map_1.map[l];
    if (!newId) {
      return undefined;
    }
    lc = getLocaleFromResources(newId);
  }
  return lc;
}
exports.locale = locale;
function id(lang) {
  var i = map_1.map[lang];
  return i;
}
exports.id = id;
var initCurrency = false;
var cr = {};
function initCurrencyResources() {
  var keys = Object.keys(currencies_1.currencies);
  for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
    var key = keys_2[_i];
    var x = currencies_1.currencies[key];
    var c = {
      code: key,
      decimalDigits: (x.b !== undefined ? x.b : 2),
      symbol: x.c
    };
    cr[key] = c;
  }
}
function currency(currencyCode) {
  if (!currencyCode) {
    return undefined;
  }
  var code = currencyCode.toUpperCase();
  if (!initCurrency) {
    initCurrencyResources();
    initCurrency = true;
  }
  var c = cr[code];
  return c;
}
exports.currency = currency;
