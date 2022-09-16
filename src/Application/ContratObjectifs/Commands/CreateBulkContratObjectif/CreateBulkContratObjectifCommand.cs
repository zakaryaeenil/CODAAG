using System.Data;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using ExcelDataReader;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.CreateBulkContratObjectif;

public class CreateBulkContratObjectifCommand: IRequest<string>
{
    public IFormFile File { get; set; }
}

public class CreateBulkContratObjectifCommandHandler : IRequestHandler<CreateBulkContratObjectifCommand, string>
{
    private readonly IApplicationDbContext _context;
  
    public CreateBulkContratObjectifCommandHandler(IApplicationDbContext context )
    {
        _context = context;
      
    }

    public async Task<string> Handle(CreateBulkContratObjectifCommand request, CancellationToken cancellationToken)
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
                    reader?.Close();

                    if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                    {
                        DataTable dtStudentRecords = dsexcelRecords.Tables[0];
                        
                        for (int i = 5; i < dtStudentRecords.Rows.Count; i++)
                        {
                            if (Convert.ToBoolean(dtStudentRecords.Rows[i][0]) == true)
                            {
                                foreach (var a in _context.ContratObjectifs.ToList())
                                {
                                    a.IsActive = false;
                                }
                            }
                            var s = await _context.Statuts.FirstOrDefaultAsync(x => x.Id == 5, cancellationToken);
                            ContratObjectif objStudent = new ContratObjectif
                            {
                                Title = Convert.ToString(dtStudentRecords.Rows[i][0]) ?? throw new InvalidOperationException(),
                                Note = Convert.ToString(dtStudentRecords.Rows[i][1]) ?? throw new InvalidOperationException(),
                                CodeCO = Convert.ToString(dtStudentRecords.Rows[i][0]) + "-" +Convert.ToDateTime(dtStudentRecords.Rows[i][2]).Year,
                                StartDate = Convert.ToDateTime(dtStudentRecords.Rows[i][2]),
                                EndDate = Convert.ToDateTime(dtStudentRecords.Rows[i][3]),
                                StatutId = s.Id,
                                Statut = s,
                                IsActive = true
                            };
                            _context.ContratObjectifs.Add(objStudent);

                                
                        }

                        int output = await _context.SaveChangesAsync(cancellationToken);
                        message = output > 0 ? "The Excel file has been successfully uploaded." : "Something Went Wrong!, The Excel file uploaded has faild.";
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