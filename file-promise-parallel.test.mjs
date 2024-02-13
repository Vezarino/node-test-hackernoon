import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with promise parallel', (t, done) => {
    const opts = { encoding: 'utf-8'};
    let allFiles = []

    for (let i = 0; i < 8000; i++) {
        allFiles.push(fs.readFile("./text.txt", opts).then(data => assert.strictEqual(data, "Hello, world")));
    }

    Promise.all(allFiles).then(() => done());
});