export function diacriticRegex(string = '') {
  return string
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éëèê]/g, 'e')
    .replace(/[íïì]/g, 'i')
    .replace(/[óöòõô]/g, 'o')
    .replace(/[úùüũ]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ÁÀÄÂÃ]/g, 'A')
    .replace(/[ÉËÈÊ]/g, 'E')
    .replace(/[ÍÏÌ]/g, 'I')
    .replace(/[ÓÖÒ]/g, 'O')
    .replace(/[ÚÙÜŨ]/g, 'U')
    .replace(/[Ç]/g, 'C');
}
