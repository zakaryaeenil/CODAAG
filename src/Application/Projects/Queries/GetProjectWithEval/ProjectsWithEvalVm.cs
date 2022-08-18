using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Projects.Queries.GetProjectWithEval;

public class ProjectsWithEvalVm
{
    public ICollection<Project> ProjectsDtos { get; set; } = new List<Project>();
    public bool Is  { get; set; } = false;
    
    public ICollection<Evaluation> EvaluationDtos { get; set; } = new List<Evaluation>(); 

}