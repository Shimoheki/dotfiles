const entry = App.configDir + "/src/main.ts";
const outdir = "/tmp/ags/main.js";

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
