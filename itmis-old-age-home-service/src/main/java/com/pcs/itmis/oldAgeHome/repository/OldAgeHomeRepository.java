package com.pcs.itmis.oldAgeHome.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.oldAgeHome.entity.OldAgeHome;

@Repository
public interface OldAgeHomeRepository  extends JpaRepository<OldAgeHome, Long>{
 
  @Query(value = "select o from OldAgeHome o where o.fiscalYear=:fiscalYear and o.quarter=:quarter and o.userOrganization=:userOrganization")
  OldAgeHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter, Long userOrganization);

  
  @Query("select max(d.synchronizedDate) from OldAgeHome d ")
  LocalDate findMaxSynchronizedDate();

  @Query(value ="select d from OldAgeHome d where d.entryDate between :fromDate and :toDate and d.synchronizedDate is null")
List<OldAgeHome> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);
}
