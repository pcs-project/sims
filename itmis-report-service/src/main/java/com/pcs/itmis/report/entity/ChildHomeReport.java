package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface ChildHomeReport {
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
	  
	  Long getBoys_receiving_services();
	  Long getGirls_receiving_services();
	  Long getOthers_receiving_services();
	  Long getDalit_receiving_services();
	  Long getEthnic_minorities_receiving_services();
	  Long getJanajati_receiving_services();
	  Long getMadhesi_receiving_services();
	  Long getBrahmin_receiving_services();
	  Long getMuslim_receiving_services();
	  Long getOthers_ethnicity_receiving_services();
	  Long getGbv_receiving_services();
	  Long getTrapped_in_addiction_receiving_services();
	  Long getDrug_addict_receiving_services();
	  Long getStreet_children_receiving_services();
	  Long getTip_receiving_services();
	  Long getTot_child_home();
	  Long getRehabilitated_from_home();
	  Long getRehabilitated_from_adoption();
	  Long getRehabilitated_from_foster_home();
	  Long getRehabilitated_from_ojt();
	  Long getRehabilitated_from_out_of_community();
	  BigDecimal getBudget_for_child_home();
}
