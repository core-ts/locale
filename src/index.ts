import { currencies } from './currencies';
import { locales } from './locales';
import { map } from './map';

let initLocale = false;

interface LocaleMap {
  [key: string]: Locale;
}
const lr: LocaleMap = {};

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
  id: string;
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

function initLocaleResources(): void {
  const keys = Object.keys(locales);
  for (const key of keys) {
    const x: LocaleAlias = locales[key];
    const l: Locale = {
      id: key,
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
function getLocaleFromResources(i: string): Locale|undefined {
  if (!initLocale) {
    initLocaleResources();
    initLocale = true;
  }
  return lr[i];
}
export function getLocale(l: string): Locale|undefined {
  let lc = getLocaleFromResources(l);
  if (!lc) {
    const newId = map[l];
    if (!newId) {
      return undefined;
    }
    lc = getLocaleFromResources(newId);
  }
  return lc;
}
export function getLocaleId(lang: string): string|undefined {
  const i = map[lang];
  return i;
}

let initCurrency = false;

interface CurrencyMap {
  [key: string]: Currency;
}
const cr: CurrencyMap = {};

interface CurrencyAlias {
  a?: string;
  b: number;
  c: string;
}

export interface Currency {
  code: string;
  decimalDigits: number;
  symbol: string;
}

function initCurrencyResources(): void {
  const keys = Object.keys(currencies);
  for (const key of keys) {
    const x: CurrencyAlias = currencies[key];
    const c: Currency = {
      code: key,
      decimalDigits: (x.b !== undefined ? x.b : 2),
      symbol: x.c
    };
    cr[key] = c;
  }
}

export function getCurrency(currencyCode: string): Currency|undefined {
  if (!currencyCode) {
    return undefined;
  }
  const code = currencyCode.toUpperCase();
  if (!initCurrency) {
    initCurrencyResources();
    initCurrency = true;
  }
  const c = cr[code];
  return c;
}

export const enLocale: Locale = {
  id: "en-US",
  countryCode: "US",
  dateFormat: "M/d/yyyy",
  firstDayOfWeek: 1,
  decimalSeparator: ".",
  groupSeparator: ",",
  decimalDigits: 2,
  currencyCode: "USD",
  currencySymbol: "$",
  currencyPattern: 0,
}

export const usd: Currency = {
  code: "USD",
  symbol: "$",
  decimalDigits: 2
}

// tslint:disable-next-line:class-name
export class resources {
  static defaultLocale = enLocale
  static defaultCurrency = usd
}

export function getDateFormat(lang: string): string {
  const locale = getLocale(lang)
  if (locale) {
    return locale.dateFormat
  }
  return resources.defaultLocale.dateFormat
}
export function getCurrencyDecimalDigits(currencyCode?: string): number {
  if (!currencyCode) {
    return resources.defaultCurrency.decimalDigits
  }
  const currency = getCurrency(currencyCode)
  if (currency) {
    return currency.decimalDigits
  }
  return resources.defaultCurrency.decimalDigits
}
