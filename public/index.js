chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "inject") {
		const elements = [
			...document.querySelectorAll(".trd"),
			...document.querySelectorAll(".trl"),
		];

		elements.forEach((tr) => {
			const element = tr.querySelector("td:first-child");

			if (element) {
				const url = element.querySelector("a").textContent;

				fetch(
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
				)
					.then((r) => r.json())
					.then((d) => {
						const category = document.createElement("p");
						category.textContent = `Categorized as: ${d.data.a.archive_info.filter.category}`;
						category.style.margin = "0";
						element.appendChild(category);
					});
			}
		});
	}
});
