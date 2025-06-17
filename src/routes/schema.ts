import { z } from 'zod';

export const AddressInputFormSchema = z.object({
	address: z.string().min(1, 'Address is required')
});

export type AddressInputFormSchema = typeof AddressInputFormSchema;
