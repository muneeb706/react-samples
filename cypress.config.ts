import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  component: {
    screenshotOnRunFailure: false,
    video: false,
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: ['**/*.spec.cy.tsx'],
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
