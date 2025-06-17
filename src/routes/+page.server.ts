import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { AddressInputFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(AddressInputFormSchema))
	};
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
