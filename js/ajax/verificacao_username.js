$(document).ready(function() {
    $('#username').on('blur', function() {
        var username = $(this).val();
        verificarUsername(username);
    });

    function verificarUsername(username) {
        $.ajax({
            type: 'POST',
            url: 'verificar_username.php', // Arquivo PHP para verificar o username no banco de dados
            data: { username: username },
            success: function(response) {
                if (response === 'exist') {
                    $('#username').addClass('input-error');
                    $('#username-error').text('Este nome de usuário já está em uso. Por favor, escolha outro.');
                    $('#username-error').show();
                } else {
                    $('#username').removeClass('input-error');
                    $('#username-error').hide();
                }
            }
        });
    }
});
