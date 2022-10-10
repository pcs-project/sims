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
import com.pcs.itmis.report.entity.ChildrenReport;
import com.pcs.itmis.report.entity.ConsolidatedReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.entity.WomenReport;
import com.pcs.itmis.report.service.WomenReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/women")
@Slf4j
public class WomenReportController {

	@Autowired
	private WomenReportService reportService;

	@GetMapping("/cumulative")
	  public ResponseEntity<?> getCumulativeReport(){
	    log.info("Inside children cumulative report");
	    List<WomenReport> list =  new ArrayList();
	    try {
	      list = reportService.getCumulativeReport();
	    } catch(Exception e) {
	      e.printStackTrace();
	      return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
	    } 
	    return ResponseEntity.ok().body(list);
	  }
	
	@GetMapping("/province-wise")
	public ResponseEntity<?> getProvinceWiseWomenReport() {
		log.info("Inside Women report");
		List<WomenReport> list = new ArrayList();
		try {
			list = reportService.getProvinceWiseWomenReport();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/district-wise/{provinceId}")
	public ResponseEntity<?> getDistrictWiseWomenReport(@PathVariable("provinceId") String provinceId) {
		log.info("Inside Women report");
		List<WomenReport> list = new ArrayList();
		try {
			list = reportService.getDistrictWiseWomenReport(provinceId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/municipality-wise/{districtId}")
	public ResponseEntity<?> getMunicipalityWiseWomenReport(@PathVariable("districtId") String districtId) {
		log.info("Inside Women report");
		List<WomenReport> list = new ArrayList();
		try {
			list = reportService.getMunicipalityWiseWomenReport(districtId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		return ResponseEntity.ok().body(list);
	}

	@PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside Women indicator report");
		List<WomenReport> list = new ArrayList();
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
