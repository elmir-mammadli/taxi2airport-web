import cs from '../lang/cs.json'
import en from '../lang/en.json'
import de from '../lang/de.json'

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false, // disable of the Detected HTML in message
  messages: {
    en,
    cs,
    de
  }
}))