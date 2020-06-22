let spawn = require('child_process').spawn;
let plist = require('plist');
let fs = require('fs');

let dataTypes = [
    "SPAudioDataType",
    "SPBluetoothDataType",
    "SPCameraDataType",
    "SPCardReaderDataType",
    "SPDiagnosticsDataType",
    "SPDisplaysDataType",
    "SPHardwareDataType",
    "SPMemoryDataType",
    "SPNetworkDataType",
    "SPPowerDataType",
    "SPNVMeDataType",
    "SPAirPortDataType",
    "SPSerialATADataType",
    "DPDiscBurningDataType"
];

let systemProfiler = spawn('/usr/sbin/system_profiler', ['-xml', ...dataTypes]);
let xmlData = "";
let outputFile = null;

process.argv.forEach((value, index) => {
    if (value === '-o' && (typeof process.argv[index + 1] !== 'undefined')) {
        outputFile = process.argv[index + 1];
    }
});

systemProfiler.stdout.on('data', function (data) {
    xmlData += data.toString();
});

systemProfiler.on('exit', function (code) {
    if (code === 0) {
        if (outputFile !== null) {
            let parsed = JSON.stringify(plist.parse(xmlData), null, 2);
            fs.writeFile(outputFile, parsed, 'utf8', (err) => {
                if (err !== null) console.log(err);
            })
        } else {
            let parsed = JSON.stringify(plist.parse(xmlData));
            console.log(parsed);
        }
    } else {
        console.log("Unable to get plist data");
    }
});
