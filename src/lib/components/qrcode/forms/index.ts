import type { QRCodeOptions } from '$lib/qrcode';

export type FormProps = {
	onSubmit: (options: QRCodeOptions) => void;
};
