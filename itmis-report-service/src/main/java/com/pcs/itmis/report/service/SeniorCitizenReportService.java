package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.SeniorCitizenReport;
import com.pcs.itmis.report.repository.SeniorCitizenReportRepository;

@Service
public class SeniorCitizenReportService {

  @Autowired
  private SeniorCitizenReportRepository reportRepository;
  
  public List<SeniorCitizenReport> getProvinceWiseSeniorCitizenReport() {
    return reportRepository.getProvinceWiseSeniorCitizenReport();
  }

  public List<SeniorCitizenReport> getDistrictWiseSeniorCitizenReport(String provinceId) {
    return reportRepository.getDistrictWiseSeniorCitizenReport(provinceId);
  }

  public List<SeniorCitizenReport> getMunicipalityWiseSeniorCitizenReport(String districtId) {
    return reportRepository.getMunicipalityWiseSeniorCitizenReport(districtId);
  }

public List<SeniorCitizenReport> getSeniorCitizenCumulativeReport() {
	return reportRepository.getSeniorCitizenCumulativeReport();
}

public List<SeniorCitizenReport> getIndicatorReport(ReportParam reportParam) {
	return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(), 
			reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
}

}
