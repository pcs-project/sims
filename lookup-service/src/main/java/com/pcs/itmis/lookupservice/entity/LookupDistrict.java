package com.pcs.itmis.lookupservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lookup_district")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LookupDistrict {
	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "district_desc_eng")
	private String districtDescEng;

	@Column(name = "province_id")
	private Integer provinceId;

	@Column(name = "supervision_area_id")
	private Integer supervisionAreaId;
	
	@Column(name = "district_desc_nep")
    private String districtDescNep;
	

}
