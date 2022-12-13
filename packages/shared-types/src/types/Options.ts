type Options = {
	categories: Item[];
	tags: Item[];
	regions: Item[];
	difficulties: Item[];
};

type Item = {
	label: string;
	value: string;
};

export { Options, Item };
