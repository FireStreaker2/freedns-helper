chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request.action === "inject") {
		const elements = [
			...document.querySelectorAll(".trd"),
			...document.querySelectorAll(".trl"),
		];

		const storage = await chrome.storage.sync.get(["data"]);
		const type = storage.data;

		elements.forEach(async (tr) => {
			const element = tr.querySelector("td:first-child");
			if (!element) return;

			const url = element.querySelector("a").textContent;

			if (type === "lightspeedFilter" || type === "lightspeedRocket") {
				const response = await fetch(
					"https://production-archive-proxy-api.lightspeedsystems.com/archiveproxy",
					{
						headers: {
							"x-api-key": "onEkoztnFpTi3VG7XQEq6skQWN3aFm3h",
						},
						body: JSON.stringify({
							query:
								"\nquery getDeviceCategorization($itemA: CustomHostLookupInput!, $itemB: CustomHostLookupInput!){\n  a: custom_HostLookup(item: $itemA) {\n    request {\n      host\n    }\n    cat\n    action\n    source_ip\n    archive_info {\n      filter {\n        category\n        transTime\n        reason\n        isSafetyTable\n        isTLD\n      }\n      rocket {\n        category\n      }\n    }\n  }\n  b: custom_HostLookup(item: $itemB) {\n    request {\n      host\n    }\n    cat\n    action\n    source_ip\n    archive_info {\n      filter {\n        category\n        transTime\n        reason\n      }\n      rocket {\n        category\n      }\n    }\n  }\n}",
							variables: {
								itemA: {
									hostname: url,
									getArchive: true,
								},
								itemB: {
									hostname: url,
									getArchive: true,
								},
							},
						}),
						method: "POST",
					}
				);

				if (!response.ok)
					throw new Error(`Error when fetching: ${response.status}`);

				const data = await response.json();

				const category = document.createElement("p");
				category.textContent = `Categorized as: ${
					type === "lightspeedFilter"
						? data.data.a.archive_info.filter.category
						: data.data.a.archive_info.rocket.category
				}`;
				category.style.margin = "0";
				element.appendChild(category);
			} else {
				throw new Error("Invalid Value!");
			}
		});
	}
});
