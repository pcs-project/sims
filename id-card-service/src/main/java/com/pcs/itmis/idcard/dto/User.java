package com.pcs.itmis.idcard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	private String appId;
	
	private Long userId;
	

	private String fullName;
	
	private String email;
	
	private String phoneNo;
	
	private Long organizationId;
	
	private String userName;

}
