<script lang="ts">
	import { QRCodeTextSchema, QRCodeURLSchema, type QRCodeText, type QRCodeURL } from '$lib/qrcode';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { FormProps } from '$lib/components/qrcode/forms';
	import SubmitButton from './submit-button.svelte';

	let { onSubmit }: FormProps = $props();

	const form = superForm(
		defaults(valibot(QRCodeURLSchema), {
			defaults: {
				url: '',
				type: 'url'
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeURLSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeURL);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="url" class="mb-8">
		<FormControl let:attrs>
			<FormLabel>URL</FormLabel>
			<Input {...attrs} bind:value={$formData.url} placeholder="https://example.com" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<SubmitButton />
</form>
