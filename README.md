# WebRTC Sample

This is a sample project using real time communication with WebRTC and it was based on the following codelab: https://codelabs.developers.google.com/codelabs/webrtc-web/#8.

## Pre-requirements

- Node.js v6.x.x+ (https://nodejs.org/)
- Chrome, Firefox or Opera browser (due to WebRTC compatibility)
- Web Server for Chrome (https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

## Installation

After cloning the project, from the root directory where it was downloaded, run the below command to install the dependencies:

`npm i`

## Running the application

For running this application it's necessary to start the Web Server for Chrome choosing the folder where the protractor-course project was downloaded, checking the Automatically show index.html option, and setting the value 8080 for the Enter Port.

With the above server running, , from the root directory again, execute the below command:

`node index.js`

## Running tests

To run the protractor tests, also from the root directory, run the below command:

`npm test`
