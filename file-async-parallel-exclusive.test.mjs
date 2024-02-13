import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with async parallel (exclusive)', async (t) => {
    const opts = { encoding: 'utf-8'};
    const allFiles = []
    for (let i = 0; i < 8000; ++i) {
        allFiles.push((async () => {
            assert.strictEqual(await fs.readFile("./text.txt", opts), "Hello, world")
        })());
    }

    for (const promise of allFiles) await promise;
});