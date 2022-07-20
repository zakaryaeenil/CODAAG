namespace CleanArchitecture.Application.Dto.Helpers.StatutModel;

public class StatutStat
{
    public int EvaluationsCount { get; set; } = 0;
    public int DiffEvaluationsCount { get; set; } = 0;
    
    public int ProjectsCount { get; set; } = 0;
    public int DiffProjectsCount { get; set; } = 0;
    
    public int ActionPsCount { get; set; } = 0;
    public int DiffActionPsCount { get; set; } = 0;
    
    public int ContratsCount { get; set; } = 0;
    public int DiffContratsCount { get; set; } = 0;
}