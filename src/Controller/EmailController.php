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

    private $errorMsg;

    private $emailGateway;

    public function __construct($db, $requestMethod, $emailId, $search, $emailFilter, $orderBy, $order)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->emailId = $emailId;

        $this->search = $search;
        $this->emailFilter = $emailFilter;
        $this->orderBy = $orderBy;
        $this->order = $order;

        $this->emailGateway = new EmailGateway($db);
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->emailId) {
                    $response = $this->getEmail($this->emailId);
                } elseif (
                    $this->search
                    || $this->emailFilter
                    || $this->orderBy
                    || $this->order
                ) {
                    $response = $this->getAllEmails(
                        $this->search,
                        $this->emailFilter,
                        $this->orderBy,
                        $this->order
                    );
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

    private function getAllEmails($search, $emailFilter, $orderBy, $order)
    {
        $result = $this->emailGateway->findAll($search, $emailFilter, $orderBy, $order);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getEmail($id)
    {
        $result = $this->emailGateway->find($id);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function groupByEmail()
    {
        $result = $this->emailGateway->group();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createEmailFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), true);
        if (!$this->validateEmail($input)) {
            return $this->unprocessableEntityResponse($this->getErrorMsg());
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

        $emailDomainPattern = '/^\w+@[a-zA-Z_]+?\.[co]{2}$/';
        if (!isset($input['email_name'])) {
            $this->setErrorMsg("Email address is required");
            return false;
        } elseif (!filter_var($input['email_name'], FILTER_VALIDATE_EMAIL)) {
            $this->setErrorMsg("Please provide a valid e-mail address");
            return false;
        } elseif (!$input['is_checked']) {
            $this->setErrorMsg("You must accept the terms and conditions");
            return false;
        } elseif (preg_match($emailDomainPattern, strtolower($input['email_name']))) {
            $this->setErrorMsg("We are not accepting subscriptions from Colombia emails");
            return false;
        }

        return true;
    }

    private function unprocessableEntityResponse($errorMsg)
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode(
            [
                'error' => $errorMsg
            ]
        );
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }

    /**
     * Get the value of errorMsg
     */
    public function getErrorMsg()
    {
        return $this->errorMsg;
    }

    /**
     * Set the value of errorMsg
     *
     * @return self
     */
    public function setErrorMsg($errorMsg)
    {
        $this->errorMsg = $errorMsg;

        return $this;
    }
}
