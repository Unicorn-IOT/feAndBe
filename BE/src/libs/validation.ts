import { ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validation = <T extends ZodSchema<any>>(schema: T, payload: unknown): ReturnType<T['parse']> => {
	const validated = schema.safeParse(payload);

	if (!validated.success) throw new Error(fromZodError(validated.error).message);

	return validated.data;
};
