export default class Formatter {
  static formatDate(value: Date) {
    const date = new Date(value)
    return Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(date)
  }
}
