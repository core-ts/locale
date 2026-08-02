# locale-service

A lightweight, framework-agnostic localization library for TypeScript.

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

# Features

- 💰 103 built-in currency database (ISO 4217)
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

# Installation

```bash
npm install locale-service
```

or

```bash
yarn add locale-service
```

---

# Why locale-service?

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

# Lookup Locale

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

# Locale Information

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

# Currency Information

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

# Currency Formatting

Different countries display currencies differently.

For example, the amount `10000` becomes

| Locale | Output |
|---------|----------------|
| en-US | `$10,000.00` |
| km-KH | `10,000.00៛` |
| nb-NO | `kr 10 000,00` |
| vi-VN | `10.000,00 ₫` |

To support these differences efficiently, `locale-service` defines four currency patterns.

| Pattern | Description | Example |
|----------|-------------|---------|
| 0 | Prefix | `$10,000.00` |
| 1 | Suffix | `10,000.00៛` |
| 2 | Prefix with space | `kr 10 000,00` |
| 3 | Suffix with space | `10.000,00 ₫` |

This simple model covers the vast majority of currency formatting conventions while remaining lightweight and fast.

---

# Designed for Full-Stack Applications

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

# Performance

The library stores locale and currency information using `Map`.

```typescript
getLocale("vi-VN")
getCurrency("USD")
```

Both operations execute in **O(1)** time.

---

# Typical Use Cases

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

# Design Goals

- Framework independent
- Backend and frontend compatible
- Lightweight
- Zero dependencies
- High performance
- Simple API
- Consistent behavior
- Enterprise ready

---

# License

MIT
