# sURLY: short URLS R LovelY!
This is a simple URL shortener that I've made in a day
It shortens URLs

## How to run it
Open 2 terminals
First:
```bash
cd ./urly-backend
yarn dev
```
Second:
```bash
cd ./urly-frontend
yarn start
```

## How to use it
1. Paste or type a correct URL (don't forget the protocol!) into the URL field on the main page.
2. Press `Enter` or push a button
3. Behold, a short URL!

## How it's made
I've used some libraries cause I'm familiar with them (React, express, mui).

Other libs I've used for the exact opposite reason: I've never used them and now I've got a chance to try 'em out (better-sqlite3, wouter, use-http)

## Known bugs
use-http does not seem too eager to trigger component redraw when new data arrives.

no validation on URL field, no sanitization, nothing: if you paste something that's not a URL the server will be all to happy to return an HTTP redirect to this address.

it can even be used to push your browser and server into the cycle of endless redirects

## Todo
- Fix known bugs
- Better stats
- Tests tests tests
