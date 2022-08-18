using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.EvaluationModel;
using CleanArchitecture.Application.Evaluations.Queries.GetEvaluationById;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Evaluations.Queries.GetEvaluationsStat;

public class GetEvaluationStatByIdQuery: IRequest<GetEvaluationStatByIdVm>
{
    public int ListId { get; set; }
}

public class GetEvaluationStatByIdQueryHandler : IRequestHandler<GetEvaluationStatByIdQuery, GetEvaluationStatByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEvaluationStatByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<GetEvaluationStatByIdVm> Handle(GetEvaluationStatByIdQuery request, CancellationToken cancellationToken)
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

        Evaluation evaluation = await _context.Evaluations
            .Where(t => t.Id == request.ListId)
            .Include(p => p.Projects.Where(p => p.Project.Structures.Any(l => structures.Contains(l))))
            .ThenInclude(pp => pp.Project.Structures.Where(p => structures.Contains(p)))
            .Include(a => a.ActionPs.Where(p => p.ActionP.Structures.Any(l => structures.Contains(l))))
            .ThenInclude(aa => aa.ActionP.Structures.Where(p => structures.Contains(p)))
            .SingleAsync(cancellationToken: cancellationToken);

        ICollection<Evaluation> diffcoEvaluations = await _context.Evaluations
            .Where(t => t.Id != request.ListId)
            .Include(p => p.Projects.Where(p => p.Project.Structures.Any(l => structures.Contains(l))))
            .ThenInclude(pp => pp.Project.Structures.Where(p => structures.Contains(p)))
            .Include(a => a.ActionPs.Where(p => p.ActionP.Structures.Any(l => structures.Contains(l))))
            .ThenInclude(aa => aa.ActionP.Structures.Where(p => structures.Contains(p)))
            .ToListAsync(cancellationToken: cancellationToken);
       
     
        int act = 0;
        int proj = 0;
      
       
        foreach (var diff in diffcoEvaluations)
        {
            act += diff.ActionPs.Count;
            proj += diff.Projects.Count;
           
        }

        EvaluationStat stat = new EvaluationStat();
     

        stat.ActionPsCount = evaluation.ActionPs.Count;
        stat.DiffActionPsCount = act;

        stat.ProjectsCount = evaluation.Projects.Count;
        stat.DiffProjectsCount = proj;


        
        return new GetEvaluationStatByIdVm
        {
            EvaluationStat   = stat

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