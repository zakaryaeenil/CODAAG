using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluationById;

public class GetEvaluationByIdQuery : IRequest<EvaluationByIdVm>
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
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);

        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
        
        return new EvaluationByIdVm
        {
            EvaluationDto    = await _context.Evaluations
                .Where(t => t.Id == request.ListId)
                .Include(p =>p.Projects.Where(p => p.Project.Structures.Any(l => structures.Contains(l))))
                .ThenInclude(pp => pp.Project.Structures.Where(p =>  structures.Contains(p)))
                .Include(a=>a.ActionPs.Where(p => p.ActionP.Structures.Any(l => structures.Contains(l))))
                .ThenInclude(aa => aa.ActionP.Structures.Where(p =>  structures.Contains(p)))
                .SingleAsync(cancellationToken: cancellationToken)

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