# Lo-flo

Lo-flo is a localized flashcard app, run on your client via react and node (using SQLite as database)

## Screenshots
![Gif on how it works](https://i.imgur.com/xifrfrf.gif)
![Gif on search](https://i.imgur.com/8n5I516.gif)
![Gif on themes](https://i.imgur.com/GDb3n6H.gif)

## How To Run

First, install all required dependencies on folders `client` and `server` via `yarn`

Migrate Database
```
~/server
> yarn prisma migrate dev --name init
```

Run Node Server
```
~/server
> yarn devStart
// runs on port 3007
```

Run React
```
~/client
> yarn start
// runs on port 3006
```

### Additional

Pre-populate Database via seed.js
```
~/server
> yarn prisma db seed
```