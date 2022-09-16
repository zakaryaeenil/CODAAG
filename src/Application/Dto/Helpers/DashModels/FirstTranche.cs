namespace CleanArchitecture.Application.Dto.Helpers.DashModels;

public class FirstTranche
{
    public int Id { get; set; } 
    public string TypeP { get; set; }
    public int nbrProjects { get; set; } = 0;
    public float? TauxR { get; set; } = 0; 
}