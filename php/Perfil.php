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
    <link rel="stylesheet" href="../css/login_e_cadastro.css">
    <title>Tetris</title>
</head>
<body>
    <a href="../php/Menu.php" class="btn-voltar">VOLTAR</a>
    <main>
        <div class="container container--cadastro">
            <section class="titulo">
                <h1>PERFIL</h1> 
                <p>Altere seus dados</p>
            </section>
            <form action="../html/menu.html" class="formulario formulario--cadastro">
                <div class="input-inteiro">
                    <label for="nome">Nome completo</label>
                    <input type="text" 
                            name="nome" 
                            id="nome" 
                            placeholder="Digite o seu nome"
                            value="Felipe Akira Nozaki"
                            autocomplete="off" 
                            required>
                </div>
                <div class="dois-inputs">
                    <div class="input-metade">
                        <label for="data-nasc">Data de nascimento</label>
                        <input type="date"
                                name="data-nasc" 
                                id="data-nasc" 
                                autocomplete="off"
                                value="2004-02-09"
                                readonly
                                required>
                    </div>
                    <div class="input-metade">
                        <label for="number">Telefone</label>
                        <input type="text" 
                                name="number" 
                                id="number" 
                                placeholder="Digite o seu telefone"
                                value="(10) 91232-0232"
                                autocomplete="off" 
                                required>
                    </div>
                </div>
                <label class="input-inteiro">
                    CPF
                    <input type="text" 
                            name="cpf" 
                            id="cpf" 
                            placeholder="Digite o seu CPF"
                            value="123.456.789.00"
                            autocomplete="off" 
                            readonly
                            required>
                </label>
                <label class="input-inteiro">
                    E-mail
                    <input type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Digite o seu e-mail"
                            value="felipe@gmail.com"
                            autocomplete="off" 
                            required>
                </label>
                <label class="input-inteiro">
                    Username
                    <input type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Digite o seu username"
                            value="felipeakira_"
                            autocomplete="off" 
                            readonly
                            required>
                </label>
                <div class="dois-inputs">
                    <label class="input-metade">
                        Senha
                        <input type="password" 
                                name="senha" 
                                id="senha" 
                                placeholder="Digite a sua senha"
                                value="123123"
                                autocomplete="off" 
                                required>
                    </label>
                    <label class="input-metade">
                        Confirmar senha
                        <input type="password" 
                                name="confirmar-senha" 
                                id="confirmar-senha" 
                                placeholder="Confirmar senha"
                                value="123123"
                                autocomplete="off" 
                                required>
                    </label>
                </div>
                <button type="submit" class="btn btn-azul">ATUALIZAR DADOS</button>
            </form>
        </div>
    </main>
</body>
</html>