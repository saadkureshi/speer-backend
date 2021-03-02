Speer Backend Assessment
=========

## Steps to run:

1. Create a `.env` file.
2. Update the .env file with your correct local information.
    DB_HOST=localhost
    DB_USER=labber
    DB_PASS=labber
    DB_NAME=speerbackend
    # Uncomment and set to true for Heroku
    # DB_SSL=true if heroku
    DB_PORT=5432
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
7. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
