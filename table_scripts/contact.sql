drop table contact_new;

create table contact_new(
     id INT NOT NULL AUTO_INCREMENT,
     firstName VARCHAR(50) NOT NULL,
     lastName VARCHAR(50) NOT NULL,
     email VARCHAR(100) NOT NULL unique,
     address VARCHAR(50) ,
     city VARCHAR(50) ,
     state VARCHAR(50),
     zip VARCHAR(50) ,
     PRIMARY KEY ( id )
  );
  
  