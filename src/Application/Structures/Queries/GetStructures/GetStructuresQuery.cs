using System.Linq.Expressions;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Queries.GetStructures;

public class GetStructuresQuery : IRequest<StructuresVm>
{
}

public class GetStructuresQueryHandler : IRequestHandler<GetStructuresQuery, StructuresVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStructuresQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StructuresVm>  Handle(GetStructuresQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);
        Structure structure =  _context.Structures
             .Include(p =>p.ParentStructure)
             .Include(s => s.StructureChildren)
             .Include(p => p.Projects)
             .Single(x =>  x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
         ICollection<Structure> listAll = new List<Structure>();
         listAll.Add(structure);
         
        
         
         return await Task.FromResult(new StructuresVm
         {
             StructureDtos =  GetChildren<Structure>(structure , listAll)
         });
         
    }
  
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(p => p.Projects)
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