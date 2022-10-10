package com.pcs.itmis.labourMigration.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.pcs.itmis.labourMigration.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LABOUR_MIGRATION_INDICATOR")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabourMigrationIndicator {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long labourMigrationId;

	private String fiscalYear;
	private String quarter;

	private Long internalMigrantLabour;
	private Long externalMigrantLabour;
	private Long maleMigrantLabour;
	private Long femaleMigrantLabour;
	private Long otherMigrantLabour;
	private Long dalitMigrantLabour;
	private Long ethnicMinoritiesMigrantLabour;
	private Long janajatiMigrantLabour;
	private Long madhesiMigrantLabour;
	private Long brahminChettriMigrantLabour;
	private Long muslimMigrantLabour;
	private Long othersEthnicityMigrantLabour;
	@Convert(converter = StringListConverter.class)
	private List<String> migrantLabourSource;
	private String migrantLabourSourceOthers;

	private Long maleMigrantToIndia;
	private Long femaleMigrantToIndia;
	private Long otherMigrantToIndia;
	private Long dalitMigrantToIndia;
	private Long ethnicMinoritiesMigrantToIndia;
	private Long janajatiMigrantToIndia;
	private Long madhesiMigrantToIndia;
	private Long brahminChettriMigrantToIndia;
	private Long muslimMigrantToIndia;
	private Long othersEthnicityMigrantToIndia;
	@Convert(converter = StringListConverter.class)
	private List<String> migrantToIndiaSource;
	private String migrantToIndiaSourceOthers;

	private Long maleReturneeMigrant;
	private Long femaleReturneeMigrant;
	private Long otherReturneeMigrant;
	private Long dalitReturneeMigrant;
	private Long ethnicMinoritiesReturneeMigrant;
	private Long janajatiReturneeMigrant;
	private Long madhesiReturneeMigrant;
	private Long brahminChettriReturneeMigrant;
	private Long muslimReturneeMigrant;
	private Long othersEthnicityReturneeMigrant;
	@Convert(converter = StringListConverter.class)
	private List<String> returneeMigrantSource;
	private String returneeMigrantSourceOthers;

	private String status;
	private String entryBy;
	private Long userOrganization;
	// @Temporal(TemporalType.DATE)
	private LocalDate entryDate;
	private String remarks;

	public void copyData(LabourMigrationIndicator nDetails) {
		this.internalMigrantLabour = nDetails.internalMigrantLabour;
		this.externalMigrantLabour = nDetails.externalMigrantLabour;
		this.maleMigrantLabour = nDetails.maleMigrantLabour;
		this.femaleMigrantLabour = nDetails.femaleMigrantLabour;
		this.otherMigrantLabour = nDetails.otherMigrantLabour;
		this.dalitMigrantLabour = nDetails.dalitMigrantLabour;
		this.ethnicMinoritiesMigrantLabour = nDetails.ethnicMinoritiesMigrantLabour;
		this.janajatiMigrantLabour = nDetails.janajatiMigrantLabour;
		this.madhesiMigrantLabour = nDetails.madhesiMigrantLabour;
		this.brahminChettriMigrantLabour = nDetails.brahminChettriMigrantLabour;
		this.muslimMigrantLabour = nDetails.muslimMigrantLabour;
		this.othersEthnicityMigrantLabour = nDetails.othersEthnicityMigrantLabour;
		this.migrantLabourSource = nDetails.migrantLabourSource;
		this.migrantLabourSourceOthers = nDetails.migrantLabourSourceOthers;
		this.maleMigrantToIndia = nDetails.maleMigrantToIndia;
		this.femaleMigrantToIndia = nDetails.femaleMigrantToIndia;
		this.otherMigrantToIndia = nDetails.otherMigrantToIndia;
		this.dalitMigrantToIndia = nDetails.dalitMigrantToIndia;
		this.ethnicMinoritiesMigrantToIndia = nDetails.ethnicMinoritiesMigrantToIndia;
		this.janajatiMigrantToIndia = nDetails.janajatiMigrantToIndia;
		this.madhesiMigrantToIndia = nDetails.madhesiMigrantToIndia;
		this.brahminChettriMigrantToIndia = nDetails.brahminChettriMigrantToIndia;
		this.muslimMigrantToIndia = nDetails.muslimMigrantToIndia;
		this.othersEthnicityMigrantToIndia = nDetails.othersEthnicityMigrantToIndia;
		this.migrantToIndiaSource = nDetails.migrantToIndiaSource;
		this.migrantToIndiaSourceOthers = nDetails.migrantToIndiaSourceOthers;
		this.maleReturneeMigrant = nDetails.maleReturneeMigrant;
		this.femaleReturneeMigrant = nDetails.femaleReturneeMigrant;
		this.otherReturneeMigrant = nDetails.otherReturneeMigrant;
		this.dalitReturneeMigrant = nDetails.dalitReturneeMigrant;
		this.ethnicMinoritiesReturneeMigrant = nDetails.ethnicMinoritiesReturneeMigrant;
		this.janajatiReturneeMigrant = nDetails.janajatiReturneeMigrant;
		this.madhesiReturneeMigrant = nDetails.madhesiReturneeMigrant;
		this.brahminChettriReturneeMigrant = nDetails.brahminChettriReturneeMigrant;
		this.muslimReturneeMigrant = nDetails.muslimReturneeMigrant;
		this.othersEthnicityReturneeMigrant = nDetails.othersEthnicityReturneeMigrant;
		this.returneeMigrantSource = nDetails.returneeMigrantSource;
		this.returneeMigrantSourceOthers = nDetails.returneeMigrantSourceOthers;
		
		this.status = nDetails.status;
	}

	private LocalDate synchronizedDate;
	private LocalDate lastModifiedDate;
}
