export function ellipsis(text, maxLength) {
  if (text.length > maxLength) return text.substring(0, maxLength) + "...";
  else return text.substring(0, maxLength);
}
