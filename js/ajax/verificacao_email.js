$(document).ready(function() {
    $('#email').on('blur', function() {
        var email = $(this).val();
        verificarEmail(email);
    });

    function verificarEmail(email) {
        $.ajax({
            type: 'POST',
            url: 'verificar_email.php', // Arquivo PHP para verificar o e-mail no banco de dados
            data: { email: email },
            success: function(response) {
                if (response === 'exist') {
                    $('#email').addClass('input-error');
                    $('#email-error').text('Este e-mail já está em uso. Por favor, escolha outro.');
                    $('#email-error').show();
                } else {
                    $('#email').removeClass('input-error');
                    $('#email-error').hide();
                }
            }
        });
    }
});
