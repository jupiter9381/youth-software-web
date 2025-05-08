using System.ComponentModel.DataAnnotations.Schema;

namespace Youth.DtOs
{
    public class Transaction
    {
        public int Id { get; set; } // Primary key
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal Amount { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime Date {  get; set; }
        public string Images { get; set; } = string.Empty;
        public bool Approved { get; set; }
    }
}
