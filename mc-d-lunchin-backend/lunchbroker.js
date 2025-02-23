import axios from "axios";
import * as cheerio from "cheerio";

const TARGET_URL = "https://strav.nasejidelna.cz/0341/login";

export async function scrapeLunches() {
	try {
		const { data: html } = await axios.get(TARGET_URL, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
			}
		});

		const $ = cheerio.load(html);
		const days = [];

		// Iterate over each day block on the page.
		$(".jidelnicekDen").each((i, dayElem) => {
			const dayHeader = $(dayElem).find(".jidelnicekTop").text().trim();
			const dateMatch = dayHeader.match(/\d{2}\.\d{2}\.\d{4}/);
			const date = dateMatch ? dateMatch[0] : "Unknown date";

			const lunches = [];

			// Process each lunch container.
			$(dayElem)
				.find(".container")
				.each((j, container) => {
					const hallName = $(container)
						.find(".shrinkedColumn.jidelnicekItem span")
						.text()
						.trim();

					// Only process containers where the dining hall is "Ječná"
					if (hallName.includes("Ječná")) {
						const lunchType = $(container)
							.find(".shrinkedColumn.smallBoldTitle.jidelnicekItem span")
							.text()
							.trim();

						// Clone the details element, then remove sub elements (nutritional info)
						const $lunchDetailsElem = $(container)
							.find(".column.jidelnicekItem")
							.clone();
						$lunchDetailsElem.find("sub").remove();
						const lunchDetails = $lunchDetailsElem.text().trim();

						lunches.push({
							type: lunchType,
							details: lunchDetails
						});
					}
				});

			if (lunches.length > 0) {
				days.push({
					date,
					lunches
				});
			}
		});

		return days;
	} catch (error) {
		console.error("Error fetching or scraping:", error.message);
		throw error;
	}
}