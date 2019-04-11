FROM debian:stretch
RUN apt update && apt install mysql-server apache2 git -y
RUN mkdir app
WORKDIR /app
COPY . /app