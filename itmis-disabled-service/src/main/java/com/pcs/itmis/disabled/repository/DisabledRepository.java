package com.pcs.itmis.disabled.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.disabled.entity.Disabled;

@Repository
public interface DisabledRepository extends JpaRepository<Disabled, Long> {

	@Query(value = "select d from Disabled d where d.fiscalYear=:fiscalYear and d.userOrganization=:userOrganization")
	Disabled getDataByFiscalYearAndOrganization(String fiscalYear, Long userOrganization);

	@Query("select max(d.synchronizedDate) from Disabled d ")
	LocalDate findMaxSynchronizedDate();

	@Query(value = "select d from Disabled d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<Disabled> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	@Query(value = "select d from Disabled d where d.fiscalYear=:fiscalYear and d.quarter=:quarter and d.userOrganization=:userOrganization")
	Disabled getDataByFYQuarterOrganization(String fiscalYear, String quarter, Long userOrganization);

}
