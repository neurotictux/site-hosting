drop database if exists hosting;
create database hosting;
use hosting;
create table user (
  id int primary key auto_increment,
  token varchar(100),
  name varchar(100),
  email varchar(100),
  password varchar(100),
  userAccess varchar(100),
  database_name varchar(100),
  domain varchar(100)
);