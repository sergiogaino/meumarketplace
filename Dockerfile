FROM nginx:alpine

COPY /devops/nginx.conf /etc/nginx/conf.d/front.conf

WORKDIR /usr/share/nginx/html

COPY dist/circlewebui/ .
#COPY dist-test/ .