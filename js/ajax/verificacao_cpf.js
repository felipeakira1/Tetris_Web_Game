$(document).ready(function() {
    $('#cpf').on('blur', function() {
        var cpf = $(this).val();
        verificarCPF(cpf);
    });

    function verificarCPF(cpf) {
        $.ajax({
            type: 'POST',
            url: 'verificar_cpf.php', // Arquivo PHP para verificar o CPF no banco de dados
            data: { cpf: cpf },
            success: function(response) {
                if (response === 'exist') {
                    $('#cpf').addClass('input-error');
                    $('#cpf-error').text('Este CPF já está em uso. Por favor, escolha outro.');
                    $('#cpf-error').show();
                } else {
                    $('#cpf').removeClass('input-error');
                    $('#cpf-error').hide();
                }
            }
        });
    }
});
