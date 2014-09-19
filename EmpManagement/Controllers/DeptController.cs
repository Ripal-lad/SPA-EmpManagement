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
            var department = from m in db.Department
                             select m;

            return View(department);
        }

        // to get the detail of the department.
        [HttpGet]
        public JsonResult GetDepartment()
        {
            var department = from m in db.Department
                             select m;

            var serializedata = JsonConvert.SerializeObject(department);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Details()
        {
            return View();
        }

        //get data for dept details.
        [HttpGet]
        public JsonResult GetEmployee()
        {
            var EmployeeList = from m in db.Employee
                             select m;
            var serializedata = JsonConvert.SerializeObject(EmployeeList);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        //If dept table is empty.
        [HttpGet]
        public JsonResult NoDepartmentFound()
        {
            var DepartmentList = db.Department.ToList();
            if (DepartmentList.Count == 0)
            {
                return Json("Nodatafound", JsonRequestBehavior.AllowGet);
            }
            var serializedata = JsonConvert.SerializeObject(DepartmentList);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
        }

        //Create
        public ActionResult Create()
        {
             return View();
        }

        // Post Empmanagement/Ecreate
        [HttpPost]
        public ActionResult Create(Department department)
        {
                    db.Department.Add(department);
                    db.SaveChanges();

                    return Json(department, JsonRequestBehavior.AllowGet);
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
        public ActionResult Edit(Department department)
        {
                db.Entry(department).State = EntityState.Modified;
                db.SaveChanges();

                return Json(department, JsonRequestBehavior.AllowGet);
            
        }

          
        // Display details of the Employee
        [HttpGet]
        public JsonResult LoadEmployee(int id)
        {

            var EmployeeList = db.Employee.ToList();
            for (int i = 0; i < EmployeeList.Count; i++) // It will Check wheather employees exist in respective department
            {
                if (EmployeeList[i].DeptID == id)
                {
                    var empdetails = from e in db.Employee
                                     where e.DeptID == id
                                     select e;
                    var serializedata = JsonConvert.SerializeObject(empdetails);
                    return Json(serializedata, JsonRequestBehavior.AllowGet);
                 }
            }
            return Json("Nodatafound", JsonRequestBehavior.AllowGet);
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
            var department = db.Department.Find(id);
            db.Department.Remove(department);
            db.SaveChanges();
            var serializedata = JsonConvert.SerializeObject(department);
            return Json(serializedata, JsonRequestBehavior.AllowGet);
         }
       

    }
}