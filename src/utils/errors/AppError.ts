export type ErrorCode = 
  | 'NETWORK_ERROR'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR';

export interface AppError {
  readonly name: 'AppError';
  readonly code: ErrorCode;
  readonly message: string;
  readonly originalError?: Error;
  readonly statusCode?: number;
}

export interface AppErrorOptions {
  code: ErrorCode;
  message: string;
  originalError?: Error;
  statusCode?: number;
}

function createAppError(options: AppErrorOptions): AppError {
  return {
    name: 'AppError',
    code: options.code,
    message: options.message,
    originalError: options.originalError,
    statusCode: options.statusCode,
  };
}

export function createAppErrorFromResponse(response: Response, context?: string): AppError {
  const prefix = context ? `${context}: ` : '';
  
  if (response.status === 404) {
    return createAppError({
      code: 'NOT_FOUND',
      message: `${prefix}Recurso no encontrado`,
      statusCode: 404,
    });
  }

  if (response.status === 401 || response.status === 403) {
    return createAppError({
      code: 'UNAUTHORIZED',
      message: `${prefix}No autorizado`,
      statusCode: response.status,
    });
  }

  if (response.status >= 500) {
    return createAppError({
      code: 'SERVER_ERROR',
      message: `${prefix}Error del servidor`,
      statusCode: response.status,
    });
  }

  return createAppError({
    code: 'UNKNOWN_ERROR',
    message: `${prefix}${response.statusText || 'Error desconocido'}`,
    statusCode: response.status,
  });
}

export function createAppErrorFromError(error: unknown, context?: string): AppError {
  const prefix = context ? `${context}: ` : '';

  if (isAppError(error)) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return createAppError({
      code: 'NETWORK_ERROR',
      message: `${prefix}Error de conexion. Verifica tu conexion a internet.`,
      originalError: error,
    });
  }

  if (error instanceof Error) {
    return createAppError({
      code: 'UNKNOWN_ERROR',
      message: `${prefix}${error.message}`,
      originalError: error,
    });
  }

  return createAppError({
    code: 'UNKNOWN_ERROR',
    message: `${prefix}Ha ocurrido un error inesperado`,
  });
}

function throwAppError(error: AppError): never {
  const errorObj = Object.assign(new Error(error.message), error);
  errorObj.name = error.name;
  throw errorObj;
}

export function throwAppErrorFromResponse(response: Response, context?: string): never {
  throwAppError(createAppErrorFromResponse(response, context));
}

export function throwAppErrorFromError(error: unknown, context?: string): never {
  throwAppError(createAppErrorFromError(error, context));
}

export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AppError' &&
    'code' in error &&
    'message' in error
  );
}

export function getUserMessage(error: AppError): string {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Error de conexion. Verifica tu conexion a internet.';
    case 'NOT_FOUND':
      return 'El recurso solicitado no fue encontrado.';
    case 'UNAUTHORIZED':
      return 'No tienes permisos para realizar esta accion.';
    case 'SERVER_ERROR':
      return 'Error del servidor. Intenta nuevamente mas tarde.';
    case 'VALIDATION_ERROR':
      return error.message;
    default:
      return 'Ha ocurrido un error inesperado.';
  }
}