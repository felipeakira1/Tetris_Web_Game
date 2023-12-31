<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }
    $jogador_id = $_SESSION['id'];
    require_once("Conexao.php");
    $conexao = new Conexao();
    $pdo = $conexao->getPdo();

    $query = "SELECT * FROM partida  WHERE jogador_id = :jogador_id ORDER BY pontuacao DESC LIMIT 10";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':jogador_id', $jogador_id, PDO::PARAM_INT);
    $stmt->execute();
    $resultados_ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris</title>
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/tabuleiros.css">
    <link rel="stylesheet" href="../css/jogo.css">
</head>

<body>
    <main class="game-container">
        <!-- PAUSAR O JOGO -->
        <button id="btn-pausar" class="btn-pausar">PAUSAR</button>
        <div id="fundo-pausa">
            <section class="conteudo-pausa">
                <h2>PAUSADO</h2>
                <button id="btn-voltar" class="buttonblue">Voltar ao jogo</button>
                <a href="../php/Controles.php"  class="buttonblue">Controles</a>
                <a href="../php/RankingGlobal.php"  class="buttonblue">Ranking global</a>
                <a href="../php/Menu.php" class="buttonred">Sair</a>
            </section>
        </div>
        <div id="fundo-game-over">
            <section class="conteudo-game-over">
                <h2>GAME OVER</h2>
                <section>
                    <h3>PONTUAÇÃO TOTAL</h3>
                    <p class="pontuacao" id="pontuacao-gameover">000000</p>
                </section>
                <section>
                    <h3>TEMPO</h3>
                    <p class="tempo" id="tempo-gameover">00:00:00</p>
                </section>

                <div class="opcoes-game-over">
                    <a href="Menu.php" class="opcao-game-over">
                        <img src="../images/menu.PNG" alt="Image 1">
                        <p>Menu</p>
                    </a>
                    <a href="EscolherTabuleiro.php" class="opcao-game-over">
                        <img src="../images/undo.PNG" alt="Image 2">
                        <p>Reiniciar</p>
                    </a>
                    <a href="RankingGlobal.php" class="opcao-game-over">
                        <img class="images" src="../images/rank.PNG" alt="Image 3">
                        <p>Ranking global</p>
                    </a>
                </div>
            </section>
        </div>
        <img src="../images/logo.png" alt="Logo" class="logo">

        <!-- CONTEUDO -->
        <div class="conteudo">
            <div class="panels">

                <section class="panel">
                    <h2>PONTOS</h2>
                    <div id="score-value">000000</div>
                </section>

                <section class="panel">
                    <h2>TEMPO</h2>
                    <div id="time-value">00:00:00</div>
                </section>

                <section class="panel ranking">
                    <h2>RANKING PESSOAL</h2>                 
                    <table>
                        <thead>
                            <tr>
                                <td>Posição</td>
                                <td>Pontuação</td>
                                <td>Tempo</td>
                                <td>Nivel</td>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            foreach($resultados_ranking as $posicao =>$dados_partida) {
                                echo "<tr>";
                                echo "<td>" . ($posicao + 1) . "</td>";
                                echo "<td>" . $dados_partida['pontuacao'] . "</td>";

                                // Verificar se a chave 'tempo' existe
                                echo "<td>" . $dados_partida['tempo_da_partida'] . "</td>";

                                // Verificar se a chave 'nivel' existe
                                echo "<td>" . $dados_partida['nivel_dificuldade'] . "</td>";

                                echo "</tr>";
                            }
                        ?>  
                        </tbody>
                    </table>
                </section>

            </div>

            <div id="tabuleiro" class="tetris-board2"></div>

            <div class="panels">
                <section class="panel">
                    <h2>PROXIMA</h2>
                    <div id="next-piece-preview"></div>
                </section>

                <section class="panel">
                    <h2>LINHAS</h2>
                    <div id="lines-value"></div>
                </section>

                <section class="panel">
                    <h2>NIVEL</h2>
                    <div id="level-value"></div>
                </section>

                <button id="btn-iniciar" class="iniciar">INICIAR</button>
            </div>
        </div>
    </main>
    <script src="../js/jogo/CONFIGS_GRANDE.js"></script>
    <script src="../js/jogo/cronometro.js"></script>
    <script src="../js/jogo/jogo.js"></script>
    <script src="../js/jogo/linhasCompletas.js"></script>
    <script src="../js/jogo/pecas.js"></script>
    <script src="../js/jogo/script.js"></script>
    <script src="../js/jogo/moverPecas.js"></script>
</body>

</html>