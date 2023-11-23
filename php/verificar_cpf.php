<?php
// Conexão com o banco de dados
require_once("Conexao.php");
$conexao = new Conexao();
$pdo = $conexao->getPdo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cpf = $_POST['cpf'];
    
    // Consulta para verificar se o CPF já está em uso
    $sql = "SELECT COUNT(*) AS count FROM jogador WHERE cpf = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$cpf]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        echo 'exist'; // Se o CPF existir, retorna 'exist'
    } else {
        echo 'not_exist'; // Se o CPF não existir, retorna 'not_exist'
    }
}
?>