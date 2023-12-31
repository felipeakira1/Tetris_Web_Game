document.addEventListener('DOMContentLoaded', function() {
    const telInput = document.getElementById('telefone');

    telInput.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, ''); 
        let formattedValue = '';

        if (value.length === 11) {
            formattedValue = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length === 10) {
            formattedValue = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length === 9) {
            formattedValue = value.replace(/^(\d{5})(\d{4}).*/, '$1-$2');
        } else if (value.length === 8) {
            formattedValue = value.replace(/^(\d{4})(\d{4}).*/, '$1-$2');
        } else {
            formattedValue = value; 
        }

        event.target.value = formattedValue;
    });
});