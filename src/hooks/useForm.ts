import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormProps<T> {
  initialValues: T;
  schema: z.ZodType<T>;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // Clear error for this field when user starts typing
      if (errors[name as keyof T]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name as keyof T];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Validate form data using Zod schema
        const validatedData = schema.parse(values);
        
        // Call onSubmit with validated data
        await onSubmit(validatedData);
        
        // Clear any errors after successful submit
        setErrors({});
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Convert Zod error format to our error format
          const formattedErrors = error.errors.reduce((acc, curr) => {
            const path = curr.path[0] as keyof T;
            acc[path] = curr.message;
            return acc;
          }, {} as Partial<Record<keyof T, string>>);
          
          setErrors(formattedErrors);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
};