package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.ConsolidatedReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.ConsolidatedReportRepository;

@Service
public class ConsolidatedReportService {

	@Autowired
	private ConsolidatedReportRepository reportRepository;
	
	public List<ConsolidatedReport> getReportGenderWise(ReportParam reportParam) {
		System.out.println("fiscal year: "+reportParam.getFiscalYear());
		System.out.println("quarter: "+reportParam.getQuarter());
		System.out.println("provincve: "+reportParam.getProvinceId());
		System.out.println("district: "+reportParam.getDistrictId());
		System.out.println("local level: "+reportParam.getLocalLevelId());
		return reportRepository.getReportGenderWise(reportParam.getFiscalYear(), reportParam.getQuarter(), 
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

	public List<ConsolidatedReport> getTotalConsolidatedReport(ReportParam reportParam) {
		return reportRepository.getTotalConsolidatedReport(reportParam.getFiscalYear(), reportParam.getQuarter(), 
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}

	public List<ConsolidatedReport> getSocialServiceHomesCountReport() {
		return reportRepository.getSocialServiceHomesCountReport();
	}

}
