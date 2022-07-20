using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Queries.GetStructureById;

public class GetStructureByIdQuery: IRequest<StructureByIdVm>
{
    public int ListId { get; set; }
}

public class GetStructureByIdQueryHandler : IRequestHandler<GetStructureByIdQuery, StructureByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStructureByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
      
    }

    public async Task<StructureByIdVm> Handle(GetStructureByIdQuery request, CancellationToken cancellationToken)
    { 
       Gestionnaire user = _context.Gestionnaires.Single(x => x.Id == 2);

        Structure structure = await  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .SingleOrDefaultAsync(x => x.Id == user.StructureId,cancellationToken : cancellationToken) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        
        listAll.Add(structure);
        var fi = GetChildren<Structure>(structure, listAll);

        foreach (var s in fi)
        {
            if (s.Id == request.ListId)
            {
                return new StructureByIdVm
                {
                    StructureDto = await  _context.Structures
                        .Include(co => co.ContratObjectifs)
                        .Include(p =>p.ParentStructure)
                        .Include(s => s.StructureChildren)
                        .Include(p =>p.Projects)
                        .Include(g =>g.Gestionnaires)
                        .Include(a =>a.ActionPs)
                        .SingleOrDefaultAsync(x => x.Id == request.ListId,cancellationToken : cancellationToken) 

                }; 
            }
            
        }
        
        return new StructureByIdVm {}; 
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