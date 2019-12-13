USER_NAME=$1
USER_PASSWORD=$2
DOMAIN=$3

if [ "$USER_NAME" = "" ] || [ "$USER_PASSWORD" = "" ] || [ "$DOMAIN" = "" ]
then
  echo "Invalid parameters!"
  exit 1
fi

VH_PATH=/etc/apache2/sites-available/$DOMAIN.com.conf

mkdir /home/$USER_NAME
mkdir /var/www/html/$DOMAIN/
echo "<html><head><meta charset='utf-8'></head><body>Olá, $USER_NAME!</body></html>"

useradd $USER_NAME -b /home/$USER_NAME -p $(echo $USER_PASSWORD | openssl passwd -1 -stdin)

echo "<VirtualHost *:80>" > $VH_PATH
echo "  ServerName $DOMAIN.com" >> $VH_PATH
echo "  ServerAlias www.$DOMAIN.com" >> $VH_PATH
echo "  ServerAdmin webmaster@localhost" >> $VH_PATH
echo "  DocumentRoot /var/www/html/$DOMAIN/" >> $VH_PATH
echo "  ErrorLog ${APACHE_LOG_DIR}/error.log" >> $VH_PATH
echo "  CustomLog ${APACHE_LOG_DIR}/access.log combined" >> $VH_PATH
echo "</VirtualHost>" >> $VH_PATH

a2ensite $DOMAIN.com.conf
service apache2 restart