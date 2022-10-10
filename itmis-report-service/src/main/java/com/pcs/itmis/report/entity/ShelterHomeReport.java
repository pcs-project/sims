package com.pcs.itmis.report.entity;

public interface ShelterHomeReport {
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
	  Long getMale_tip_survivors_rescued();
	  Long getMale_tip_survivors_suspected();
	  Long getMale_tip_survivors_intercepted();
	  Long getFemale_tip_survivors_rescued();
	  Long getFemale_tip_survivors_suspected();
	  Long getFemale_tip_survivors_intercepted();
	  Long getOthers_tip_survivors_suspected();
	  Long getOthers_tip_survivors_rescued();
	  Long getOthers_tip_survivors_intercepted();
	  String getTip_survivors_source();
	  
	  Long getMale_tip_victims_rescued();
	  Long getMale_tip_victims_suspected();
	  Long getMale_tip_victims_intercepted();
	  Long getFemale_tip_victims_rescued();
	  Long getFemale_tip_victims_suspected();
	  Long getFemale_tip_victims_intercepted();
	  Long getOthers_tip_victims_suspected();
	  Long getOthers_tip_victims_rescued();
	  Long getOthers_tip_victims_intercepted();
	  String getTip_victims_source();
	  
	  Long getTot_shelter_home();
	  String getTot_shelter_home_source();
}
