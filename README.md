## Usando imagem Docker
```
docker build -t debian-hosting:1.0 .
```

## Utilizando virtualbox com derivados debian e Postgresql 10
1. Instalar banco de dados
```
sudo apt install postgresql-10
```
2. Adicionar linha ao arquivo /etc/postgressql/10/main/pg_hba.conf
```
host all all 192.168.56.0/24 md5
```
3. Adicionar linha ao arquivo /etc/postgressql/10/main/postgresql.conf
```
listen_addresses = '*'
```