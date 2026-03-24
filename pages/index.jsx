import { useState, useEffect, useRef } from "react";

// ============================================================
// CONFIG — แก้ค่าเหล่านี้
// ============================================================
const BACKEND_URL = "https://bar-order-backend.up.railway.app";
const PROMPTPAY_NUMBER = "0637317929"; // ← เปลี่ยนเป็นเบอร์จริง
const SUPABASE_URL = "https://rueoezsapearqdomlmqu.supabase.co"; // ← เปลี่ยน
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1ZW9lenNhcGVhcnFkb21sbXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTkzODcsImV4cCI6MjA4OTY3NTM4N30.o6fP7Doi1jwpRlf9yjy2deFRtE7rXpxA-rtRx-4SIGc"; // ← เปลี่ยน

// ============================================================
// TRANSLATIONS
// ============================================================
const T = {
  en: {
    appName:"Siam Amsterdam",appSub:"Online Order",
    yourName:"Your Name",namePlaceholder:"Enter your name",
    selectTable:"Select Table",chooseTable:"Choose a table...",
    language:"Language",startOrder:"Start Ordering →",
    menu:"Menu",cart:"Cart",cartEmpty:"Your cart is empty",
    addItems:"Add items from the menu to get started",
    backToMenu:"← Add More Items",confirmOrder:"Review Order →",
    orderSummary:"Order Summary",customer:"Customer",table:"Table",
    items:"Items",total:"Total",qty:"Qty",
    notePlaceholder:"Note: e.g. no ice, extra sauce...",
    remove:"Remove",reviewWarning:"Please review your order before confirming.",
    payment:"Payment",selectPayment:"Select Payment Method",
    cash:"Cash",cashSub:"Pay when staff arrives",
    promptpay:"PromptPay / QR",promptpaySub:"Scan & pay instantly",
    qrInstructions:"Scan QR to pay",submitOrder:"Submit Order",
    orderSuccess:"Order Created! 🎉",
    successMessage:"Our staff will prepare and serve your order as soon as possible.",
    newOrder:"Place New Order",thb:"THB",back:"Back",
    loading:"Submitting...",note:"Note",time:"Time",
    scanToPay:"Scan to pay",selectOption:"Please select",
    uploadSlip:"Upload Payment Slip",
    uploadSlipSub:"Take a photo or upload your transfer slip",
    uploadRequired:"Please upload your payment slip before confirming",
    uploadSuccess:"Slip uploaded ✓",
    uploadTap:"Tap to upload slip 📷",
    uploadChange:"Change slip",
    slipUploading:"Uploading...",
  },
  th: {
    appName:"Siam Amsterdam",appSub:"สั่งออนไลน์",
    yourName:"ชื่อของคุณ",namePlaceholder:"กรอกชื่อของคุณ",
    selectTable:"เลือกโต๊ะ",chooseTable:"เลือกโต๊ะ...",
    language:"ภาษา",startOrder:"เริ่มสั่ง →",
    menu:"เมนู",cart:"ตะกร้า",cartEmpty:"ตะกร้าว่างเปล่า",
    addItems:"เพิ่มรายการจากเมนูเพื่อเริ่มต้น",
    backToMenu:"← เพิ่มรายการ",confirmOrder:"ตรวจสอบคำสั่ง →",
    orderSummary:"สรุปคำสั่งซื้อ",customer:"ลูกค้า",table:"โต๊ะ",
    items:"รายการ",total:"รวม",qty:"จำนวน",
    notePlaceholder:"หมายเหตุ: เช่น ไม่ใส่น้ำแข็ง...",
    remove:"ลบ",reviewWarning:"กรุณาตรวจสอบคำสั่งซื้อก่อนยืนยัน",
    payment:"ชำระเงิน",selectPayment:"เลือกวิธีชำระเงิน",
    cash:"เงินสด",cashSub:"ชำระเมื่อพนักงานมาถึง",
    promptpay:"พร้อมเพย์ / QR",promptpaySub:"สแกนและชำระทันที",
    qrInstructions:"สแกน QR เพื่อชำระเงิน",submitOrder:"ส่งคำสั่งซื้อ",
    orderSuccess:"สั่งเรียบร้อยแล้ว! 🎉",
    successMessage:"พนักงานของเราจะเตรียมและเสิร์ฟคำสั่งของคุณโดยเร็วที่สุด",
    newOrder:"สั่งใหม่",thb:"บาท",back:"กลับ",
    loading:"กำลังส่ง...",note:"หมายเหตุ",time:"เวลา",
    scanToPay:"สแกนเพื่อชำระ",selectOption:"กรุณาเลือก",
    uploadSlip:"อัปโหลดสลิปโอนเงิน",
    uploadSlipSub:"ถ่ายรูปหรืออัปโหลดสลิปการโอนเงิน",
    uploadRequired:"กรุณาอัปโหลดสลิปก่อนยืนยันคำสั่ง",
    uploadSuccess:"อัปโหลดสลิปแล้ว ✓",
    uploadTap:"กดเพื่ออัปโหลดสลิป 📷",
    uploadChange:"เปลี่ยนสลิป",
    slipUploading:"กำลังอัปโหลด...",
  },
  ru: {
    appName:"Siam Amsterdam",appSub:"Онлайн заказ",
    yourName:"Ваше имя",namePlaceholder:"Введите ваше имя",
    selectTable:"Выберите стол",chooseTable:"Выберите стол...",
    language:"Язык",startOrder:"Начать заказ →",
    menu:"Меню",cart:"Корзина",cartEmpty:"Корзина пуста",
    addItems:"Добавьте блюда из меню",
    backToMenu:"← Добавить ещё",confirmOrder:"Проверить заказ →",
    orderSummary:"Сводка заказа",customer:"Клиент",table:"Стол",
    items:"Позиции",total:"Итого",qty:"Кол.",
    notePlaceholder:"Заметка: без льда...",
    remove:"Удалить",reviewWarning:"Проверьте заказ перед подтверждением.",
    payment:"Оплата",selectPayment:"Способ оплаты",
    cash:"Наличные",cashSub:"Оплата при получении",
    promptpay:"PromptPay / QR",promptpaySub:"Сканировать и оплатить",
    qrInstructions:"Сканируйте QR",submitOrder:"Отправить заказ",
    orderSuccess:"Заказ оформлен! 🎉",
    successMessage:"Персонал приготовит заказ как можно скорее.",
    newOrder:"Новый заказ",thb:"бат",back:"Назад",
    loading:"Отправка...",note:"Заметка",time:"Время",
    scanToPay:"Сканировать",selectOption:"Выберите",
    uploadSlip:"Загрузить квитанцию",
    uploadSlipSub:"Сфотографируйте или загрузите квитанцию об оплате",
    uploadRequired:"Пожалуйста, загрузите квитанцию перед подтверждением",
    uploadSuccess:"Квитанция загружена ✓",
    uploadTap:"Нажмите для загрузки 📷",
    uploadChange:"Изменить",
    slipUploading:"Загрузка...",
  },
  de: {
    appName:"Siam Amsterdam",appSub:"Online Bestellen",
    yourName:"Ihr Name",namePlaceholder:"Namen eingeben",
    selectTable:"Tisch wählen",chooseTable:"Tisch auswählen...",
    language:"Sprache",startOrder:"Jetzt bestellen →",
    menu:"Speisekarte",cart:"Warenkorb",cartEmpty:"Ihr Warenkorb ist leer",
    addItems:"Artikel aus dem Menü hinzufügen",
    backToMenu:"← Weiter bestellen",confirmOrder:"Bestellung prüfen →",
    orderSummary:"Bestellübersicht",customer:"Kunde",table:"Tisch",
    items:"Artikel",total:"Gesamt",qty:"Anz.",
    notePlaceholder:"Notiz: kein Eis...",
    remove:"Entfernen",reviewWarning:"Bitte überprüfen Sie Ihre Bestellung.",
    payment:"Zahlung",selectPayment:"Zahlungsmethode",
    cash:"Bargeld",cashSub:"Zahlung bei Lieferung",
    promptpay:"PromptPay / QR",promptpaySub:"Per QR bezahlen",
    qrInstructions:"QR-Code scannen",submitOrder:"Bestellung senden",
    orderSuccess:"Bestellung erstellt! 🎉",
    successMessage:"Unser Personal bringt Ihre Bestellung.",
    newOrder:"Neue Bestellung",thb:"THB",back:"Zurück",
    loading:"Senden...",note:"Notiz",time:"Zeit",
    scanToPay:"Scannen",selectOption:"Bitte wählen",
    uploadSlip:"Zahlungsbeleg hochladen",
    uploadSlipSub:"Foto oder Beleg hochladen",
    uploadRequired:"Bitte laden Sie den Beleg hoch",
    uploadSuccess:"Beleg hochgeladen ✓",
    uploadTap:"Tippen zum Hochladen 📷",
    uploadChange:"Ändern",
    slipUploading:"Hochladen...",
  },
};

// ============================================================
// MENU — Siam Amsterdam v4
// ============================================================
function opt(en,th,ru,de,choices){
  return {
    label:{en,th,ru,de},
    choices:choices.map(([a,b,c,d])=>({en:a,th:b,ru:c,de:d})),
  };
}

const MENU = [
  {
    id:"draft_beer",emoji:"🍺",
    name:{en:"Draft Beer",th:"เบียร์สด",ru:"Разливное пиво",de:"Fassbier"},
    items:[
      {id:1,price:90,enabled:true,name:{en:"Chang Cold Brew 0.3L",th:"ช้าง Cold Brew 0.3L",ru:"Чанг 0.3L",de:"Chang 0.3L"}},
      {id:2,price:120,enabled:true,name:{en:"Chang Cold Brew 0.5L",th:"ช้าง Cold Brew 0.5L",ru:"Чанг 0.5L",de:"Chang 0.5L"}},
      {id:3,price:120,enabled:true,name:{en:"Zhigulevskoe 0.3L",th:"จิกูเลฟสกอย 0.3L",ru:"Жигулёвское 0.3L",de:"Zhigulevskoe 0.3L"}},
      {id:4,price:160,enabled:true,name:{en:"Zhigulevskoe 0.5L",th:"จิกูเลฟสกอย 0.5L",ru:"Жигулёвское 0.5L",de:"Zhigulevskoe 0.5L"}},
    ],
  },
  {
    id:"bottle_beer",emoji:"🍻",
    name:{en:"Bottle Beer",th:"เบียร์ขวด",ru:"Бутылочное пиво",de:"Flaschenbier"},
    items:[
      {id:5,price:70,enabled:true,name:{en:"Chang",th:"ช้าง",ru:"Чанг",de:"Chang"}, loyverse_item_id:"3aceaaeb-ad56-49d6-9988-98fb00cef068", loyverse_variant_id:"b1eaad24-4ed4-4f01-b6df-76686532ab98"},
      {id:6,price:70,enabled:true,name:{en:"Singha",th:"สิงห์",ru:"Сингха",de:"Singha"}, loyverse_item_id:"419f49fd-d697-4567-87dd-a51422238113", loyverse_variant_id:"5df87d58-35f9-4ca5-8015-7bacef425df9"},
      {id:7,price:70,enabled:true,name:{en:"LEO",th:"ลีโอ",ru:"Лео",de:"Leo"}, loyverse_item_id:"5f35b5ae-e310-4af8-9009-339aff1f578d", loyverse_variant_id:"330dbb97-2847-462b-9600-45151fa4f042"},
      {id:8,price:80,enabled:true,name:{en:"San Miguel",th:"ซานมิเกล",ru:"Сан Мигель",de:"San Miguel"}, loyverse_item_id:"345b8b85-5fa6-47de-8d45-16821a7a6ca1", loyverse_variant_id:"48451723-4eac-4fc8-b3b9-3d3d1b0e25ec"},
      {id:9,price:80,enabled:true,name:{en:"Heineken",th:"ไฮเนเก้น",ru:"Хайнекен",de:"Heineken"}, loyverse_item_id:"ca875196-3c05-40fb-812d-4c41b82389d9", loyverse_variant_id:"d4c7d248-31bd-4633-adbb-b2ef510bb68c"},
      {id:10,price:80,enabled:true,name:{en:"Pattaya Beer",th:"พัทยาเบียร์",ru:"Паттайя Бир",de:"Pattaya Beer"}, loyverse_item_id: "d657900e-a032-4fa8-a352-ecf867a4c51d", loyverse_variant_id: "d3fa5c1d-8fdd-45b6-96c3-834a0138fe16"},
      {id:11,price:80,enabled:true,name:{en:"Asahi",th:"อาซาฮี",ru:"Асахи",de:"Asahi"}, loyverse_item_id: "f0053270-55e0-477d-a522-d461931af552", loyverse_variant_id: "1337cf63-6b13-4498-98eb-e0ac14e0358f"},
      {id:12,price:90,enabled:true,name:{en:"Budweiser",th:"บัดไวเซอร์",ru:"Будвайзер",de:"Budweiser"}, loyverse_item_id: "f12211ae-188a-4e35-963e-24e50def64fb", loyverse_variant_id: "469a6e48-3742-454a-b006-99dba5ac4448"},
      {id:13,price:90,enabled:true,name:{en:"Stella Artois",th:"สเตลล่า อาร์ทัวส์",ru:"Стелла Артуа",de:"Stella Artois"}, loyverse_item_id: "bf316a53-f3d5-45df-9650-5c30f9bd25f2", loyverse_variant_id: "d8220d51-b9dd-4c49-bb68-e1bb4d755ba8"},
      {id:14,price:100,enabled:true,name:{en:"German Recipe",th:"เยอรมัน เรสซิปี้",ru:"Немецкий рецепт",de:"German Recipe"}, loyverse_item_id: "e0b298d2-17b4-475e-acc8-6d736c4c3c59", loyverse_variant_id: "cec3c77e-15bd-4b86-b54a-2b0eb4718414"
      , options:[opt("Type","ประเภท","Тип","Typ",[["Lager","ลาเกอร์","Лагер","Lager"],["Unfiltered","ไม่กรอง","Нефильтрованное","Ungefiltert"],["Dark","ดาร์ก","Тёмное","Dunkel"]])]},
      {id:15,price:120,enabled:true,name:{en:"Beerlao",th:"เบียร์ลาว",ru:"Бирлао",de:"Beerlao"}, loyverse_item_id: "6b4f0f1a-741e-4379-b075-6dbca8e685bd", loyverse_variant_id: "e3568f67-fc6b-40da-802c-1f59d882790c"
      , options:[opt("Type","ประเภท","Тип","Typ",[["Premium Lager","พรีเมี่ยม ลาเกอร์","Премиум Лагер","Premium Lager"],["IPA","IPA","IPA","IPA"],["Dark","ดาร์ก","Тёмное","Dunkel"]])]},
      {id:16,price:120,enabled:true,name:{en:"Corona Beer",th:"โคโรน่า",ru:"Корона",de:"Corona"}, loyverse_item_id: "78869b70-c257-417d-acc2-09ed0438578e", loyverse_variant_id: "4b974cae-0670-4762-87d0-95e3093f852e"},
      {id:17,price:150,enabled:true,name:{en:"Savanna Premium Cider",th:"ซาวานน่า ไซเดอร์",ru:"Саванна Сидр",de:"Savanna Cider"}, loyverse_item_id: "21df57f5-4157-4ab0-bb91-83ac5380bb51", loyverse_variant_id: "c4a6f817-ceb2-478c-8e20-d8bdcecbc8cf"},
      {id:18,price:180,enabled:true,name:{en:"Hoegaarden 550ml",th:"ฮูการ์เดน 550มล.",ru:"Хугарден 550мл",de:"Hoegaarden 550ml"}, loyverse_item_id: "a8c2ae65-aff7-4715-a458-886297c2c086", loyverse_variant_id: "270bb1ff-3cfa-45a5-b742-c83cfcf451ec"
      , options:[opt("Type","ประเภท","Тип","Typ",[["Witbier","วิทเบียร์","Витбир","Witbier"],["Rosée","โรเซ่","Розе","Rosée"]])]},
    ],
  },
  {
    id:"cocktails",emoji:"🍹",
    name:{en:"Cocktails",th:"ค็อกเทล",ru:"Коктейли",de:"Cocktails"},
    items:[
      {id:19,price:200,enabled:true,name:{en:"Mojito",th:"โมฮิโต้",ru:"Мохито",de:"Mojito"}},
      {id:20,price:200,enabled:true,name:{en:"Blue Mojito",th:"บลู โมฮิโต้",ru:"Синий Мохито",de:"Blue Mojito"}},
      {id:21,price:180,enabled:true,name:{en:"Kamikaze",th:"คามิคาเซ่",ru:"Камикадзе",de:"Kamikaze"}},
      {id:22,price:180,enabled:true,name:{en:"Blue Kamikaze",th:"บลู คามิคาเซ่",ru:"Синий Камикадзе",de:"Blue Kamikaze"}},
      {id:23,price:180,enabled:true,name:{en:"Daiquiri",th:"ดาอิคิรี",ru:"Дайкири",de:"Daiquiri"}},
      {id:24,price:200,enabled:true,name:{en:"Margarita",th:"มาการิต้า",ru:"Маргарита",de:"Margarita"}},
      {id:25,price:200,enabled:true,name:{en:"Blue Margarita",th:"บลู มาการิต้า",ru:"Синяя Маргарита",de:"Blue Margarita"}},
      {id:26,price:180,enabled:true,name:{en:"Gin Gimlet",th:"จิน กิมเล็ต",ru:"Джин Гимлет",de:"Gin Gimlet"}},
      {id:27,price:180,enabled:true,name:{en:"Vodka Gimlet",th:"วอดก้า กิมเล็ต",ru:"Водка Гимлет",de:"Vodka Gimlet"}},
      {id:28,price:180,enabled:true,name:{en:"Screwdriver",th:"สครูไดรเวอร์",ru:"Отвёртка",de:"Screwdriver"}},
      {id:29,price:180,enabled:true,name:{en:"White Lady",th:"ไวท์ เลดี้",ru:"Белая Леди",de:"White Lady"}},
      {id:30,price:180,enabled:true,name:{en:"Orange Martini",th:"ออเรนจ์ มาร์ตินี่",ru:"Апельсиновый Мартини",de:"Orange Martini"}},
      {id:31,price:180,enabled:true,name:{en:"Gin Tonic",th:"จิน โทนิค",ru:"Джин Тоник",de:"Gin Tonic"}},
      {id:32,price:180,enabled:true,name:{en:"Whisky Cola",th:"วิสกี้ โคล่า",ru:"Виски Кола",de:"Whisky Cola"}},
      {id:33,price:200,enabled:true,name:{en:"Long Island Iced Tea",th:"ลองไอส์แลนด์",ru:"Лонг Айленд",de:"Long Island"}},
      {id:34,price:200,enabled:true,name:{en:"Pineapple Silk",th:"ไพน์แอปเปิล ซิลค์",ru:"Ананасовый Шёлк",de:"Pineapple Silk"}},
      {id:35,price:150,enabled:true,name:{en:"Sangsom Cola",th:"แสงสอม โคล่า",ru:"Сангсом Кола",de:"Sangsom Cola"}},
      {id:36,price:200,enabled:true,name:{en:"Mai Tai",th:"ไม ไต",ru:"Май Тай",de:"Mai Tai"}},
      {id:37,price:200,enabled:true,name:{en:"Tequila Sunrise",th:"เตกีล่า ซันไรส์",ru:"Текила Санрайз",de:"Tequila Sunrise"}},
      {id:38,price:180,enabled:true,name:{en:"Gin Fizz",th:"จิน ฟิซซ์",ru:"Джин Физз",de:"Gin Fizz"}},
      {id:39,price:180,enabled:true,name:{en:"Cuba Libre",th:"คิวบา ลิเบร",ru:"Куба Либре",de:"Cuba Libre"}},
      {id:40,price:200,enabled:true,name:{en:"Mary Pickford",th:"แมรี่ พิกฟอร์ด",ru:"Мэри Пикфорд",de:"Mary Pickford"}},
    ],
  },
  {
    id:"cold_smoked",emoji:"🥩",
    name:{en:"Cold Smoked Meat",th:"เนื้อรมควัน",ru:"Мясная нарезка",de:"Räucherfleisch"},
    items:[
      {id:41,price:150,enabled:true,name:{en:"Smoked Chicken",th:"ไก่รมควัน",ru:"Курица копчёная",de:"Räucherhuhn"}},
      {id:42,price:150,enabled:true,name:{en:"Smoked Pork",th:"หมูรมควัน",ru:"Свинина копчёная",de:"Räucherschwein"}},
      {id:43,price:200,enabled:true,name:{en:"Smoked Beef",th:"เนื้อรมควัน",ru:"Говядина копчёная",de:"Räucherrindfleisch"}},
    ],
  },
  {
    id:"snacks",emoji:"🍟",
    name:{en:"Snacks",th:"ของว่าง",ru:"Закуски",de:"Snacks"},
    items:[
      {id:44,price:50,enabled:true,name:{en:"Pringles Small",th:"พริงเกิ้ล เล็ก",ru:"Принглс маленький",de:"Pringles Klein"},
        options:[opt("Flavour","รสชาติ","Вкус","Geschmack",[["Original","ออริจินัล","Оригинальный","Original"],["Sour Cream & Onions","เปรี้ยวครีมหัวหอม","Сметана и лук","Saure Sahne & Zwiebel"],["Cheese","ชีส","Сыр","Käse"]])]},
      {id:45,price:90,enabled:true,name:{en:"Pringles Large",th:"พริงเกิ้ล ใหญ่",ru:"Принглс большой",de:"Pringles Groß"},
        options:[opt("Flavour","รสชาติ","Вкус","Geschmack",[["Original","ออริจินัล","Оригинальный","Original"],["Sour Cream & Onions","เปรี้ยวครีมหัวหอม","Сметана и лук","Saure Sahne & Zwiebel"],["Cheese","ชีส","Сыร","Käse"]])]},
      {id:46,price:20,enabled:true,name:{en:"Nuts Small",th:"ถั่ว เล็ก",ru:"Орешки маленькие",de:"Nüsse Klein"}},
      {id:47,price:30,enabled:true,name:{en:"Nuts",th:"ถั่ว",ru:"Орешки",de:"Nüsse"}},
      {id:48,price:40,enabled:true,name:{en:"DALE Chocolate",th:"เดล ช็อกโกแลต",ru:"ДАЛЕ Шоколад",de:"DALE Schokolade"}},
      {id:49,price:50,enabled:true,name:{en:"Snickers",th:"สนิกเกอร์ส",ru:"Сникерс",de:"Snickers"},
        options:[opt("Type","ประเภท","Тип","Typ",[["Original","ออริจินัล","Оригинальный","Original"],["White","ไวท์","Белый","Weiß"]])]},
      {id:50,price:60,enabled:true,name:{en:"Rye Bread Snack",th:"ขนมปังไรย์",ru:"Ржаные гренки",de:"Roggenbrotstück"},
        options:[opt("Flavour","รสชาติ","Вкус","Geschmack",[["Cheese","ชีส","Сыр","Käse"],["Sour Cream & Onions","เปรี้ยวครีมหัวหอม","Сметана и лук","Saure Sahne & Zwiebel"],["Jellymeat","เจลลี่มีท","Мясное желе","Fleischgelee"],["BBQ","บาร์บีคิว","Барбекю","BBQ"],["Ajika Sauce","อาจิกา ซอส","Аджика","Ajika-Sauce"]])]},
    ],
  },
  {
    id:"drinks",emoji:"🥤",
    name:{en:"Soft Drinks",th:"เครื่องดื่ม",ru:"Напитки",de:"Getränke"},
    items:[
      {id:51,price:20,enabled:true,name:{en:"Water",th:"น้ำเปล่า",ru:"Вода",de:"Wasser"}},
      {id:52,price:30,enabled:true,name:{en:"Mineral Water",th:"น้ำแร่",ru:"Минеральная вода",de:"Mineralwasser"}},
      {id:53,price:40,enabled:true,name:{en:"Coca Cola",th:"โค้ก",ru:"Кока-Кола",de:"Coca Cola"},
        options:[opt("Type","ประเภท","Тип","Typ",[["Can","กระป๋อง","Банка","Dose"],["Bottle","ขวด","Бутылка","Flasche"]])]},
      {id:54,price:40,enabled:true,name:{en:"Coca Cola Zero",th:"โค้ก ซีโร่",ru:"Кока-Кола Зеро",de:"Coca Cola Zero"}},
      {id:55,price:40,enabled:true,name:{en:"Sprite",th:"สไปรท์",ru:"Спрайт",de:"Sprite"}},
      {id:56,price:40,enabled:true,name:{en:"Schweppes",th:"ชเวปส์",ru:"Швепс",de:"Schweppes"}},
      {id:57,price:40,enabled:true,name:{en:"Lipton Iced Tea",th:"ลิปตัน ชาเย็น",ru:"Липтон холодный чай",de:"Lipton Eistee"}},
      {id:58,price:30,enabled:true,name:{en:"Soda Water",th:"โซดา",ru:"Содовая",de:"Sodawasser"}},
      {id:59,price:50,enabled:true,name:{en:"Gatorade",th:"เกเตอเรด",ru:"Гейторейд",de:"Gatorade"},
        options:[opt("Flavour","รสชาติ","Вкус","Geschmack",[["Blue (Cool Blue)","บลู","Синий","Blau"],["Lime (Citrus Charge)","ไลม์","Лайм","Limette"]])]},
      {id:60,price:40,enabled:true,name:{en:"Juice",th:"น้ำผลไม้",ru:"Сок",de:"Saft"}},
      {id:61,price:40,enabled:true,name:{en:"Singha Soda Sparkling",th:"สิงห์ โซดา",ru:"Сингха Газировка",de:"Singha Sprudelwasser"},
        options:[opt("Flavour","รสชาติ","Вкус","Geschmack",[["Lemon Soda","เลมอนโซดา","Лимонная содовая","Zitronenlimonade"],["Lemon Cream Soda","เลมอนครีมโซดา","Лимонный крем-содовый","Zitronen-Cream-Soda"]])]},
    ],
  },
];

const TABLES = [
  "G01","G02","G03",
  "PS Room","Billiard Pool",
  "Rooftop 1","Rooftop 2","Rooftop 3","Rooftop 4",
  "Rooftop 5","Rooftop 6","Rooftop 7",
];

// ============================================================
// PROMPTPAY QR — ไม่ต้อง npm install
// ============================================================
function crc16(d){let c=0xFFFF;for(let i=0;i<d.length;i++){c^=d.charCodeAt(i)<<8;for(let j=0;j<8;j++)c=(c&0x8000)?((c<<1)^0x1021):(c<<1);}return(c&0xFFFF).toString(16).toUpperCase().padStart(4,"0");}
function f(id,v){return`${id}${v.length.toString().padStart(2,"0")}${v}`;}
function buildPromptPayQR(amount){
  const id=PROMPTPAY_NUMBER.replace(/-/g,"");
  const san=id.startsWith("0")?"0066"+id.substring(1):id;
  const mer=f("29",f("00","A000000677010111")+f("01",san));
  const amt=amount>0?f("54",amount.toFixed(2)):"";
  const pl=f("00","01")+f("01","12")+mer+f("53","764")+amt+f("58","TH")+"6304";
  return pl+crc16(pl);
}

function QRImage({value,size=190}){
  const[src,setSrc]=useState("");
  useEffect(()=>{
    if(!value||typeof window==="undefined")return;
    const try_=()=>{
      if(typeof window.QRCode==="undefined"){setTimeout(try_,200);return;}
      const div=document.createElement("div");
      try{
        new window.QRCode(div,{text:value,width:size,height:size,colorDark:"#000000",colorLight:"#ffffff",correctLevel:window.QRCode.CorrectLevel.M});
        setTimeout(()=>{const img=div.querySelector("img");const c=div.querySelector("canvas");if(img?.src)setSrc(img.src);else if(c)setSrc(c.toDataURL());},300);
      }catch(e){console.error(e);}
    };
    const ex=document.querySelector('script[src*="qrcodejs"]');
    if(!ex){const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";s.onload=try_;document.head.appendChild(s);}
    else if(typeof window.QRCode!=="undefined")try_();
    else ex.addEventListener("load",try_);
  },[value,size]);
  return src?(
    <img src={src} alt="PromptPay QR" style={{width:size,height:size,borderRadius:"12px",display:"block",margin:"0 auto"}}/>
  ):(
    <div style={{width:size,height:size,background:"#fff",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",color:"#999",fontSize:"13px",margin:"0 auto"}}>Loading QR...</div>
  );
}

// ============================================================
// SUPABASE SLIP UPLOAD
// ============================================================
async function uploadSlipToSupabase(file, orderId) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `slips/${orderId}_${Date.now()}.${ext}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": file.type || "image/jpeg",
      "x-upsert": "true",
    },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
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
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes popIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
  @keyframes pulse { 0%,100% { box-shadow:0 6px 24px rgba(200,135,46,0.45); } 50% { box-shadow:0 6px 32px rgba(200,135,46,0.7); } }
  @keyframes spin { to { transform:rotate(360deg); } }
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
  .slip-upload { transition: all 0.2s; }
  .slip-upload:active { transform: scale(0.98); }
`;

const C = {
  bg:"#1A0C07",
  bgCard:"linear-gradient(145deg,#3A1E0E 0%,#4A2A16 60%,#3A1A09 100%)",
  border:"#6B3D1E",borderActive:"#C8872E",
  gold:"#C8872E",goldLight:"#E0A040",
  cream:"#F0DEC8",muted:"#A07848",dimmed:"#6B3D1E",
  success:"#7CB87A",
  header:"linear-gradient(180deg,#120804 0%,#1E0E07 100%)",
};

const S = {
  card:{background:C.bgCard,borderRadius:"16px",border:`1px solid ${C.border}`,boxShadow:"0 4px 24px rgba(0,0,0,0.45),inset 0 1px 0 rgba(200,135,46,0.08)"},
  input:{background:"rgba(0,0,0,0.35)",border:`1px solid ${C.border}`,borderRadius:"14px",color:C.cream,padding:"15px 18px",fontSize:"16px",width:"100%",fontFamily:"'Barlow',sans-serif",fontWeight:500,transition:"all 0.2s"},
  btnPrimary:{background:`linear-gradient(135deg,${C.gold} 0%,${C.goldLight} 50%,${C.gold} 100%)`,border:"none",borderRadius:"14px",color:"#1A0C07",fontWeight:800,fontSize:"17px",padding:"17px",width:"100%",cursor:"pointer",boxShadow:`0 4px 18px rgba(200,135,46,0.4)`,fontFamily:"'Barlow',sans-serif",transition:"all 0.2s"},
  btnGhost:{background:"transparent",border:`1px solid ${C.border}`,borderRadius:"14px",color:C.gold,fontWeight:700,fontSize:"15px",padding:"15px",width:"100%",cursor:"pointer",fontFamily:"'Barlow',sans-serif",transition:"all 0.2s"},
  label:{color:C.muted,fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:700,display:"block",marginBottom:"8px",fontFamily:"'Barlow',sans-serif"},
  pageWrap:{background:C.bg,minHeight:"100vh",fontFamily:"'Barlow',sans-serif",maxWidth:"480px",margin:"0 auto",position:"relative"},
};

const woodBg={background:`repeating-linear-gradient(97deg,transparent 0px,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 3px),#1A0C07`};

// ============================================================
// COMPONENTS
// ============================================================
function LangBar({lang,setLang,compact=false}){
  return(
    <div style={{display:"flex",gap:compact?"5px":"8px"}}>
      {[["th","ไทย"],["en","EN"],["ru","RU"],["de","DE"]].map(([code,label])=>(
        <button key={code} className="lang-btn" onClick={()=>setLang(code)} style={{padding:compact?"5px 8px":"8px 12px",borderRadius:"10px",border:lang===code?`1px solid ${C.borderActive}`:`1px solid ${C.border}`,background:lang===code?"rgba(200,135,46,0.22)":"rgba(0,0,0,0.25)",color:lang===code?C.gold:C.muted,fontSize:compact?"10px":"12px",cursor:"pointer",fontWeight:lang===code?800:600,fontFamily:"'Barlow',sans-serif",lineHeight:1}}>{label}</button>
      ))}
    </div>
  );
}

function PageHeader({title,backLabel,onBack,lang,setLang,sub}){
  return(
    <div style={{background:C.header,padding:"14px 18px",position:"sticky",top:0,zIndex:200,borderBottom:`1px solid ${C.border}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{minWidth:60}}>
          {onBack&&<button onClick={onBack} style={{background:"none",border:"none",color:C.gold,fontSize:"14px",cursor:"pointer",fontFamily:"'Barlow',sans-serif",fontWeight:700,padding:0}}>← {backLabel}</button>}
        </div>
        <div style={{textAlign:"center",flex:1}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:C.gold,margin:0,fontSize:"21px"}}>{title}</h2>
          {sub&&<p style={{color:C.muted,margin:"2px 0 0",fontSize:"11px"}}>{sub}</p>}
        </div>
        <div style={{minWidth:60,display:"flex",justifyContent:"flex-end"}}><LangBar lang={lang} setLang={setLang} compact/></div>
      </div>
    </div>
  );
}

function OptionsSelector({item,lang,itemOpts,setItemOpts}){
  if(!item.options?.length)return null;
  return(
    <div style={{marginTop:"10px"}}>
      {item.options.map((opt,oi)=>{
        const key=`${item.id}-${oi}`;
        const sel=itemOpts[key];
        return(
          <div key={oi} style={{marginBottom:"8px"}}>
            <p style={{color:C.muted,fontSize:"11px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:"6px"}}>{opt.label[lang]}:</p>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {opt.choices.map((ch,ci)=>{
                const isSel=sel===ci;
                return(
                  <button key={ci} className="opt-btn" onClick={e=>{e.stopPropagation();setItemOpts(p=>({...p,[key]:ci}));}} style={{padding:"6px 12px",borderRadius:"20px",fontSize:"12px",border:isSel?`1.5px solid ${C.gold}`:`1px solid ${C.border}`,background:isSel?"rgba(200,135,46,0.2)":"rgba(0,0,0,0.3)",color:isSel?C.gold:C.muted,cursor:"pointer",fontFamily:"'Barlow',sans-serif",fontWeight:isSel?700:500}}>{ch[lang]}</button>
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
export default function BarOrderApp(){
  const[page,setPage]=useState("home");
  const[lang,setLang]=useState("en");
  const[customerName,setCustomerName]=useState("");
  const[selectedTable,setSelectedTable]=useState("");
  const[cart,setCart]=useState([]);
  const[paymentMethod,setPaymentMethod]=useState("");
  const[orderTime,setOrderTime]=useState("");
  const[isSubmitting,setIsSubmitting]=useState(false);
  const[qrPayload,setQrPayload]=useState("");
  const[itemOpts,setItemOpts]=useState({});
  // Slip upload states
  const[slipFile,setSlipFile]=useState(null);
  const[slipPreview,setSlipPreview]=useState("");
  const[slipUploading,setSlipUploading]=useState(false);
  const[slipUrl,setSlipUrl]=useState("");
  const[slipError,setSlipError]=useState(false);
  const fileInputRef=useRef(null);

  useEffect(()=>{
    if(typeof window!=="undefined"){
      const params=new URLSearchParams(window.location.search);
      const tableParam=params.get("table");
      if(tableParam&&TABLES.includes(tableParam))setSelectedTable(tableParam);
    }
  },[]);

  const t=T[lang];
  const totalItems=cart.reduce((s,i)=>s+i.qty,0);
  const totalPrice=cart.reduce((s,i)=>s+i.price*i.qty,0);

  const getOptsLabel=(item,opts)=>{
    if(!item.options?.length)return"";
    return item.options.map((opt,oi)=>{
      const key=`${item.id}-${oi}`;
      const ci=opts[key];
      return ci!==undefined?opt.choices[ci][lang]:null;
    }).filter(Boolean).join(", ");
  };

  const updateCartItem=(item,delta)=>{
    const optsLabel=getOptsLabel(item,itemOpts);
    const cartKey=`${item.id}|${optsLabel}`;
    setCart(prev=>{
      const ex=prev.find(c=>c.cartKey===cartKey);
      if(!ex&&delta>0)return[...prev,{...item,cartKey,qty:1,note:"",optsLabel}];
      if(ex){const nq=ex.qty+delta;if(nq<=0)return prev.filter(c=>c.cartKey!==cartKey);return prev.map(c=>c.cartKey===cartKey?{...c,qty:nq}:c);}
      return prev;
    });
  };

  const getQty=item=>{
    const optsLabel=getOptsLabel(item,itemOpts);
    const cartKey=`${item.id}|${optsLabel}`;
    return cart.find(c=>c.cartKey===cartKey)?.qty||0;
  };

  const updateNote=(cartKey,note)=>setCart(p=>p.map(c=>c.cartKey===cartKey?{...c,note}:c));
  const removeItem=cartKey=>setCart(p=>p.filter(c=>c.cartKey!==cartKey));

  // Handle slip file selection
  const handleSlipSelect=async(e)=>{
    const file=e.target.files?.[0];
    if(!file)return;
    setSlipFile(file);
    setSlipError(false);
    // Show preview
    const reader=new FileReader();
    reader.onload=ev=>setSlipPreview(ev.target?.result||"");
    reader.readAsDataURL(file);
    // Upload immediately
    setSlipUploading(true);
    try{
      const orderId=`${customerName}_${selectedTable}_${Date.now()}`.replace(/\s+/g,"_");
      const url=await uploadSlipToSupabase(file,orderId);
      setSlipUrl(url);
    }catch(err){
      console.error("Slip upload error:",err);
      setSlipUrl("upload_pending"); // fallback — will retry on submit
    }finally{
      setSlipUploading(false);
    }
  };

  const submitOrder=async()=>{
    // Validate slip for PromptPay
    if(paymentMethod==="promptpay"&&!slipFile){
      setSlipError(true);
      return;
    }
    setIsSubmitting(true);
    const now=new Date();
    setOrderTime(now.toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));

    // If slip not yet uploaded, try again
    let finalSlipUrl=slipUrl;
    if(paymentMethod==="promptpay"&&slipFile&&(!slipUrl||slipUrl==="upload_pending")){
      try{
        const orderId=`${customerName}_${selectedTable}_${Date.now()}`.replace(/\s+/g,"_");
        finalSlipUrl=await uploadSlipToSupabase(slipFile,orderId);
        setSlipUrl(finalSlipUrl);
      }catch(err){
        console.error("Slip re-upload error:",err);
        finalSlipUrl="upload_failed";
      }
    }

    const orderData={
      customerName,table:selectedTable,paymentMethod,lang,
      items:cart.map(i=>({
        name:i.optsLabel?`${i.name.en} (${i.optsLabel})`:i.name.en,
        qty:i.qty,price:i.price,note:i.note,options:i.optsLabel||"",
        // --- ส่วนที่ครูเพิ่มให้: ดึงรหัส Loyverse จากเมนู ใส่ลงในพัสดุ ---
        loyverse_item_id: i.loyverse_item_id || "",
        loyverse_variant_id: i.loyverse_variant_id || ""
      })),
      total:totalPrice,
      slip_url:finalSlipUrl||"",
      timestamp:now.toISOString(),
    };

    try{
      await fetch(`${BACKEND_URL}/api/order`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(orderData),
      });
    }catch(e){console.error("Order error:",e);}

    setIsSubmitting(false);
    setPage("success");
  };

  const resetAll=()=>{
    setPage("home");setCustomerName("");setSelectedTable("");
    setCart([]);setPaymentMethod("");setOrderTime("");setQrPayload("");
    setItemOpts({});setSlipFile(null);setSlipPreview("");setSlipUrl("");setSlipError(false);
    if(typeof window!=="undefined")window.history.replaceState({},"",window.location.pathname);
  };

  // ── HOME ───────────────────────────────────────────────
  if(page==="home")return(
    <div style={{...S.pageWrap,...woodBg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 20px"}}>
      <style>{GLOBAL_CSS}</style>
      <div className="fade-in" style={{width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{width:"80px",height:"80px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(200,135,46,0.2),rgba(224,160,64,0.1))",border:`2px solid ${C.borderActive}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"36px",margin:"0 auto 14px",boxShadow:`0 0 40px rgba(200,135,46,0.25)`}}>🍺</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"34px",color:C.gold,fontWeight:900,lineHeight:1}}>{t.appName}</h1>
          <p style={{color:C.muted,fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",marginTop:"6px"}}>{t.appSub}</p>
        </div>
        <div style={{...S.card,padding:"16px",marginBottom:"14px"}}>
          <span style={S.label}>{t.language}</span>
          <LangBar lang={lang} setLang={setLang}/>
        </div>
        <div style={{...S.card,padding:"22px"}}>
          <div style={{marginBottom:"20px"}}>
            <label style={S.label}>{t.yourName}</label>
            <input type="text" placeholder={t.namePlaceholder} value={customerName} onChange={e=>setCustomerName(e.target.value)} style={S.input}/>
          </div>
          <div style={{marginBottom:"28px"}}>
            <label style={S.label}>{t.selectTable}</label>
            <select value={selectedTable} onChange={e=>setSelectedTable(e.target.value)} style={{...S.input,appearance:"none",cursor:"pointer"}}>
              <option value="">{t.chooseTable}</option>
              {TABLES.map(tb=><option key={tb} value={tb}>{tb}</option>)}
            </select>
          </div>
          <button style={{...S.btnPrimary,opacity:(!customerName.trim()||!selectedTable)?0.45:1}} disabled={!customerName.trim()||!selectedTable} onClick={()=>setPage("menu")}>{t.startOrder}</button>
        </div>
      </div>
    </div>
  );

  // ── MENU ───────────────────────────────────────────────
  if(page==="menu")return(
    <div style={{...S.pageWrap,...woodBg,paddingBottom:"100px"}}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.menu} sub={`${customerName} · ${selectedTable}`} lang={lang} setLang={setLang}/>

      {/* Sticky Category Pills */}
      <div style={{display:"flex",gap:"8px",padding:"10px 16px",overflowX:"auto",overflowY:"hidden",background:"rgba(26,12,7,0.97)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,position:"sticky",top:"55px",zIndex:100,WebkitOverflowScrolling:"touch"}}>
        {MENU.map(cat=>(
          <button key={cat.id} className="cat-pill"
            onClick={()=>{
              const el=document.getElementById(cat.id);
              if(el){const offset=el.getBoundingClientRect().top+window.scrollY-120;window.scrollTo({top:offset,behavior:"smooth"});}
            }}
            style={{padding:"7px 14px",borderRadius:"20px",whiteSpace:"nowrap",flexShrink:0,border:`1px solid ${C.border}`,background:"rgba(0,0,0,0.3)",color:C.muted,fontSize:"12px",cursor:"pointer",fontFamily:"'Barlow',sans-serif",fontWeight:600}}
          >{cat.emoji} {cat.name[lang]}</button>
        ))}
      </div>

      <div style={{padding:"0 14px"}}>
        {MENU.map(cat=>(
          <div key={cat.id} id={cat.id} className="fade-in" style={{marginTop:"22px"}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",color:C.gold,fontSize:"20px",fontWeight:700,paddingBottom:"10px",borderBottom:`1px solid ${C.border}`,marginBottom:"12px"}}>{cat.emoji} {cat.name[lang]}</h3>
            {cat.items.filter(i=>i.enabled).map(item=>{
              const qty=getQty(item);
              return(
                <div key={item.id} className="menu-item" style={{...S.card,padding:"14px 16px",marginBottom:"9px",borderColor:qty>0?C.borderActive:C.border,background:qty>0?"linear-gradient(145deg,#4A2510 0%,#5A3020 60%,#4A1F09 100%)":S.card.background}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{flex:1,paddingRight:"12px"}}>
                      <p style={{color:C.cream,margin:"0 0 3px",fontSize:"15px",fontWeight:600}}>{item.name[lang]}</p>
                      <p style={{color:C.gold,margin:0,fontSize:"14px",fontWeight:700}}>{item.price} {t.thb}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
                      {qty>0&&<><button className="qty-btn" onClick={()=>updateCartItem(item,-1)} style={{width:"34px",height:"34px",borderRadius:"50%",border:`1px solid ${C.borderActive}`,background:"transparent",color:C.gold,fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button><span style={{color:C.cream,fontWeight:900,fontSize:"17px",minWidth:"22px",textAlign:"center"}}>{qty}</span></>}
                      <button className="qty-btn" onClick={()=>updateCartItem(item,1)} style={{width:"34px",height:"34px",borderRadius:"50%",border:"none",background:qty===0?`linear-gradient(135deg,${C.gold},${C.goldLight})`:"rgba(200,135,46,0.25)",color:qty===0?"#1A0C07":C.gold,fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
                    </div>
                  </div>
                  {item.options?.length>0&&<OptionsSelector item={item} lang={lang} itemOpts={itemOpts} setItemOpts={setItemOpts}/>}
                </div>
              );
            })}
          </div>
        ))}
        <div style={{height:"24px"}}/>
      </div>

      {totalItems>0&&(
        <button className="cart-btn" onClick={()=>setPage("cart")} style={{position:"fixed",bottom:"24px",left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,border:"none",borderRadius:"50px",color:"#1A0C07",fontWeight:900,fontSize:"16px",padding:"16px 32px",cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",fontFamily:"'Barlow',sans-serif",whiteSpace:"nowrap",zIndex:300}}>
          🛒 {t.cart} ({totalItems}) · {totalPrice} {t.thb}
        </button>
      )}
    </div>
  );

  // ── CART ───────────────────────────────────────────────
  if(page==="cart")return(
    <div style={{...S.pageWrap,...woodBg,paddingBottom:"110px"}}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.cart} backLabel={t.menu} onBack={()=>setPage("menu")} lang={lang} setLang={setLang}/>
      <div style={{padding:"14px"}}>
        {cart.length===0?(
          <div className="fade-in" style={{textAlign:"center",padding:"70px 20px"}}>
            <div style={{fontSize:"56px",marginBottom:"16px"}}>🛒</div>
            <p style={{color:C.muted,fontSize:"18px",fontWeight:600}}>{t.cartEmpty}</p>
            <p style={{color:C.dimmed,fontSize:"14px",marginTop:"6px"}}>{t.addItems}</p>
          </div>
        ):(
          <>
            {cart.map(item=>(
              <div key={item.cartKey} className="fade-in" style={{...S.card,padding:"16px",marginBottom:"12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div style={{flex:1}}>
                    <p style={{color:C.cream,fontSize:"16px",fontWeight:600,marginBottom:"3px"}}>{item.name[lang]}</p>
                    {item.optsLabel&&<p style={{color:C.gold,fontSize:"12px",marginBottom:"3px",fontStyle:"italic"}}>▸ {item.optsLabel}</p>}
                    <p style={{color:C.gold,fontSize:"13px"}}>{item.price} {t.thb} × {item.qty} = <strong style={{fontSize:"15px"}}>{item.price*item.qty} {t.thb}</strong></p>
                  </div>
                  <button className="remove-btn" onClick={()=>removeItem(item.cartKey)} style={{background:"rgba(200,60,60,0.12)",border:"1px solid rgba(200,60,60,0.25)",borderRadius:"8px",color:"#D07070",fontSize:"11px",fontWeight:700,padding:"5px 10px",cursor:"pointer",fontFamily:"'Barlow',sans-serif"}}>{t.remove}</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                  <span style={{color:C.muted,fontSize:"12px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>{t.qty}:</span>
                  <button className="qty-btn" onClick={()=>updateCartItem(item,-1)} style={{width:"32px",height:"32px",borderRadius:"50%",border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:"18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                  <span style={{color:C.cream,fontWeight:900,fontSize:"18px",minWidth:"26px",textAlign:"center"}}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>updateCartItem(item,1)} style={{width:"32px",height:"32px",borderRadius:"50%",border:"none",background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,color:"#1A0C07",fontSize:"18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
                </div>
                <input type="text" placeholder={t.notePlaceholder} value={item.note||""} onChange={e=>updateNote(item.cartKey,e.target.value)} style={{...S.input,padding:"11px 14px",fontSize:"14px",background:"rgba(0,0,0,0.28)",borderColor:"#4A2C1A"}}/>
              </div>
            ))}
            <div style={{...S.card,padding:"16px 20px",marginTop:"6px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:C.muted,fontSize:"16px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>{t.total}</span>
              <span style={{color:C.gold,fontSize:"28px",fontWeight:900,fontFamily:"'Playfair Display',serif"}}>{totalPrice} {t.thb}</span>
            </div>
          </>
        )}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",padding:"14px 16px",background:"linear-gradient(0deg,#120804 60%,transparent 100%)"}}>
        <div style={{display:"flex",gap:"10px"}}>
          <button style={{...S.btnGhost,flex:1}} onClick={()=>setPage("menu")}>{t.backToMenu}</button>
          <button style={{...S.btnPrimary,flex:2,opacity:cart.length===0?0.4:1}} disabled={cart.length===0} onClick={()=>setPage("confirm")}>{t.confirmOrder}</button>
        </div>
      </div>
    </div>
  );

  // ── CONFIRM ────────────────────────────────────────────
  if(page==="confirm")return(
    <div style={{...S.pageWrap,...woodBg,paddingBottom:"110px"}}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.orderSummary} backLabel={t.cart} onBack={()=>setPage("cart")} lang={lang} setLang={setLang}/>
      <div style={{padding:"14px"}} className="fade-in">
        <div style={{background:"rgba(200,135,46,0.1)",border:"1px solid rgba(200,135,46,0.3)",borderRadius:"14px",padding:"13px 16px",marginBottom:"14px",display:"flex",gap:"10px",alignItems:"center"}}>
          <span style={{fontSize:"18px"}}>⚠️</span>
          <p style={{color:"#E0A040",margin:0,fontSize:"14px",fontWeight:600}}>{t.reviewWarning}</p>
        </div>
        <div style={{...S.card,padding:"18px",marginBottom:"12px"}}>
          {[["👤",t.customer,customerName],["🪑",t.table,selectedTable]].map(([icon,label,val])=>(
            <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
              <span style={{color:C.muted,fontSize:"12px",textTransform:"uppercase",letterSpacing:"1px",fontWeight:700}}>{icon} {label}</span>
              <span style={{color:C.cream,fontWeight:700,fontSize:"15px"}}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{...S.card,padding:"18px",marginBottom:"12px"}}>
          <p style={{color:C.muted,fontSize:"11px",textTransform:"uppercase",letterSpacing:"2px",fontWeight:700,marginBottom:"14px"}}>🍽 {t.items}</p>
          {cart.map((item,i)=>(
            <div key={item.cartKey} style={{paddingBottom:"11px",marginBottom:"11px",borderBottom:i<cart.length-1?"1px solid rgba(107,61,30,0.4)":"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <span style={{color:C.cream,fontSize:"15px"}}><span style={{color:C.gold,fontWeight:800}}>{item.qty}×</span> {item.name[lang]}</span>
                  {item.optsLabel&&<p style={{color:C.muted,fontSize:"12px",marginTop:"2px",fontStyle:"italic"}}>▸ {item.optsLabel}</p>}
                  {item.note&&<p style={{color:C.muted,fontSize:"12px",marginTop:"2px",fontStyle:"italic"}}>📝 {item.note}</p>}
                </div>
                <span style={{color:C.gold,fontWeight:700,fontSize:"15px",flexShrink:0,marginLeft:"8px"}}>{item.price*item.qty} {t.thb}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{...S.card,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.muted,fontSize:"16px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px"}}>{t.total}</span>
          <span style={{color:C.gold,fontSize:"30px",fontWeight:900,fontFamily:"'Playfair Display',serif"}}>{totalPrice} {t.thb}</span>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",padding:"14px 16px",background:"linear-gradient(0deg,#120804 60%,transparent 100%)"}}>
        <button style={S.btnPrimary} onClick={()=>setPage("payment")}>{t.confirmOrder}</button>
      </div>
    </div>
  );

  // ── PAYMENT ────────────────────────────────────────────
  if(page==="payment")return(
    <div style={{...S.pageWrap,...woodBg,paddingBottom:"120px"}}>
      <style>{GLOBAL_CSS}</style>
      <PageHeader title={t.payment} backLabel={t.back} onBack={()=>setPage("confirm")} lang={lang} setLang={setLang}/>
      <div style={{padding:"18px 14px"}} className="fade-in">
        {/* Total */}
        <div style={{...S.card,padding:"20px",marginBottom:"24px",textAlign:"center"}}>
          <p style={{color:C.muted,fontSize:"12px",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"6px",fontWeight:700}}>{t.total}</p>
          <p style={{color:C.gold,fontSize:"36px",fontWeight:900,fontFamily:"'Playfair Display',serif"}}>{totalPrice} {t.thb}</p>
        </div>

        <p style={{color:C.muted,fontSize:"11px",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"14px",fontWeight:700,textAlign:"center"}}>{t.selectPayment}</p>

        {/* Cash */}
        <button className="pay-option" onClick={()=>{setPaymentMethod("cash");setSlipError(false);}} style={{...S.card,width:"100%",padding:"20px 18px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"16px",cursor:"pointer",textAlign:"left",border:paymentMethod==="cash"?`2px solid ${C.borderActive}`:`1px solid ${C.border}`,background:paymentMethod==="cash"?"linear-gradient(145deg,rgba(200,135,46,0.2),rgba(224,160,64,0.08))":S.card.background}}>
          <span style={{fontSize:"34px"}}>💵</span>
          <div style={{flex:1}}>
            <p style={{color:C.cream,fontSize:"18px",fontWeight:700,marginBottom:"3px"}}>{t.cash}</p>
            <p style={{color:C.muted,fontSize:"13px",margin:0}}>{t.cashSub}</p>
          </div>
          {paymentMethod==="cash"&&<span style={{color:C.gold,fontSize:"22px",fontWeight:900}}>✓</span>}
        </button>

        {/* PromptPay */}
        <button className="pay-option" onClick={()=>{setPaymentMethod("promptpay");setQrPayload(buildPromptPayQR(totalPrice));}} style={{...S.card,width:"100%",padding:"20px 18px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"16px",cursor:"pointer",textAlign:"left",border:paymentMethod==="promptpay"?`2px solid ${C.borderActive}`:`1px solid ${C.border}`,background:paymentMethod==="promptpay"?"linear-gradient(145deg,rgba(200,135,46,0.2),rgba(224,160,64,0.08))":S.card.background}}>
          <span style={{fontSize:"34px"}}>📱</span>
          <div style={{flex:1}}>
            <p style={{color:C.cream,fontSize:"18px",fontWeight:700,marginBottom:"3px"}}>{t.promptpay}</p>
            <p style={{color:C.muted,fontSize:"13px",margin:0}}>{t.promptpaySub}</p>
          </div>
          {paymentMethod==="promptpay"&&<span style={{color:C.gold,fontSize:"22px",fontWeight:900}}>✓</span>}
        </button>

        {/* QR + Slip Upload — แสดงเมื่อเลือก PromptPay */}
        {paymentMethod==="promptpay"&&(
          <div className="pop-in">
            {/* QR Code */}
            <div style={{...S.card,padding:"24px",textAlign:"center",marginBottom:"14px"}}>
              <p style={{color:C.gold,fontSize:"13px",fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",marginBottom:"18px"}}>{t.qrInstructions}</p>
              <div style={{padding:"12px",background:"white",borderRadius:"16px",display:"inline-block",marginBottom:"14px"}}>
                <QRImage value={qrPayload} size={180}/>
              </div>
              <p style={{color:C.gold,fontSize:"26px",fontWeight:900,fontFamily:"'Playfair Display',serif"}}>{totalPrice} {t.thb}</p>
              <p style={{color:C.muted,fontSize:"12px",marginTop:"6px"}}>{t.scanToPay} · PromptPay</p>
            </div>

            {/* Slip Upload */}
            <div style={{...S.card,padding:"20px",border:slipError?`2px solid #D05555`:`1px solid ${C.border}`}}>
              <p style={{color:C.muted,fontSize:"11px",textTransform:"uppercase",letterSpacing:"2px",fontWeight:700,marginBottom:"4px"}}>📎 {t.uploadSlip}</p>
              <p style={{color:C.dimmed,fontSize:"12px",marginBottom:"14px"}}>{t.uploadSlipSub}</p>

              {/* Hidden file input */}
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleSlipSelect} style={{display:"none"}}/>

              {/* Upload area */}
              {!slipPreview?(
                <button className="slip-upload" onClick={()=>fileInputRef.current?.click()} style={{width:"100%",padding:"24px 16px",borderRadius:"14px",border:`2px dashed ${slipError?"#D05555":C.border}`,background:"rgba(0,0,0,0.2)",color:slipError?"#D05555":C.muted,cursor:"pointer",textAlign:"center",fontFamily:"'Barlow',sans-serif"}}>
                  <p style={{fontSize:"32px",marginBottom:"8px"}}>📷</p>
                  <p style={{fontSize:"14px",fontWeight:600}}>{t.uploadTap}</p>
                  {slipError&&<p style={{color:"#D05555",fontSize:"12px",marginTop:"8px",fontWeight:700}}>⚠️ {t.uploadRequired}</p>}
                </button>
              ):(
                <div style={{position:"relative"}}>
                  <img src={slipPreview} alt="Slip preview" style={{width:"100%",borderRadius:"12px",maxHeight:"240px",objectFit:"contain",background:"rgba(0,0,0,0.3)"}}/>
                  {slipUploading&&(
                    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.6)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{width:"32px",height:"32px",border:"3px solid #C8872E",borderTop:"3px solid transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 8px"}}/>
                        <p style={{color:C.gold,fontSize:"13px",fontWeight:600}}>{t.slipUploading}</p>
                      </div>
                    </div>
                  )}
                  {!slipUploading&&(
                    <div style={{position:"absolute",top:"8px",right:"8px",display:"flex",gap:"6px"}}>
                      <span style={{background:"rgba(124,184,122,0.9)",borderRadius:"20px",padding:"4px 10px",fontSize:"11px",fontWeight:700,color:"#fff"}}>✓ {t.uploadSuccess}</span>
                      <button onClick={()=>fileInputRef.current?.click()} style={{background:"rgba(0,0,0,0.7)",border:"none",borderRadius:"20px",padding:"4px 10px",fontSize:"11px",color:"#F0DEC8",cursor:"pointer"}}>{t.uploadChange}</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"480px",padding:"14px 16px",background:"linear-gradient(0deg,#120804 60%,transparent 100%)"}}>
        <button
          style={{...S.btnPrimary,opacity:(!paymentMethod||isSubmitting||(paymentMethod==="promptpay"&&slipUploading))?0.45:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}
          disabled={!paymentMethod||isSubmitting||(paymentMethod==="promptpay"&&slipUploading)}
          onClick={submitOrder}
        >
          {isSubmitting?(
            <><span style={{width:"18px",height:"18px",border:"2px solid #1A0C07",borderTop:"2px solid transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block"}}/>{t.loading}</>
          ):t.submitOrder}
        </button>
        {paymentMethod==="promptpay"&&!slipFile&&(
          <p style={{color:"#D07070",fontSize:"12px",textAlign:"center",marginTop:"8px",fontWeight:600}}>⚠️ {t.uploadRequired}</p>
        )}
      </div>
    </div>
  );

  // ── SUCCESS ────────────────────────────────────────────
  if(page==="success")return(
    <div style={{...S.pageWrap,...woodBg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 20px",minHeight:"100vh"}}>
      <style>{GLOBAL_CSS}</style>
      <div className="pop-in" style={{width:"100%",maxWidth:"400px",textAlign:"center"}}>
        <div style={{width:"100px",height:"100px",borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,184,122,0.2),rgba(80,150,80,0.1))",border:"2px solid #7CB87A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px",fontSize:"44px",boxShadow:"0 0 40px rgba(124,184,122,0.2)"}}>🎉</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",color:"#7CB87A",fontSize:"30px",marginBottom:"10px"}}>{t.orderSuccess}</h1>
        <p style={{color:C.muted,fontSize:"15px",lineHeight:1.6,marginBottom:"30px"}}>{t.successMessage}</p>
        <div style={{...S.card,padding:"20px",marginBottom:"14px",textAlign:"left"}}>
          {[["🕐",t.time,orderTime],["👤",t.customer,customerName],["🪑",t.table,selectedTable],["💳",t.payment,paymentMethod==="cash"?t.cash:t.promptpay]].map(([icon,label,val])=>(
            <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"11px"}}>
              <span style={{color:C.muted,fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px",fontWeight:700}}>{icon} {label}</span>
              <span style={{color:C.cream,fontWeight:700,fontSize:"14px"}}>{val}</span>
            </div>
          ))}
          {slipUrl&&slipUrl!=="upload_failed"&&(
            <div style={{marginTop:"8px",paddingTop:"10px",borderTop:`1px solid ${C.border}`}}>
              <p style={{color:C.muted,fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px",fontWeight:700,marginBottom:"8px"}}>🧾 Slip</p>
              <img src={slipPreview} alt="Payment slip" style={{width:"100%",borderRadius:"10px",maxHeight:"120px",objectFit:"contain",background:"rgba(0,0,0,0.2)"}}/>
            </div>
          )}
        </div>
        <div style={{...S.card,padding:"18px",marginBottom:"20px",textAlign:"left"}}>
          {cart.map(item=>(
            <div key={item.cartKey} style={{marginBottom:"8px"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:C.muted,fontSize:"14px"}}><span style={{color:C.gold,fontWeight:800}}>{item.qty}×</span> {item.name[lang]}</span>
                <span style={{color:C.gold,fontWeight:700,fontSize:"14px"}}>{item.price*item.qty} {t.thb}</span>
              </div>
              {item.optsLabel&&<p style={{fontSize:"11px",color:C.dimmed,fontStyle:"italic",marginTop:"2px"}}>▸ {item.optsLabel}</p>}
              {item.note&&<p style={{fontSize:"11px",fontStyle:"italic",color:C.dimmed,marginTop:"2px"}}>📝 {item.note}</p>}
            </div>
          ))}
          <div style={{borderTop:`1px solid ${C.border}`,marginTop:"12px",paddingTop:"12px",display:"flex",justifyContent:"space-between"}}>
            <span style={{color:C.muted,fontWeight:700,textTransform:"uppercase",fontSize:"12px",letterSpacing:"1px"}}>{t.total}</span>
            <span style={{color:C.gold,fontWeight:900,fontSize:"20px",fontFamily:"'Playfair Display',serif"}}>{totalPrice} {t.thb}</span>
          </div>
        </div>
        <button style={S.btnPrimary} onClick={resetAll}>{t.newOrder}</button>
      </div>
    </div>
  );

  return null;
}
