'use strict';

const onboarding = require('..');
const assert = require('assert').strict;

assert.strictEqual(onboarding(), 'Hello from onboarding');
console.info('onboarding tests passed');
