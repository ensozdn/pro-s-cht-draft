// @ts-ignore
import tr from './locales/tr.json'
// @ts-ignore
import en from './locales/en.json'
// @ts-ignore
import ar from './locales/ar.json'
// @ts-ignore
import fr from './locales/fr.json'
// @ts-ignore
import de from './locales/de.json'
// @ts-ignore
import it from './locales/it.json'
// @ts-ignore
import pt from './locales/pt.json'
// @ts-ignore
import ru from './locales/ru.json'
// @ts-ignore
import es from './locales/es.json'
// @ts-ignore
import nl from './locales/nl.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'en',
  messages: {
    tr,
    en,
    ar,
    fr,
    de,
    it,
    pt,
    ru,
    es,
    nl
  }
}))
