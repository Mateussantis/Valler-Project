using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ProdutoRepository : IProduto
    {
        public async Task<Produto> Alterar(Produto produto)
        {
            using (VallerContext _context = new VallerContext())
            {
                _context.Entry(produto).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return produto;
        }

        public async Task<Produto> BuscarPorID(int id)
        {
            using (VallerContext _context = new VallerContext())
            {
                return await _context.Produto.Select(

                    p => new Produto()
                    {

                        IdProduto = p.IdProduto,
                        Descricao = p.Descricao,
                        IdCategoria = p.IdCategoria,
                        IdUsuario = p.IdUsuario,
                        NomeProduto = p.NomeProduto,
                        IdUsuarioNavigation = p.IdUsuarioNavigation,

                        // IdUsuarioNavigation = new Usuario()
                        // {
                        //     IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                        //     NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                        //     Endereco = p.IdUsuarioNavigation.Endereco,
                        //     Telefone = p.IdUsuarioNavigation.Telefone,
                        // },

                        IdCategoriaNavigation = new Categoria() {
                            IdCategoria = p.IdCategoriaNavigation.IdCategoria,
                            Categoria1 = p.IdCategoriaNavigation.Categoria1,
                        }


                    }

                ).FirstOrDefaultAsync(c => c.IdProduto == id);
            }
        }

        public async Task<Produto> Excluir(Produto produto)
        {
            using (VallerContext _context = new VallerContext())
            {
                _context.Produto.Remove(produto);
                await _context.SaveChangesAsync();
                return produto;
            }
        }

        public async Task<List<Produto>> Listar()
        {
            using (VallerContext _context = new VallerContext())
            {
                return await _context.Produto.Select(

                    p => new Produto() {
                        IdProduto = p.IdProduto,
                        IdCategoria = p.IdCategoria,
                        IdUsuario = p.IdUsuario,
                        NomeProduto = p.NomeProduto,
                        Descricao = p.Descricao,
                        IdCategoriaNavigation = p.IdCategoriaNavigation,
                        IdUsuarioNavigation = p.IdUsuarioNavigation,

                        // IdUsuarioNavigation = new Usuario(){
                        //     IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                        //     NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                        //     Telefone = p.IdUsuarioNavigation.Telefone,
                        // }
                    }

                ).ToListAsync();
            }
        }

        public async Task<Produto> Salvar(Produto produto)
        {
            using (VallerContext _context = new VallerContext())
            {
                await _context.AddAsync(produto);
                await _context.SaveChangesAsync();
                return produto;
            }
        }
    }

}