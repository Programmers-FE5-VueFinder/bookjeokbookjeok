export function formatAuthor(author: string) {
  const names = author
    .split('(')[0]
    .split(',')
    .map((name) => name.trim());
  if (names.length === 1) {
    return names[0];
  } else {
    return `${names[0]} 외 ${names.length - 1}명`;
  }
}
