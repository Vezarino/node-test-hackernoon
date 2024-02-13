import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with promises blocking', (t, done) => {
    const opts = { encoding: 'utf-8'};
    let promise = Promise.resolve();

    for (let i = 0; i < 8000; ++i) {
        promise = promise.then(() => fs.readFile("./text.txt", opts).then(data => assert.strictEqual(data, "Hello, world")));
    }
    
    promise.then(done);
});