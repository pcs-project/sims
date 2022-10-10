package com.pcs.itmis.womenAndMinorities.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotEmpty;

import com.pcs.itmis.womenAndMinorities.model.Organization;
import com.pcs.itmis.womenAndMinorities.utils.StringListConverter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "WOMEN_AND_MINORITIES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WomenAndMinorities {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long womenAndMinoritiesId;
	
	@NotEmpty(message = "Fiscal year may not be empty.")
	private String fiscalYear;
	
	@NotEmpty(message = "Quarter may not be empty.")
	private String quarter;

	private Long womenDalitPop;
	private Long womenMinoritiesPop;
	private Long womenJanjatiPop;
	private Long womenMadhesiPop;
	private Long womenBrahminPop;
	private Long womenMuslimPop;
	private Long womenOthersPop;
	@Convert(converter = StringListConverter.class)
	private List<String> womenPopSource;
	private String womenPopSourceOthers;

	private Long girlsDalitPop;
	private Long girlsMinoritiesPop;
	private Long girlsJanjatiPop;
	private Long girlsMadhesiPop;
	private Long girlsBrahminPop;
	private Long girlsMuslimPop;
	private Long girlsOthersPop;
	@Convert(converter = StringListConverter.class)
	private List<String> girlsPopSource;
	private String girlsPopSourceOthers;

	private Long singledWomen;
	private Long divorceeWomen;
	private Long widowedWomen;
	private Long separatedWomen;
	private Long othersSingleWomen;
	@Convert(converter = StringListConverter.class)
	private List<String> singleWomenSource;
	private String singleWomenSourceOthers;

	private Long sexualGenderMinorities;
	@Convert(converter = StringListConverter.class)
	private List<String> sexualGenderMinoritiesSource;
	private String sexualGenderMinoritiesSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal womenLiteracyRate;
	@Convert(converter = StringListConverter.class)
	private List<String> womenLiteracyRateSource;
	private String womenLiteracyRateSourceOthers;

	@Digits(integer=3, fraction=2)
	private BigDecimal electedWomenRep;
	@Convert(converter = StringListConverter.class)
	private List<String> electedWomenRepSource;
	private String electedWomenRepSourceOthers;

	private Long singledWomenRecSpa;
	private Long divorceeWomenRecSpa;
	private Long widowedWomenRecSpa;
	private Long separatedWomenRecSpa;
	private Long othersSingleWomenRecSpa;
	@Convert(converter = StringListConverter.class)
	private List<String> womenRecSpaSource;
	private String womenRecSpaSourceOthers;

	private Long regGbvIncidents;
	@Convert(converter = StringListConverter.class)
	private List<String> regGbvIncidentsSource;
	private String regGbvIncidentsSourceOthers;

	private Long missingWomen;
	@Convert(converter = StringListConverter.class)
	private List<String> missingWomenSource;
	private String missingWomenSourceOthers;

	private Long absenteeWomen;
	@Convert(converter = StringListConverter.class)
	private List<String> absenteeWomenSource;
	private String absenteeWomenSourceOthers;

	private Long womenAffectedByCalamities;
	@Convert(converter = StringListConverter.class)
	private List<String> womenAffectedByCalamitiesSource;
	private String womenAffectedByCalamitiesSourceOthers;

	private String status;
	private Long userOrganization;
	private String entryBy;
	private LocalDate entryDate;

	private String remarks;


	// To replace old field's value with new value(for edit purpose)
	public void copyData(WomenAndMinorities nDetails) {
		this.womenDalitPop = nDetails.womenDalitPop;
		this.womenMinoritiesPop = nDetails.womenMinoritiesPop;
		this.womenJanjatiPop = nDetails.womenJanjatiPop;
		this.womenMadhesiPop = nDetails.womenMadhesiPop;
		this.womenBrahminPop = nDetails.womenBrahminPop;
		this.womenMuslimPop = nDetails.womenMuslimPop;
		this.womenOthersPop = nDetails.womenOthersPop;
		this.womenPopSource = nDetails.womenPopSource;
		this.womenPopSourceOthers = nDetails.womenPopSourceOthers;
		this.girlsDalitPop = nDetails.girlsDalitPop;
		this.girlsMinoritiesPop = nDetails.girlsMinoritiesPop;
		this.girlsJanjatiPop = nDetails.girlsJanjatiPop;
		this.girlsMadhesiPop = nDetails.girlsMadhesiPop;
		this.girlsBrahminPop = nDetails.girlsBrahminPop;
		this.girlsMuslimPop = nDetails.girlsMuslimPop;
		this.girlsOthersPop = nDetails.girlsOthersPop;
		this.girlsPopSource = nDetails.girlsPopSource;
		this.girlsPopSourceOthers = nDetails.girlsPopSourceOthers;
		this.singledWomen = nDetails.singledWomen;
		this.divorceeWomen = nDetails.divorceeWomen;
		this.widowedWomen = nDetails.widowedWomen;
		this.separatedWomen = nDetails.separatedWomen;
		this.othersSingleWomen = nDetails.othersSingleWomen;
		this.singleWomenSource = nDetails.singleWomenSource;
		this.singleWomenSourceOthers = nDetails.singleWomenSourceOthers;
		this.sexualGenderMinorities = nDetails.sexualGenderMinorities;
		this.sexualGenderMinoritiesSource = nDetails.sexualGenderMinoritiesSource;
		this.sexualGenderMinoritiesSourceOthers = nDetails.sexualGenderMinoritiesSourceOthers;
		this.womenLiteracyRate = nDetails.womenLiteracyRate;
		this.womenLiteracyRateSource = nDetails.womenLiteracyRateSource;
		this.womenLiteracyRateSourceOthers = nDetails.womenLiteracyRateSourceOthers;
		this.electedWomenRep = nDetails.electedWomenRep;
		this.electedWomenRepSource = nDetails.electedWomenRepSource;
		this.electedWomenRepSourceOthers = nDetails.electedWomenRepSourceOthers;
		this.singledWomenRecSpa = nDetails.singledWomenRecSpa;
		this.divorceeWomenRecSpa = nDetails.divorceeWomenRecSpa;
		this.widowedWomenRecSpa = nDetails.widowedWomenRecSpa;
		this.separatedWomenRecSpa = nDetails.separatedWomenRecSpa;
		this.othersSingleWomenRecSpa = nDetails.othersSingleWomenRecSpa;
		this.womenRecSpaSource = nDetails.womenRecSpaSource;
		this.womenRecSpaSourceOthers = nDetails.womenRecSpaSourceOthers;
		this.regGbvIncidents = nDetails.regGbvIncidents;
		this.regGbvIncidentsSource = nDetails.regGbvIncidentsSource;
		this.regGbvIncidentsSourceOthers = nDetails.regGbvIncidentsSourceOthers;
		this.missingWomen = nDetails.missingWomen;
		this.missingWomenSource = nDetails.missingWomenSource;
		this.missingWomenSourceOthers = nDetails.missingWomenSourceOthers;
		this.absenteeWomen = nDetails.absenteeWomen;
		this.absenteeWomenSource = nDetails.absenteeWomenSource;
		this.absenteeWomenSourceOthers = nDetails.absenteeWomenSourceOthers;
		this.womenAffectedByCalamities = nDetails.womenAffectedByCalamities;
		this.womenAffectedByCalamitiesSource = nDetails.womenAffectedByCalamitiesSource;
		this.womenAffectedByCalamitiesSourceOthers = nDetails.womenAffectedByCalamitiesSourceOthers;
		this.status = nDetails.status;

	}

	private LocalDate synchronizedDate;
}
