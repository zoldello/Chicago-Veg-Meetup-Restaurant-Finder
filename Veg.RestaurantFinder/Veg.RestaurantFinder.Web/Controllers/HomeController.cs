using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Veg.RestaurentFinder.Models;

namespace Veg.RestaurentFinder.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ViewResult Index()
        {
            return View();
        }

        [HttpGet]
        [OutputCache(NoStore = true, Duration = 60, VaryByParam = "*")]
        public JsonResult GetRestaurants()
        {
            var restaurants = this.FakeRestaurants();

            return Json(restaurants, JsonRequestBehavior.AllowGet);
        }


        #region
        private IEnumerable<RestaurantViewModel> FakeRestaurants()
        {
            var restaurants = new List<RestaurantViewModel>();

            var r1 = new RestaurantViewModel()
            {
                Id = 1,
                Name = "Native Foods- West Loop, Chicago",
                Url = "http://www.nativefoods.com",
                latitude = "41.8814122",
                longitude = "-87.641146",
                Address = new AddressModel() 
                {
                    Address = "14 South Clinton", 
                    City = "Chicago", 
                    StateAbbreviation = "IL", 
                    ZipCode = "60661"
                }
            };

            var r2 = new RestaurantViewModel()
            {
                Id = 2,
                Name = "Chicago Raw Food",
                Url = "http://www.chicagorawfood.com",
                latitude="41.88391",
                longitude="-87.64086480000003",
                Address = new AddressModel()
                {
                    Address = "131 n clinton st",
                    City = "Chicago",
                    StateAbbreviation = "IL",
                    ZipCode = "60661"
                }
            };

            var r3 = new RestaurantViewModel()
            {
                Id = 3,
                Name = "Urban Vegan- Lakeview",
                Url = "http://www.mapquest.com",
                latitude="41.9614449",
                longitude = "-87.66957350000001",
                Address = new AddressModel()
                {
                    Address = "1605 W Montrose Ave",
                    City = "Wheaton",
                    StateAbbreviation = "IL",
                    ZipCode = "60613"
                }
            };

            restaurants.Add(r1);
            restaurants.Add(r2);
            restaurants.Add(r3);

            return restaurants;
        }
        #endregion
    }
}