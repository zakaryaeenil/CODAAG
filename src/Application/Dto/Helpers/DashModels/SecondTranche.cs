namespace CleanArchitecture.Application.Dto.Helpers.DashModels;

public class SecondTranche
{
    public string Structure { get; set; }
    public ICollection<HelperSecondTranche> StatutsTaux = new List<HelperSecondTranche>();
}