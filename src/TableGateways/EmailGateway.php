<?php

namespace Src\TableGateways;

class EmailGateway
{
    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll($search, $emailFilter, $orderBy, $order)
    {

        $statement = '
        SELECT 
            e.id,
            e.email_name,
            e.created_at
        FROM 
            emails e
        WHERE 
            e.email_name 
        LIKE 
            \'%' . $search . '%\' 
        AND 
            e.email_name 
        LIKE 
            \'%' . $emailFilter . '%\'
        ORDER BY
            e.' . $orderBy . ' ' . $order . "";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($id)
    {
        $statement = "
            SELECT 
                e.id, e.email_name, e.created_at
            FROM
                emails e
            WHERE e.id = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }


    public function group()
    {

        $statement =
            "SELECT substring_index(email_name, '@', -1) AS 'DOMAIN', count(*) AS 'COUNT'
            FROM     
                emails
            GROUP BY 
                DOMAIN;";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(array $input)
    {
        $statement = "
            INSERT INTO emails 
                (email_name)
            VALUES
                (:email_name);
        ";

        try {
            $statement = $this->db->prepare($statement);
            
            $statement->execute(
                array(
                    'email_name' => $input['email_name'],
                )
            );
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }


    public function delete($id)
    {
        $statement = "
        DELETE 
        FROM 
            emails 
        WHERE 
            id = :id
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('id' => $id));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
