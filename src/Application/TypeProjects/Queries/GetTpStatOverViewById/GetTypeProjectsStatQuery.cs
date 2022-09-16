using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.TypeProjectModel;

using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTpStatOverViewById;

public class GetTypeProjectsStatQuery: IRequest<TypeProjectsStatVm>
{
    public int ListId { get; set; }
}

public class GetTypeProjectsStatQueryHandler : IRequestHandler<GetTypeProjectsStatQuery, TypeProjectsStatVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    

    public GetTypeProjectsStatQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TypeProjectsStatVm> Handle(GetTypeProjectsStatQuery request, CancellationToken cancellationToken)
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
        
        TypeProject tp = _context.TypeProjects
            .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .First(t => t.Id == request.ListId);
        
        ICollection<TypeProject> Difftps = _context.TypeProjects
           .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Where(t => t.Id != request.ListId).ToList();
        int proj = 0;
        
        foreach (var diff in Difftps)
        {
            proj += diff.Projects.Count;
        }
        TypeProjectStat tpStat = new TypeProjectStat();
        tpStat.typePCount = tp.Projects.Count;
        tpStat.DiffETypePCount = proj;
        return new TypeProjectsStatVm
        {
            TypeProjectDto = tpStat

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