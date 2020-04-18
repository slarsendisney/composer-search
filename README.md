# Test cuke
Simple example showing how to use [cucumber-puppeteer](https://github.com/patheard/cucumber-puppeteer) as a standalone dependency for your tests.
```bash
# Run against your .feature files
npm test
```
# How it works
The way it works is by telling cucumber-js to use the configuration and step definitions from the cucumber-puppeteer project:
```json
# package.json
...
"scripts": {
    "test": "npx cucumber-js --require ./**/features/**/*.js"
}
...
```
# Environment variables
Set environment variables on the command line or with a [`.env`](https://github.com/patheard/test-cuke/blob/master/.env) project.

# Hooks
Add your own custom hooks to [`./features/hooks/hooks.js`](https://github.com/patheard/test-cuke/blob/master/features/hooks/hooks.js).
