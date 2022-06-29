using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Structures.Queries.GetStructures;

public class StructuresVm
{
    public ICollection<Structure> StructureDtos { get; set; } = new List<Structure>();
}