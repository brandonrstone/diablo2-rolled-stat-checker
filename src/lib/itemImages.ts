import type { SetItemType, UniqueItemType } from '../types';

type ImageKind = 'unique' | 'set';

const IMAGE_ROOT = '/item-icons';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildImageUrl(kind: ImageKind, name: string) {
  return `${IMAGE_ROOT}/${kind}/${slugify(name)}.png`;
}

export function attachUniqueImage(item: UniqueItemType): UniqueItemType {
  if (item.imageUrl) return item;
  return { ...item, imageUrl: buildImageUrl('unique', item.name) };
}

export function attachSetImage(item: SetItemType): SetItemType {
  if (item.imageUrl) return item;
  return { ...item, imageUrl: buildImageUrl('set', item.name) };
}

