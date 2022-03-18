using System;
using System.Collections.Generic;

namespace DCS_Employee_Management.Models
{
    public partial class TblEmployee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
    }
}
