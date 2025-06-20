// Documentation
// https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRouteMatrix#request-body
import { GOOGLE_MAPS_SERVER_API_KEY } from '$env/static/private';
import z from 'zod';

const zCondition = z.enum([
	'ROUTE_EXISTS',
	'ROUTE_NOT_FOUND',
	'ROUTE_MATRIX_ELEMENT_CONDITION_UNSPECIFIED'
]);

const zRoute = z.object({
	originIndex: z.number(),
	destinationIndex: z.number(),
	distanceMeters: z.number(),
	duration: z.string(),
	condition: zCondition
});
export type Route = z.infer<typeof zRoute>;

function makeWaypoint(placeId: string) {
	return {
		waypoint: {
			placeId: placeId
		}
	};
}

export async function computeRouteMatrix(
	origin: string,
	destinations: string[]
): Promise<Route[] | undefined> {
	try {
		const response = await fetch(
			'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-FieldMask': 'originIndex,destinationIndex,condition,distanceMeters,duration',
					'X-Goog-Api-Key': GOOGLE_MAPS_SERVER_API_KEY
				},
				body: JSON.stringify({
					origins: [makeWaypoint(origin)],
					destinations: destinations.map((dest) => makeWaypoint(dest))
				})
			}
		);

		if (!response.ok) {
			console.error('Failed to fetch route matrix:', response.statusText);
			return undefined;
		}

		const raw = await response.json();

		const validator = z.array(zRoute).safeParse(raw);

		if (validator.success === false) {
			console.error('Invalid route data:', raw);
			return undefined;
		}

		return validator.data;
	} catch (error) {
		console.error('Error fetching route matrix:', error);
		return undefined;
	}
}
