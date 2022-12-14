package com.pcs.itmis.report.entity;

import java.math.BigDecimal;

public interface DisabledReport {
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

  Long getDisabled_id();
  Long getDisabled_adult_receiving_services();
  Long getDisabled_children_receiving_services();
  Long getDisabled_senior_citizen_receiving_services();
  Long getDisabled_male_receiving_services();
  Long getDisabled_female_receiving_services();
  Long getDisabled_others_receiving_services();
  Long getAutism_receiving_services();
  Long getDeaf_blind_receiving_services();
//  Long getDeaf_receiving_services();
//  Long getFully_visually_impaired_receiving_services();
  Long getHemophelia_receiving_services();
  Long getIntellectually_disabled_receiving_services();
  Long getMental_disability_receiving_services();
  Long getMultiple_receiving_services();
//  Long getPartially_deaf_receiving_services();  
//  Long getPartially_visually_impaired_receiving_services();
  Long getPhysically_disabled_receiving_services();
  Long getSpeech_and_hearing_receiving_services();
//  Long getDisabled_job_by_age();
//  Long getDisabled_job_by_ethnicity();
//  Long getDisabled_job_by_gender();
//  Long getDisabled_job_by_type();
  Long getHearing_impaired__receiving_services();  
  Long getVisually_impaired_receiving_services();
  BigDecimal getPer_of_dis_peop_job();
  Long getMale_rec_skill_training();
  Long getFemale_rec_skill_training();
  Long getOthers_rec_skill_training();
    Long getTot_disabled_rehab_center();
    BigDecimal getBudget_allocated_for_disabled();

  Long getDisabled_female_ka();          
  Long getDisabled_female_receivingssa_ka();          
  Long getDisabled_male_ka();          
  Long getDisabled_male_receivingssa_ka();        
  Long getDisabled_others_ka();       
  Long getDisabled_others_receivingssa_ka(); 
  Long getDisabled_adult_ka();          
  Long getDisabled_adult_receivingssa_ka();          
  Long getDisabled_children_ka();          
  Long getDisabled_children_receivingssa_ka();          
  Long getDisabled_senior_citizen_ka();          
  Long getDisabled_senior_citizen_receivingssa_ka(); 
  Long getAutism_ka();        
  Long getAutism_receivingssa_ka();          
//  Long getDeaf_ka();          
//  Long getDeaf_receivingssa_ka();          
  Long getDeaf_blind_ka();         
  Long getDeaf_blind_receivingssa_ka();          
//  Long getFully_visually_impaired_ka(); 
//  Long getFully_visually_impaired_receivingssa_ka(); 
  Long getHemophelia_ka(); 
  Long getHemophelia_receivingssa_ka(); 
  Long getIntellectually_disabled_ka(); 
  Long getIntellectually_disabled_receivingssa_ka(); 
  Long getMental_disability_ka(); 
  Long getMental_disability_receivingssa_ka(); 
  Long getMultiple_ka();
  Long getMultiple_receivingssa_ka(); 
//  Long getPartially_deaf_ka();
//  Long getPartially_deaf_receivingssa_ka(); 
//  Long getPartially_visually_impaired_ka(); 
//  Long getPartially_visually_impaired_receivingssa_ka();

  Long getHearing_impaired_ka(); 
  Long getHearing_impaired_receivingssa_ka();  
  Long getVisually_impaired_ka(); 
  Long getVisually_impaired_receivingssa_ka();
  Long getPhysically_disabled_ka();
  Long getPhysically_disabled_receivingssa_ka(); 
  Long getSpeech_and_hearing_ka(); 
  Long getSpeech_and_hearing_receivingssa_ka(); 

  Long getDisabled_female_kha();          
  Long getDisabled_female_receivingssa_kha();          
  Long getDisabled_male_kha();          
  Long getDisabled_male_receivingssa_kha();        
  Long getDisabled_others_kha();       
  Long getDisabled_others_receivingssa_kha(); 
  Long getDisabled_adult_kha();          
  Long getDisabled_adult_receivingssa_kha();          
  Long getDisabled_children_kha();          
  Long getDisabled_children_receivingssa_kha();          
  Long getDisabled_senior_citizen_kha();          
  Long getDisabled_senior_citizen_receivingssa_kha(); 
  Long getAutism_kha();        
  Long getAutism_receivingssa_kha();          
//  Long getDeaf_kha();          
//  Long getDeaf_receivingssa_kha();          
  Long getDeaf_blind_kha();         
  Long getDeaf_blind_receivingssa_kha();          
//  Long getFully_visually_impaired_kha(); 
//  Long getFully_visually_impaired_receivingssa_kha(); 
  Long getHemophelia_kha(); 
  Long getHemophelia_receivingssa_kha(); 
  Long getIntellectually_disabled_kha(); 
  Long getIntellectually_disabled_receivingssa_kha(); 
  Long getMental_disability_kha(); 
  Long getMental_disability_receivingssa_kha(); 
  Long getMultiple_kha();
  Long getMultiple_receivingssa_kha(); 
//  Long getPartially_deaf_kha();
//  Long getPartially_deaf_receivingssa_kha(); 
//  Long getPartially_visually_impaired_kha(); 
//  Long getPartially_visually_impaired_receivingssa_kha();
  Long getPhysically_disabled_kha();
  Long getPhysically_disabled_receivingssa_kha(); 
  Long getSpeech_and_hearing_kha(); 
  Long getSpeech_and_hearing_receivingssa_kha(); 

  Long getHearing_impaired_kha(); 
  Long getHearing_impaired_receivingssa_kha();  
  Long getVisually_impaired_kha(); 
  Long getVisually_impaired_receivingssa_kha();
  Long getDisabled_female_ga();          
  Long getDisabled_female_receivingssa_ga();          
  Long getDisabled_male_ga();          
  Long getDisabled_male_receivingssa_ga();        
  Long getDisabled_others_ga();       
  Long getDisabled_others_receivingssa_ga(); 
  Long getDisabled_adult_ga();          
  Long getDisabled_adult_receivingssa_ga();          
  Long getDisabled_children_ga();          
  Long getDisabled_children_receivingssa_ga();          
  Long getDisabled_senior_citizen_ga();          
  Long getDisabled_senior_citizen_receivingssa_ga(); 
  Long getAutism_ga();        
  Long getAutism_receivingssa_ga();          
//  Long getDeaf_ga();          
//  Long getDeaf_receivingssa_ga();          
  Long getDeaf_blind_ga();         
  Long getDeaf_blind_receivingssa_ga();          
//  Long getFully_visually_impaired_ga(); 
//  Long getFully_visually_impaired_receivingssa_ga(); 
  Long getHemophelia_ga(); 
  Long getHemophelia_receivingssa_ga(); 
  Long getIntellectually_disabled_ga(); 
  Long getIntellectually_disabled_receivingssa_ga(); 
  Long getMental_disability_ga(); 
  Long getMental_disability_receivingssa_ga(); 
  Long getMultiple_ga();
  Long getMultiple_receivingssa_ga(); 
//  Long getPartially_deaf_ga();
//  Long getPartially_deaf_receivingssa_ga(); 
//  Long getPartially_visually_impaired_ga(); 
//  Long getPartially_visually_impaired_receivingssa_ga();
  Long getPhysically_disabled_ga();
  Long getPhysically_disabled_receivingssa_ga(); 
  Long getSpeech_and_hearing_ga(); 
  Long getSpeech_and_hearing_receivingssa_ga(); 
  Long getHearing_impaired_ga(); 
  Long getHearing_impaired_receivingssa_ga();  
  Long getVisually_impaired_ga(); 
  Long getVisually_impaired_receivingssa_ga();
  
Long getDisabled_female_gha();          
  Long getDisabled_female_receivingssa_gha();          
  Long getDisabled_male_gha();          
  Long getDisabled_male_receivingssa_gha();        
  Long getDisabled_others_gha();       
  Long getDisabled_others_receivingssa_gha(); 
  Long getDisabled_adult_gha();          
  Long getDisabled_adult_receivingssa_gha();          
  Long getDisabled_children_gha();          
  Long getDisabled_children_receivingssa_gha();          
  Long getDisabled_senior_citizen_gha();          
  Long getDisabled_senior_citizen_receivingssa_gha(); 
  Long getAutism_gha();        
  Long getAutism_receivingssa_gha();          
//  Long getDeaf_gha();          
//  Long getDeaf_receivingssa_gha();          
  Long getDeaf_blind_gha();         
  Long getDeaf_blind_receivingssa_gha();          
//  Long getFully_visually_impaired_gha(); 
//  Long getFully_visually_impaired_receivingssa_gha(); 
  Long getHemophelia_gha(); 
  Long getHemophelia_receivingssa_gha(); 
  Long getIntellectually_disabled_gha(); 
  Long getIntellectually_disabled_receivingssa_gha(); 
  Long getMental_disability_gha(); 
  Long getMental_disability_receivingssa_gha(); 
  Long getMultiple_gha();
  Long getMultiple_receivingssa_gha(); 
//  Long getPartially_deaf_gha();
//  Long getPartially_deaf_receivingssa_gha(); 
//  Long getPartially_visually_impaired_gha(); 
//  Long getPartially_visually_impaired_receivingssa_gha();
  Long getPhysically_disabled_gha();
  Long getPhysically_disabled_receivingssa_gha(); 
  Long getSpeech_and_hearing_gha(); 
  Long getSpeech_and_hearing_receivingssa_gha();
  Long getHearing_impaired_gha(); 
  Long getHearing_impaired_receivingssa_gha();  
  Long getVisually_impaired_gha(); 
  Long getVisually_impaired_receivingssa_gha();
  
  Long getDisabled_affected_by_calamities();

}
