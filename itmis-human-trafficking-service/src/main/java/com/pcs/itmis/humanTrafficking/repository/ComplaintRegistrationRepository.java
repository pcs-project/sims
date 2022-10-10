package com.pcs.itmis.humanTrafficking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.humanTrafficking.entity.ComplaintRegistration;

@Repository
public interface ComplaintRegistrationRepository extends JpaRepository<ComplaintRegistration, Long>{

  @Query(value = "select c from ComplaintRegistration c where c.fiscalYear=:fiscalYear and c.quarter=:quarter and c.userOrganization=:userOrganization")
  ComplaintRegistration getDataByFiscalYearAndQuarter(String fiscalYear, String quarter, Long userOrganization);


  @Query("select max(c.synchronizedDate) from ComplaintRegistration c ")
  LocalDate findMaxSynchronizedDate();

  @Query(value ="select c from ComplaintRegistration c where c.entryDate between :fromDate and :toDate and c.synchronizedDate is null")
List<ComplaintRegistration> findAllBetweenFromAndToDate(LocalDate fromDate, LocalDate toDate);
}
