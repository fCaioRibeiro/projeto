function verificaValidade(ev) {
    if (new Date() >= new Date(ev.expirationData)) {
        sweetValidade(ev)
    }
}

function sweetValidade(ev) {
    if (new Date() < new Date(ev.expirationData)) {
        frase = {
            icon: 'success',
            title: 'Uau...',
            text: 'Você está com a licença em dias!',
        }
    } else {
        frase = {
            icon: 'warning',
            title: 'Eita...',
            text: 'Verifique sua licença!',
        }
    }
    console.log(frase);

    Swal.fire({
        icon: frase.icon,
        title: frase.title,
        text: frase.text,
        footer: `Sua licença está valida para ${new Date(ev.expirationData).toLocaleString('pt-br')}`
    })
}