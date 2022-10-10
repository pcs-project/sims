package com.pcs.itmis.report.entity;

public interface SewaKendraReport {
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

	Long getTot_sewa_kendra();

	Long getMale_survivors();

	Long getFemale_survivors();

	Long getOthers_survivors();

	Long getMale_gbv_victims();

	Long getFemale_gbv_victims();

	Long getOthers_gbv_victims();
}
