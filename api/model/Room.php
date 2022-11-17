<?php
class Room {
    // define properties
    private $conn;
    public $room_id;
    public $room_hotel_id;
    public $room_image;
    public $room_service;
    public $room_price;
    public $room_size;

    public function __construct($connect)
    {
        $this->conn = $connect;
    }

    public function get_all_room() {
        $user_query = "SELECT * FROM room";
        $user_obj = $this->conn->prepare($user_query);
        if($user_obj->execute()) {
            return $user_obj->fetchAll(PDO::FETCH_ASSOC);
        }
        return array();
    }

    public function create_room() {
        $user_query = "INSERT INTO room (room_hotel_id, room_image, room_service, room_price, room_size) VALUES (:room_hotel_id, :room_image, :room_service, :room_price, :room_size)";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':room_hotel_id', $this->room_hotel_id, PDO::PARAM_STR);
        $user_obj->bindValue(':room_image', $this->room_image, PDO::PARAM_STR);
        $user_obj->bindValue(':room_service', $this->room_service, PDO::PARAM_STR);
        $user_obj->bindValue(':room_price', $this->room_price, PDO::PARAM_STR);
        $user_obj->bindValue(':room_size', $this->room_size, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function update_room() {
        $user_query = "UPDATE room SET room_hotel_id=:room_hotel_id, room_image=:room_image, room_service=:room_service, room_price=:room_price, room_size=:room_size WHERE room_id=:room_id";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':room_hotel_id', $this->room_hotel_id, PDO::PARAM_STR);
        $user_obj->bindValue(':room_image', $this->room_image, PDO::PARAM_STR);
        $user_obj->bindValue(':room_service', $this->room_service, PDO::PARAM_STR);
        $user_obj->bindValue(':room_price', $this->room_price, PDO::PARAM_STR);
        $user_obj->bindValue(':room_size', $this->room_size, PDO::PARAM_STR);
        $user_obj->bindValue(':room_id', $this->room_id, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function delete_room() {
        $user_query = "DELETE FROM room WHERE room_id=:room_id";
        $user_obj = $this->conn->prepare($user_query);
        $user_obj->bindValue(':room_id', $this->room_id, PDO::PARAM_STR);   
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }
}