package com.pcs.itmis.report.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.report.dto.ResponseMessage;
import com.pcs.itmis.report.entity.ComplaintRegistrationReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.ComplaintRegistrationReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/complaint-registration")
@Slf4j
public class ComplaintRegistrationReportController {

	@Autowired
	private ComplaintRegistrationReportService reportService;

	@GetMapping("/cumulative")
	public ResponseEntity<?> getCumulativeReport() {
		log.info("Inside cumulative report");
		List<ComplaintRegistrationReport> list = new ArrayList();
		try {
			list = reportService.getCumulativeReport();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/province-wise")
	public ResponseEntity<?> getProvinceWiseReport() {
		log.info("Inside complaint reg report");
		List<ComplaintRegistrationReport> list = new ArrayList();
		try {
			list = reportService.getProvinceWiseReport();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/district-wise/{provinceId}")
	public ResponseEntity<?> getDistrictWiseReport(@PathVariable("provinceId") String provinceId) {
		log.info("Inside complaint reg report");
		List<ComplaintRegistrationReport> list = new ArrayList();
		try {
			list = reportService.getDistrictWiseReport(provinceId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/municipality-wise/{districtId}")
	public ResponseEntity<?> getMunicipalityWiseReport(@PathVariable("districtId") String districtId) {
		log.info("Inside complaint reg report");
		List<ComplaintRegistrationReport> list = new ArrayList();
		try {
			list = reportService.getMunicipalityWiseReport(districtId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside complaint reg indicator report");
		List<ComplaintRegistrationReport> list = new ArrayList();
		try {
			list = reportService.getIndicatorReport(reportParam);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}
}
