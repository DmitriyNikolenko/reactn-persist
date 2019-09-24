declare module 'reactn-persist' {
	interface TStorageInstance {
		getItem: (key: string) => any;
		setItem: (key: string, persistedGlobalValue: object | any[]) => void;
	}

	interface TInitOptions {
		storage: TStorageInstance;
		key: string;
		whitelist: string[];
		debounceDelay: number;
		debug: boolean;
		initialValue: object | any[];
	}

	const init: (options: TInitOptions) => void;

	export const REHIDRATED_KEY: '@reactn';
	export default init;
}
