package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ReportEntity;
import com.pcs.itmis.report.entity.SeniorCitizenReport;

@Repository
public interface SeniorCitizenReportRepository extends JpaRepository<ReportEntity, Long> {

	@Query(nativeQuery = true, value = "select "
			+ "SUM(c.male_count) AS male_count," + "SUM(c.female_count) AS female_count, "
			+ "SUM(c.others_count) AS others_count, " + "SUM(c.male_senior_getting_spa) AS male_senior_getting_spa,"
			+ "SUM(c.female_senior_getting_spa) AS female_senior_getting_spa, "
			+ "SUM(c.others_senior_getting_spa) AS others_senior_getting_spa " + "from senior_citizen_report_view c" 
			+ " where c.fiscal_year = '2078-79' ")
	List<SeniorCitizenReport> getSeniorCitizenCumulativeReport();

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, " + "SUM(c.male_count) AS male_count," + "SUM(c.female_count) AS female_count, "
			+ "SUM(c.others_count) AS others_count, " + "SUM(c.male_senior_getting_spa) AS male_senior_getting_spa,"
			+ "SUM(c.female_senior_getting_spa) AS female_senior_getting_spa, "
			+ "SUM(c.others_senior_getting_spa) AS others_senior_getting_spa " + "from senior_citizen_report_view c " 
			+ " where c.fiscal_year = '2078-79' "
			+ "GROUP BY c.province_id")
	List<SeniorCitizenReport> getProvinceWiseSeniorCitizenReport();

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, c.district_id, c.district_desc_eng, " + "c.district_desc_nep, "
			+ "SUM(c.male_count) AS male_count," + "SUM(c.female_count) AS female_count, "
			+ "SUM(c.others_count) AS others_count, " + "SUM(c.male_senior_getting_spa) AS male_senior_getting_spa,"
			+ "SUM(c.female_senior_getting_spa) AS female_senior_getting_spa, "
			+ "SUM(c.others_senior_getting_spa) AS others_senior_getting_spa " + " from senior_citizen_report_view c "
			+ "WHERE c.province_id =:provinceId" + " and c.fiscal_year = '2078-79' " 
			+ " GROUP BY c.district_id")
	List<SeniorCitizenReport> getDistrictWiseSeniorCitizenReport(@Param("provinceId") String provinceId);

	@Query(nativeQuery = true, value = "select c.fiscal_year, c.province_id, c.province_desc_eng, "
			+ "c.province_desc_nep, c.district_id, c.district_desc_eng, "
			+ "c.district_desc_nep, c.municipality_id, c.municipality_desc_eng," + "c.municipality_desc_nep, "
			+ "SUM(c.male_count) AS male_count," + "SUM(c.female_count) AS female_count, "
			+ "SUM(c.others_count) AS others_count, " + "SUM(c.male_senior_getting_spa) AS male_senior_getting_spa,"
			+ "SUM(c.female_senior_getting_spa) AS female_senior_getting_spa, "
			+ "SUM(c.others_senior_getting_spa) AS others_senior_getting_spa " + "from senior_citizen_report_view c "
			+ "WHERE c.district_id =:districtId" + " and c.fiscal_year = '2078-79' " 
			+ " GROUP BY c.municipality_id")
	List<SeniorCitizenReport> getMunicipalityWiseSeniorCitizenReport(@Param("districtId") String districtId);

	@Query(nativeQuery = true, value = "select "
			+ " SUM(v.male_count) AS male_count," 
			+ "SUM(v.female_count) AS female_count,"
			+ " SUM(v.others_count) AS others_count,"
			+ " SUM(v.male_senior_getting_spa) AS male_senior_getting_spa, " 
			+ "SUM(v.female_senior_getting_spa) AS female_senior_getting_spa,"
			+ " SUM(v.others_senior_getting_spa) AS others_senior_getting_spa," 
			+ " AVG(v.male_senior_with_no_care) AS male_senior_with_no_care, "
			+ "AVG(v.female_senior_with_no_care) AS female_senior_with_no_care," 
			+ " AVG(v.others_senior_with_no_care) AS others_senior_with_no_care,"
			+ " SUM(v.senior_citizen_age60to68) AS senior_citizen_age60to68, " 
			+ " SUM(v.senior_citizen_age68to80) AS senior_citizen_age68to80, " 
			+ "SUM(v.senior_citizen_age81To99) AS senior_citizen_age81To99,"
			+ "SUM(v.senior_citizen_age_above99) AS senior_citizen_age_above99,"
			+ "AVG(v.senior_citizen_budget_allocated) AS senior_citizen_budget_allocated," 
			+ "AVG(v.senior_citizen_affected_by_calamities) AS senior_citizen_affected_by_calamities," 
			+ " SUM(v.senior_citizen_receving_pension) AS senior_citizen_receving_pension"
			+ " from senior_citizen_report_view v " 
			+ "where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ "and v.quarter = COALESCE(:quarter,v.quarter) "
			+ "and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ "and v.district_id = COALESCE(:districtId,v.district_id) "
			+ "and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<SeniorCitizenReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
