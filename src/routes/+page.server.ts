import type { ErrorCode } from '$lib/types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { AddressInputFormSchema } from './schema';

export const load: PageServerLoad = async ({ url }) => {
	const code = url.searchParams.get('code') as ErrorCode | null;

	const form = await superValidate(zod(AddressInputFormSchema));

	return { form, code };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(AddressInputFormSchema));

		if (!form.valid)
			return fail(400, {
				form
			});

		console.log('Form data:', form.data);

		return {
			form
		};
	}
};
