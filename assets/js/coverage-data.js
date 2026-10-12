/* ============================================================================
 * Global eSIM — COVERAGE & INDICATIVE WHOLESALE RATE DATA
 * ----------------------------------------------------------------------------
 * GENERATED FILE — do not hand-edit. Regenerate with: node src/make-coverage.mjs
 *
 * Source: the partner cost sheet (wechatbiz_cost_SIM.xlsx) supplied with the
 * reseller agreement. `from` is the LOWEST indicative partner rate for that
 * country, in HKD per GB, taken across all listed network partners.
 *
 * IMPORTANT FOR THE SITE OWNER
 * ----------------------------
 *  - These are INDICATIVE partner rates, published for orientation only.
 *  - Full per-network rate cards are released under NDA after verification.
 *  - Review the commercial disclosure decision with your legal/finance team
 *    before publishing this file to a public repository. If you would rather
 *    NOT publish rates, set SHOW_RATES = false in assets/js/config.js and the
 *    tables will render coverage without prices.
 * ==========================================================================*/
window.COVERAGE_DATA = {
  "generatedFrom": "wechatbiz_cost_SIM.xlsx",
  "currency": "HKD",
  "unit": "per GB",
  "lastReviewed": "2026-09-20",
  "regionOrder": [
    "SOUTHEAST_ASIA",
    "EAST_ASIA",
    "CENTRAL_ASIA",
    "OCEANIA",
    "NORTH_AMERICA",
    "LATIN_AMERICA",
    "EUROPE",
    "MIDDLE_EAST",
    "AFRICA"
  ],
  "regionStats": {
    "EUROPE": {
      "from": 40,
      "countries": 24,
      "nets": 29,
      "tech": [
        "4G",
        "5G"
      ]
    },
    "LATIN_AMERICA": {
      "from": 120,
      "countries": 7,
      "nets": 8,
      "tech": [
        "3G",
        "4G"
      ]
    },
    "OCEANIA": {
      "from": 40,
      "countries": 3,
      "nets": 4,
      "tech": [
        "4G",
        "5G"
      ]
    },
    "SOUTHEAST_ASIA": {
      "from": 8,
      "countries": 9,
      "nets": 15,
      "tech": [
        "3G",
        "4G",
        "5G"
      ]
    },
    "NORTH_AMERICA": {
      "from": 25,
      "countries": 3,
      "nets": 7,
      "tech": [
        "5G"
      ]
    },
    "EAST_ASIA": {
      "from": 20,
      "countries": 7,
      "nets": 13,
      "tech": [
        "4G",
        "5G"
      ]
    },
    "AFRICA": {
      "from": 30,
      "countries": 7,
      "nets": 7,
      "tech": [
        "4G"
      ]
    },
    "MIDDLE_EAST": {
      "from": 30,
      "countries": 5,
      "nets": 7,
      "tech": [
        "3G",
        "4G"
      ]
    },
    "CENTRAL_ASIA": {
      "from": 50,
      "countries": 3,
      "nets": 4,
      "tech": [
        "4G"
      ]
    }
  },
  "countries": [
    {
      "iso": "",
      "country": "Albania",
      "tc": "阿尔巴尼亚",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Argentina",
      "tc": "阿根廷",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 2,
      "tech": [
        "3G",
        "4G"
      ],
      "ops": [
        "Personal",
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Australia",
      "tc": "澳大利亚",
      "region": "OCEANIA",
      "from": 50,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone",
        "Optus"
      ]
    },
    {
      "iso": "",
      "country": "Austria",
      "tc": "奥地利",
      "region": "EUROPE",
      "from": 140,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "H3G"
      ]
    },
    {
      "iso": "",
      "country": "Belgium",
      "tc": "比利时",
      "region": "EUROPE",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Orange"
      ]
    },
    {
      "iso": "",
      "country": "Brazil",
      "tc": "巴西",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Cambodia",
      "tc": "柬埔寨",
      "region": "SOUTHEAST_ASIA",
      "from": 40,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "Smart",
        "MetFone"
      ]
    },
    {
      "iso": "",
      "country": "Canada",
      "tc": "加拿大",
      "region": "NORTH_AMERICA",
      "from": 25,
      "nets": 3,
      "tech": [
        "5G"
      ],
      "ops": [
        "Bell Mobility",
        "Telus",
        "Rogers"
      ]
    },
    {
      "iso": "",
      "country": "Chile",
      "tc": "智利",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "China",
      "tc": "中国",
      "region": "EAST_ASIA",
      "from": 30,
      "nets": 3,
      "tech": [
        "4G"
      ],
      "ops": [
        "中國聯通",
        "中國移動",
        "中國电信"
      ]
    },
    {
      "iso": "",
      "country": "Colombia",
      "tc": "哥伦比亚",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Czech Republic",
      "tc": "捷克共和国",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Denmark",
      "tc": "丹麦",
      "region": "EUROPE",
      "from": 40,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "H3G"
      ]
    },
    {
      "iso": "",
      "country": "DR Congo",
      "tc": "刚果",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Ecuador",
      "tc": "厄瓜多尔",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Egypt",
      "tc": "埃及",
      "region": "AFRICA",
      "from": 30,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Etisalat"
      ]
    },
    {
      "iso": "",
      "country": "Estonia",
      "tc": "爱沙尼亚",
      "region": "EUROPE",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Elisa"
      ]
    },
    {
      "iso": "",
      "country": "Finland",
      "tc": "芬兰",
      "region": "EUROPE",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "DNA"
      ]
    },
    {
      "iso": "",
      "country": "France",
      "tc": "法国",
      "region": "EUROPE",
      "from": 70,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Bouygues Telecom"
      ]
    },
    {
      "iso": "",
      "country": "Germany",
      "tc": "德国",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Ghana",
      "tc": "加纳",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Greece",
      "tc": "希腊",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Guam",
      "tc": "关岛",
      "region": "OCEANIA",
      "from": 40,
      "nets": 1,
      "tech": [
        "5G"
      ],
      "ops": [
        "DoCoMoPacific"
      ]
    },
    {
      "iso": "",
      "country": "Hong Kong",
      "tc": "香港",
      "region": "EAST_ASIA",
      "from": 35,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "和記電訊"
      ]
    },
    {
      "iso": "",
      "country": "Hungary",
      "tc": "匈牙利",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Indonesia",
      "tc": "印度尼西亚",
      "region": "SOUTHEAST_ASIA",
      "from": 12,
      "nets": 1,
      "tech": [
        "5G"
      ],
      "ops": [
        "Indosat"
      ]
    },
    {
      "iso": "",
      "country": "Ireland",
      "tc": "爱尔兰",
      "region": "EUROPE",
      "from": 45,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "H3G",
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Israel",
      "tc": "以色列",
      "region": "MIDDLE_EAST",
      "from": 120,
      "nets": 2,
      "tech": [
        "3G",
        "4G"
      ],
      "ops": [
        "Partner",
        "Pelephone"
      ]
    },
    {
      "iso": "",
      "country": "Italy",
      "tc": "意大利",
      "region": "EUROPE",
      "from": 45,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "H3G",
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Japan",
      "tc": "日本",
      "region": "EAST_ASIA",
      "from": 27,
      "nets": 3,
      "tech": [
        "5G"
      ],
      "ops": [
        "NTTDoCoMo",
        "softbank",
        "KDDI AU"
      ]
    },
    {
      "iso": "",
      "country": "Kazakhstan",
      "tc": "哈萨克斯坦",
      "region": "CENTRAL_ASIA",
      "from": 50,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "KarTell, Beeline",
        "MTS"
      ]
    },
    {
      "iso": "",
      "country": "Kyrgyzstan",
      "tc": "吉尔吉斯坦",
      "region": "CENTRAL_ASIA",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Sky Mobile LLC"
      ]
    },
    {
      "iso": "",
      "country": "Laos",
      "tc": "老挝",
      "region": "SOUTHEAST_ASIA",
      "from": 50,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Lao Telecom"
      ]
    },
    {
      "iso": "",
      "country": "Lesotho",
      "tc": "莱索托",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Macau",
      "tc": "澳门",
      "region": "EAST_ASIA",
      "from": 35,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "和記電訊"
      ]
    },
    {
      "iso": "",
      "country": "Malaysia",
      "tc": "马来西亚",
      "region": "SOUTHEAST_ASIA",
      "from": 12,
      "nets": 3,
      "tech": [
        "5G"
      ],
      "ops": [
        "Maxis",
        "Digi",
        "Celcom"
      ]
    },
    {
      "iso": "",
      "country": "Malta",
      "tc": "马耳他",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Mexico",
      "tc": "墨西哥",
      "region": "NORTH_AMERICA",
      "from": 40,
      "nets": 1,
      "tech": [
        "5G"
      ],
      "ops": [
        "AT&T Mexico"
      ]
    },
    {
      "iso": "",
      "country": "Mongolia",
      "tc": "蒙古",
      "region": "EAST_ASIA",
      "from": 100,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Mobicom"
      ]
    },
    {
      "iso": "",
      "country": "Mozambique",
      "tc": "莫桑比克",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Myanmar",
      "tc": "缅甸",
      "region": "SOUTHEAST_ASIA",
      "from": 200,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "MPT"
      ]
    },
    {
      "iso": "",
      "country": "Netherlands",
      "tc": "荷兰",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "New Zealand",
      "tc": "新西兰",
      "region": "OCEANIA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Norway",
      "tc": "挪威",
      "region": "EUROPE",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Telenor"
      ]
    },
    {
      "iso": "",
      "country": "Peru",
      "tc": "秘鲁",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Philippines",
      "tc": "菲律宾",
      "region": "SOUTHEAST_ASIA",
      "from": 13,
      "nets": 2,
      "tech": [
        "5G"
      ],
      "ops": [
        "Globe",
        "Smart"
      ]
    },
    {
      "iso": "",
      "country": "Poland",
      "tc": "波兰",
      "region": "EUROPE",
      "from": 50,
      "nets": 2,
      "tech": [
        "4G",
        "5G"
      ],
      "ops": [
        "Polkomtel",
        "Orange"
      ]
    },
    {
      "iso": "",
      "country": "Portugal",
      "tc": "葡萄牙",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Qatar",
      "tc": "卡塔尔",
      "region": "MIDDLE_EAST",
      "from": 120,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Romania",
      "tc": "罗马尼亚",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Russia",
      "tc": "俄罗斯联邦",
      "region": "EUROPE",
      "from": 80,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "MTS",
        "BeeLine/VimpelCom"
      ]
    },
    {
      "iso": "",
      "country": "Saudi Arabia",
      "tc": "沙特阿拉伯",
      "region": "MIDDLE_EAST",
      "from": 40,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "STC"
      ]
    },
    {
      "iso": "",
      "country": "Singapore",
      "tc": "新加坡",
      "region": "SOUTHEAST_ASIA",
      "from": 8,
      "nets": 2,
      "tech": [
        "5G"
      ],
      "ops": [
        "Starhub",
        "Simba"
      ]
    },
    {
      "iso": "",
      "country": "South Africa",
      "tc": "南非",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "South Korea",
      "tc": "韩国",
      "region": "EAST_ASIA",
      "from": 20,
      "nets": 2,
      "tech": [
        "4G",
        "5G"
      ],
      "ops": [
        "LG U+",
        "SK"
      ]
    },
    {
      "iso": "",
      "country": "Spain",
      "tc": "西班牙",
      "region": "EUROPE",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Sweden",
      "tc": "瑞典",
      "region": "EUROPE",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "3"
      ]
    },
    {
      "iso": "",
      "country": "Switzerland",
      "tc": "瑞士",
      "region": "EUROPE",
      "from": 80,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Swisscom"
      ]
    },
    {
      "iso": "",
      "country": "Taiwan",
      "tc": "台湾",
      "region": "EAST_ASIA",
      "from": 35,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "中华",
        "台湾大哥大"
      ]
    },
    {
      "iso": "",
      "country": "Tanzania",
      "tc": "坦桑尼亚",
      "region": "AFRICA",
      "from": 45,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "Thailand",
      "tc": "泰国",
      "region": "SOUTHEAST_ASIA",
      "from": 13,
      "nets": 1,
      "tech": [
        "5G"
      ],
      "ops": [
        "AIS"
      ]
    },
    {
      "iso": "",
      "country": "Turkey",
      "tc": "土耳其",
      "region": "MIDDLE_EAST",
      "from": 30,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "Vodafone-Telsim"
      ]
    },
    {
      "iso": "",
      "country": "UAE",
      "tc": "阿联酋",
      "region": "MIDDLE_EAST",
      "from": 30,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "Du",
        "Etisalat"
      ]
    },
    {
      "iso": "",
      "country": "United Kingdom",
      "tc": "英国",
      "region": "EUROPE",
      "from": 45,
      "nets": 2,
      "tech": [
        "4G"
      ],
      "ops": [
        "H3G",
        "Vodafone"
      ]
    },
    {
      "iso": "",
      "country": "United States",
      "tc": "美国",
      "region": "NORTH_AMERICA",
      "from": 25,
      "nets": 3,
      "tech": [
        "5G"
      ],
      "ops": [
        "AT&T",
        "Verizon",
        "T-Mobile"
      ]
    },
    {
      "iso": "",
      "country": "Uruguay",
      "tc": "乌拉圭",
      "region": "LATIN_AMERICA",
      "from": 120,
      "nets": 1,
      "tech": [
        "3G"
      ],
      "ops": [
        "Telefonica"
      ]
    },
    {
      "iso": "",
      "country": "Uzbekistan",
      "tc": "乌兹别克斯坦",
      "region": "CENTRAL_ASIA",
      "from": 50,
      "nets": 1,
      "tech": [
        "4G"
      ],
      "ops": [
        "UniTel/BeeLine"
      ]
    },
    {
      "iso": "",
      "country": "Vietnam",
      "tc": "越南",
      "region": "SOUTHEAST_ASIA",
      "from": 30,
      "nets": 2,
      "tech": [
        "4G",
        "5G"
      ],
      "ops": [
        "VinaPhone",
        "Vitenam Mobile"
      ]
    }
  ]
};
