declare module 'reactn-persist' {
	import * as React from 'react'
	
	interface TStorageInstance {
		getItem: (key: string) => any;
		setItem: (key: string, value: string) => void;
	}

	interface TInitOptions {
		storage: TStorageInstance;
		key?: string;
		whitelist?: string[];
		debounceDelay?: number;
		debug?: boolean;
		initialValue?: object | any[];
		provider?: React.Component<{}, {}>;
	}

	const init: (options: TInitOptions) => void;

	export const REHIDRATED_KEY: '@reactn';
	export default init;
}