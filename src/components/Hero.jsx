import { doctor } from '../data/clinic'
import { useLang } from '../i18n'

export default function Hero() {
  const { t, tr } = useLang()

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero__actions">
            <a href="#booking" className="btn">{t.hero.cta}</a>
            <a href="#prices" className="btn btn--ghost">{t.hero.prices}</a>
          </div>
          <p className="hero__note">{t.hero.note}</p>
        </div>

        <figure className="hero__photo" id="doctor">
          <img src={doctor.photo} alt={tr(doctor.name)} />
          <figcaption>
            <strong>{tr(doctor.name)}</strong>
            <span>{tr(doctor.role)}</span>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <div className="about">
          <blockquote>«{tr(doctor.quote)}»</blockquote>
          <dl className="about__facts">
            {doctor.facts.map((f, i) => (
              <div key={i}>
                <dt>{tr(f.value)}</dt>
                <dd>{tr(f.label)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
