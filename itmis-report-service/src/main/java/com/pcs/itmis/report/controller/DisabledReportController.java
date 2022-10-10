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
import com.pcs.itmis.report.entity.DisabledReport;
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.DisabledReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/disabled")
@Slf4j
public class DisabledReportController {

  @Autowired
  private DisabledReportService reportService;
  
  @GetMapping("/cumulative")
  public ResponseEntity<?> getCumulativeDisabledReport(){
    log.info("Inside children report");
    List<DisabledReport> list =  new ArrayList();
    try {
      list = reportService.getCumulativeDisabledReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/province-wise")
  public ResponseEntity<?> getProvinceWiseDisabledReport(){
    log.info("Inside children report");
    List<DisabledReport> list =  new ArrayList();
    try {
      list = reportService.getProvinceWiseDisabledReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/district-wise/{provinceId}")
  public ResponseEntity<?> getDistrictWiseDisabledReport(
      @PathVariable("provinceId") String provinceId){
    log.info("Inside children report");
    List<DisabledReport> list =  new ArrayList();
    try {
      list = reportService.getDistrictWiseDisabledReport(provinceId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/municipality-wise/{districtId}")
  public ResponseEntity<?> getMunicipalityWiseDisabledReport(
      @PathVariable("districtId") String districtId){
    log.info("Inside children report");
    List<DisabledReport> list =  new ArrayList();
    try {
      list = reportService.getMunicipalityWiseDisabledReport(districtId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside Women indicator report");
		List<DisabledReport> list = new ArrayList();
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
