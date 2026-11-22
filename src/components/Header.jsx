import { clinic } from '../data/clinic'
import { LANGS, useLang } from '../i18n'
import { PhoneIcon, ToothIcon } from './Icons'

export default function Header() {
  const { t, lang, setLang } = useLang()

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="logo">
          <ToothIcon width={22} height={22} />
          {clinic.name}
        </a>

        <nav className="nav">
          <a href="#doctor">{t.nav.doctor}</a>
          <a href="#prices">{t.nav.prices}</a>
          <a href="#booking">{t.nav.booking}</a>
          <a href="#contacts">{t.nav.contacts}</a>
        </nav>

        <div className="header__actions">
          <div className="lang" role="group" aria-label="Тіл / Язык">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={lang === l.id}
                onClick={() => setLang(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a href={clinic.phoneHref} className="header__phone" aria-label={clinic.phone}>
            <PhoneIcon width={16} height={16} />
            <span>{clinic.phone}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
