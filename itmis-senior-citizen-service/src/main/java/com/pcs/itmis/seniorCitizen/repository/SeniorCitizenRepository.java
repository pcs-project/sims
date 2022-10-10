package com.pcs.itmis.seniorCitizen.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.seniorCitizen.entity.SeniorCitizen;

@Repository
public interface SeniorCitizenRepository extends JpaRepository<SeniorCitizen, Long> {

	@Query(value = "select s from SeniorCitizen s where s.fiscalYear=:fiscalYear and s.userOrganization=:userOrganization")
	SeniorCitizen getDataByFiscalYearAndOrganization(String fiscalYear, Long userOrganization);

	@Query("select max(d.synchronizedDate) from SeniorCitizen d ")
	LocalDate findMaxSynchronizedDate();

	@Query(value = "select d from SeniorCitizen d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
	List<SeniorCitizen> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	@Query(value = "select s from SeniorCitizen s where s.fiscalYear=:fiscalYear and s.quarter=:quarter and s.userOrganization=:userOrganization")
	SeniorCitizen getDataByFYQuarterOrganization(String fiscalYear, String quarter, Long userOrganization);

}
