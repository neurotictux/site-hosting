## Usando imagem Docker
```
docker build -t debian-hosting:1.0 .
```

## Utilizando virtualbox com derivados debian e Postgresql 10
1. Instalar pacotes
```
sudo apt install postgresql-10 apache2 lsof iproute2 openssl git
```
2. Adicionar linha ao arquivo /etc/postgressql/10/main/pg_hba.conf
```
host all all 192.168.56.0/24 md5
```
3. Adicionar linha ao arquivo /etc/postgressql/10/main/postgresql.conf
```
listen_addresses = '*'
```
4. Habilitar módulos do apache
```
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
```

5. Instalar pm2 para gerenciamento das aplicações