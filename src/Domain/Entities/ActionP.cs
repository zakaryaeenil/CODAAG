namespace CleanArchitecture.Domain.Entities;

public class ActionP : AuditableEntity
{
    #region Attributes

    public int Id { get; set; }

    public string Title { get; set; }
    public string? Note { get; set; }
    public int? TauxR { get; set; }
    public float? BudgR { get; set; }
    public DateTime? StartDatePrv { get; set; }
    public DateTime? EndDatePrv { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public float? BudgPrv { get; set; }

    public int StatutId { get; set; }
    public virtual Statut Statut { get; set; }
    
    public int ProjectId { get; set; }
    public virtual Project Project { get; set; }

    public virtual ICollection<Structure> Structures { get; set; } = new List<Structure>();

    public virtual ICollection<EvaluationActionP> Evaluations { get; set; } = new List<EvaluationActionP>();


    #endregion

}