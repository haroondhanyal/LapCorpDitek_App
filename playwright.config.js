const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 30000,
  
  // Expect timeout
  expect: {
    timeout: 5000
  },
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for API requests
    baseURL: process.env.BASE_URL || 'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Ignore SSL errors (for testing environments)
    ignoreHTTPSErrors: true,
    
    // Extra HTTP headers
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  
  // Configure projects for different browsers
  projects: [
    {
      name: 'api-tests',
      use: { 
        ...devices['Desktop Chrome'],
        // API testing doesn't need viewport
        viewport: null
      },
      testMatch: /.*\.spec\.js$/
    }
  ],
  
  // Global setup/teardown
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
  
  // Folder for test artifacts
  outputDir: 'test-results/'
});