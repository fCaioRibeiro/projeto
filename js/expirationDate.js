function verificaValidade(empresa) {
    if (new Date(empresa.validationDate) >= new Date()) {
        Swal.fire({
            icon: 'warning',
            title: 'Eita...',
            text: 'Verifiquei que sua licença!',
            footer: `Sua licença está valida para ${empresa.validationDate}`
        })
    }
}