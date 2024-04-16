export default class Backend {
  static #url = 'https://pert.azurewebsites.net'

  constructor() {
    console.log(`Backend endpoint configured as ${Backend.#url}`)
  }

  get calculateUrl() {
    return `${Backend.#url}/api/calculate`
  }
}