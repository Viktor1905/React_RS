export function capitalizeFirstLetter(str: string | null): string {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}
