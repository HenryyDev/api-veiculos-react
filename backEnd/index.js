const express = require ('express')
const conexao = require ('./db')
const app = express()
const cors = require('cors');
app.use(cors());




//manipulação de dados
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//view veiculos cadastrados
app.get('/viewall',(req,res)=>{ 
conexao.query('SELECT * FROM veiculos', function view(erro,retorno){
    if (erro) throw erro
    res.send(retorno)
  
})

});

//deletar por id 
app.delete('/remover/:id', function(req,res){
    const id = req.params.id;
    conexao.query(`DELETE FROM veiculos WHERE id = ?`,[id], function (erro,retorno){
        if (erro) throw erro

        res.send(retorno)
    });
});


//editar por id
 app.put('/editar/:id', function(req,res){
    let id=req.params
    let marca=req.body.marca;
    let modelo=req.body.modelo;
    let ano =req.body.ano;
    let prop=req.body.proprietario;
    let cor=req.body.cor;

    const query = `UPDATE veiculos SET marca = ?, modelo = ?, ano = ?, proprietario = ?, cor = ? WHERE id = ?`;
    const values = [marca, modelo, number(ano), prop, cor, id];
    
    conexao.query(query, values, function (erro, retorno) {
        if (erro) throw erro

        console.log(retorno)
        res.send(retorno)
    })
 })

 //view por id
 app.get('/viewid/:id', (req, res) => { //view id
    const { id } = req.params; 
   conexao.query(`SELECT * FROM veiculos WHERE id=${id}`,(err,result)=>{
    res.send(result);
   })
 });

 //buscar por ano 
 app.get('/searchYear', function (req,res){
    let year=req.body.ano
    const query=`SELECT * FROM veiculos WHERE ano=?`;
    const values=[year]
    conexao.query(query,values, function(erro,retorno){
        if (erro) throw erro
        res.send(retorno)
    })
 })


//buscar por cor
 app.get('/searchColor',function(req,res){
    let cor=req.body.cor
    const query=`SELECT * FROM veiculos WHERE cor=?`;
    const values=[cor]
    conexao.query(query,values, function (erro,retorno){
        if (erro) throw erro
        res.send(retorno)
    })
 })

 app.post('/add_car', function (req,res){ //cadastro 
    const values=[
    req.body.marca,
    req.body.modelo,
    req.body.ano,
    req.body.proprietario,
    req.body.cor,
    ]
    

    let sql = ` INSERT INTO veiculos (marca,  modelo, ano, proprietario, cor) VALUES (?)`
    conexao.query(sql, [values], function(erro,retorno){
       //caso ocorra erro
        if(erro) throw erro
        return res.send("veiculo cadastrado")
        

    });

})

app.listen(3030, ()=>{
    console.log(`example app listening on port ${3030}`)
  })

