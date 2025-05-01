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
    },
    async buscarPorId(req, res){
        try{
            const { id } = req.params;
            const [usuario] = await connection.execute(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            )
            if (usuario.length === 0){
                return res.status (404).json({
                    success:false,
                    message: "usuario nao encontrado"
                })
            }

            return res.status(201).json({
                success:true,
                data: usuario [0]
            })
        }catch (error){
            console.error("Erro ao buscar usuario", error)
            return res.status(500).json({
                success: false,
                message: "erro ao buscar usuario",
                error: error.message

            })

        }
    },
    async alterarDados (req, res){
        try{
            const {id} = req.params;
            const {nome, email, idade} = req.body;

            const camposAtualizar = [];
            const valores = []

            if (nome){
                camposAtualizar.push('nome =?'),
                valores.push(nome)
            }
            if (email){
                camposAtualizar.push('email =?'),
                valores.push(email)
            }
            if (idade){
                camposAtualizar.push('idade =?'),
                valores.push(idade)
            }

            valores.push (id)
            const [result] = await  connection.execute(
                `UPDATE usuarios SET ${camposAtualizar.join(', ')} WHERE id = ?`,
                valores
            );

            if (result.affectedRows === 0){
                return res.status(404).json({
                    success: false,
                    message: "usurios nao encontrado"
                })
            }

            return res.status(200).json({
                success: true,
                message: `Usuario ${id}  atualizado com sucesso`,
                registrosAfetados: result.affectedRows
            })

        }catch (error){
            console.error("Erro ao alterar usuario", error)
            return res.status(500).json({
                success: false,
                message: "erro ao alterar usuario",
                error: error.message
            })
        }
    }

}

export default usuariosController;