namespace CleanArchitecture.Application.Dto.Helpers.EvaluationModel;

public class EvaluationStat
{
    public int ProjectsCount { get; set; } = 0;
    public int DiffProjectsCount { get; set; } = 0;
    
    public int ActionPsCount { get; set; } = 0;
    public int DiffActionPsCount { get; set; } = 0;
}