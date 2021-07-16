create role dbowner chronicle;
create database chronicle_prod;
alter database chronicle_prod owner dbowner;
grant chronicle_prod to chronicle;