<?php

require 'bootstrap.php';

$statement = <<<EOS
    CREATE TABLE IF NOT EXISTS emails (
        id int NOT NULL AUTO_INCREMENT,
        email_name varchar(255) NOT NULL,
        created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY email_name (email_name)
    ) ENGINE=INNODB;
    INSERT INTO emails
        (email_name, lastname, firstparent_id, secondparent_id)
    VALUES
        ('john@gmail.com'),
        ('chris@gmail.com'),
        ('richard@gmail.com'),
        ('lee@hotmail.com'),
        ('alice@hotmail.com'),
        ('christine@icloud.com'),
        ('lisa@icloud.com'),
        ('anna@icloud.com'),
EOS;

try {
    $createTable = $dbConnection->exec($statement);
    echo "Success!\n";
} catch (\PDOException $e) {
    exit($e->getMessage());
}
