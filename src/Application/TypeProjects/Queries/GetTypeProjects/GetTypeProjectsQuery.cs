using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjects;

public class GetTypeProjectsQuery: IRequest<TypeProjectsVm>
{
}

public class GetTypeProjectsQueryHandler : IRequestHandler<GetTypeProjectsQuery, TypeProjectsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTypeProjectsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TypeProjectsVm> Handle(GetTypeProjectsQuery request, CancellationToken cancellationToken)
    {
        return new()
        {
            TypeProjectDtos = await _context.TypeProjects
                .AsNoTracking()
                .ToListAsync(cancellationToken)
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