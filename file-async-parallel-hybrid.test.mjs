import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with async parallel (hybrid)', async (t) => {
    const opts = { encoding: 'utf-8'};
    const allFiles = []
    for (let i = 0; i < 8000; i++) {
        allFiles.push(fs.readFile("./text.txt", opts).then(data => assert.strictEqual(data, "Hello, world")));
    }

    await Promise.all(allFiles);
});