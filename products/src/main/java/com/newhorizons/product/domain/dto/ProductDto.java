package com.newhorizons.product.domain.dto;

public class ProductDto {

    private String name;
    private String edition;
    private String code;
    private Float theoretical_hours;
    private Float practical_hours;
    private String type;
    private String mode;
    private Float price;
    private String status;
    private Boolean available;


    public ProductDto(
            String name,
            String edition,
            String code,
            Float theoretical_hours,
            Float practical_hours,
            String type,
            String mode,
            Float price,
            String status,
            Boolean available) {
        this.name = name;
        this.edition = edition;
        this.code = code;
        this.theoretical_hours = theoretical_hours;
        this.practical_hours = practical_hours;
        this.type = type;
        this.mode = mode;
        this.price = price;
        this.status = status;
        this.available = available;
    }

    /*Se genera los metodos*/

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Float getTheoretical_hours() {
        return theoretical_hours;
    }

    public void setTheoretical_hours(Float theoretical_hours) {
        this.theoretical_hours = theoretical_hours;
    }

    public Float getPractical_hours() {
        return practical_hours;
    }

    public void setPractical_hours(Float practical_hours) {
        this.practical_hours = practical_hours;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
