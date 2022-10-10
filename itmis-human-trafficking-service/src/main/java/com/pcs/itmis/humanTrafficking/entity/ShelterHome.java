package com.pcs.itmis.humanTrafficking.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.pcs.itmis.humanTrafficking.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SHELTER_HOME")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShelterHome {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long shelterHomeId;

	private String fiscalYear;
	private String quarter;

	private Long totShelterHome;
	@Convert(converter = StringListConverter.class)
	private List<String> totShelterHomeSource;
	private String totShelterHomeSourceOthers;

//  private Long maleTipSurvivors;
//  private Long femaleTipSurvivors;
//  private Long rescuedTipSurvivors;
//  private Long suspectedTipSurvivors;
//  private Long interceptedTipSurvivors;
	private Long maleTipSurvivorsRescued;
	private Long femaleTipSurvivorsRescued;
	private Long othersTipSurvivorsRescued;
	private Long maleTipSurvivorsSuspected;
	private Long femaleTipSurvivorsSuspected;
	private Long othersTipSurvivorsSuspected;
	private Long maleTipSurvivorsIntercepted;
	private Long femaleTipSurvivorsIntercepted;
	private Long othersTipSurvivorsIntercepted;
	@Convert(converter = StringListConverter.class)
	private List<String> tipSurvivorsSource;
	private String tipSurvivorsSourceOthers;

//  private Long maleTipVictims;
//  private Long femaleTipVictims;
//  private Long rescuedTipVictims;
//  private Long suspectedTipVictims;
//  private Long interceptedTipVictims;
	private Long maleTipVictimsRescued;
	private Long femaleTipVictimsRescued;
	private Long othersTipVictimsRescued;
	private Long maleTipVictimsSuspected;
	private Long femaleTipVictimsSuspected;
	private Long othersTipVictimsSuspected;
	private Long maleTipVictimsIntercepted;
	private Long femaleTipVictimsIntercepted;
	private Long othersTipVictimsIntercepted;
	@Convert(converter = StringListConverter.class)
	private List<String> tipVictimsSource;
	private String tipVictimsSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;

	private LocalDate lastModifiedDate;
	private String remarks;

	private LocalDate entryDate;

	public void copyData(ShelterHome nDetails) {
		this.totShelterHome = nDetails.totShelterHome;
		this.totShelterHomeSource = nDetails.totShelterHomeSource;
		this.totShelterHomeSourceOthers = nDetails.totShelterHomeSourceOthers;
//    this.maleTipSurvivors = nDetails.maleTipSurvivors;
//    this.femaleTipSurvivors = nDetails.femaleTipSurvivors;
//    this.rescuedTipSurvivors = nDetails.rescuedTipSurvivors;
//    this.suspectedTipSurvivors = nDetails.suspectedTipSurvivors;
//    this.interceptedTipSurvivors = nDetails.interceptedTipSurvivors;
		this.maleTipSurvivorsRescued = nDetails.maleTipSurvivorsRescued;
		this.femaleTipSurvivorsRescued = nDetails.femaleTipSurvivorsRescued;
		this.othersTipSurvivorsRescued = nDetails.othersTipSurvivorsRescued;
		this.maleTipSurvivorsSuspected = nDetails.maleTipSurvivorsSuspected;
		this.femaleTipSurvivorsSuspected = nDetails.femaleTipSurvivorsSuspected;
		this.othersTipSurvivorsSuspected = nDetails.othersTipSurvivorsSuspected;
		this.maleTipSurvivorsIntercepted = nDetails.maleTipSurvivorsIntercepted;
		this.femaleTipSurvivorsIntercepted = nDetails.femaleTipSurvivorsIntercepted;
		this.othersTipSurvivorsIntercepted = nDetails.othersTipSurvivorsIntercepted;
		this.tipSurvivorsSource = nDetails.tipSurvivorsSource;
		this.tipSurvivorsSourceOthers = nDetails.tipSurvivorsSourceOthers;
//    this.maleTipVictims = nDetails.maleTipVictims;
//    this.femaleTipVictims = nDetails.femaleTipVictims;
//    this.rescuedTipVictims = nDetails.rescuedTipVictims;
//    this.suspectedTipVictims = nDetails.suspectedTipVictims;
//    this.interceptedTipVictims = nDetails.interceptedTipVictims;
		this.maleTipVictimsRescued = nDetails.maleTipVictimsRescued;
		this.femaleTipVictimsRescued = nDetails.femaleTipVictimsRescued;
		this.othersTipVictimsRescued = nDetails.othersTipVictimsRescued;
		this.maleTipVictimsSuspected = nDetails.maleTipVictimsSuspected;
		this.femaleTipVictimsSuspected = nDetails.femaleTipVictimsSuspected;
		this.othersTipVictimsSuspected = nDetails.othersTipVictimsSuspected;
		this.maleTipVictimsIntercepted = nDetails.maleTipVictimsIntercepted;
		this.femaleTipVictimsIntercepted = nDetails.femaleTipVictimsIntercepted;
		this.othersTipVictimsIntercepted = nDetails.othersTipVictimsIntercepted;
		this.tipVictimsSource = nDetails.tipVictimsSource;
		this.tipVictimsSourceOthers = nDetails.tipVictimsSourceOthers;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;
}
