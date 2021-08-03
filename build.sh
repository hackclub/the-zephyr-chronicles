# Used by the zephyr deploy system
#echo $port
#echo $PORT
#docker-compose build
yarn install
npx prisma generate
yarn build
