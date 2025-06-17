import { placesClient } from '$lib/server/places';
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

		// Run request
		const [response] = await placesClient.searchText(
			{
				textQuery: form.data.address
			},
			{
				otherArgs: {
					headers: {
						'X-Goog-FieldMask': 'places.displayName'
					}
				}
			}
		);

		for (const place of response.places || []) {
			console.log('Place:', place.displayName);
		}

		return {
			form
		};
	}
};
