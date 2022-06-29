using AutoMapper;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class ProjectDto : IMapFrom<Project>
{
   
   
    public int Id { get; set; }
    public string CodeProject { get; set; }
    public string Title { get; set; }
    public string? Note { get; set; }
    public DateTime? StartDatePrv { get; set; }
    public DateTime? EndDatePrv { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? Priority { get; set; }
    public int? TauxR { get; set; }
    public string? ModeReel { get; set; }
    public bool IsInitial { get; set; }
    
    public int? StatutId { get; set; }
    public StatutDto? Statut { get; set; }
    
    public int TypeProjectId { get; set; }
    public TypeProjectDto  TypeProject { get; set; }

    public int? ContratObjectifId { get; set; }
    public ContratObjectifDto? ContratObjectif { get; set; }


    public ICollection<ActionPDto> Actions { get; set; } = new List<ActionPDto>();
    public ICollection<StructureDto> Structures { get; set; } = new List<StructureDto>();




    public virtual ICollection<EvaluationProjectDto> Evaluations { get; set; } = new List<EvaluationProjectDto>();
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Project, ProjectDto>()
            .ForMember(d => d.Priority, opt => opt.MapFrom(s => (int?)s.Priority));
       
    }

}