package com.pcs.itmis.womenAndMinorities.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.womenAndMinorities.entity.WomenAndMinorities;

@Repository
public interface WomenAndMinoritiesRepository extends JpaRepository<WomenAndMinorities, Long> {

	// To get data of particular fiscal year and organization
	@Query(value = "select w from WomenAndMinorities w where w.fiscalYear=:fiscalYear and w.userOrganization=:userOrganization")
	WomenAndMinorities getDataByFiscalYearAndOrganization(String fiscalYear, Long userOrganization);

	@Query("select max(d.synchronizedDate) from WomenAndMinorities d ")
	LocalDate findMaxSynchronizedDate();

	@Query(value = "select d from WomenAndMinorities d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<WomenAndMinorities> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	@Query(value = "select w from WomenAndMinorities w where w.fiscalYear=:fiscalYear and  w.quarter=:quarter and w.userOrganization=:userOrganization")
	WomenAndMinorities getDataByFYQuarterOrganization(String fiscalYear, String quarter, Long userOrganization);
}
