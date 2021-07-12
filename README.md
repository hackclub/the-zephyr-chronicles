# the_zephyr_chronicles.exe

To-do:

- [x] Switch to Postgres + Prisma
- [x] Zephyr Theme (98.css)
- [x] Location System
- [x] Tagging System 
- [x] Progress Bar
- [x] Serving & Storing Files on Zephyr Net
- [x] Meta Fixed
- [x] New Uploading System
- [ ] Add Server Side Caching: https://github.com/rjyo/next-boost
- [ ] Zephyr-ise the flow. IDK what this means yet, but we'll see..

And then do more.

---

Deploy/build

- Start up a psql server
- add a .env & drop in that shit: `DATABASE_URL="postgresql://msw@localhost:5678/mydb?schema=public"` (just an example, don't actually do it)
- `npx prisma migrate dev`
- run script from sam to download user info