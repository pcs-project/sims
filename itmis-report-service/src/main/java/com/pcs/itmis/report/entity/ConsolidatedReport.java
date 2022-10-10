package com.pcs.itmis.report.entity;

public interface ConsolidatedReport {
	String getFiscal_year();

	String getOrganization_id();

	String getProvince_id();

	String getProvince_desc_eng();

	String getProvince_desc_nep();

	String getDistrict_id();

	String getDistrict_desc_eng();

	String getDistrict_desc_nep();

	String getMunicipality_id();

	String getMunicipality_desc_eng();

	String getMunicipality_desc_nep();

	String getQuarter();

	String getModule();

	Long getMale_count();

	Long getFemale_count();

	Long getOthers_count();

	Long getTotal_count();
}
