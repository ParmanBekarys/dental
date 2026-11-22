import { useState } from 'react'
import { clinic, TIMES } from '../data/clinic'
import { categories, findService, serviceKey } from '../data/prices'
import { useLang } from '../i18n'
import { CheckIcon } from './Icons'

const STORAGE_KEY = 'yourdental-bookings'

const pad = (n) => String(n).padStart(2, '0')
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

// Келесі 12 жұмыс күні (жексенбі — демалыс)
function getDays() {
  const days = []
  const d = new Date()
  while (days.length < 12) {
    if (d.getDay() !== 0) days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

// Бүгінгі өтіп кеткен сағаттар
function isPastSlot(date, t) {
  const now = new Date()
  return date === toISO(now) && parseInt(t, 10) <= now.getHours()
}

function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function formatPhone(value) {
  let d = value.replace(/\D/g, '')
  if (!d) return ''
  if (d[0] === '8') d = '7' + d.slice(1)
  if (d[0] !== '7') d = '7' + d
  d = d.slice(0, 11)
  const [a, b, c, e] = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)]
  let out = '+7'
  if (a) out += ` (${a}`
  if (a.length === 3) out += ')'
  if (b) out += ` ${b}`
  if (c) out += `-${c}`
  if (e) out += `-${e}`
  return out
}

const EMPTY = { name: '', phone: '', service: serviceKey(0, 0) }

export default function Booking() {
  const { t, tr } = useLang()
  const b = t.booking
  const [days] = useState(getDays)
  const [form, setForm] = useState(EMPTY)
  const [date, setDate] = useState(() => toISO(days[0]))
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  const taken = loadBookings().filter((x) => x.date === date).map((x) => x.time)

  const set = (key) => (e) => {
    const value = key === 'phone' ? formatPhone(e.target.value) : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((er) => ({ ...er, [key]: '' }))
  }

  function submit(e) {
    e.preventDefault()
    const er = {}
    if (form.name.trim().length < 2) er.name = 'errName'
    if (form.phone.replace(/\D/g, '').length !== 11) er.phone = 'errPhone'
    if (!time) er.time = 'errTime'
    setErrors(er)
    if (Object.keys(er).length) return

    const booking = { ...form, name: form.name.trim(), date, time, createdAt: new Date().toISOString() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...loadBookings(), booking]))
    } catch {
      /* storage unavailable */
    }
    setDone(booking)
  }

  function reset() {
    setForm(EMPTY)
    setTime('')
    setDone(null)
  }

  // Сәтті жазылу мәтіні ағымдағы тілде құрылады
  let summary = null
  if (done) {
    const d = new Date(done.date + 'T00:00')
    summary = {
      ...done,
      service: tr(findService(done.service)?.name),
      dateLabel: `${d.getDate()} ${t.months[d.getMonth()]}`,
    }
  }

  return (
    <section className="section" id="booking">
      <div className="container">
        <div className="section__head section__head--center">
          <p className="eyebrow">{b.eyebrow}</p>
          <h2>{b.title}</h2>
          <p className="muted">{b.desc}</p>
        </div>

        <div className="booking-card">
          {summary ? (
            <div className="success">
              <div className="success__icon"><CheckIcon width={26} height={26} /></div>
              <h3>{b.success}</h3>
              <p className="muted">{b.successText(summary)}</p>
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(b.waText(summary))}`}
              >
                {b.whatsapp}
              </a>
              <button type="button" className="link" onClick={reset}>{b.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <div className="form__row">
                <div className={`field ${errors.name ? 'invalid' : ''}`}>
                  <label htmlFor="name">{b.name}</label>
                  <input id="name" autoComplete="name" placeholder={b.namePh} value={form.name} onChange={set('name')} />
                  {errors.name && <small className="error">{b[errors.name]}</small>}
                </div>
                <div className={`field ${errors.phone ? 'invalid' : ''}`}>
                  <label htmlFor="phone">{b.phone}</label>
                  <input id="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={set('phone')} />
                  {errors.phone && <small className="error">{b[errors.phone]}</small>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="service">{b.service}</label>
                <select id="service" value={form.service} onChange={set('service')}>
                  {categories.map((c, ci) => (
                    <optgroup key={ci} label={tr(c.title)}>
                      {c.items.map((i, ii) => (
                        <option key={ii} value={serviceKey(ci, ii)}>{tr(i.name)}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="field">
                <span className="label">{b.date}</span>
                <div className="days">
                  {days.map((d) => {
                    const iso = toISO(d)
                    return (
                      <button
                        type="button"
                        key={iso}
                        className="day"
                        aria-pressed={date === iso}
                        onClick={() => {
                          setDate(iso)
                          setTime('')
                        }}
                      >
                        <span>{t.weekdays[d.getDay()]}</span>
                        <strong>{d.getDate()}</strong>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className={`field ${errors.time ? 'invalid' : ''}`}>
                <span className="label">{b.time}</span>
                <div className="slots">
                  {TIMES.map((tm) => (
                    <button
                      type="button"
                      key={tm}
                      className="slot"
                      aria-pressed={time === tm}
                      disabled={isPastSlot(date, tm) || taken.includes(tm)}
                      onClick={() => {
                        setTime(tm)
                        setErrors((er) => ({ ...er, time: '' }))
                      }}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
                {errors.time && <small className="error">{b[errors.time]}</small>}
              </div>

              <button type="submit" className="btn btn--block">{b.submit}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
