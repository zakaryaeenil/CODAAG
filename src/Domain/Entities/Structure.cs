namespace CleanArchitecture.Domain.Entities;

public class Structure : AuditableEntity
{
    public int Id { get; set; }
    public string CodeStructure { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public ICollection<Gestionnaire> Gestionnaires { get; set; } = new List<Gestionnaire>();

    public Structure? ParentStructure { get; set; }
    public ICollection<Structure> StructureChildren { get; set; } = new List<Structure>();
    public ICollection<Project> Projects { get; set; } = new List<Project>();
    public virtual ICollection<ContratObjectif> ContratObjectifs { get; set; } = new List<ContratObjectif>();
    public virtual ICollection<ActionP> ActionPs { get; set; } = new List<ActionP>();
}