package com.pcs.itmis.humanTrafficking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.humanTrafficking.entity.SewaKendra;

@Repository
public interface SewaKendraRepository extends JpaRepository<SewaKendra, Long>{

	  @Query(value = "select s from SewaKendra s where s.fiscalYear=:fiscalYear and s.quarter=:quarter and s.userOrganization=:userOrganization")
	  SewaKendra getDataByFiscalYearAndQuarter(String fiscalYear, String quarter, Long userOrganization);
	  
	  @Query("select max(s.synchronizedDate) from SewaKendra s")
	  LocalDate findMaxSynchronizedDate();

	  @Query(value ="select s from SewaKendra s where s.entryDate between :fromDate and :toDate and s.synchronizedDate is null")
	  List<SewaKendra> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

}
