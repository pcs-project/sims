package com.pcs.itmis.labourMigration.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "migrant_address_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "labourMigrationCaseForm")
public class MigrantAddress {

	@Id
	@Column(name = "labourMigrationCaseFormId")
	private Long labourMigrationCaseFormId;

	@OneToOne
	@MapsId
	@JoinColumn(name = "labourMigrationCaseFormId")
	@JsonBackReference
	private LabourMigrationCaseForm labourMigrationCaseForm;

	private String province;

	private String district;

	private String municipality;

	private String wardNo;

	private String entryBy;

	private LocalDate entryDate;

	public void copyData(MigrantAddress migrantAddress) {
		this.province = migrantAddress.province;
		this.district = migrantAddress.district;
		this.municipality = migrantAddress.municipality;
		this.wardNo = migrantAddress.wardNo;
	}

}
