<?php
session_start();

// Caso não esteja logado
if (!isset($_SESSION['id'])) {
    header("Location: Acesso_Negado.php");
    exit;
}

// Verifique se a pontuação e o tempo foram recebidos por POST
if (isset($_POST['pontuacao']) && isset($_POST['tempo'])) {
    $pontuacao = $_POST['pontuacao'];
    $tempo = $_POST['tempo'];

    // Conecte-se ao banco de dados
    $DB_HOST = "localhost";
    $DB_USER = "root";
    $DB_PASSWORD = "";
    $DB_NAME = "Tetris";

    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Obtém o ID do usuário da sessão
    $usuario_id = $_SESSION['id'];

    // Escape para evitar SQL Injection
    $pontuacao = $conn->real_escape_string($pontuacao);
    $tempo = $conn->real_escape_string($tempo);

    // Insira os dados da partida no banco de dados
    $sql = "INSERT INTO partida (usuario_id, pontuacao, tempo) VALUES ('$usuario_id', '$pontuacao', '$tempo')";

    if ($conn->query($sql) === TRUE) {
        // Dados da partida salvos com sucesso, agora redirecione para a tela de Game Over com os parâmetros
        header("Location: telaGAMEOVER.php?pontuacao=$pontuacao&tempo=$tempo");
    } else {
        echo "Erro ao salvar os dados da partida: " . $conn->error;
    }

    // Fecha a conexão
    $conn->close();
} else {
    echo "Erro: Pontuação e tempo não recebidos.";
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<title>Tela game over</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap">
<link rel="stylesheet" type="text/css" href="../css/telaGAMEOVER.css">

<body>

    <div class="screen">
        <h1 class="screen">GAME OVER</h1>

        <p>PONTUAÇÃO TOTAL</p>
        <p class="points_time"><?php echo $pontuacao; ?></p>
        <p>TEMPO</p>
        <p class="points_time"><?php echo $tempo; ?></p>

        <table>
            <tr>
                <td><a href="Menu.php"><img class="images" src="../images/menu.PNG" alt="Image 1"></a></td>
                <td><a href="EscolherTabuleiro.php"><img class="images" src="../images/undo.PNG" alt="Image 2"></a></td>
                <td><a href="RankingGlobal.php"><img class="images" src="../images/rank.PNG" alt="Image 3"></a></td>
            </tr>
            <tr>
                <td>Menu</td>
                <td>Reiniciar</td>
                <td>Ranking</td>
            </tr>
        </table>
    </div>

</body>

</html>
