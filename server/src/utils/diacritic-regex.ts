export function diacriticRegex(string = '') {
  return string
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éëè]/g, 'e')
    .replace(/[íïì]/g, 'i')
    .replace(/[óöò]/g, 'o')
    .replace(/[úùü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ÁÀÄÂ]/g, 'A')
    .replace(/[ÉËÈ]/g, 'E')
    .replace(/[ÍÏÌ]/g, 'I')
    .replace(/[ÓÖÒ]/g, 'O')
    .replace(/[ÚÙÜ]/g, 'U')
    .replace(/[Ç]/g, 'C');
}
