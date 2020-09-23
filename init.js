import { setGlobalInternal, getGlobalInternal, addCallback } from 'reactn';
import { debounce } from './helpers';

const defaults = {
	KEY: '@reactn',
	whitelist: [],
	debounceDelay: 1000,
	debug: false,
	initialValue: {},
};

const log = (method, payload) => {
	console.log('reactn-persist: ', method, payload);
};

const rehidrate = async ({ storage, key, initialValue, whitelist, debug, provider }) => {
	const getGlobal = !!provider ? provider.getGlobal : getGlobalInternal;
	const setGlobal = !!provider ? provider.setGlobal : setGlobalInternal;
	try {
		// Obtain persisted data.
		const persistedGlobalValue = await storage.getItem(key);
		const persistedGlobal = JSON.parse(persistedGlobalValue);

		// Sanitize persisted data relying on whitelist.
		let persistedGlobalFiltered = persistedGlobal;
		if (whitelist.length > 0) {
			persistedGlobalFiltered = Object.keys(persistedGlobal).reduce((item, key) => {
				if (whitelist.includes(key)) {
					item[key] = persistedGlobal[key];
				}
				return item;
			}, Object.create(null));
			storage.setItem(key, JSON.stringify(persistedGlobalFiltered));
		}

		// Set persisted data to global.
		setGlobal({ ...initialValue, ...persistedGlobalFiltered }, (global) => setGlobal({ [key]: true }));

		debug && log('rehidrate', { initial: { ...getGlobal() }, persisted: { ...persistedGlobal } });
	} catch (error) {
		setGlobal({ ...initialValue }, (global) => setGlobal({ [key]: true }));
		debug && log('rehidrate', { error: error.message });
	}
};

const parsePerisistableGlobal = (global, { whitelist }) => {
	return Object.keys(global).reduce((persistedGlobal, key) => {
		if (whitelist.includes(key)) {
			persistedGlobal[key] = global[key];
		}
		return persistedGlobal;
	}, Object.create(null));
};

const persist = ({ storage, key, whitelist, debug }) => (global) => {
	try {
		const persistedGlobal = whitelist.length ? parsePerisistableGlobal(global, { whitelist }) : global;
		const persistedGlobalValue = JSON.stringify(persistedGlobal);
		storage.setItem(key, persistedGlobalValue);
		debug && log('persist', { key, value: persistedGlobalValue });
	} catch (error) {
		debug && log('persist', { error: error.message });
	}
};

const init = async ({
	storage,
	provider,
	key = defaults.KEY,
	whitelist = defaults.whitelist,
	debounceDelay = defaults.debounceDelay,
	debug = defaults.debug,
	initialValue = defaults.initialValue,
}) => {
	try {
		await rehidrate({ storage, key, initialValue, whitelist, provider, debug });
		const debouncedPersist = debounce(persist({ storage, key, whitelist, debug }), debounceDelay);
		if (provider) {
			provider.addCallback(debouncedPersist);
		} else {
			addCallback(debouncedPersist);
		}
		debug && log('init', { success: true });
	} catch (error) {
		debug && log('init', { error: error.message });
	}
};

export default init;
