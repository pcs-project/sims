package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.IdCardReport;
import com.pcs.itmis.report.repository.IdCardReportRepository;

@Service
public class IdCardReportService {

	@Autowired
	private IdCardReportRepository reportRepository;

	public List<IdCardReport> getProvinceWiseReport() {
		return reportRepository.getProvinceWiseReport();
	}

	public List<IdCardReport> getDistrictWiseReport(String provinceId) {
		return reportRepository.getDistrictWiseReport(provinceId);
	}

	public List<IdCardReport> getMunicipalityWiseReport(String districtId) {
		return reportRepository.getMunicipalityWiseReport(districtId);
	}
}
