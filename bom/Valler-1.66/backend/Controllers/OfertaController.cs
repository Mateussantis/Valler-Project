using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Domains;
using Microsoft.AspNetCore.Authorization;
using backend.Repositories;
using backend.Controllers;
using System;
using Microsoft.AspNetCore.Http;


//para adicionar a árvore de objeto adicionamos uma nova biblioteca JSON
// dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

namespace backend.Controllers
{

    //Definimos nossa roda do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    [Produces("Application/json")]
    // [Authorize]
    public class OfertaController : ControllerBase
    {
        
        // VallerContext _repositorio = new VallerContext();
        OfertaRepository _repositorio = new OfertaRepository();

        // GET: api/Oferta
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get(){

            //Include("") = Adiciona efetivamente a árvore de objetos 
            var oferta = await _repositorio.Listar();

            if (oferta == null){
                return NotFound(new {
                    mensagem = "Nenhuma Oferta foi encontrada!"
                });
            }

            return oferta;
        }

        // GET: api/Oferta/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Oferta>> Get(int id){

            //  FindAsync = procura algo específico no banco 
            var oferta = await _repositorio.BuscarPorID(id);

            if (oferta == null){
                return NotFound(new {
                    mensagem = "Nenhuma Oferta foi encontrada!"
                });
            }

            return oferta;
        }

        // POST api/Oferta
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post([FromForm]Oferta oferta){

            try{
                
                UploadRepository _up = new UploadRepository();
                
                var a = Request.Form.Files[0];
                
                oferta.IdProduto = int.Parse(Request.Form["IdProduto"]); 
                oferta.Titulo = Request.Form["Titulo"];
                oferta.DataOferta = DateTime.Parse(Request.Form["DataOferta"]);
                oferta.DataVencimento = DateTime.Parse((Request.Form["DataVencimento"])); 
                oferta.Preco = float.Parse(Request.Form["Preco"]);
                oferta.Quantidade = int.Parse(Request.Form["Quantidade"]);
                oferta.Imagem = _up.Upload(a);

                // oferta.Imagem = _up.Upload(a);

                await _repositorio.Salvar(oferta);
            }
            catch(DbUpdateConcurrencyException)
            {
                throw;
            }
            return oferta;
        }

        [HttpPut("{id}")]
        [Authorize (Roles = "ADM")]
        public async Task<ActionResult> Put(int id, Oferta oferta){

            //Se o Id do objeto não existir 
            //ele retorna erro 400
            if(id != oferta.IdOferta){   
                return BadRequest(new {
                    mensagem = "Nenhuma Oferta foi encontrada!"
                });
            }

            try{
                await _repositorio.Alterar(oferta);
            }
            catch(DbUpdateConcurrencyException)
            {

                //Verificamos se o objeto inserido realmente existe no banco
                var oferta_valido = await _repositorio.BuscarPorID(id);

                if(oferta_valido == null){
                    return NotFound(new {
                    mensagem = "Nenhuma Oferta foi encontrada!"
                });
                }else{
                    throw;
                }
            }
            // NoContent = retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/evento/id
        // [Authorize (Roles = "ADM")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Oferta>> Delete(int id){

            var oferta = await _repositorio.BuscarPorID(id);

            if(oferta == null){
                return NotFound(new {
                    mensagem = "Nenhuma Oferta foi encontrada!"
                });
            }

            await _repositorio.Excluir(oferta);

            return oferta;
        }

    }
}
