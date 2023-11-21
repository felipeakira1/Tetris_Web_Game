<?php
// Conexão com o banco de dados
require_once("Conexao.php");
$conexao = new Conexao();
$pdo = $conexao->getPdo();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    
    // Consulta para verificar se o e-mail já está em uso
    $sql = "SELECT COUNT(*) AS count FROM jogador WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['count'] > 0) {
        echo 'exist'; // Se o e-mail existir, retorna 'exist'
    } else {
        echo 'not_exist'; // Se o e-mail não existir, retorna 'not_exist'
    }
}
?>
