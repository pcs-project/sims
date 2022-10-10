package com.pcs.itmis.idcard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.pcs.itmis.idcard.dto.FileInfo;
import com.pcs.itmis.idcard.service.FileService;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/file")
@Slf4j
public class FileController {
	
	@Autowired
	private FileService fileService;
	
	 @PostMapping("/upload")
	    public @ResponseBody FileInfo uploadedTempFile(@RequestParam("file") MultipartFile file) {
	    	log.info("Inside uploadedTempFile of FileController");
	        return fileService.saveTempFile(file);
	    }
	
	
	

}
