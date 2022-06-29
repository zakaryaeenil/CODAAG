namespace CleanArchitecture.Domain.Entities;

public class EvaluationProject : AuditableEntity
{
    public int EvaluationId { get; set; }
    public Evaluation Evaluation { get; set; }

    public int ProjectId { get; set; }
    public Project Project { get; set; }

    public int? TauxR { get; set; }
}