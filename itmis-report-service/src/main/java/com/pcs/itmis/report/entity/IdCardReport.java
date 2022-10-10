package com.pcs.itmis.report.entity;

public interface IdCardReport {
	String getProvince_id();

	String getProvince_desc_eng();

	String getProvince_desc_nep();

	String getDistrict_id();

	String getDistrict_desc_eng();

	String getDistrict_desc_nep();

	String getMunicipality_id();

	String getMunicipality_desc_eng();

	String getMunicipality_desc_nep();

	Long getDisabled();

	Long getSenior_citizen();
}
