<?php

class Hotel {

    private $conn;
    public $hotel_id;
    public $hotel_name;
    public $hotel_rate;
    public $hotel_address;
    public $hotel_image;
    public $hotel_service;
    public $hotel_description;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function get_all_hotel() {
        $user_query = "SELECT * FROM hotel";
        $user_obj = $this->conn->prepare($user_query);
        if($user_obj->execute()) {
            return $user_obj->fetchAll(PDO::FETCH_ASSOC);
        }
        return array();
    }

    public function create_hotel() {
        $user_query = "INSERT INTO hotel (hotel_name, hotel_rate, hotel_address, hotel_image, hotel_service) VALUES (:hotel_name, :hotel_rate, :hotel_address, :hotel_image, :hotel_service)";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':hotel_name', $this->hotel_name, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_rate', $this->hotel_rate, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_address', $this->hotel_address, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_image', $this->hotel_image, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_service', $this->hotel_service, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function update_hotel() {
        $user_query = "UPDATE hotel SET hotel_name=:hotel_name, hotel_rate=:hotel_rate, hotel_address=:hotel_address, hotel_image=:hotel_image, hotel_service=:hotel_service WHERE hotel_id=:hotel_id";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':hotel_name', $this->hotel_name, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_rate', $this->hotel_rate, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_address', $this->hotel_address, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_image', $this->hotel_image, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_service', $this->hotel_service, PDO::PARAM_STR);
        $user_obj->bindValue(':hotel_id', $this->hotel_id, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function delete_hotel() {
        $user_query = "DELETE FROM comment WHERE comment_hotel_id=:comment_hotel_id;";
        $user_query .= "DELETE FROM room WHERE room_hotel_id=:room_hotel_id;";
        $user_query .= "DELETE FROM hotel WHERE hotel_id=:hotel_id";
        $user_obj = $this->conn->prepare($user_query);
        $user_obj->bindValue(':hotel_id', $this->hotel_id, PDO::PARAM_STR);   
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }
}

?>