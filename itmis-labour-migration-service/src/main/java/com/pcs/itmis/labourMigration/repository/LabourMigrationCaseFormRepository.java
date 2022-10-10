package com.pcs.itmis.labourMigration.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pcs.itmis.labourMigration.entity.LabourMigrationCaseForm;

public interface LabourMigrationCaseFormRepository extends JpaRepository<LabourMigrationCaseForm, Long>{
	
	  @Query("select max(d.synchronizedDate) from LabourMigrationCaseForm d ")
	  LocalDate findMaxSynchronizedDate();

	  @Query(value ="select d from LabourMigrationCaseForm d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<LabourMigrationCaseForm> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);
	  
	  
	  LabourMigrationCaseForm findByLabourMigrationCaseFormId(Long labourMigrationCaseFormId);

}
