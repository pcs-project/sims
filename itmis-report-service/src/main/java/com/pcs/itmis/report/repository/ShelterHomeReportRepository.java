package com.pcs.itmis.report.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pcs.itmis.report.entity.ReportEntity;
import com.pcs.itmis.report.entity.ShelterHomeReport;

@Repository
public interface ShelterHomeReportRepository extends JpaRepository<ReportEntity, Long> {

	@Query(nativeQuery = true, value = "SELECT  \n"
			+ "		        SUM(s.male_tip_survivors_rescued) AS male_tip_survivors_rescued,\n"
			+ "		          SUM(s.male_tip_survivors_suspected) AS male_tip_survivors_suspected,\n"
			+ "		         SUM(s.male_tip_survivors_intercepted) AS male_tip_survivors_intercepted,\n"
			+ "		       SUM(s.female_tip_survivors_rescued) AS female_tip_survivors_rescued,\n"
			+ "		          SUM(s.female_tip_survivors_suspected) AS female_tip_survivors_suspected,\n"
			+ "		          SUM(s.female_tip_survivors_intercepted) AS female_tip_survivors_intercepted,\n"
			+ "		          SUM(s.others_tip_survivors_suspected) AS others_tip_survivors_suspected,\n"
			+ "		          SUM(s.others_tip_survivors_rescued) AS others_tip_survivors_rescued,\n"
			+ "		         SUM(s.others_tip_survivors_intercepted) AS others_tip_survivors_intercepted\n"
			+ "		        FROM shelter_home_report_view s \n"
			 + " WHERE s.fiscal_year = '2078-79' ")
	List<ShelterHomeReport> getCumulativeReport();

	@Query(nativeQuery = true, value = "SELECT s.fiscal_year, s.province_id, s.province_desc_eng, \n"
			+ "		        s.province_desc_nep, \n"
			+ "		        SUM(s.male_tip_survivors_rescued) AS male_tip_survivors_rescued,\n"
			+ "		          SUM(s.male_tip_survivors_suspected) AS male_tip_survivors_suspected,\n"
			+ "		         SUM(s.male_tip_survivors_intercepted) AS male_tip_survivors_intercepted,\n"
			+ "		       SUM(s.female_tip_survivors_rescued) AS female_tip_survivors_rescued,\n"
			+ "		          SUM(s.female_tip_survivors_suspected) AS female_tip_survivors_suspected,\n"
			+ "		          SUM(s.female_tip_survivors_intercepted) AS female_tip_survivors_intercepted,\n"
			+ "		          SUM(s.others_tip_survivors_suspected) AS others_tip_survivors_suspected,\n"
			+ "		          SUM(s.others_tip_survivors_rescued) AS others_tip_survivors_rescued,\n"
			+ "		         SUM(s.others_tip_survivors_intercepted) AS others_tip_survivors_intercepted\n"
			+ "		        FROM shelter_home_report_view s \n" + " WHERE s.fiscal_year = '2078-79' "
			+ "	GROUP BY s.province_id")
	List<ShelterHomeReport> getProvinceWiseReport();

	@Query(nativeQuery = true, value = "select  s.fiscal_year, s.province_id, s.province_desc_eng, "
			+ "s.province_desc_nep, s.district_id, s.district_desc_eng, " + "s.district_desc_nep, "
			+ "SUM(s.male_tip_survivors_rescued) AS male_tip_survivors_rescued,"
			+ "SUM(s.male_tip_survivors_suspected) AS male_tip_survivors_suspected,"
			+ "SUM(s.male_tip_survivors_intercepted) AS male_tip_survivors_intercepted,"
			+ "SUM(s.female_tip_survivors_rescued) AS female_tip_survivors_rescued,"
			+ "SUM(s.female_tip_survivors_suspected) AS female_tip_survivors_suspected,"
			+ "SUM(s.female_tip_survivors_intercepted) AS female_tip_survivors_intercepted,"
			+ "SUM(s.others_tip_survivors_suspected) AS others_tip_survivors_suspected,"
			+ "SUM(s.others_tip_survivors_rescued) AS others_tip_survivors_rescued,"
			+ "SUM(s.others_tip_survivors_intercepted) AS others_tip_survivors_intercepted"
			+ " from shelter_home_report_view s " 
			+ " WHERE s.province_id =:provinceId" 
			+ " AND s.fiscal_year = '2078-79' "
			+ " GROUP BY s.district_id")
	List<ShelterHomeReport> getDistrictWiseReport(@Param("provinceId") String provinceId);

	@Query(nativeQuery = true, value = "select s.fiscal_year, s.province_id, s.province_desc_eng, "
			+ "s.province_desc_nep, s.district_id, s.district_desc_eng, "
			+ "s.district_desc_nep, s.municipality_id, s.municipality_desc_eng," + "s.municipality_desc_nep, "
			+ "SUM(s.male_tip_survivors_rescued) AS male_tip_survivors_rescued,"
			+ "SUM(s.male_tip_survivors_suspected) AS male_tip_survivors_suspected,"
			+ "SUM(s.male_tip_survivors_intercepted) AS male_tip_survivors_intercepted,"
			+ "SUM(s.female_tip_survivors_rescued) AS female_tip_survivors_rescued,"
			+ "SUM(s.female_tip_survivors_suspected) AS female_tip_survivors_suspected,"
			+ "SUM(s.female_tip_survivors_intercepted) AS female_tip_survivors_intercepted,"
			+ "SUM(s.others_tip_survivors_suspected) AS others_tip_survivors_suspected,"
			+ "SUM(s.others_tip_survivors_rescued) AS others_tip_survivors_rescued,"
			+ "SUM(s.others_tip_survivors_intercepted) AS others_tip_survivors_intercepted"
			+ " from shelter_home_report_view s " 
			+ " WHERE s.district_id =:districtId" 
			+ " AND s.fiscal_year = '2078-79' "
			+ " GROUP BY s.municipality_id")
	List<ShelterHomeReport> getMunicipalityWiseReport(@Param("districtId") String districtId);

	@Query(nativeQuery = true, value = "select v.fiscal_year, v.quarter, v.province_id,  v.district_id, v.municipality_id,"
			+ "SUM(v.male_tip_survivors_rescued) AS male_tip_survivors_rescued,"
			+ "SUM(v.male_tip_survivors_suspected) AS male_tip_survivors_suspected,"
			+ "SUM(v.male_tip_survivors_intercepted) AS male_tip_survivors_intercepted,"
			+ "SUM(v.female_tip_survivors_rescued) AS female_tip_survivors_rescued,"
			+ "SUM(v.female_tip_survivors_suspected) AS female_tip_survivors_suspected,"
			+ "SUM(v.female_tip_survivors_intercepted) AS female_tip_survivors_intercepted,"
			+ "SUM(v.others_tip_survivors_suspected) AS others_tip_survivors_suspected,"
			+ "SUM(v.others_tip_survivors_rescued) AS others_tip_survivors_rescued,"
			+ "SUM(v.others_tip_survivors_intercepted) AS others_tip_survivors_intercepted,"
			+ "SUM(v.male_tip_victims_rescued) AS male_tip_victims_rescued,"
			+ "SUM(v.male_tip_victims_suspected) AS male_tip_victims_suspected,"
			+ "SUM(v.male_tip_victims_intercepted) AS male_tip_victims_intercepted,"
			+ "SUM(v.female_tip_victims_rescued) AS female_tip_victims_rescued,"
			+ "SUM(v.female_tip_victims_suspected) AS female_tip_victims_suspected,"
			+ "SUM(v.female_tip_victims_intercepted) AS female_tip_victims_intercepted,"
			+ "SUM(v.others_tip_victims_suspected) AS others_tip_victims_suspected,"
			+ "SUM(v.others_tip_victims_rescued) AS others_tip_victims_rescued,"
			+ "SUM(v.others_tip_victims_intercepted) AS others_tip_victims_intercepted,"
			+ "SUM(v.tot_shelter_home) AS tot_shelter_home"
			+ " from shelter_home_report_view v " 
			+ " where v.fiscal_year = COALESCE(:fiscalYear,v.fiscal_year) "
			+ " and v.quarter = COALESCE(:quarter,v.quarter) "
			+ " and v.province_id = COALESCE(:provinceId,v.province_id) "
			+ " and v.district_id = COALESCE(:districtId,v.district_id) "
			+ " and v.municipality_id = COALESCE(:localLevelId,v.municipality_id) ")
	List<ShelterHomeReport> getIndicatorReport(String fiscalYear, String quarter, String provinceId, String districtId,
			String localLevelId);

}
