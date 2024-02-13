import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with async parallel (hybrid, v2)', async (t) => {
    const opts = { encoding: 'utf-8'};
    const allFiles = []
    for (let i = 0; i < 8000; i++) {
        allFiles.push(fs.readFile("./text.txt", opts));
    }

    for (const data of await Promise.all(allFiles)) assert.strictEqual(data, 'Hello, world');
});