import { useEffect, useState } from 'react'
import { dict, initialLang, LangContext, STORAGE_KEY } from './i18n'

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = dict[lang].title
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const value = {
    lang,
    setLang,
    t: dict[lang],
    // Деректердегі { kk, ru } мәтінін ағымдағы тілге аударады
    tr: (v) => (v && typeof v === 'object' ? v[lang] ?? v.kk : v),
  }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
