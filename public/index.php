<?php
require "../bootstrap.php";

use Src\Controller\EmailController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /person
// everything else results in a 404 Not Found
if ($uri[1] !== 'person') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number:
$emailId = null;
if (isset($uri[2])) {
    $emailId = (int) $uri[2];
}

$search = null;
if (isset($uri[3])) {
    $search = (string) $uri[3];
}
$emailFilter = null;
if (isset($uri[4])) {
    $emailFilter = (string) $uri[4];
}
$orderBy = null;
if (isset($uri[5])) {
    $orderBy = (string) $uri[5];
}
$order = null;
if (isset($uri[6])) {
    $order = (string) $uri[6];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// pass the request method and user ID to the EmailController and process the HTTP request:
$controller = new EmailController($dbConnection, $requestMethod, $emailId, $search, $emailFilter, $orderBy, $order);
$controller->processRequest();
