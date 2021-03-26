const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json({ limit: '10MB' }));
app.use(cors());

app.post('/screenshot', async (req, res) => {
    const { html, options } = req.body;
    if(options) {
        delete options.path;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle2' });

    const pdfData = await page.pdf(options);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=screenshot.pdf',
        'Content-Length': pdfData.length
    });
    res.end(pdfData);

    await browser.close();
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
