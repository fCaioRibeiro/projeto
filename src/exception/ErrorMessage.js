// Mensagens Client

exports.messageClientNotFound = () => {
    return 'Preencha as infomações de entrega.';
}
// Mensagens Usuário

exports.messageInvalidUser = () => {
    return 'Usuário ou senha inválido(s).'
};

exports.messageLoggedId = () => {
    return 'Usuário já logado.'
};

exports.messageInvalidUserName = () => {
    return 'Insira mais de 7 caracteres no nome.';
};

exports.messageInvalidUserPassword = () => {
    return 'Insira mais de 6 caracteres na senha.';
};

exports.messageInvalidUserUsername = () => {
    return 'Insira mais de 5 caracteres no usuário.';
};

exports.messageIsUniqueUsername = () => {
    return 'Nome de usuário já existente no sistema.';
};

// Mensagens Comandas

exports.messageTableIsEmpty = (table) => {
    return `Mesa obrigatória.`;
};

exports.messageTableIsOpen = (table) => {
    return `A mesa ${table} já está aberta.`;
};

exports.messageEmptyItems = () => {
    return `Insira pelo menos um item na comanda.`;
};

exports.messageInvalidQuantityAndPrice = () => {
    return `Insira uma quantidade ou um preço válido.`;
};

exports.messageInvalidClientName = () => {
    return 'Insira mais de 6 caracteres no nome.';
};

exports.messageInvalidClientStreet = () => {
    return 'Insira mais de 3 caracteres na rua.';
};

exports.messageInvalidClientDistrict = () => {
    return 'Insira mais de 3 caracteres no bairro.';
};

exports.messageInvalidQuantity = () => {
    return 'Insira uma quantidade válida e maior que 0.';
};

exports.messageInvalidNumber = () => {
    return 'Número residencial não pode está vazio.';
};

exports.messageInvalidCellphone = () => {
    return 'Número celular inválido. Formato esperado (00)90000-0000';
};

exports.messageInvalidCep = () => {
    return 'CEP inválido. Formato esperado 00.000-000';
};

exports.messageInvalidPayment = () => {
    return 'Escolha uma forma de pagamento.';
};

exports.messageInvalidIncrease = () => {
    return `Insira uma taxa válida`;
};

exports.messageLinkValidity = (timeStart, timeEnd) => {
    return `Pedidos disponiveis apenas das ${timeStart.toString().replace('.',':')} às ${timeEnd.toString().replace('.',':')} horas.`;
};

// Mensagens Itens

exports.messageInvalidImage = () => {
    return 'O arquivo não é uma imagem.';
};

exports.messageInvalidItemName = () => {
    return 'Insira mais de 3 caracteres no nome do item.';
};

exports.messageIsUniqueItem = () => {
    return 'Item já existente no sistema.';
};

exports.messageInvalidCategory = () => {
    return 'Categoria inválida.';
};

// Mensagens Geral

exports.messageInvalidValue = () => {
    return `Insira um valor válido.`;
};