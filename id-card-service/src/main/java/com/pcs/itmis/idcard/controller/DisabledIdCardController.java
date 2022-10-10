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
import com.pcs.itmis.idcard.service.DisabledIdCardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/disabled")
@Slf4j
public class DisabledIdCardController {

	@Autowired
	private DisabledIdCardService disabledIdCardService;
	
	@Autowired
	private ObjectMapper objectMapper;

	
//	@PostMapping("/")
//	public ResponseEntity<?> saveDisabledIdCardDetailsWithFile(@RequestParam("disabledIdCard") String disabledIdCard,
//			@RequestParam("idCardPhoto") MultipartFile idCardPhoto) {
//		log.info("Inside saveDisabledIdCardDetailsWithFile Method of DisabledIdCardController");
//		DisabledIdCard odisabledIdCard = new DisabledIdCard();
//		try {
//			
//			try {
//				 odisabledIdCard = objectMapper.readValue(disabledIdCard, DisabledIdCard.class); 
//				odisabledIdCard = disabledIdCardService.saveDisabledIdCardDetailsWithFile(odisabledIdCard,idCardPhoto);																						// MyInput input
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		} catch (Exception e) {
//			return ResponseEntity.badRequest()
//					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
//		}
//		
//		return ResponseEntity.ok()
//				.body(new ResponseMessage(ResponseMsg.success, odisabledIdCard));
//
//	}
	
	@PreAuthorize("hasAuthority('INSERT@DISABLED ID CARD')")
	@PostMapping("/")
	public ResponseEntity<?> saveDisabledIdCardDetailsWithFile(@RequestParam("disabledIdCard") String disabledIdCard,
			@RequestParam("idCardPhoto") MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
		log.info("Inside saveDisabledIdCardDetailsWithFile Method of DisabledIdCardController");
		DisabledIdCard odisabledIdCard = new DisabledIdCard();
		try {
			
			try {
				 odisabledIdCard = objectMapper.readValue(disabledIdCard, DisabledIdCard.class); 
				odisabledIdCard = disabledIdCardService.saveDisabledIdCardDetailsWithFile(odisabledIdCard,idCardPhoto,oldIdCardImage);																						// MyInput input

			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		
		return ResponseEntity.ok()
				.body(new ResponseMessage(ResponseMsg.success, odisabledIdCard));

	}
	
	@PreAuthorize("hasAuthority('UPDATE@DISABLED ID CARD')")
	@PostMapping("/update")
	public ResponseEntity<?> updateDisabledIdCardDetailsWithFile(@RequestParam("disabledIdCard") String disabledIdCard,
			@RequestParam(value="idCardPhoto",required=false) MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
		log.info("Inside saveDisabledIdCardDetailsWithFile Method of DisabledIdCardController");
		DisabledIdCard odisabledIdCard = new DisabledIdCard();
		try {
			
			try {
				 odisabledIdCard = objectMapper.readValue(disabledIdCard, DisabledIdCard.class); 
				odisabledIdCard = disabledIdCardService.updateDisabledIdCardDetailsWithFile(odisabledIdCard,idCardPhoto,oldIdCardImage);																						// MyInput input

			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			return ResponseEntity.badRequest()
					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
		}
		
		return ResponseEntity.ok()
				.body(new ResponseMessage(ResponseMsg.success, odisabledIdCard));

	}

	@PreAuthorize("hasAuthority('SELECT@DISABLED ID CARD')")
	@GetMapping("/")
	public ResponseEntity<?> getAllDisabledIdCardList() {
		log.info("Inside getAllDisabledIdCardList Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, disabledIdCardService.getAllDisabledIdCardList()));
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PreAuthorize("hasAuthority('SELECT@DISABLED ID CARD')")
	@GetMapping("/{id}")
	public ResponseEntity<?> getDisabledIdCardById(@PathVariable("id") String id) {
		log.info("Inside getDisabledIdCardById Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, disabledIdCardService.getDisabledIdCardById(id)));
			} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PreAuthorize("hasAuthority('SELECT@DISABLED ID CARD')")
	@GetMapping("/search-by")
	public ResponseEntity<?> searchDisabledIdCard(@RequestParam("name") String name,@RequestParam("district") String district,@RequestParam("citizenshipNo") String citizenshipNo) {
		log.info("Inside searchDisabledIdCard Method of VoipController");
		try {

			return ResponseEntity.ok()
					.body(new ResponseMessage(ResponseMsg.success, disabledIdCardService.searchDisabledIdCard(name,district,citizenshipNo)));
			} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ResponseMessage>(
					new ResponseMessage(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
//	
//	@PutMapping("/")
//	public ResponseEntity<?> updateDisabledIdCardDetailsWithFile(@RequestParam("disabledIdCard") String disabledIdCard,
//			@RequestParam(value = "idCardPhoto",required=false) MultipartFile idCardPhoto,@RequestParam(value = "oldIdCardImage",required=false) MultipartFile oldIdCardImage) {
//		log.info("Inside saveDisabledIdCardDetailsWithFile Method of DisabledIdCardController");
//		DisabledIdCard odisabledIdCard = new DisabledIdCard();
//		try {
//			
//			try {
//				 odisabledIdCard = objectMapper.readValue(disabledIdCard, DisabledIdCard.class); 
//				odisabledIdCard = disabledIdCardService.updateDisabledIdCardDetailsWithFile(odisabledIdCard,idCardPhoto,oldIdCardImage);																						// MyInput input
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		} catch (Exception e) {
//			return ResponseEntity.badRequest()
//					.body(new ResponseMessage(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST));
//		}
//		
//		return ResponseEntity.ok()
//				.body(new ResponseMessage(ResponseMsg.success, odisabledIdCard));
//
//	}
}
