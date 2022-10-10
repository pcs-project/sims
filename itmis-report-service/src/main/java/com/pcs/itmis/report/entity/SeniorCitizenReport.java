package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface SeniorCitizenReport {
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
  Long getMale_count();
  Long getFemale_count();
  Long getOthers_count();
  Long getMale_senior_getting_spa();
  Long getFemale_senior_getting_spa();
  Long getOthers_senior_getting_spa();
  BigDecimal getMale_senior_with_no_care();
  BigDecimal getFemale_senior_with_no_care();
  BigDecimal getOthers_senior_with_no_care();
  Long getSenior_citizen_age60to68();
  Long getSenior_citizen_age68to80();
  Long getSenior_citizen_age81To99();
  Long getSenior_citizen_age_above99();
  BigDecimal getSenior_citizen_budget_allocated();
  Long getSenior_citizen_receving_pension();
  
  Long getSenior_citizen_affected_by_calamities();
}
