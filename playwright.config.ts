import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,

	// Global test configuration
	use: {
		headless: false, // Set to false to run tests with a visible browser
		browserName: 'chromium', // Specify the browser you want to use (e.g., chromium, firefox, webkit)
	},
	timeout : 5 * 60 * 1000,
};

export default config;
