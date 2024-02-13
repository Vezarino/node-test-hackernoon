import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs";

const opts = { encoding: 'utf-8'};
const read = (i, callback) => {
    fs.readFile("./text.txt", opts, (err, data) => {
        assert.strictEqual(data, "Hello, world");

        if (++i === 8000) {
            return callback()
        }

        read(i, callback)
    })
}

test('reading file 8,000 times with callback blocking', (t, done) => {
    read(0, done)
});