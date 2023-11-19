<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/controles.css">

    <title>Tetris</title>
</head>

<body>
    <a class="btn-voltar" href="../php/Menu.php">VOLTAR</a>
    <header class="titulo">
        <h1>CONTROLES</h1>
    </header>
    <div class="controls">
        <div class="control">
            <p>Mover para a direita</p>
            <img src="../images/seta.png" alt="Seta-paracima">
        </div>
        <div class="control">
            <p>Mover para a esquerda</p>
            <img src="../images/seta-esquerda.png" alt="Seta-para-cima">
        </div>
        <div class="control">
            <p>Mover para baixo</p>
            <img src="../images/seta-baixo.png" alt="Seta-para-cima">
        </div>
        <div class="control">
            <p>Rotacionar a peça para a direita</p>
            <img src="../images/seta-cima.png" alt="Seta-para-cima">
        </div>
    </div>
</body>

</html>