"use strict";

class WebrtcSample {
    constructor() {
        this.videoCanvas = element(by.id("videoCanvas"));
        this.snapButton = element(by.id("snap"));
        this.sendButton = element(by.id("send"));
        this.snapAndSendButton = element(by.id("snapAndSend"));
    }

    getRoomNameFromUrl() {
        return browser.getCurrentUrl().then((url) => {
            const roomNameFromUrl = url.replace(/http:\/\/localhost:[0-9]{0,4}\/#/g, "");
            return roomNameFromUrl;
        });
    }
}

module.exports = WebrtcSample;
