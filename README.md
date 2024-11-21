# All in One Accessibility®: Strapi Plugin

All in One Accessibility AI free Widget Supports limited 23 features only and includes 140 Languages. 

It improves website ADA compliance and browser experience for ADA, WCAG 2.0, 2.1 & 2.2, Section 508, California Unruh Act, Australian DDA, European EAA EN 301 549, UK Equality Act (EA), Israeli Standard 5568, Ontario AODA, Canada ACA, German BITV, France RGAA, Brazilian Inclusion Law (LBI 13.146/2015), Spain UNE 139803:2012, JIS X 8341 (Japan), Italian Stanca Act and Switzerland DDA Standards.

Follows the best industry security, SEO practices and standards ISO 9001:2015 & ISO 27001:2013 and complies with GDPR, COPPA regulations. Member of W3C and International Association of Accessibility Professionals (IAAP). It is a flexible & lightweight widget that can be changed according to law and reduces the risk of time-consuming accessibility lawsuits.

For more details/features, Please visit [All in One Accessibility®](https://www.skynettechnologies.com/all-in-one-accessibility)

Unlock over 70 features with the All in One Accessibility Widget through a paid subscription. See the detailed comparison of Paid vs. Free features [here](https://www.skynettechnologies.com/all-in-one-accessibility/features).

We provide a 10-day free trial. Get started [here](https://ada.skynettechnologies.us/trial-subscription?utm_source=all-in-one-accessibility&utm_medium=landing-page&utm_campaign=trial-subscription).

### Supported Languages (140+ Languages):

English (USA), English (UK), English (Australian), English (Canadian), English (South Africa), Español, Español (Mexicano), Deutsch, عربى, Português, Português (Brazil), 日本語, Français, Italiano, Polski, Pусский, 中文, 中文 (Traditional), עִברִית, Magyar, Slovenčina, Suomenkieli, Türkçe, Ελληνικά, Latinus, Български, Català, Čeština, Dansk, Nederlands, हिंदी, Bahasa Indonesia, 한국인, Lietuvių, Bahasa Melayu, Norsk, Română, Slovenščina, Svenska, แบบไทย, Українська, Việt Nam, বাঙালি, සිංහල, አማርኛ, Hmoob, မြန်မာ, Eesti keel, latviešu, Cрпски, Hrvatski, ქართული, ʻŌlelo Hawaiʻi, Cymraeg, Cebuano, Samoa, Kreyòl ayisyen, Føroyskt, Crnogorski, Azerbaijani, Euskara, Tagalog, Galego, Norsk Bokmål, فارسی, ਪੰਜਾਬੀ, shqiptare, Hայերեն, অসমীয়া, Aymara, Bamanankan, беларускі, bosanski, Corsu, ދިވެހި, Esperanto, Eʋegbe, Frisian, guarani, ગુજરાતી, Hausa, íslenskur, Igbo, Gaeilge, basa jawa, ಕನ್ನಡ, қазақ, ខ្មែរ, Kinyarwanda, Kurdî, Кыргызча, ພາສາລາວ, Lingala, Luganda, lëtzebuergesch, македонски, Malagasy, മലയാളം, Malti, Maori, मराठी, Монгол, नेपाली, Sea, ଓଡିଆ, Afaan Oromoo, پښتو, Runasimi, संस्कृत, Gàidhlig na h-Alba, Sesotho, Shona, سنڌي, Soomaali, basa Sunda, kiswahili, тоҷикӣ, தமிழ், Татар, తెలుగు, ትግሪኛ, Tsonga, Türkmenler, Ride, اردو, ئۇيغۇر, o'zbek, isiXhosa, יידיש, Yoruba, Zulu, भोजपुरी, डोगरी, कोंकणी, Kurdî, Krio, मैथिली, Meiteilon, Mizo tawng, Sepedi, Ilocano.

## Installation

### Prerequisites
- Strapi version ^5.4.0
- Node.js version ^20.9.0

### Steps

You can install this plugin via the Strapi marketplace or by using npm or yarn.

### Via the Strapi Marketplace

[![Strapi Marketplace](https://strapi.io/assets/strapi-logo.svg)](https://market.strapi.io/plugins/strapi-plugin-all-in-one-accessibility)


### Via NPM

```bash
npm i strapi-plugin-all-in-one-accessibility
```

### Via yarn

```bash
yarn add strapi-plugin-all-in-one-accessibility
```

## Setup
Add the following code in your ./config/plugins.js file:

```javascript
'all-in-one-accessibility': {
    enabled: true,
    resolve: './node_modules/strapi-plugin-all-in-one-accessibility',
    config: {
    },
  },
```

### Configuration

#### Enable API Permissions
1. Ensure your Strapi server is running.
2. In the Strapi admin panel, navigate to the **Settings** section.
3. Click on the **Users & Permissions** plugin and select **Roles**.
4. Choose the **Public** role from the list.
5. Locate the **all-in-one-accessibility** option in the permissions list.
6. Check the box for **all APIs endpoints** under the **all-in-one-accessibility** option.
7. Save your changes.

### Integration Guide: Adding the Accessibility Widget

To integrate the **All-in-One Accessibility** widget into your website or Strapi frontend, follow the steps below:

#### Add the Script
Place the following script in the **header** or **footer** section of your website or frontend:

```html
<script>
  setTimeout(() => { 
    let aioa_script_tag = document.createElement("script"); 
    aioa_script_tag.src = "https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=#420083&token=null&position=bottom_right";  
    aioa_script_tag.id = "aioa-adawidget";
    aioa_script_tag.defer = "true"; 
    document.getElementsByTagName("body")[0].appendChild(aioa_script_tag); 
  }, 3000);
</script>
```

## CORS Policy Configuration

To avoid CORS policy issues, ensure the following URLs are allowed in your website. These URLs should be added to your CORS configuration or trusted domains list.

| **Domain**                        | **Description**                              | **Usage**                        |
|-----------------------------------|----------------------------------------------|----------------------------------|
| `https://*.skynettechnologies.com` | Skynet Technologies (Global Domain)         | API access and resources        |
| `https://*.skynettechnologies.us` | Skynet Technologies (US Domain)             | API access and resources        |
| `https://*.googleapis.com`        | Google APIs                                 | Services like Fonts, Translation |
| `https://vlibras.gov.br`          | VLibras - Brazilian Sign Language Service   | Sign Language             |

## Instructions

1. Update your server's CORS configuration to include these URLs.
2. Ensure wildcard subdomains (`*`) are supported where necessary.
3. Verify the application functionality by testing requests to these domains.
4. If issues persist, consult the Strapi documentation for CORS configuration guidance.


## Configuration

To configure the widget, access the Admin Panel and head to the All in One Accessibility menu in the dashboard. From there, you can register [here](https://ada.skynettechnologies.us/trial-subscription) with 10 Days free trial.

## Screenshots

![App Screenshot](https://www.skynettechnologies.com/sites/default/files/strapi/Screenshot-1.jpg?v=3)

![App Screenshot](https://www.skynettechnologies.com/sites/default/files/strapi/Screenshot-2.jpg?v=3)

![App Screenshot](https://www.skynettechnologies.com/sites/default/files/strapi/Screenshot-3.jpg?v=3)

![App Screenshot](https://www.skynettechnologies.com/sites/default/files/strapi/Screenshot-4.jpg?v=3)

## Video

[![All in One Accessibility](https://img.youtube.com/vi/I-DjgZyleeI/0.jpg)](https://www.youtube.com/watch?v=I-DjgZyleeI)

## Documentation

- [Strapi All in One Accessibility](https://www.skynettechnologies.com/strapi-website-accessibility)
- [Strapi All in One Accessibility Extension installation steps blog](https://www.skynettechnologies.com/blog/strapi-web-accessibility-widget-installation)
- [All in One Accessibility - Features Guide](https://www.skynettechnologies.com/sites/default/files/accessibility-widget-features-list.pdf)

## Submit a Support Request

Please visit our [support page](https://www.skynettechnologies.com/report-accessibility-problem) and fill out the form. Our team will get back to you as soon as possible.

## Send Us an Email

Alternatively, you can send an email to our support team:
[hello@skynettechnologies.com](mailto:hello@skynettechnologies.com)

## Partnership Opportunities

#### [Agency Partnership](https://www.skynettechnologies.com/agency-partners)

Partner with us as an agency to provide comprehensive accessibility solutions to your clients. Get access to exclusive resources, training, and support to help you implement and manage accessibility features effectively.

#### [Affiliate Partnership](https://www.skynettechnologies.com/affiliate-partner)

Join our affiliate program and earn commissions by promoting All in One Accessibility™. Share our Widget with your network and help businesses improve their website accessibility while generating revenue.

For more details, Please visit [Partnership Opportunities Page](https://www.skynettechnologies.com/partner-program)

## Credits

This addon is developed and maintained by [Skynet Technologies USA LLC](https://www.skynettechnologies.com)

## Current Maintainers
- [Skynet Technologies USA LLC](https://github.com/skynettechnologies)