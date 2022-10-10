package com.pcs.itmis.lookupservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lookup_municipality")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LookupMunicipality {
	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "municipality_desc_eng")
	private String municipalityDescEng;

	@Column(name = "district_id")
	private Integer districtId;

	@Column(name = "total_ward")
	private Integer totalWard;
	
	@Column(name = "municipality_desc_nep")
    private String municipalityDescNep;
	
	

}
