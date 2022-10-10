package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.WomenReport;
import com.pcs.itmis.report.repository.WomenReportRepository;

@Service
public class WomenReportService {

	@Autowired
	private WomenReportRepository reportRepository;

	public List<WomenReport> getProvinceWiseWomenReport() {
		return reportRepository.getProvinceWiseWomenReport();
	}

	public List<WomenReport> getDistrictWiseWomenReport(String provinceId) {
		return reportRepository.getDistrictWiseWomenReport(provinceId);
	}

	public List<WomenReport> getMunicipalityWiseWomenReport(String districtId) {
		return reportRepository.getMunicipalityWiseWomenReport(districtId);
	}

	public List<WomenReport> getIndicatorReport(ReportParam reportParam) {
		System.out.println("fiscal year " + reportParam.getFiscalYear());
		System.out.println("getProvinceId " + reportParam.getProvinceId());
		System.out.println("getDistrictId " + reportParam.getDistrictId());
		System.out.println("getLocalLevelId " + reportParam.getLocalLevelId());
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(), reportParam.getFromDate(), reportParam.getToDate(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

	public List<WomenReport> getCumulativeReport() {
		return reportRepository.getCumulativeReport();
	}

}
