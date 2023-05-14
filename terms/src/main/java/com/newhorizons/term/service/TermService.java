package com.newhorizons.term.service;

import com.newhorizons.term.domain.Term;
import com.newhorizons.term.domain.dto.TermDto;
import com.newhorizons.term.repository.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TermService {

    private TermRepository termRepository;

    @Autowired
    public TermService(TermRepository termRepository){
        this.termRepository = termRepository;
    }
    
    public Term saveTerm(TermDto termDto){
        Term termModel = new Term();
        termModel.setName(termDto.getName());
        termModel.setStart_date(termDto.getStart_date());
        termModel.setEnd_date(termDto.getEnd_date());
        termModel.setNon_working_days(termDto.getNon_working_days());
        termModel.setStatus(termDto.getStatus());

        return termRepository.save(termModel);
    }

    public ResponseEntity<Term> getTerm(Long id){
        Optional<Term> termData = termRepository.findById(id);

        if (termData.isPresent()) {
            return new ResponseEntity<>(termData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<Term>> getTerms() {
        List<Term> termsData = termRepository.findAll();
        return new ResponseEntity<>(termsData, HttpStatus.OK);
    }

    public Term updateTerm(TermDto termDto, Long id){
        Term termToUpdate = termRepository.getOne(id);

        termToUpdate.setName(termDto.getName());
        termToUpdate.setStart_date(termDto.getStart_date());
        termToUpdate.setEnd_date(termDto.getEnd_date());
        termToUpdate.setNon_working_days(termDto.getNon_working_days());
        termToUpdate.setStatus(termDto.getStatus());

        return termRepository.save(termToUpdate);
    }

    public Term deleteTerm(Long id){
        Term termToDelete = termRepository.getOne(id);
        termToDelete.setStatus("deleted");
        return termRepository.save(termToDelete);

    }
}
