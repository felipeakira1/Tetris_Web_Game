<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/escolher_tabuleiro.css">
    <title>Tetris</title>
</head>
<body>
    <a href="../php/Menu.php" class="btn-voltar">VOLTAR</a>
    <div class="escolher-tabuleiro">
        <header>
            <h1>ESCOLHA O SEU TABULEIRO</h1>
        </header>
        <main class="tabuleiros">
            <div class="tabuleiro">
                <img src="../images/tabuleiro_pequeno.png" alt="">
                <p>Tabuleiro pequeno (10x20)</p>
                <a href="../php/TabuleiroPequeno.php" class="btn-escolher">ESCOLHER</a>
            </div>
            <div class="tabuleiro">
                <img src="../images/tabuleiro_grande.png" alt="">
                <p>Tabuleiro grande (22x44)</p>
                <a href="../php/TabuleiroGrande.php" class="btn-escolher">ESCOLHER</a>
            </div>
        </main>
    </div>
</body>
</html>