<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }

    require_once "Conexao.php";
    $conexao = new Conexao();
    $pdo = $conexao->getPdo();
    $query = "SELECT * FROM partida p JOIN jogador j ON p.jogador_id = j.id ORDER BY pontuacao DESC LIMIT 10";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/ranking_global.css">
    <link rel="stylesheet" href="../css/global.css">

    <title>Tetris</title>
</head>

<body>
    <header class="header">
        <a class="btn-voltar" href="../php/Menu.php">VOLTAR</a>
        <div class="titulo">
            <h1>RANKING</h1>
        </div>

    </header>
    <table class="ranking">
        <tr>
            <th>Posição</th>
            <th>Username</th>
            <th>Linhas</th>
            <th>Level</th>
            <th>Tempo</th>
            <th>Pontuação</th>
        </tr>
        <?php
            foreach ($resultados as $posicao => $resultado): ?>
                <tr>
                    <td><?php echo $posicao + 1; ?></td>
                    <td><?php echo $resultado['username']; ?></td>
                    <td><?php echo $resultado['linhas_eliminadas']; ?></td>
                    <td><?php echo $resultado['nivel_dificuldade']; ?></td>
                    <td><?php echo $resultado['tempo_da_partida']; ?></td>
                    <td><?php echo $resultado['pontuacao']; ?></td>
                </tr>   
        <?php endforeach; ?>
    </table>


</body>

</html>