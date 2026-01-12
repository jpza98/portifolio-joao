package com.portfolio;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactRequest {
    
    @NotBlank(message = "Nome é obrigatório")
    private String fromName;
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String fromEmail;
    
    @NotBlank(message = "Assunto é obrigatório")
    private String subject;
    
    @NotBlank(message = "Mensagem é obrigatória")
    private String message;
    
    public String getFromName() {
        return fromName;
    }
    
    public void setFromName(String fromName) {
        this.fromName = fromName;
    }
    
    public String getFromEmail() {
        return fromEmail;
    }
    
    public void setFromEmail(String fromEmail) {
        this.fromEmail = fromEmail;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
