USER_NAME=$1
DOMAIN=$2

if [ "$USER_NAME" = "" ] || [ "$DOMAIN" = "" ]
then
  echo "Invalid parameters!"
  exit 1
fi

rm -rf /home/$USER_NAME
deluser $USER_NAME
a2dissite $DOMAIN.com.conf
rm /etc/apache2/sites-available/$DOMAIN.com.conf
rm -rf /var/www/html/$DOMAIN
service apache2 restart