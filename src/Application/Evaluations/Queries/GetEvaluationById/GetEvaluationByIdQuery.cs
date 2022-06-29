using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluationById;

public class GetEvaluationByIdQuery: IRequest<EvaluationByIdVm>
{
    public int ListId { get; set; }
}

public class GetEvaluationByIdQueryHandler : IRequestHandler<GetEvaluationByIdQuery, EvaluationByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEvaluationByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<EvaluationByIdVm> Handle(GetEvaluationByIdQuery request, CancellationToken cancellationToken)
    {
        return new EvaluationByIdVm
        {
            EvaluationDto    = await _context.Evaluations
                .Where(t => t.Id == request.ListId)
                .Include(p =>p.Projects)
                .ThenInclude(pp => pp.Project)
                .Include(a=>a.ActionPs)
                .ThenInclude(aa => aa.ActionP)
                .ProjectTo<EvaluationDto>(_mapper.ConfigurationProvider)
                .SingleAsync(cancellationToken: cancellationToken)

        };
    }
}