namespace CleanArchitecture.Domain.Entities;

public class ModelImport : AuditableEntity
{
    public int Id { get; set; }
    public string name { get; set; }
    public byte[] model { get; set; }
}