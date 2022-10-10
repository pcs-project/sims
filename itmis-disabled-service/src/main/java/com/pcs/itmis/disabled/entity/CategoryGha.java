package com.pcs.itmis.disabled.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.pcs.itmis.disabled.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "disabled_category_gha")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "disabled")
public class CategoryGha {
	
	@Id
	  @Column(name = "disabled_id")
	private Long disabledId;
	
	
    @OneToOne
    @MapsId  
    @JoinColumn(name = "disabled_id")
    @JsonBackReference
    private  Disabled disabled;
    
    private Long disabledMale;
    private Long disabledFemale;
    private Long disabledChildren;
    private Long disabledAdult;
    private Long disabledSeniorCitizen;
    private Long physicallyDisabled;
//    private Long partiallyVisuallyImpaired;
//    private Long fullyVisuallyImpaired;
//    private Long partiallyDeaf;
//    private Long deaf;
    private Long visuallyImpaired;
    private Long hearingImpaired;
	
    private Long deafBlind;
    private Long speechAndHearing;
    private Long mentalDisability;
    private Long intellectuallyDisabled;
    private Long hemophelia;
    private Long autism;
    private Long multiple;
    @Convert(converter = StringListConverter.class)
    private List<String> totDisabledPeopleSource;
    private String totDisabledPeopleSourceOthers;
    
    private Long disabledMaleReceivingSSA;
    private Long disabledFemaleReceivingSSA;
    private Long disabledChildrenReceivingSSA;
    private Long disabledAdultReceivingSSA;
    private Long disabledSeniorCitizenReceivingSSA;
    private Long physicallyDisabledReceivingSSA;
//    private Long partiallyVisuallyImpairedReceivingSSA;
//    private Long fullyVisuallyImpairedReceivingSSA;
//    private Long partiallyDeafReceivingSSA;
//    private Long deafReceivingSSA;
    private Long visuallyImpairedReceivingSSA;
    private Long hearingImpairedReceivingSSA;
    private Long deafBlindReceivingSSA;
    private Long speechAndHearingReceivingSSA;
    private Long mentalDisabilityReceivingSSA;
    private Long intellectuallyDisabledReceivingSSA;
    private Long hemopheliaReceivingSSA;
    private Long autismReceivingSSA;
    private Long multipleReceivingSSA;
    @Convert(converter = StringListConverter.class)
    private List<String> disabledReceivingSSASource;
    private String disabledReceivingSSASourceOthers;
    

    private Long disabledOthers;
    private Long disabledOthersReceivingSSA;
}
