package com.pcs.itmis.report.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcs.itmis.report.entity.OldAgeHomeReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.repository.OldAgeHomeRepository;

@Service
public class OldAgeHomeService {

	@Autowired
	private OldAgeHomeRepository reportRepository;

	public List<OldAgeHomeReport> getIndicatorReport(ReportParam reportParam) {
		return reportRepository.getIndicatorReport(reportParam.getFiscalYear(), reportParam.getQuarter(),
				reportParam.getProvinceId(), reportParam.getDistrictId(), reportParam.getLocalLevelId());
	}
}
