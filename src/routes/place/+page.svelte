<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#if !data.another}
	<p>There was an error searching for the address. Try again later</p>
{:else}
	{#each data.another as place (place.name)}
		{@const { name, address } = place}
		<Card.Root class="mx-auto max-w-md">
			<Card.Header>
				<Card.Title>{name}</Card.Title>
				<Card.Description>{address}</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}
{/if}
