# Requirements
You need to have docker installed on system to run development environment.

After docker installation, run :

```bash
docker compose up
```

## Key points of this repo

- Uses clean architecture for backend api
- Frontend uses `Next.js`
- Frontend is Serverside rendered since it is no use run a commerce site without SEO benefits.
- Product pages are statically generated for faster response time and cdn can cache it.
- Static pages are recreated every 10 minutes to ensure data stays up to date.