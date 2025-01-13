export function loader() {
	return new Response(
		`User-agent: *
Disallow: /login
Disallow: /dashboard
`,
		{
			headers: {
				"content-type": "text/plain",
				"cache-control": "public, max-age=0, must-revalidate",
			},
		},
	);
}
