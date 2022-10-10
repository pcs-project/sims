package com.pcs.itmis.childHome.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.childHome.entity.ChildHome;

@Repository
public interface ChildHomeRepository extends JpaRepository<ChildHome, Long> {
  
  @Query(value = "select c from ChildHome c where c.fiscalYear=:fiscalYear and c.quarter=:quarter and c.userOrganization=:userOrganization")
  ChildHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter, Long userOrganization);
  
  @Query("select max(d.synchronizedDate) from ChildHome d ")
  LocalDate findMaxSynchronizedDate();

  @Query(value ="select d from ChildHome d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
List<ChildHome> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);
}
