"use strict";

const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

module.exports.config = {
    "directoConnect": true,
    "specs": ["spec.js"],
    "baseUrl": "http://localhost:8080",
    "capabilities": {
        "browserName": "chrome",
        "chromeOptions": {
            "args": [
                "--use-fake-ui-for-media-stream",
                "--use-fake-device-for-media-stream"
            ]
        }
    },
    onPrepare() {
        browser.ignoreSynchronization = true;
        jasmine.getEnv().addReporter(new SpecReporter({
            "displayFailuresSummary": true,
            "displayFailedSpec": true,
            "displaySuiteNumber": true,
            "displaySpecDuration": true
        }));
    },
    "jasmineNodeOpts": {
        "defaultTimeoutInterval": 10000
    }
};
