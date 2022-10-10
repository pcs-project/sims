package com.pcs.itmis.labourMigration.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.labourMigration.entity.LabourMigrationIndicator;

@Repository
public interface LabourMigrationIndicatorRepository extends JpaRepository<LabourMigrationIndicator, Long> {

	@Query(value = "select l from LabourMigrationIndicator l where l.fiscalYear=:fiscalYear and l.userOrganization=:userOrganization")
	LabourMigrationIndicator getDataByFiscalYearAndOrganization(String fiscalYear, Long userOrganization);

	@Query("select max(d.synchronizedDate) from LabourMigrationIndicator d ")
	LocalDate findMaxSynchronizedDate();

	@Query(value = "select d from LabourMigrationIndicator d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<LabourMigrationIndicator> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	@Query(value = "select l from LabourMigrationIndicator l where l.fiscalYear=:fiscalYear and l.quarter=:quarter and l.userOrganization=:userOrganization")
	LabourMigrationIndicator getDataByFYQuarterOrganization(String fiscalYear, String quarter, Long userOrganization);

}
