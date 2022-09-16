using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Queries.GetStatutById;

public class GetStatutByIdQuery: IRequest<StatutByIdVm>
{
    public int ListId { get; set; }
}

public class GetStatutByIdQueryHandler : IRequestHandler<GetStatutByIdQuery, StatutByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   

    public GetStatutByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StatutByIdVm> Handle(GetStatutByIdQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);
        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Single(x =>x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
        
        return new StatutByIdVm
        {
            StatutDto = await _context.Statuts 
                .Include(e =>e.Evaluations)
                .Include(co =>co.ContratObjectifs.Where(p => p.Structures.Any(l => structures.Contains(l))))
                .Include(a => a.ActionPs.Where(p => p.Structures.Any(l => structures.Contains(l))))
                .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
                .Where(t => t.Id == request.ListId)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
    
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .SingleOrDefault(x => x.Id == k.Id);
        if (t == null)
        {
            return list;
        }
        foreach (Structure child in t.StructureChildren)
        {
            list.Add(child);
            GetChildren<Structure>(child,list);
        }
        return list;
    }
    
    
}