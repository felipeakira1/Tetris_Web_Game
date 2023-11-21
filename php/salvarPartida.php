<?php
session_start();
require_once 'Conexao.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);


// Caso não esteja logado
if (!isset($_SESSION['id'])) {
    header("Location: Acesso_Negado.php");
    exit;
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $jogador_id = $_SESSION['id'];
    $pontuacao = $_POST['pontuacao'];
    $segundos = $_POST['tempoDecorrido'];
    $linhasEliminadas = $_POST['linhasEliminadas'];
    $nivel = $_POST['nivel'];

    $tempoDecorrido = gmdate("H:i:s", $segundos);

    try {
        $conexao = new Conexao();
        $pdo = $conexao->getPdo();
        $query = "INSERT INTO partida (pontuacao, tempo_da_partida, linhas_eliminadas, nivel_dificuldade, jogador_id)
                    VALUES (:pontuacao, :tempo_da_partida, :linhas_eliminadas, :nivel_dificuldade, :jogador_id)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':pontuacao', $pontuacao, PDO::PARAM_INT);
        $stmt->bindParam(':tempo_da_partida', $tempoDecorrido, PDO::PARAM_STR);
        $stmt->bindParam(':linhas_eliminadas', $linhasEliminadas, PDO::PARAM_INT);
        $stmt->bindParam(':nivel_dificuldade', $nivel, PDO::PARAM_INT);            
        $stmt->bindParam(':jogador_id', $jogador_id, PDO::PARAM_INT);
    
        $stmt->execute();
    
        $resposta = array("jogador_id" => "{$jogador_id}", "pontuacao" => "{$pontuacao}", "tempoDecorrido" => "{$tempoDecorrido}", "linhas" => "{$linhasEliminadas}");
        header('Content-Type: application/json');
        echo json_encode($resposta);
    } catch(PDOException $e) {
        echo "Erro na conexão: " . $e->getMessage();
    }
    
}
?>