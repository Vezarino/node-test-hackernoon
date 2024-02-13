import test from 'node:test';
import assert from 'node:assert';
import fs from "node:fs/promises";

test('reading file 8,000 times with async blocking', async (t) => {
    const opts = { encoding: 'utf-8'};
    for (let i = 0; i < 8000; i++) {
        let data = await fs.readFile("./text.txt", opts)
        assert.strictEqual(data, "Hello, world");
    }
});