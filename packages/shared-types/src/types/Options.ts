type Options = {
	categories: Category[];
	tags: Tag[];
	regions: Region[];
	difficulties: Difficulty[];
};

type Category = {
	label: string;
	value: string;
};

type Tag = {
	label: string;
	value: string;
};

type Region = {
	label: string;
	value: string;
};

type Difficulty = {
	label: string;
	value: string;
};

export { Options, Category, Tag, Region, Difficulty };
