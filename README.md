# locale-service

A lightweight, framework-agnostic localization library for TypeScript.

A lightweight localization service that provides 103 languages, 210 locales, and 103 currencies for both frontend and backend applications.

`locale-service` provides locale metadata, currency information, and formatting utilities that work consistently across both **backend** and **frontend** applications.

It is designed for:

- Node.js
- SSR applications
- Microservices
- React
- Angular
- Vue

Unlike runtime-dependent localization APIs, `locale-service` ships with a built-in locale database, providing consistent behavior across every environment.

---

## Features

- 💰 103 built-in currencies (ISO 4217)
- 🗣 103 supported languages
- 🌍 210 built-in locales
  - 💵 Locale-aware currency formatting
  - 📅 Locale-specific date formats
  - 🔢 Locale-specific number formatting
  - 🔣 Decimal separators
  - 🔠 Thousands separators
  - 🗓 First day of week
- 🌐 Lookup by **language** (`vi`) or **locale** (`vi-VN`)
- ⚡ Fast O(1) lookup using Maps
- 🚀 Zero dependencies
- 📦 Works on both backend (Node.js, SSR, microservices) and frontend (React, Angular, Vue)

---

## Installation

```bash
npm install locale-service
```

or

```bash
yarn add locale-service
```

---

## Why locale-service?

Many applications need much more than formatting numbers and dates.

For example:

- Which currency does this locale use?
- What currency symbol should be displayed?
- Should the currency symbol appear before or after the amount?
- Should there be a space between the symbol and the amount?
- How many decimal digits should be shown?
- Which decimal separator should be used?
- Which thousands separator should be used?
- What date format should be displayed?
- What is the first day of the week?

`locale-service` provides all of this information from a single API.

---

## Lookup Locale

Retrieve locale information using a locale code.

```typescript
const locale = getLocale("vi-VN")
```

or simply using the language.

```typescript
const locale = getLocale("vi")
```

Another example:

```typescript
getLocale("en")
```

returns the default English locale.

```text
en-US
```

Both of the following are supported.

```typescript
getLocale("en")
getLocale("en-US")

getLocale("vi")
getLocale("vi-VN")

getLocale("fr")
getLocale("fr-FR")
```

Internally, `locale-service` maintains both:

- Locale Map
- Language Map

This allows applications to work regardless of whether they receive a language or a locale.

This is especially useful for:

- Browser languages
- Accept-Language HTTP headers
- User profile language preferences
- International applications

---

## Locale Information

Each locale contains everything required for localization.

```typescript
interface Locale {
    code: string
    countryCode: string
    dateFormat: string
    firstDayOfWeek: number

    decimalSeparator: string
    groupSeparator: string

    decimalDigits: number
    currencyCode: string
    currencySymbol: string
    currencyPattern: number
}
```

Example:

```typescript
const locale = getLocale("en-US")
```

| Property | Value |
|----------|-------|
| Country | US |
| Date Format | M/d/yyyy |
| Decimal Separator | . |
| Group Separator | , |
| Currency | USD |
| Currency Symbol | $ |

---

## Currency Information

Retrieve currency information independently.

```typescript
const currency = getCurrency("USD")
```

```typescript
interface Currency {
    code: string
    symbol: string
    decimalDigits: number
}
```

---

## Currency Formatting

Different countries display currencies differently.

For example, the amount `10000` becomes

| Locale | Output |
|--------|--------|
| en-US | `$10,000.00` |
| km-KH | `10,000.00៛` |
| nb-NO | `kr 10 000,00` |
| vi-VN | `10.000,00 ₫` |

To support these differences efficiently, `locale-service` defines four currency patterns.

| Pattern | Description | Example |
|---------|-------------|---------|
| 0 | Prefix | `$10,000.00` |
| 1 | Suffix | `10,000.00៛` |
| 2 | Prefix with space | `kr 10 000,00` |
| 3 | Suffix with space | `10.000,00 ₫` |

This simple model covers the vast majority of currency formatting conventions while remaining lightweight and fast.

---

## Designed for Full-Stack Applications

The same locale database is shared across frontend and backend.

This guarantees consistent formatting everywhere.

- React
- Angular
- Vue
- Node.js
- SSR
- Microservices

Your API, backend services and frontend applications all use exactly the same localization rules.

No duplicated configuration.

No inconsistent formatting.

---

## Performance

The library stores locale and currency information using `Map`.

```typescript
getLocale("vi-VN")
getCurrency("USD")
```

Both operations execute in **O(1)** time.

---

## Typical Use Cases

`locale-service` is suitable for:

- Enterprise applications
- SaaS platforms
- ERP
- CRM
- Banking systems
- Financial applications
- E-commerce
- Reporting
- Invoice generation
- PDF generation
- Excel export
- Admin dashboards

---

## Design Goals

- Framework independent
- Backend and frontend compatible
- Lightweight
- Zero dependencies
- High performance
- Simple API
- Consistent behavior
- Enterprise ready

---

## Currency list

| Code | Symbol | Decimal Digits |
|------|--------|----------------|
|AED|د.إ|2|
|AFN|؋|2|
|ALL|Lek|2|
|AMD|դր.|2|
|ARS|$|2|
|AUD|$|2|
|AZN|ман.|2|
|BAM|KM|2|
|BDT|৳|2|
|BGN|лв.|2|
|BHD|BD|3|
|BND|$|0|
|BOB|$b|2|
|BRL|R$|2|
|BYR|р.|2|
|BZD|BZ$|2|
|CAD|$|2|
|CHF|Fr.|2|
|CLP|$|2|
|CNY|¥|2|
|COP|$|2|
|CRC|₡|2|
|CSD|Дин.|2|
|CZK|Kč|2|
|DKK|kr.|2|
|DOP|RD$|2|
|DZD|DA|2|
|EEK|kr|2|
|EGP|£|2|
|ETB|Br|2|
|EUR|€|2|
|GBP|£|2|
|GEL|Lari|2|
|GTQ|Q|2|
|HKD|HK$|2|
|HNL|L.|2|
|HRK|kn|2|
|HUF|Ft|2|
|IDR|Rp|0|
|ILS|₪|2|
|INR|₹|2|
|IQD|ID|2|
|IRR|ريال|2|
|ISK|kr.|0|
|JMD|J$|2|
|JOD|د.أ|3|
|JPY|¥|0|
|KES|S|2|
|KGS|сом|2|
|KHR|៛|2|
|KRW|₩|0|
|KWD|KD|3|
|KZT|Т|2|
|LAK|₭|2|
|LBP|LL|2|
|LKR|රු.|2|
|LTL|Lt|2|
|LVL|Ls|2|
|LYD|LD|3|
|MAD|DH|2|
|MKD|ден.|2|
|MNT|₮|2|
|MOP|$|2|
|MVR|ރ.|2|
|MXN|$|2|
|MYR|RM|2|
|NIO|C$|2|
|NOK|kr|2|
|NPR|रु|2|
|NZD|$|2|
|OMR|R.O|3|
|PAB|B/.|2|
|PEN|S/.|2|
|PHP|₱|2|
|PKR|Rs|2|
|PLN|zł|2|
|PYG|Gs|2|
|QAR|QR|2|
|RON|lei|2|
|RSD|Дин.|2|
|RUB|һ.|2|
|RWF|R₣|2|
|SAR|SR|2|
|SEK|kr|2|
|SGD|$|2|
|SYP|LS|2|
|THB|฿|2|
|TJS|т.р.|2|
|TMT|m.|2|
|TND|DT|3|
|TRY|TL|2|
|TTD|TT$|2|
|TWD|NT$|2|
|UAH|₴|2|
|USD|$|2|
|UYU|$U|2|
|UZS|лв|2|
|VEF|Bs.|2|
|VND|₫|0|
|XOF|XOF|2|
|YER|﷼|2|
|ZAR|R|2|
|ZWL|Z$|2|

## Locale list

| Code | Country Code | Date Format | First Day Of Week | Decimal Separator | Group Separator | Currency Code | Currency Symbol | Currency Decimal Digits | Currency Pattern | Currency Sample | 
|------|--------------|-------------|-------------------|-------------------|-----------------|---------------|-----------------|-------------------------|------------------|-----------------|
|af-ZA|ZA|yyyy/MM/dd|1|.|,|ZAR|R|2|2|10,000.00 R|
|am-ET|ET|d/M/yyyy|1|.|,|ETB|Br|2|0|Br10,000.00|
|ar-AE|AE|dd/MM/yyyy|7|.|,|AED|د.إ|2|2|10,000.00 د.إ|
|ar-BH|BH|dd/MM/yyyy|7|.|,|BHD|BD|3|2|10,000.00 BD|
|ar-DZ|DZ|dd-MM-yyyy|7|.|,|DZD|DA|2|2|10,000.00 DA|
|ar-EG|EG|dd/MM/yyyy|7|.|,|EGP|£|2|2|10,000.00 £|
|ar-IQ|IQ|dd/MM/yyyy|7|.|,|IQD|ID|2|2|10,000.00 ID|
|ar-JO|JO|dd/MM/yyyy|7|.|,|JOD|د.أ|3|2|10,000.00 د.أ|
|ar-KW|KW|dd/MM/yyyy|7|.|,|KWD|KD|3|2|10,000.00 KD|
|ar-LB|LB|dd/MM/yyyy|2|.|,|LBP|LL|2|2|10,000.00 LL|
|ar-LY|LY|dd/MM/yyyy|7|.|,|LYD|LD|3|0|LD10,000.00|
|ar-MA|MA|dd-MM-yyyy|2|.|,|MAD|DH|2|2|10,000.00 DH|
|ar-OM|OM|dd/MM/yyyy|7|.|,|OMR|R.O|3|2|10,000.00 R.O|
|ar-QA|QA|dd/MM/yyyy|7|.|,|QAR|QR|2|2|10,000.00 QR|
|ar-SA|SA|dd/MM/yy|7|.|,|SAR|SR|2|2|10,000.00 SR|
|ar-SY|SY|dd/MM/yyyy|7|.|,|SYP|LS|2|2|10,000.00 LS|
|ar-TN|TN|dd-MM-yyyy|2|.|,|TND|DT|3|2|10,000.00 DT|
|ar-YE|YE|dd/MM/yyyy|7|.|,|YER|﷼|2|2|10,000.00 ﷼|
|arn-CL|CL|dd-MM-yyyy|1|,|.|CLP|$|2|2|10.000,00 $|
|as-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|1|10,000.00₹|
|az-Cyrl-AZ|AZ|dd.MM.yyyy|2|,| |AZN|ман.|2|3|ман.10 000,00|
|az-Latn-AZ|AZ|dd.MM.yyyy|2|,| |AZN|ман.|2|3|ман.10 000,00|
|ba-RU|RU|dd.MM.yy|2|,| |RUB|һ.|2|3|һ.10 000,00|
|be-BY|BY|dd.MM.yyyy|2|,| |BYR|р.|2|3|р.10 000,00|
|bg-BG|BG|d.M.yyyy 'г.'|2|,| |BGN|лв.|2|3|лв.10 000,00|
|bn-BD|BD|dd-MM-yy|2|.|,|BDT|৳|2|2|10,000.00 ৳|
|bn-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|bo-CN|CN|yyyy/M/d|2|.|,|CNY|¥|2|0|¥10,000.00|
|br-FR|FR|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|bs-Cyrl-BA|BA|d.M.yyyy|2|,|.|BAM|KM|2|3|KM10.000,00|
|bs-Latn-BA|BA|d.M.yyyy|2|,|.|BAM|KM|2|3|KM10.000,00|
|ca-ES|ES|dd/MM/yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|co-FR|FR|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|cs-CZ|CZ|d.M.yyyy|2|,| |CZK|Kč|2|3|Kč10 000,00|
|cy-GB|GB|dd/MM/yyyy|2|.|,|GBP|£|2|0|£10,000.00|
|da-DK|DK|dd-MM-yyyy|2|,|.|DKK|kr.|2|2|10.000,00 kr.|
|de-AT|AT|dd.MM.yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|de-CH|CH|dd.MM.yyyy|2|.|'|CHF|Fr.|2|2|10'000.00 Fr.|
|de-DE|DE|dd.MM.yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|de-LI|LI|dd.MM.yyyy|2|.|'|CHF|Fr.|2|2|10'000.00 Fr.|
|de-LU|LU|dd.MM.yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|dsb-DE|DE|d. M. yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|dv-MV|MV|dd/MM/yy|1|.|,|MVR|ރ.|2|3|ރ.10,000.00|
|el-GR|GR|d/M/yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|en-029|29|MM/dd/yyyy|2|.|,|USD|$|2|0|$10,000.00|
|en-AU|AU|d/MM/yyyy|2|.|,|AUD|$|2|0|$10,000.00|
|en-BZ|BZ|dd/MM/yyyy|1|.|,|BZD|BZ$|2|0|BZ$10,000.00|
|en-CA|CA|dd/MM/yyyy|1|.|,|CAD|$|2|0|$10,000.00|
|en-GB|GB|dd/MM/yyyy|2|.|,|GBP|£|2|0|£10,000.00|
|en-IE|IE|dd/MM/yyyy|2|.|,|EUR|€|2|0|€10,000.00|
|en-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|en-JM|JM|dd/MM/yyyy|1|.|,|JMD|J$|2|0|J$10,000.00|
|en-MY|MY|d/M/yyyy|1|.|,|MYR|RM|2|0|RM10,000.00|
|en-NZ|NZ|d/MM/yyyy|2|.|,|NZD|$|2|0|$10,000.00|
|en-PH|PH|M/d/yyyy|1|.|,|PHP|₱|2|0|₱10,000.00|
|en-SG|SG|d/M/yyyy|1|.|,|SGD|$|2|0|$10,000.00|
|en-TT|TT|dd/MM/yyyy|1|.|,|TTD|TT$|2|0|TT$10,000.00|
|en-US|US|M/d/yyyy|1|.|,|USD|$|2|0|$10,000.00|
|en-ZA|ZA|yyyy/MM/dd|1|,| |ZAR|R|2|2|10 000,00 R|
|en-ZW|ZW|M/d/yyyy|1|.|,|ZWL|Z$|2|0|Z$10,000.00|
|es-AR|AR|dd/MM/yyyy|1|,|.|ARS|$|2|2|10.000,00 $|
|es-BO|BO|dd/MM/yyyy|1|,|.|BOB|$b|2|2|10.000,00 $b|
|es-CL|CL|dd-MM-yyyy|1|,|.|CLP|$|2|2|10.000,00 $|
|es-CO|CO|dd/MM/yyyy|1|,|.|COP|$|2|2|10.000,00 $|
|es-CR|CR|dd/MM/yyyy|1|,|.|CRC|₡|2|0|₡10.000,00|
|es-DO|DO|dd/MM/yyyy|1|.|,|DOP|RD$|2|0|RD$10,000.00|
|es-EC|EC|dd/MM/yyyy|1|,|.|USD|$|2|2|10.000,00 $|
|es-ES|ES|dd/MM/yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|es-GT|GT|dd/MM/yyyy|1|.|,|GTQ|Q|2|0|Q10,000.00|
|es-HN|HN|dd/MM/yyyy|1|.|,|HNL|L.|2|2|10,000.00 L.|
|es-MX|MX|dd/MM/yyyy|1|.|,|MXN|$|2|0|$10,000.00|
|es-NI|NI|dd/MM/yyyy|1|.|,|NIO|C$|2|2|10,000.00 C$|
|es-PA|PA|MM/dd/yyyy|1|.|,|PAB|B/.|2|2|10,000.00 B/.|
|es-PE|PE|dd/MM/yyyy|1|.|,|PEN|S/.|2|2|10,000.00 S/.|
|es-PR|PR|dd/MM/yyyy|1|.|,|USD|$|2|2|10,000.00 $|
|es-PY|PY|dd/MM/yyyy|2|,|.|PYG|Gs|2|2|10.000,00 Gs|
|es-SV|SV|dd/MM/yyyy|1|.|,|USD|$|2|0|$10,000.00|
|es-US|US|M/d/yyyy|1|.|,|USD|$|2|0|$10,000.00|
|es-UY|UY|dd/MM/yyyy|2|,|.|UYU|$U|2|2|10.000,00 $U|
|es-VE|VE|dd/MM/yyyy|1|,|.|VEF|Bs.|2|2|10.000,00 Bs.|
|et-EE|EE|d.MM.yyyy|2|.| |EEK|kr|2|3|kr10 000.00|
|eu-ES|ES|yyyy/MM/dd|2|,|.|EUR|€|2|3|€10.000,00|
|fa-IR|IR|MM/dd/yyyy|7|٫|٬|IRR|ريال|2|2|10٬000٫00 ريال|
|fi-FI|FI|d.M.yyyy|2|,| |EUR|€|2|3|€10 000,00|
|fil-PH|PH|M/d/yyyy|1|.|,|PHP|₱|2|0|₱10,000.00|
|fo-FO|FO|dd-MM-yyyy|2|,|.|DKK|kr.|2|2|10.000,00 kr.|
|fr-BE|BE|d/MM/yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|fr-CA|CA|yyyy-MM-dd|1|,| |CAD|$|2|3|$10 000,00|
|fr-CH|CH|dd.MM.yyyy|2|.|'|CHF|Fr.|2|2|10'000.00 Fr.|
|fr-FR|FR|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|fr-LU|LU|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|fr-MC|MC|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|fy-NL|NL|d-M-yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|ga-IE|IE|dd/MM/yyyy|2|.|,|EUR|€|2|0|€10,000.00|
|gd-GB|GB|dd/MM/yyyy|2|.|,|GBP|£|2|0|£10,000.00|
|gl-ES|ES|dd/MM/yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|gsw-FR|FR|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|gu-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|ha-Latn-NG|NG|d/M/yyyy|1|.|,|NIO|C$|2|2|10,000.00 C$|
|he-IL|IL|dd/MM/yyyy|1|.|,|ILS|₪|2|2|10,000.00 ₪|
|hi-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|hr-BA|BA|d.M.yyyy|2|,|.|BAM|KM|2|3|KM10.000,00|
|hr-HR|HR|d.M.yyyy.|2|,|.|HRK|kn|2|3|kn10.000,00|
|hsb-DE|DE|d. M. yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|hu-HU|HU|yyyy.MM.dd.|2|,| |HUF|Ft|2|3|Ft10 000,00|
|hy-AM|AM|dd.MM.yyyy|2|.|,|AMD|դր.|2|3|դր.10,000.00|
|id-ID|ID|dd/MM/yyyy|2|,|.|IDR|Rp|0|0|Rp10.000,00|
|ig-NG|NG|d/M/yyyy|1|.|,|NIO|C$|2|2|10,000.00 C$|
|ii-CN|CN|yyyy/M/d|2|.|,|CNY|¥|2|0|¥10,000.00|
|is-IS|IS|d.M.yyyy|2|,|.|ISK|kr.|0|3|kr.10.000,00|
|it-CH|CH|dd.MM.yyyy|2|.|'|CHF|Fr.|2|2|10'000.00 Fr.|
|it-IT|IT|dd/MM/yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|iu-Cans-CA|CA|d/M/yyyy|1|.|,|CAD|$|2|0|$10,000.00|
|iu-Latn-CA|CA|d/MM/yyyy|1|.|,|CAD|$|2|0|$10,000.00|
|ja-JP|JP|yyyy/MM/dd|1|.|,|JPY|¥|0|0|¥10,000.00|
|ka-GE|GE|dd.MM.yyyy|2|,| |GEL|Lari|2|3|Lari10 000,00|
|kk-KZ|KZ|dd.MM.yyyy|2|,| |KZT|Т|2|0|Т10 000,00|
|kl-GL|GL|dd-MM-yyyy|2|,|.|DKK|kr.|2|2|10.000,00 kr.|
|km-KH|KH|yyyy-MM-dd|1|.|,|KHR|៛|2|1|10,000.00៛|
|kn-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|ko-KR|KR|yyyy-MM-dd|1|.|,|KRW|₩|0|0|₩10,000.00|
|kok-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|ky-KG|KG|dd.MM.yy|2|,| |KGS|сом|2|3|сом10 000,00|
|lb-LU|LU|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|lo-LA|LA|dd/MM/yyyy|1|.|,|LAK|₭|2|1|10,000.00₭|
|lt-LT|LT|yyyy.MM.dd|2|,|.|LTL|Lt|2|3|Lt10.000,00|
|lv-LV|LV|yyyy.MM.dd.|2|,| |LVL|Ls|2|2|10 000,00 Ls|
|mi-NZ|NZ|dd/MM/yyyy|2|.|,|NZD|$|2|0|$10,000.00|
|mk-MK|MK|dd.MM.yyyy|2|,|.|MKD|ден.|2|3|ден.10.000,00|
|ml-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|mn-MN|MN|yy.MM.dd|2|,| |MNT|₮|2|1|10 000,00₮|
|mn-Mong-CN|CN|yyyy/M/d|2|.|,|CNY|¥|2|0|¥10,000.00|
|moh-CA|CA|M/d/yyyy|1|.|,|CAD|$|2|0|$10,000.00|
|mr-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|ms-BN|BN|dd/MM/yyyy|2|,|.|BND|$|0|0|$10.000,00|
|ms-MY|MY|dd/MM/yyyy|2|.|,|MYR|RM|2|0|RM10,000.00|
|mt-MT|MT|dd/MM/yyyy|2|.|,|EUR|€|2|0|€10,000.00|
|nb-NO|NO|dd.MM.yyyy|2|,| |NOK|kr|2|2|10 000,00 kr|
|ne-NP|NP|M/d/yyyy|1|.|,|NPR|रु|2|0|रु10,000.00|
|nl-BE|BE|d/MM/yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|nl-NL|NL|d-M-yyyy|2|,|.|EUR|€|2|2|10.000,00 €|
|nn-NO|NO|dd.MM.yyyy|2|,| |NOK|kr|2|2|10 000,00 kr|
|nso-ZA|ZA|yyyy/MM/dd|1|.|,|ZAR|R|2|2|10,000.00 R|
|oc-FR|FR|dd/MM/yyyy|2|,| |EUR|€|2|3|€10 000,00|
|or-IN|IN|dd-MM-yy|1|.|,|INR|₹|2|2|10,000.00 ₹|
|pa-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|pl-PL|PL|yyyy-MM-dd|2|,| |PLN|zł|2|3|zł10 000,00|
|prs-AF|AF|dd/MM/yy|6|.|,|AFN|؋|2|0|؋10,000.00|
|ps-AF|AF|dd/MM/yy|7|٫|٬|AFN|؋|2|0|؋10٬000٫00|
|pt-BR|BR|dd/MM/yyyy|1|,|.|BRL|R$|2|2|10.000,00 R$|
|pt-PT|PT|dd-MM-yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|qut-GT|GT|dd/MM/yyyy|1|.|,|GTQ|Q|2|0|Q10,000.00|
|quz-BO|BO|dd/MM/yyyy|1|,|.|BOB|$b|2|2|10.000,00 $b|
|quz-EC|EC|dd/MM/yyyy|1|,|.|USD|$|2|2|10.000,00 $|
|quz-PE|PE|dd/MM/yyyy|1|.|,|PEN|S/.|2|2|10,000.00 S/.|
|rm-CH|CH|dd/MM/yyyy|2|.|'|CHF|Fr.|2|2|10'000.00 Fr.|
|ro-RO|RO|dd.MM.yyyy|2|,|.|RON|lei|2|3|lei10.000,00|
|ru-RU|RU|dd.MM.yyyy|2|,| |RUB|һ.|2|1|10 000,00һ.|
|rw-RW|RW|M/d/yyyy|1|,| |RWF|R₣|2|2|10 000,00 R₣|
|sa-IN|IN|dd-MM-yyyy|1|.|,|INR|₹|2|2|10,000.00 ₹|
|sah-RU|RU|MM.dd.yyyy|2|,| |RUB|һ.|2|1|10 000,00һ.|
|se-FI|FI|d.M.yyyy|2|,| |EUR|€|2|3|€10 000,00|
|se-NO|NO|dd.MM.yyyy|2|,| |NOK|kr|2|2|10 000,00 kr|
|se-SE|SE|yyyy-MM-dd|2|,|.|SEK|kr|2|3|kr10.000,00|
|si-LK|LK|yyyy-MM-dd|2|.|,|LKR|රු.|2|2|10,000.00 රු.|
|sk-SK|SK|d. M. yyyy|2|,| |EUR|€|2|3|€10 000,00|
|sl-SI|SI|d.M.yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|sma-NO|NO|dd.MM.yyyy|2|,| |NOK|kr|2|2|10 000,00 kr|
|sma-SE|SE|yyyy-MM-dd|2|,|.|SEK|kr|2|3|kr10.000,00|
|smj-NO|NO|dd.MM.yyyy|2|,| |NOK|kr|2|2|10 000,00 kr|
|smj-SE|SE|yyyy-MM-dd|2|,|.|SEK|kr|2|3|kr10.000,00|
|smn-FI|FI|d.M.yyyy|2|,| |EUR|€|2|3|€10 000,00|
|sms-FI|FI|d.M.yyyy|2|,| |EUR|€|2|3|€10 000,00|
|sq-AL|AL|yyyy-MM-dd|2|,|.|ALL|Lek|2|1|10.000,00Lek|
|sr-Cyrl-BA|BA|d.M.yyyy|2|,|.|BAM|KM|2|3|KM10.000,00|
|sr-Cyrl-CS|CS|d.M.yyyy|2|,|.|CSD|Дин.|2|3|Дин.10.000,00|
|sr-Cyrl-ME|ME|d.M.yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|sr-Cyrl-RS|RS|d.M.yyyy|2|,|.|RSD|Дин.|2|3|Дин.10.000,00|
|sr-Latn-BA|BA|d.M.yyyy|2|,|.|BAM|KM|2|3|KM10.000,00|
|sr-Latn-CS|CS|d.M.yyyy|2|,|.|CSD|Дин.|2|3|Дин.10.000,00|
|sr-Latn-ME|ME|d.M.yyyy|2|,|.|EUR|€|2|3|€10.000,00|
|sr-Latn-RS|RS|d.M.yyyy|2|,|.|RSD|Дин.|2|3|Дин.10.000,00|
|sv-FI|FI|d.M.yyyy|2|,| |EUR|€|2|3|€10 000,00|
|sv-SE|SE|yyyy-MM-dd|2|,|.|SEK|kr|2|3|kr10.000,00|
|sw-KE|KE|M/d/yyyy|1|.|,|KES|S|2|0|S10,000.00|
|syr-SY|SY|dd/MM/yyyy|7|.|,|SYP|LS|2|2|10,000.00 LS|
|ta-IN|IN|dd-MM-yyyy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|te-IN|IN|dd-MM-yy|2|.|,|INR|₹|2|2|10,000.00 ₹|
|tg-Cyrl-TJ|TJ|dd.MM.yy|1|,| |TJS|т.р.|2|3|т.р.10 000,00|
|tk-TM|TM|dd.MM.yy|2|,| |TMT|m.|2|1|10 000,00m.|
|tn-ZA|ZA|yyyy/MM/dd|1|.|,|ZAR|R|2|2|10,000.00 R|
|tt-RU|RU|dd.MM.yyyy|2|,| |RUB|һ.|2|3|һ.10 000,00|
|tzm-Latn-DZ|DZ|dd-MM-yyyy|7|.|,|DZD|DA|2|3|DA10,000.00|
|th-TH|TH|d/M/yyyy|2|.|,|THB|฿|2|0|฿10,000.00|
|tr-TR|TR|dd.MM.yyyy|2|,|.|TRY|TL|2|3|TL10.000,00|
|ug-CN|CN|yyyy-M-d|1|.|,|CNY|¥|2|0|¥10,000.00|
|uk-UA|UA|dd.MM.yyyy|2|,| |UAH|₴|2|1|10 000,00₴|
|ur-PK|PK|dd/MM/yyyy|2|.|,|PKR|Rs|2|0|Rs10,000.00|
|uz-Cyrl-UZ|UZ|dd.MM.yyyy|2|,| |UZS|сўм|2|3|сўм10 000,00|
|uz-Latn-UZ|UZ|dd/MM yyyy|2|,| |UZS|лв|2|3|лв10 000,00|
|vi-VN|VN|dd/MM/yyyy|2|,|.|VND|₫|0|3|₫10.000,00|
|wo-SN|SN|dd/MM/yyyy|2|,| |XOF|XOF|2|3|XOF10 000,00|
|xh-ZA|ZA|yyyy/MM/dd|1|.|,|ZAR|R|2|2|10,000.00 R|
|yo-NG|NG|d/M/yyyy|1|.|,|NIO|C$|2|2|10,000.00 C$|
|zh-CN|CN|yyyy/M/d|1|.|,|CNY|¥|2|0|¥10,000.00|
|zh-HK|HK|d/M/yyyy|1|.|,|HKD|HK$|2|0|HK$10,000.00|
|zh-MO|MO|d/M/yyyy|1|.|,|MOP|$|2|0|$10,000.00|
|zh-SG|SG|d/M/yyyy|1|.|,|SGD|$|2|0|$10,000.00|
|zh-TW|TW|yyyy/M/d|1|.|,|TWD|NT$|2|0|NT$10,000.00|
|zu-ZA|ZA|yyyy/MM/dd|1|.|,|ZAR|R|2|2|10,000.00 R|

## Language - Locale Map

| Language Code | Locale Code |
|---------------|-------------|
|af|af-ZA|
|am|am-ET|
|ar|ar-AE|
|arn|arn-CL|
|as|as-IN|
|az|az-Latn-AZ|
|ba|ba-RU|
|be|be-BY|
|bg|bg-BG|
|bn|bn-BD|
|bo|bo-CN|
|br|br-FR|
|bs|bs-Latn-BA|
|ca|ca-ES|
|co|co-FR|
|cs|cs-CZ|
|cy|cy-GB|
|da|da-DK|
|de|de-DE|
|dsb|dsb-DE|
|dv|dv-MV|
|el|el-GR|
|en|en-US|
|es|es-ES|
|et|et-EE|
|eu|eu-ES|
|fa|fa-IR|
|fi|fi-FI|
|fil|fil-PH|
|fo|fo-FO|
|fr|fr-FR|
|fy|fy-NL|
|ga|ga-IE|
|gd|gd-GB|
|gl|gl-ES|
|gsw|gsw-FR|
|gu|gu-IN|
|ha|ha-Latn-NG|
|he|he-IL|
|hi|hi-IN|
|hr|hr-HR|
|hsb|hsb-DE|
|hu|hu-HU|
|hy|hy-AM|
|id|id-ID|
|ig|ig-NG|
|ii|ii-CN|
|is|is-IS|
|it|it-IT|
|iu|iu-Latn-CA|
|ja|ja-JP|
|ka|ka-GE|
|kk|kk-KZ|
|kl|kl-GL|
|km|km-KH|
|kn|kn-IN|
|ko|ko-KR|
|kok|kok-IN|
|ky|ky-KG|
|lb|lb-LU|
|lo|lo-LA|
|lt|lt-LT|
|lv|lv-LV|
|mi|mi-NZ|
|mk|mk-MK|
|ml|ml-IN|
|mn|mn-MN|
|moh|moh-CA|
|mr|mr-IN|
|ms|ms-MY|
|mt|mt-MT|
|nb|nb-NO|
|ne|ne-NP|
|nl|nl-NL|
|nn|nn-NO|
|nso|nso-ZA|
|oc|oc-FR|
|or|or-IN|
|pa|pa-IN|
|pl|pl-PL|
|prs|prs-AF|
|ps|ps-AF|
|pt|pt-PT|
|qut|qut-GT|
|quz|quz-EC|
|rm|rm-CH|
|ro|ro-RO|
|ru|ru-RU|
|rw|rw-RW|
|sa|sa-IN|
|sah|sah-RU|
|se|se-SE|
|si|si-LK|
|sk|sk-SK|
|sl|sl-SI|
|sma|sma-SE|
|smj|smj-SE|
|smn|smn-FI|
|sms|sms-FI|
|sq|sq-AL|
|sr|sr-Latn-RS|
|sv|sv-SE|
|sw|sw-KE|
|syr|syr-SY|
|ta|ta-IN|
|te|te-IN|
|tg|tg-Cyrl-TJ|
|th|th-TH|
|tk|tk-TM|
|tn|tn-ZA|
|tr|tr-TR|
|tt|tt-RU|
|tzm|tzm-Latn-DZ|
|ug|ug-CN|
|uk|uk-UA|
|ur|ur-PK|
|uz|uz-Latn-UZ|
|vi|vi-VN|
|wo|wo-SN|
|xh|xh-ZA|
|yo|yo-NG|
|zh|zh-CN|
|zu|zu-ZA|

## License

MIT
