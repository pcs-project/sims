package com.pcs.itmis.childCorrectionHome.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CHILD_CORRECTION_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChildCorrectionHome {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long childCorrectionHomeId;

  private String fiscalYear;
  private String quarter;

  private Long totChildCorrectionHome;
  private String totChildCorrectionHomeSource;

  private Long boysReceivingServicesInCch;
  private Long girlsReceivingServicesInCch;
  private Long dalitReceivingServicesInCch;
  private Long ethnicMinoritiesReceivingServicesInCch;
  private Long janajatiReceivingServicesInCch;
  private Long madhesiReceivingServicesInCch;
  private Long brahminReceivingServicesInCch;
  private String childReceivingServicesInCchSource;

  private Long boysRehabilitatedFromCch;
  private Long girlsRehabilitatedFromCch;
  private Long rehabilitatedFromHome;
  private Long rehabilitatedFromOjt;
  private Long rehabilitatedFromOutOfCommunity;
  private Long rehabilitatedFromAdoption;
  private Long rehabilitatedFromFosterHome;
  private String childRehabilitatedSource;

  private Long budgetForChildCorrectionHome;
  private String budgetForChildCorrectionHomeSource;

  private String status;
  private String entryBy;
  private Long userOrganization;

  @Temporal(TemporalType.DATE)
  private Date entryDate;

  public void copyData(ChildCorrectionHome nDetails) {
    this.totChildCorrectionHome = nDetails.totChildCorrectionHome;
    this.totChildCorrectionHomeSource = nDetails.totChildCorrectionHomeSource;
    this.boysReceivingServicesInCch = nDetails.boysReceivingServicesInCch;
    this.girlsReceivingServicesInCch = nDetails.girlsReceivingServicesInCch;
    this.dalitReceivingServicesInCch = nDetails.dalitReceivingServicesInCch;
    this.ethnicMinoritiesReceivingServicesInCch = nDetails.ethnicMinoritiesReceivingServicesInCch;
    this.janajatiReceivingServicesInCch = nDetails.janajatiReceivingServicesInCch;
    this.madhesiReceivingServicesInCch = nDetails.madhesiReceivingServicesInCch;
    this.brahminReceivingServicesInCch = nDetails.brahminReceivingServicesInCch;
    this.childReceivingServicesInCchSource = nDetails.childReceivingServicesInCchSource;
    this.boysRehabilitatedFromCch = nDetails.boysRehabilitatedFromCch;
    this.girlsRehabilitatedFromCch = nDetails.girlsRehabilitatedFromCch;
    this.rehabilitatedFromHome = nDetails.rehabilitatedFromHome;
    this.rehabilitatedFromOjt = nDetails.rehabilitatedFromOjt;
    this.rehabilitatedFromOutOfCommunity = nDetails.rehabilitatedFromOutOfCommunity;
    this.rehabilitatedFromAdoption = nDetails.rehabilitatedFromAdoption;
    this.rehabilitatedFromFosterHome = nDetails.rehabilitatedFromFosterHome;
    this.childRehabilitatedSource = nDetails.childRehabilitatedSource;
    this.budgetForChildCorrectionHome = nDetails.budgetForChildCorrectionHome;
    this.budgetForChildCorrectionHomeSource = nDetails.budgetForChildCorrectionHomeSource;
    this.status = nDetails.status;
  }
}
