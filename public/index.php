<?php

require "../bootstrap.php";

use Src\Controller\EmailController;

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Is this a pre-flight request (the request method is OPTIONS)? Then start output buffering.
if ($requestMethod === 'OPTIONS') {
    ob_start();
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers, 
Access-Control-Allow-Methods, Access-Control-Request-Method, Access-Control-Request-Headers");

// If this is a pre-flight request (the request method is OPTIONS)? Then flush the output buffer and exit.
if ($requestMethod === 'OPTIONS') {
    ob_end_flush();
    exit();
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /emails
// everything else results in a 404 Not Found
if ($uri[1] !== 'emails') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$emailId = null;
if (isset($_GET['email_id'])) {
    $emailId = (int) $_GET['email_id'];
}

$search = null;
if (isset($_GET['search'])) {
    $search = (string) $_GET['search'];
}

$emailFilter = null;
if (isset($_GET['email_filter'])) {
    $emailFilter = (string) $_GET['email_filter'];
}

$orderBy = null;
if (isset($_GET['order_by'])) {
    $orderBy = (string) $_GET['order_by'];
}

$order = null;
if (isset($_GET['order'])) {
    $order = (string) $_GET['order'];
}


$requestMethod = $_SERVER["REQUEST_METHOD"];


// pass the request method and params to the EmailController and process the HTTP request:
$controller = new EmailController($dbConnection, $requestMethod, $emailId, $search, $emailFilter, $orderBy, $order);
$controller->processRequest();
