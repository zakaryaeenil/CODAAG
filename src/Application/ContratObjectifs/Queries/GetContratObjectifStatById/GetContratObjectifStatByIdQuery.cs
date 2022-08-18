using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifById;
using CleanArchitecture.Application.Dto.Helpers.ContratObjectifModel;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifStatById;

public class GetContratObjectifStatByIdQuery: IRequest<ContratObjectifStatByIdVm>
{
    public int ListId { get; set; }
}

public class GetContratObjectifStatByIdQueryHandler : IRequestHandler<GetContratObjectifStatByIdQuery, ContratObjectifStatByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetContratObjectifStatByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ContratObjectifStatByIdVm> Handle(GetContratObjectifStatByIdQuery request, CancellationToken cancellationToken)
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

        ContratObjectif co = _context.ContratObjectifs
            .Include(a => a.Structures.Where(p => structures.Contains(p)))
            .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .First(t => t.Id == request.ListId);
        
       ICollection<ContratObjectif> Diffco = _context.ContratObjectifs
           .Include(a => a.Structures.Where(p => structures.Contains(p)))
            .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Where(t => t.Id != request.ListId).ToList();
       
     
       int str = 0;
       int proj = 0;
      
       
       foreach (var diff in Diffco)
       {
           str += diff.Structures.Count;
           proj += diff.Projects.Count;
           
       }

       ContratObjectifStat stat = new ContratObjectifStat();
     

       stat.StructuresCount = co.Structures.Count;
       stat.DiffStructuresCount = str;

       stat.ProjectsCount = co.Projects.Count;
       stat.DiffProjectsCount = proj;

     
        return new ContratObjectifStatByIdVm
        {
            ContratObjectifDto = stat
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