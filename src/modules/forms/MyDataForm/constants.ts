import Joi from 'joi';
import { EMAIL_REGEX, PHONE_REGEX, NAME_REGEX } from '../../../utils/regex';

export const myDataFormSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(NAME_REGEX)
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'El nombre es requerido',
      'string.pattern.base': 'El nombre solo puede contener letras',
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 50 caracteres',
      'any.required': 'El nombre es requerido',
    }),
  email: Joi.string()
    .trim()
    .pattern(EMAIL_REGEX)
    .max(50)
    .required()
    .messages({
      'string.empty': 'El email es requerido',
      'string.pattern.base': 'Debe ser un email válido',
      'string.max': 'El email no puede tener más de 50 caracteres',
      'any.required': 'El email es requerido',
    }),
  phone: Joi.string()
    .trim()
    .pattern(PHONE_REGEX)
    .max(50)
    .required()
    .messages({
      'string.empty': 'El teléfono es requerido',
      'string.pattern.base': 'Debe ser un teléfono válido',
      'string.max': 'El teléfono no puede tener más de 50 caracteres',
      'any.required': 'El teléfono es requerido',
    }),
});

export type MyDataFormData = {
  name: string;
  email: string;
  phone: string;
};

