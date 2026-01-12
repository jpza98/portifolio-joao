package com.portfolio;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {
    
    @Autowired
    private EmailService emailService;
    
    @Value("${app.email.to}")
    private String toEmail;
    
    @PostMapping("/contact")
    public ResponseEntity<?> sendEmail(@Valid @RequestBody ContactRequest request) {
        try {
            emailService.sendEmail(
                toEmail,
                request.getSubject(),
                request.getMessage(),
                request.getFromName(),
                request.getFromEmail()
            );
            return ResponseEntity.ok().body("{\"message\": \"Email enviado com sucesso!\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Erro ao enviar email: " + e.getMessage() + "\"}");
        }
    }
}
