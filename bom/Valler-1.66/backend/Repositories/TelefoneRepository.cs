using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domains;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.TelefoneRepository {
    public class TelefoneRepository : ITelefone {

        public async Task<Telefone> BuscarPorID (int id) {
            using (VallerContext _contexto = new VallerContext ()) {
                return await _contexto.Telefone.Select(

                    p => new Telefone() {
                        IdTelefone = p.IdTelefone,
                        IdUsuario = p.IdUsuario,
                        Telefone1 = p.Telefone1,

                        IdUsuarioNavigation = new Usuario(){
                            IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                            NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                            Documento = p.IdUsuarioNavigation.Documento
                        }
                    }

                ).FirstOrDefaultAsync(c => c.IdTelefone == id);
            }
        }

        public async Task<Telefone> Salvar (Telefone telefone) {

            using (VallerContext _contexto = new VallerContext ()) {
                try {
                    await _contexto.AddAsync (telefone);

                    await _contexto.SaveChangesAsync ();
                } catch (DbUpdateConcurrencyException) {
                    throw;
                }

                return telefone;
            }
        }

        public async Task<Telefone> Alterar (Telefone telefone) {
            using (VallerContext _context = new VallerContext ()) {
                _context.Entry (telefone).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }

            return telefone;
        }

        public async Task<Telefone> Excluir (Telefone telefone) {
            using (VallerContext _context = new VallerContext ()) {
                _context.Remove (telefone);
                await _context.SaveChangesAsync ();

            }
            return telefone;
        }

        public async Task<List<Telefone>> Listar () {

            using (VallerContext _contexto = new VallerContext ()) {
                return await _contexto.Telefone.Select(

                    p => new Telefone() {
                        IdTelefone = p.IdTelefone,
                        IdUsuario = p.IdUsuario,
                        Telefone1 = p.Telefone1,

                        IdUsuarioNavigation = new Usuario() {
                            IdUsuario = p.IdUsuarioNavigation.IdUsuario,
                            NomeRazaoSocial = p.IdUsuarioNavigation.NomeRazaoSocial,
                            Documento = p.IdUsuarioNavigation.Documento
                        }
                    }

                ).ToListAsync ();

            }

        }
    }
}