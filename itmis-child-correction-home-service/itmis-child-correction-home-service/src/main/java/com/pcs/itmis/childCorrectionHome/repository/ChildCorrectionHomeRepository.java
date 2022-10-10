package com.pcs.itmis.childCorrectionHome.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.childCorrectionHome.entity.ChildCorrectionHome;

@Repository
public interface ChildCorrectionHomeRepository  extends JpaRepository<ChildCorrectionHome, Long>{

  @Query(value= "select c from ChildCorrectionHome c where c.fiscalYear=:fiscalYear and c.quarter=:quarter and c.userOrganization=:userOrganization")
  ChildCorrectionHome getDataByFiscalYearAndQuarter(String fiscalYear, String quarter, Long userOrganization);

}
