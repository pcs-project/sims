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
@Table(name = "SEWA_KENDRA")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SewaKendra {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long sewaKendraId;

	private String fiscalYear;
	private String quarter;

	private Long totSewaKendra;
	@Convert(converter = StringListConverter.class)
	private List<String> totSewaKendraSource;
	private String totSewaKendraSourceOthers;

	private Long maleSurvivors;
	private Long femaleSurvivors;
	private Long othersSurvivors;
	@Convert(converter = StringListConverter.class)
	private List<String> survivorsSource;
	private String survivorsSourceOthers;

	private Long maleGbvVictims;
	private Long femaleGbvVictims;
	private Long othersGbvVictims;
	@Convert(converter = StringListConverter.class)
	private List<String> gbvVictimsSource;
	private String gbvVictimsSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;

	private LocalDate lastModifiedDate;
	private String remarks;

	private LocalDate entryDate;

	public void copyData(SewaKendra nDetails) {
		this.totSewaKendra = nDetails.totSewaKendra;
		this.totSewaKendraSource = nDetails.totSewaKendraSource;
		this.totSewaKendraSourceOthers = nDetails.totSewaKendraSourceOthers;
		this.maleSurvivors = nDetails.maleSurvivors;
		this.femaleSurvivors = nDetails.femaleSurvivors;
		this.othersSurvivors = nDetails.othersSurvivors;
		this.survivorsSource = nDetails.survivorsSource;
		this.survivorsSourceOthers = nDetails.survivorsSourceOthers;
		this.maleGbvVictims = nDetails.maleGbvVictims;
		this.femaleGbvVictims = nDetails.femaleGbvVictims;
		this.othersGbvVictims = nDetails.othersGbvVictims;
		this.gbvVictimsSource = nDetails.gbvVictimsSource;
		this.gbvVictimsSourceOthers = nDetails.gbvVictimsSourceOthers;
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;
}
