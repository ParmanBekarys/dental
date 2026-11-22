import { createContext, useContext } from 'react'

// Интерфейс мәтіндері. Емхана мен бағалар деректері src/data/ ішінде.
export const dict = {
  kk: {
    title: 'YourDental — Тіс емханасы',
    nav: { doctor: 'Дәрігер', prices: 'Бағалар', booking: 'Жазылу', contacts: 'Байланыс' },
    hero: {
      eyebrow: 'Тіс емханасы · Алматы',
      title: 'Тістеріңізге мұқият күтім',
      lead: 'Бас дәрігердің жеке бақылауымен емдеу: ауырсынусыз, асықпай және бағасы алдын ала белгілі.',
      cta: 'Қабылдауға жазылу',
      prices: 'Бағалар',
      note: 'Алғашқы кеңес — тегін',
    },
    prices: {
      eyebrow: 'Бағалар',
      title: 'Емдеу құны',
      desc: 'Нақты құн тексеруден кейін ем жоспарында бекітіледі. Kaspi арқылы бөліп төлеуге болады.',
      from: 'бастап',
      free: 'Тегін',
    },
    booking: {
      eyebrow: 'Онлайн жазылу',
      title: 'Қабылдауға жазылыңыз',
      desc: 'Әкімші 15 минут ішінде хабарласып, уақытты растайды.',
      name: 'Аты-жөніңіз',
      namePh: 'Айгерім',
      phone: 'Телефон',
      service: 'Қызмет',
      date: 'Күні',
      time: 'Уақыты',
      submit: 'Жазылу',
      errName: 'Атыңызды жазыңыз',
      errPhone: 'Нөмірді толық жазыңыз',
      errTime: 'Уақытты таңдаңыз',
      success: 'Өтінім қабылданды',
      successText: (b) => `${b.name}, сіз ${b.dateLabel}, сағат ${b.time}-ге жазылдыңыз.`,
      whatsapp: 'WhatsApp арқылы растау',
      again: 'Тағы жазылу',
      waText: (b) =>
        `Сәлеметсіз бе! Қабылдауға жазылдым.\nАты: ${b.name}\nТелефон: ${b.phone}\nҚызмет: ${b.service}\nКүні: ${b.dateLabel}, ${b.time}`,
    },
    weekdays: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
    months: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
  },
  ru: {
    title: 'YourDental — Стоматологическая клиника',
    nav: { doctor: 'Врач', prices: 'Цены', booking: 'Запись', contacts: 'Контакты' },
    hero: {
      eyebrow: 'Стоматология · Алматы',
      title: 'Бережная забота о ваших зубах',
      lead: 'Лечение под личным контролем главного врача: без боли, без спешки и с заранее известной ценой.',
      cta: 'Записаться на приём',
      prices: 'Цены',
      note: 'Первичная консультация — бесплатно',
    },
    prices: {
      eyebrow: 'Цены',
      title: 'Стоимость лечения',
      desc: 'Точная стоимость фиксируется в плане лечения после осмотра. Возможна рассрочка через Kaspi.',
      from: 'от',
      free: 'Бесплатно',
    },
    booking: {
      eyebrow: 'Онлайн-запись',
      title: 'Запишитесь на приём',
      desc: 'Администратор перезвонит в течение 15 минут и подтвердит время.',
      name: 'Ваше имя',
      namePh: 'Айгерим',
      phone: 'Телефон',
      service: 'Услуга',
      date: 'Дата',
      time: 'Время',
      submit: 'Записаться',
      errName: 'Укажите имя',
      errPhone: 'Введите номер полностью',
      errTime: 'Выберите время',
      success: 'Заявка принята',
      successText: (b) => `${b.name}, вы записаны на ${b.dateLabel}, ${b.time}.`,
      whatsapp: 'Подтвердить в WhatsApp',
      again: 'Записаться ещё раз',
      waText: (b) =>
        `Здравствуйте! Я записался(-ась) на приём.\nИмя: ${b.name}\nТелефон: ${b.phone}\nУслуга: ${b.service}\nДата: ${b.dateLabel}, ${b.time}`,
    },
    weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  },
}

export const LANGS = [
  { id: 'kk', label: 'ҚАЗ' },
  { id: 'ru', label: 'РУС' },
]

export const STORAGE_KEY = 'yourdental-lang'
export const LangContext = createContext(null)

export function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && dict[saved]) return saved
  } catch {
    /* storage unavailable */
  }
  return 'kk'
}

export const useLang = () => useContext(LangContext)
