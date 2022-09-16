using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.CreateProject;

public class CreateProjectCommand : IRequest<int>
{

   
    public string? Title { get; init; }
    public string? Note { get; init; }
    public DateTime? StartDatePrv { get; init; }
    public DateTime? EndDatePrv { get; init; }
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
    public PriorityLevel Priority { get; init; } = PriorityLevel.None;
    public string? ModeReel { get; init; }
    public bool IsInitial { get; init; } = true;

    public int? Statut { get; init; }
   

    public int? TypeProjectId { get; init; }
    
    public ICollection<int> ContratObjectifs { get; init; }
    
    
    public ICollection<int> Structures { get; set; } 
}

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateProjectCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        
        var s = _context.Statuts
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.Statut);
        
        var tp = _context.TypeProjects
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.TypeProjectId);

        
        var entity = new Project()
        {
            Title = request.Title,
            Note = request.Note,
           // CodeProject = request.CodeProject,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            StartDatePrv = request.StartDatePrv,
            EndDatePrv = request.EndDatePrv,
            StatutId = s.Id,
            TypeProjectId = tp.Id,
            TauxR = 0,
            ModeReel = request.ModeReel,
            IsInitial = request.IsInitial,
            Priority = request.Priority
          
        };
        entity.CodeProject = entity.Id + "-" + entity.Title;
        _context.Projects.Add(entity);
        if (request.ContratObjectifs != null)
        {
            foreach (var c in request.ContratObjectifs)
            {
                var contrat = _context.ContratObjectifs.Include(p =>p.Projects).SingleOrDefault(x => x.Id == c);
                if (contrat != null)
                {
                    contrat.Projects.Add(entity);
                }
            }
        }
        if (request.Structures != null)
        {
            foreach (var ss in request.Structures)
            {
                var structure = _context.Structures.Include(p =>p.Projects).SingleOrDefault(x => x.Id == ss);
                if (structure != null)
                {
                    structure.Projects.Add(entity);
                }
            }
        }
        
        await _context.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}