using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Veg.RestaurentFinder.Models
{
    public class RestaurantViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public AddressModel Address { get; set; }
    }
}