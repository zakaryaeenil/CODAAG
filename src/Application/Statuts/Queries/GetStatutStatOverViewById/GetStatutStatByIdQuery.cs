using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.StatutModel;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Queries.GetStatutStatOverViewById;

public class GetStatutStatByIdQuery : IRequest<StatutStatByIdVm>
{
    public int ListId { get; set; }
}

public class GetStatutStatByIdQueryHandler : IRequestHandler<GetStatutStatByIdQuery,StatutStatByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetStatutStatByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<StatutStatByIdVm> Handle(GetStatutStatByIdQuery request, CancellationToken cancellationToken)
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

        Statut statut = _context.Statuts
            .Include(e => e.Evaluations)
            .Include(co => co.ContratObjectifs.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Include(a => a.ActionPs.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .First(t => t.Id == request.ListId);
        
       ICollection<Statut> Diffstatuts = _context.Statuts
            .Include(e => e.Evaluations)
            .Include(co => co.ContratObjectifs.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Include(a => a.ActionPs.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Include(p => p.Projects.Where(p => p.Structures.Any(l => structures.Contains(l))))
            .Where(t => t.Id != request.ListId).ToList();
       
       int contract = 0;
       int eval = 0;
       int proj = 0;
       int act = 0;
       
       foreach (var diff in Diffstatuts)
       {
           contract += diff.ContratObjectifs.Count;
           eval += diff.Evaluations.Count;
           proj += diff.Projects.Count;
           act += diff.ActionPs.Count;
       }

       StatutStat stat = new StatutStat();
       stat.ContratsCount = statut.ContratObjectifs.Count;
       stat.DiffContratsCount = contract;

       stat.EvaluationsCount = statut.Evaluations.Count;
       stat.DiffEvaluationsCount = eval;

       stat.ProjectsCount = statut.Projects.Count;
       stat.DiffProjectsCount = proj;

       stat.ActionPsCount = statut.ActionPs.Count;
       stat.DiffActionPsCount = act;
        return new StatutStatByIdVm
        {
            StatutStat = stat
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