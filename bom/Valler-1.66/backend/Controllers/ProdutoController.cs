using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Domains;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        // GufosContext _contexto = new GufosContext();

        ProdutoRepository _repositorio = new ProdutoRepository();

        // GET : api/Categoria
        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get(){

            var produto = await _repositorio.Listar();

            if(produto == null){
                return NotFound(new {
                    mensagem = "Nenhum Produto foi encontrado!"
                });
            }

            return produto;

        }

        // GET : api/Categoria2
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> Get(int id){

            // FindAsync = procura algo específico no banco
            var produto = await _repositorio.BuscarPorID(id);

            if (produto == null){
                return NotFound(new {
                    mensagem = "Nenhum Produto foi encontrado!"
                });
            }

            return produto;

        }

        // POST api/Categoria
        [HttpPost]
        public async Task<ActionResult<Produto>> Post(Produto produto){

            try
            {
                await _repositorio.Salvar(produto);
            }
            catch (DbUpdateConcurrencyException)
            {
                
                throw;
            }

            return produto;
        }

        [HttpPut("{id}")]
        // [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put(int id, Produto produto){
            // Se o id do objeto não existir, ele retorna erro 400
            if(id != produto.IdProduto){
                return BadRequest(new {
                    mensagem = "Nenhum Produto foi encontrado!"
                });
            }
            
            try
            {

                await _repositorio.Alterar(produto);
            }
            catch (DbUpdateConcurrencyException)
            {
                // Verificamos se o objeto inserido realmente existe no banco
                var produto_valido = await _repositorio.BuscarPorID(id);

                if(produto_valido == null){
                    return NotFound(new {
                    mensagem = "Nenhum Produto foi encontrado!"
                });
                }else{

                throw;
                }

                
            }
            // NoContent = retorna 204, sem nada
            return NoContent();
        }

        // DELETE api/categoria/id
        // [Authorize (Roles = "ADM")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produto>> Delete(int id){
            var produto = await _repositorio.BuscarPorID(id);
            if(produto == null){
                return NotFound(new {
                    mensagem = "Nenhum Produto foi encontrado!"
                });
            }
            await _repositorio.Excluir(produto);
            
            return produto;
        }
    }
}