# Lo-flo

Lo-flo is a localized flashcard app, run on your client via react and node (using SQLite as database)

## Screenshots
![Gif on how it works](https://i.imgur.com/AljmT2y.gif)
![Gif on search](https://i.imgur.com/DuNJZ4S.gif)
![Gif on themes](https://i.imgur.com/ZC7M3ME.gif)

## How To Run

First, install all required dependencies on folders `client` and `server` via `yarn`

Migrate Database
~/server
```
> yarn prisma migrate dev --name init
```

Run Node Server

`~/server (runs on port 3007)`
```
> yarn devStart

```

Run React

`~/client (runs on port 3000)`
```
> yarn start
```


### Additional

Pre-populate Database via seed.js
```
~/server
> yarn prisma db seed
```