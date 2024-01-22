import { Flex, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

declare global {
	interface Window {
		chrome: any;
	}
}

export default function Home() {
	const [filter, setFilter] = useState("");

	useEffect(() => {
		window.chrome.storage.sync
			.get(["data"])
			.then((result: any) => setFilter(result.data));
	}, []);

	return (
		<Flex
			h={200}
			w={200}
			justifyContent="center"
			alignItems="center"
			direction="column"
		>
			<Text fontSize="2xl">Freedns Helper</Text>

			<Flex direction="column" textAlign="center" mt="1rem">
				<Text>Categorization Options</Text>
				<Select
					value={filter}
					onChange={(event) => {
						setFilter(event.target.value);
						window.chrome.storage.sync.set({ data: event.target.value });
						window.chrome.tabs.reload();
					}}
				>
					<option value="lightspeedFilter">Lightspeed Filter</option>
					<option value="lightspeedRocket">Lightspeed Rocket</option>
				</Select>
			</Flex>
		</Flex>
	);
}
