export const create = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true, minLength: 8, maxLength: 255 },
  },
}

export const patch = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', minLength: 8, maxLength: 80 },
  },
}
