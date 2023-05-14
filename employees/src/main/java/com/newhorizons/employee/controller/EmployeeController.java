package com.newhorizons.employee.controller;

import com.newhorizons.employee.domain.Employee;
import com.newhorizons.employee.domain.dto.EmployeeDto;
import com.newhorizons.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/new-horizons/services/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @PostMapping(value = "")
    public Employee saveEmployee(@RequestBody EmployeeDto employee){
        return employeeService.saveEmployee(employee);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id) {
        return employeeService.getEmployee(id);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Employee>> getEmployees() {
        return employeeService.getEmployees();
    }

    @PutMapping(value = "/{id}")
    public Employee updateEmployee(@RequestBody EmployeeDto employee, @PathVariable("id") Long id){
        return employeeService.updateEmployee(employee, id);
    }

    @DeleteMapping(value = "/{id}")
    public Employee deleteEmployee(@PathVariable("id") Long id){
        return employeeService.deleteEmployee(id);
    }

    public void notFound(){
    }
}
