"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrencyResources_1 = require("./CurrencyResources");
var initCurrency = false;
var cr = {};
function initCurrencyResources() {
  var keys = Object.keys(CurrencyResources_1.currencyResources);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var x = CurrencyResources_1.currencyResources[key];
    var currency = {
      currencyCode: key,
      decimalDigits: (x.b ? x.b : 2),
      currencySymbol: x.c
    };
    cr[key] = currency;
  }
}
var DefaultCurrencyService = (function () {
  function DefaultCurrencyService() {
  }
  DefaultCurrencyService.prototype.getCurrency = function (currencyCode) {
    if (!currencyCode) {
      return null;
    }
    var code = currencyCode.toUpperCase();
    if (!initCurrency) {
      initCurrencyResources();
      initCurrency = true;
    }
    var c = cr[code];
    return c;
  };
  return DefaultCurrencyService;
}());
exports.DefaultCurrencyService = DefaultCurrencyService;
