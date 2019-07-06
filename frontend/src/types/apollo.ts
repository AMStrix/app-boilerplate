// NOTE: apollo-server/packages/apollo-server-errors/src/index.ts
export const ERROR_CODES = {
  UNAUTHENTICATED: { code: 'UNAUTHENTICATED', description: '', lang: '' },
  FORBIDDEN: { code: 'FORBIDDEN', description: '', lang: '' },
  BAD_USER_INPUT: { code: 'BAD_USER_INPUT', description: '', lang: '' },
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', description: '', lang: '' },
  GRAPHQL_PARSE_FAILED: { code: 'GRAPHQL_PARSE_FAILED', description: '', lang: '' },
  GRAPHQL_VALIDATION_FAILED: {
    code: 'GRAPHQL_VALIDATION_FAILED',
    description: '',
    lang: '',
  },
  PERSISTED_QUERY_NOT_FOUND: {
    code: 'PERSISTED_QUERY_NOT_FOUND',
    description: '',
    lang: '',
  },
  PERSISTED_QUERY_NOT_SUPPORTED: {
    code: 'PERSISTED_QUERY_NOT_SUPPORTED',
    description: '',
    lang: '',
  },
};
export type ErrorCode = keyof typeof ERROR_CODES;
