<?php
session_start();
include_once("Conexao.php");

function validatePasswords($password1, $password2) {
    if (strcmp($password1, $password2) !== 0) {
        echo "As senhas não coincidem";
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conexao = new Conexao();
    $pdo = $conexao->getPdo();

    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $data_nasc = filter_input(INPUT_POST, 'data-nasc', FILTER_SANITIZE_STRING);
    $telefone = filter_input(INPUT_POST, 'number', FILTER_SANITIZE_STRING);
    $cpf = filter_input(INPUT_POST, 'cpf', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

    validatePasswords($_POST['senha'], $_POST['confirmar-senha']);

    $sql = "INSERT INTO jogador (nome_completo, data_nascimento, cpf, telefone, email, username, senha)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $data_nasc, $cpf, $telefone, $email, $username, $senha]);

        header('Location: ../php/Login.php');
        exit(); 
    } catch(PDOException $e) {
        echo "Erro ao cadastrar jogador: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/login_e_cadastro.css">
    <title>Tetris</title>
</head>

<body>
    <a href="../php/login.php" class="btn-voltar">VOLTAR</a>
    <main>
        <div class="container container--cadastro">
            <section class="titulo">
                <h1>CADASTRO</h1>
                <p>Crie uma nova conta</p>
            </section>
            <form action="../php/Login.php" method="post" class="formulario formulario--cadastro">
                <div class="input-inteiro">
                    <label for="nome">Nome completo</label>
                    <input type="text" name="nome" id="nome" placeholder="Digite o seu nome" autocomplete="off"
                        required>
                </div>
                <div class="dois-inputs">
                    <div class="input-metade">
                        <label for="data-nasc">Data de nascimento</label>
                        <input type="date" name="data-nasc" id="data-nasc" autocomplete="off" required>
                    </div>
                    <div class="input-metade">
                        <label for="number">Telefone</label>
                        <input type="text" name="number" id="number" placeholder="Digite o seu telefone"
                            autocomplete="off" required>
                    </div>
                </div>
                <label class="input-inteiro">
                    CPF
                    <input type="text" name="cpf" id="cpf" placeholder="Digite o seu CPF" autocomplete="off" required>
                </label>
                <label class="input-inteiro">
                    E-mail
                    <input type="email" name="email" id="email" placeholder="Digite o seu e-mail" autocomplete="off"
                        required>
                </label>
                <label class="input-inteiro">
                    Username
                    <input type="text" name="username" id="username" placeholder="Digite o seu username"
                        autocomplete="off" required>
                </label>
                <div class="dois-inputs">
                    <label class="input-metade">
                        Senha
                        <input type="password" name="senha" id="senha" placeholder="Digite a sua senha"
                            autocomplete="off" required>
                    </label>
                    <label class="input-metade">
                        Confirmar senha
                        <input type="password" name="confirmar-senha" id="confirmar-senha" placeholder="Confirmar senha"
                            autocomplete="off" required>
                    </label>
                </div>
                <button type="submit" class="btn btn-azul">CADASTRAR</button>
            </form>
        </div>
    </main>
</body>

</html>