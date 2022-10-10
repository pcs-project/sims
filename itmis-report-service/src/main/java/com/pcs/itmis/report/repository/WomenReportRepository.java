package com.pcs.itmis.report.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ReportEntity;
import com.pcs.itmis.report.entity.WomenReport;

@Repository
public interface WomenReportRepository extends JpaRepository<ReportEntity, Long> {

	@Query(nativeQuery = true, value = "select  "
			+ "SUM(v.separated_women) AS separated_women,"
			+ " SUM(v.widowed_women) AS widowed_women,"
			+ "SUM(v.singled_women) AS singled_women, " + "SUM(v.divorcee_women) AS divorcee_women"
			+ " from women_report_view v "
			+ "where v.fiscal_year = '2078-79' ")
	List<WomenReport> getCumulativeReport();
	
	@Query(nativeQuery = true, value = "select v.fiscal_year, v.province_id, v.province_desc_eng, "
			+ "v.province_desc_nep, SUM(v.separated_women) AS separated_women, "
			+ "SUM(v.widowed_women) AS widowed_women, "
			+ "SUM(v.singled_women) AS singled_women, " + "SUM(v.divorcee_women) AS divorcee_women"
			+ " from women_report_view v " + "WHERE v.fiscal_year = '2078-79' " + "GROUP BY v.province_id")
	List<WomenReport> getProvinceWiseWomenReport();

	@Query(nativeQuery = true, value = "select v.fiscal_year, v.province_id, v.province_desc_eng, "
			+ "v.province_desc_nep, v.district_id, v.district_desc_eng, "
			+ "v.district_desc_nep, SUM(v.separated_women) AS separated_women,"
			+ " SUM(v.widowed_women) AS widowed_women,"
			+ "SUM(v.singled_women) AS singled_women, " + "SUM(v.divorcee_women) AS divorcee_women"
			+ " from women_report_view v " + "WHERE v.province_id =:provinceId" 
			+ " AND v.fiscal_year = '2078-79' "
			+ " GROUP BY v.district_id")
	List<WomenReport> getDistrictWiseWomenReport(@Param("provinceId") String provinceId);

	@Query(nativeQuery = true, value = "select v.fiscal_year, v.province_id, v.province_desc_eng, "
			+ "v.province_desc_nep, v.district_id, v.district_desc_eng, "
			+ "v.district_desc_nep, v.municipality_id, v.municipality_desc_eng,"
			+ "v.municipality_desc_nep, SUM(v.separated_women) AS separated_women,"
			+ " SUM(v.widowed_women) AS widowed_women,"
			+ "SUM(v.singled_women) AS singled_women, " + "SUM(v.divorcee_women) AS divorcee_women"
			+ " from women_report_view v " + "WHERE v.district_id =:districtId" 
			+ " AND v.fiscal_year = '2078-79' "
			+ " GROUP BY v.municipality_id")
	List<WomenReport> getMunicipalityWiseWomenReport(@Param("districtId") String districtId);

	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.absentee_women) AS absentee_women," 
			+ "SUM(v.divorcee_women) AS divorcee_women,"
			+ " SUM(v.divorcee_women_rec_spa) AS divorcee_women_rec_spa,"
			+ " AVG(v.elected_women_rep) AS elected_women_rep, " 
			+ "SUM(v.girls_brahmin_pop) AS girls_brahmin_pop,"
			+ " SUM(v.girls_dalit_pop) AS girls_dalit_pop," 
			+ " SUM(v.girls_janjati_pop) AS girls_janjati_pop, "
			+ "SUM(v.girls_madhesi_pop) AS girls_madhesi_pop," 
			+ " SUM(v.girls_minorities_pop) AS girls_minorities_pop,"
			+ " SUM(v.girls_muslim_pop) AS girls_muslim_pop,"
			+ "SUM(v.girls_others_pop) AS girls_others_pop,"
			+ " SUM(v.missing_women) AS missing_women, " 
			+ "SUM(v.reg_gbv_incidents) AS reg_gbv_incidents,"
			+ "SUM(v.separated_women) AS separated_women," 
			+ "SUM(v.separated_women_rec_spa) AS separated_women_rec_spa," 
			+ " SUM(v.sexual_gender_minorities) AS sexual_gender_minorities,"
			+ " SUM(v.singled_women) AS singled_women, " 
			+ "SUM(v.singled_women_rec_spa) AS singled_women_rec_spa,"
			+ "SUM(v.widowed_women) AS widowed_women,"
			+ "SUM(v.widowed_women_rec_spa) AS widowed_women_rec_spa,"
			+ "SUM(v.others_single_women) AS others_single_women,"
			+ "SUM(v.others_single_women_rec_spa) AS others_single_women_rec_spa,"
			+ "SUM(v.women_affected_by_calamities) AS women_affected_by_calamities,"
			+ "SUM(v.women_brahmin_pop) AS women_brahmin_pop,"
			+ "SUM(v.women_dalit_pop) AS women_dalit_pop,"
			+ "SUM(v.women_janjati_pop) AS women_janjati_pop,"
			+ "AVG(v.women_literacy_rate) AS women_literacy_rate,"
			+ "SUM(v.women_madhesi_pop) AS women_madhesi_pop,"
			+ "SUM(v.women_muslim_pop) AS women_muslim_pop,"
			+ "SUM(v.women_others_pop) AS women_others_pop,"
			+ "SUM(v.women_minorities_pop) AS women_minorities_pop"
			+ " from women_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.entry_date >= COALESCE(:fromDate,v.entry_date) "
			+ "and v.entry_date <= COALESCE(:toDate,v.entry_date) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<WomenReport> getIndicatorReport(String fiscalYear, String quarter, LocalDate fromDate, LocalDate toDate, String provinceId, String districtId, String localLevelId);


}
