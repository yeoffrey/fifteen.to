<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#each data.placeRoutes as place (place.name)}
	{@const { name, address } = place}
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title>{name}</Card.Title>
			<Card.Description>{address}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-gray-500">
				{place.duration || 'No description available.'}
			</p>
			<p class="text-sm text-gray-500">
				{place.primaryType || 'No description available.'}
			</p>
		</Card.Content>
	</Card.Root>
{/each}
