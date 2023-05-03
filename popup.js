const form = document.getElementById("screenshotForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    const formData = new FormData(form);
    const options = {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paperWidth: Number(formData.get("width") || "8.5"),
        paperHeight: Number(formData.get("height") || "11"),
    };

    chrome.debugger.attach({ tabId: tab.id }, "1.3", () =>
        chrome.debugger.sendCommand(
            { tabId: tab.id },
            "Page.printToPDF",
            options,
            (screenshot) => {
                downloadScreenshot(screenshot);
                chrome.debugger.detach({ tabId: tab.id });
            }
        )
    );
});

async function downloadScreenshot(screenshot) {
    const link = document.createElement("a");
    link.download = "screenshot.pdf";
    const blob = await fetch(
        `data:application/pdf;base64,${screenshot.data}`
    ).then((r) => r.blob());
    link.href = window.URL.createObjectURL(blob);
    link.click();
}
