using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ReservaRepository : IReserva
    {
        public async Task<Reserva> Alterar(Reserva reserva)
        {
            using (VallerContext _context = new VallerContext())
            {
                _context.Entry(reserva).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return reserva;
        }

        public async Task<Reserva> BuscarPorID(int id)
        {
            using (VallerContext _context = new VallerContext())
            {
                return await _context.Reserva.Select(

                    r => new Reserva()
                    {

                        IdOferta = r.IdOferta,
                        Cronometro = r.Cronometro,
                        IdReserva = r.IdReserva,
                        QuantidadeReserva = r.QuantidadeReserva,
                        StatusReserva = r.StatusReserva,
                        IdUsuario = r.IdUsuario,

                        IdOfertaNavigation = new Oferta()
                        {
                            IdOferta = r.IdOfertaNavigation.IdOferta,
                            IdProduto = r.IdOfertaNavigation.IdProduto,
                            DataOferta = r.IdOfertaNavigation.DataOferta,
                            DataVencimento = r.IdOfertaNavigation.DataVencimento,
                            Imagem = r.IdOfertaNavigation.Imagem,
                            Preco = r.IdOfertaNavigation.Preco,
                            Quantidade = r.IdOfertaNavigation.Quantidade,
                            Titulo = r.IdOfertaNavigation.Titulo,

                            IdProdutoNavigation = new Produto() {
                                IdProduto = r.IdOfertaNavigation.IdProdutoNavigation.IdProduto,
                                IdCategoria = r.IdOfertaNavigation.IdProdutoNavigation.IdCategoria,
                                Descricao = r.IdOfertaNavigation.IdProdutoNavigation.Descricao,
                                IdCategoriaNavigation = r.IdOfertaNavigation.IdProdutoNavigation.IdCategoriaNavigation,
                                IdUsuario = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuario,
                                NomeProduto = r.IdOfertaNavigation.IdProdutoNavigation.NomeProduto,

                                IdUsuarioNavigation = new Usuario() {
                                    IdUsuario = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
                                    NomeRazaoSocial = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial, 
                                }                       
                            } 
                        },
                    

                        IdUsuarioNavigation = new Usuario()
                        {
                            NomeRazaoSocial = r.IdUsuarioNavigation.NomeRazaoSocial,
                            IdUsuario = r.IdUsuarioNavigation.IdUsuario,
                        }
                    }

                ).FirstOrDefaultAsync(r => r.IdReserva == id);
            }
        }

        public async Task<Reserva> Excluir(Reserva reserva)
        {
            using (VallerContext _context = new VallerContext())
            {
                _context.Reserva.Remove(reserva);
                await _context.SaveChangesAsync();
                return reserva;
            }
        }

        public async Task<List<Reserva>> Listar()
        {
            using (VallerContext _context = new VallerContext())
            {
                return await _context.Reserva.Select(
                    r => new Reserva()
                    {
                        IdReserva = r.IdReserva,
                        IdOferta = r.IdOferta,
                        Cronometro = r.Cronometro,
                        QuantidadeReserva = r.QuantidadeReserva,
                        StatusReserva = r.StatusReserva,
                        IdUsuario = r.IdUsuario,

                        IdOfertaNavigation = new Oferta()
                        {
                            IdOferta = r.IdOfertaNavigation.IdOferta,
                            DataOferta = r.IdOfertaNavigation.DataOferta,
                            DataVencimento = r.IdOfertaNavigation.DataVencimento,
                            IdProduto = r.IdOfertaNavigation.IdProduto,
                            Imagem = r.IdOfertaNavigation.Imagem,
                            Preco = r.IdOfertaNavigation.Preco,
                            Quantidade = r.IdOfertaNavigation.Quantidade,
                            Titulo = r.IdOfertaNavigation.Titulo,

                            IdProdutoNavigation = new Produto()
                            {
                                IdProduto = r.IdOfertaNavigation.IdProdutoNavigation.IdProduto,
                                IdCategoria = r.IdOfertaNavigation.IdProdutoNavigation.IdCategoria,
                                IdUsuario = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuario,
                                NomeProduto = r.IdOfertaNavigation.IdProdutoNavigation.NomeProduto,
                                IdCategoriaNavigation = r.IdOfertaNavigation.IdProdutoNavigation.IdCategoriaNavigation,

                                IdUsuarioNavigation = new Usuario()
                                {
                                    IdUsuario = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuarioNavigation.IdUsuario,
                                    NomeRazaoSocial = r.IdOfertaNavigation.IdProdutoNavigation.IdUsuarioNavigation.NomeRazaoSocial,
                                }
                            }
                        }
                    }
                ).ToListAsync();
            }
        }

        public async Task<Reserva> Salvar(Reserva reserva)
        {
            using (VallerContext _context = new VallerContext())
            {
                await _context.AddAsync(reserva);
                await _context.SaveChangesAsync();
                return reserva;
            }
        }
    }

}
