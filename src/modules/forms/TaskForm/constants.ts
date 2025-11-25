import Joi from 'joi';

export const taskFormSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El título es requerido',
      'string.min': 'El título debe tener al menos 3 caracteres',
      'string.max': 'El título no puede tener más de 100 caracteres',
      'any.required': 'El título es requerido',
    }),
  description: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.empty': 'La descripción es requerida',
      'string.min': 'La descripción debe tener al menos 5 caracteres',
      'string.max': 'La descripción no puede tener más de 500 caracteres',
      'any.required': 'La descripción es requerida',
    }),
});

export type TaskFormData = {
  name: string;
  description: string;
};

