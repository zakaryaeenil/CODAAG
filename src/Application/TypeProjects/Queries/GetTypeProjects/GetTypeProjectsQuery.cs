using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
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
}