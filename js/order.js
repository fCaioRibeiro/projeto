moment.locale('pt-br');

function imprimirComanda() {
    localStorage.setItem('impCmd', JSON.stringify(comandaPronta))
    $('#modalVisualiza').modal('hide')
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
    },
    buttonsStyling: false
})

function showLista(comandas) {
    const $lista = document.querySelector('#tbodyListaComandas');
    $lista.innerHTML = '';
    let listaComandasFiltrada = filtraComandas(comandas)
    
    if (Array.isArray(listaComandasFiltrada) && listaComandasFiltrada.length > 0) {
        listaComandasFiltrada.forEach((e, ind) => {
            if (e.endDate) {
                e.status = 'Finalizada'
                bg = '#ffc107'
                hide = 'display: none;'
            } else {
                e.status = 'Aberta'
                bg = '#28a745'
                hide = 'display: inline-block;'
            }

            if (e.wasVisualized) {
                hideNot = 'display: none;'
            } else {
                hideNot = 'display: inline-block;'
            }

            $lista.insertAdjacentHTML('beforeend', domListaComandas(e, e._id, bg, hide, hideNot))
        })
    } else {
        $lista.insertAdjacentHTML('beforeend', domListaVazia())
    }
    
    if (window.screen.availWidth < 650) {
        $('.respTbl').hide();
    }
}

function domListaComandas(conteudo, id, bg, hide, hideNot) {
    let { table, status, creationDate, endDate, codigo } = conteudo;
    endDate ? endDate = new Date(endDate).toLocaleString('pt-br') : endDate;
    
    return `
        <li class="list-group-item d-flex align-items-center list-group-item-action px-0" data-toggle="modal" data-target="#modalVisualiza" onclick="domComandaPronta('${ id }')" style="cursor: pointer;">
            <span class="badge badge-pill badge-danger position-absolute" style="top:0px; left:2px; ${ hideNot }">!</span>
            <div class="row w-100 ml-1" style="border-left: solid ${ bg };">
                <div class="col-md-3 col-4">
                    <h6 class="mb-0">${ status }</h6>
                    <small class>Codigo: ${ codigo }</small>
                </div>
                <div class="col-md-3 col-6">
                    <h6 class="mb-0">Mesa/tipo:</h6>
                    <small>${ table }</small>
                </div>
                <div class="col-md-3 col-4">
                    <h6 class="mb-0">Criada:</h6>
                    <small>${ new Date(creationDate).toLocaleString('pt-br') }</small>
                </div>
                <div class="col-md-3 col-6">
                    <h6 class="mb-0">Finalizada:</h6>
                    <small>${ endDate || '--------' }</small>
                </div>
            </div>
        </li>
    `;

}

function domListaVazia() {
    return `<tr><td colspan="6">NÃO EXISTE COMANDA</td></tr>`
}

function domComandaPronta(id) {
    
    comandaPronta = listaComandas.filter(e => e._id == id)[0];

    if (!comandaPronta.wasVisualized) {
        comandaPronta.wasVisualized = true
        $.ajax({
            url: linkApi+'/order/update',
            type: 'PUT',
            headers: {
                'x-access-token': token
            },
            data: comandaPronta,
            success: function(success) {
                listaComandas.fetch();
                socket.emit('orderChange');
            },
            error: function (error) {
                Toast.fire({
                    icon: 'error',
                    title: error.responseJSON.message,
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        });    
    }
    
    const { table, increase, creationDate, client, observation, items, totalValue, orderValue, endDate, user, payment } = listaComandas.filter(e => e._id == id)[0];
    document.querySelector('#dadosItensColl').innerHTML = '';
    document.querySelector('#listaComandaPronta').innerHTML = '';
    items.forEach((item , ind)=> {
        vrTotalAdicional = 0
        if (item.additional.length > 0) {
            item.additional.forEach(el => { 
                vrTotalAdicional += el.price
            });
        }
        if (item.edges) {
            vrTotalAdicional += item.edges.price
        }
        document.querySelector('#listaComandaPronta').innerHTML += `
        <li class="list-group-item d-flex px-0">
        <label class="mb-0">
            ${ item.quantity } - ${ item.half ? item.name +' / '+ item.half : item.name} ${ item.size ? ' - ' + item.size : '' }
            <h6 style="font-size:12px;" class="mb-0">
                Valor unidade: ${ (item.price / item.quantity).toLocaleString('pt-br', {minimumFractionDigits: 2}) }
                Valor total: ${ item.price.toLocaleString('pt-br', {minimumFractionDigits: 2}) }
                ${ item.additional.length > 0 || item.edges ? 'Com adicional':'' }
            </h6>
        </label>
            <button type="button" class="btn btn-outline-danger rounded-pill btn-sm ml-auto btnRemoveItemComandaPronta" onclick="removeItemComandaPronta('${ind}')"><i class="fas fa-eraser"></i></button>
        </li>
        `;

        
        if (item.additional.length > 0 || item.edges || item.observation) {
            document.querySelector('#dadosItensColl').innerHTML += `
            <li class="list-group-item px-0">
                <h6>${ item.quantity } - ${ item.half ? item.name +' / '+ item.half : item.name}</h6>
                ${ item.additional.length > 0 ? `<b style="font-size:13px;">Adicionais:</b><br><small id="adicionaisSmall${ ind }"></small><br>` : ''}
                ${ item.edges ? `<b style="font-size:13px;">Borda:</b><br><small id="bordaSmall${ ind }"></small><br>` : '' }
                ${ item.observation ? `<b style="font-size:13px;">Observação:</b><br><small id="obsSmall${ ind }"></small>` : '' }
            </li>
            `
            item.additional.forEach((el)=> {
                document.querySelector(`#adicionaisSmall${ ind }`).innerHTML += `
                    ${ el.name } ${ el.price.toLocaleString('pt-br', {minimumFractionDigits: 2}) } -  
                `
            });
            
            if (item.edges) {
                document.querySelector(`#bordaSmall${ ind }`).innerHTML += `
                    ${ item.edges.name } ${ item.edges.price.toLocaleString('pt-br', {minimumFractionDigits: 2}) }
                `
            }

            if (item.observation) {
                document.querySelector(`#obsSmall${ ind }`).innerHTML += `
                    ${ item.observation }
                `
            }
        }

        document.querySelector('#quantidadeItemComanda').innerHTML = `${listaComandas.filter(e => e._id == id)[0].items.length} Itens`
    });

    document.querySelector('#dadosComanda').innerHTML = '';
    document.querySelector('#dadosComanda').innerHTML = `
    <div class="col-12 endereco">
        <h6 class="pb-0 mb-0">Dados do cliente</h6>
        <small>
            ${ client.name ? `Cliente: ${ client.name } <br>` : '' }
            ${ client.cellphone ? `Telefone: ${ client.cellphone } <br>` : '' }
            ${ client.district ? `Bairro: ${ client.district }` : '' }
            ${ client.street ? `Rua: ${ client.street }` : '' }
            ${ client.number ? `N°: ${ client.number }` : '' }
        </small>
    </div>
    <div class="col-12 endereco">
        <h6 class="pt-3 mb-0">Forma de pagamento</h6>
        <small>
            ${payment.card ? 'Em cartão <i class="fas fa-check text-success"></i>' : 'Em cartão <i class="fas fa-times text-danger"></i>'}<br>
            ${payment.money ? 'Em dinheiro <i class="fas fa-check text-success"></i>' : 'Em dinheiro <i class="fas fa-times text-danger"></i>'}
        </small>
    </div>
    <div class="col-12 observacao">
        <h6 class="pt-3 mb-0">Observação</h6>
        <small>${observation}</small>
    </div>
    `;
    

    if (table === 'Pedido' || table === 'Entrega' || table === 'Balcão' ) {
        $('.endereco').show()
    } else {
        $('.endereco').hide()
    }

    if (observation) {
        $('.observacao').show()
    } else {
        $('.observacao').hide()
    }

    if (endDate) {
        $('.btnFinaliza').hide()
        $('.btnRemoveItemComandaPronta').hide()
        $('.btnNovoItemComandaPronta').hide()
    } else {
        $('.btnFinaliza').show()
        $('.btnRemoveItemComandaPronta').show()
        $('.btnNovoItemComandaPronta').show()
    }

    document.querySelector('#tituloComanda').innerHTML = '';
    document.querySelector('#tituloComanda').innerHTML = `
        Criada por ${ user.name == 'Clientes' ? 'Via link' : user.name }<br>
        Mesa: ${ table } <br>
        Valor: R$ ${ orderValue.toLocaleString('pt-br', {minimumFractionDigits: 2}) } 
        Taxa: R$ ${ increase.toLocaleString('pt-br', {minimumFractionDigits: 2}) } <br> 
        Valor total: R$ ${ totalValue.toLocaleString('pt-br', {minimumFractionDigits: 2}) }
        <h5 class="mb-0">${ moment(creationDate).format('L') } às ${ moment(creationDate).format('LT') } </h5>
    `;
}

function removeItemComandaPronta(index) {
    swalWithBootstrapButtons.fire({
        title: `Deseja remover ${comandaPronta.items[index].name +' '+ comandaPronta.items[index].half}?`,
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            if (comandaPronta.items.length == 1) {
                Toast.fire({
                    icon: 'error',
                    title: 'A comanda precisa ter no minimo 1 item',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                comandaPronta.items.splice(index, 1);
                let novoValor = 0; 
                comandaPronta.items.forEach(el => {
                    let {price, edges, additional} = el
                    novoValor += parseFloat(price)
                });
                comandaPronta.orderValue = novoValor;
                comandaPronta.totalValue = novoValor + comandaPronta.increase;
                $.ajax({
                    url: linkApi+'/order/update',
                    type: 'PUT',
                    headers: {
                        'x-access-token': token
                    },
                    data: comandaPronta,
                    success: function(success) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Item removido',
                            showConfirmButton: false,
                            timer: 5500
                        })
                        listaComandas.fetch().then(e => {
                            domComandaPronta(comandaPronta._id)
                        });
                        socket.emit('orderChange');
                    },
                    error: function (error) {
                        Toast.fire({
                            icon: 'error',
                            title: error.responseJSON.message,
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }
                });
            }
        }
    })
}

function cancelaComanda() {
    comandaPronta.exclusionDate = new Date();
    comandaPronta.endDate = new Date();

    swalWithBootstrapButtons.fire({
        title: 'Deseja excluir a comanda?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Não excluir',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: linkApi+'/order/delete',
                type: 'DELETE',
                headers: {
                    'x-access-token': token
                },
                data: comandaPronta,
                success: function(success) {
                    listaComandas.fetch().then(e => {
                        Toast.fire({
                            icon: 'success',
                            title: success.message,
                            showConfirmButton: false,
                            timer: 3000
                        })
                        $('#modalVisualiza').modal('hide');
                        socket.emit('orderChange');
                    });
                },
                error: function (error) {
                    Toast.fire({
                        icon: 'error',
                        text: error.responseJSON.message,
                        // text: 'Contate o suporte',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            });
        }
    })
}

function finalizaComanda() {
    comandaPronta.endDate = new Date();

    swalWithBootstrapButtons.fire({
        title: 'Deseja finalizar?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Não finalizar',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: linkApi+'/order/finalize',
                type: 'PUT',
                headers: {
                    'x-access-token': token
                },
                data: comandaPronta,
                success: function(success) {
                    listaComandas.fetch().then(e => {
                        Toast.fire({
                            icon: 'success',
                            title: success.message,
                            showConfirmButton: false,
                            timer: 3000
                        })

                        $('#modalVisualiza').modal('hide');
                        socket.emit('orderChange');
                    });
                },
                error: function (error) {
                    Toast.fire({
                        icon: 'error',
                        text: error.responseJSON.message,
                        // text: 'Contate o suporte',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            });
        }
    })
}

// $('.filtrosAtivo').hide();
// document.querySelector('.filtros').onclick = function () {
//     $('.filtrosAtivo').toggle('fast');
// }

// document.querySelector('.btnFiltrar').onclick = function () {
//     dataFiltro = document.querySelector('input#dataInicioFiltro');
//     dataFiltro = moment(dataFiltro.value).format('L');
//     if (dataFiltro == 'Invalid date') {
//         dataFiltro = ''
//     }
//     statusFiltro = document.querySelector('#statusFiltro');
//     if (statusFiltro.value == 1 && dataFiltro) {
//         showLista(listaComandas.filter(e => !e.endDate && dataFiltro == moment(e.creationDate).format('L')));

//     } else if (statusFiltro.value == 2 && dataFiltro) {
//         showLista(listaComandas.filter(e => e.endDate && dataFiltro == moment(e.creationDate).format('L')));

//     } else if (statusFiltro.value == 1){
//         showLista(listaComandas.filter(e => !e.endDate));

//     } else if (statusFiltro.value == 2){
//         showLista(listaComandas.filter(e => e.endDate));

//     } else if (dataFiltro){
//         showLista(listaComandas.filter(e => dataFiltro == moment(e.creationDate).format('L')));

//     } else {
//         showLista(listaComandas);
//     }

//     $('.filtrosAtivo').toggle('fast');
// }

$('#modalVisualiza').on('show.bs.modal', function () {
    document.querySelector('#principalpronta-tab').click();
});

$('#modalAdiciona').on('show.bs.modal', function () {
    itensComanda = [];
    atualizaDomPedido();
    $('#catalago-tab').click();
    if (atualizaComanda) {
        $('.finalizaBtns').hide();
        $('#usuario-tab').hide();
    } else {
        $('.finalizaBtns').show();
        $('#usuario-tab').show();
    }
});