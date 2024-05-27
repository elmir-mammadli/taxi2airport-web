import cs from '../lang/cs.json'
import en from '../lang/en.json'
import de from '../lang/de.json'
import es from '../lang/es.json'
import ua from '../lang/ua.json'
import tr from '../lang/tr.json'
import ru from '../lang/ru.json'

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false, // disable of the Detected HTML in message
  messages: {
    en,
    cs,
    de,
    es,
    ua,
    tr,
    ru
  }
}))
