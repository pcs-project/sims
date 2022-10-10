package com.pcs.itmis.disabled.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class LoggedUserDetails {
  public static String getLoggedUser() {
    return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
  }
}
