import slugify from "slugify";
import { DateTime } from "luxon";

export default function (plop) {
	plop.setHelper("slugify", (text) => {
		return slugify(text, { lower: true });
	});

	plop.setHelper("date", () => {
		return DateTime.local().toISODate();
	});

	plop.setGenerator("post", {
		description: "new blog post",
		prompts: [
			{
				type: "input",
				name: "title",
				message: "post title",
			},
		],
		actions: [
			{
				type: "add",
				path: "content/{{slugify title}}.md",
				templateFile: "plop-templates/post.hbs",
			},
		],
	});
}
