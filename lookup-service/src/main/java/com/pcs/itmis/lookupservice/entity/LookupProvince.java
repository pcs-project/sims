package com.pcs.itmis.lookupservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lookup_province")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LookupProvince {
	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "province_desc_eng")
	private String provinceDescEng;
	
	@Column(name = "province_desc_nep")
    private String provinceDescNep;
	
	

}
