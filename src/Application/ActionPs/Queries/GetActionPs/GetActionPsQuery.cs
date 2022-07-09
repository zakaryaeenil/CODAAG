using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPs;

public class GetActionPsQuery: IRequest<ActionPsVm>
{
}

public class GetActionPsQueryHandler : IRequestHandler<GetActionPsQuery, ActionPsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetActionPsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ActionPsVm> Handle(GetActionPsQuery request, CancellationToken cancellationToken)
    {
        return new ActionPsVm
        {
            ActionPDtos = await _context.ActionPs
                .Include(s =>s.Statut)
                .Include(p => p.Project)
                .Include(st => st.Structures)
                .AsNoTracking()
                .ToListAsync(cancellationToken)
        };
    }
}