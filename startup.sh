#!/bin/bash

echo Starting server...

# /bin/sh -ec 'cd client && yarn start &'
# /bin/sh -ec 'cd server && yarn devStart'

mprocs 'cd client && yarn start' 'cd server && yarn devStart'