<?php
    session_start();
    require_once("Conexao.php");
    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $senhaAtual = $_POST['senhaAtual'];
        $novaSenha = $_POST['novaSenha'];
        $confirmarSenha = $_POST['confirmarSenha'];

        $jogador_id = $_SESSION['id'];

        try {
            $conexao = new Conexao();
            $pdo = $conexao->getPdo();
    
            $query = "SELECT * FROM jogador WHERE id = :jogador_id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":jogador_id", $jogador_id, PDO::PARAM_INT);
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    
            
            if(password_verify($senhaAtual, $usuario['senha'])) {
                if($novaSenha === $confirmarSenha) {
                    $novaSenhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);
    
                    $queryAtualizaSenha = "UPDATE jogador SET senha = :senha WHERE id = :id";
                    $stmtAtualizaSenha = $pdo->prepare($queryAtualizaSenha);
                    $stmtAtualizaSenha->bindParam(':senha', $novaSenhaHash);
                    $stmtAtualizaSenha->bindParam(':id', $jogador_id);
                    $stmtAtualizaSenha->execute();

                    $resposta = array("status" => "success", "message" => "Senha alterada com sucesso!");
                } else {
                    $resposta = array("status" => "success", "message" => "Nova senha e confirmar senha estao diferentes");
                }
            } else {
                $resposta = array("status" => "error", "message" => "Senha atual esta incorreta.");
            }
            
            $pdo = null;
            header('Content-Type: application/json');
            echo json_encode($resposta);
            
        } catch(PDOException $e) {
            echo "Erro na conexão: " . $e->getMessage();
        }
        
    }
?>