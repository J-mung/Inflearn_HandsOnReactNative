export const INITIAL_DATE = new Date();
export const INITIAL_END = new Date();
export const INITIAL_START = new Date();
INITIAL_START.setDate(INITIAL_START.getDate() - 29);

export const INITIAL_DATE_STRING = INITIAL_DATE.toISOString().split('T')[0];
export const INITIAL_END_STRING = INITIAL_DATE.toISOString().split('T')[0];
export const INITIAL_START_STRING = INITIAL_DATE.toISOString().split('T')[0];
