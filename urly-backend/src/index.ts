import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import config from "config";
import cors from 'cors';

import { insertUrl, getUrl, click } from "./database";
import { read } from "fs";

const app: Express = express();
const port = config.get("app.port");

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', bodyParser.json(), (req: Request, res: Response) => {
  const url = req.body.url;
  const short = insertUrl(url);
  res.send(short);
});

app.get('/:shortUrl/clicks', (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;
  const row = getUrl(shortUrl);
  if (row != null) {
    res.send({ url: row.url, clicks: row.clicks });
  } else {
    res.sendStatus(404);
  }
});

app.get('/:shortUrl', (req: Request, res: Response) => {
  const shortUrl = req.params.shortUrl;
  const row = getUrl(shortUrl);
  if (row != null) {
    click(shortUrl);
    res.redirect(row.url);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
