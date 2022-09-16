using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Queries.GetStatuts;

public class GetStatutsQuery: IRequest<StatutsVm>
{
}

public class GetStatutsQueryHandler : IRequestHandler<GetStatutsQuery, StatutsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStatutsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StatutsVm> Handle(GetStatutsQuery request, CancellationToken cancellationToken)
    {
        return new StatutsVm
        {
            StatutDtos = await _context.Statuts
                .AsNoTracking()
                .ToListAsync(cancellationToken)
        };
    }
}