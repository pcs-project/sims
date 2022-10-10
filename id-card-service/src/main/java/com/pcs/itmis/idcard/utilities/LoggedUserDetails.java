package com.pcs.itmis.idcard.utilities;

import org.springframework.security.core.context.SecurityContextHolder;

public class LoggedUserDetails {
	
	public static String getLoggedUser() {
		return SecurityContextHolder.getContext()
							.getAuthentication()
							.getPrincipal()
							.toString();
	}

}
