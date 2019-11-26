USER_NAME=$1
USER_PASSWORD=$2
mkdir /home/$USER_NAME
useradd $USER_NAME -b /home/$USER_NAME -p $(echo $USER_PASSWORD | openssl passwd -1 -stdin)

# CREATE DATABASE app WITH  OWNER = 'app' ENCODING = 'UTF8' LC_COLLATE = 'en_ZA.UTF-8' LC_CTYPE = 'en_ZA.UTF-8' TABLESPACE = pg_default CONNECTION LIMIT = -1