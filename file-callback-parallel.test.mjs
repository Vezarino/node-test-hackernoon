import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs";

test('reading file 8,000 times with callback parallel', (t, done) => {
    const opts = { encoding: 'utf-8'};
    let count = 0;
    for (let i = 0; i < 8000; i++) {
        fs.readFile("./text.txt", opts, (err, data) => {
            assert.strictEqual(data, "Hello, world");
            count++
            if (count === 8000) {
                done()
            }
        })
    }
});