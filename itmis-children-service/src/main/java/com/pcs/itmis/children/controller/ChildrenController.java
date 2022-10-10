package com.pcs.itmis.children.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pcs.itmis.children.entity.Children;
import com.pcs.itmis.children.model.ResponseMessage;
import com.pcs.itmis.children.model.ResponseMessage.ResponseMsg;
import com.pcs.itmis.children.service.ChildrenService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/children")
@Slf4j
public class ChildrenController {

	@Autowired
	private ChildrenService childrenService;

	@PostMapping("/")
	public ResponseEntity<?> save(@RequestBody Children children) {
		log.info("Inside save children details");
		childrenService.save(children);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{fiscalYear}")
	public Children getDataByFiscalYear(@PathVariable("fiscalYear") String fiscalYear) {
		log.info("Inside get Children details");
		return childrenService.getDataByFiscalYearAndOrganization(fiscalYear);
	}

	@GetMapping("/{fiscalYear}/{quarter}")
	public Children getDataByFiscalYearAndQuarter(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter) {
		log.info("Inside get ChildHome details");
		return childrenService.getDataByFiscalYearAndQuarter(fiscalYear, quarter);
	}

	@GetMapping("/{fiscalYear}/{quarter}/{organizationId}")
	public Children getDataByOrganization(@PathVariable("fiscalYear") String fiscalYear,
			@PathVariable("quarter") String quarter,
			@PathVariable("organizationId") Long organizationId) {
		log.info("Inside get Childdren details");
		return childrenService.getDataByOrganization(fiscalYear, quarter, organizationId);
	}

	@PutMapping("/")
	public ResponseEntity<?> update(@RequestBody Children children) {
		log.info("Inside edit Children details");
		childrenService.update(children);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// To revert data
	@PutMapping("/revert")
	public ResponseEntity<?> revertData(@RequestBody Children children) {
		log.info("Inside revert childrenService details");
		childrenService.revertData(children);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/synchronized-date")
	public ResponseEntity<?> getLastSynnchronizedDate() {
		log.info("Inside  getLastSynnchronizedDate   of Children COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, childrenService.getLastSynnchronizedDate()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> getAllDataFromTo(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside  getLastSynnchronizedDate   of Children COntroller");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, childrenService.getAllDataFromTo(fromDate, toDate)));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update/synchronized-date/{fromDate}/{toDate}")
	public ResponseEntity<?> updateSynchronizedDate(
			@PathVariable("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
			@PathVariable("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
		log.info("Inside edit Children details");

		try {
			childrenService.updateSynchronizedDate(fromDate, toDate);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, HttpStatus.OK));
	}

}
