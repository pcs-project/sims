package com.pcs.itmis.idcard.service;

import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import javax.swing.filechooser.FileSystemView;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pcs.itmis.idcard.controller.FileController;
import com.pcs.itmis.idcard.dto.FileInfo;

import java.util.logging.Logger;
import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class FileService {

	private final static String C_FILE_STORAGE_TEMP = File.separator.concat("ITMIS").concat(File.separator).concat("file").concat(File.separator).concat("temp") ;
	private final static String C_FILE_STORAGE = File.separator.concat("ITMIS").concat(File.separator).concat("file").concat(File.separator).concat("Documents") ;

	private final static String SYSTEM_DOCUMENT_PATH = FileSystemView.getFileSystemView().getDefaultDirectory()
			.getPath();
	
	public FileInfo saveTempFile(MultipartFile file) {
		log.info("Inside saveTempFile of FileService ");
		  String fileDir = SYSTEM_DOCUMENT_PATH + C_FILE_STORAGE_TEMP;
	        if (!new File(fileDir).exists()) {
	            new File(fileDir).mkdirs();
	        }
	        
	        int fileIndex = new File(fileDir).list().length + 1;

	        String tempFileName = fileIndex + "_" + file.getOriginalFilename();

	       try {
	            FileCopyUtils.copy(file.getBytes(), new File(fileDir + File.separator + tempFileName));
	        } catch (IOException ex) {
	            Logger.getLogger(FileController.class.getName()).log(Level.SEVERE, null, ex);
	        }
	       
	      
	        FileInfo fileInfo = new FileInfo();
	        fileInfo.setFileName(file.getOriginalFilename());
	        fileInfo.setStorageFileName(tempFileName);
	        fileInfo.setRelativePath(C_FILE_STORAGE_TEMP);
	       // fileInfo.setNoOfPage("2");
//
	        return fileInfo;
	}

}
