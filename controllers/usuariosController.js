import connection from "../config/database.js";
const usuariosController ={
    async criar (req, res){
        try{
            const {nome, email, idade} =req.body;
            const [result] = await connection.execute(
                'INSERT INTO usuarios (nome, email, idade) VALUES (?,?,?)',
                [nome, email, idade]
            );
            return res.status(201).json({
                success: true,
                message: 'Usuario registrado com sucesso!',
                data:{nome, email, idade}
            });
        }catch(error){
            console.log ('Erro ao inserir usuario', error)
            return res.status(500).json({
                success: false,
                message: 'Erro ao inserir o usuario',
                error: error.message
            })
        }
    },
    async listarUsuarios (req, res){
        try{
            const[todosUsuarios] = await connection.execute (
                'SELECT * FROM usuarios'
            );
            return res.status(201).json({
                success: true,
                count: todosUsuarios.length,
                data: todosUsuarios
            })
        }catch (error){
            return res.status(500).json({
                success: false,
                message: "houve um erro ao encontrar usuarios",
                error: error.message
            })

        }
    }
}

export default usuariosController;