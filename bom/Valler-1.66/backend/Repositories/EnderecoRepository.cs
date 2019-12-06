using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories {
    public class EnderecoRepository : IEndereco {
        public async Task<Endereco> Alterar (Endereco endereco) {
            using (VallerContext _contexto = new VallerContext ()) {
                _contexto.Entry (endereco).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();
            }
            return endereco;
        }

        public async Task<Endereco> BuscarPorID (int id) {
            using (VallerContext _contexto = new VallerContext ()) {

                return await _contexto.Endereco.Select(

                    p => new Endereco() {

                        IdEndereco = p.IdEndereco,
                        Bairro = p.Bairro,
                        Cep = p.Cep,
                        Cidade = p.Cidade,
                        Numero = p.Numero,
                        Rua = p.Rua,
                        Uf = p.Uf,
                        IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                        
                        IdUsuarioNavigation = new Usuario() {
                            IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                            NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                            IdTipoUsuario = p.IdUsuarioNavigation.IdUsuario,
                            Documento = p.IdUsuarioNavigation.Documento,
                            IdTipoUsuarioNavigation = p.IdUsuarioNavigation.IdTipoUsuarioNavigation
                        }

                    }

                ).FirstOrDefaultAsync( p => p.IdEndereco == id);
            }
        }

        public async Task<Endereco> Excluir (Endereco endereco) {
            using (VallerContext _contexto = new VallerContext ()) {
                _contexto.Endereco.Remove (endereco);
                await _contexto.SaveChangesAsync ();
                return endereco;
            }
        }

        public async Task<List<Endereco>> Listar () {
            using (VallerContext _contexto = new VallerContext ()) {

                return await _contexto.Endereco.Select( p => new Endereco() {

                        IdEndereco = p.IdEndereco,
                        IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                        Rua = p.Rua,
                        Numero = p.Numero,
                        Bairro = p.Bairro,
                        Cidade = p.Cidade,
                        Cep = p.Cep,
                        Uf = p.Uf,

                    IdUsuarioNavigation = new Usuario() {
                        IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                        NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                        IdTipoUsuario = p.IdUsuarioNavigation.IdUsuario,
                        Documento = p.IdUsuarioNavigation.Documento,
                        IdTipoUsuarioNavigation = p.IdUsuarioNavigation.IdTipoUsuarioNavigation
                    }    
                    }
                ).ToListAsync();
            }
        }

        public async Task<Endereco> Salvar (Endereco endereco) {
            using (VallerContext _contexto = new VallerContext ()) {
                await _contexto.AddAsync (endereco);
                await _contexto.SaveChangesAsync ();
                return endereco;
            }
        }

        Task<Endereco> IEndereco.BuscarPorID (int id) {
            throw new System.NotImplementedException ();
        }
    }
}