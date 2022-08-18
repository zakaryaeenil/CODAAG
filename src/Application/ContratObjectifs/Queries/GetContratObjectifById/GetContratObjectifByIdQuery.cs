using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifById;

public class GetContratObjectifByIdQuery : IRequest<ContratObjectifByIdVm>
{
    public int ListId { get; set; }
}

public class GetContratObjectifByIdQueryHandler : IRequestHandler<GetContratObjectifByIdQuery, ContratObjectifByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetContratObjectifByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ContratObjectifByIdVm> Handle(GetContratObjectifByIdQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);

        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
        
        return new ContratObjectifByIdVm
        {
          ContratObjectifDto    = await _context.ContratObjectifs
              .Include(p =>p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
              .Include(s => s.Structures.Where(s => structures.Contains(s)))
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