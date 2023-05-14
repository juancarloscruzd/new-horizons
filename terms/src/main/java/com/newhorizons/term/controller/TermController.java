package com.newhorizons.term.controller;

import com.newhorizons.term.domain.Term;
import com.newhorizons.term.domain.dto.TermDto;
import com.newhorizons.term.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/new-horizons/services/terms")
public class TermController {

    private TermService termService;

    @Autowired
    public TermController(TermService termService){
        this.termService = termService;
    }

    @PostMapping(value = "")
    public Term saveTerm(@RequestBody TermDto term){
        return termService.saveTerm(term);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Term> getTerm(@PathVariable("id") Long id) {
        return termService.getTerm(id);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Term>> getTerm() {
        return termService.getTerms();
    }

    @PutMapping(value = "/{id}")
    public Term updateTerm(@RequestBody TermDto term, @PathVariable("id") Long id){
        return termService.updateTerm(term, id);
    }

    @DeleteMapping(value = "/{id}")
    public Term deleteTerm(@PathVariable("id") Long id){
        return termService.deleteTerm(id);
    }

    public void notFound(){
    }
}


