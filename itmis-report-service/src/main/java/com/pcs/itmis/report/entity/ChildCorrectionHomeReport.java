package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface ChildCorrectionHomeReport {
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
	  
	  Long getBoys_receiving_services_in_cch();
	  Long getGirls_receiving_services_in_cch();
	  Long getOthers_receiving_services_in_cch();
	  Long getDalit_receiving_services_in_cch();
	  Long getEthnic_minorities_receiving_servicesv();
	  Long getJanajati_receiving_services_in_cch();
	  Long getMadhesi_receiving_services_in_cch();
	  Long getBrahmin_receiving_services_in_cch();
	  Long getMuslim_receiving_services_in_cch();
	  Long getOthers_ethnicity_receiving_services_in_cch();
	  Long getTot_child_correction_home();
	  Long getBoys_rehabilitated_from_cch();
	  Long getGirls_rehabilitated_from_cch();
	  Long getOthers_rehabilitated_from_cch();
	  Long getRehabilitated_from_home();
	  Long getRehabilitated_from_adoption();
	  Long getRehabilitated_from_foster_home();
	  Long getRehabilitated_from_ojt();
	  Long getRehabilitated_from_out_of_community();
	  BigDecimal getBudget_for_child_correction_home();
}
