using AutoMapper;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class EvaluationDto : IMapFrom<Evaluation>
{
   
    public int Id { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
  
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public  int StatutId { get; set; }
    public  StatutDto Statut { get; set; }


    public  ICollection<EvaluationProjectDto> Projects { get; set; } = new List<EvaluationProjectDto>();

    public  ICollection<EvaluationActionPDto> ActionPs { get; set; } = new List<EvaluationActionPDto>();

}