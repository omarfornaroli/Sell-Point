import { v4 as uuid } from 'uuid';

export const ID_SEPARATOR = ':';
export const KEBAB_SEPARATOR = '-';
export const UNDER_SCORE_SEPARATOR = '_';
export const ID_PREFIX = 'urn:pistacho:id';
export const SCHEMA_PREFIX = 'urn:pistacho:schema';

export const generateId = uuid;