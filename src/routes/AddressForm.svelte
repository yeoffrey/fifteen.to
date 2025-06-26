<script lang="ts">
	import AddressInput from '$lib/components/AddressInput.svelte';
	import * as Form from '$lib/components/ui/form';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { AddressInputFormSchema } from './schema';

	let { data }: { data: { form: SuperValidated<Infer<AddressInputFormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(AddressInputFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
	<Form.Field {form} name="address">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Address</Form.Label>
				<AddressInput {...props} bind:value={$formData.address} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
<SuperDebug data={$formData} />
