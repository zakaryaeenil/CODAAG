using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluations;

public class GetEvaluationsQuery : IRequest<EvaluationsVm>
{
}

public class GetEvaluationsQueryHandler : IRequestHandler<GetEvaluationsQuery, EvaluationsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEvaluationsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<EvaluationsVm> Handle(GetEvaluationsQuery request, CancellationToken cancellationToken)
    {
        return new EvaluationsVm
        {
            EvaluationDtos = await _context.Evaluations
                .Include(s =>s.Statut)
                .AsNoTracking()
                .ToListAsync(cancellationToken)
        };
    }
}