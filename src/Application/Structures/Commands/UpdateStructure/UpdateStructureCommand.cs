using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Commands.UpdateStructure;

public class UpdateStructureCommand : IRequest
{
    public int Id { get; set; }
    public DateTime startD { get; set; } 

    public DateTime endD { get; set; }
    
    public int? parent { get; set; }
    public string? Title { get; set; }
   
    public string? Comment { get; set; }
    
    public ICollection<int> Contrats { get; set; } 
}
public class UpdateStructureCommandHandler : IRequestHandler<UpdateStructureCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateStructureCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateStructureCommand request, CancellationToken cancellationToken)
    { 
        var entity = await _context.Structures
            .FindAsync(new object[] { request.Id }, cancellationToken);
        
        Structure? sp = _context.Structures
            .SingleOrDefault(x =>  x.Id == request.parent);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Structure), request.Id);
        }

        entity.Title = request.Title;
        entity.Note = request.Comment;
        entity.StartDate = request.startD;
        entity.EndDate = request.endD;
        entity.ParentStructure = sp;
        entity.CodeStructure = entity.Title +"-"+ entity.StartDate.Year;

        foreach (var co in _context.ContratObjectifs.Include(s => s.Structures).Where(s =>s.Structures.Contains(entity)).ToList())
        {
            co.Structures.Remove(entity);
        }
        if (request.Contrats != null)
        {
            foreach (var c in request.Contrats)
            {
               
                var contrat = _context.ContratObjectifs.SingleOrDefault(x => x.Id == c);
                if (contrat != null )
                {
                   // contrat.Structures.Add(entity);
                    entity.ContratObjectifs.Add(contrat);
                }
            }
        }
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value; 
            
    }
}