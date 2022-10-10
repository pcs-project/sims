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
import com.pcs.itmis.report.entity.ReportParam;
import com.pcs.itmis.report.service.ChildrenReportService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report/children")
@Slf4j
public class ChildrenReportController {

  @Autowired
  private ChildrenReportService reportService;
  
  @GetMapping("/cumulative")
  public ResponseEntity<?> getChildrenCumulativeReport(){
    log.info("Inside children cumulative report");
    List<ChildrenReport> list =  new ArrayList();
    try {
      list = reportService.getChildrenCumulativeReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/province-wise")
  public ResponseEntity<?> getChildrenReport(){
    log.info("Inside children report");
    List<ChildrenReport> list =  new ArrayList();
    try {
      list = reportService.getProvinceWiseChildrenReport();
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/district-wise/{provinceId}")
  public ResponseEntity<?> getDistrictWiseChildrenReport(
      @PathVariable("provinceId") String provinceId){
    log.info("Inside children report");
    List<ChildrenReport> list =  new ArrayList();
    try {
      list = reportService.getDistrictWiseChildrenReport(provinceId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @GetMapping("/municipality-wise/{districtId}")
  public ResponseEntity<?> getMunicipalityWiseChildrenReport(
      @PathVariable("districtId") String districtId){
    log.info("Inside children report");
    List<ChildrenReport> list =  new ArrayList();
    try {
      list = reportService.getMunicipalityWiseChildrenReport(districtId);
    } catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest()
				.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
    } 
    return ResponseEntity.ok().body(list);
  }
  
  @PostMapping("/indicator")
	public ResponseEntity<?> getIndicatorReport(@RequestBody ReportParam reportParam) {
		log.info("Inside Children indicator report");
		List<ChildrenReport> list = new ArrayList();
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
