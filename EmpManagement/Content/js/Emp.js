  
//Create
var flag = false;
   
$(document).ready(function () {
    alert("hello");
    $(".index").show();
    //$(".divedit").hide();
    //$(".divdetail").hide();
    //console.log("Hello");
    $(".create12").click(function (event) {
        event.preventDefault();
       // alert("hello");
    
        console.log("hello");
        //alert("dept" + dept);
        $.ajax({
            type: 'GET',
            url: "/Emp/Getdepartment/",
            datatype: 'json',
            success: function (data) {
                //alert("success");
                if (data == undefined) {
                    alert("data undefined");
                    window.location.href = "/Emp/DeptNotavailable";
                }
                else {
                    //alert("data defined");
                    window.location.href = "/Emp/Create";
                }   
                   
            },            
            error: function (xhr, status, errorThrown, data) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
            }
        });
        
    });
    //Inside create view
    $(".btncreate").click(function () {

        var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
        var regdesignation = /^[A-Za-z- ]+$/;
        $("#errorname").html("");
        $("#errordept").html("");
        $("#erroremailid").html("");
        $("#errorcontactno").html("");
        $("#errordesignation").html("");
        //alert("hi");
        var name = document.getElementById("txtname").value;
        var designation = document.getElementById("txtdesignation").value;
        var emailid = document.getElementById("txtemailid").value;
        var department = document.getElementById("ddldept").value;
        var contactno = document.getElementById("txtcontactno").value;
        //alert("name " + name + designation + emailid + "dept = " + department + contactno);
        // email validation
        if (emailid != "") {
            if (!(emailid.match(regexemail))) {
                $("#erroremailid").html("Invalid Email-id");
                //alert("inside match else");
            }
        }
        else {
            $("#erroremailid").html("This field is required.");
        }

        //name validation
        if (name != "") {
            if (!(name.match(regexname))) {
                $("#errorname").html("Text only.");
            }
        }
        else {
            $("#errorname").html("This field is required.");
        }

        // Designation Validation       
        if (designation != "") {
            if (!(designation.match(regdesignation))) {
                $("#errordesignation").html("Text only.");
            }
        }
        else {

            $("#errordesignation").html("This field is required.");
        }
        //department validation
        if (department == "") {
            $("#errordept").html("This field is required.");
        }

        //contactno validation
        if (contactno == "") {
            $("#errorcontactno").html("This field is required.");
        }

        if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
            alert("inside else");
        }
        else {
            $.ajax({
                type: 'Post',
                url: "/Emp/Create/",
                datatype: 'json',
                data: { "Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                success: function (data) {
                    console.log("Success");
                    alert("Employee detail added successfuly.");
                    window.location.href = "../Emp/Index/";
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                },
            });
        }
    });

    //Edit
    //retrieve data for update
    $(".edit").click(function () {
        alert("hi");
        $(".divedit").show(); 
        //var id = document.getElementById("id").value;
        //alert("id = " + id);
        $(".index").hide();
        var id = $(this).attr("id");
       // alert("id = " + id);
        $.ajax({
            type: 'GET',
            url: "/Emp/Getemployeedata/" + id + "",
            datatype: 'json',
            data: { "ID ": "" + id + "" },
            success: function (data) {
                //alert("success");
                var empdata = JSON.parse(data);
                $.ajax({
                    type: 'GET',
                    url: "/Emp/Getdepartment/",
                    datatype: 'json',
                    success: function (data) {
                        $(".divedit").show();
                        var tr;
                        tr = $("<tr></tr>");
                        tr.append("<h2 style='color:blue' align ='center'> Update details of " + empdata.Name + "  </h2> ")
                        $("#tableedit").append(tr);

                        tr = $("<tr></tr>");
                        tr.append("<td><input type = 'hidden' id='txtid' value = " + empdata.ID + ">  </td> ")
                        $("#tableedit").append(tr);

                        tr = $("<tr></tr>");
                        tr.append("<td> Name : </td> <td><input type = 'text' id='txtname' value = " + empdata.Name + "> <div id='errorname'></div> </td> ")
                        $("#tableedit").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td> Designation : </td> <td><input type = 'text' id='txtdesignation' value = " + empdata.Designation + ">  <div id='errordesignation'></div></td>")
                        $("#tableedit").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td>Department</td>")
                        var department = JSON.parse(data);
                        //alert(data);
                        var select = $("<select><div id='errordept'></div></select>");
                        $.each((department), function (key, value) {

                            if (empdata.DeptID == value.ID) {

                                select.append("<Option value = " + value.ID + " selected id='ddldept'>" + value.DName + "</Option>");
                            }
                            else {
                                select.append("<Option value = " + value.ID + " id='ddldept'>" + value.DName + "</Option>");
                            }

                            tr.append(select);
                            $("#tableedit").append(tr);

                        });
                        tr = $("<tr></tr>");
                        tr.append("<td> Emailid : </td> <td><input type = 'text' id='txtemailid' value = " + empdata.Emailid + "> <div id='erroremailid'></div> </td>")
                        $("#tableedit").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td> ContactNo : </td> <td><input type = 'text' id ='txtcontactno' value = " + empdata.ContactNo + "> <div id='errorcontactno'></div> </td>")
                        $("#tableedit").append(tr);
                       
                    },
                    error: function (xhr, status, errorThrown, data) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                        alert("error :" + " " + errorThrown + " " + "Status: " + " " + status + "data : " + data);
                    }
                });

                // window.location.href = "/Emp/Edit";

            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                alert("error :" + " " + errorThrown + " " + "Status: " + " " + status);
            }
        });

    });

    $(".update").click(function(){ 
        $(".divedit").show(); 
        alert("Hello");

        var regexemail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var regexname = /^[A-Z]+[a-zA-Z''-'\s]*$/;
        var regdesignation = /^[A-Za-z- ]+$/;

        $("#errorname").html("");
        $("#errordept").html("");
        $("#erroremailid").html("");
        $("#errorcontactno").html("");
        $("#errordesignation").html("");
        //alert("hi");
        var id = document.getElementById("txtid").value;
       // alert("id " +id);
        var name = document.getElementById("txtname").value;        
        var designation = document.getElementById("txtdesignation").value;
        var emailid = document.getElementById("txtemailid").value;
        var department = document.getElementById("ddldept").value;
        var contactno = document.getElementById("txtcontactno").value;
      //  alert("name " + name + designation + emailid + "dept = " + department + contactno);
        // email validation
        if (emailid != "") {
            if (!(emailid.match(regexemail))) {
                $("#erroremailid").html("Invalid email-id");
                //alert("inside match else");
            }           
        }
        else{           
            $("#erroremailid").html("This field is required.");
        }

        //name validation
        if (name != "") {
            if (!(name.match(regexname))) {
                $("#errorname").html("Text only.");
            }                      
        }
        else {
            $("#errorname").html("This field is required.");
        }

        // Designation Validation       
        if (designation != "") {
            if (!(designation.match(regdesignation))) {
                $("#errordesignation").html("Text only.");
            }
        }
        else {

            $("#errordesignation").html("This field is required.");
        }
        //department validation
        if (department == "") {
            $("#errordept").html("This field is required.");
        }

        //contactno validation
        if (contactno == "") {
            $("#errorcontactno").html("This field is required.");
        }

        if (name == "" || department == "" || emailid == "" || designation == "" || contactno == "") {
            alert("inside else");
        } else {
            $.ajax({
                type: 'Post',
                url: "/Emp/Edit/",
                datatype: 'json',
                data: { "ID":""+id +"","Name": "" + name + "", "Designation": "" + designation + "", "ContactNo": "" + contactno + "", "Emailid": "" + emailid + "", "DeptID": "" + department + "" },
                success: function (data) {
                    console.log("Success");
                    alert("Employee detail updated successfuly.");
                    window.location.href = "/Emp/Index/";
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                },
            });
        }
    });
    
    //Detail

    $(".detail").click(function () {
        alert("hi");
        $(".index").hide();
        $(".divdetail").show();
        var id = $(this).attr("id");
        alert(id);
        $.ajax({
            type: 'GET',
            url: "/Emp/Detail/",
            datatype: 'json',
            success: function (data) {
                alert("success");
                console.log("success" + "data = " + data);
                var empdata = data;               
                alert("empdata = "+empdata);
                 $.each((JSON.parse(data)), function (key, value) {
                    //  alert("inside each");
                    //console.log(key + ": " + value);
                    //  alert(id +" " +value.DeptID + "key  " + key.DeptID );
                    var tr;
                    var div;
                    // alert(id + " " + value.ID);
                    if (id == (value.ID)) {
                        var deptid=value.ID;
                        flag = true;
                        $.ajax({
                            type: 'GET',
                            url: "/Emp/Getdepartment/",
                            datatype: 'json',
                            success: function (data) {
                                alert("dept success");
                                var department = JSON.parse(data);
                                //alert(data);
                      
                                $.each((department), function (key, value) {
                                    alert("dept = " + value.ID + " emp = " +deptid);
                                    if (deptid == value.ID) {

                                        select.append("<Option value = " + value.ID + " selected id='ddldept'>" + value.DName + "</Option>");
                                    }
                                    else {
                                        select.append("<Option value = " + value.ID + " id='ddldept'>" + value.DName + "</Option>");
                                    }

                                    tr.append(select);
                                    $("#tabledetail").append(tr);

                                });
                        tr = $("<tr></tr>");
                        tr.append("<h2 style='color:blue' align ='center'>  Details of " + value.Name + "  </h2> ")
                        $("#tabledetail").append(tr);


                        tr = $("<tr></tr>");
                        tr.append("<td> Name : </td> <td>" + value.Name + " </td> ")
                        $("#tabledetail").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td> Designation : </td> <td> " + value.Designation + "</td>")
                        $("#tabledetail").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td>Department</td>")
                        
                        tr = $("<tr></tr>");
                        tr.append("<td> Emailid : </td> <td> " + value.Emailid + " </td>")
                        $("#tabledetail").append(tr);
                        tr = $("<tr></tr>");
                        tr.append("<td> ContactNo : </td> <td> " + value.ContactNo + " </td>")
                        $("#tabledetail").append(tr);

                    };
                 });
               
                },
                });
                
            }
            
            });
        
   
    

//cancel

    $(".cancel").click(function(){
    
        alert("hello");
        $("#txtname").val('');        
        $("#txtdesignation").val('');
        $("#ddldept").val('');
        $("#txtcontactno").val('');
        $("#txtemailid").val('');
        $("#errorname").html("");
        $("#errordept").html("");
        $("#erroremailid").html("");
        $("#errorcontactno").html("");
        $("#errordesignation").html("");
    })


    //Delete
    $(".delete").click(function (event) {
        //  alert("hi");
        event.preventDefault();
        var id = $(this).attr("id");
        alert("id = "+ id);
        var name = $(this).attr("name");
        //alert("name = " + name);
        if (confirm("Are you sure that you want to delete details of " + name + " ?")) {
            $.ajax({
                type: 'POST',
                url: "/Emp/Delete/",
                datatype: 'json',
                data: { "ID": "" + id + "" },
                success: function (data) {
                    alert("success");
                    var deptdata = JSON.parse(data);
                    console.log("Success");
                    console.log("details of "+deptdata.Name + " is deleted sucessfuly ");
                    alert("details of " + deptdata.Name + " is deleted successfully ");
                    // $.load("../Dept/Index/");
                    window.location.href = "/Emp/Index";
                },
                error: function (xhr, status, errorThrown) {

                    alert("error");
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
    });


})

