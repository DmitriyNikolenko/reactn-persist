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
});
```

# TODO

-   Blacklist
