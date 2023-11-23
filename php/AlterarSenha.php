<?php
    session_start();
    require_once("Conexao.php");
    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tetris</title>
    <link rel="stylesheet" href="../css/alterar_senha.css">
    <link rel="stylesheet" href="../css/global.css">
</head>
<body>
    <a href="../php/Perfil.php" class="btn-voltar">VOLTAR</a>
    <main>
        <div id="div_mensagem">
            <h3 id="titulo-mensagem"></h3>
            <div id="barra-progresso"></div>
        </div>
        <section class="titulo">
            <h1>ALTERAR SENHA</h1> 
            <p>Altere sua senha</p>
        </section>
        <form onsubmit="alterar_senha(event)">
            <label class="input-inteiro" id="labelSenhaAtual">
                Senha atual
                <input type="password" 
                            name="senhaAtual" 
                            id="senhaAtual" 
                            placeholder="Digite a sua senha atual"
                            value = ""
                            autocomplete="off" 
                            required>
            </label>
            <div class="dois-inputs" id="labelConfirmarSenha">
                <label class="input-metade">
                    Nova senha
                    <input type="password"
                            name="novaSenha"
                            id="novaSenha"
                            placeholder="Digite a sua nova senha"
                            autocomplete="off"
                            required>
                </label>
                <label class="input-metade">
                    Confirmar senha
                    <input type="password" 
                            name="confirmarSenha" 
                            id="confirmarSenha" 
                            placeholder="Confirmar senha"
                            autocomplete="off" 
                            required>
                </label>
            </div>
            <button type="submit" class="btn">Alterar senha</button>
        </form>
    </main>
    <script src="../js/ajax/alterar_senha.js"></script>
</body>
</html>