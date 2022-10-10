package com.pcs.itmis.idcard.service;

import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcs.itmis.idcard.dto.Organization;
import com.pcs.itmis.idcard.entity.DisabledIdCard;
import com.pcs.itmis.idcard.entity.DisabledIdCardPhotoInformation;
import com.pcs.itmis.idcard.entity.DisabledIdCardView;
import com.pcs.itmis.idcard.repository.DisabilityIdCardViewRepository;
import com.pcs.itmis.idcard.repository.DisabledIdCardRepository;
import com.pcs.itmis.idcard.utilities.LoggedUserDetails;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DisabledIdCardService {

	@Autowired
	private DisabledIdCardRepository disabledIdCardRepository;

	@Autowired
	private SecurityService securityService;

	@Autowired
	private DisabilityIdCardViewRepository disabilityIdCardViewRepository;

	public void saveDisabledIdCardDetails(DisabledIdCard disabledIdCard) {
		log.info("inside DisabledIdCardService method  DisabledIdCardService Service  ");
		disabledIdCard.setOldIdCardType(disabledIdCard.getIdCardType());
		disabledIdCardRepository.save(disabledIdCard);
	}
//
//	public DisabledIdCard saveDisabledIdCardDetailsWithFile(DisabledIdCard disabledIdCard, MultipartFile idCardPhoto) throws Exception {
//		log.info("inside saveDisabledIdCardDetailsWithFile method  DisabledIdCardService Service  ");
//			
//		disabledIdCard.setEntryBy(LoggedUserDetails.getLoggedUser());
//		disabledIdCard.setEntryDate(LocalDate.now());
//		disabledIdCard.getDisabledAddressDetails().setDisabledIdCard(disabledIdCard);
//		disabledIdCard.getDisabledApprovedDetails().setDisabledIdCard(disabledIdCard);
//		disabledIdCard.getDisabledApprovedDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
//		disabledIdCard.getDisabledAddressDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
//		disabledIdCard.getDisabledApprovedDetails().setEntryDate(LocalDate.now());
//		disabledIdCard.getDisabledAddressDetails().setEntryDate(LocalDate.now());
//		try {
//			disabledIdCard.setDisabledIdCardPhotoInformation(
//					new DisabledIdCardPhotoInformation(disabledIdCard,idCardPhoto.getOriginalFilename(),
//							idCardPhoto.getBytes(),idCardPhoto.getContentType(),LoggedUserDetails.getLoggedUser(),LocalDate.now()));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		disabledIdCardRepository.save(disabledIdCard);
//		
//		return disabledIdCard;
//		
//	}

	public DisabledIdCard saveDisabledIdCardDetailsWithFile(DisabledIdCard disabledIdCard, MultipartFile idCardPhoto,
			MultipartFile oldIdCardImage) throws Exception {
		log.info("inside saveDisabledIdCardDetailsWithFile method  DisabledIdCardService Service  ");
		Organization organization = null;
		try {
			organization = securityService.getOrganizationOfLogInUser();
		} catch (Exception e) {
			e.printStackTrace();
		}
//		if(disabledIdCard.getId() != null) {
//			DisabledIdCard oDisabledIdCard =disabledIdCardRepository.findById(disabledIdCard.getIdCardNo()).get();
//			
//			disabledIdCard.getDisabledAddressDetails().setDisabledIdCard(oDisabledIdCard);
//			disabledIdCard.getDisabledApprovedDetails().setDisabledIdCard(oDisabledIdCard);
//			
//			if(oldIdCardImage != null) {
//				disabledIdCard.setOldIdCardImage(oldIdCardImage.getBytes());
//			}
//			
//			try {
//			
//					disabledIdCard.setDisabledIdCardPhotoInformation(
//							new DisabledIdCardPhotoInformation(oDisabledIdCard,idCardPhoto.getOriginalFilename(),
//									idCardPhoto.getBytes(),idCardPhoto.getContentType(),LoggedUserDetails.getLoggedUser(),LocalDate.now()));
//			
//				
//					} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//	
//		}else {
		disabledIdCard.setEntryBy(LoggedUserDetails.getLoggedUser());
		disabledIdCard.setEntryDate(LocalDate.now());
		disabledIdCard.setOldIdCardType(disabledIdCard.getIdCardType());
		disabledIdCard.getDisabledAddressDetails().setDisabledIdCard(disabledIdCard);
		disabledIdCard.getDisabledApprovedDetails().setDisabledIdCard(disabledIdCard);
		disabledIdCard.getDisabledApprovedDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		disabledIdCard.getDisabledAddressDetails().setEntryBy(LoggedUserDetails.getLoggedUser());
		disabledIdCard.getDisabledApprovedDetails().setEntryDate(LocalDate.now());
		disabledIdCard.getDisabledAddressDetails().setEntryDate(LocalDate.now());
		if (oldIdCardImage != null) {
			disabledIdCard.setOldIdCardImage(oldIdCardImage.getBytes());
		}

		try {
			disabledIdCard.setDisabledIdCardPhotoInformation(new DisabledIdCardPhotoInformation(disabledIdCard,
					idCardPhoto.getOriginalFilename(), idCardPhoto.getBytes(), idCardPhoto.getContentType(),
					LoggedUserDetails.getLoggedUser(), LocalDate.now()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// }
		disabledIdCard.setOrganization(organization.getOrganizationId());
		disabledIdCardRepository.save(disabledIdCard);

		return disabledIdCard;

	}

	public List<DisabledIdCardView> getAllDisabledIdCardList() throws Exception {
		log.info("inside getAllDisabledIdCardList method  DisabledIdCardService Service  ");
		Organization org = securityService.getOrganizationOfLogInUser();

		return disabilityIdCardViewRepository.findByOrganization(org.getOrganizationId());
		// return disabilityIdCardViewRepository.findAll();
	}

	public DisabledIdCard getDisabledIdCardById(String id) {
		log.info("inside getDisabledIdCardById method  DisabledIdCardService Service  ");

		return disabledIdCardRepository.findById(id).get();
	}

	public List<DisabledIdCardView> searchDisabledIdCard(String name, String district, String citizenshipNo) {
		log.info("inside searchDisabledIdCard method  DisabledIdCardService Service  ");

		// return
		// disabledIdCardRepository.findByFirstNameEngContainingIgnoreCaseAndDisabledAddressDetailsDistrictAndCitizenshipNoContainingIgnoreCase(name,district,citizenshipNo);
		return disabilityIdCardViewRepository.findByFullNameContainingAndDistrictOrCitizenshipNo(name, district,
				citizenshipNo);

	}

	public DisabledIdCard updateDisabledIdCardDetailsWithFile(DisabledIdCard disabledIdCard, MultipartFile idCardPhoto,
			MultipartFile oldIdCardImage) throws Exception {
		log.info("inside saveDisabledIdCardDetailsWithFile method  DisabledIdCardService Service  ");

		DisabledIdCard oDisabledIdCard = disabledIdCardRepository.findById(disabledIdCard.getId()).get();
		oDisabledIdCard.copyData(disabledIdCard);
		oDisabledIdCard.getDisabledAddressDetails().copyData(disabledIdCard.getDisabledAddressDetails());
		oDisabledIdCard.getDisabledApprovedDetails().copyData(disabledIdCard.getDisabledApprovedDetails());
		if (oldIdCardImage != null) {
			oDisabledIdCard.setOldIdCardImage(oldIdCardImage.getBytes());
		}
		if (idCardPhoto != null) {
			try {
				oDisabledIdCard.getDisabledIdCardPhotoInformation().setFileData(idCardPhoto.getBytes());
				oDisabledIdCard.getDisabledIdCardPhotoInformation().setFileType(idCardPhoto.getContentType());
				oDisabledIdCard.getDisabledIdCardPhotoInformation().setFileName(idCardPhoto.getOriginalFilename());

//				oDisabledIdCard.setDisabledIdCardPhotoInformation(
//						new DisabledIdCardPhotoInformation(oDisabledIdCard,idCardPhoto.getOriginalFilename(),
//								idCardPhoto.getBytes(),idCardPhoto.getContentType(),LoggedUserDetails.getLoggedUser(),LocalDate.now()));
//		
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		disabledIdCardRepository.save(oDisabledIdCard);
		return oDisabledIdCard;

	}

}
