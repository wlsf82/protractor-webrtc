"use strict";

const EC = protractor.ExpectedConditions;
const WebrtcSample = require("./webrtcSample.po");
const DEFAULT_TIMEOUT = 5000;

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
        browser2.wait(EC.visibilityOf(incomingPhotoOnBrowser2), DEFAULT_TIMEOUT);

        expect(incomingPhotoOnBrowser2.isDisplayed()).toBe(true);

        browser2.quit();
    });

    it("should show two incoming photos on browser 2 when browser 1 clicks 'snap and send' twice and they are in the same room", () => {
        const browser2 = browser.forkNewDriverInstance(true);
        const element2 = browser2.element;
        const incomingPhotosOnBrowser2 = element2.all(by.css("#trail canvas"));

        browser2.ignoreSynchronization = true;

        webrtcSample.snapAndSendButton.click();
        webrtcSample.snapAndSendButton.click();
        browser2.wait(EC.visibilityOf(incomingPhotosOnBrowser2.last()), DEFAULT_TIMEOUT);

        expect(incomingPhotosOnBrowser2.count()).toBe(2);

        browser2.quit();
    });

    it("should show incoming photo on browser 2 when browser 1 clicks 'snap' and 'send' and they are in the same room", () => {
        const browser2 = browser.forkNewDriverInstance(true);
        const element2 = browser2.element;
        const incomingPhotoOnBrowser2 = element2(by.css("#trail canvas"));

        browser2.ignoreSynchronization = true;

        webrtcSample.snapButton.click();
        webrtcSample.sendButton.click();
        browser2.wait(EC.visibilityOf(incomingPhotoOnBrowser2), DEFAULT_TIMEOUT);

        expect(incomingPhotoOnBrowser2.isDisplayed()).toBe(true);

        browser2.quit();
    });

    it("should not show incoming photo on browser 2 when browser 1 clicks 'snap and send', but after that, browser 2 refreshes, and they are in the same room", () => {
        const browser2 = browser.forkNewDriverInstance(true);
        const element2 = browser2.element;
        const incomingPhotoOnBrowser2 = element2(by.css("#trail canvas"));

        browser2.ignoreSynchronization = true;

        webrtcSample.snapAndSendButton.click();
        browser2.wait(EC.visibilityOf(incomingPhotoOnBrowser2), DEFAULT_TIMEOUT);
        browser2.refresh();

        expect(incomingPhotoOnBrowser2.isPresent()).not.toBe(true);

        browser2.quit();
    });

    it("should show an alert saying that room is full when a third client tries to join", () => {
        const browser2 = browser.forkNewDriverInstance(true);

        browser2.ignoreSynchronization = true;

        const browser3 = browser.forkNewDriverInstance(true);

        browser3.ignoreSynchronization = true;

        // There is not expectation in this test, but the below step will fail if no alert is displayed.
        browser3.switchTo().alert().accept();

        browser2.quit();
        browser3.quit();
    });
});
