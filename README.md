<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# bar commander 

A billing app system

## Prerequisites
- Node.js (v20 or higher)
- pnpm
- Docker & Docker Compose

## Getting Started

1. **Install dependencies**
```bash
pnpm install
```

2. **Rename** ```.env.example``` to ```.env``` and configure environment variables

3. **Start the PostgreSQL database using Docker**
```bash
docker compose up -d
```

4. **Generate the Prisma Client and run migrations to create tables**
```bash
pnpm dlx prisma generate
npx prisma migrate dev
```

5. **Populate the database with initial roles and the admin user** 
```bash
npx prisma db seed
```

6. **Run the App**
```bash
pnpm run start:dev
```