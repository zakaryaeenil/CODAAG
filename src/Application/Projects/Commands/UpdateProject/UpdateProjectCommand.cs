using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Commands.UpdateProject;

public class UpdateProjectCommand : IRequest
{
    public int Id { get; set; }
    public string? Title { get; init; }
    public string? Note { get; init; }
    public DateTime? StartDatePrv { get; init; }
    public DateTime? EndDatePrv { get; init; }
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
    public PriorityLevel Priority { get; init; } = PriorityLevel.None;
    public int? TauxR { get; init; } = 0;
    public string? ModeReel { get; init; }
    public bool IsInitial { get; init; } = true;

    public int? Statut { get; init; }
   

    public int? TypeProjectId { get; init; }
    
    public ICollection<int> ContratObjectifs { get; init; }
    
    
    public ICollection<int> Structures { get; set; }  
}
public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProjectCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Projects
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ActionP), request.Id);
        }
        var s = _context.Statuts
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.Statut);
        
        var tp = _context.TypeProjects
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.TypeProjectId);

      
            entity.Title = request.Title;
            entity.Note = request.Note;
            entity.StartDate = request.StartDate;
            entity.EndDate = request.EndDate;
            entity.StartDatePrv = request.StartDatePrv;
            entity.EndDatePrv = request.EndDatePrv;
            entity.StatutId = s.Id;
            entity.TypeProjectId = tp.Id;
            entity.TauxR = request.TauxR;
            entity.ModeReel = request.ModeReel;
            entity.IsInitial = request.IsInitial;
            entity.Priority = request.Priority;
            entity.CodeProject = entity.Id + "-" + entity.Title;
            
            foreach (var co in _context.ContratObjectifs.Include(s => s.Projects).Where(s =>s.Projects.Contains(entity)).ToList())
            {
                co.Projects.Remove(entity);
            }
            foreach (var st in _context.Structures.Include(s => s.Projects).Where(s =>s.Projects.Contains(entity)).ToList())
            {
                st.Projects.Remove(entity);
            } 
            
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

        return Unit.Value;
    }
}