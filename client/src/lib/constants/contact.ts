export const LINK_TYPES = {
  EMAIL: 'email',
  PHONE: 'phone',
  LINK: 'link',
} as const;

export const URL_PREFIXES = {
  [LINK_TYPES.EMAIL]: 'mailto:',
  [LINK_TYPES.PHONE]: 'tel:',
  [LINK_TYPES.LINK]: '',
} as const;
