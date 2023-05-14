package com.newhorizons.term.domain.dto;

public class TermDto {

    private Long id;
    private String name;
    private String start_date;
    private String end_date;
    private String non_working_days;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getNon_working_days() {
        return non_working_days;
    }

    public void setNon_working_days(String non_working_days) {
        this.non_working_days = non_working_days;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TermDto(String name, String term_id, String start_date, String end_date,String non_working_days,String status) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.non_working_days = non_working_days;
        this.status = status;
    }
}
