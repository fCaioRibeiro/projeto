var linkApi = dadosEmpresa.vl.link
var token = JSON.parse( localStorage.getItem('token'))
var usuario = JSON.parse( localStorage.getItem('usuario'))
dadosEmpresa.fetch();

$('#verComanda').load('order.html', function () {
    listaAdicionais.fetch();
    listaBordas.fetch();
    listaComandas.fetch();
    listaCategorias.fetch();
});

$('#verItens').load('itens.html', function () {
    listaItens.fetch();
    listaTamanhos.fetch();
});

function removeAutoComplete() {
    $('input').prop('autocomplete', 'off');
}

if (window.screen.availWidth < 650) {
    $('.respTbl').hide();
}

$( '#v-pills-dashboard-tab' ).click(function () {
    $.ajax({
        url: linkApi+'/user/isadmin',
        type: 'GET',
        headers: {
            'x-access-token': token
        },
        success: function(success) {
            $('#verDashboard').load('dashboard.html', function () {
                domDashBoard(listaComandas.vl)
            });
        },
        error: function (error) {
            Toast.fire({
                icon: 'error',
                title: error.responseJSON.message
            })
        }
    });
});

function carregaDadosEmpresa(empresa) {
    document.querySelector('.nomeEmpresa').innerHTML = `
        <img id="logo" src="../logo/${empresa.name}.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
        ${empresa.name}
    `
    
    document.querySelector('title').innerHTML = `
        ${empresa.name}
    `

    $('#logoTitle').attr('href', `../logo/${empresa.name}.png`)
}

const socket = io(linkApi);
socket.on('orderListUpdate', () => {
    listaComandas.fetch()
});

socket.on('beep', () => {
    beep();
});

socket.on('logoutUsers', (user) => {
    if (user.id == usuario.id) {
        logout();
    }

});

function removeAcento(text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace(new RegExp('[()]','gi'), '');
    text = text.replace(/\s/g, '');
    return text;                 
}