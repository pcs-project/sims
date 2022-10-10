package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface WomenReport {

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
  
  Long getAbsentee_women();
  String getAbsentee_women_source();
  Long getDivorcee_women();
  Long getDivorcee_women_rec_spa();
  BigDecimal getElected_women_rep();
  Long getGirls_brahmin_pop();
  Long getGirls_dalit_pop();
  Long getGirls_janjati_pop();
  Long getGirls_madhesi_pop();
  Long getGirls_minorities_pop();
  Long getGirls_muslim_pop();
  Long getGirls_others_pop();
  Long getMissing_women();
  Long getReg_gbv_incidents();
  Long getSeparated_women();
  Long getSeparated_women_rec_spa();
  Long getSexual_gender_minorities();
  String getSingle_women_source();
  Long getSingled_women();
  Long getSingled_women_rec_spa();
  Long getWidowed_women();
  Long getWidowed_women_rec_spa();
  Long getOthers_single_women();
  Long getOthers_single_women_rec_spa();
  Long getWomen_affected_by_calamities();
  Long getWomen_brahmin_pop();
  Long getWomen_dalit_pop();
  Long getWomen_muslim_pop();
  Long getWomen_others_pop();
  Long getWomen_janjati_pop();
  BigDecimal getWomen_literacy_rate();
  Long getWomen_madhesi_pop();
  Long getWomen_minorities_pop();
}
