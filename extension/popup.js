const form = document.getElementById('screenshotForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const formData = new FormData(form);
    const options = {
        printBackground: true
    };
    formData.forEach((value, key) => options[key] = value);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: screenshot
    }, ([htmlData]) => downloadScreenshot(htmlData.result, options));
});

function screenshot() {
    const base = document.createElement('base');
    base.href = window.location.origin;
    const head = document.getElementsByTagName('head')[0];
    head.insertBefore(base, head.firstChild);
    // ensure input values are saved
    for(const input of document.getElementsByTagName('input')) {
        input.setAttribute('value', input.value);
    }
    // prevent scripts from messing with the content of the page, since we want it as-is
    for(const script of document.getElementsByTagName('script')) {
        script.remove();
    }
    return new XMLSerializer().serializeToString(document);
}

async function downloadScreenshot(html, options) {
    const response = await fetch('http://localhost:3000/screenshot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ html, options })
    });
    const blob = await response.blob();
    const link = document.createElement('a');
    link.download = 'screenshot.pdf';
    link.href = window.URL.createObjectURL(blob);
    link.click();
}
