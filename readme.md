This is a modified set of tests as seen on on https://hackernoon.com/nodejs-48x-faster-if-you-go-back-to-callbacks

Main modifications are:
1. Reducing file operations to 8000 (otherwise a "too many open files" error shows up on Windows)
2. Making blocking promise version actually block
3. Making the test more like for like by structuring async and promise tests in a way that allows them to run the asserts in parallel with the reads, just like the callback version
4. Minor optimisations (not recreating the readFile options object on every loop, using pre-increment, etc)
5. Added alternative implementations for parallel async/await 

Test machine is:
Windows 11 Pro 22H2 (Insiders)
Intel i7-3770 (4 cores, 8 threads)
32GB DDR3 @ 1600
NodeJS v21.6.1

```
Test                                        Run 1       Run 2       Run 3       Best        Ratio
file-async-blocking.test.mjs                1387.991ms  1392.8448ms 1377.2366ms 1377.2366ms 4.28
file-async-parallel-exclusive.test.mjs      1189.192ms  1143.0924ms 1139.3162ms 1139.3162ms 3.54
file-async-parallel-exclusive-v2.test.mjs   1108.9716ms 1082.2741ms 1103.2121ms 1082.2741ms 3.36
file-async-parallel-hybrid.test.mjs         1091.7428ms 1088.0016ms 1110.343ms  1088.0016ms 3.38
file-async-parallel-hybrid-v2.test.mjs      1184.7224ms 1196.8346ms 1206.3568ms 1184.7224ms 3.68
file-callback-blocking.test.mjs             901.8807ms  944.4984ms  941.9223ms  901.8807ms  2.80
file-callback-parallel.test.mjs             323.7005ms  321.9386ms  332.7479ms  321.9386ms  1.00
file-promise-blocking.test.mjs              1424.9991ms 1494.4541ms 1465.7981ms 1424.9991ms 4.43
file-promise-parallel.test.mjs              1076.4809ms 1089.1139ms 1159.952ms  1076.4809ms 3.34
```