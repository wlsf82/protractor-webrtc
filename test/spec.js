"use strict";

const EC = protractor.ExpectedConditions;

describe("WebRTC Sample", () => {
    beforeEach(() => {
        browser.get("http://localhost:8080");
    });

    it("should show video element and buttons for 'snap', 'send' and 'send and snap'", () => {
        expect(element(by.id("videoCanvas")).isDisplayed()).toBe(true);
        expect(element(by.id("snap")).isDisplayed()).toBe(true);
        expect(element(by.id("send")).isDisplayed()).toBe(true);
        expect(element(by.id("snapAndSend")).isDisplayed()).toBe(true);
    });

    it("should autoplay video", () => {
        const isVideoAutoplay = browser.executeScript("const video = document.getElementById('camera'); return video.autoplay;");

        expect(isVideoAutoplay).toBe(true);
    });

    it("should have the same room name on url and on console", () => {
        browser.getCurrentUrl().then((url) => {
            const roomNameFromUrl = url.replace(/http:\/\/localhost:[0-9]{0,4}\/#/g, "");
            const roomNameFromConsole = browser.executeScript("return room;");

            expect(roomNameFromUrl).toEqual(roomNameFromConsole);
        });
    });
});
