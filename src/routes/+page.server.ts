import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { AddressInputFormSchema } from './schema';

type ErrorCode = 'missing_id' | 'not_found' | 'error';

const TESTING = { address: 'ChIJHxVz6NejDEsRcaaeDvTvYe4' };

export const load: PageServerLoad = async ({ url }) => {
	const code = url.searchParams.get('code') as ErrorCode | null;

	const form = await superValidate(TESTING, zod(AddressInputFormSchema));

	return { form, code };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(AddressInputFormSchema));

		if (!form.valid)
			return fail(400, {
				form
			});

		return redirect(303, '/place/?id=' + encodeURIComponent(form.data.address));
	}
};
