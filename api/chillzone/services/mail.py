class EmailService:
    
    @staticmethod
    def send_reset_email(user_email, reset_link):
        from django.core.mail import send_mail
        
        html_message = f'''
        <html>
        <body>
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">Demande de réinitialisation de mot de passe</h2>
                <p>Bonjour,</p>
                <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
                <p><a href="{reset_link}" style="background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Réinitialiser mon mot de passe</a></p>
                <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
                <p>Cordialement,<br> L'équipe Mon IUT</p>
            </div>
        </body>
        </html>
        '''
        
        try:
            send_mail(
                subject="Demande de réinitialisation de mot de passe",
                message=f"Cliquez sur le lien suivant pour réinitialiser votre mot de passe : {reset_link}",
                from_email="but3.chillzone@gmail.com",
                recipient_list=[user_email],
                fail_silently=False,
                html_message=html_message
            )
            return True
        except Exception as e:
            return False
    
    @staticmethod
    def send_create_account_mail(user_mail, first_name, last_name, username, password):
        from django.core.mail import send_mail

        html_message = f'''
        <html>
        <body>
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">Bienvenue sur Mon IUT</h2>
                <p>Bonjour <strong>{first_name} {last_name}</strong>,</p>
                <p>Votre compte a été créé avec succès par l'administrateur.</p>
                <p>Voici vos identifiants :</p>
                <ul>
                    <li><strong>Adresse email :</strong> {user_mail}</li>
                    <li><strong>Nom d'utilisateur :</strong> {username}</li>
                    <li><strong>Mot de passe :</strong> {password}</li>
                </ul>
                <p><strong>Important :</strong> Veuillez vous connecter et modifier votre mot de passe immédiatement.</p>
                <p>Cordialement,<br> L'équipe Mon IUT</p>
            </div>
        </body>
        </html>
        '''
        
        try:
            send_mail(
                subject="Vos identifiants de connexion à 'Mon IUT'",
                message=(
                    f"Bonjour {first_name} {last_name},\n\n"
                    f"Votre compte a été créé avec succès par l'administrateur.\n"
                    f"Voici vos identifiants :\n"
                    f"Adresse email : {user_mail}\n"
                    f"Nom d'utilisateur : {username}\n"
                    f"Mot de passe : {password}\n\n"
                    "Veuillez vous connecter et modifier votre mot de passe immédiatement."
                ),
                from_email="but3.chillzone@gmail.com",
                recipient_list=[user_mail],
                fail_silently=False,
                html_message=html_message
            )
            return True
        except Exception as e:
            return False