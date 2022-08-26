# Chrome PDF Screenshot

This is a tool to take PDF screenshots of HTML pages. Since the page size is fully customizable and there is no header or footer, this works better than Chrome or Firefox's built-in print to PDF functionality for posters and similar content.

## Setup

### Chrome Extension

Follow the instructions on [Getting Started - Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked) to load the extension.

### Node Server

From the `server` directory, run `npm i`. To start the server, run `npm start`.

## Note

Once [this bug in Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=753118) is resolved, the server can be removed and everything can be performed in the extension using the `chrome.debugging` API.
