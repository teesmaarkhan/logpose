import puppeteer from "puppeteer";

export const fetchTestCases = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required." });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const data = await page.evaluate(() => {
      const inputs = Array.from(
        document.querySelectorAll(".sample-test .input pre"),
      );
      const outputs = Array.from(
        document.querySelectorAll(".sample-test .output pre"),
      );

      const mappedCases = inputs.map((inputElement, index) => ({
        input: inputElement.innerText.trim(),
        output: outputs[index] ? outputs[index].innerText.trim() : "",
      }));

      const titleEl = document.querySelector(
        ".problem-statement .header .title",
      );
      let cleanTitle = "";

      if (titleEl) {
        cleanTitle = titleEl.innerText
          .trim()
          .replace(/^[A-Z1-9]\d*\.\s*/i, "") 
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, "_")
          .replace(/_+/g, "_");
      }

      return {
        testCases: mappedCases,
        problemName: cleanTitle,
      };
    });

    await browser.close();

    if (data.testCases.length === 0) {
      return res
        .status(404)
        .json({ error: "No test cases found on this page structure." });
    }

    let finalProblemName = data.problemName;
    if (!finalProblemName) {
      try {
        const parts = url.split("/").filter(Boolean);
        const contest = parts[parts.length - 2];
        const index = parts[parts.length - 1];
        finalProblemName = `${contest}${index}`.toLowerCase();
      } catch {
        finalProblemName = "problem";
      }
    }

    return res.json({
      testCases: data.testCases,
      problemName: finalProblemName,
    });
  } catch (error) {
    console.error("Puppeteer Scraper Crash Log:", error);
    return res
      .status(500)
      .json({ error: "Internal server error while scraping page." });
  }
};
