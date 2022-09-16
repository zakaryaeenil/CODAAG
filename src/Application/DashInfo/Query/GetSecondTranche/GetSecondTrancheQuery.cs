using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.DashInfo.Query.GetFirstTranche;
using CleanArchitecture.Application.Dto.Helpers.DashModels;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace CleanArchitecture.Application.DashInfo.Query.GetSecondTranche;

public class GetSecondTrancheQuery : IRequest<GetSecondTrancheVm>
{
    public int? TypeProjectId { get; set; }
    public int? ConId { get; set; }
}

public class GetSecondTrancheQueryHandler : IRequestHandler<GetSecondTrancheQuery, GetSecondTrancheVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetSecondTrancheQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetSecondTrancheVm> Handle(GetSecondTrancheQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);
        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(co => co.ContratObjectifs)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.TypeProject)
            .Include(p => p.ActionPs)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);

        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
        
        ICollection<SecondTranche> secondTranchess = new List<SecondTranche>();
       
        ICollection<Statut> statuts = _context.Statuts
            .Include(a => a.ActionPs)
            .ThenInclude(aa => aa.Project)
            .ThenInclude(aa => aa.TypeProject)
            .Include(a => a.ActionPs)
            .ThenInclude(aa => aa.Project)
            .ThenInclude(aaa =>aaa.ContratObjectifs)
            .ToList();
        SecondTranche f = new SecondTranche();
        if (request.TypeProjectId == null)
        {
            if (request.ConId == null)
            {
                foreach (var stru in structures)
                {
                    f.Structure = stru.Title;
                    foreach (var stat in statuts)
                    {
                        HelperSecondTranche helperSecondTranche = new HelperSecondTranche();
                        helperSecondTranche.StatutName = stat.Title;
                        int i = 0;
                        foreach (var V in stat.ActionPs)
                        {
                            if (V.Structures.Contains(stru))
                            {
                                i++;
                            }
                        }
                        if (stru.ActionPs.Count > 0)
                        {
                            helperSecondTranche.TauxR = (i * 100) / stru.ActionPs.Count   ;
                        }
                        f.StatutsTaux.Add(helperSecondTranche);
                        
                    }
                    secondTranchess.Add(f);
                }
               
            }
            else if (request.ConId != null)
            {
                ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId);
                foreach (var stru in structures)
                {
                   
                        f.Structure = stru.Title;
                        foreach (var stat in statuts)
                        {
                            HelperSecondTranche helperSecondTranche = new HelperSecondTranche();
                            helperSecondTranche.StatutName = stat.Title;
                            
                            if (stru.ContratObjectifs.Contains(objectif))
                            {
                                int i  = 0 ;
                                foreach (var V in stat.ActionPs)
                                {
                                    if (V.Structures.Contains(stru))
                                    {
                                        i++;
                                    }
                                }
                                if (stru.ActionPs.Count > 0)
                                {
                                    helperSecondTranche.TauxR = (i * 100) / stru.ActionPs.Count   ;
                                }
                                
                            }
                           
                            f.StatutsTaux.Add(helperSecondTranche);
                        
                        }
                        secondTranchess.Add(f);
                        
                }
              
            } 
            return new  GetSecondTrancheVm 
            {
                Seconds = secondTranchess,
            } ;
        }
        else if (request.TypeProjectId != null)
        {
            TypeProject typeProject = _context.TypeProjects.Include(p =>p.Projects).ThenInclude(a => a.Actions).SingleOrDefault(x => x.Id == request.TypeProjectId) ?? throw new InvalidOperationException(); 
            if (request.ConId == null)
            {

                foreach (var stru in structures)
                {   
                   
                    f.Structure = stru.Title;
                    foreach (var stat in statuts)
                    {
                        HelperSecondTranche helperSecondTranche = new HelperSecondTranche();
                        helperSecondTranche.StatutName = stat.Title;
                        int i  = 0 ;
                        foreach (var sa in stat.ActionPs)
                        {
                            if (sa.Project.TypeProjectId == typeProject.Id && sa.Structures.Contains(stru))
                            {
                                i++;
                            }
                        }
                        if (stru.ActionPs.Count > 0)
                        {
                            helperSecondTranche.TauxR = (i * 100) / stru.ActionPs.Count   ;
                        }
                        f.StatutsTaux.Add(helperSecondTranche);
                    }
                    secondTranchess.Add(f); 
                }
            }

            
            else if (request.ConId != null)
            {
                ContratObjectif objectif = _context.ContratObjectifs.Single(x => x.Id == request.ConId);
                foreach (var stru in structures)
                {   
                   
                    f.Structure = stru.Title;
                    foreach (var stat in statuts)
                    {
                        HelperSecondTranche helperSecondTranche = new HelperSecondTranche();
                        helperSecondTranche.StatutName = stat.Title;
                        int i  = 0 ;
                        foreach (var sa in stat.ActionPs)
                        {
                            if (sa.Project.TypeProjectId == typeProject.Id && sa.Structures.Contains(stru) && sa.Project.ContratObjectifs.Contains(objectif))
                            {
                                i++;
                            }
                        }
                        if (stru.ActionPs.Count > 0)
                        {
                            helperSecondTranche.TauxR = (i * 100) / stru.ActionPs.Count   ;
                        }
                        f.StatutsTaux.Add(helperSecondTranche);
                    }
                    secondTranchess.Add(f); 
                }
            } 
            return new  GetSecondTrancheVm 
            {
                Seconds = secondTranchess,
            } ; 
        }
        return new GetSecondTrancheVm();

    }
  
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(co => co.ContratObjectifs)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.TypeProject)
            .Include(p => p.ActionPs)
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