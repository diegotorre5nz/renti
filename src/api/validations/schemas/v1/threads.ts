export const create = {
  type: 'Object',
  required: true,
  properties: {
    text: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
    mainThreadId: { type: 'number', required: false },
    previousThreadId: { type: 'number', required: false },
  },
}

export const patch = {
  type: 'Object',
  required: true,
  properties: {
    text: { type: 'string', required: true, minLength: 1, maxLength: 1000 },
  },
}
