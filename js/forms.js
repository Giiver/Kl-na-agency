/**
 * Form Validation - Kléa Agency
 * Contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form fields
    const fields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (value) => {
                if (!value.trim()) return 'Le nom est requis';
                if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (value) => {
                if (!value.trim()) return 'L\'email est requis';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Veuillez entrer un email valide';
                return '';
            }
        },
        message: {
            element: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate: (value) => {
                if (!value.trim()) return 'Le message est requis';
                if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
                return '';
            }
        }
    };

    // Validate single field
    const validateField = (fieldName) => {
        const field = fields[fieldName];
        if (!field || !field.element) return true;

        const value = field.element.value;
        const error = field.validate(value);

        if (error) {
            field.element.classList.add('error');
            field.element.classList.remove('success');
            if (field.error) field.error.textContent = error;
            return false;
        } else {
            field.element.classList.remove('error');
            field.element.classList.add('success');
            if (field.error) field.error.textContent = '';
            return true;
        }
    };

    // Validate all fields
    const validateForm = () => {
        let isValid = true;
        
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    };

    // Real-time validation on blur
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.element) {
            field.element.addEventListener('blur', () => {
                validateField(fieldName);
            });

            // Clear error on input
            field.element.addEventListener('input', () => {
                if (field.element.classList.contains('error')) {
                    field.element.classList.remove('error');
                    if (field.error) field.error.textContent = '';
                }
            });
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                // Shake animation on form
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
                
                // Focus first error field
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="rotate" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Envoi en cours...
                `;

                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success
                form.reset();
                formSuccess.style.display = 'block';
                formSuccess.classList.add('success-animation');
                
                // Remove success classes from fields
                Object.keys(fields).forEach(fieldName => {
                    if (fields[fieldName].element) {
                        fields[fieldName].element.classList.remove('success');
                    }
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                    formSuccess.classList.remove('success-animation');
                }, 5000);

                console.log('Form submitted:', data);

            } catch (error) {
                console.error('Form submission error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as French phone number
            if (value.startsWith('33')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                // Keep as is
            } else if (value.length > 0) {
                value = '0' + value;
            }
            
            // Add spaces for readability
            if (value.startsWith('+33')) {
                value = value.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
            } else {
                value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
            }
            
            e.target.value = value.trim();
        });
    }

    // Honeypot field for spam protection (optional - add hidden field in HTML)
    const addHoneypot = () => {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    };

    if (form) {
        addHoneypot();
    }
});
