import { placesClient } from './client';

export async function getPlace(placeId: string) {
	const [response] = await placesClient.getPlace(
		{
			name: `places/${placeId}`
		},
		{
			otherArgs: {
				headers: {
					'X-Goog-FieldMask': 'displayName,location'
				}
			}
		}
	);

	return response;
}
