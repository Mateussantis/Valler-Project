﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domains
{
    public partial class Oferta
    {
        public Oferta()
        {
            Reserva = new HashSet<Reserva>();
        }

        [Key]
        [Column("id_oferta")]
        public int IdOferta { get; set; }
        [Column("id_produto")]
        public int? IdProduto { get; set; }
        [Column("id_usuario")]
        public int? IdUsuario { get; set; }
        [Required]
        [Column("titulo")]
        [StringLength(255)]
        public string Titulo { get; set; }
        [Column("data_oferta", TypeName = "datetime")]
        public DateTime DataOferta { get; set; }
        [Column("data_vencimento", TypeName = "datetime")]
        public DateTime DataVencimento { get; set; }
        [Column("preco", TypeName = "money")]
        public decimal Preco { get; set; }
        [Column("quantidade")]
        public int Quantidade { get; set; }
        [Required]
        [Column("imagem")]
        [StringLength(255)]
        public string Imagem { get; set; }

        [ForeignKey(nameof(IdProduto))]
        [InverseProperty(nameof(Produto.Oferta))]
        public virtual Produto IdProdutoNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Oferta))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
        [InverseProperty("IdOfertaNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
    }
}
