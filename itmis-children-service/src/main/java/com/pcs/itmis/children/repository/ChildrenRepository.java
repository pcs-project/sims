package com.pcs.itmis.children.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.children.entity.Children;

@Repository
public interface ChildrenRepository extends JpaRepository<Children, Long> {

	@Query(value = "select c from Children c where c.fiscalYear=:fiscalYear and c.userOrganization=:userOrganization")
	Children getDataByFiscalYearAndOrganization(String fiscalYear, Long userOrganization);

	@Query("select max(c.synchronizedDate) from Children c ")
	LocalDate findMaxSynchronizedDate();

	@Query(value = "select c from Children c where c.entryDate between :fromDate and :toDate and c.synchronizedDate is null")
	List<Children> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);

	@Query(value = "select c from Children c where c.fiscalYear=:fiscalYear and c.quarter=:quarter and c.userOrganization=:userOrganization")
	Children getDataByFYQuarterOrganization(String fiscalYear, String quarter, Long userOrganization);
}
