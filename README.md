# [WebJems](https://webjems.com) - Jean's Personal Website

This site is to showcase my experience and contact information.

This site contains the following:

- Docker, Docker Compose
- NextJs
- Tailwind
- Eslint
- Prettier
- Nginx
- SSL
- AWS ECS Fargate
- AWS Application Load Balancer
- Route53 DNS and Domain

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Setup local, run scripts with make:

```bash
make all
```

setup docker, run build and start:

```bash
docker compose build
# afterwards,
docker compose up
```

The server will start a nginx container in port 80 and 443 with a domain of `local.jmprofile.com`

## ECS Fargate Setup

![image](https://user-images.githubusercontent.com/55332150/223022818-6ef820e0-c730-40d7-b2da-1f0c3db0234c.png)

