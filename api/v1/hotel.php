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
include_once("../model/Hotel.php");
include_once("../model/Room.php");
include_once("../model/Room_date.php");

$db = new Database();
$connect = $db->connect();
$hotel_obj = new Hotel($connect);
$room_obj = new Room($connect);
$room_date_obj = new Room_date($connect);

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    if ($data) {
        switch ($data->action) {
            case 'SEARCH_HOTEL':
                $headers = getallheaders();
                $data = $data->data;
                $hotel_obj->hotel_address = $data->address;
                $hotel_data = $hotel_obj->get_hotel_by_address();
                $res = array();
                if ($hotel_data) {
                    foreach ($hotel_data as $hotel) {
                        $room_obj->room_hotel_id = $hotel['hotel_id'];
                        $room_data = $room_obj->get_room_by_hotel();
                        if ($room_data) {
                            foreach ($room_data as $room) {
                                $room_date_obj->room_id = $room['room_id'];
                                $room_date_data = $room_date_obj->get_room_date_by_room();
                                if ($room_date_data) {
                                    foreach ($room_date_data as $room_date) {
                                        if ($data->check_in_date >= $room_date['room_date_end'] || $data->check_out_date <= $room_date['room_date_start']) {
                                            array_push($res, $hotel);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if ($res) {
                    http_response_code(200);
                    echo json_encode(array(
                        "status" => 1,
                        "message" => "user have been created",
                        "data" => $res
                    ));
                }
                break;
            case 'GET_ALL_HOTEL':
                $headers = getallheaders();
                try {
                    $jwt = $headers['Authorization'];

                    $secret_key = "icetea123";

                    $decode_data = JWT::decode(substr($jwt, 7), new Key($secret_key, 'HS256'));

                    $hotel_data = $hotel_obj->get_all_hotel();

                    if ($hotel_data) {
                        http_response_code(200);
                        echo json_encode(array(
                            "status" => 1,
                            "message" => "ok",
                            "data" => $hotel_data
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
            case 'GET_ONE_HOTEL':
                $headers = getallheaders();
                $data = $data->data;
                try {
                    $jwt = $headers['Authorization'];

                    $secret_key = "icetea123";

                    $decode_data = JWT::decode(substr($jwt, 7), new Key($secret_key, 'HS256'));

                    if (!empty($data->hotel_id)) {
                        $hotel_obj->hotel_id = $data->hotel_id;
                        $hotel_data = $hotel_obj->get_one_hotel();
                        if ($hotel_data) {
                            http_response_code(200);
                            echo json_encode(array(
                                "status" => 1,
                                "message" => "ok",
                                "data" => $hotel_data
                            ));
                        }
                    } else {

                    }
                } catch (Exception $ex) {
                    http_response_code(500);
                    echo json_encode(array(
                        "status" => 0,
                        "message" => $ex->getMessage()
                    ));
                }
                break;
            case 'CREATE_HOTEL':

                break;
            default:
                # code...
                break;
        }
    } else {
        if ($_POST['action'] == "CREATE_HOTEL") {

            $target_dir = "../../app/public/images/";
            $target_file = $target_dir . basename($_FILES["hotel_image"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            $error = "";

            $check = getimagesize($_FILES["hotel_image"]["tmp_name"]);
            if ($check !== false) {
                $uploadOk = 1;
            } else {
                $error = "File is not an image.";
                $uploadOk = 0;
            }

            if (file_exists($target_file)) {
                $error = "Sorry, file already exists.";
                $uploadOk = 0;
            }

            if ($_FILES["hotel_image"]["size"] > 500000) {
                $error = "Sorry, your file is too large.";
                $uploadOk = 0;
            }

            if (
                $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                && $imageFileType != "gif"
            ) {
                $error = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }

            if ($uploadOk == 0) {
                http_response_code(500);
                echo json_encode(array(
                    "status" => 0,
                    "message" => $error
                ));
            } else {
                move_uploaded_file($_FILES["hotel_image"]["tmp_name"], $target_file);
                if (!empty($_POST['hotel_name']) && !empty($_POST['hotel_rate']) && !empty($_POST['hotel_address']) && !empty($_POST['hotel_description'])) {
                    $hotel_obj->hotel_name = $_POST['hotel_name'];
                    $hotel_obj->hotel_rate = $_POST['hotel_rate'];
                    $hotel_obj->hotel_image = $_FILES["hotel_image"]["name"];
                    $hotel_obj->hotel_address = $_POST['hotel_address'];
                    $hotel_obj->hotel_description = $_POST['hotel_description'];
                    if ($hotel_obj->create_hotel()) {
                        http_response_code(200);
                        echo json_encode(array(
                            "status" => 1,
                            "message" => "hotel have been created"
                        ));
                    } else {
                        http_response_code(500);
                        echo json_encode(array(
                            "status" => 0,
                            "message" => "Failed to save hotel"
                        ));
                    }
                }
            }
        } else if ($_POST['action'] == "UPDATE_HOTEL") {
        } else {
            http_response_code(503);
            echo json_encode(array(
                "status" => 0,
                "message" => "Access denied"
            ));
        }
    }
} else {
    http_response_code(503);
    echo json_encode(array(
        "status" => 0,
        "message" => "Access denied"
    ));
}
