namespace CleanArchitecture.Domain.Entities;

public class Evaluation : AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
  
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public  int StatutId { get; set; }
    public  Statut Statut { get; set; }


    public  ICollection<EvaluationProject> Projects { get; set; } = new List<EvaluationProject>();

    public  ICollection<EvaluationActionP> ActionPs { get; set; } = new List<EvaluationActionP>();
}