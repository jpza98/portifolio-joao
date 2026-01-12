package com.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendEmail(String to, String subject, String message, String fromName, String fromEmail) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(to);
        email.setSubject("Portfólio - " + subject);
        email.setText(
            "Nova mensagem do portfólio!\n\n" +
            "De: " + fromName + " (" + fromEmail + ")\n" +
            "Assunto: " + subject + "\n\n" +
            "Mensagem:\n" + message + "\n\n" +
            "---\n" +
            "Responder para: " + fromEmail
        );
        email.setFrom(fromEmail);
        
        mailSender.send(email);
    }
}
