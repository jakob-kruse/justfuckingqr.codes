<script lang="ts">
	import type { FormProps } from '$lib/components/qrcode/forms';
	import {
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		QRCodeBitcoinSchema,
		type QRCodeBitcoin
	} from '$lib/qrcode';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import SubmitButton from './submit-button.svelte';

	let { onSubmit }: FormProps = $props();

	const form = superForm(
		defaults(valibot(QRCodeBitcoinSchema), {
			defaults: {
				type: 'bitcoin',
				address: '',
				amount: 0
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeBitcoinSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeBitcoin);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="address">
		<FormControl let:attrs>
			<FormLabel>Wallet Address</FormLabel>
			<Input
				{...attrs}
				bind:value={$formData.address}
				placeholder="1A1zP1eP5QGefi2FMPTfTL5SLmv7DivfNa"
			/>
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="amount">
		<FormControl let:attrs>
			<FormLabel>Subject</FormLabel>
			<Input type="number" {...attrs} bind:value={$formData.amount} placeholder="0.001" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="label" class="mb-8">
		<FormControl let:attrs>
			<FormLabel>Label</FormLabel>
			<Textarea {...attrs} bind:value={$formData.label} placeholder="My Label" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<SubmitButton />
</form>
