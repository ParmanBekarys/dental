import { categories, formatNumber } from '../data/prices'
import { useLang } from '../i18n'

export default function Prices() {
  const { t, tr } = useLang()

  return (
    <section className="section section--tint" id="prices">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{t.prices.eyebrow}</p>
          <h2>{t.prices.title}</h2>
          <p className="muted">{t.prices.desc}</p>
        </div>

        <div className="price-grid">
          {categories.map((c, ci) => (
            <article className="price-card" key={ci}>
              <h3>{tr(c.title)}</h3>
              <ul>
                {c.items.map((i, ii) => (
                  <li key={ii}>
                    <span className="price-card__name">{tr(i.name)}</span>
                    <span className="price-card__dots" aria-hidden="true" />
                    <span className={`price-card__price ${i.price === 0 ? 'is-free' : ''}`}>
                      {i.price === 0 ? (
                        t.prices.free
                      ) : (
                        <>
                          {i.from && <small>{t.prices.from} </small>}
                          {formatNumber(i.price)}
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
