package com.newhorizons.employee.service;


import com.newhorizons.employee.domain.Employee;
import com.newhorizons.employee.domain.dto.EmployeeDto;
import com.newhorizons.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee saveEmployee(EmployeeDto employeeDto){
        Employee employeeModel = new Employee();
        setEmployeeModel(employeeDto, employeeModel);

        return employeeRepository.save(employeeModel);
    }

    public void setEmployeeModel(EmployeeDto employeeDto, Employee employeeModel) {
        employeeModel.setName(employeeDto.getName());
        employeeModel.setLastName(employeeDto.getLastName());
        employeeModel.setDni(employeeDto.getDni());
        employeeModel.setGender(employeeDto.getGender());
        employeeModel.setDob(employeeDto.getDob());
        employeeModel.setEmail(employeeDto.getEmail());
        employeeModel.setMobilePhone(employeeDto.getMobilePhone());
        employeeModel.setActive(true);
    }

    public ResponseEntity<Employee> getEmployee(Long id){
        Optional<Employee> employeeData = employeeRepository.findById(id);

        return employeeData.map(employee -> new ResponseEntity<>(employee, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employeesData = employeeRepository.findAll();
        return new ResponseEntity<>(employeesData, HttpStatus.OK);
    }

    public Employee updateEmployee(EmployeeDto employeeDto, Long id) {
        Employee employeeToUpdate = employeeRepository.getOne(id);
        setEmployeeModel(employeeDto, employeeToUpdate);
        return employeeRepository.save(employeeToUpdate);
    }

    public Employee deleteEmployee(Long id) {
        Employee employeeToDelete = employeeRepository.getOne(id);
        employeeToDelete.setActive(Boolean.FALSE);
        return employeeRepository.save(employeeToDelete);
    }
}
