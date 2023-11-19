<?php
    session_start();
    if(isset($_SESSION['id'])) {
        header("Location: Menu.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/login_e_cadastro.css">
    <link rel="stylesheet" href="../css/global.css">
    <title>Tetris</title>
</head>
<body>
    <main>
        <div id="login-sucesso">
            <h3>Login realizado com sucesso!</h3>
            <div id="barra-progresso"></div>
        </div>
        <div class="container container--login">
            <section class="titulo">
                <h1>LOGIN</h1>
                <p>Faça o login para continuar</p>
            </section>
            <form onsubmit="verificar_login(event)" class="formulario formulario--login">
                
                <div id="login-falha">Credenciais inválidas!</div>
                <div class="input-inteiro">
                    <label for="email">Digite o seu e-mail</label>
                    <input type="email" 
                    name="email" 
                    id="email" 
                    placeholder="E-mail" 
                    autocomplete="off" 
                    required>
                </div>
                <div class="input-inteiro">
                    <label for="senha">Digite a sua senha</label>
                    <input type="password" 
                    name="senha" 
                    id="senha" 
                    placeholder="Senha" 
                    autocomplete="off" 
                    required>
                </div>
                
                <button type="submit" class="btn btn-azul">ENTRAR</button>

            </form>
            <div class="cadastrar">
                <p>Não possui uma conta?</p>
                <a href="../html/cadastro.html" class="btn btn-cinza">CADASTRE-SE</a>
            </div>
        </div>
    </main>
    <script src="../js/ajax/login.js"></script>
</body>
</html>