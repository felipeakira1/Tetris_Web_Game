<?php
require_once 'Conexao.php';
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    
    try {
        $conexao = new Conexao();
        $pdo = $conexao->getPdo();
        $query = "SELECT * FROM jogador";
    
        $result = $pdo->query($query);
    
        if($result) {
            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                if($row['email'] == $email) {
                    if(password_verify($senha, $row['senha'])) {
                        $resposta = array("status" => "success");
                        $_SESSION['id'] = $row['id'];
                        break;
                    }
                }
            }
        } else {
            $resposta = array("status" => "error");
        }
        
        header('Content-Type: application/json');
        echo json_encode($resposta);

        $pdo = null;
    } catch(PDOException $e) {
        echo "Erro na conexão: " . $e->getMessage();
    }
}
?>