<?php
class Bill {
    // define properties
    private $conn;
    public $bill_id;
    public $bill_user_id;
    public $bill_room_id;
    public $bill_date_start;
    public $bill_date_end;
    public $bill_user_name;
    public $bill_user_tel;
    public $bill_user_email;

    public function __construct($connect)
    {
        $this->conn = $connect;
    }

    public function get_all_bill() {
        $user_query = "SELECT * FROM bill";
        $user_obj = $this->conn->prepare($user_query);
        if($user_obj->execute()) {
            return $user_obj->fetchAll(PDO::FETCH_ASSOC);
        }
        return array();
    }

    public function get_one_room_date() {
        $user_query = "SELECT * FROM room_date WHERE room_date_id=:room_date_id";
        $user_obj = $this->conn->prepare($user_query);
        $user_obj->bindValue(':room_date_id', $this->room_date_id, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return $user_obj->fetch(PDO::FETCH_ASSOC);
        }
        return array();
    }


    public function create_room_date() {
        $user_query = "INSERT INTO room (room_id, room_date_start, room_date_end) VALUES (:room_id, :room_date_start, :room_date_end)";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':room_id', $this->room_id, PDO::PARAM_STR);
        $user_obj->bindValue(':room_date_start', $this->room_date_start, PDO::PARAM_STR);
        $user_obj->bindValue(':room_date_end', $this->room_date_end, PDO::PARAM_STR);

        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function update_room_date() {
        $user_query = "UPDATE room_date SET room_id=:room_id, room_date_start=:room_date_start, room_date_end=:room_date_end WHERE room_date_id=:room_date_id";

        $user_obj = $this->conn->prepare($user_query);

        $user_obj->bindValue(':room_id', $this->room_id, PDO::PARAM_STR);
        $user_obj->bindValue(':room_date_start', $this->room_date_start, PDO::PARAM_STR);
        $user_obj->bindValue(':room_date_end', $this->room_date_end, PDO::PARAM_STR);
        $user_obj->bindValue(':room_date_id', $this->room_date_id, PDO::PARAM_STR);
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }

    public function delete_room_date() {
        $user_query = "DELETE FROM room_date WHERE room_date_id=:room_date_id";
        $user_obj = $this->conn->prepare($user_query);
        $user_obj->bindValue(':room_date_id', $this->room_date_id, PDO::PARAM_STR);   
        if($user_obj->execute()) {
            return true;
        }
        return false;
    }
}