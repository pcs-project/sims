package com.pcs.itmis.socialService.entity;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "JUVENILE_CORRECTION_HOME_TIP")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "juvenileCorrectionHome")
public class JuvenileCorrectionHomeTip {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long juvenileCorrectionHomeTipId;

  @OneToOne
  @MapsId
  @JsonBackReference
  @JoinColumn(name = "juvenileCorrectionHomeId")
  private JuvenileCorrectionHome juvenileCorrectionHome;
  
  private String tipSource;
  private String tipDestination;
  private String countryOfExploitation;
  private String tipAct;
  private String tipActDetail;
  private String tipMeans;
  private String tipMeansDetail;
  private String tipPurpose;
  private String tipCaseStatus;
  private String reasonForLeavingHome;
  private String relationWithTrafficker;
  private String recruitingFee;
  private String shelterServiceReceived;
  private String serviceProviderName;
  private String serviceProviderType;
  private String serviceReceivedType;
  private String referralServiceReceived;
  private String referralServiceType;
  private String tipRehabilitation;
  private String tipRehabilitatedTo;
  private String tipRehabilitatedToDetail;
  private String caseStatus;
  private String referralCaseStatus;
  private String referredService;
  private String referredProviderName;

  private String entryBy;
  private LocalDate entryDate;
  
  public void copyTipData(JuvenileCorrectionHomeTip nDetails) {
    this.tipSource = nDetails.tipSource;
    this.tipDestination = nDetails.tipDestination;
    this.countryOfExploitation = nDetails.countryOfExploitation;
    this.tipAct = nDetails.tipAct;
    this.tipActDetail = nDetails.tipActDetail;
    this.tipMeans = nDetails.tipMeans;
    this.tipMeansDetail = nDetails.tipMeansDetail;
    this.tipPurpose = nDetails.tipPurpose;
    this.tipCaseStatus = nDetails.tipCaseStatus;
    this.reasonForLeavingHome = nDetails.reasonForLeavingHome;
    this.relationWithTrafficker = nDetails.relationWithTrafficker;
    this.recruitingFee = nDetails.recruitingFee;
    this.shelterServiceReceived = nDetails.shelterServiceReceived;
    this.serviceProviderName = nDetails.serviceProviderName;
    this.serviceProviderType = nDetails.serviceProviderType;
    this.serviceReceivedType = nDetails.serviceReceivedType;
    this.referralServiceReceived = nDetails.referralServiceReceived;
    this.referralServiceType = nDetails.referralServiceType;
    this.tipRehabilitation = nDetails.tipRehabilitation;
    this.tipRehabilitatedTo = nDetails.tipRehabilitatedTo;
    this.tipRehabilitatedToDetail = nDetails.tipRehabilitatedToDetail;
    this.caseStatus = nDetails.caseStatus;
    this.referralCaseStatus = nDetails.referralCaseStatus;
    this.referredService = nDetails.referredService;
    this.referredProviderName = nDetails.referredProviderName;
  }
  
  private LocalDate synchronizedDate;
  
  private LocalDate lastModifiedDate;
}
