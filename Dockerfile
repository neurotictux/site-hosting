FROM debian
RUN apt update && apt install mysql-server apache2 git
RUN mkdir app
WORKDIR /app
COPY . /app