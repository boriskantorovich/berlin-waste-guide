// Flowchart data for Berlin waste sorting guide (2025)
const flowchartData = {
    title: "Cхема сортировки отходов в Берлине (2025)",
    instructions: "Идите сверху вниз; когда ответ «да» — выполняйте инструкцию и завершайте. Если «нет» — переходите к следующему шагу.",
    
    // Main flowchart steps
    steps: [
        {
            id: 0,
            question: "Хотим немного евро, сдаем сегдня Pfand?",
            details: [
                "Еinweg-ПЭТ/алюминиевые банки – 0,25€/штука",
                "Mehrweg-пивные/лимонадные стекло – 0,08-0,15€/штука",
                "Пивные ящики – ≈1,50€/штука",
                "Стартер-аккумулятор – 7,50€/штука"
            ],
            whereTo: "Любой супермаркет > 200 м² площадью, Getränke-маркет или Pfandautomat. Аккумуляторы – там же, где покупали, либо Recyclinghof.",
            preparation: "Опорожнить, не мять. Сдать и получить купон/наличными.",
            yesResult: "Это контейнер с Pfand! Верните его , в любой супермаркет > 200 м², Getränke-маркет или Pfandautomat, чтобы получить залог обратно.",
            noResult: null // Continue to next step
        },
        {
            id: 1,
            question: "Это упаковка, пластик, металл, тетрапак, пенопласт?",
            whereTo: "Gelbe/Orange Wertstoff-Tonne",
            preparation: "Коротко ополоснуть, крышки в ту же тонну, не вкладывать одну упаковку в другую.",
            yesResult: "Это упаковка! Отправьте в Gelbe/Orange Wertstoff-Tonne. Коротко ополосните, крышки в ту же тонну, не вкладывайте одну упаковку в другую.",
            noResult: null // Continue to next step
        },
        {
            id: 2,
            question: "Это стекло?",
            whereTo: "Уличный Glas-Container по цветам: белое / зелёное / коричневое.",
            preparation: "Крышку снять → Gelbe-Tonne. Бросать целиком, не бить.",
            yesResult: "Это стекло! Отправьте в уличный Glas-Container по соответствующему цвету (белое / зелёное / коричневое). Крышку снимите и отправьте в Gelbe-Tonne. Бросайте целиком, не бейте.",
            noResult: null // Continue to next step
        },
        {
            id: 3,
            question: "Это бумага/картон (газеты, коробки, книги без пластика)?",
            whereTo: "Blaue Tonne",
            preparation: "Удалить скотч, пластиковые окна, металл. Жирная или влажная бумага → Restmüll.",
            yesResult: "Это бумага/картон! Отправьте в Blaue Tonne. Удалите скотч, пластиковые окна, металл. Жирная или влажная бумага идет в Restmüll.",
            noResult: null // Continue to next step
        },
        {
            id: 4,
            question: "Это биот отходы (пищевые остатки, кофе, кожура, садовый мусор)?",
            whereTo: "Braune Bio-Tonne",
            preparation: "Только в бумажных пакетах/газете, никакого биопластика. Мясо, рыба, кости → Restmüll.",
            yesResult: "Это биотходы! Отправьте в Braune Bio-Tonne. Используйте только бумажные пакеты/газету, никакого биопластика. Мясо, рыба, кости отправьте в Restmüll.",
            noResult: null // Continue to next step
        },
        {
            id: 5,
            question: "Это опасное (батарейки, лампы, краски, химия, лекарства, литиевые АКБ, E-bike-акку)?",
            whereTo: "Сдать бесплатно в один из 6 BSR-Schadstoffhöfe, аптеки (лекарства), магазины ≥ 25 м² (батарейки).",
            preparation: "Принести в закрытой таре; ≤20 кг/день без платы.",
            yesResult: "Это опасные отходы! Сдайте бесплатно в один из 6 BSR-Schadstoffhöfe, аптеки (лекарства), магазины ≥ 25 м² (батарейки). Принесите в закрытой таре; ≤20 кг/день без платы.",
            noResult: null // Continue to next step
        },
        {
            id: 6,
            question: "Это текстиль/обувь?",
            whereTo: "Altkleider-Container или NochMall/BSR-Recyclinghof. С 01 янв 2025 раздельный сбор обязателен.",
            preparation: "Постирать, высушить, обувь связать парами. Грязное/рваное → Restmüll (платно при сдаче).",
            yesResult: "Это текстиль/обувь! Отправьте в Altkleider-Container или NochMall/BSR-Recyclinghof. Постирайте, высушите, обувь свяжите парами. Грязное/рваное отправьте в Restmüll (платно при сдаче).",
            noResult: null // Continue to next step
        },
        {
            id: 7,
            question: "Это электроника? (телефоны, фены < 25 см или крупнее)",
            whereTo: "• Магазины/дискаунтеры ≥ 800 м² обязаны принять до 3 шт. бесплатно.\n• Любой BSR-Recyclinghof.\n• Крупную технику — при доставке новой забирает продавец.",
            preparation: "Удалить батарейки, собирать провода.",
            yesResult: "Это электроника! Сдайте в магазины/дискаунтеры ≥ 800 м² (обязаны принять до 3 шт. бесплатно), любой BSR-Recyclinghof или при доставке новой крупную технику забирает продавец. Удалите батарейки, соберите провода.",
            noResult: null // Continue to next step
        },
        {
            id: 8,
            question: "Это Sperrmüll (мебель, матрас, сантехника)?",
            whereTo: "Заказать два бесплатных вывоза/год на bsr.de или привезти в Recyclinghof.",
            preparation: "Разобрать по возможности; <30 кг/часть.",
            yesResult: "Это Sperrmüll! Закажите два бесплатных вывоза/год на bsr.de или привезите в Recyclinghof. Разберите по возможности; <30 кг/часть.",
            noResult: null // Continue to next step
        },
        {
            id: 9,
            question: "Остальное (жвачка, окурки, пыль, керамика, разбитое стекло, подгузники, грязная фольга)?",
            whereTo: "Graue/Restmüll-Tonne.",
            preparation: "Можно класть в закрытом пакете. Остывший пепел тоже сюда.",
            yesResult: "Это остальные отходы! Отправьте в Graue/Restmüll-Tonne. Можно класть в закрытом пакете. Остывший пепел тоже сюда.",
            noResult: "Это остальные отходы! Отправьте в Graue/Restmüll-Tonne. Можно класть в закрытом пакете. Остывший пепел тоже сюда."
        }
    ],
    
    // Common difficult items
    difficultItems: [
        { item: "Жвачка, сигаретный фильтр", verdict: "Restmüll" },
        { item: "Плёнка от сосисок, пластиковые пакеты", verdict: "Gelbe/Orange Tonne" },
        { item: "Капсулы Nespresso®", verdict: "Alu → Gelbe Tonne, кофе в Bio-Tonne (вскрыть)" },
        { item: "Зубная паста/косметический тюбик", verdict: "Gelbe Tonne (комбинированный пластик/алюминий)" },
        { item: "Лампочка накаливания", verdict: "Restmüll; энергосберегающие/LED → Schadstoffhof" },
        { item: "Керамическая кружка", verdict: "Restmüll, не стекло" },
        { item: "Маленькие Li-Ion-пауэрбанки", verdict: "Электроника → Händler/Recyclinghof" },
        { item: "Одежда с пятнами масла, краски", verdict: "Restmüll (не принимают в Altkleider)" },
        { item: "Пропановый баллон", verdict: "Обратно продавцу/газовому пункту, залог ≈ 30 €" }
    ],
    
    // Pfand information
    pfandInfo: [
        { container: "Einweg-ПЭТ ≤3 л, алюминиевые банки", deposit: "0,25 €", where: "Любой супермаркет > 200 м² или Automaten" },
        { container: "Mehrweg-стекло/ПЭТ пиво/лимонад", deposit: "0,08-0,15 €", where: "Getränkemarkt, Rewe, Edeka" },
        { container: "Пивной ящик (20 бут.)", deposit: "≈1,50 €", where: "Getränkemarkt" },
        { container: "Стартер-аккумулятор авто", deposit: "7,50 €", where: "Магазин/СТО при покупке новой или Recyclinghof" },
        { container: "Многоразовый кофейный стакан (ReCup и под.)", deposit: "1-2 € (зависит от сети)", where: "Любая точка партнёрской сети" }
    ],
    
    // Useful tools
    usefulTools: [
        { name: "BSR Abfall-ABC", description: "поиск «куда выбросить X»" },
        { name: "BSR-App или сайт bsr.de", description: "ближайший Glas-container, Recyclinghof, бронирование Sperrmüll" },
        { name: "Pfandgeben.de", description: "отдать бутылки сборщикам, если лень сдавать" }
    ]
}; 
