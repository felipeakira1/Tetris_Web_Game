<?php
    session_start();
    require_once("Conexao.php");
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }

    $jogador_id = $_SESSION['id'];

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $nomeAtualizado = $_POST['nome'];
        $telefoneAtualizado = $_POST['telefone'];
        $emailAtualizado = $_POST['email'];

        try {
            $conexao = new Conexao();
            $pdo = $conexao->getPdo();
            $query = "UPDATE jogador SET nome_completo = :nome, telefone = :telefone, email = :email WHERE id = :id";
            $updateStmt = $pdo->prepare($query);
            $updateStmt->bindParam(':nome', $nomeAtualizado);
            $updateStmt->bindParam(':telefone', $telefoneAtualizado);
            $updateStmt->bindParam(':email', $emailAtualizado);
            $updateStmt->bindParam(':id', $jogador_id);
    
            $updateStmt->execute();
            $resposta = array("message" => "Usuario alterado com sucesso!");
            $pdo = null;
            header('Content-Type: application/json');
            echo json_encode($resposta);

        } catch(PDOException $e) {
            echo "Erro na conexão: " . $e->getMessage();
        }
    }
?>
