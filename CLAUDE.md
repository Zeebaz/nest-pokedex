# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Setup

```bash
yarn install
docker-compose up -d   # starts MongoDB on localhost:27017 (user/pass, db: nest-pokemon)
yarn start:dev         # hot-reload dev server on port 3000
```

MongoDB credentials are hardcoded in `src/app.module.ts` — no `.env` file needed for local dev.

## Commands

| Task | Command |
|---|---|
| Dev server (watch) | `yarn start:dev` |
| Build | `yarn build` |
| Tests | `yarn test` |
| Single test file | `yarn test src/pokemon/pokemon.service.spec.ts` |
| E2E tests | `yarn test:e2e` |
| Lint + fix | `yarn lint` |
| Format | `yarn format` |

## Architecture

NestJS 11 REST API backed by MongoDB via Mongoose. All routes are prefixed with `/api/v2` (set in `main.ts`). A static frontend is served from `public/` at the root (`/`).

**Module structure** — one feature module (`PokemonModule`) following the standard NestJS pattern:
- `pokemon.controller.ts` — HTTP layer, routes `POST /pokemon`, `GET /pokemon`, `GET /pokemon/:term`, `PATCH /pokemon/:term`, `DELETE /pokemon/:id`
- `pokemon.service.ts` — business logic, injected Mongoose model
- `entities/pokemon.entity.ts` — Mongoose schema (`name: string` unique, `no: number` unique)
- `dto/create-pokemon.dto.ts` — validated with `class-validator`; `UpdatePokemonDto` extends it via `PartialType`

**Lookup by `:term`** — `findOne` checks `isNaN(+term)` to decide whether to query by `no` (number) or `name` (string). Duplicate detection relies on MongoDB error code `11000`.

**Global `ValidationPipe`** is configured with `whitelist: true` and `forbidNonWhitelisted: true`, so unknown DTO fields are rejected at the controller boundary.

## Adding a new feature module

```bash
nest g module <name>
nest g controller <name> --no-spec
nest g service <name> --no-spec
```

Register the Mongoose schema in the module's `imports` array via `MongooseModule.forFeature([...])`.
