const mysql= require("mysql2")




const conexao=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'api_veiculos'

});

conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('conexao sucessful')
});

module.exports =conexao