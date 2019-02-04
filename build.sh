npm install

#docker build registry.gitlab.com/circlepoints/site-master .
#docker push registry.gitlab.com/circlepoints/site-master

docker build --tag renatomonteiro/site-master:v6 .
docker push renatomonteiro/site-master:v6