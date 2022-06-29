using System.Diagnostics;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Commands.CreateStructure;

public class CreateStructureCommand: IRequest<int>
{
    public DateTime startD { get; set; } 

    public DateTime endD { get; set; }
    
    public int? parent { get; set; }
    public string? Title { get; set; }
   
    public string? Comment { get; set; }
    
    public ICollection<int> Contrats { get; set; }
}

public class CreateStructureCommandHandler : IRequestHandler<CreateStructureCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateStructureCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateStructureCommand request, CancellationToken cancellationToken)
    { 
      
        Structure? sp = _context.Structures
            .SingleOrDefault(x =>  x.Id == request.parent);
        
        
            var entity = new Structure
            {
                Title = request.Title,
                Note = request.Comment,
                // CodeStructure = request.Title +"-"+ request.startD.Year,
                StartDate = request.startD,
                EndDate = request.endD,
                ParentStructure = sp,
              //  ContratObjectifs = new List<ContratObjectif>()
            };
            entity.CodeStructure = entity.Title +"-"+ entity.StartDate.Year;
            _context.Structures.Add(entity); 
            if (request.Contrats != null)
            {
                foreach (var c in request.Contrats)
                {
                    
                    var contrat = _context.ContratObjectifs.SingleOrDefault(x => x.Id == c);
                    if (contrat != null )
                    {
                        contrat.Structures.Add(entity);
                        entity.ContratObjectifs.Add(contrat);
                    }
                }
            }
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id; 
            
    }
}