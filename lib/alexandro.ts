export const ALEXANDRO_OPEN_EVENT = 'alexandro:open'

export function openAlexandroWidget() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ALEXANDRO_OPEN_EVENT))
  }
}
