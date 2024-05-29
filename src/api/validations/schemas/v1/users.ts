export const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

export const login = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 8, maxLength: 80 },
    dateOfBirth: { type: 'string', required: true, minLength: 8, maxLength: 80 },
    readingPreferences: { type: 'string', required: true, minLength: 8, maxLength: 80  },
  },
}

export const create = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true, minLength: 2, maxLength: 80 },
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 4, maxLength: 80 },
    dateOfBirth: { type: 'string', required: true, minLength: 10, maxLength: 80 },
    readingPreferences: { type: 'string', required: true, minLength: 2, maxLength: 255  },
  },
}

export const patch = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 80 },
    password: { type: 'string', minLength: 8, maxLength: 80 },
    dateOfBirth: { type: 'string', minLength: 8, maxLength: 80 },
    readingPreferences: { type: 'string', minLength: 8, maxLength: 80  },
  },
}
