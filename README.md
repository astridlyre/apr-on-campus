# APR on Campus

A simple [Remix](https://remix.run/docs/en/main)-based application for tracking
incidents. The project also uses TypeScript and Tailwind CSS.

### Env

You need a local `.env` file to begin development. It should look like:

```bash
DATABASE_URL="file:./data.db?connection_limit=1"
SESSION_SECRET=
SEED_USER_EMAIL=
SEED_USER_PASSWORD=
CSRF_SECRET=
HONEYPOT_SEED=
MINIO_ROOT_USER=
MINIO_ROOT_PASSWORD=
IS_LOCAL=true
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USERNAME=
EMAIL_PASSWORD=
```

Most of these are not required to run the application locally for development.
Any of the secrets can be random strings. The seed user and password are used to
setup the database.

### Installation

Install the dependencies:

```bash
npm install
```

### Setup

This command will run any migrations and setup the local database.

```
npm run setup
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Before Making a PR

Make sure you run the linting and typecheck stages. Please also use `prettier`
to format your code, otherwise PRs will be rejected.

```
npm run lint
npm run typecheck
```

## Styling

This project is styled with [Tailwind CSS](https://tailwindcss.com/).

---

Built with ❤️
