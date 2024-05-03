export async function setTimeoutAsync(delay?: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}
