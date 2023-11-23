<?php
class Conexao {
    private $pdo;

    public function __construct() {
        $DB_HOST = "localhost";
        $DB_NAME = "tetris";
        $DB_USER = "root";
        $DB_PASSWORD = "";

        $dsn = "mysql:host=" . $DB_HOST . ";dbname=" . $DB_NAME;
        try {
            $this->pdo = new PDO($dsn, $DB_USER, $DB_PASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die("Erro na conexão: " . $e->getMessage());
        }
    }

    public function getPdo() {
        return $this->pdo;
    }
}
?>