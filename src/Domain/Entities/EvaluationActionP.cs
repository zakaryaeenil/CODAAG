namespace CleanArchitecture.Domain.Entities;

public class EvaluationActionP : AuditableEntity
{
    public int EvaluationId { get; set; }
    public Evaluation Evaluation { get; set; }

    public int ActionPId { get; set; }
    public ActionP ActionP { get; set; }

    public int? TauxR { get; set; }
}