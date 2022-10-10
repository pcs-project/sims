package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ChildrenReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.ChildrenReportRepository;

@Service
public class ChildrenReportService {

	@Autowired
	private ChildrenReportRepository reportRepository;

	public List<ChildrenReport> getProvinceWiseChildrenReport() {
		return reportRepository.getProvinceWiseChildrenReport();
	}

	public List<ChildrenReport> getDistrictWiseChildrenReport(String provinceId) {
		return reportRepository.getDistrictWiseChildrenReport(provinceId);
	}

	public List<ChildrenReport> getMunicipalityWiseChildrenReport(String districtId) {
		return reportRepository.getMunicipalityWiseChildrenReport(districtId);
	}

	public List<ChildrenReport> getChildrenCumulativeReport() {
		return reportRepository.getChildrenCumulativeReport();
	}

	public List<ChildrenReport> getIndicatorReport(ReportParam reportParam) {
		System.out.println("fiscal year"+ reportParam.getFiscalYear());
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),  
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}
}
