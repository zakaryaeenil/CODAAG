namespace CleanArchitecture.Domain.Entities;

public class TypeProject : AuditableEntity
{
    public int Id { get; set; }
    public string CodeTP { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }

    public ICollection<Project> Projects { get; set; } = new List<Project>();
}