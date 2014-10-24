using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Veg.RestaurentFinder.Models
{
    public class AddressModel
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string StateAbbreviation { get; set; }
        public string ZipCode { get; set; }
    }
}