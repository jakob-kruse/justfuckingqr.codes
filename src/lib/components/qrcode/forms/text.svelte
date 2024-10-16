<script lang="ts">
	import { QRCodeTextSchema, type QRCodeOptions, type QRCodeText } from '$lib/qrcode';
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
		defaults(valibot(QRCodeTextSchema), {
			defaults: {
				text: '',
				type: 'text'
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeTextSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeText);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="text" class="mb-8">
		<FormControl let:attrs>
			<FormLabel>Text</FormLabel>
			<Input {...attrs} bind:value={$formData.text} placeholder="Hello World" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<SubmitButton />
</form>
