using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifs;

public class GetContratObjectifsQuery : IRequest<ContratObjectifsVm>
{
}

public class GetContratObjectifsQueryHandler : IRequestHandler<GetContratObjectifsQuery, ContratObjectifsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetContratObjectifsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ContratObjectifsVm> Handle(GetContratObjectifsQuery request, CancellationToken cancellationToken)
    {
       
        return new ContratObjectifsVm
        {
            ContratObjectifDtos = await _context.ContratObjectifs
                .Include(s =>s.Statut)
                .AsNoTracking()
              //  .ProjectTo<BriefContratObjectifDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken : cancellationToken)
        };
    }
    
 
}