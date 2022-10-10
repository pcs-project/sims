package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface OldAgeHomeReport {
	String getFiscal_year();
	 String getQuarter();
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
	  
	  Long getMale_citizen_receiving_services();
	  Long getFemale_citizen_receiving_services();
	  Long getOthers_citizen_receiving_services();
	  Long getDalit_receiving_services();
	  Long getEthnic_minorities_receiving_services();
	  Long getJanajati_receiving_services();
	  Long getMadhesi_receiving_services();
	  Long getBrahmin_receiving_services();
	  Long getMuslim_receiving_services();
	  Long getOthers_ethnicity_receiving_services();
	  Long getTot_old_age_home(); 
	  Long getMale_citizen_rehabilitated();
	  Long getFemale_citizen_rehabilitated();
	  Long getOthers_citizen_rehabilitated();
	  Long getCitizen_rehabilitated_by_home();
	  Long getCitizen_rehabilitated_by_relatives();
	  BigDecimal getBudget_for_old_age_home();
}
