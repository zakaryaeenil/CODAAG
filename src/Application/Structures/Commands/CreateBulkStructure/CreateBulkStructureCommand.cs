using System.Data;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;
using CleanArchitecture.Domain.Entities;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Structures.Commands.CreateBulkStructure;

public class CreateBulkStructureCommand : IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkStructureCommandHandler : IRequestHandler<CreateBulkStructureCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkStructureCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkStructureCommand request, CancellationToken cancellationToken)
    {
        #region Variable Declaration
            string message = "";
            DataSet dsexcelRecords = new DataSet();
            IExcelDataReader reader = null;
            Stream FileStream = null;
            #endregion

            #region Save Student Detail From Excel


            if (request.File.Length > 0)
            {
                FileStream = request.File.OpenReadStream();

                if (request.File != null && FileStream != null)
                {
                    if (request.File.FileName.EndsWith(".xls"))
                        reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
                    else if (request.File.FileName.EndsWith(".xlsx"))
                        reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                    else
                        message = "The file format is not supported.";

                    dsexcelRecords = reader.AsDataSet();
                    reader.Close();

                    if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                    {
                        DataTable dtStudentRecords = dsexcelRecords.Tables[0];
                        for (int i = 5; i < dtStudentRecords.Rows.Count; i++)
                        {
                            Console.WriteLine("Start Contrats");
                            ICollection<ContratObjectif> collectionCo = new List<ContratObjectif>();
                            string[]? words = Convert.ToString(dtStudentRecords.Rows[i][4])?.Split(';');
                            foreach (var w in words)
                            {
                                //Console.WriteLine(w);
                                ContratObjectif contratObjectif = await _context.ContratObjectifs.FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(w),cancellationToken) ?? throw new InvalidOperationException();
                                collectionCo.Add(contratObjectif);
                            }
                            Console.WriteLine("End Contrats");
                            Console.WriteLine("Start Structure");
                            Structure structure = await _context.Structures.FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(dtStudentRecords.Rows[i][5]));
                            Console.WriteLine("End Structure");
                            Structure objStudent = new Structure();
                            objStudent.Title = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException();
                            objStudent.Note = Convert.ToString(dtStudentRecords.Rows[i][1]);
                            objStudent.StartDate = Convert.ToDateTime(dtStudentRecords.Rows[i][2]);
                            objStudent.EndDate = Convert.ToDateTime(dtStudentRecords.Rows[i][3]);
                            objStudent.CodeStructure = Convert.ToString(dtStudentRecords.Rows[i][0]) + "-" + Convert.ToDateTime(dtStudentRecords.Rows[i][2]).Year;
                            objStudent.ContratObjectifs = collectionCo;
                            objStudent.ParentStructure =structure; 
                            _context.Structures.Add(objStudent);
                        }

                        int output = await _context.SaveChangesAsync(cancellationToken);
                        if (output > 0)
                            message = "The Excel file has been successfully uploaded.";
                        else
                            message = "Something Went Wrong!, The Excel file uploaded has faild.";
                    }
                    else
                        message = "Selected file is empty.";
                }
                else
                    message = "Invalid File.";
            }
            else
                message = "Bad Request";
            return message;
            #endregion
        }
    
}