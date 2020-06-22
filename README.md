# macOS: System Profiler to JSON
Converts the output of `system_profiler` to JSON

## Usage

```shell script
$ system_profiler_json [-o output.json]
```

Calling `system_profiler_json` without an output file specified will print the JSON in stdout

## Building

If you installed the `pkg` dependency from the `dev-dependencies` then you should be able to run:
```shell script
$ npm run build
```

The resulting binary is in `build/`
