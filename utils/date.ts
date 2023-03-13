export const getStringFromDate = (date: Date | null | undefined) => {
  if (!date) return null

  const _date = new Date(date)

  const mm = _date.getMonth() + 1
  const dd = _date.getDate()

  return [
    _date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('')
}
