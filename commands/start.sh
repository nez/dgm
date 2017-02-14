#!/bin/sh
rm -f config/app.js
rm -f config/db.js
rm -rf public/tmp
./commands/replace_env.sh config/app.example.js config/app.js
./commands/replace_env.sh config/db.example.js config/db.js
#node user.js
npm start
