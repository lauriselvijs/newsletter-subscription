<?php

namespace Src\Controller;

use Src\TableGateways\EmailGateway;

class EmailController
{

    private $db;
    private $requestMethod;
    private $emailId;
    private $search;
    private $emailFilter;
    private $orderBy;
    private $order;


    private $emailGateway;

    public function __construct($db, $requestMethod, $emailId, $search, $emailFilter, $orderBy, $order)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->emailId = $emailId;

        $this->$search;
        $this->$emailFilter;
        $this->$orderBy;
        $this->$order;

        $this->emailGateway = new EmailGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->emailId) {
                    $response = $this->getUser($this->emailId);
                } else if (
                    $this->$search &&
                    $this->$emailFilter &&
                    $this->$orderBy &&
                    $this->$order
                ) {
                    $response = $this->getAllEmails();
                } else {
                    $response = $this->groupByEmail();
                }
                break;
            case 'POST':
                $response = $this->createEmailFromRequest();
                break;
            case 'DELETE':
                $response = $this->deleteUser($this->emailId);
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function getAllEmails()
    {
        $result = $this->emailGateway->findAll($id, $search, $emailFilter, $orderBy, $order);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getUser($id)
    {
        $result = $this->emailGateway->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createEmailFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateEmail($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->emailGateway->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }


    private function deleteUser($id)
    {
        $result = $this->emailGateway->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $this->emailGateway->delete($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
    }

    private function validateEmail($input)
    {
        if (!isset($input['firstname'])) {
            return false;
        }
        if (!isset($input['lastname'])) {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
