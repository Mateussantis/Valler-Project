using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Telefone
    {
        [Key]
        [Column("id_telefone")]
        public int IdTelefone { get; set; }
        [Column("id_usuario")]
        public int? IdUsuario { get; set; }
        [Column("telefone")]
        [StringLength(15)]
        public string Telefone1 { get; set; }

        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Telefone))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
