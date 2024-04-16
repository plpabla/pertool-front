export default class Backend {
  static #url = 'http://localhost:3000'

  constructor() {
    console.log(`Backend endpoint configured as ${Backend.#url}`)
  }

  get calculateUrl() {
    return `${Backend.#url}/api/calculate`
  }
}