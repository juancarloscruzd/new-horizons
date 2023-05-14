package com.newhorizons.term.repository;

import com.newhorizons.term.domain.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {

}

