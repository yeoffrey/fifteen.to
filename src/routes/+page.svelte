<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import AddressForm from './AddressForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

{#if data.code === 'missing_id'}
	<p class="text-red-500">Please search an address</p>
{:else if data.code === 'not_found'}
	<p class="text-red-500">Address not found</p>
{:else if data.code === 'error'}
	<p class="text-red-500">An error has occured, please try again later</p>
{/if}

<div class="flex h-screen flex-col items-center justify-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Enter your address</Card.Title>
			<Card.Description>Calculate your address now!</Card.Description>
		</Card.Header>
		<Card.Content>
			<AddressForm {data} />
		</Card.Content>
	</Card.Root>
</div>
