const entry = App.configDir + "/src/main.ts";

function tempNumber() {
	return BigInt(Math.floor(Math.random() * 100_000_000_000));
}

function combinedNumber() {
	const randoms = [];
	for (let i = 0; i < 10; i++) randoms[i] = tempNumber() * tempNumber();
	let random = 1n;
	randoms.forEach((v) => (random = v * random));
	return random;
}

const psuedoRandom = combinedNumber().toString();

const outdir = `/tmp/ags-${psuedoRandom}/`;

try {
	await Utils.execAsync([
		"bun",
		"build",
		entry,
		"--outdir",
		outdir,
		"--external",
		"resource://*",
		"--external",
		"gi://*",
		"--target",
		"browser",
	]);
	await import(`file://${outdir}/main.js`);
} catch (error) {
	console.error(error);
}

export {};
