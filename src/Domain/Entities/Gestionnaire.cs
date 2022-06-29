namespace CleanArchitecture.Domain.Entities;

public class Gestionnaire : AuditableEntity
{
    public int Id { get; set; }
    public string? Nom { get; set; }
    public string? Prenom { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string Code { get; set; }

    public int? StructureId { get; set; }
    public Structure? Structure { get; set; } 
}