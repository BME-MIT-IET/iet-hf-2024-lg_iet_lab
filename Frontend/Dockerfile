# a node-nak ezt a verzióját használjuk és elnevezzük build-nek
FROM node:20.12-alpine AS node_build
# ez a konténerben lévő mappa neve lesz
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# a package és package-lock json fájlok tartalma alapján a függőségeket felinstalláljuk
RUN npm install
# bemásoljuk a mappánkat
COPY . .
# ez megegyezik az ng build paranccsal
RUN npm run build
# nginx webserver stabil verziója
FROM nginx:stable
#RUN apt-get update && apt-get install -y nginx-extras
#RUN apt-get update && apt-get install -y wget tar
#RUN wget https://github.com/openresty/headers-more-nginx-module/archive/v0.33.tar.gz
#RUN tar -zxvf v0.33.tar.gz
#RUN ./configure --add_module=../headers-more-nginx-module-0.33
COPY ./default.conf /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/nginx.conf
#belemásoljuk a node image-ben található lebuildelt fájlokat az nginx mappájába
COPY --from=node_build /app/dist/frontend/ /usr/share/nginx/html
# megnyitjuk a 80-as portot
EXPOSE 8090