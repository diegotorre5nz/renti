export const update = {
  type: 'Object',
  properties: {
    password: { type: 'string', format: 'password'},
    additionalProperties: false,
  }
}

export const create = {
  type: 'Object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
    dateOfBirth: { type: 'string', format: 'date' },
    readingPreferences: { type: 'string' },
  },
  required:['email', 'password', 'dateOfBirth', 'readingPreferences'],
  additionalProperties: false,
}