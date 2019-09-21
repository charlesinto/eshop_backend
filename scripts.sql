CREATE TABLE  BASE_USER (userid SERIAL, fullname varchar(100) NOT NULL, email varchar(100) NOT NULL,
    phonenumber varchar(25), hashpassword varchar(100) NOT NULL, datecreated timestamp NOT NULL
);