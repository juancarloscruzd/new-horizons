package com.newhorizons.employee.domain.dto;


import java.util.Date;


public class EmployeeDto {

    private String name;

    private String lastName;

    private String dni;

    private String gender;

    private Date dob;

    private String email;

    private String mobilePhone;

    public EmployeeDto(String name, String lastName, String dni, String gender, Date dob, String email, String mobilePhones) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.gender = gender;
        this.dob = dob;
        this.email = email;
        this.mobilePhone = mobilePhones;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }
}
