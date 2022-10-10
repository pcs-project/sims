package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface ChildrenReport {

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
  
  Long getBoys_birth_cert_isssued();
  Long getGirls_birth_cert_isssued();
  Long getOthers_birth_cert_isssued();
  Long getBoys_population();
  Long getGirls_population();
  Long getOthers_population(); 
  Long getBoys_child_abuse();
  Long getBoys_early_marriage();
  Long getBoys_missing();
  Long getBoys_found();
  Long getBoys_receivingssa();
  Long getChildren_budget_allocated();
  Long getChildren_dev_center();
  String getChildren_pop_source();
  Long getDisabled_receivingssa();
  Long getEarly_arranged_marriage();
  Long getEarly_eloped_marriage();
  Long getTotal_early_marriage_by_case();
  String getEarly_marriage_source();
  Long getGirls_child_abuse();
  Long getGirls_early_marriage();
  Long getGirls_missing();
  Long getGirls_found();
  Long getGirls_receivingssa();
  Long getOrphan_boys();
  Long getOrphan_girls();
  BigDecimal getOut_of_school_children();
  BigDecimal getPrimary_school_boys();
  BigDecimal getPrimary_school_girls();
  BigDecimal getSecondary_dropout_boys();
  BigDecimal getSecondary_dropout_brahmin();
  BigDecimal getSecondary_dropout_dalit();
  BigDecimal getSecondary_dropout_ethnic();
  BigDecimal getSecondary_dropout_girls();
  BigDecimal getSecondary_dropout_janajati();
  BigDecimal getSecondary_dropout_madhesi();
  BigDecimal getSecondary_dropout_muslim();
  BigDecimal getSecondary_dropout_ethnicity_others();
  Long getStreet_boys();
  Long getStreet_girls();
  Long getOrphan_others();
  Long getOthers_child_abuse();
  Long getOthers_early_marriage();
  Long getOthers_missing();
  Long getOthers_found();
  Long getOthers_receivingssa();
  BigDecimal getPrimary_school_others();
  Long getSecondary_dropout_others();
  Long getStreet_others();
  
  Long getChildren_affected_by_calamities();
}
