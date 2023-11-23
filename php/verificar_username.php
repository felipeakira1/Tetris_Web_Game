<?php
// Conexão com o banco de dados
require_once("Conexao.php");
$conexao = new Conexao();
$pdo = $conexao->getPdo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    
    // Consulta para verificar se o nome de usuário já está em uso
    $sql = "SELECT COUNT(*) AS count FROM jogador WHERE username = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        echo 'exist'; // Se o nome de usuário existir, retorna 'exist'
    } else {
        echo 'not_exist'; // Se o nome de usuário não existir, retorna 'not_exist'
    }
}
?>