// utils/buildFileTree.ts
export function buildFileTree(paths: string[]) {
	const root: any = {};

	for (const path of paths) {
		const parts = path.split("/");
		let current = root;

		for (const part of parts) {
			if (!current[part]) {
				current[part] = {};
			}
			current = current[part];
		}
	}

	return root;
}
