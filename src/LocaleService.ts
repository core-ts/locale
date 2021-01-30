import {currencyResources} from './CurrencyResources';
import {localeResources} from './LocaleResources';
import {shortLocaleMap} from './ShortLocaleMap';

let initLocale = false;
const lr: any = {};

interface CurrencyAlias {
  a?: string;
  b: number;
  c: string;
}

interface LocaleAlias {
  a?: string;
  b: string;
  c: string;
  d: number;
  e: string;
  f: string;
  g: number;
  h: string;
  i: string;
  j: number;
  k?: string;
}

export interface Locale {
  id?: string;
  countryCode: string;
  dateFormat: string;
  firstDayOfWeek: number;
  decimalSeparator: string;
  groupSeparator: string;
  decimalDigits: number;
  currencyCode: string;
  currencySymbol: string;
  currencyPattern: number;
  currencySample?: string;
}

function initLocaleResources() {
  const keys = Object.keys(localeResources);
  for (const key of keys) {
    const x: LocaleAlias = localeResources[key];
    const locale: Locale = {
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
function getLocaleFromResources(id: string): Locale {
  if (!initLocale) {
    initLocaleResources();
    initLocale = true;
  }
  return lr[id];
}
export interface LocaleService {
  locale(id: string): Locale;
  getZeroCurrencyByLanguage(language: string): string;
  getZeroCurrency(locale: Locale): string;
  formatCurrency(value: any, currencyCode: string, locale: Locale, includingCurrencySymbol?: boolean): string;
  formatInteger(value: any, locale: Locale): string;
  formatNumber(value: number, scale: number, locale: Locale): string;
  format(v: number, format: string, locale: Locale): string;
}
const r1 = / |,|\$|€|£|¥|'|٬|،| /g;
const r2 = / |\.|\$|€|£|¥|'|٬|،| /g;
const r3 = /,/g;
export class DefaultLocaleService implements LocaleService {
  constructor() {
    this.locale = this.locale.bind(this);
    this.getZeroCurrencyByLanguage = this.getZeroCurrencyByLanguage.bind(this);
    this.getZeroCurrency = this.getZeroCurrency.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.formatInteger = this.formatInteger.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.format = this.format.bind(this);
  }

  locale(id: string): Locale {
    let locale = getLocaleFromResources(id);
    if (!locale) {
      const newId = shortLocaleMap[id];
      if (!newId) {
        return null;
      }
      locale = getLocaleFromResources(newId);
    }
    return locale;
  }

  getZeroCurrencyByLanguage(language: string): string {
    return this.getZeroCurrency(this.locale(language));
  }

  getZeroCurrency(locale: Locale): string {
    if (locale) {
      if (locale.decimalDigits <= 0) {
        return '0';
      } else {
        const start = '0' + locale.decimalSeparator;
        const padLength = start.length + locale.decimalDigits;
        return padRight(start, padLength, '0');
      }
    } else  {
      return '0.00';
    }
  }

  formatCurrency(value: number, currencyCode: string, locale?: Locale, includingCurrencySymbol?: boolean): string {
    if (!value) {
      return '';
    }
    if (!currencyCode) {
      currencyCode = 'USD';
    }

    currencyCode = currencyCode.toUpperCase();
    let currency: CurrencyAlias = currencyResources[currencyCode];
    if (!currency) {
      currency = currencyResources['USD'];
    }
    let v: string;
    if (locale) {
      // const scale = (locale.decimalDigits && locale.decimalDigits >= 0 ? locale.decimalDigits : 2);
      const scale = currency.b;
      v = _formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    } else {
      v = _formatNumber(value, currency.b, '.', ',');
    }
    if (locale && includingCurrencySymbol) {
      const symbol = (locale.currencyCode === currencyCode ? locale.currencySymbol : currency.c);
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
  }

  formatInteger(value: number, locale: Locale): string {
    if (locale) {
      return _formatNumber(value, 0, locale.decimalSeparator, locale.groupSeparator);
    } else {
      return _formatNumber(value, 0, '.', ',');
    }
  }

  formatNumber(value: number, scale: number, locale: Locale): string {
    if (locale) {
      return _formatNumber(value, scale, locale.decimalSeparator, locale.groupSeparator);
    } else {
      return _formatNumber(value, scale, '.', ',');
    }
  }

  format(v: number, format: string, locale: Locale): string {
    let f = _format(v, format);
    if (locale) {
      if (locale.decimalSeparator !== '.') {
        f = f.replace('.', '|');
        f = f.replace(r3, locale.groupSeparator);
        f = f.replace('|', locale.decimalSeparator);
      } else if (locale.groupSeparator !== ',') {
        f = f.replace(r3, locale.groupSeparator);
      }
      return f;
    } else {
      return f;
    }
  }
}
export function parseNumber(value: string, locale?: Locale, scale?: number): number {
  if (!locale) {
    locale = this.getLocale('en-US');
  }
  if (locale.decimalSeparator === '.') {
    const n2: any = value.replace(r1, '');
    if (isNaN(n2)) {
      return null;
    } else {
      return round(n2, scale);
    }
  } else {
    const n1 = value.replace(r2, '');
    const n2: any = n1.replace(locale.groupSeparator, '.');
    if (isNaN(n2)) {
      return null;
    } else {
      return round(n2, scale);
    }
  }
}
function padRight(str: string, length: number, pad: string): string {
  if (!str) {
    return str;
  }
  if (typeof str !== 'string') {
    str = '' + str;
  }
  if (str.length >= length) {
    return str;
  }
  let str2 = str;
  if (!pad) {
    pad = ' ';
  }
  while (str2.length < length) {
    str2 = str2 + pad;
  }
  return str2;
}
function round(v: number, scale?: number): number {
  return (scale ? parseFloat(v.toFixed(scale)) : v);
}
function _formatNumber(v: number, n: number, d: string, g: string): string {
  if (!v) {
    return '';
  }
  if (!g && !d) {
    g = ',';
    d = '.';
  }
  const s = (n === 0 || n ? v.toFixed(n) : v.toString());
  const x = s.split('.', 2);
  const y = x[0];
  const a = [];
  const l = y.length - 1;
  for (let k = 0; k < l; k++) {
    a.push(y[l - k]);
    if ((k + 1) % 3 === 0) {
      a.push(g);
    }
  }
  a.push(y[0]);
  if (x.length === 1) {
    return a.reverse().join('');
  } else {
    return a.reverse().join('') + d + x[1];
  }
}
/* tslint:disable */
function _format(a: any, b: any): string {
  let j: any, e: any, h: any, c: any;
  a = a + '';
  if (a == 0 || a == '0') return '0';
  if (!b || isNaN(+a)) return a;
  a = b.charAt(0) == '-' ? -a : +a, j = a < 0 ? a = -a : 0, e = b.match(/[^\d\-\+#]/g), h = e &&
    e[e.length - 1] || '.', e = e && e[1] && e[0] || ',', b = b.split(h), a = a.toFixed(b[1] && b[1].length),
  a = +a + '', d = b[1] && b[1].lastIndexOf('0'), c = a.split('.');
  if (!c[1] || c[1] && c[1].length <= d) a = (+a).toFixed(d + 1);
  d = b[0].split(e); b[0] = d.join('');
  let f = b[0] && b[0].indexOf('0');
  if (f > -1) for (; c[0].length < b[0].length - f;) c[0] = '0' + c[0];
  else +c[0] == 0 && (c[0] = '');
  a = a.split('.'); a[0] = c[0];
  if (c = d[1] && d[d.length - 1].length) {
    f = '';
    for (var d = a[0], k = d.length % c, g = 0, i = d.length; g < i; g++)
      f += d.charAt(g), !((g - k + 1) % c) && g < i - c && (f += e);
    a[0] = f;
  } a[1] = b[1] && a[1] ? h + a[1] : '';
  return (j ? '-' : '') + a[0] + a[1];
}
