namespace CleanArchitecture.Domain.Entities;

public class Statut :  AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }

    public ColorStatut Color { get; set; } = ColorStatut.none;

    public ICollection<ContratObjectif> ContratObjectifs { get; set; } = new List<ContratObjectif>();
    public ICollection<ActionP> ActionPs { get; set; } = new List<ActionP>();
    public ICollection<Project> Projects { get; set; } = new List<Project>();
    public ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();

}