package com.pcs.itmis.report.entity;

public interface LabourMigrationReport {
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
	  
	  Long getMale_returnee_migrant();
	  Long getFemale_returnee_migrant();
	  Long getOther_returnee_migrant();
	  Long getDalit_returnee_migrant();
	  Long getEthnic_minorities_returnee_migrant();
	  Long getJanajati_returnee_migrant();
	  Long getMadhesi_returnee_migrant();
	  Long getBrahmin_chettri_returnee_migrant();
	  Long getMuslim_returnee_migrant();
	  Long getOthers_ethnicity_returnee_migrant();
	  Long getInternal_migrant_labour();
	  Long getExternal_migrant_labour();
	  Long getMale_migrant_labour();
	  Long getFemale_migrant_labour();
	  Long getOther_migrant_labour();
	  Long getDalit_migrant_labour();
	  Long getEthnic_minorities_migrant_labour();
	  Long getJanajati_migrant_labour();
	  Long getMadhesi_migrant_labour();
	  Long getBrahmin_chettri_migrant_labour();
	  Long getMuslim_migrant_labour();
	  Long getOthers_ethnicity_migrant_labour();
	  Long getMale_migrant_to_india();
	  Long getFemale_migrant_to_india();
	  Long getOther_migrant_to_india();
	  Long getDalit_migrant_to_india();
	  Long getEthnic_minorities_migrant_to_india();
	  Long getJanajati_migrant_to_india();
	  Long getMadhesi_migrant_to_india();
	  Long getBrahmin_chettri_migrant_to_india();
	  Long getMuslim_migrant_to_india();
	  Long getOthers_ethnicity_migrant_to_india();
}
