using EmpManagement.DAL;
using EmpManagement.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace EmpManagement.Controllers
{
    public class DeptController : Controller
    {
        private EmpContext db = new EmpContext();
       
        // display the home page of the department
        public ActionResult Index()
        {
            var Department = from m in db.Dept
                             select m;                    
                         
            return View(Department);
        }

        // to get the detail of the department.
        [HttpGet]
        public JsonResult Getdepartment()
        {
            var Department = from m in db.Dept
                             select m;

            var serializedata = JsonConvert.SerializeObject(Department);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details()
        {
            return View();
        }

        //get data for dept details.
        [HttpGet]
        public JsonResult Getempdata()
        {
            var empdetails = from m in db.emp
                             select m;
            var serializedata = JsonConvert.SerializeObject(empdetails);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }
        //Create
        public ActionResult Create()
        {
             return View();
        }

        // Post Empmanagement/Ecreate
        [HttpPost]
        public ActionResult create( Dept d)
        {
                    db.Dept.Add(d);
                    db.SaveChanges();

                    return Json(d, JsonRequestBehavior.AllowGet);
             
        }
        
        public ActionResult DeptAlreadyExist()
        {
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }


        // It will Update data in entitty.
        [HttpPost]
      //  [ValidateAntiForgeryToken]
        public ActionResult Edit(Dept d)
        {
                db.Entry(d).State = EntityState.Modified;
                db.SaveChanges();
                
                return Json(d, JsonRequestBehavior.AllowGet);
            
        }

          
        // Display details of the Employee
        [HttpGet]
        public JsonResult LoadEmpdata(int id)
        {
            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}
            var empdata = db.emp.ToList();
            for (int i = 0; i < empdata.Count; i++) // It will Check wheather employees exist in respective department
            {
                if (empdata[i].DeptID == id)
                {
                    var empdetails = from e in db.emp
                                     where e.DeptID == id
                                     select e;
                    var serializedata = JsonConvert.SerializeObject(empdetails);
                    return Json(serializedata, JsonRequestBehavior.AllowGet);
                    //return View(empdetails);
                }
            }
            return Json("serializedata", JsonRequestBehavior.AllowGet);
        }

        public ActionResult NoDataFound()
        {
            return View();
        }

        //Delete
        //[HttpDelete]
        [HttpPost]
        public JsonResult Delete(int id)
        {
            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}
            var deptdata = db.Dept.Find(id);
            db.Dept.Remove(deptdata);
            db.SaveChanges();
            var serializedata = JsonConvert.SerializeObject(deptdata);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
            //return View(deptdata);
        }
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, String submit)
        //{
        //    //var deptdata = db.Dept.Find(id);

        //    //    return Json(serializedata, JsonRequestBehavior.AllowGet);
        //    if (submit.Equals("Yes"))
        //    {
        //        var e = db.Dept.Find(id);
        //        db.Dept.Remove(e);
        //        db.SaveChanges();

        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return RedirectToAction("Index");
        //    }
        //}


    }
}