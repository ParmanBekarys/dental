import { clinic } from '../data/clinic'
import { useLang } from '../i18n'
import { ClockIcon, PhoneIcon, PinIcon, ToothIcon } from './Icons'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { tr } = useLang()

  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer__grid">
          <a href="#top" className="logo">
            <ToothIcon width={22} height={22} />
            {clinic.name}
          </a>
          <p className="footer__item"><PinIcon width={18} height={18} />{tr(clinic.address)}</p>
          <p className="footer__item">
            <PhoneIcon width={18} height={18} />
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </p>
          <p className="footer__item"><ClockIcon width={18} height={18} />{tr(clinic.hours)}</p>
        </div>
        <p className="footer__bottom">© {YEAR} {clinic.name}</p>
      </div>
    </footer>
  )
}
