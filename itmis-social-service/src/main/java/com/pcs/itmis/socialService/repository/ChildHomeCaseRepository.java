package com.pcs.itmis.socialService.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.socialService.entity.ChildHomeCase;

@Repository
public interface ChildHomeCaseRepository extends JpaRepository<ChildHomeCase, Long>{
	
	  @Query("select max(d.synchronizedDate) from ChildHomeCase d ")
	  LocalDate findMaxSynchronizedDate();

	  @Query(value ="select d from ChildHomeCase d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<ChildHomeCase> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	List<ChildHomeCase> findByUserOrganization(Long organizationId);

}
