<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set("display_errors", 1);

include_once("../config/Database.php");
include_once("../model/Bill.php");

$db = new Database();
$connect = $db->connect();
$bill_obj = new Bill($connect);

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $data = json_decode(file_get_contents("php://input"));
    switch ($data->action) {
        case 'GET_ALL_BILL':
            $headers = getallheaders();
            try {
                $jwt = $headers['Authorization'];

                $secret_key = "icetea123";

                $decode_data = JWT::decode(substr($jwt, 7), new Key($secret_key, 'HS256'));

                $bill_data = $bill_obj->get_all_bill();

                if ($bill_data) {
                    http_response_code(200);
                    echo json_encode(array(
                        "status" => 1,
                        "message" => "ok",
                        "data" => $bill_data
                    ));
                } else {
                    http_response_code(404);
                    echo json_encode(array(
                        "status" => 0,
                        "message" => "Failed to delete user"
                    ));
                }
            } catch (Exception $ex) {
                http_response_code(500);
                echo json_encode(array(
                    "status" => 0,
                    "message" => $ex->getMessage()
                ));
            }
            break;
        
        default:
            # code...
            break;
    }
}