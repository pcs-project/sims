package com.pcs.itmis.idcard.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pcs.itmis.idcard.dto.ResponseMessage;
import com.pcs.itmis.idcard.dto.ResponseMessage.ResponseMsg;
import com.pcs.itmis.idcard.entity.DisabledIdCard;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCard;
import com.pcs.itmis.idcard.service.SeniorCitizenIdCardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/senior-citizen")
@Slf4j
public class SeniorCitizenIdCardController {

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private SeniorCitizenIdCardService  seniorCitizenIdCardService;

	
	@PreAuthorize("hasAuthority('INSERT@SENIOR CITIZEN ID CARD')")
	@PostMapping("/")
	public ResponseEntity<?> saveSeniorCitizenIdCardDetailsWithFile(
			@RequestParam("seniorCitizenIdCard") String seniorCitizenIdCard,
			@RequestParam("idCardPhoto") MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
		log.info("Inside saveSeniorCitizenIdCardDetailsWithFile Method of SeniorCitizenIdCardController");
		SeniorCitizenIdCard oSeniorCitizen = new SeniorCitizenIdCard();
		try {

			try {
				oSeniorCitizen = objectMapper.readValue(seniorCitizenIdCard, SeniorCitizenIdCard.class);
				oSeniorCitizen = seniorCitizenIdCardService.saveSeniorCitizenIdCardDetailsWithFile(oSeniorCitizen, idCardPhoto,oldIdCardImage); // MyInput
																														// input

			} catch (IOException e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, oSeniorCitizen));

	}
	
	@PreAuthorize("hasAuthority('UPDATE@SENIOR CITIZEN ID CARD')")
	@PostMapping("/update")
	public ResponseEntity<?> updateSeniorCitizenIdCardDetailsWithFile(
			@RequestParam("seniorCitizenIdCard") String seniorCitizenIdCard,
			@RequestParam(value="idCardPhoto",required=false) MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
		log.info("Inside saveSeniorCitizenIdCardDetailsWithFile Method of SeniorCitizenIdCardController");
		SeniorCitizenIdCard oSeniorCitizen = new SeniorCitizenIdCard();
		try {

			try {
				oSeniorCitizen = objectMapper.readValue(seniorCitizenIdCard, SeniorCitizenIdCard.class);
				oSeniorCitizen = seniorCitizenIdCardService.updateSeniorCitizenIdCardDetailsWithFile(oSeniorCitizen, idCardPhoto,oldIdCardImage); // MyInput
																														// input

			} catch (IOException e) {
				e.printStackTrace();
			}

		} catch (Exception e) {
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}

		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, oSeniorCitizen));

	}
	
	@PreAuthorize("hasAuthority('SELECT@SENIOR CITIZEN ID CARD')")
	@GetMapping("/")
	public ResponseEntity<?> getAllSeniorCitizenList() {
		log.info("Inside getAllSeniorCitizenList Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, seniorCitizenIdCardService.getAllSeniorCitizenList()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PreAuthorize("hasAuthority('SELECT@SENIOR CITIZEN ID CARD')")
	@GetMapping("/{id}")
	public ResponseEntity<?> getSeniorCitizenIdCardById(@PathVariable("id") String id) {
		log.info("Inside getSeniorCitizenIdCardById Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, seniorCitizenIdCardService.getSeniorCitizenIdCardById(id)));
			} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PreAuthorize("hasAuthority('SELECT@SENIOR CITIZEN ID CARD')")
	@GetMapping("/search-by")
	public ResponseEntity<?> searchSeniorCitizenBy(@RequestParam(value ="name",required = false) String name,@RequestParam(value ="district",required = false) String district,@RequestParam("citizenshipNo") String citizenshipNo) {
		log.info("Inside searchSeniorCitizenBy Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, seniorCitizenIdCardService.searchSeniorCitizenBy(name,district,citizenshipNo)));
			} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
//	@PutMapping("/")
//	public ResponseEntity<?> updateSeniorCitizenIdCardDetailsWithFile(
//			@RequestParam("seniorCitizenIdCard") String seniorCitizenIdCard,
//			@RequestParam(value = "idCardPhoto",required=false) MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
//		log.info("Inside updateSeniorCitizenIdCardDetailsWithFile Method of SeniorCitizenIdCardController");
//		SeniorCitizenIdCard oSeniorCitizen = new SeniorCitizenIdCard();
//		try {
//
//			try {
//				oSeniorCitizen = objectMapper.readValue(seniorCitizenIdCard, SeniorCitizenIdCard.class);
//				oSeniorCitizen = seniorCitizenIdCardService.updateSeniorCitizenIdCardDetailsWithFile(oSeniorCitizen, idCardPhoto,oldIdCardImage); // MyInput
//																														// input
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//
//		} catch (Exception e) {
//			return ResponseEntity.badRequest()
//					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
//		}
//
//		return ResponseEntity.ok().body(new ResponseMessage(ResponseMsg.success, oSeniorCitizen));
//
//	}
}
