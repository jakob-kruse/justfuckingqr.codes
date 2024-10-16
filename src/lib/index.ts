export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
	immediate = false
): (...args: Parameters<T>) => ReturnType<T> | void {
	let timeout: NodeJS.Timeout | null = null;

	return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
		const context = this;

		const later = function () {
			timeout = null;
			if (!immediate) return func.apply(context, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout as NodeJS.Timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			return func.apply(context, args);
		}
	};
}
