package com.pcs.itmis.idcard.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcs.itmis.idcard.dto.Organization;
import com.pcs.itmis.idcard.entity.DisabledIdCardPhotoInformation;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCard;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCardPhotoInformation;
import com.pcs.itmis.idcard.entity.SeniorCitizenIdCardView;
import com.pcs.itmis.idcard.repository.SeniorCitizenIdCardRepository;
import com.pcs.itmis.idcard.repository.SeniorCitizenIdCardViewRepository;
import com.pcs.itmis.idcard.utilities.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SeniorCitizenIdCardService {

	@Autowired
	private SeniorCitizenIdCardRepository seniorCardRepository;
	
	
	@Autowired 
	private SeniorCitizenIdCardViewRepository seniorCitizenIdCardViewRepository;
	
	
	@Autowired
	private SecurityService securityService;
	
	


	public SeniorCitizenIdCard saveSeniorCitizenIdCardDetailsWithFile(SeniorCitizenIdCard oSeniorCitizen,
			MultipartFile idCardPhoto, MultipartFile oldIdCardImage) {
		log.info("inside saveSeniorCitizenIdCardDetailsWithFile method  SeniorCitizenIdCardService Service  ");

		oSeniorCitizen.setEntryBy(LoggedUserDetails.getLoggedUser());
		oSeniorCitizen.setEntryDate(LocalDate.now());
		oSeniorCitizen.getSeniorCitizenAddressDetails().setSeniorCitizenIdCard(oSeniorCitizen);
		oSeniorCitizen.getSeniorCitizenApprovedDetails().setSeniorCitizenIdCard(oSeniorCitizen);
		oSeniorCitizen.getSeniorCitizenApprovedDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		oSeniorCitizen.getSeniorCitizenApprovedDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		oSeniorCitizen.getSeniorCitizenApprovedDetails().setEntryDate(LocalDate.now());
		oSeniorCitizen.getSeniorCitizenApprovedDetails().setEntryDate(LocalDate.now());

		try {
			if (oldIdCardImage != null) {
				oSeniorCitizen.setOldIdCardImage(oldIdCardImage.getBytes());
			}

			oSeniorCitizen.setSeniorCitizenIdCardPhotoInformation(new SeniorCitizenIdCardPhotoInformation(
					oSeniorCitizen, idCardPhoto.getOriginalFilename(), idCardPhoto.getBytes(),
					idCardPhoto.getContentType(), LoggedUserDetails.getLoggedUser(), LocalDate.now()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		seniorCardRepository.save(oSeniorCitizen);

		return oSeniorCitizen;
	}

	public List<SeniorCitizenIdCardView> searchSeniorCitizenBy(String name, String district, String citizenshipNo) {
		log.info("inside searchSeniorCitizenBy method  SeniorCitizenIdCardService Service  ");

		return seniorCitizenIdCardViewRepository
				.findByFullNameContainingAndDistrictOrCitizenshipNo(
						name, district, citizenshipNo);
	}

	public SeniorCitizenIdCard getSeniorCitizenIdCardById(String id) {
		log.info("inside getSeniorCitizenIdCardById method  SeniorCitizenIdCardService Service  ");

		return seniorCardRepository.findById(id).get();
	}

	public List<SeniorCitizenIdCardView> getAllSeniorCitizenList() throws Exception {
		log.info("inside getAllSeniorCitizenList method  SeniorCitizenIdCardService Service  ");
		Organization org = securityService.getOrganizationOfLogInUser();
		return seniorCitizenIdCardViewRepository.findByOrganization(org.getOrganizationId());
	}

	public SeniorCitizenIdCard updateSeniorCitizenIdCardDetailsWithFile(SeniorCitizenIdCard seniorCitizen,
			MultipartFile idCardPhoto, MultipartFile oldIdCardImage) {
		log.info("inside updateSeniorCitizenIdCardDetailsWithFile method  SeniorCitizenIdCardService Service  ");

		SeniorCitizenIdCard oldSeniorCitizen = seniorCardRepository.findById(seniorCitizen.getId()).get();
		oldSeniorCitizen.copyData(seniorCitizen);
		oldSeniorCitizen.getSeniorCitizenAddressDetails().copyData(seniorCitizen.getSeniorCitizenAddressDetails());
		oldSeniorCitizen.getSeniorCitizenApprovedDetails().copyData(seniorCitizen.getSeniorCitizenApprovedDetails());

		try {
			if (oldIdCardImage != null) {
				oldSeniorCitizen.setOldIdCardImage(oldIdCardImage.getBytes());
			}
			if (idCardPhoto != null) {
				oldSeniorCitizen.getSeniorCitizenIdCardPhotoInformation().setFileData(idCardPhoto.getBytes());
				oldSeniorCitizen.getSeniorCitizenIdCardPhotoInformation().setFileName(idCardPhoto.getContentType());
				oldSeniorCitizen.getSeniorCitizenIdCardPhotoInformation()
						.setFileType(idCardPhoto.getOriginalFilename());

			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		seniorCardRepository.save(oldSeniorCitizen);
		return oldSeniorCitizen;
	}

}
