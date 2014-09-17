
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EmpManagement.DAL;
using EmpManagement.Models;
using System.Net;
using System.Data.Entity;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace EmpManagement.Controllers
{
    public class EmpController : Controller
    {
        private EmpContext db = new EmpContext();
      
        //Home page of the Employee
        public ActionResult Index()
        {
            return View();

        }
        //Display all data from database.
        public JsonResult LoadEmpdata()
        {
                var empdata = db.emp.ToList();
                if (empdata.Count == 0)
                {
                    return Json("Nodatafound", JsonRequestBehavior.AllowGet);
                }
                
                //return View(empdata);             
                var serializedata = JsonConvert.SerializeObject(empdata);
                return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        // If there is no data in Employee entity.
        public ActionResult Datanotavailable()
        {
            return View();
        }
      

        // Create
        // Add  new employee details in database
        public ActionResult Create()
        {
            return View();
         }

        //Get department for dropdownlist
        public JsonResult Getdepartment()
        {
            var depts = db.Dept.ToList();
            if (depts.Count == 0)
            {
                return Json("serializedata", JsonRequestBehavior.AllowGet);
            }
            var serializedata = JsonConvert.SerializeObject(depts);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
 
        }
        // If there is no department in dept table.
        public ActionResult DeptNotavailable()
        {
            return View();
        }

        public ActionResult Details()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Detail()
        {
            var empdetails = from m in db.emp
                             select m;
            var serializedata = JsonConvert.SerializeObject(empdetails);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }
        // Post Empmanagement/create
        [HttpPost]
        // Prevents from cross request site forgery 
      //  [ValidateAntiForgeryToken]
        public ActionResult create( Employee em)
        {
            //var depts = db.Dept.ToList();
            //SelectList deptlist1 = new SelectList(depts, "ID", "DName");
            //ViewBag.DeptList = deptlist1;
            //    if (ModelState.IsValid)
            //    {
                    db.emp.Add(em);
                    db.SaveChanges();
                //    return RedirectToAction("Index");
                //}            
                    return Json(em, JsonRequestBehavior.AllowGet);
        }

        // Details
        // Display details of the Employee
        //public ActionResult Details(int? id)
        //{
        //    var depts = db.Dept.ToList();
        //    SelectList deptlist1 = new SelectList(depts);
        //    ViewBag.DeptList = deptlist1;

        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    var e = db.emp.Find(id);
        //    if (e == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(e);
        //}

        //Edit
        // Redirect to the Edit page
        [HttpGet]
        public JsonResult Getemployeedata(int id)
        {
            //var depts = db.Dept.ToList();
            //SelectList deptlist1 = new SelectList(depts, "ID", "DName");
            //ViewBag.DeptList = deptlist1;
           
            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest,"no data found");
            //}
            var empdata = db.emp.Find(id);
             var serializedata = JsonConvert.SerializeObject(empdata);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
            //if (e == null)
            //{
            //    return HttpNotFound();
            //}
            //return View(e);
           
        }
        public ActionResult Edit()
        {
             return View();
        }
        // It will update data in entitty.
        [HttpPost]
        public JsonResult Edit(Employee em)
        {
            //    var depts = db.Dept.ToList();
            //    SelectList deptlist1 = new SelectList(depts, "ID", "DName");
            //    ViewBag.DeptList = deptlist1;

            //    if (ModelState.IsValid)
            //    {
            db.Entry(em).State = EntityState.Modified;
            db.SaveChanges();
            //  return RedirectToAction("Index");
            //}
            return Json(em, JsonRequestBehavior.AllowGet);
        }
        //Delete
        [HttpPost]
        public ActionResult Delete(int id)
        {

            var deptdata = db.emp.Find(id);
            db.emp.Remove(deptdata);
            db.SaveChanges();
           
            var serializedata = JsonConvert.SerializeObject(deptdata);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
            //var depts = db.Dept.ToList();
            //SelectList deptlist1 = new SelectList(depts);
            //ViewBag.DeptList = deptlist1;

            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}
            //var e = db.emp.Find(id);
            //if(e == null)
            //{
            //    return HttpNotFound();
            //}
            ////var serializedata = JsonConvert.SerializeObject(e);
            //return View(e);
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, String submit)
        //{

        //    if (submit.Equals("Yes"))
        //    {
        //        //var e = db.emp.Find(id);
        //        //var serializedata = JsonConvert.SerializeObject(e);
        //        var e = db.emp.Find(id);
        //        db.emp.Remove(e);
        //        db.SaveChanges();
        //        //return View(serializedata);
        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return RedirectToAction("Index");
        //    }
        //}
               
    }
}
