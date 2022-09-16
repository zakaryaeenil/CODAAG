using System.Data;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.CreateBulkTypeProject;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace CleanArchitecture.Application.Statuts.Commands.CreateBulkStatut;

public class CreateBulkStatutCommand: IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkStatutCommandHandler : IRequestHandler<CreateBulkStatutCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkStatutCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkStatutCommand request, CancellationToken cancellationToken)
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
                            Statut objStudent = new Statut();
                            objStudent.Title= Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException();
                            objStudent.Note = Convert.ToString(dtStudentRecords.Rows[i][1]) ?? throw new InvalidOperationException();
                            objStudent.Color = (ColorStatut)Convert.ToInt32(dtStudentRecords.Rows[i][2]);
                            _context.Statuts.Add(objStudent);
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