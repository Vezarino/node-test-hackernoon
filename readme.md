This is a modified set of tests as seen on on https://hackernoon.com/nodejs-48x-faster-if-you-go-back-to-callbacks

Main modifications are:
1. Reducing file operations to 8000 (otherwise a "too many open files" error shows up on Windows)
2. Making blocking promise version actually block
3. Making the test more like for like by structuring async and promise tests in a way that allows them to run the asserts in parallel with the reads, just like the callback version
4. Minor optimisations (not recreating the readFile options object on every loop, using pre-increment, etc)
5. Added alternative implementations for parallel async/await 

Test machine is:
```
Windows 11 Pro 22H2 (Insiders)
Intel i7-3770 (4 cores, 8 threads)
32GB DDR3 @ 1600
NodeJS v21.6.1
```

```
Test                                        Run 1       Run 2       Run 3       Best        Ratio
file-async-blocking.test.mjs                1372.827ms  1337.1928ms 1339.0852ms 1337.1928ms 4.28
file-async-parallel-exclusive.test.mjs      1100.4154ms 1098.8374ms 1144.1009ms 1098.8374ms 3.52
file-async-parallel-exclusive-v2.test.mjs   1037.0769ms 1090.7613ms 1067.3596ms 1037.0769ms 3.32
file-async-parallel-hybrid.test.mjs         1071.4326ms 1072.9917ms 1087.8352ms 1071.4326ms 3.43
file-async-parallel-hybrid-v2.test.mjs      1200.0863ms 1271.6962ms 1186.3993ms 1186.3993ms 3.80
file-callback-blocking.test.mjs             916.1047ms  868.2095ms  899.8589ms  868.2095ms  2.78
file-callback-parallel.test.mjs             312.2597ms  325.3225ms  323.9227ms  312.2597ms  1.00
file-promise-blocking.test.mjs              1399.8678ms 1377.9905ms 1405.529ms  1377.9905ms 4.41
file-promise-parallel.test.mjs              1077.2802ms 1071.1157ms 1082.8818ms 1071.1157ms 3.43
```