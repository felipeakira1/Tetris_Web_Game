<?php
    session_start();
    require_once("Conexao.php");
    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }

    $jogador_id = $_SESSION['id'];
    $conexao = new Conexao();
    $pdo = $conexao->getPdo();
    $query = "SELECT * FROM jogador WHERE id = :jogador_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":jogador_id", $jogador_id, PDO::PARAM_INT);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        $nomeAtualizado = $_POST['nome'];
        $telefoneAtualizado = $_POST['telefone'];
        $emailAtualizado = $_POST['email'];

        $query = "UPDATE jogador SET nome_completo = :nome, telefone = :telefone, email = :email WHERE id = :id";
        $updateStmt = $pdo->prepare($query);
        $updateStmt->bindParam(':nome', $nomeAtualizado);
        $updateStmt->bindParam(':telefone', $telefoneAtualizado);
        $updateStmt->bindParam(':email', $emailAtualizado);
        $updateStmt->bindParam(':id', $jogador_id);

        $updateStmt->execute();
        header("Location: Perfil.php");
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
        <div id="div_mensagem">
            <h3  id="titulo-mensagem"></h3>
            <div id="barra-progresso"></div>
        </div>
        <div class="container container--cadastro">
            <section class="titulo">
                <h1>PERFIL</h1> 
                <p>Altere seus dados</p>
            </section>
            <form onsubmit="alterar_perfil(event)" class="formulario formulario--cadastro">
                <label class="input-inteiro"for="nome">
                    Nome completo
                    <input type="text" 
                            name="nome" 
                            id="nome" 
                            placeholder="Digite o seu nome"
                            value = "<?php echo $usuario['nome_completo']; ?>"
                            autocomplete="off" 
                            required>
                </label>
                <div class="dois-inputs">
                    <label class="input-metade">
                        Data de nascimento
                        <input type="date"
                                name="data_nascimento" 
                                id="data_nascimento" 
                                value = "<?php echo $usuario['data_nascimento']; ?>"
                                autocomplete="off"
                                readonly
                                required>
                    </label>
                    <label class="input-metade">
                        Telefone
                        <input type="text" 
                                name="telefone" 
                                id="telefone" 
                                placeholder="Digite o seu telefone"
                                value = "<?php echo $usuario['telefone']; ?>"
                                autocomplete="off" 
                                min-length="15" maxlength='15' 
                                required>
                    </label>
                </div>
                <label class="input-inteiro" for="cpf">
                    CPF
                    <input type="text" 
                            name="cpf" 
                            id="cpf" 
                            placeholder="Digite o seu CPF"
                            value = "<?php echo $usuario['cpf']; ?>"
                            autocomplete="off" 
                            readonly
                            required>
                </label>
                <label class="input-inteiro" for="email">
                    E-mail
                    <input type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Digite o seu e-mail"
                            value = "<?php echo $usuario['email']; ?>"
                            autocomplete="off" 
                            required>
                </label>
                <label class="input-inteiro" for="username">
                    Username
                    <input type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Digite o seu username"
                            value = "<?php echo $usuario['username']; ?>"
                            autocomplete="off" 
                            readonly
                            required>
                </label>
                <a href="../php/AlterarSenha.php" class="btn btn-azul">ALTERAR A SENHA</a>
                
                <button type="submit" class="btn btn-azul">ATUALIZAR DADOS</button>
            </form>
        </div>
    </main>
    <script src="../js/ajax/alterar_perfil.js"></script>
    <script src="../js/ajax/mascaras_alterar_perfil.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</body>
</html>