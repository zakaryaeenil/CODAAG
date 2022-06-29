namespace CleanArchitecture.Domain.Entities;

public class Project: AuditableEntity
{
    #region Attributes
    public int Id { get; set; }
    public string CodeProject { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }
    public DateTime? StartDatePrv { get; set; }
    public DateTime? EndDatePrv { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public PriorityLevel? Priority { get; set; } = PriorityLevel.None;
    public int? TauxR { get; set; }
    public string? ModeReel { get; set; }
    public bool IsInitial { get; set; }
    
    public int StatutId { get; set; }
    public Statut Statut { get; set; }
    
    public int TypeProjectId { get; set; }
    public TypeProject  TypeProject { get; set; }

    
    public virtual ICollection<ContratObjectif> ContratObjectifs { get; set; } = new List<ContratObjectif>();


    public ICollection<ActionP> Actions { get; set; } = new List<ActionP>();
    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();

    public virtual ICollection<EvaluationProject> Evaluations { get; set; } = new List<EvaluationProject>();



    #endregion

}