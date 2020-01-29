export default function readMore(text) {
  const MAX_TEXT_SIZE = 150;
  if (text.length > MAX_TEXT_SIZE) {
    return text.slice(0, MAX_TEXT_SIZE) + '...';
  }
  return text;
}
