package com.pcs.itmis.report.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.report.dto.ResponseMessage;
import com.pcs.itmis.report.entity.ChildrenReport;
import com.pcs.itmis.report.entity.ConsolidatedReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.ConsolidatedReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/consolidated")
@Slf4j
public class ConsolidatedReportController {

	@Autowired
	private ConsolidatedReportService reportService;

	@PostMapping("/gender-wise")
	public ResponseEntity<?> getReportGenderWise(@RequestBody ReportParam reportParam) {
		log.info("Inside consolidated report");
		List<ConsolidatedReport> list = new ArrayList();
		try {
			list = reportService.getReportGenderWise(reportParam);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@PostMapping("/total")
	public ResponseEntity<?> getTotalConsolidatedReport(@RequestBody ReportParam reportParam) {
		log.info("Inside consolidated report");
		List<ConsolidatedReport> list = new ArrayList();
		try {
			list = reportService.getTotalConsolidatedReport(reportParam);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/homes-count")
	public ResponseEntity<?> getSocialServiceHomesCountReport() {
		log.info("Inside consolidated report");
		List<ConsolidatedReport> list = new ArrayList();
		try {
			list = reportService.getSocialServiceHomesCountReport();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}
}
