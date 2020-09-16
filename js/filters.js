function filtraComandas(comandas) {
    return comandas.filter(el => 
        new Date(el.creationDate) >= new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(0,0,0,0))
    );
}