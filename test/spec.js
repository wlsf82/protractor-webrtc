"use strict";

const EC = protractor.ExpectedConditions;
const WebrtcSample = require("./webrtcSample.po");

describe("WebRTC Sample", () => {
    const webrtcSample = new WebrtcSample();

    beforeEach(() => {
        browser.get("");
    });

    it("should show title", () => {
        const title = "WebRTC Sample";

        expect(browser.getTitle()).toEqual(title);
        expect(webrtcSample.title.getText()).toEqual(title);
    });

    it("should show video element and buttons for 'snap', 'send' and 'send and snap'", () => {
        expect(webrtcSample.videoCanvas.isDisplayed()).toBe(true);
        expect(webrtcSample.snapButton.isDisplayed()).toBe(true);
        expect(webrtcSample.sendButton.isDisplayed()).toBe(true);
        expect(webrtcSample.snapAndSendButton.isDisplayed()).toBe(true);
    });

    it("should autoplay video be enabled", () => {
        const isVideoAutoplayEnabled = browser.executeScript("const video = document.getElementById('camera'); return video.autoplay;");

        expect(isVideoAutoplayEnabled).toBe(true);
    });

    it("should show header for incoming photos", () => {
        expect(webrtcSample.incomingPhotosTitle.getText()).toEqual("Incoming photos");
    });

    it("should have the same room name on url and when returning it on console", () => {
        const roomNameFromUrl = webrtcSample.getRoomNameFromUrl();
        const roomNameFromConsole = browser.executeScript("return room;");

        expect(roomNameFromUrl).toEqual(roomNameFromConsole);
    });

    it("should show incoming photo on browser 2 when browser 1 clicks 'snap and send' and they are in the same room", () => {
        const browser2 = browser.forkNewDriverInstance(true);
        const element2 = browser2.element;
        const incomingPhotoOnBrowser2 = element2(by.css("#trail canvas"));

        browser2.ignoreSynchronization = true;

        webrtcSample.snapAndSendButton.click();
        browser2.wait(EC.visibilityOf(incomingPhotoOnBrowser2), 3000);

        expect(incomingPhotoOnBrowser2.isDisplayed()).toBe(true);

        browser2.quit();
    });
});
