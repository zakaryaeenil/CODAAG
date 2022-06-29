namespace CleanArchitecture.Domain.Entities;

public class ContratObjectif : AuditableEntity
{
   
    public int Id { get; set; }
    public string CodeCO { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; }
    
    public int? StatutId { get; set; }
    public Statut? Statut { get; set; } 

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();

}