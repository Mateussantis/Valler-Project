using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Endereco
    {
        [Key]
        [Column("id_endereco")]
        public int IdEndereco { get; set; }
        [Column("id_usuario")]
        public int? IdUsuario { get; set; }
        [Required]
        [Column("rua")]
        [StringLength(255)]
        public string Rua { get; set; }
        [Required]
        [Column("numero")]
        [StringLength(255)]
        public string Numero { get; set; }
        [Required]
        [Column("bairro")]
        [StringLength(255)]
        public string Bairro { get; set; }
        [Required]
        [Column("cidade")]
        [StringLength(255)]
        public string Cidade { get; set; }
        [Required]
        [Column("uf")]
        [StringLength(255)]
        public string Uf { get; set; }
        [Required]
        [Column("cep")]
        [StringLength(255)]
        public string Cep { get; set; }

        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Endereco))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
