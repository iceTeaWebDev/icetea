<?php

    class Service {
        private $conn;
        public $service_id;
        public $service_name;
        
        public function __construct($db)
        {  
           $this->conn = $db; 
        }
        
        public function create_service() {
            $user_query = "INSERT INTO service (service_name) VALUES (:service_name)";
    
            $user_obj = $this->conn->prepare($user_query);
    
            $user_obj->bindValue(':service_name', $this->service_name, PDO::PARAM_STR);
            if($user_obj->execute()) {
                return true;
            }
            return false;
        }

        public function update_service() {
            $user_query = "UPDATE service SET service_name=:service_name WHERE service_id=:service_id";
    
            $user_obj = $this->conn->prepare($user_query);
    
            $user_obj->bindValue(':service_name', $this->service_name, PDO::PARAM_STR);
            $user_obj->bindValue(':service_id', $this->service_id, PDO::PARAM_STR);
            if($user_obj->execute()) {
                return true;
            }
            return false;
        }

        public function delete_service() {
            $user_query = "UPDATE hotel SET hotel_service=NULL WHERE hotel_service=:hotel_service;";
            $user_query .= "DELETE FROM service WHERE service_id=:service_id";
            $user_obj = $this->conn->prepare($user_query);
            $user_obj->bindValue(':hotel_service', $this->service_id, PDO::PARAM_STR);   
            $user_obj->bindValue(':service_id', $this->service_id, PDO::PARAM_STR);
            if($user_obj->execute()) {
                return true;
            }
            return false;
        }

        public function get_all_service() {
            $user_query = "SELECT * FROM service";
            $user_obj = $this->conn->prepare($user_query);
            if($user_obj->execute()) {
                return $user_obj->fetchAll(PDO::FETCH_ASSOC);
            }
            return array();
        }
    }