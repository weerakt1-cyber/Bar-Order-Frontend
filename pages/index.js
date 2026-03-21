import { useState, useEffect } from "react";

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  en: {
    appName: "Siam Amsterdam", appSub: "Online Order",
    yourName: "Your Name", namePlaceholder: "Enter your name",
    selectTable: "Select Table", chooseTable: "Choose a table...",
    language: "Language", startOrder: "Start Ordering →",
    menu: "Menu", cart: "Cart", cartEmpty: "Your cart is empty",
    addItems: "Add items from the menu to get started",
    backToMenu: "← Add More Items", confirmOrder: "Review Order →",
    orderSummary: "Order Summary", customer: "Customer", table: "Table",
    items: "Items", total: "Total", qty: "Qty",
    notePlaceholder: "Note: e.g. no ice, extra sauce...",
    remove: "Remove", reviewWarning: "Please review your order before confirming.",
    payment: "Payment", selectPayment: "Select Payment Method",
    cash: "Cash", cashSub: "Pay when staff arrives",
    promptpay: "PromptPay / QR", promptpaySub: "Scan & pay instantly",
    qrInstructions: "Scan QR to pay", submitOrder: "Submit Order",
    orderSuccess: "Order Created! 🎉",
    successMessage: "Our staff will prepare and serve your order as soon as possible.",
    newOrder: "Place New Order", thb: "THB", back: "Back",
    loading: "Submitting...", note: "Note", time: "Time",
    scanToPay: "Scan to pay", selectOption: "Please select",
  },
  th: {
    appName: "Siam Amsterdam", appSub: "สั่งออนไลน์",
    yourName: "ชื่อของคุณ", namePlaceholder: "กรอกชื่อของคุณ",
    selectTable: "เลือกโต๊ะ", chooseTable: "เลือกโต๊ะ...",
    language: "ภาษา", startOrder: "เริ่มสั่ง →",
    menu: "เมนู", cart: "ตะกร้า", cartEmpty: "ตะกร้าว่างเปล่า",
    addItems: "เพิ่มรายการจากเมนูเพื่อเริ่มต้น",
    backToMenu: "← เพิ่มรายการ", confirmOrder: "ตรวจสอบคำสั่ง →",
    orderSummary: "สรุปคำสั่งซื้อ", customer: "ลูกค้า", table: "โต๊ะ",
    items: "รายการ", total: "รวม", qty: "จำนวน",
    notePlaceholder: "หมายเหตุ: เช่น ไม่ใส่น้ำแข็ง...",
    remove: "ลบ", reviewWarning: "กรุณาตรวจสอบคำสั่งซื้อก่อนยืนยัน",
    payment: "ชำระเงิน", selectPayment: "เลือกวิธีชำระเงิน",
    cash: "เงินสด", cashSub: "ชำระเมื่อพนักงานมาถึง",
    promptpay: "พร้อมเพย์ / QR", promptpaySub: "สแกนและชำระทันที",
    qrInstructions: "สแกน QR เพื่อชำระเงิน", submitOrder: "ส่งคำสั่งซื้อ",
    orderSuccess: "สั่งเรียบร้อยแล้ว! 🎉",
    successMessage: "พนักงานของเราจะเตรียมและเสิร์ฟคำสั่งของคุณโดยเร็วที่สุด",
    newOrder: "สั่งใหม่", thb: "บาท", back: "กลับ",
    loading: "กำลังส่ง...", note: "หมายเหตุ", time: "เวลา",
    scanToPay: "สแกนเพื่อชำระ", selectOption: "กรุณาเลือก",
  },
  ru: {
    appName: "Siam Amsterdam", appSub: "Онлайн заказ",
    yourName: "Ваше имя", namePlaceholder: "Введите ваше имя",
    selectTable: "Выберите стол", chooseTable: "Выберите стол...",
    language: "Язык", startOrder: "Начать заказ →",
    menu: "Меню", cart: "Корзина", cartEmpty: "Корзина пуста",
    addItems: "Добавьте блюда из меню",
    backToMenu: "← Добавить ещё", confirmOrder: "Проверить заказ →",
    orderSummary: "Сводка заказа", customer: "Клиент", table: "Стол",
    items: "Позиции", total: "Итого", qty: "Кол.",
    notePlaceholder: "Заметка: например, без льда...",
    remove: "Удалить", reviewWarning: "Проверьте заказ перед подтверждением.",
    payment: "Оплата", selectPayment: "Способ оплаты",
    cash: "Наличные", cashSub: "Оплата при получении",
    promptpay: "PromptPay / QR", promptpaySub: "Сканировать и оплатить",
    qrInstructions: "Сканируйте QR для оплаты", submitOrder: "Отправить заказ",
    orderSuccess: "Заказ оформлен! 🎉",
    successMessage: "Персонал приготовит и подаст заказ как можно скорее.",
    newOrder: "Новый заказ", thb: "бат", back: "Назад",
    loading: "Отправка...", note: "Заметка", time: "Время",
    scanToPay: "Сканировать для оплаты", selectOption: "Выберите",
  },
  de: {
    appName: "Siam Amsterdam", appSub: "Online Bestellen",
    yourName: "Ihr Name", namePlaceholder: "Namen eingeben",
    selectTable: "Tisch wählen", chooseTable: "Tisch auswählen...",
    language: "Sprache", startOrder: "Jetzt bestellen →",
    menu: "Speisekarte", cart: "Warenkorb", cartEmpty: "Ihr Warenkorb ist leer",
    addItems: "Artikel aus dem Menü hinzufügen",
    backToMenu: "← Weiter bestellen", confirmOrder: "Bestellung prüfen →",
    orderSummary: "Bestellübersicht", customer: "Kunde", table: "Tisch",
    items: "Artikel", total: "Gesamt", qty: "Anz.",
    notePlaceholder: "Notiz: z.B. kein Eis...",
    remove: "Entfernen", reviewWarning: "Bitte überprüfen Sie Ihre Bestellung.",
    payment: "Zahlung", selectPayment: "Zahlungsmethode wählen",
    cash: "Bargeld", cashSub: "Zahlung bei Lieferung",
    promptpay: "PromptPay / QR", promptpaySub: "Sofort per QR bezahlen",
    qrInstructions: "QR-Code scannen", submitOrder: "Bestellung senden",
    orderSuccess: "Bestellung erstellt! 🎉",
    successMessage: "Unser Personal bringt Ihre Bestellung so schnell wie möglich.",
    newOrder: "Neue Bestellung", thb: "THB", back: "Zurück",
    loading: "Senden...", note: "Notiz", time: "Zeit",
    scanToPay: "Zum Bezahlen scannen", selectOption: "Bitte wählen",
  },
};

// ============================================================
// HELPER — สร้าง options object 4 ภาษา
// ============================================================
function opt(label_en, label_th, label_ru, label_de, choices) {
  return {
    label: { en: label_en, th: label_th, ru: label_ru, de: label_de },
    choices: choices.map(([en, th, ru, de]) => ({ en, th, ru, de })),
  };
}

// ============================================================
// SIAM AMSTERDAM MENU — v3 พร้อม Options
// ============================================================
const MENU = [
  {
    id: "draft_beer", emoji: "🍺",
    name: { en: "Draft Beer", th: "เบียร์สด", ru: "Разливное пиво", de: "Fassbier" },
    items: [
      { id: 1, price: 90, enabled: true, name: { en: "Chang Cold Brew 0.3L", th: "ช้าง Cold Brew 0.3L", ru: "Чанг 0.3L", de: "Chang 0.3L" } },
      { id: 2, price: 120, enabled: true, name: { en: "Chang Cold Brew 0.5L", th: "ช้าง Cold Brew 0.5L", ru: "Чанг 0.5L", de: "Chang 0.5L" } },
      { id: 3, price: 120, enabled: true, name: { en: "Zhigulevskoe 0.3L", th: "จิกูเลฟสกอย 0.3L", ru: "Жигулёвское 0.3L", de: "Zhigulevskoe 0.3L" } },
      { id: 4, price: 160, enabled: true, name: { en: "Zhigulevskoe 0.5L", th: "จิกูเลฟสกอย 0.5L", ru: "Жигулёвское 0.5L", de: "Zhigulevskoe 0.5L" } },
    ],
  },
  {
    id: "bottle_beer", emoji: "🍻",
    name: { en: "Bottle Beer", th: "เบียร์ขวด", ru: "Бутылочное пиво", de: "Flaschenbier" },
    items: [
      { id: 5, price: 70, enabled: true, name: { en: "Chang", th: "ช้าง", ru: "Чанг", de: "Chang" } },
      { id: 6, price: 70, enabled: true, name: { en: "Singha", th: "สิงห์", ru: "Сингха", de: "Singha" } },
      { id: 7, price: 70, enabled: true, name: { en: "LEO", th: "ลีโอ", ru: "Лео", de: "Leo" } },
      { id: 8, price: 80, enabled: true, name: { en: "San Miguel", th: "ซานมิเกล", ru: "Сан Мигель", de: "San Miguel" } },
      { id: 9, price: 80, enabled: true, name: { en: "Heineken", th: "ไฮเนเก้น", ru: "Хайнекен", de: "Heineken" } },
      { id: 10, price: 80, enabled: true, name: { en: "Pattaya Beer", th: "พัทยาเบียร์", ru: "Паттайя Бир", de: "Pattaya Beer" } },
      { id: 11, price: 80, enabled: true, name: { en: "Asahi", th: "อาซาฮี", ru: "Асахи", de: "Asahi" } },
      { id: 12, price: 90, enabled: true, name: { en: "Budweiser", th: "บัดไวเซอร์", ru: "Будвайзер", de: "Budweiser" } },
      { id: 13, price: 90, enabled: true, name: { en: "Stella Artois", th: "สเตลล่า อาร์ทัวส์", ru: "Стелла Артуа", de: "Stella Artois" } },
      {
        id: 14, price: 100, enabled: true,
        name: { en: "German Recipe", th: "เยอรมัน เรสซิปี้", ru: "Немецкий рецепт", de: "German Recipe" },
        options: [
          opt("Type", "ประเภท", "Тип", "Typ", [
            ["Lager", "ลาเกอร์", "Лагер", "Lager"],
            ["Unfiltered", "ไม่กรอง", "Нефильтрованное", "Ungefiltert"],
            ["Dark", "ดาร์ก", "Тёмное", "Dunkel"],
          ]),
        ],
      },
      {
        id: 15, price: 120, enabled: true,
        name: { en: "Beerlao", th: "เบียร์ลาว", ru: "Бирлао", de: "Beerlao" },
        options: [
          opt("Type", "ประเภท", "Тип", "Typ", [
            ["Premium Lager", "พรีเมี่ยม ลาเกอร์", "Премиум Лагер", "Premium Lager"],
            ["IPA", "IPA", "IPA", "IPA"],
            ["Dark", "ดาร์ก", "Тёмное", "Dunkel"],
          ]),
        ],
      },
      { id: 16, price: 120, enabled: true, name: { en: "Corona Beer", th: "โคโรน่า", ru: "Корона", de: "Corona" } },
      { id: 17, price: 150, enabled: true, name: { en: "Savanna Premium Cider", th: "ซาวานน่า ไซเดอร์", ru: "Саванна Сидр", de: "Savanna Cider" } },
      {
        id: 18, price: 180, enabled: true,
        name: { en: "Hoegaarden 550ml", th: "ฮูการ์เดน 550มล.", ru: "Хугарден 550мл", de: "Hoegaarden 550ml" },
        options: [
          opt("Type", "ประเภท", "Тип", "Typ", [
            ["Witbier", "วิทเบียร์", "Витбир", "Witbier"],
            ["Rosée", "โรเซ่", "Розе", "Rosée"],
          ]),
        ],
      },
    ],
  },
  {
    id: "cocktails", emoji: "🍹",
    name: { en: "Cocktails", th: "ค็อกเทล", ru: "Коктейли", de: "Cocktails" },
    items: [
      { id: 19, price: 200, enabled: true, name: { en: "Mojito", th: "โมฮิโต้", ru: "Мохито", de: "Mojito" } },
      { id: 20, price: 200, enabled: true, name: { en: "Blue Mojito", th: "บลู โมฮิโต้", ru: "Синий Мохито", de: "Blue Mojito" } },
      { id: 21, price: 180, enabled: true, name: { en: "Kamikaze", th: "คามิคาเซ่", ru: "Камикадзе", de: "Kamikaze" } },
      { id: 22, price: 180, enabled: true, name: { en: "Blue Kamikaze", th: "บลู คามิคาเซ่", ru: "Синий Камикадзе", de: "Blue Kamikaze" } },
      { id: 23, price: 180, enabled: true, name: { en: "Daiquiri", th: "ดาอิคิรี", ru: "Дайкири", de: "Daiquiri" } },
      { id: 24, price: 200, enabled: true, name: { en: "Margarita", th: "มาการิต้า", ru: "Маргарита", de: "Margarita" } },
      { id: 25, price: 200, enabled: true, name: { en: "Blue Margarita", th: "บลู มาการิต้า", ru: "Синяя Маргарита", de: "Blue Margarita" } },
      { id: 26, price: 180, enabled: true, name: { en: "Gin Gimlet", th: "จิน กิมเล็ต", ru: "Джин Гимлет", de: "Gin Gimlet" } },
      { id: 27, price: 180, enabled: true, name: { en: "Vodka Gimlet", th: "วอดก้า กิมเล็ต", ru: "Водка Гимлет", de: "Vodka Gimlet" } },
      { id: 28, price: 180, enabled: true, name: { en: "Screwdriver", th: "สครูไดรเวอร์", ru: "Отвёртка", de: "Screwdriver" } },
      { id: 29, price: 180, enabled: true, name: { en: "White Lady", th: "ไวท์ เลดี้", ru: "Белая Леди", de: "White Lady" } },
      { id: 30, price: 180, enabled: true, name: { en: "Orange Martini", th: "ออเรนจ์ มาร์ตินี่", ru: "Апельсиновый Мартини", de: "Orange Martini" } },
      { id: 31, price: 180, enabled: true, name: { en: "Gin Tonic", th: "จิน โทนิค", ru: "Джин Тоник", de: "Gin Tonic" } },
      { id: 32, price: 180, enabled: true, name: { en: "Whisky Cola", th: "วิสกี้ โคล่า", ru: "Виски Кола", de: "Whisky Cola" } },
      { id: 33, price: 200, enabled: true, name: { en: "Long Island Iced Tea", th: "ลองไอส์แลนด์", ru: "Лонг Айленд", de: "Long Island" } },
      { id: 34, price: 200, enabled: true, name: { en: "Pineapple Silk", th: "ไพน์แอปเปิล ซิลค์", ru: "Ананасовый Шёлк", de: "Pineapple Silk" } },
      { id: 35, price: 150, enabled: true, name: { en: "Sangsom Cola", th: "แสงสอม โคล่า", ru: "Сангсом Кола", de: "Sangsom Cola" } },
      { id: 36, price: 200, enabled: true, name: { en: "Mai Tai", th: "ไม ไต", ru: "Май Тай", de: "Mai Tai" } },
      { id: 37, price: 200, enabled: true, name: { en: "Tequila Sunrise", th: "เตกีล่า ซันไรส์", ru: "Текила Санрайз", de: "Tequila Sunrise" } },
      { id: 38, price: 180, enabled: true, name: { en: "Gin Fizz", th: "จิน ฟิซซ์", ru: "Джин Физз", de: "Gin Fizz" } },
      { id: 39, price: 180, enabled: true, name: { en: "Cuba Libre", th: "คิวบา ลิเบร", ru: "Куба Либре", de: "Cuba Libre" } },
      { id: 40, price: 200, enabled: true, name: { en: "Mary Pickford", th: "แมรี่ พิกฟอร์ด", ru: "Мэри Пикфорд", de: "Mary Pickford" } },
    ],
  },
  {
    id: "cold_smoked", emoji: "🥩",
    name: { en: "Cold Smoked Meat", th: "เนื้อรมควัน", ru: "Мясная нарезка", de: "Räucherfleisch" },
    items: [
      { id: 41, price: 150, enabled: true, name: { en: "Smoked Chicken", th: "ไก่รมควัน", ru: "Курица копчёная", de: "Räucherhuhn" } },
      { id: 42, price: 150, enabled: true, name: { en: "Smoked Pork", th: "หมูรมควัน", ru: "Свинина копчёная", de: "Räucherschwein" } },
      { id: 43, price: 200, enabled: true, name: { en: "Smoked Beef", th: "เนื้อรมควัน", ru: "Говядина копчёная", de: "Räucherrindfleisch" } },
    ],
  },
  {
    id: "snacks", emoji: "🍟",
    name: { en: "Snacks", th: "ของว่าง", ru: "Закуски", de: "Snacks" },
    items: [
      {
        id: 44, price: 50, enabled: true,
        name: { en: "Pringles Small", th: "พริงเกิ้ล เล็ก", ru: "Принглс маленький", de: "Pringles Klein" },
        options: [
          opt("Flavour", "รสชาติ", "Вкус", "Geschmack", [
            ["Original", "ออริจินัล", "Оригинальный", "Original"],
            ["Sour Cream & Onions", "เปรี้ยวครีมหัวหอม", "Сметана и лук", "Saure Sahne & Zwiebel"],
            ["Cheese", "ชีส", "Сыр", "Käse"],
          ]),
        ],
      },
      {
        id: 45, price: 90, enabled: true,
        name: { en: "Pringles Large", th: "พริงเกิ้ล ใหญ่", ru: "Принглс большой", de: "Pringles Groß" },
        options: [
          opt("Flavour", "รสชาติ", "Вкус", "Geschmack", [
            ["Original", "ออริจินัล", "Оригинальный", "Original"],
            ["Sour Cream & Onions", "เปรี้ยวครีมหัวหอม", "Сметана и лук", "Saure Sahne & Zwiebel"],
            ["Cheese", "ชีส", "Сыр", "Käse"],
          ]),
        ],
      },
      { id: 46, price: 20, enabled: true, name: { en: "Nuts Small", th: "ถั่ว เล็ก", ru: "Орешки маленькие", de: "Nüsse Klein" } },
      { id: 47, price: 30, enabled: true, name: { en: "Nuts", th: "ถั่ว", ru: "Орешки", de: "Nüsse" } },
      { id: 48, price: 40, enabled: true, name: { en: "DALE Chocolate", th: "เดล ช็อกโกแลต", ru: "ДАЛЕ Шоколад", de: "DALE Schokolade" } },
      {
        id: 49, price: 50, enabled: true,
        name: { en: "Snickers", th: "สนิกเกอร์ส", ru: "Сникерс", de: "Snickers" },
        options: [
          opt("Type", "ประเภท", "Тип", "Typ", [
            ["Original", "ออริจินัล", "Оригинальный", "Original"],
            ["White", "ไวท์", "Белый", "Weiß"],
          ]),
        ],
      },
      {
        id: 50, price: 60, enabled: true,
        name: { en: "Rye Bread Snack", th: "ขนมปังไรย์", ru: "Ржаные гренки", de: "Roggenbrotstück" },
        options: [
          opt("Flavour", "รสชาติ", "Вкус", "Geschmack", [
            ["Cheese", "ชีส", "Сыр", "Käse"],
            ["Sour Cream & Onions", "เปรี้ยวครีมหัวหอม", "Сметана и лук", "Saure Sahne & Zwiebel"],
            ["Jellymeat", "เจลลี่มีท", "Мясное желе", "Fleischgelee"],
            ["BBQ", "บาร์บีคิว", "Барбекю", "BBQ"],
            ["Ajika Sauce", "อาจิกา ซอส", "Аджика", "Ajika-Sauce"],
          ]),
        ],
      },
    ],
  },
  {
    id: "drinks", emoji: "🥤",
    name: { en: "Soft Drinks", th: "เครื่องดื่ม", ru: "Напитки", de: "Getränke" },
    items: [
      { id: 51, price: 20, enabled: true, name: { en: "Water", th: "น้ำเปล่า", ru: "Вода", de: "Wasser" } },
      { id: 52, price: 30, enabled: true, name: { en: "Mineral Water", th: "น้ำแร่", ru: "Минеральная вода", de: "Mineralwasser" } },
      {
        id: 53, price: 40, enabled: true,
        name: { en: "Coca Cola", th: "โค้ก", ru: "Кока-Кола", de: "Coca Cola" },
        options: [
          opt("Type", "ประเภท", "Тип", "Typ", [
            ["Can", "กระป๋อง", "Банка", "Dose"],
            ["Bottle", "ขวด", "Бутылка", "Flasche"],
          ]),
        ],
      },
      { id: 54, price: 40, enabled: true, name: { en: "Coca Cola Zero", th: "โค้ก ซีโร่", ru: "Кока-Кола Зеро", de: "Coca Cola Zero" } },
      { id: 55, price: 40, enabled: true, name: { en: "Sprite", th: "สไปรท์", ru: "Спрайт", de: "Sprite" } },
      { id: 56, price: 40, enabled: true, name: { en: "Schweppes", th: "ชเวปส์", ru: "Швепс", de: "Schweppes" } },
      { id: 57, price: 40, enabled: true, name: { en: "Lipton Iced Tea", th: "ลิปตัน ชาเย็น", ru: "Липтон холодный чай", de: "Lipton Eistee" } },
      { id: 58, price: 30, enabled: true, name: { en: "Soda Water", th: "โซดา", ru: "Содовая", de: "Sodawasser" } },
      {
        id: 59, price: 50, enabled: true,
        name: { en: "Gatorade", th: "เกเตอเรด", ru: "Гейторейд", de: "Gatorade" },
        options: [
          opt("Flavour", "รสชาติ", "Вкус", "Geschmack", [
            ["Blue (Cool Blue)", "บลู", "Синий", "Blau"],
            ["Lime (Citrus Charge)", "ไลม์", "Лайм", "Limette"],
          ]),
        ],
      },
      { id: 60, price: 40, enabled: true, name: { en: "Juice", th: "น้ำผลไม้", ru: "Сок", de: "Saft" } },
      {
        id: 61, price: 40, enabled: true,
        name: { en: "Singha Soda Sparkling", th: "สิงห์ โซดา", ru: "Сингха Газировка", de: "Singha Sprudelwasser" },
        options: [
          opt("Flavour", "รสชาติ", "Вкус", "Geschmack", [
            ["Lemon Soda", "เลมอนโซดา", "Лимонная содовая", "Zitronenlimonade"],
            ["Lemon Cream Soda", "เลมอนครีมโซดา", "Лимонный крем-содовый", "Zitronen-Cream-Soda"],
          ]),
        ],
      },
    ],
  },
];

const TABLES = [
  "G01", "G02", "G03",
  "PS Room", "Billiard Pool",
  "Rooftop 1", "Rooftop 2", "Rooftop 3", "Rooftop 4",
  "Rooftop 5", "Rooftop 6", "Rooftop 7",
];

// ============================================================
// PROMPTPAY QR — ไม่ต้อง npm install ใดๆ
// ============================================================
const PROMPTPAY_ID = "0637317929"; // ← เปลี่ยนเป็นเบอร์จริงของร้าน

function crc16(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

function f(id, value) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function buildPromptPayQR(amount) {
  const id = PROMPTPAY_ID.replace(/-/g, "");
  const sanitized = id.startsWith("0") ? "0066" + id.substring(1) : id;
  const merchant = f("29", f("00", "A000000677010111") + f("01", sanitized));
  const amountStr = amount > 0 ? f("54", amount.toFixed(2)) : "";
  const payload = f("00", "01") + f("01", "12") + merchant + f("53", "764") + amountStr + f("58", "TH") + "6304";
  return payload + crc16(payload);
}

function QRImage({ value, size = 190 }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (!value || typeof window === "undefined") return;
    const tryRender = () => {
      if (typeof window.QRCode === "undefined") { setTimeout(tryRender, 200); return; }
      const div = document.createElement("div");
      try {
        new window.QRCode(div, { text: value, width: size, height: size, colorDark: "#000000", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
        setTimeout(() => {
          const img = div.querySelector("img");
          const canvas = div.querySelector("canvas");
          if (img?.src) setSrc(img.src);
          else if (canvas) setSrc(canvas.toDataURL());
        }, 300);
      } catch (e) { console.error("QR error:", e); }
    };
    const existing = document.querySelector('script[src*="qrcodejs"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      s.onload = tryRender;
      document.head.appendChild(s);
    } else if (typeof window.QRCode !== "undefined") {
      tryRender();
    } else {
      existing.addEventListener("load", tryRender);
    }
  }, [value, size]);

  return src ? (
    <img src={src} alt="PromptPay QR" style={{ width: size, height: size, borderRadius: "12px", display: "block", margin: "0 auto" }} />
  ) : (
    <div style={{ width: size, height: size, background: "#fff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: "13px", margin: "0 auto" }}>
      กำลังสร้าง QR...
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Barlow:wght@300;400;500;600;700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1A0C07; }
  ::placeholder { color: #7A5535 !important; }
  select option { background: #2C1810; color: #F0DEC8; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #6B3D1E; border-radius: 4px; }
  input:focus, select:focus { outline: none; border-color: #C8872E !important; box-shadow: 0 0 0 3px rgba(200,135,46,0.15) !important; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%, 100% { box-shadow: 0 6px 24px rgba(200,135,46,0.45); } 50% { box-shadow: 0 6px 32px rgba(200,135,46,0.7); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade-in { animation: fadeIn 0.35s ease forwards; }
  .pop-in { animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
  .cart-btn { animation: pulse 2.5s ease-in-out infinite; }
  .lang-btn:active, .qty-btn:active, .remove-btn:active { transform: scale(0.93); }
  .menu-item:active { transform: scale(0.98); }
  .opt-btn { transition: all 0.15s; }
  .opt-btn:active { transform: scale(0.95); }
  .cat-pill { transition: all 0.2s ease; }
  .pay-option { transition: all 0.2s ease; }
  .pay-option:active { transform: scale(0.98); }
`;

const C = {
  bg: "#1A0C07",
  bgCard: "linear-gradient(145deg, #3A1E0E 0%, #4A2A16 60%, #3A1A09 100%)",
  border: "#6B3D1E",
  borderActive: "#C8872E",
  gold: "#C8872E",
  goldLight: "#E0A040",
  cream: "#F0DEC8",
  muted: "#A07848",
  dimmed: "#6B3D1E",
  success: "#7CB87A",
  header: "linear-gradient(180deg, #120804 0%, #1E0E07 100%)",
};

const S = {
  card: { background: C.bgCard, borderRadius: "16px", border: `1px solid ${C.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(200,135,46,0.08)" },
  input: { background: "rgba(0,0,0,0.35)", border: `1px solid ${C.border}`, borderRadius: "14px", color: C.cream, padding: "15px 18px", fontSize: "16px", width: "100%", fontFamily: "'Barlow', sans-serif", fontWeight: 500, transition: "all 0.2s" },
  btnPrimary: { background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, ${C.gold} 100%)`, border: "none", borderRadius: "14px", color: "#1A0C07", fontWeight: 800, fontSize: "17px", padding: "17px", width: "100%", cursor: "pointer", boxShadow: `0 4px 18px rgba(200,135,46,0.4)`, fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" },
  btnGhost: { background: "transparent", border: `1px solid ${C.border}`, borderRadius: "14px", color: C.gold, fontWeight: 700, fontSize: "15px", padding: "15px", width: "100%", cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.2s" },
  label: { color: C.muted, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "8px", fontFamily: "'Barlow', sans-serif" },
  pageWrap: { background: C.bg, minHeight: "100vh", fontFamily: "'Barlow', sans-serif", maxWidth: "480px", margin: "0 auto", position: "relative" },
};

const woodBg = { background: `repeating-linear-gradient(97deg,transparent 0px,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 3px),#1A0C07` };

// ============================================================
// COMPONENTS
// ============================================================
function LangBar({ lang, setLang, compact = false }) {
  return (
    <div style={{ display: "flex", gap: compact ? "5px" : "8px" }}>
      {[["th", "ไทย"], ["en", "EN"], ["ru", "RU"], ["de", "DE"]].map(([code, label]) => (
        <button key={code} className="lang-btn" onClick={() => setLang(code)} style={{
          padding: compact ? "5px 8px" : "8px 12px", borderRadius: "10px",
          border: lang === code ? `1px solid ${C.borderActive}` : `1px solid ${C.border}`,
          background: lang === code ? "rgba(200,135,46,0.22)" : "rgba(0,0,0,0.25)",
          color: lang === code ? C.gold : C.muted,
          fontSize: compact ? "10px" : "12px", cursor: "pointer",
          fontWeight: lang === code ? 800 : 600, fontFamily: "'Barlow', sans-serif", lineHeight: 1,
        }}>{label}</button>
      ))}
    </div>
  );
}

function PageHeader({ title, backLabel, onBack, lang, setLang, sub }) {
  return (
    <div style={{ background: C.header, padding: "14px 18px", position: "sticky", top: 0, zIndex: 200, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ minWidth: 60 }}>
          {onBack && <button onClick={onBack} style={{ background: "none", border: "none", color: C.gold, fontSize: "14px", cursor: "pointer", fontFamily: "'Barlow', sans-serif", fontWeight: 700, padding: 0 }}>← {backLabel}</button>}
        </div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: C.gold, margin: 0, fontSize: "21px" }}>{title}</h2>
          {sub && <p style={{ color: C.muted, margin: "2px 0 0", fontSize: "11px" }}>{sub}</p>}
        </div>
        <div style={{ minWidth: 60, display: "flex", justifyContent: "flex-end" }}><LangBar lang={lang} setLang={setLang} compact /></div>
      </div>
    </div>
  );
}

// Options selector component
function OptionsSelector({ item, lang, itemOpts, setItemOpts, t }) {
  if (!item.options?.length) return null;
  return (
    <div style={{ marginTop: "10px" }}>
      {item.options.map((opt, oi) => {
        const key = `${item.id}-${oi}`;
        const selected = itemOpts[key];
        return (
          <div key={oi} style={{ marginBottom: "8px" }}>
            <p style={{ color: C.muted, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
              {opt.label[lang]}:
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {opt.choices.map((ch, ci) => {
                const isSelected = selected === ci;
                return (
                  <button key={ci} className="opt-btn"
                    onClick={(e) => { e.stopPropagation(); setItemOpts(prev => ({ ...prev, [key]: ci })); }}
                    style={{
                      padding: "6px 12px", borderRadius: "20px", fontSize: "12px",
                      border: isSelected ? `1.5px solid ${C.gold}` : `1px solid ${C.border}`,
                      background: isSelected ? "rgba(200,135,46,0.2)" : "rgba(0,0,0,0.3)",
                      color: isSelected ? C.gold : C.muted,
                      cursor: "pointer", fontFamily: "'Barlow', sans-serif", fontWeight: isSelected ? 700 : 500,
                    }}>
                    {ch[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function BarOrderApp() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [customerName, setCustomerName] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrPayload, setQrPayload] = useState("");
  // itemOpts เก็บตัวเลือกที่ลูกค้าเลือกสำหรับแต่ละ item ก่อนเพิ่มลงตะกร้า
  const [itemOpts, setItemOpts] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get("table");
      if (tableParam && TABLES.includes(tableParam)) setSelectedTable(tableParam);
    }
  }, []);

  const t = T[lang];
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // สร้าง label ของ options ที่เลือก
  const getOptsLabel = (item, opts) => {
    if (!item.options?.length) return "";
    return item.options.map((opt, oi) => {
      const key = `${item.id}-${oi}`;
      const ci = opts[key];
      return ci !== undefined ? opt.choices[ci][lang] : null;
    }).filter(Boolean).join(", ");
  };

  const updateCartItem = (item, delta) => {
    // สร้าง key สำหรับ cart โดยรวม options ด้วย เพื่อให้เดิม option ต่างกันอยู่แถวต่างกัน
    const optsLabel = getOptsLabel(item, itemOpts);
    const cartKey = `${item.id}|${optsLabel}`;

    setCart((prev) => {
      const existing = prev.find((c) => c.cartKey === cartKey);
      if (!existing && delta > 0) {
        return [...prev, { ...item, cartKey, qty: 1, note: "", optsLabel }];
      }
      if (existing) {
        const nq = existing.qty + delta;
        if (nq <= 0) return prev.filter((c) => c.cartKey !== cartKey);
        return prev.map((c) => c.cartKey === cartKey ? { ...c, qty: nq } : c);
      }
      return prev;
    });
  };

  const getQty = (item) => {
    const optsLabel = getOptsLabel(item, itemOpts);
    const cartKey = `${item.id}|${optsLabel}`;
    return cart.find((c) => c.cartKey === cartKey)?.qty || 0;
  };

  const updateNote = (cartKey, note) => setCart((p) => p.map((c) => c.cartKey === cartKey ? { ...c, note } : c));
  const removeItem = (cartKey) => setCart((p) => p.filter((c) => c.cartKey !== cartKey));

  const submitOrder = async () => {
    setIsSubmitting(true);
    const now = new Date();
    setOrderTime(now.toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }));
    const orderData = {
      customerName, table: selectedTable, paymentMethod, lang,
      items: cart.map((i) => ({
        name: i.optsLabel ? `${i.name.en} (${i.optsLabel})` : i.name.en,
        qty: i.qty, price: i.price,
        note: i.note,
        options: i.optsLabel || "",
      })),
      total: totalPrice,
      timestamp: now.toISOString(),
    };
    try {
      await fetch("https://bar-order-backend.up.railway.app/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (e) { console.error("Order error:", e); }
    setIsSubmitting(false);
    setPage("success");
  };

  const resetAll = () => {
    setPage("home"); setCustomerName(""); setSelectedTable("");
    setCart([]); setPaymentMethod(""); setOrderTime(""); setQrPayload(""); setItemOpts({});
    if (typeof window !== "undefined") window.history.replaceState({}, "", window.location.pathname);
  };

  // ── HOME ──────────────────────────────────────────────────
  if (page === "home") return (
    <div style={{ ...S.pageWrap, ...woodBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px" }}>
      <style>{GLOBAL_CSS}</style>
      <div className="fade-in" style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(200,135,46,0.2), rgba(224,160,64,0.1))", border: `2px solid ${C.borderActive}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 14px", boxShadow: `0 0 40px rgba(200,135,46,0.25)` }}>🍺</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "34px", color: C.gold, fontWeight: 900, lineHeight: 1 }}>{t.appName}</h1>
          <p style={{ color: C.muted, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "6px" }}>{t.appSub}</p>
        </div>
        <div style={{ ...S.card, padding: "16px", marginBottom: "14px" }}>
          <span style={S.label}>{t.language}</span>
          <LangBar lang={lang} setLang={setLang} />
        </div>
        <div style={{ ...S.card, padding: "22px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={S.label}>{t.yourName}</label>
            <input type="text" placeholder={t.namePlaceholder} value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={S.input} />
          </div>
          <div style={{ marginBottom: "28px" }}>
            <label style={S.label}>{t.selectTable}</label>
            <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} style={{ ...S.input, appearance: "none", cursor: "pointer" }}>
              <option value="">{t.chooseTable}</option>
              {TABLES.map((tb) => <option key={tb} value={tb}>{tb}</option>)}
            </select>
          </div>
          <button style={{ ...S.btnPrimary, opacity: (!customerName.trim() || !selectedTable) ? 0.45 : 1 }} disabled={!customerName.trim() || !selectedTable} onClick={() => setPage("menu")}>{t.startOrder}</button>
        </div>
      </div>
    </div>
  );

  // ── MENU ──────────────────────────────────────────────────
  if (page === "menu") return (
    <div style={{ ...S.pageWrap, ...woodBg, paddingBottom: "100px" }}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.menu} sub={`${customerName} · ${selectedTable}`} lang={lang} setLang={setLang} />
      <div style={{ display: "flex", gap: "8px", padding: "12px 16px", overflowX: "auto", background: "rgba(0,0,0,0.2)", borderBottom: `1px solid ${C.border}`, position: "sticky", top: "55px", zIndex: 100 }}>
        {MENU.map((cat) => (
          <button key={cat.id} className="cat-pill" onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" })} style={{ padding: "7px 14px", borderRadius: "20px", whiteSpace: "nowrap", border: `1px solid ${C.border}`, background: "rgba(0,0,0,0.3)", color: C.muted, fontSize: "12px", cursor: "pointer", fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>{cat.emoji} {cat.name[lang]}</button>
        ))}
      </div>

      <div style={{ padding: "0 14px" }}>
        {MENU.map((cat) => (
          <div key={cat.id} id={cat.id} className="fade-in" style={{ marginTop: "22px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.gold, fontSize: "20px", fontWeight: 700, paddingBottom: "10px", borderBottom: `1px solid ${C.border}`, marginBottom: "12px" }}>{cat.emoji} {cat.name[lang]}</h3>
            {cat.items.filter((i) => i.enabled).map((item) => {
              const qty = getQty(item);
              const hasOpts = item.options?.length > 0;
              return (
                <div key={item.id} className="menu-item" style={{
                  ...S.card, padding: "14px 16px", marginBottom: "9px",
                  borderColor: qty > 0 ? C.borderActive : C.border,
                  background: qty > 0 ? "linear-gradient(145deg,#4A2510 0%,#5A3020 60%,#4A1F09 100%)" : S.card.background,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ flex: 1, paddingRight: "12px" }}>
                      <p style={{ color: C.cream, margin: "0 0 3px", fontSize: "15px", fontWeight: 600 }}>{item.name[lang]}</p>
                      <p style={{ color: C.gold, margin: 0, fontSize: "14px", fontWeight: 700 }}>{item.price} {t.thb}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                      {qty > 0 && <>
                        <button className="qty-btn" onClick={() => updateCartItem(item, -1)} style={{ width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${C.borderActive}`, background: "transparent", color: C.gold, fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ color: C.cream, fontWeight: 900, fontSize: "17px", minWidth: "22px", textAlign: "center" }}>{qty}</span>
                      </>}
                      <button className="qty-btn" onClick={() => updateCartItem(item, 1)} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "none", background: qty === 0 ? `linear-gradient(135deg,${C.gold},${C.goldLight})` : "rgba(200,135,46,0.25)", color: qty === 0 ? "#1A0C07" : C.gold, fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>+</button>
                    </div>
                  </div>
                  {hasOpts && (
                    <OptionsSelector item={item} lang={lang} itemOpts={itemOpts} setItemOpts={setItemOpts} t={t} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ height: "24px" }} />
      </div>

      {totalItems > 0 && (
        <button className="cart-btn" onClick={() => setPage("cart")} style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", borderRadius: "50px", color: "#1A0C07", fontWeight: 900, fontSize: "16px", padding: "16px 32px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Barlow', sans-serif", whiteSpace: "nowrap", zIndex: 300 }}>
          🛒 {t.cart} ({totalItems}) · {totalPrice} {t.thb}
        </button>
      )}
    </div>
  );

  // ── CART ──────────────────────────────────────────────────
  if (page === "cart") return (
    <div style={{ ...S.pageWrap, ...woodBg, paddingBottom: "110px" }}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.cart} backLabel={t.menu} onBack={() => setPage("menu")} lang={lang} setLang={setLang} />
      <div style={{ padding: "14px" }}>
        {cart.length === 0 ? (
          <div className="fade-in" style={{ textAlign: "center", padding: "70px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
            <p style={{ color: C.muted, fontSize: "18px", fontWeight: 600 }}>{t.cartEmpty}</p>
            <p style={{ color: C.dimmed, fontSize: "14px", marginTop: "6px" }}>{t.addItems}</p>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.cartKey} className="fade-in" style={{ ...S.card, padding: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.cream, fontSize: "16px", fontWeight: 600, marginBottom: "3px" }}>{item.name[lang]}</p>
                    {item.optsLabel && (
                      <p style={{ color: C.gold, fontSize: "12px", marginBottom: "3px", fontStyle: "italic" }}>▸ {item.optsLabel}</p>
                    )}
                    <p style={{ color: C.gold, fontSize: "13px" }}>
                      {item.price} {t.thb} × {item.qty} = <strong style={{ fontSize: "15px" }}>{item.price * item.qty} {t.thb}</strong>
                    </p>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.cartKey)} style={{ background: "rgba(200,60,60,0.12)", border: "1px solid rgba(200,60,60,0.25)", borderRadius: "8px", color: "#D07070", fontSize: "11px", fontWeight: 700, padding: "5px 10px", cursor: "pointer", fontFamily: "'Barlow', sans-serif" }}>{t.remove}</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ color: C.muted, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{t.qty}:</span>
                  <button className="qty-btn" onClick={() => updateCartItem(item, -1)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ color: C.cream, fontWeight: 900, fontSize: "18px", minWidth: "26px", textAlign: "center" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateCartItem(item, 1)} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "none", background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, color: "#1A0C07", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>+</button>
                </div>
                <input type="text" placeholder={t.notePlaceholder} value={item.note || ""} onChange={(e) => updateNote(item.cartKey, e.target.value)} style={{ ...S.input, padding: "11px 14px", fontSize: "14px", background: "rgba(0,0,0,0.28)", borderColor: "#4A2C1A" }} />
              </div>
            ))}
            <div style={{ ...S.card, padding: "16px 20px", marginTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: C.muted, fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{t.total}</span>
              <span style={{ color: C.gold, fontSize: "28px", fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>{totalPrice} {t.thb}</span>
            </div>
          </>
        )}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "480px", padding: "14px 16px", background: "linear-gradient(0deg,#120804 60%,transparent 100%)" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ ...S.btnGhost, flex: 1 }} onClick={() => setPage("menu")}>{t.backToMenu}</button>
          <button style={{ ...S.btnPrimary, flex: 2, opacity: cart.length === 0 ? 0.4 : 1 }} disabled={cart.length === 0} onClick={() => setPage("confirm")}>{t.confirmOrder}</button>
        </div>
      </div>
    </div>
  );

  // ── CONFIRM ──────────────────────────────────────────────
  if (page === "confirm") return (
    <div style={{ ...S.pageWrap, ...woodBg, paddingBottom: "110px" }}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.orderSummary} backLabel={t.cart} onBack={() => setPage("cart")} lang={lang} setLang={setLang} />
      <div style={{ padding: "14px" }} className="fade-in">
        <div style={{ background: "rgba(200,135,46,0.1)", border: "1px solid rgba(200,135,46,0.3)", borderRadius: "14px", padding: "13px 16px", marginBottom: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <p style={{ color: "#E0A040", margin: 0, fontSize: "14px", fontWeight: 600 }}>{t.reviewWarning}</p>
        </div>
        <div style={{ ...S.card, padding: "18px", marginBottom: "12px" }}>
          {[["👤", t.customer, customerName], ["🪑", t.table, selectedTable]].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ color: C.muted, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>{icon} {label}</span>
              <span style={{ color: C.cream, fontWeight: 700, fontSize: "15px" }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ ...S.card, padding: "18px", marginBottom: "12px" }}>
          <p style={{ color: C.muted, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700, marginBottom: "14px" }}>🍽 {t.items}</p>
          {cart.map((item, i) => (
            <div key={item.cartKey} style={{ paddingBottom: "11px", marginBottom: "11px", borderBottom: i < cart.length - 1 ? "1px solid rgba(107,61,30,0.4)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ color: C.cream, fontSize: "15px" }}>
                    <span style={{ color: C.gold, fontWeight: 800 }}>{item.qty}×</span> {item.name[lang]}
                  </span>
                  {item.optsLabel && <p style={{ color: C.muted, fontSize: "12px", marginTop: "2px", fontStyle: "italic" }}>▸ {item.optsLabel}</p>}
                  {item.note && <p style={{ color: C.muted, fontSize: "12px", marginTop: "2px", fontStyle: "italic" }}>📝 {item.note}</p>}
                </div>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: "15px", flexShrink: 0, marginLeft: "8px" }}>{item.price * item.qty} {t.thb}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...S.card, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: C.muted, fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{t.total}</span>
          <span style={{ color: C.gold, fontSize: "30px", fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>{totalPrice} {t.thb}</span>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "480px", padding: "14px 16px", background: "linear-gradient(0deg,#120804 60%,transparent 100%)" }}>
        <button style={S.btnPrimary} onClick={() => setPage("payment")}>{t.confirmOrder}</button>
      </div>
    </div>
  );

  // ── PAYMENT ──────────────────────────────────────────────
  if (page === "payment") return (
    <div style={{ ...S.pageWrap, ...woodBg, paddingBottom: "110px" }}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.payment} backLabel={t.back} onBack={() => setPage("confirm")} lang={lang} setLang={setLang} />
      <div style={{ padding: "18px 14px" }} className="fade-in">
        <div style={{ ...S.card, padding: "20px", marginBottom: "24px", textAlign: "center" }}>
          <p style={{ color: C.muted, fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px", fontWeight: 700 }}>{t.total}</p>
          <p style={{ color: C.gold, fontSize: "36px", fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>{totalPrice} {t.thb}</p>
        </div>
        <p style={{ color: C.muted, fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px", fontWeight: 700, textAlign: "center" }}>{t.selectPayment}</p>
        <button className="pay-option" onClick={() => setPaymentMethod("cash")} style={{ ...S.card, width: "100%", padding: "20px 18px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", textAlign: "left", border: paymentMethod === "cash" ? `2px solid ${C.borderActive}` : `1px solid ${C.border}`, background: paymentMethod === "cash" ? "linear-gradient(145deg,rgba(200,135,46,0.2),rgba(224,160,64,0.08))" : S.card.background }}>
          <span style={{ fontSize: "34px" }}>💵</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: C.cream, fontSize: "18px", fontWeight: 700, marginBottom: "3px" }}>{t.cash}</p>
            <p style={{ color: C.muted, fontSize: "13px", margin: 0 }}>{t.cashSub}</p>
          </div>
          {paymentMethod === "cash" && <span style={{ color: C.gold, fontSize: "22px", fontWeight: 900 }}>✓</span>}
        </button>
        <button className="pay-option" onClick={() => { setPaymentMethod("promptpay"); setQrPayload(buildPromptPayQR(totalPrice)); }} style={{ ...S.card, width: "100%", padding: "20px 18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", textAlign: "left", border: paymentMethod === "promptpay" ? `2px solid ${C.borderActive}` : `1px solid ${C.border}`, background: paymentMethod === "promptpay" ? "linear-gradient(145deg,rgba(200,135,46,0.2),rgba(224,160,64,0.08))" : S.card.background }}>
          <span style={{ fontSize: "34px" }}>📱</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: C.cream, fontSize: "18px", fontWeight: 700, marginBottom: "3px" }}>{t.promptpay}</p>
            <p style={{ color: C.muted, fontSize: "13px", margin: 0 }}>{t.promptpaySub}</p>
          </div>
          {paymentMethod === "promptpay" && <span style={{ color: C.gold, fontSize: "22px", fontWeight: 900 }}>✓</span>}
        </button>
        {paymentMethod === "promptpay" && (
          <div className="pop-in" style={{ ...S.card, padding: "24px", textAlign: "center" }}>
            <p style={{ color: C.gold, fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "18px" }}>{t.qrInstructions}</p>
            <div style={{ padding: "12px", background: "white", borderRadius: "16px", display: "inline-block", marginBottom: "14px" }}>
              <QRImage value={qrPayload} size={180} />
            </div>
            <p style={{ color: C.gold, fontSize: "26px", fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>{totalPrice} {t.thb}</p>
            <p style={{ color: C.muted, fontSize: "12px", marginTop: "6px" }}>{t.scanToPay} · PromptPay</p>
          </div>
        )}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "480px", padding: "14px 16px", background: "linear-gradient(0deg,#120804 60%,transparent 100%)" }}>
        <button style={{ ...S.btnPrimary, opacity: (!paymentMethod || isSubmitting) ? 0.45 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }} disabled={!paymentMethod || isSubmitting} onClick={submitOrder}>
          {isSubmitting ? (<><span style={{ width: "18px", height: "18px", border: "2px solid #1A0C07", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />{t.loading}</>) : t.submitOrder}
        </button>
      </div>
    </div>
  );

  // ── SUCCESS ──────────────────────────────────────────────
  if (page === "success") return (
    <div style={{ ...S.pageWrap, ...woodBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <div className="pop-in" style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(124,184,122,0.2),rgba(80,150,80,0.1))", border: "2px solid #7CB87A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: "44px", boxShadow: "0 0 40px rgba(124,184,122,0.2)" }}>🎉</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#7CB87A", fontSize: "30px", marginBottom: "10px" }}>{t.orderSuccess}</h1>
        <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.6, marginBottom: "30px" }}>{t.successMessage}</p>
        <div style={{ ...S.card, padding: "20px", marginBottom: "14px", textAlign: "left" }}>
          {[["🕐", t.time, orderTime], ["👤", t.customer, customerName], ["🪑", t.table, selectedTable], ["💳", t.payment, paymentMethod === "cash" ? t.cash : t.promptpay]].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "11px" }}>
              <span style={{ color: C.muted, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>{icon} {label}</span>
              <span style={{ color: C.cream, fontWeight: 700, fontSize: "14px" }}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{ ...S.card, padding: "18px", marginBottom: "20px", textAlign: "left" }}>
          {cart.map((item) => (
            <div key={item.cartKey} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: C.muted, fontSize: "14px" }}>
                  <span style={{ color: C.gold, fontWeight: 800 }}>{item.qty}×</span> {item.name[lang]}
                </span>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: "14px" }}>{item.price * item.qty} {t.thb}</span>
              </div>
              {item.optsLabel && <p style={{ fontSize: "11px", color: C.dimmed, fontStyle: "italic", marginTop: "2px" }}>▸ {item.optsLabel}</p>}
              {item.note && <p style={{ fontSize: "11px", fontStyle: "italic", color: C.dimmed, marginTop: "2px" }}>📝 {item.note}</p>}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: C.muted, fontWeight: 700, textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>{t.total}</span>
            <span style={{ color: C.gold, fontWeight: 900, fontSize: "20px", fontFamily: "'Playfair Display', serif" }}>{totalPrice} {t.thb}</span>
          </div>
        </div>
        <button style={S.btnPrimary} onClick={resetAll}>{t.newOrder}</button>
      </div>
    </div>
  );

  return null;
}
