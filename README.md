# Contents

-   [About](#about)
-   [Project team](#project-team)
-   [Main info](#main-info)
-   [Technology stack](#technology-stack)
-   [Installation](#installation)

# About

Add persist functionality to [reactn](https://github.com/CharlesStover/reactn/) global storage.

# Installation

```bash
yarn add reactn-persist
```

or

```bash
npm install reactn-persist
```

# Usage

## Use pertsist.

```jsx
import initReactnPersist from './reactn-persist';

initReactnPersist({
	// REQUIRED.
	storage: AsyncStorage, // localStorage, sessionStorage or any instance with Storage API interface support.
	// Optional.
	whitelist: [], // List of top-level keys in global, like ['users', 'token']. Default [].
	debug: false, // Enable console.log mode. Default false.
	key: '@reactn', // Key in storage. Default '@reactn'.
	debounceDelay: 1000, // Persist debounce delay. Default 1000ms.
	initialValue: {}, // Object that will be merged with rehydrated global. Default {}.
	provider: ReactNProvider, // ReactN Provider instance (if you want to use Provider).
});
```

## Use pertsisted status value.

```jsx
import { useGlobal } from 'reactn';
import { REHIDRATED_KEY } from './reactn-persist';
const [rehidrated] = useGlobal(REHIDRATED_KEY);
```

# TODO

-   Blacklist

# Changelog

-   1.3.2 - fix a undefined import instead of setGlobal and getGlobal when you are using ReactN without Provider (thanks [@Vladislava9009](https://github.com/Vladislava9009)).
-   1.3.1 - filter persisted data keys which are absent in whitelist (if it exist) during rehydration (thanks [@truongngodang](https://github.com/truongngodang)).
-   1.3.0 - add support for ReactN Providers (thanks [@vjsingh](https://github.com/vjsingh)), update Typescript declarations.
-   1.2.2 - fix Typescript declaration file.
-   1.2.0 - added Typescript declaration file.
-   1.1.0 - added rehydrated status and export rehydrated key name (REHIDRATED_KEY).
-   1.0.0 - release.
