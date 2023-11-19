<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }
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
            <th>Nome</th>
            <th>Level</th>
            <th>Tempo</th>
            <th>Pontuação</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Jogador A</td>
            <td>10</td>
            <td>15:45</td>
            <td>5000</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jogador B</td>
            <td>8</td>
            <td>12:30</td>
            <td>4200</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Jogador C</td>
            <td>8</td>
            <td>12:30</td>
            <td>4200</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Jogador D</td>
            <td>8</td>
            <td>12:30</td>
            <td>4200</td>
        </tr>
        <tr class="usuario">
            <td>5</td>
            <td>Voce</td>
            <td>8</td>
            <td>12:30</td>
            <td>4200</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Jogador E</td>
            <td>8</td>
            <td>12:30</td>
            <td>4200</td>
        </tr>
    </table>


</body>

</html>