<script lang="ts">
	import type { FormProps } from '$lib/components/qrcode/forms';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { QRCodeEmailSchema, type QRCodeEmail } from '$lib/qrcode';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import SubmitButton from './submit-button.svelte';

	let { onSubmit }: FormProps = $props();

	const form = superForm(
		defaults(valibot(QRCodeEmailSchema), {
			defaults: {
				type: 'email',
				email: '',
				subject: ''
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeEmailSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeEmail);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="email">
		<FormControl let:attrs>
			<FormLabel>E-Mail</FormLabel>
			<Input {...attrs} bind:value={$formData.email} placeholder="janedoe@example.com" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="subject">
		<FormControl let:attrs>
			<FormLabel>Subject</FormLabel>
			<Input {...attrs} bind:value={$formData.subject} placeholder="Hello World" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="body" class="mb-8">
		<FormControl let:attrs>
			<FormLabel>Text</FormLabel>
			<Textarea
				{...attrs}
				bind:value={$formData.body}
				placeholder="This could have been a meeting..."
			/>
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<SubmitButton />
</form>
